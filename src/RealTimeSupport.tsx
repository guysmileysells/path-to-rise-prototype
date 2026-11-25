import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { InlineExpansion } from './InlineExpansion'
import { gentleBreathingGuide, type SupportTool } from './realTimeSupportContent'
import { additionalToolIds, allSupportTools, supportToolIds } from './supportToolRegistry'
import { useSupportFavourites } from './supportFavourites'
import { AdditionalPractice } from './AdditionalPractice'
import { breathingDurationOptions, getBreathingFrame, sanitizeDistressRating } from './realTimeSupportState'
import './realTimeSupport.css'

function Rating({ label, value, onChange }: { label: string; value: number | null; onChange: (value: number | null) => void }) {
  return <label className="rts-rating">{label}
    <select aria-label={label} value={value ?? ''} onChange={event => onChange(sanitizeDistressRating(event.target.value))}>
      <option value="">Skip — no rating</option>
      {Array.from({ length: 11 }, (_, i) => <option key={i} value={i}>{i}{i === 0 ? ' — no distress' : i === 10 ? ' — highest distress' : ''}</option>)}
    </select>
  </label>
}

function cancelAudio() {
  if ('speechSynthesis' in window) window.speechSynthesis.cancel()
}

function GuidedPractice({ tool }: { tool: SupportTool }) {
  const breathing = tool.id === 'physiological-reset'
  const [safe, setSafe] = useState(false)
  const [started, setStarted] = useState(false)
  const [done, setDone] = useState(false)
  const [step, setStep] = useState(0)
  const [minutes, setMinutes] = useState(1)
  const [before, setBefore] = useState<number | null>(null)
  const [after, setAfter] = useState<number | null>(null)
  const [elapsed, setElapsed] = useState(0)
  const [running, setRunning] = useState(false)
  const [audio, setAudio] = useState(false)
  const [voice, setVoice] = useState<SpeechSynthesisVoice | null>(null)
  const [notice, setNotice] = useState('')
  const accumulated = useRef(0)
  const lastStart = useRef(0)
  const runner = useRef<HTMLDivElement>(null)
  const frame = getBreathingFrame(elapsed, minutes)

  useEffect(() => {
    if (!('speechSynthesis' in window) || typeof window.SpeechSynthesisUtterance !== 'function') return
    const update = () => setVoice(window.speechSynthesis.getVoices().find(v => v.localService && v.lang.toLowerCase().startsWith('en')) ?? null)
    update()
    window.speechSynthesis.addEventListener('voiceschanged', update)
    return () => { window.speechSynthesis.removeEventListener('voiceschanged', update); cancelAudio() }
  }, [])

  const pause = useCallback(() => {
    if (!running) return
    accumulated.current = Math.min(minutes * 60_000, accumulated.current + Math.max(0, performance.now() - lastStart.current))
    setElapsed(accumulated.current)
    setRunning(false)
    cancelAudio()
  }, [running, minutes])

  useEffect(() => {
    const onHidden = () => {
      if (!document.hidden) return
      pause()
      cancelAudio()
      setAudio(false)
      if (started && !done) setNotice('Practice paused when you left this tab. Resume only when stationary and safe.')
    }
    document.addEventListener('visibilitychange', onHidden)
    return () => document.removeEventListener('visibilitychange', onHidden)
  }, [pause, started, done])

  useEffect(() => {
    if (!running) return
    const tick = () => {
      const actual = accumulated.current + Math.max(0, performance.now() - lastStart.current)
      setElapsed(Math.min(actual, minutes * 60_000))
      if (actual >= minutes * 60_000) {
        accumulated.current = minutes * 60_000
        setRunning(false)
        setStep(2)
        setNotice('Timed breathing is finished. Return to your natural breath; there is no need to force another cycle.')
      }
    }
    const id = window.setInterval(tick, 100)
    return () => window.clearInterval(id)
  }, [running, minutes])

  useEffect(() => {
    cancelAudio()
    if (!audio || !voice || !started || done || document.hidden || (breathing && step === 1 && !running)) return
    const text = breathing && step === 1
      ? (frame.phase === 'inhale' ? 'Gently inhale for four seconds. Do not force your breath.' : 'Gently exhale for six seconds.')
      : tool.how[step]
    let disposed = false
    // Synchronize the external speech API asynchronously; cleanup invalidates queued work.
    queueMicrotask(() => {
      if (disposed) return
      try {
        const utterance = new SpeechSynthesisUtterance(text)
        utterance.voice = voice
        utterance.rate = 0.85
        utterance.onerror = event => {
          if (disposed || event.error === 'canceled' || event.error === 'interrupted') return
          setAudio(false)
          setNotice('Device audio is unavailable. The written guidance remains available.')
        }
        window.speechSynthesis.speak(utterance)
      } catch {
        if (disposed) return
        setAudio(false)
        setNotice('Device audio is unavailable. The written guidance remains available.')
      }
    })
    return () => { disposed = true; cancelAudio() }
  }, [audio, voice, started, done, step, breathing, running, frame.phase, tool])

  useLayoutEffect(() => {
    if (started) {
      runner.current?.focus({ preventScroll: true })
      runner.current?.scrollIntoView({ block: 'start', behavior: 'instant' })
    }
  }, [started, step, done])

  function stop() {
    cancelAudio()
    setRunning(false)
    setAudio(false)
    setStarted(false)
    setDone(false)
    setStep(0)
    setElapsed(0)
    accumulated.current = 0
    setBefore(null)
    setAfter(null)
    setSafe(false)
    setNotice('Practice stopped. Ratings discarded. You can leave or choose another tool.')
  }

  function next() {
    cancelAudio()
    if (step >= tool.how.length - 1) {
      setDone(true)
      setRunning(false)
      setAudio(false)
    } else {
      const nextStep = step + 1
      setStep(nextStep)
      if (breathing && nextStep === 1) {
        accumulated.current = 0
        lastStart.current = performance.now()
        setElapsed(0)
        setRunning(true)
      }
    }
  }

  return <div className="rts-practice">
    {!started && <>
      <p className="rts-safety">Only practice while stationary, in a safe setting—not while driving, operating equipment or doing safety-critical duties. Stop if you feel dizzy, uncomfortable or more distressed. Use natural breathing or neutral surroundings instead.</p>
      <label className="rts-check"><input type="checkbox" checked={safe} onChange={event => setSafe(event.target.checked)} />I am stationary and not doing a safety-critical task.</label>
      <Rating label="Before practice (optional, 0–10)" value={before} onChange={setBefore} />
      {breathing && <fieldset><legend>Breathing duration</legend><div className="rts-duration-options">
        {breathingDurationOptions.map(n => <label key={n}><input type="radio" name={`duration-${tool.id}`} value={n} checked={minutes === n} onChange={() => setMinutes(n)} />{n} minute{n === 1 ? '' : 's'}</label>)}
      </div></fieldset>}
      <button className="primary" type="button" disabled={!safe} onClick={() => { setNotice(''); setStarted(true); setDone(false); setStep(0) }}>Start Guided Practice</button>
    </>}
    <label className="rts-check"><input type="checkbox" aria-label="Optional guided audio" checked={audio} disabled={!voice} onChange={event => setAudio(event.target.checked)} />Optional guided audio</label>
    <p className="fineprint left-copy">{voice ? 'Uses an on-device English voice for fixed guidance only. Audio is optional; no private writing or ratings are spoken.' : 'No on-device English voice is available in this browser. Follow the text instead.'}</p>
    {started && <div ref={runner} tabIndex={-1} className="rts-runner" aria-label="Guided practice">
      {!done ? <>
        <p className="eyebrow">Step {step + 1} of {tool.how.length}</p>
        <p className="rts-current-step" aria-live="polite">{breathing && step === 1 ? gentleBreathingGuide : tool.how[step]}</p>
        {breathing && step === 1 ? <>
          <div className="rts-breath" data-phase={frame.phase}>
            <strong aria-live="polite">{running ? (frame.phase === 'inhale' ? 'Gently inhale' : 'Gently exhale') : 'Paused — breathe naturally'}</strong>
            <span>{frame.phaseRemainingSeconds} seconds in this phase</span>
            <output aria-live="off" aria-label="Breathing time remaining">{Math.floor(frame.remainingSeconds / 60)}:{String(frame.remainingSeconds % 60).padStart(2, '0')}</output>
          </div>
          <button className="secondary" type="button" onClick={() => {
            if (running) pause()
            else { lastStart.current = performance.now(); setRunning(true); setNotice('') }
          }}>{running ? 'Pause breathing' : 'Resume breathing'}</button>
          <button className="text-button" type="button" onClick={() => { pause(); setAudio(false); setStep(2); setNotice('Timed breathing skipped. Return to your natural breath and continue only if comfortable.') }}>Skip timed breathing</button>
        </> : <button className="primary" type="button" onClick={next}>{step === tool.how.length - 1 ? 'Finish practice' : 'Next step'}</button>}
      </> : <>
        <p role="status">Practice finished. You can stop here.</p>
        <Rating label="After practice (optional, 0–10)" value={after} onChange={setAfter} />
        <p>No change or feeling worse is not a failure. Stop and connect with support if you need it.</p>
      </>}
      <button className="secondary" type="button" onClick={stop}>Stop practice</button>
    </div>}
    {notice && <p role="status">{notice}</p>}
    <p className="fineprint left-copy">Ratings are optional personal check-ins, not a diagnostic score. They are not saved or sent anywhere and are discarded when you stop, close or leave this practice.</p>
  </div>
}

function ToolDetail({ tool, onSupport, favourite, onFavourite }: { tool: SupportTool; onSupport: () => void; favourite: boolean; onFavourite: () => void }) {
  return <div className="rts-detail">
    <button className="secondary rts-favourite-toggle" type="button" aria-pressed={favourite} aria-label={favourite ? `Remove ${tool.title} from favourites` : `Save ${tool.title} as favourite`} onClick={onFavourite}>{favourite ? '★ Saved favourite' : '☆ Save favourite'}</button>
    <section><h2>What</h2><p>{tool.what}</p>{additionalToolIds.has(tool.id) ? <AdditionalPractice tool={tool} onSupport={onSupport} /> : <GuidedPractice tool={tool} />}</section>
    <section><h2>When</h2><ul>{tool.when.map(s => <li key={s}>{s}</li>)}</ul></section>
    <section><h2>How</h2><ol>{tool.how.map(s => <li key={s}>{s}</li>)}</ol></section>
    <section><h2>Why</h2><p>{tool.why}</p></section>
    <section><h2>Benefits</h2><ul>{tool.benefits.map(s => <li key={s}>{s}</li>)}</ul></section>
    <section><h2>Duration</h2><p>{tool.duration}</p></section>
    <section><h2>Adaptations</h2><ul>{tool.adaptations.map(s => <li key={s}>{s}</li>)}</ul></section>
    <section className="rts-references"><h2>Scientific References</h2><ul>{tool.references.map(ref => <li key={ref.url}><a href={ref.url} target="_blank" rel="noopener noreferrer">{ref.title}</a><p className="fineprint left-copy">{ref.note}</p></li>)}</ul></section>
  </div>
}

export function RealTimeSupport({ onExit, onSupport }: { onExit: () => void; onSupport: () => void }) {
  const [selected, setSelected] = useState<string | null>(null)
  const title = useRef<HTMLHeadingElement>(null)
  const favourites = useSupportFavourites(supportToolIds)
  useLayoutEffect(() => { title.current?.focus({ preventScroll: true }); title.current?.scrollIntoView({ block: 'start', behavior: 'instant' }) }, [])
  return <section className="stack rts" aria-labelledby="rts-title">
    <button className="text-button" type="button" onClick={onExit}>Return to previous screen</button>
    <h1 ref={title} id="rts-title" tabIndex={-1}>Real-Time Support</h1>
    <p>Choose what feels useful now. These tools work independently of your 28-day program and do not change its progress.</p>
    <p className="rts-safety">Educational prototype—not treatment or emergency care. Not clinically reviewed. No incident details are requested. You may skip any step or leave at any time.</p>
    <details className="rts-favourites"><summary>Favourite tools ({favourites.ids.length})</summary>
      <p className="fineprint left-copy">Only tool IDs are saved in this browser. On a shared device, others may see your preferences. No ratings or practice history are saved.</p>
      {favourites.ids.length === 0 ? <p>No saved favourites. Open any tool to save it.</p> : <div className="rts-favourite-actions">{favourites.ids.map(id => { const tool = allSupportTools.find(item => item.id === id)!; return <button className="secondary" type="button" key={id} aria-label={`Open favourite: ${tool.title}`} onClick={() => setSelected(tool.id)}>{tool.title}</button> })}<button className="text-button" type="button" onClick={favourites.clear}>Clear favourite tools</button></div>}
    </details>
    {favourites.notice && <p className="rts-favourite-notice" role="status">{favourites.notice}</p>}
    <div className="rts-tools">{allSupportTools.map(tool => <div className="rts-tool" key={tool.id}>
      <InlineExpansion open={selected === tool.id} onToggle={() => setSelected(selected === tool.id ? null : tool.id)} label={tool.title} buttonClassName="secondary"><ToolDetail tool={tool} onSupport={onSupport} favourite={favourites.ids.includes(tool.id)} onFavourite={() => favourites.toggle(tool.id)} /></InlineExpansion>
    </div>)}</div>
    <button className="secondary" type="button" onClick={onSupport}>Connect With Support</button>
    <p className="fineprint left-copy">Choose a trusted peer, your own EAP or a qualified professional. This app does not contact or monitor anyone. Canada: call/text 9-8-8 for suicide crisis support; call 9-1-1 for immediate danger. Elsewhere use verified local services.</p>
    <p className="fineprint left-copy">Once this page is loaded, text and the practice timer can work without a connection. Offline reopening/reloading and background operation are not guaranteed. References and external support pages need internet. Device audio depends on your browser and installed voice.</p>
  </section>
}
