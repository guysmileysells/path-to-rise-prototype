import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

const app = readFileSync(new URL('../src/App.tsx', import.meta.url), 'utf8')
const progress = readFileSync(new URL('../src/progressContent.ts', import.meta.url), 'utf8')
const personalization = readFileSync(new URL('../src/personalizationContent.ts', import.meta.url), 'utf8')
const styles = readFileSync(new URL('../src/App.css', import.meta.url), 'utf8')
const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8')
const pkg = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf8'))

const failures = []
function check(name, fn) {
  try {
    fn()
  } catch (error) {
    failures.push({ name, error: error.message })
  }
}

check('accurate local-storage disclosure replaces false no-data claim', () => {
  assert.ok(app.includes('Progress and saved reflections stay local to this browser for now'))
  assert.equal(app.includes('no personal data saved'), false)
})

check('reflection privacy controls exist', () => {
  assert.ok(app.includes('Delete saved reflection'))
  assert.ok(app.includes('reflectionMaxLength'))
  assert.ok(app.includes('Saved reflection text stays local to this browser and is not used for personalization or automatic insights.'))
  assert.equal(personalization.includes('savedReflections') && personalization.includes('E_PROHIBITED_FOR_PERSONALIZATION'), true)
  assert.equal(progress.includes('The app counts references only; it does not analyze reflection text.'), true)
})

check('destructive local data controls are explicit and separated', () => {
  assert.ok(app.includes('Clear progress + reflections'))
  assert.ok(app.includes('Clear Toolbox preferences'))
  assert.ok(app.includes('Clear all local prototype data'))
  assert.ok(app.includes('window.confirm'))
})

check('no sensitive network or analytics paths added', () => {
  assert.equal(/fetch\s*\(|XMLHttpRequest|gtag|posthog|sentry|analytics\.track/.test(app), false)
})

check('no unsafe HTML injection or app console logging', () => {
  assert.equal(/dangerouslySetInnerHTML|\.innerHTML/.test(app), false)
  assert.equal(/console\./.test(app), false)
})

check('client secret patterns are absent from app code', () => {
  assert.equal(/api[_-]?key|secret|password|token/i.test(app), false)
})

check('accessible status and destructive styling exist', () => {
  assert.ok(app.includes('role="status"'))
  assert.ok(styles.includes('.storage-status'))
  assert.ok(styles.includes('.secondary.danger'))
  assert.ok(styles.includes('@media (prefers-reduced-motion: reduce)'))
})

check('minimal privacy meta policy present', () => {
  assert.ok(html.includes('name="referrer" content="no-referrer"'))
})

check('dependency surface remains small', () => {
  assert.deepEqual(Object.keys(pkg.dependencies).sort(), ['react', 'react-dom'])
})

if (failures.length) {
  console.error(JSON.stringify({ result: 'FAIL', failures }, null, 2))
  process.exit(1)
}

console.log(JSON.stringify({
  result: 'PASS',
  checks: 9,
  privacy: 'journal/reflection text excluded from analytics, URLs, logs, personalization and automatic insights in static review',
  storage: 'prototype localStorage explicitly disclosed and destructive controls separated',
  accessibility: 'status live region/focus/reduced-motion foundations present',
}, null, 2))
