import assert from 'node:assert/strict'
import {
  createProgressViewModel,
  progressDataInventory,
  resolveProgressInsights,
} from '../src/progressContent.ts'

const emptyToolState = {
  favouriteToolIds: [],
  recentToolIds: [],
  completedStandaloneToolIds: [],
}

const baseProgress = {
  currentDay: 1,
  status: 'not_started',
  completedDays: [],
  daySectionProgress: {},
  savedReflections: {},
  lastReturn: 'today',
}

const days = (count) => Array.from({ length: count }, (_, index) => index + 1)

const cases = [
  { name: 'FLOW A new user', progress: baseProgress, expected: { daysCompleted: 0, currentDay: 1, currentWeek: 1, programComplete: false } },
  { name: 'FLOW B Day 1 complete', progress: { ...baseProgress, currentDay: 2, completedDays: [1] }, expected: { daysCompleted: 1, currentDay: 2, currentWeek: 1, programComplete: false } },
  { name: 'FLOW C Day 7 complete Week 1 complete', progress: { ...baseProgress, currentDay: 8, completedDays: days(7) }, expected: { daysCompleted: 7, currentDay: 8, currentWeek: 2, completedWeeks: [1] } },
  { name: 'FLOW D Day 8 Week 2 current', progress: { ...baseProgress, currentDay: 8, completedDays: days(7) }, expected: { currentDay: 8, currentWeek: 2 } },
  { name: 'FLOW E Day 14 Week 2 complete', progress: { ...baseProgress, currentDay: 15, completedDays: days(14) }, expected: { daysCompleted: 14, currentDay: 15, currentWeek: 3, completedWeeks: [1, 2] } },
  { name: 'FLOW F Day 21 Week 3 complete', progress: { ...baseProgress, currentDay: 22, completedDays: days(21) }, expected: { daysCompleted: 21, currentDay: 22, currentWeek: 4, completedWeeks: [1, 2, 3] } },
  { name: 'FLOW G Day 28 complete', progress: { ...baseProgress, currentDay: 28, status: 'program_complete', completedDays: days(28) }, expected: { daysCompleted: 28, currentDay: 28, currentWeek: 4, programComplete: true, completedWeeks: [1, 2, 3, 4] } },
  { name: 'EDGE duplicate Days counted once', progress: { ...baseProgress, completedDays: [1, 1, 2, 2, 999, -1] }, expected: { daysCompleted: 2, currentDay: 3, integrity: true } },
  { name: 'EDGE invalid currentDay recovers from first incomplete', progress: { ...baseProgress, currentDay: 99, completedDays: [1, 2, 3] }, expected: { daysCompleted: 3, currentDay: 4, integrity: true } },
  { name: 'EDGE contradictory complete status preserves note', progress: { ...baseProgress, status: 'program_complete', completedDays: [1, 2, 3] }, expected: { programComplete: true, currentDay: 28, integrity: true } },
  { name: 'FLOW M missed days non punitive', progress: { ...baseProgress, currentDay: 12, completedDays: [1, 2, 3], lastReturn: 'after_break' }, expected: { currentDay: 4, forbidden: ['failed', 'missed', 'late', 'streak'] } },
]

const results = []
for (const scenario of cases) {
  const model = createProgressViewModel(scenario.progress, emptyToolState)
  if ('daysCompleted' in scenario.expected) assert.equal(model.daysCompleted, scenario.expected.daysCompleted, scenario.name)
  if ('currentDay' in scenario.expected) assert.equal(model.currentDay, scenario.expected.currentDay, scenario.name)
  if ('currentWeek' in scenario.expected) assert.equal(model.currentWeek, scenario.expected.currentWeek, scenario.name)
  if ('programComplete' in scenario.expected) assert.equal(model.programComplete, scenario.expected.programComplete, scenario.name)
  if (scenario.expected.completedWeeks) assert.deepEqual(model.completedWeeks, scenario.expected.completedWeeks, scenario.name)
  if (scenario.expected.integrity) assert.ok(model.dataIntegrityNotes.length > 0, `${scenario.name} should expose a non-destructive integrity note`)
  const text = JSON.stringify(model).toLowerCase()
  if (scenario.expected.forbidden) {
    for (const forbidden of scenario.expected.forbidden) assert.ok(!text.includes(forbidden), `${scenario.name} should not include ${forbidden}`)
  }
  results.push({ name: scenario.name, result: 'PASS' })
}

const withReflection = createProgressViewModel({
  ...baseProgress,
  savedReflections: { 'day-1:day-section-04-continue': 'PRIVATE REFLECTION THAT MUST NOT BECOME AN INSIGHT' },
}, emptyToolState)
const reflectionInsights = resolveProgressInsights(withReflection)
assert.ok(reflectionInsights.some((insight) => insight.insightId === 'reflection-review'), 'reflection reference insight should appear')
assert.ok(!JSON.stringify(reflectionInsights).includes('PRIVATE REFLECTION'), 'reflection content must not appear in insights')

const resetIsolationBefore = createProgressViewModel({ ...baseProgress, completedDays: [1, 2, 3] }, emptyToolState)
const resetIsolationAfter = createProgressViewModel({ ...baseProgress, completedDays: [1, 2, 3] }, { ...emptyToolState, completedStandaloneToolIds: ['mirror-breathwork'] })
assert.equal(resetIsolationBefore.daysCompleted, resetIsolationAfter.daysCompleted, 'standalone tool completion must not change Day progress')
assert.equal(resetIsolationBefore.currentDay, resetIsolationAfter.currentDay, 'standalone tool completion must not change current Day')

const inventoryForbidden = progressDataInventory.find((item) => item.field.includes('time spent'))
assert.equal(inventoryForbidden?.permittedUse, 'DO_NOT_USE', 'time/session/streak-style metrics must not be used')

console.log(JSON.stringify({
  scenarioCount: cases.length,
  reflectionContentExcludedFromInsights: true,
  resetToolboxIsolation: true,
  results,
}, null, 2))
