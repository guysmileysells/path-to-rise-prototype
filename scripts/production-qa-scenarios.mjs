import assert from 'node:assert/strict'
import { programContent } from '../src/programContent.ts'
import {
  canonicalTools,
  getCanonicalTool,
  getResetNeed,
  getToolSourceSection,
  resetNeeds,
  sanitizeToolIds,
} from '../src/toolContent.ts'
import { createPersonalizationContext, resolvePersonalization } from '../src/personalizationContent.ts'
import { createProgressViewModel, resolveProgressInsights } from '../src/progressContent.ts'
import {
  buildNotificationPayload,
  defaultNotificationPreferences,
  getActiveReminders,
  isSafeNotificationCopy,
  notificationCopyRegistry,
  parseNotificationPreferences,
  reconcilePreferencesForProgramState,
  resolveNotificationOpen,
  validateNotificationPrivacyBoundary,
} from '../src/notificationContent.ts'

const results = []
function scenario(name, fn) {
  fn()
  results.push({ name, result: 'PASS' })
}

const baseProgress = {
  currentDay: 1,
  status: 'not_started',
  completedDays: [],
  daySectionProgress: {},
  savedReflections: {},
  lastReturn: 'today',
}
const emptyToolState = { favouriteToolIds: [], recentToolIds: [], completedStandaloneToolIds: [] }
const days = (count) => Array.from({ length: count }, (_, index) => index + 1)

scenario('CONTENT all 28 Days exist exactly once and map to four 7-day weeks', () => {
  assert.equal(programContent.length, 28)
  assert.deepEqual(programContent.map((day) => day.day), days(28))
  for (const day of programContent) {
    assert.equal(day.week, Math.ceil(day.day / 7), `Day ${day.day} week mapping`)
    assert.ok(day.title.trim().length > 0, `Day ${day.day} title`)
    assert.ok(day.purpose.trim().length > 0, `Day ${day.day} purpose`)
    assert.ok(day.sections.length > 0, `Day ${day.day} sections`)
    assert.match(day.sourceFile, /^week-0[1-4]-source\.docx$/)
  }
})

scenario('CONTENT all program section IDs are unique within each Day and renderable', () => {
  let sectionCount = 0
  for (const day of programContent) {
    const ids = day.sections.map((section) => section.id)
    assert.equal(new Set(ids).size, ids.length, `Day ${day.day} duplicate section IDs`)
    for (const section of day.sections) {
      sectionCount += 1
      assert.ok(section.label.trim(), `Day ${day.day} section label`)
      assert.ok(section.content.length > 0, `Day ${day.day} section content`)
      assert.ok(section.content.every((line) => typeof line === 'string'), `Day ${day.day} section text shape`)
      assert.ok(['read', 'do', 'reflect', 'complete'].includes(section.kind), `Day ${day.day} section kind`)
    }
  }
  assert.equal(sectionCount, 311)
})

scenario('TOOLBOX every canonical tool resolves to source-backed program content', () => {
  assert.equal(canonicalTools.length, 10)
  for (const tool of canonicalTools) {
    assert.equal(getCanonicalTool(tool.id)?.id, tool.id)
    assert.ok(tool.toolboxEligible, `${tool.id} toolbox eligible`)
    assert.ok(tool.sourceRefs.length > 0, `${tool.id} source refs`)
    const { day, section } = getToolSourceSection(tool)
    assert.ok(day, `${tool.id} source day exists`)
    assert.ok(section, `${tool.id} source section exists`)
    assert.ok(tool.safetyMetadata.trim(), `${tool.id} safety metadata`)
  }
})

scenario('RESET every visible need maps to valid reset-eligible tools with no dead ends', () => {
  assert.equal(resetNeeds.length, 9)
  for (const need of resetNeeds) {
    assert.equal(getResetNeed(need.id)?.id, need.id)
    const primary = getCanonicalTool(need.primaryToolId)
    assert.ok(primary, `${need.id} primary tool exists`)
    assert.equal(primary?.resetEligible, true, `${need.id} primary reset eligible`)
    for (const alternativeId of need.alternativeToolIds) {
      const alternative = getCanonicalTool(alternativeId)
      assert.ok(alternative, `${need.id} alternative exists`)
    }
  }
})

scenario('STATE completedDays invariant keeps only unique integers 1-28', () => {
  const model = createProgressViewModel({ ...baseProgress, currentDay: 999, completedDays: [1, 1, 2, 28, 29, 0, -5, '3'] }, emptyToolState)
  assert.equal(model.daysCompleted, 3)
  assert.equal(model.currentDay, 3)
  assert.ok(model.dataIntegrityNotes.length > 0)
})

scenario('STATE week transitions derive correctly at Day 7, 14, 21 and 28', () => {
  const cases = [
    { count: 7, currentDay: 8, week: 2, completedWeeks: [1] },
    { count: 14, currentDay: 15, week: 3, completedWeeks: [1, 2] },
    { count: 21, currentDay: 22, week: 4, completedWeeks: [1, 2, 3] },
    { count: 28, currentDay: 28, week: 4, completedWeeks: [1, 2, 3, 4], complete: true },
  ]
  for (const item of cases) {
    const model = createProgressViewModel({ ...baseProgress, status: item.complete ? 'program_complete' : 'in_progress', completedDays: days(item.count) }, emptyToolState)
    assert.equal(model.currentDay, item.currentDay)
    assert.equal(model.currentWeek, item.week)
    assert.deepEqual(model.completedWeeks, item.completedWeeks)
    assert.equal(model.programComplete, item.complete === true)
  }
})

scenario('STATE Day 28 terminal state never creates Day 29 or pressure copy', () => {
  const model = createProgressViewModel({ ...baseProgress, status: 'program_complete', currentDay: 28, completedDays: days(28) }, emptyToolState)
  const text = JSON.stringify(model).toLowerCase()
  assert.equal(model.currentDay, 28)
  assert.equal(model.programComplete, true)
  assert.ok(!text.includes('day 29'))
  assert.ok(!text.includes('streak'))
})

scenario('STATE standalone RESET/tool use cannot complete a Day', () => {
  const before = createProgressViewModel({ ...baseProgress, completedDays: [1, 2, 3] }, emptyToolState)
  const after = createProgressViewModel({ ...baseProgress, completedDays: [1, 2, 3] }, { ...emptyToolState, completedStandaloneToolIds: ['mirror-breathwork', 'mirror-breathwork'] })
  assert.equal(after.daysCompleted, before.daysCompleted)
  assert.equal(after.currentDay, before.currentDay)
  assert.deepEqual(sanitizeToolIds(['mirror-breathwork', 'bad', 'mirror-breathwork'], 20), ['mirror-breathwork'])
})

scenario('REFLECTION references are preserved without exposing private content in insights', () => {
  const privateText = 'PRIVATE QA REFLECTION SHOULD NOT LEAK INTO INSIGHTS'
  const model = createProgressViewModel({ ...baseProgress, savedReflections: { 'day-1:day-section-04-continue': privateText, 'day-999:missing': 'bad' } }, emptyToolState)
  const insights = resolveProgressInsights(model)
  assert.ok(model.reflectionReferences.some((item) => item.day === 1))
  assert.equal(model.reflectionReferences.some((item) => item.key.includes('999')), false)
  assert.ok(!JSON.stringify(insights).includes(privateText))
})

scenario('PERSONALIZATION remains deterministic and ignores private reflection text', () => {
  const privateText = 'PRIVATE QA PERSONALIZATION TEXT'
  const context = createPersonalizationContext(
    { ...baseProgress, status: 'in_progress', daySectionProgress: { 3: ['day-section-01-today-s-focus'] }, savedReflections: { 'day-3:x': privateText }, completedDays: [1, 2] },
    { favouriteToolIds: ['bad-id', 'mirror-breathwork'], recentToolIds: ['nature-walk-stretch', 'bad-id'], completedStandaloneToolIds: ['gratitude-reflection'] },
  )
  const recommendation = resolvePersonalization(context)
  assert.equal(context.currentDay, 3)
  assert.equal(recommendation.primary.ruleId, 'continue-unfinished-day')
  assert.ok(!JSON.stringify(recommendation).includes(privateText))
})

scenario('NOTIFICATION malformed preferences recover and invalid practice targets do not schedule', () => {
  const parsed = parseNotificationPreferences(JSON.stringify({
    schemaVersion: 0,
    quietHours: { enabled: true, start: '99:99', end: 'bad' },
    programReminder: { enabled: true, schedule: { time: '25:99', frequency: 'hourly' } },
    practiceReminder: { enabled: true, targetToolId: 'missing-tool', schedule: { time: '20:00', frequency: 'daily' } },
  }))
  assert.equal(parsed.schemaVersion, 1)
  assert.equal(parsed.programReminder.schedule.time, defaultNotificationPreferences.programReminder.schedule.time)
  assert.equal(parsed.practiceReminder.enabled, false)
  assert.equal(getActiveReminders(parsed, false).some((reminder) => reminder.type === 'practice'), false)
})

scenario('NOTIFICATION Day 28 reconciliation stops obsolete program reminders without erasing post-program reminders', () => {
  const enabled = {
    ...defaultNotificationPreferences,
    programReminder: { enabled: true, schedule: { time: '19:00', frequency: 'daily' } },
    postProgramReminder: { enabled: true, schedule: { time: '19:00', frequency: 'weekly' } },
  }
  const reconciled = reconcilePreferencesForProgramState(enabled, true)
  const reminders = getActiveReminders(reconciled, true)
  assert.equal(reconciled.programReminder.enabled, false)
  assert.equal(reminders.some((reminder) => reminder.type === 'program'), false)
  assert.equal(reminders.some((reminder) => reminder.type === 'post_program'), true)
})

scenario('NOTIFICATION payloads are discreet and never include reflection, diagnosis or crisis copy', () => {
  assert.equal(validateNotificationPrivacyBoundary().pass, true)
  const prefs = {
    ...defaultNotificationPreferences,
    practiceReminder: { enabled: true, targetToolId: 'nature-walk-stretch', schedule: { time: '19:00', frequency: 'daily' } },
  }
  const payload = buildNotificationPayload(getActiveReminders(prefs, false)[0], false)
  assert.equal(payload.targetToolId, 'nature-walk-stretch')
  assert.equal(isSafeNotificationCopy(`${payload.title} ${payload.body}`), true)
  for (const copy of Object.values(notificationCopyRegistry)) {
    assert.equal(isSafeNotificationCopy(`${copy.title} ${copy.discreetBody} ${copy.detailedBody}`), true)
  }
})

scenario('ROUTING destination model only exposes canonical app routes', () => {
  const destinations = new Set(Object.values(notificationCopyRegistry).map((copy) => copy.destination))
  for (const destination of destinations) assert.ok(['today', 'path', 'reset', 'toolbox', 'support'].includes(destination))
  const staleProgram = { id: 'program-reminder', type: 'program', schedule: { time: '19:00', frequency: 'daily' }, createdByUser: true }
  assert.equal(resolveNotificationOpen(staleProgram, { programComplete: true, targetExists: false }).destination, 'path')
})

console.log(JSON.stringify({ scenarioCount: results.length, results }, null, 2))
