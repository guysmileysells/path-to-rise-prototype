import { readFileSync } from 'node:fs'

const data = readFileSync(new URL('../src/pathData.ts', import.meta.url), 'utf8')
const programContent = readFileSync(new URL('../src/programContent.ts', import.meta.url), 'utf8')
const app = readFileSync(new URL('../src/App.tsx', import.meta.url), 'utf8')
const toolContent = readFileSync(new URL('../src/toolContent.ts', import.meta.url), 'utf8')
const personalizationContent = readFileSync(new URL('../src/personalizationContent.ts', import.meta.url), 'utf8')
const progressContent = readFileSync(new URL('../src/progressContent.ts', import.meta.url), 'utf8')
const styles = readFileSync(new URL('../src/App.css', import.meta.url), 'utf8')

const required = {
  states: ['Steady', 'Activated', 'Overwhelmed', 'Shut down', 'Exhausted', 'Disconnected'],
  needs: ['Calm down', 'Wake up', 'Clear my head', 'Leave work at work', 'Sleep', 'Reconnect', 'Gain perspective'],
  times: ['60 seconds', '3 minutes', '10 minutes', 'Or more'],
  tabs: ['Today', 'Reset', 'My Path', 'Support'],
  sevenDayActions: [
    'Identify the current nervous-system state',
    'Complete the 90-Second Downshift',
    'Use the End-of-Shift Reset',
    'Complete a short Nature Reset',
    'Choose one controllable action',
    'Reach out to one trusted person',
    'Build a personal Quick Kit',
  ],
  lessonParts: ['Real Talk', 'Understand It', 'See It', 'Do It', 'Carry It', 'Check It'],
}

const failures = []

for (const [group, values] of Object.entries(required)) {
  const source = group === 'tabs' ? app : data
  for (const value of values) {
    if (!source.includes(value)) failures.push(`${group}: missing ${value}`)
  }
}

const toolMatches = [...data.matchAll(/id: 'TOOL-\d{2}'/g)]
if (toolMatches.length !== 20) failures.push(`toolInventory: expected 20 tools, found ${toolMatches.length}`)

const programDayMatches = [...programContent.matchAll(/"day": \d+/g)]
if (programDayMatches.length !== 28) failures.push(`prompt5: expected 28 source-backed days, found ${programDayMatches.length}`)

const requiredPrompt5ProgramContent = [
  'week-01-source.docx',
  'week-02-source.docx',
  'week-03-source.docx',
  'week-04-source.docx',
  'Resetting the Baseline',
  'Seeing What Is There Without Avoidance',
  'Accepting What Is',
  'Integration, Reflection & Preparing For Your Next Chapter',
  'VERIFIED_FROM_DOCX',
]
for (const value of requiredPrompt5ProgramContent) {
  if (!programContent.includes(value)) failures.push(`prompt5 content: missing ${value}`)
}

const requiredPrompt5App = [
  'Source-backed program',
  'Opening a day does not complete it',
  'Complete Day',
  'Save reflection',
  'This prototype stores saved text locally on this device.',
]
for (const value of requiredPrompt5App) {
  if (!app.includes(value)) failures.push(`prompt5 app: missing ${value}`)
}

const forbiddenPrompt5App = ['leaderboard', 'AI therapist']
for (const value of forbiddenPrompt5App) {
  if (app.includes(value)) failures.push(`prompt5: forbidden product concept present: ${value}`)
}

const forbiddenPrimaryTabs = ['Journal', 'Settings', 'Quick Kit', 'Progress']
const navBlock = app.slice(app.indexOf('<nav className="bottom-nav"'), app.indexOf('</nav>'))
for (const label of forbiddenPrimaryTabs) {
  if (navBlock.includes(label)) failures.push(`bottom nav includes forbidden primary tab: ${label}`)
}

if (!app.includes('Progress and saved reflections stay local to this browser for now')) failures.push('accurate prototype storage disclosure missing')
if (!app.includes('Not approved clinical content')) failures.push('clinical placeholder warning missing')
if (!app.includes('Support is never paywalled')) failures.push('support paywall boundary missing')

const prompt4RequiredApp = [
  'RESET + Toolbox active',
  'There is no Day 29 to chase.',
  'Missed days never reset program progress.',
]
for (const value of prompt4RequiredApp) {
  if (!app.includes(value)) failures.push(`prompt4/6: missing ${value}`)
}

const requiredPrompt6App = [
  'What do you need right now?',
  'Standalone tool completion is separate from Day completion',
  'Open Toolbox',
  'Favourite',
  'Recent',
  'This is not a diagnosis',
]
for (const value of requiredPrompt6App) {
  if (!app.includes(value)) failures.push(`prompt6 app: missing ${value}`)
}

const requiredPrompt6ToolContent = [
  'canonicalTools',
  'resetNeeds',
  'Mirror Breathwork',
  'Hydration Reset',
  'Immediate Movement',
  'Check In With Someone Safe',
  'resetEligible: true',
  'sourceRefs',
]
for (const value of requiredPrompt6ToolContent) {
  if (!toolContent.includes(value)) failures.push(`prompt6 tool model: missing ${value}`)
}

const canonicalToolMatches = [...toolContent.matchAll(/id: '[a-z0-9-]+'/g)]
if (canonicalToolMatches.length < 10) failures.push(`prompt6: expected at least 10 canonical tools, found ${canonicalToolMatches.length}`)

const forbiddenPrompt6 = ['symptom checker', 'panic attack', 'PTSD symptoms', 'psychological profile', 'mental-health scoring']
for (const value of forbiddenPrompt6) {
  if (app.includes(value) || toolContent.includes(value)) failures.push(`prompt6: forbidden diagnostic/profiling concept present: ${value}`)
}

const forbiddenFakeReset = ['How are you arriving?', 'Prototype recommendation based on', 'Find my reset', 'Did this help?']
for (const value of forbiddenFakeReset) {
  if (app.includes(value)) failures.push(`prompt4: fake RESET flow still present: ${value}`)
}

const requiredPrompt7App = [
  'Personalization is transparent',
  'Private reflections are not analyzed or used for recommendations',
  'Saved shortcut',
  'From Week',
  'After Day 28',
]
for (const value of requiredPrompt7App) {
  if (!app.includes(value)) failures.push(`prompt7 app: missing ${value}`)
}

const requiredPrompt7Rules = [
  'personalizationSignalInventory',
  'continue-unfinished-day',
  'post-program-maintenance',
  'favourite-tool-shortcut',
  'recent-tool-shortcut',
  'current-week-tool-shortcut',
  'E_PROHIBITED_FOR_PERSONALIZATION',
  'savedReflections',
]
for (const value of requiredPrompt7Rules) {
  if (!personalizationContent.includes(value)) failures.push(`prompt7 rules: missing ${value}`)
}

const forbiddenPrompt7 = ['PTSD scoring', 'sentiment', 'anxiety inference', 'resilience score', 'nervous-system health score', 'recommendation_shown']
for (const value of forbiddenPrompt7) {
  if (app.includes(value) || personalizationContent.includes(value)) failures.push(`prompt7: forbidden profiling/analytics concept present: ${value}`)
}

const requiredPrompt8App = [
  'Progress + Insights',
  'Meaningful progress, reflection and continuity — zero pressure',
  'Progress shows movement through the program. It is not a wellness score, clinical rating or recovery percentage.',
  'Four-week journey',
  'Day-level progress',
  'Descriptive only',
  'Private review',
  'No failed, missed or late state is used for normal progression.',
]
for (const value of requiredPrompt8App) {
  if (!app.includes(value)) failures.push(`prompt8 app: missing ${value}`)
}

const requiredPrompt8Progress = [
  'progressDataInventory',
  'createProgressViewModel',
  'progressInsightRules',
  'resolveProgressInsights',
  'journey-position',
  'practice-summary',
  'reflection-review',
  'post-program-continuity',
  'DO_NOT_USE',
  'This is engagement/practice history, not proof of clinical improvement.',
]
for (const value of requiredPrompt8Progress) {
  if (!progressContent.includes(value)) failures.push(`prompt8 progress model: missing ${value}`)
}

const forbiddenPrompt8 = ['resilience score', 'trauma score', 'PTSD score', 'anxiety score', 'lost your streak', "don't break your streak", 'failed day']
for (const value of forbiddenPrompt8) {
  if (app.toLowerCase().includes(value.toLowerCase()) || progressContent.toLowerCase().includes(value.toLowerCase())) failures.push(`prompt8: forbidden progress/clinical concept present: ${value}`)
}

const requiredStyleTokens = [
  '--color-bg-app',
  '--color-bg-phone',
  '--color-action-primary',
  '--color-focus-ring',
  '--space-5',
  '--radius-md',
  '@media (prefers-reduced-motion: reduce)',
  ':focus-visible',
]
for (const token of requiredStyleTokens) {
  if (!styles.includes(token)) failures.push(`design tokens: missing ${token}`)
}

if (failures.length) {
  console.error('Contract check failed:')
  for (const failure of failures) console.error(`- ${failure}`)
  process.exit(1)
}

console.log('Contract check passed: source labels, 20-tool inventory, four-tab nav, and safety disclaimers present.')
