import assert from 'node:assert/strict'
import * as presentation from '../src/taskPresentation.ts'

import { programContent } from '../src/programContent.ts'
import { dayRoadmaps, getAllRoadmapTasks } from '../src/dayRoadmap.ts'
import { writeFileSync, mkdirSync, readFileSync } from 'node:fs'
import { createHash } from 'node:crypto'

const baseline = JSON.parse(readFileSync(new URL('../evidence/word-spacing/source-spacing-baseline.json', import.meta.url), 'utf8'))
const digest = value => createHash('sha256').update(value).digest('hex')
const sourceBytes = readFileSync(new URL('../src/programContent.ts', import.meta.url), 'utf8').replace(/\r\n/g, '\n')
const originalSourceUnmodified = digest(sourceBytes) === baseline.originalProgramSourceSha256
assert.equal(originalSourceUnmodified, true, 'Supplied program source must remain unchanged against the accepted Git baseline')
const format = presentation.formatProgramText ?? (value => value)
const cases = [
  ['2.Emotional | One-page writing exercise', '2. Emotional | One-page writing exercise'],
  ['Every healthy decision you made became evidence….Evidence creates belief.', 'Every healthy decision you made became evidence…. Evidence creates belief.'],
]
for (const [before, after] of cases) {
  assert.equal(format(before), after)
  assert.equal(format(before).replace(/\s/g, ''), before.replace(/\s/g, ''), 'Only whitespace may change')
  assert.equal(format(after), after, 'Formatting must be idempotent')
}
for (const unchanged of ['9-8-8 in Canada', '3× / 6× / 9×', '20-minute walk', '1.5 minutes', 'https://example.com/a.b', '8:30', 'non-dominant', 'I don’t have to force anything.', 'WHEN: Midday or evening']) assert.equal(format(unchanged), unchanged)
const changes = []
let sourceStrings = 0, spacesAdded = 0
for (const day of programContent) for (const section of day.sections) {
  for (const [index, before] of [section.label, ...section.content].entries()) {
    sourceStrings++
    const after = format(before)
    assert.equal(after.replace(/\s/g, ''), before.replace(/\s/g, ''), `Day ${day.day}: non-whitespace source content changed`)
    assert.equal(format(after), after, 'All source formatting must be idempotent')
    assert.ok(!/[A-Za-z]…\.?[A-Za-z]/.test(after), `Unreviewed letter-to-letter ellipsis join: ${after}`)
    if (before !== after) {
      spacesAdded += after.length - before.length
      changes.push({ day: day.day, section: section.id, index, before, after })
    }
  }
}
assert.equal(changes.length, 58, 'Exact audited source-string scope must not expand silently')
assert.equal(spacesAdded, 73)
assert.equal(format('5…4…3…2…1…MOVE'), '5…4…3…2…1…MOVE')
assert.equal(format('P.A.T.H / R.I.S.E. · 500mL–1L · 2x 10'), 'P.A.T.H / R.I.S.E. · 500mL–1L · 2x 10')
// Exercise the actual rendered-task presentation, not only the helper.
let taskViews = 0
for (const day of dayRoadmaps) for (const task of getAllRoadmapTasks(day)) {
  const view = presentation.getTaskPresentation(task)
  const canonical = JSON.stringify(view, (_key, value) => typeof value === 'string' ? value.replace(/\s/g, '') : value)
  assert.equal(digest(canonical), baseline.taskViews[task.id], `Original presentation structure/ordering/non-whitespace content changed: ${task.id}`)
  for (const text of [view.what, view.when, ...view.how, ...view.benefits]) {
    assert.equal(format(text), text, `Unformatted task presentation ${task.id}`)
  }
  taskViews++
}
const summary = { result: 'PASS', sourceStrings, correctedSourceStrings: changes.length, spacesAdded, taskViews, nonWhitespaceSourcePreserved: true, originalSourceUnmodified, baselineTaskViewsPreserved: true }
mkdirSync('evidence/word-spacing', { recursive: true })
writeFileSync('evidence/word-spacing/source-spacing-report.json', JSON.stringify({ ...summary, changes }, null, 2))
console.log(JSON.stringify(summary))
