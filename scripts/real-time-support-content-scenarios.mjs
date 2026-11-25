import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { createHash } from 'node:crypto'
import { realTimeSupportTools as tools } from '../src/realTimeSupportContent.ts'

const fixture = JSON.parse(readFileSync(new URL('../evidence/real-time-support/source-integrity-baseline.json', import.meta.url), 'utf8'))
for (const [path, expected] of Object.entries(fixture.protected)) {
  const text = readFileSync(new URL(`../${path}`, import.meta.url), 'utf8').replaceAll('\r\n', '\n')
  assert.equal(createHash('sha256').update(text).digest('hex'), expected, `${path}: original source must not change`)
}
assert.deepEqual(tools.map(t => t.title), ['Physiological Reset', 'Here and Now Reset', 'Intrusive Thought Reset', "Respond, Don't React", 'Post-Incident Recovery Reset'])
assert.equal(new Set(tools.map(t => t.id)).size, 5)
assert.deepEqual(tools.map(t => t.how.length), [3, 6, 5, 4, 6])
for (const tool of tools) {
  assert(tool.what && tool.why && tool.duration)
  assert(tool.when.length >= 3 && tool.when.length <= 5)
  assert(tool.benefits.length >= 3 && tool.benefits.length <= 5)
  assert(tool.adaptations.length >= 1)
  assert(tool.references.length >= 1)
  for (const ref of tool.references) {
    assert.equal(new URL(ref.url).protocol, 'https:')
    assert(ref.title && ref.note)
  }
}
const module = readFileSync(new URL('../src/RealTimeSupport.tsx', import.meta.url), 'utf8')
assert(!/localStorage|sessionStorage|fetch\(|sendBeacon|XMLHttpRequest|console\./.test(module), 'Standalone tools must not store/transmit/log ratings or narratives')
assert(!/textarea|dangerouslySetInnerHTML/.test(module), 'No thought/incident narrative collection or unsafe HTML')
assert(module.includes('v.localService'), 'Audio only uses a local installed voice')
assert(module.includes('document.hidden'), 'Pause when hidden; do not promise background practice')
console.log(`PASS original ${Object.keys(fixture.protected).length} source/model/storage files preserved; exact five flows, required metadata and no new collection APIs`)
