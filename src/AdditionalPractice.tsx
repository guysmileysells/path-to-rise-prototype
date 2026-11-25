import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import type { SupportTool } from './realTimeSupportContent'
import { getPmrFrame, pmrDurationOptions, type PmrArea } from './additionalSupportState'
import { sanitizeDistressRating } from './realTimeSupportState'
import { activityOptions } from './supportToolRegistry'

const areas: PmrArea[] = ['hands', 'shoulders', 'legs', 'feet']
function cancelSpeech() { if ('speechSynthesis' in window) window.speechSynthesis.cancel() }

export function AdditionalPractice({ tool, onSupport }: { tool: SupportTool; onSupport: () => void }) {
  const pmr = tool.id === 'physical-tension-reset'
  const activation = tool.id === 're-engagement-reset'
  const urge = tool.id === 'urge-craving-reset'
  const beforeLabel = urge ? 'Before practice — urge intensity (optional, 0–10)' : 'Before practice (optional, 0–10)'
  const afterLabel = urge ? 'After practice — urge intensity (optional, 0–10)' : 'After practice (optional, 0–10)'
  const [activity, setActivity] = useState<string | null>(null)
  const [safe, setSafe] = useState(false)
  const [started, setStarted] = useState(false)
  const [done, setDone] = useState(false)
  const [step, setStep] = useState(0)
  const [minutes, setMinutes] = useState(2)
  const [skipped, setSkipped] = useState<PmrArea[]>([])
  const [before, setBefore] = useState<number | null>(null)
  const [after, setAfter] = useState<number | null>(null)
  const [elapsed, setElapsed] = useState(0)
  const [running, setRunning] = useState(false)
  const [audio, setAudio] = useState(false)
  const [voice, setVoice] = useState<SpeechSynthesisVoice | null>(null)
  const [notice, setNotice] = useState('')
  const accumulated = useRef(0), lastStart = useRef(0)
  const runner = useRef<HTMLDivElement>(null)
  const frame = getPmrFrame(elapsed, minutes, skipped)
  const cue = frame.phase === 'tense' ? `Gently tense your ${frame.area} for five seconds, only if comfortable. Keep breathing naturally; do not strain.`
    : frame.phase === 'release' ? `Release your ${frame.area} for ten seconds. Let the muscles soften without forcing.`
    : frame.phase === 'jaw' ? 'Let your jaw soften comfortably. Do not clench or force it open.'
    : frame.phase === 'prepare' ? 'Settle comfortably. Breathe naturally. Skip any area you prefer not to tense.'
    : frame.area ? `Let your ${frame.area} rest. This area is skipped; no tensing is needed.` : 'Rest comfortably and breathe naturally. There is no need to achieve a particular feeling.'

  useEffect(() => {
    if (!('speechSynthesis' in window) || typeof window.SpeechSynthesisUtterance !== 'function') return
    const update = () => setVoice(window.speechSynthesis.getVoices().find(v => v.localService && v.lang.toLowerCase().startsWith('en')) ?? null)
    update()
    window.speechSynthesis.addEventListener('voiceschanged', update)
    return () => { window.speechSynthesis.removeEventListener('voiceschanged', update); cancelSpeech() }
  }, [])

  const pause = useCallback(() => {
    if (!running) return
    accumulated.current = Math.min(minutes * 60000, accumulated.current + Math.max(0, performance.now() - lastStart.current))
    setElapsed(accumulated.current)
    setRunning(false)
    cancelSpeech()
  }, [running, minutes])

  useEffect(() => {
    const hidden = () => {
      if (!document.hidden) return
      pause(); cancelSpeech(); setAudio(false)
      if (started && !done) setNotice('Paused when you left this tab. Resume only when stationary and safe.')
    }
    document.addEventListener('visibilitychange', hidden)
    return () => document.removeEventListener('visibilitychange', hidden)
  }, [pause, started, done])

  useEffect(() => {
    if (!running) return
    const id = window.setInterval(() => {
      const actual = accumulated.current + Math.max(0, performance.now() - lastStart.current)
      setElapsed(Math.min(actual, minutes * 60000))
      if (actual >= minutes * 60000) { accumulated.current = minutes * 60000; setRunning(false); setStep(2); setNotice('Timed practice ended. Continue only if comfortable.') }
    }, 100)
    return () => window.clearInterval(id)
  }, [running, minutes])

  const spoken = pmr && step === 1 ? cue : tool.how[step]
  useEffect(() => {
    cancelSpeech()
    if (!audio || !voice || !started || done || document.hidden || (pmr && step === 1 && !running)) return
    let closed = false
    queueMicrotask(() => {
      if (closed) return
      try {
        const utterance = new SpeechSynthesisUtterance(spoken)
        utterance.voice = voice; utterance.rate = 0.85
        utterance.onerror = event => {
          if (closed || event.error === 'canceled' || event.error === 'interrupted') return
          setAudio(false); setNotice('Device audio is unavailable. Continue with the written guidance.')
        }
        window.speechSynthesis.speak(utterance)
      } catch { if (!closed) { setAudio(false); setNotice('Device audio is unavailable. Continue with the written guidance.') } }
    })
    return () => { closed = true; cancelSpeech() }
  }, [audio, voice, started, done, pmr, step, running, spoken])

  useLayoutEffect(() => {
    if (started) { runner.current?.focus({ preventScroll: true }); runner.current?.scrollIntoView({ block: 'start', behavior: 'instant' }) }
  }, [started, step, done])

  function stop() {
    cancelSpeech(); setAudio(false); setRunning(false); setStarted(false); setDone(false); setStep(0)
    setBefore(null); setAfter(null); setActivity(null); setSkipped([]); setElapsed(0); accumulated.current = 0; setSafe(false)
    setNotice('Practice stopped. Temporary ratings and choices discarded.')
  }
  function next() {
    cancelSpeech()
    if (step === tool.how.length - 1) { setDone(true); setRunning(false); setAudio(false); return }
    setStep(step + 1)
    if (pmr && step + 1 === 1) { accumulated.current = 0; lastStart.current = performance.now(); setElapsed(0); setRunning(true) }
  }
  function rating(label: string, value: number | null, update: (value: number | null) => void) {
    return <label className="rts-rating">{label}<select aria-label={label} value={value ?? ''} onChange={event => update(sanitizeDistressRating(event.target.value))}>
      <option value="">Skip — no rating</option>{Array.from({ length: 11 }, (_, n) => <option key={n} value={n}>{n}{n === 0 ? ' — none' : n === 10 ? ' — strongest' : ''}</option>)}
    </select></label>
  }

  return <div className="rts-practice rts-additional">
    {urge && <p className="rts-safety rts-urgent-safety">This is not withdrawal treatment. Alcohol or benzodiazepine withdrawal can be a medical emergency. Get medical guidance before changing use when dependence may be present. For seizures, hallucinations, severe confusion or other severe symptoms, seek emergency care—do not wait to finish, surf through symptoms or detox alone.</p>}
    {!started && <button className="secondary" type="button" onClick={onSupport}>Connect With Support</button>}
    {!started && <>
      <p className="rts-safety">Only practice while stationary and safe—not while driving, operating equipment or doing safety-critical duties. Stop or skip if uncomfortable or more distressed. No incident details are required.</p>
      {pmr && <p className="rts-safety">Use only light, comfortable tension. Skip painful, injured or recently operated areas; ask a clinician if unsure tensing is suitable. Never hold your breath or clench your jaw. Stop for pain.</p>}
      <label className="rts-check"><input type="checkbox" checked={safe} onChange={event => setSafe(event.target.checked)} />I am stationary and not doing a safety-critical task.</label>
      <p className="fineprint left-copy">Optional {urge ? 'urge intensity' : 'distress'} rating: 0 means none; 10 means strongest imaginable. No reduction is required.</p>{rating(beforeLabel, before, setBefore)}
      {pmr && <>
        <fieldset><legend>Practice duration</legend><div className="rts-duration-options">{pmrDurationOptions.map(n => <label key={n}><input type="radio" name="pmr-duration" checked={minutes === n} onChange={() => setMinutes(n)} />{n} minutes</label>)}</div></fieldset>
        <fieldset><legend>Areas you prefer to skip (optional)</legend>{areas.map(area => <label className="rts-check" key={area}><input type="checkbox" aria-label={`Skip ${area}`} checked={skipped.includes(area)} onChange={event => setSkipped(current => event.target.checked ? [...current, area] : current.filter(a => a !== area))} />Skip {area}</label>)}</fieldset>
      </>}
      <button className="primary" type="button" disabled={!safe} onClick={() => { setStarted(true); setNotice('') }}>Start Guided Practice</button>
    </>}
    <label className="rts-check"><input type="checkbox" aria-label="Optional guided audio" disabled={!voice} checked={audio} onChange={event => setAudio(event.target.checked)} />Optional guided audio</label>
    <p className="fineprint left-copy">{voice ? 'Fixed guidance only, using an on-device English voice. No ratings or private writing are spoken.' : 'No on-device English voice is available. Continue with text.'}</p>
    {started && <div className="rts-runner" ref={runner} tabIndex={-1} aria-label="Guided practice">
      {!done ? <>
        <p className="eyebrow">Step {step + 1} of {tool.how.length}</p>
        {pmr && step === 1 ? <>
          <div className="rts-breath rts-pmr" data-phase={frame.phase} data-area={frame.area ?? ''}>
            <strong aria-live="polite">{running ? cue : 'Paused — rest naturally'}</strong>
            <span>{frame.phaseRemainingSeconds} seconds in this phase</span>
            <output aria-live="off" aria-label="Practice time remaining">{Math.floor(frame.remainingSeconds / 60)}:{String(frame.remainingSeconds % 60).padStart(2, '0')}</output>
          </div>
          <button className="secondary" type="button" onClick={() => { if (running) pause(); else { lastStart.current = performance.now(); setRunning(true); setNotice('') } }}>{running ? 'Pause practice' : 'Resume practice'}</button>
          {frame.area && !skipped.includes(frame.area) && <button className="secondary" type="button" onClick={() => setSkipped(current => [...current, frame.area!])}>Skip this area</button>}
          <button className="text-button" type="button" onClick={() => { pause(); setAudio(false); setStep(2); setNotice('Timed practice skipped. Rest naturally.') }}>Skip timed practice</button>
        </> : <><p className="rts-current-step" aria-live="polite">{tool.how[step]}</p>{urge && step === 1 && rating(beforeLabel, before, setBefore)}
          {activation && step === 1 && <fieldset><legend>Choose one meaningful activity, or skip</legend>{activityOptions.map(option => <label className="rts-check" key={option.id}><input type="radio" name="support-activity" checked={activity === option.id} onChange={() => setActivity(option.id)} />{option.title}</label>)}</fieldset>}
          {activation && step >= 2 && activity && <p className="rts-selected-action">{activityOptions.find(option => option.id === activity)?.action}</p>}<button className="primary" type="button" disabled={activation && step === 1 && !activity} onClick={next}>{step === tool.how.length - 1 ? 'Finish practice' : 'Next step'}</button><button className="text-button" type="button" onClick={next}>Skip step</button></>}
      </> : <><p role="status">Practice finished. No particular outcome is expected.</p>{rating(afterLabel, after, setAfter)}</>}
      <button className="secondary" type="button" onClick={stop}>Stop practice</button>
      <button className="secondary" type="button" onClick={onSupport}>Connect With Support</button>
    </div>}
    {notice && <p role="status">{notice}</p>}
    <p className="fineprint left-copy">Ratings and choices are optional, session-only and not interpreted, saved or sent. Leaving or stopping discards them. A favourite saves only the tool ID, never these details.</p>
  </div>
}
