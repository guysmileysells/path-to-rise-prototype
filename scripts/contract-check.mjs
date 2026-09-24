import { readFileSync } from 'node:fs'

const data = readFileSync(new URL('../src/pathData.ts', import.meta.url), 'utf8')
const app = readFileSync(new URL('../src/App.tsx', import.meta.url), 'utf8')

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

const forbiddenPrimaryTabs = ['Journal', 'Settings', 'Quick Kit', 'Progress']
const navBlock = app.slice(app.indexOf('<nav className="bottom-nav"'), app.indexOf('</nav>'))
for (const label of forbiddenPrimaryTabs) {
  if (navBlock.includes(label)) failures.push(`bottom nav includes forbidden primary tab: ${label}`)
}

if (!app.includes('Sample content, no personal data saved')) failures.push('prototype disclaimer missing')
if (!app.includes('Not approved clinical content')) failures.push('clinical placeholder warning missing')
if (!app.includes('Support is never paywalled')) failures.push('support paywall boundary missing')

if (failures.length) {
  console.error('Contract check failed:')
  for (const failure of failures) console.error(`- ${failure}`)
  process.exit(1)
}

console.log('Contract check passed: source labels, 20-tool inventory, four-tab nav, and safety disclaimers present.')
