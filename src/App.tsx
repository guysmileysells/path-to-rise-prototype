import { useMemo, useState } from 'react'
import './App.css'
import {
  lessonParts,
  needs,
  quickKitComponents,
  sevenDayReset,
  states,
  timeChoices,
  toolInventory,
  twentyEightDayWeeks,
} from './pathData'

type Tab = 'today' | 'reset' | 'path' | 'support'
type ResetStep = 'state' | 'need' | 'time' | 'recommendation' | 'guidance' | 'feedback'

type ResetSelections = {
  state?: string
  need?: string
  time?: string
}

const supportLevels = [
  'Personal tools, education and journal',
  'Trusted person, peer, mentor or chaplain',
  'Counsellor, psychologist, physician, EAP or specialized service',
  '9-8-8 in Canada, emergency services and local crisis resources',
]

function App() {
  const [activeTab, setActiveTab] = useState<Tab>('today')
  const [resetStep, setResetStep] = useState<ResetStep>('state')
  const [resetSelections, setResetSelections] = useState<ResetSelections>({})
  const [selectedDay, setSelectedDay] = useState(3)
  const [showKit, setShowKit] = useState(false)

  const recommendedTool = useMemo(() => {
    if (resetSelections.need === 'Sleep') return toolInventory.find((tool) => tool.title === 'Sleep After Shift')!
    if (resetSelections.need === 'Reconnect') return toolInventory.find((tool) => tool.title === 'Relationship Reset')!
    if (resetSelections.need === 'Leave work at work') return toolInventory.find((tool) => tool.title === 'End-of-Shift Reset')!
    if (resetSelections.need === 'Gain perspective') return toolInventory.find((tool) => tool.title === 'Control Scan')!
    return toolInventory.find((tool) => tool.title === '90-Second Downshift')!
  }, [resetSelections.need])

  const resetFromStart = () => {
    setActiveTab('reset')
    setResetSelections({})
    setResetStep('state')
  }

  const openPath = () => {
    setActiveTab('path')
    setShowKit(false)
  }

  const openQuickKit = () => {
    setActiveTab('today')
    setShowKit(true)
  }

  return (
    <main className="shell" aria-label="PATH to RISE prototype">
      <p className="concept-note">PATH to RISE · Prototype checkpoint · Sample content, no personal data saved</p>
      <section className="phone" aria-live="polite">
        <header className="topbar">
          <button className="brand" type="button" onClick={() => setActiveTab('today')} aria-label="Go to Today">
            PATH <span>to</span> RISE
          </button>
          <span className="privacy-pill" aria-label="Private space">🔒 Your space</span>
        </header>

        <div className="screen">
          {activeTab === 'today' && (showKit ? <QuickKit onBack={() => setShowKit(false)} /> : <Today onOpenReset={resetFromStart} onOpenPath={openPath} onOpenKit={openQuickKit} />)}
          {activeTab === 'reset' && (
            <ResetFlow
              step={resetStep}
              selections={resetSelections}
              toolTitle={recommendedTool.title}
              onSelect={(field, value) => setResetSelections((current) => ({ ...current, [field]: value }))}
              onStep={setResetStep}
              onSupport={() => setActiveTab('support')}
              onSaveKit={openQuickKit}
            />
          )}
          {activeTab === 'path' && <MyPath selectedDay={selectedDay} onSelectDay={setSelectedDay} onReset={resetFromStart} />}
          {activeTab === 'support' && <Support />}
        </div>

        <nav className="bottom-nav" aria-label="Main navigation">
          {[
            ['today', 'Today'],
            ['reset', 'Reset'],
            ['path', 'My Path'],
            ['support', 'Support'],
          ].map(([key, label]) => (
            <button
              className={activeTab === key ? 'active' : ''}
              type="button"
              key={key}
              onClick={() => {
                setShowKit(false)
                setActiveTab(key as Tab)
              }}
            >
              {label}
            </button>
          ))}
        </nav>
      </section>
    </main>
  )
}

function Today({ onOpenReset, onOpenPath, onOpenKit }: { onOpenReset: () => void; onOpenPath: () => void; onOpenKit: () => void }) {
  return (
    <section className="stack page-enter">
      <div>
        <p className="eyebrow">A moment for you</p>
        <h1>Leave the shift. Keep yourself.</h1>
        <p className="muted">Welcome back. Start where you are.</p>
      </div>

      <article className="hero-card">
        <p className="eyebrow">Right here. Right now.</p>
        <h2>What would help today?</h2>
        <p>A little space between what happened and what comes next.</p>
        <button className="primary" type="button" onClick={onOpenReset}>Reset me now →</button>
        <p className="fineprint">60 seconds · 3 minutes · 10 minutes · Or more</p>
      </article>

      <section className="section-row">
        <h2>Your path</h2>
        <button className="text-button" type="button" onClick={onOpenPath}>View program</button>
      </section>
      <button className="list-card" type="button" onClick={onOpenPath}>
        <span>Leave work at work</span>
        <small>Seven-Day Reset · Day 3 of 7</small>
      </button>
      <p className="muted small">2 days complete. Move at your own pace.</p>

      <h2>Within reach</h2>
      <button className="list-card" type="button" onClick={onOpenKit}>
        <span>My Quick Kit</span>
        <small>Your familiar tools, marked for offline readiness later</small>
      </button>
    </section>
  )
}

function ResetFlow({
  step,
  selections,
  toolTitle,
  onSelect,
  onStep,
  onSupport,
  onSaveKit,
}: {
  step: ResetStep
  selections: ResetSelections
  toolTitle: string
  onSelect: (field: keyof ResetSelections, value: string) => void
  onStep: (step: ResetStep) => void
  onSupport: () => void
  onSaveKit: () => void
}) {
  if (step === 'state') {
    return <ChoiceStep count="1 of 3" title="How are you arriving?" subtitle="No right answer. Just where you are." options={states} selected={selections.state} onPick={(value) => onSelect('state', value)} onContinue={() => onStep('need')} />
  }

  if (step === 'need') {
    return <ChoiceStep count="2 of 3" title="What do you need?" subtitle="Choose what would help most right now." options={needs} selected={selections.need} onBack={() => onStep('state')} onPick={(value) => onSelect('need', value)} onContinue={() => onStep('time')} />
  }

  if (step === 'time') {
    return <ChoiceStep count="3 of 3" title="How much time is yours?" subtitle="A small pause counts, too." options={timeChoices} selected={selections.time} onBack={() => onStep('need')} onPick={(value) => onSelect('time', value)} continueLabel="Find my reset" onContinue={() => onStep('recommendation')} />
  }

  if (step === 'recommendation') {
    return (
      <section className="stack page-enter">
        <button className="text-button left" type="button" onClick={() => onStep('time')}>← Back</button>
        <p className="eyebrow">One useful action</p>
        <h1>{toolTitle}</h1>
        <p className="muted">Prototype recommendation based on: {selections.state}, {selections.need}, {selections.time}.</p>
        <article className="hero-card pale">
          <h2>Before you begin</h2>
          <p>This checkpoint shows the interaction shell only. Production tool scripts, audio, transcripts and safety notes still require PATH approval.</p>
          {toolTitle === 'Car-Before-Home Transition' ? <p className="warning">Required: confirm the vehicle is parked before text or audio guidance starts.</p> : <p className="warning">Begin only when you are somewhere safe. If you are in a vehicle, park first.</p>}
        </article>
        <button className="primary" type="button" onClick={() => onStep('guidance')}>I’m safely settled. Begin →</button>
        <button className="secondary" type="button" onClick={onSupport}>Get support instead</button>
      </section>
    )
  }

  if (step === 'guidance') {
    return (
      <section className="stack page-enter">
        <button className="text-button left" type="button" onClick={() => onStep('recommendation')}>← Back</button>
        <p className="eyebrow">Written guidance · sample only</p>
        <h1>{toolTitle}</h1>
        <ol className="steps">
          <li>Pause and notice one thing that tells you where you are now.</li>
          <li>Choose one small next action that is safe in this moment.</li>
          <li>When ready, finish, repeat, save, or reach support.</li>
        </ol>
        <p className="fineprint">Not approved clinical content. This placeholder is for navigation testing.</p>
        <div className="button-grid two">
          <button className="secondary" type="button" onClick={() => onStep('feedback')}>Finish</button>
          <button className="secondary" type="button" onClick={onSupport}>Support</button>
        </div>
      </section>
    )
  }

  return (
    <section className="stack page-enter">
      <p className="eyebrow">Optional feedback</p>
      <h1>Did this help?</h1>
      <p className="muted">You can skip. Feedback should never be required to complete a reset.</p>
      <div className="button-grid three">
        <button className="choice" type="button">Yes</button>
        <button className="choice" type="button">Not sure</button>
        <button className="choice" type="button">Skip</button>
      </div>
      <button className="primary" type="button" onClick={onSaveKit}>Save to Quick Kit →</button>
      <button className="secondary" type="button" onClick={() => onStep('state')}>Repeat reset</button>
    </section>
  )
}

function ChoiceStep({
  count,
  title,
  subtitle,
  options,
  selected,
  continueLabel = 'Continue',
  onPick,
  onContinue,
  onBack,
}: {
  count: string
  title: string
  subtitle: string
  options: readonly string[]
  selected?: string
  continueLabel?: string
  onPick: (value: string) => void
  onContinue: () => void
  onBack?: () => void
}) {
  return (
    <section className="stack page-enter">
      {onBack && <button className="text-button left" type="button" onClick={onBack}>← Back</button>}
      <p className="eyebrow">Your reset · {count}</p>
      <h1>{title}</h1>
      <p className="muted">{subtitle}</p>
      <div className="choice-grid">
        {options.map((option) => (
          <button className={selected === option ? 'choice selected' : 'choice'} type="button" key={option} onClick={() => onPick(option)}>{option}</button>
        ))}
      </div>
      <button className="primary" type="button" disabled={!selected} onClick={onContinue}>{continueLabel}</button>
      <p className="fineprint">Your check-in stays private.</p>
    </section>
  )
}

function MyPath({ selectedDay, onSelectDay, onReset }: { selectedDay: number; onSelectDay: (day: number) => void; onReset: () => void }) {
  const selected = sevenDayReset.find((day) => day.day === selectedDay) ?? sevenDayReset[0]

  return (
    <section className="stack page-enter">
      <div>
        <p className="eyebrow">My Path</p>
        <h1>Build skills without shame.</h1>
        <p className="muted">Missed days never reset program progress.</p>
      </div>
      <article className="hero-card pale">
        <div className="section-row compact">
          <h2>Seven-Day Reset</h2>
          <span className="badge">Free</span>
        </div>
        <p>Continue day {selected.day}: {selected.focus}</p>
        <button className="primary" type="button">Resume lesson →</button>
      </article>
      <div className="day-strip" aria-label="Seven-Day Reset days">
        {sevenDayReset.map((day) => (
          <button className={selectedDay === day.day ? 'day active' : 'day'} type="button" key={day.day} onClick={() => onSelectDay(day.day)}>Day {day.day}</button>
        ))}
      </div>
      <article className="lesson-card">
        <p className="eyebrow">Day {selected.day} · {selected.focus}</p>
        <h2>{selected.action}</h2>
        <ul className="parts">{lessonParts.map((part) => <li key={part}>{part}</li>)}</ul>
        <button className="secondary" type="button" onClick={onReset}>Try related reset</button>
      </article>
      <article className="list-card static">
        <span>28-Day Nervous System Reset</span>
        <small>{twentyEightDayWeeks.map((week) => week.theme).join(' · ')}</small>
      </article>
    </section>
  )
}

function QuickKit({ onBack }: { onBack: () => void }) {
  return (
    <section className="stack page-enter">
      <button className="text-button left" type="button" onClick={onBack}>← Back</button>
      <p className="eyebrow">Within reach</p>
      <h1>My Quick Kit</h1>
      <p className="muted">Prototype checklist for the saved offline kit. Actual secure offline storage is a later engineering spike.</p>
      <div className="kit-grid">
        {quickKitComponents.map((component) => <span className="kit-item" key={component}>{component}</span>)}
      </div>
    </section>
  )
}

function Support() {
  return (
    <section className="stack page-enter">
      <p className="eyebrow">Support is never paywalled</p>
      <h1>Reach people, not a wall.</h1>
      <p className="muted">The app does not diagnose, monitor emergencies, or replace professional care.</p>
      <div className="support-list">
        {supportLevels.map((level, index) => <article className="support-card" key={level}><strong>Level {index + 1}</strong><span>{level}</span></article>)}
      </div>
      <article className="crisis-card">
        <h2>Need urgent help?</h2>
        <p>Canada: call or text 9-8-8 for suicide crisis support. If there is immediate danger, call 9-1-1.</p>
        <p className="fineprint">Regional resources must be verified before beta/release.</p>
      </article>
    </section>
  )
}

export default App
