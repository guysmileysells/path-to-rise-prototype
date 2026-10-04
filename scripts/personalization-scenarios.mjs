import assert from 'node:assert/strict'
import {
  createPersonalizationContext,
  personalizationSignalInventory,
  resolvePersonalization,
} from '../src/personalizationContent.ts'

const defaultProgress = {
  currentDay: 1,
  status: 'not_started',
  completedDays: [],
  daySectionProgress: {},
  savedReflections: {},
  lastReturn: 'today',
}

const defaultTools = {
  favouriteToolIds: [],
  recentToolIds: [],
  completedStandaloneToolIds: [],
}

function resolve(progress = {}, tools = {}) {
  const context = createPersonalizationContext({ ...defaultProgress, ...progress }, { ...defaultTools, ...tools })
  return { context, model: resolvePersonalization(context) }
}

const scenarios = [
  ['USER A brand new', {}, {}, 'start-current-day', 'Start Day 1'],
  ['USER B Day 1 in progress', { status: 'in_progress', daySectionProgress: { 1: ['day-section-01-real-talk'] } }, {}, 'continue-unfinished-day', 'Continue Day 1'],
  ['USER C Day 9 active', { currentDay: 9, completedDays: [1, 2, 3, 4, 5, 6, 7, 8], status: 'not_started' }, {}, 'start-current-day', 'Begin Day 9'],
  ['USER D Day 9 partially complete', { completedDays: [1, 2, 3, 4, 5, 6, 7, 8], status: 'in_progress', daySectionProgress: { 9: ['day-section-01-real-talk'] } }, {}, 'continue-unfinished-day', 'Continue Day 9'],
  ['USER E Day 9 complete Day 10 next', { completedDays: [1, 2, 3, 4, 5, 6, 7, 8, 9] }, {}, 'start-current-day', 'Begin Day 10'],
  ['USER F returning after break', { completedDays: [1, 2], lastReturn: 'after_break' }, {}, 'start-current-day', 'Begin Day 3'],
  ['USER G favourite no recent', {}, { favouriteToolIds: ['mirror-breathwork'] }, 'start-current-day', 'Start Day 1'],
  ['USER H recent no favourite', {}, { recentToolIds: ['hydration-reset'] }, 'start-current-day', 'Start Day 1'],
  ['USER I favourite and recent overlap', {}, { favouriteToolIds: ['hydration-reset'], recentToolIds: ['hydration-reset'] }, 'start-current-day', 'Start Day 1'],
  ['USER J interrupted standalone proxy recent', {}, { recentToolIds: ['evening-reset'] }, 'start-current-day', 'Start Day 1'],
  ['USER K Day 28 complete', { status: 'program_complete', completedDays: Array.from({ length: 28 }, (_, index) => index + 1) }, {}, 'post-program-maintenance', 'Reset or revisit a practice'],
  ['USER L completed program returning weeks later', { status: 'program_complete', completedDays: Array.from({ length: 28 }, (_, index) => index + 1), lastReturn: 'after_break' }, { favouriteToolIds: ['mirror-breathwork'] }, 'post-program-maintenance', 'Reset or revisit a practice'],
  ['USER M corrupt optional state sanitized', {}, { favouriteToolIds: ['bad-id', 'mirror-breathwork'], recentToolIds: ['bad-id'] }, 'start-current-day', 'Start Day 1'],
  ['USER N no personalization state', {}, {}, 'start-current-day', 'Start Day 1'],
]

const results = []
for (const [name, progress, tools, expectedRule, expectedLabel] of scenarios) {
  const { context, model } = resolve(progress, tools)
  assert.equal(model.primary.ruleId, expectedRule, name)
  assert.equal(model.primary.label, expectedLabel, name)
  assert.equal(typeof model.primary.reason, 'string', name)
  assert(!model.primary.reason.includes('detected'), name)
  assert(!model.primary.reason.includes('struggling lately'), name)
  assert.equal(typeof context.currentWeek, 'number', name)
  results.push({ name, expectedRule, actualRule: model.primary.ruleId, result: 'PASS' })
}

const collisionTests = [
  ['unfinished Day + favourite', { status: 'in_progress', daySectionProgress: { 1: ['day-section-01-real-talk'] } }, { favouriteToolIds: ['mirror-breathwork'] }, 'continue-unfinished-day', 'favourite-tool-shortcut'],
  ['unfinished Day + recent tool', { status: 'in_progress', daySectionProgress: { 1: ['day-section-01-real-talk'] } }, { recentToolIds: ['hydration-reset'] }, 'continue-unfinished-day', 'recent-tool-shortcut'],
  ['completed Day + favourite', { completedDays: [1] }, { favouriteToolIds: ['mirror-breathwork'] }, 'start-current-day', 'favourite-tool-shortcut'],
  ['favourite + recent same tool', {}, { favouriteToolIds: ['mirror-breathwork'], recentToolIds: ['mirror-breathwork'] }, 'start-current-day', 'favourite-tool-shortcut'],
  ['program complete + favourite', { status: 'program_complete', completedDays: Array.from({ length: 28 }, (_, index) => index + 1) }, { favouriteToolIds: ['mirror-breathwork'] }, 'post-program-maintenance', 'favourite-tool-shortcut'],
  ['missing recommendation target', {}, { favouriteToolIds: ['missing-tool'], recentToolIds: ['missing-tool'] }, 'start-current-day', 'current-week-tool-shortcut'],
]

for (const [name, progress, tools, expectedPrimary, expectedShortcut] of collisionTests) {
  const { model } = resolve(progress, tools)
  assert.equal(model.primary.ruleId, expectedPrimary, name)
  assert.equal(model.shortcut?.ruleId, expectedShortcut, name)
  results.push({ name: `collision: ${name}`, expectedRule: expectedPrimary, actualRule: model.primary.ruleId, shortcutRule: model.shortcut?.ruleId, result: 'PASS' })
}

const savedReflections = personalizationSignalInventory.find((signal) => signal.signal === 'savedReflections')
assert.equal(savedReflections?.classification, 'E_PROHIBITED_FOR_PERSONALIZATION')
assert.equal(savedReflections?.permitted, false)

console.log(JSON.stringify({ scenarioCount: scenarios.length, collisionCount: collisionTests.length, journalContentExcluded: true, results }, null, 2))
