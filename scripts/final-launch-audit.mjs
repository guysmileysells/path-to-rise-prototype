import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import { programContent, prompt5SourceIssues } from '../src/programContent.ts'
import { canonicalTools, getCanonicalTool, getResetNeed, getToolSourceSection, resetNeeds } from '../src/toolContent.ts'
import { personalizationSignalInventory } from '../src/personalizationContent.ts'
import { progressDataInventory } from '../src/progressContent.ts'
import {
  defaultNotificationPreferences,
  getActiveReminders,
  notificationCopyRegistry,
  parseNotificationPreferences,
  validateNotificationPrivacyBoundary,
} from '../src/notificationContent.ts'

const results = []
const scenario = (name, fn) => {
  try {
    fn()
    results.push({ name, result: 'PASS' })
  } catch (error) {
    results.push({ name, result: 'FAIL', message: error instanceof Error ? error.message : String(error) })
  }
}

const app = fs.readFileSync('src/App.tsx', 'utf8')
const sourceRoot = path.resolve('..', 'source', 'programs', '28-day-nervous-system-reset', 'raw')
const expectedWeeks = [
  { week: 1, label: 'Stabilize', days: [1, 7] },
  { week: 2, label: 'Awareness & Honesty', days: [8, 14] },
  { week: 3, label: 'Acceptance & Letting Go', days: [15, 21] },
  { week: 4, label: 'Identity & Purpose', days: [22, 28] },
]

scenario('PROMPT 11 exit gate document exists before Prompt 12 launch audit', () => {
  const report = fs.readFileSync('docs/PATH_TO_RISE_PROMPT_11_FINAL_QA_PERFORMANCE_PRODUCTION_RELIABILITY_REPORT.md', 'utf8')
  assert.match(report, /PROMPT #11 EXIT GATE PASSED/)
})

scenario('FINAL BASELINE source files for all four original DOCX weeks are present', () => {
  for (const file of ['week-01-source.docx', 'week-02-source.docx', 'week-03-source.docx', 'week-04-source.docx']) {
    assert.ok(fs.existsSync(path.join(sourceRoot, file)), `${file} missing from ${sourceRoot}`)
  }
})

scenario('PROGRAM all 28 Days are present exactly once with verified DOCX provenance', () => {
  assert.equal(programContent.length, 28)
  assert.deepEqual(programContent.map((day) => day.day), Array.from({ length: 28 }, (_, index) => index + 1))
  assert.equal(programContent.every((day) => day.sourceStatus === 'VERIFIED_FROM_DOCX'), true)
  assert.equal(prompt5SourceIssues.length, 0)
})

scenario('PROGRAM week progression maps to the locked four-week architecture', () => {
  for (const week of expectedWeeks) {
    const days = programContent.filter((day) => day.week === week.week)
    assert.equal(days.length, 7, `week ${week.week} must have 7 days`)
    assert.equal(days[0].day, week.days[0])
    assert.equal(days.at(-1).day, week.days[1])
    assert.equal(days.every((day) => day.weekTheme === week.label), true)
  }
})

scenario('PROGRAM every Day has purpose, content, completion model and mobile-renderable sections', () => {
  for (const day of programContent) {
    assert.ok(day.title.trim(), `Day ${day.day} missing title`)
    assert.ok(day.purpose.trim(), `Day ${day.day} missing purpose`)
    assert.ok(day.sections.length > 0, `Day ${day.day} has no sections`)
    assert.ok(day.completion.required.length > 0, `Day ${day.day} has no required completion model`)
    for (const section of day.sections) {
      assert.ok(section.id)
      assert.ok(section.label)
      assert.ok(['read', 'do', 'reflect', 'complete'].includes(section.kind))
      assert.ok(section.content.length > 0, `${day.day}:${section.id} has no content`)
    }
  }
})

scenario('DAY 28 has terminal value without actionable Day 29 architecture', () => {
  const day28 = programContent.find((day) => day.day === 28)
  assert.equal(day28?.week, 4)
  assert.match(app, /Your reset is complete/)
  assert.match(app, /Day 28 of 28 complete/)
  assert.doesNotMatch(app, /Start Day 29|Continue Day 29|Begin Day 29|currentDay:\s*29/)
})

scenario('TOOLBOX every visible canonical tool resolves to source-backed sections', () => {
  assert.equal(canonicalTools.length, 10)
  for (const tool of canonicalTools) {
    assert.equal(getCanonicalTool(tool.id)?.id, tool.id)
    assert.equal(tool.toolboxEligible, true)
    assert.ok(tool.sourceRefs.length > 0, `${tool.id} missing source refs`)
    const source = getToolSourceSection(tool)
    assert.equal(source?.day?.day, tool.sourceRefs[0].day)
    assert.equal(source?.section?.id, tool.sourceRefs[0].sectionId)
  }
})

scenario('RESET every need resolves to canonical tools and never mutates Day completion by design', () => {
  assert.ok(resetNeeds.length >= 8)
  for (const need of resetNeeds) {
    assert.equal(getResetNeed(need.id)?.id, need.id)
    assert.ok(getCanonicalTool(need.primaryToolId), `${need.id} has invalid primary tool`)
    for (const toolId of need.alternativeToolIds) assert.ok(getCanonicalTool(toolId), `${need.id} has invalid alternative ${toolId}`)
  }
  assert.match(app, /Standalone use does not complete a program day/)
})

scenario('PERSONALIZATION signal inventory excludes journal/reflection text and hidden profiling', () => {
  const prohibited = personalizationSignalInventory.filter((signal) => signal.classification === 'E_PROHIBITED_FOR_PERSONALIZATION' || signal.permitted === false)
  assert.ok(prohibited.some((signal) => /reflection|journal/i.test(signal.signal) || /reflection|journal/i.test(signal.whyItExists)))
  assert.equal(JSON.stringify(personalizationSignalInventory).includes('hidden psychological profile'), false)
})

scenario('PROGRESS inventory excludes streak/performance/clinical scoring', () => {
  assert.ok(progressDataInventory.some((field) => field.field.includes('time spent / streaks') && field.permittedUse === 'DO_NOT_USE'))
  assert.doesNotMatch(app, /lost your streak|failed day/i)
  assert.match(app, /not a wellness score, clinical rating or recovery percentage/i)
})

scenario('REFLECTION privacy gate: private text is not sent to URLs, analytics, notifications or personalization models', () => {
  assert.doesNotMatch(app, /fetch\s*\(|XMLHttpRequest|navigator\.sendBeacon|analytics\.track|gtag\(|posthog|sentry/i)
  assert.doesNotMatch(app, /dangerouslySetInnerHTML|\.innerHTML/)
  assert.match(app, /saved text locally on this device/)
  assert.match(app, /is not analyzed/)
  assert.equal(validateNotificationPrivacyBoundary().pass, true)
})

scenario('NOTIFICATIONS are optional enhancement and malformed/stale settings recover safely', () => {
  const malformed = parseNotificationPreferences(JSON.stringify({ programReminder: { enabled: true, schedule: { time: '99:99' } }, practiceReminder: { enabled: true, targetToolId: 'bad-tool' } }))
  assert.equal(malformed.programReminder.schedule.time, defaultNotificationPreferences.programReminder.schedule.time)
  assert.equal(getActiveReminders(malformed, false).some((reminder) => reminder.type === 'practice'), false)
  const privacy = validateNotificationPrivacyBoundary()
  assert.equal(privacy.pass, true)
  for (const copy of Object.values(notificationCopyRegistry)) {
    assert.doesNotMatch(`${copy.title} ${copy.discreetBody} ${copy.detailedBody}`, /journal|reflection answer|diagnosis|crisis|suicide|falling behind|streak|we noticed|you seem/i)
  }
})

scenario('SUPPORT remains discoverable, non-paywalled and non-clinical', () => {
  assert.match(app, /Support is never paywalled/)
  assert.match(app, /Canada only: call or text 9-8-8/)
  assert.match(app, /does not diagnose, monitor emergencies, or replace professional care/)
})

scenario('SECURITY baseline: no app network exfiltration, unsafe HTML or obvious client secrets', () => {
  assert.doesNotMatch(app, /fetch\s*\(|XMLHttpRequest|navigator\.sendBeacon|gtag\(|posthog|sentry|analytics\.track/i)
  assert.doesNotMatch(app, /dangerouslySetInnerHTML|\.innerHTML/)
  assert.doesNotMatch(app, /api[_-]?key\s*=|secret\s*=|password\s*=|token\s*=/i)
})

scenario('DEVELOPMENT residue in user-facing source is limited to intentional prototype disclosure', () => {
  assert.doesNotMatch(app, /TODO|FIXME|lorem ipsum|fake user|debug/i)
  assert.match(app, /Prototype checkpoint/)
  assert.match(app, /prototype stores saved text locally/)
})

scenario('ROUTING exposes only the approved four primary destinations', () => {
  assert.match(app, /type Tab = 'today' \| 'reset' \| 'path' \| 'support'/)
  assert.match(app, /Today/)
  assert.match(app, /Reset/)
  assert.match(app, /My Path/)
  assert.match(app, /Support/)
  const tabLine = app.split('\n').find((line) => line.includes('type Tab =')) ?? ''
  assert.doesNotMatch(tabLine, /progress|community|coach|store|admin/i)
})

const failures = results.filter((result) => result.result !== 'PASS')
if (failures.length) {
  console.error(JSON.stringify({ result: 'FAIL', failures, results }, null, 2))
  process.exit(1)
}

console.log(JSON.stringify({
  result: 'PASS',
  scenarioCount: results.length,
  dayCount: programContent.length,
  sectionCount: programContent.reduce((sum, day) => sum + day.sections.length, 0),
  canonicalToolCount: canonicalTools.length,
  resetNeedCount: resetNeeds.length,
  sourceRoot,
  results,
}, null, 2))
