import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import {
  calculateSmallWins,
  dayRoadmaps,
  deriveDayRoadmapStatus,
  feelingStuckOptions,
  getAllRoadmapTasks,
  getAllWinTasks,
  sanitizeTaskProgress,
  toggleTaskCompletion,
} from '../src/dayRoadmap.ts'
import { programContent } from '../src/programContent.ts'

assert.equal(dayRoadmaps.length, 28, 'Master experience must cover all 28 days')

const alarmCopy = 'Tonight, set your alarm 15 minutes earlier than you usually wake up. Those extra minutes give you room to start the day at your own pace. If you can, move bedtime 15 minutes earlier too so you keep that sleep time.'
const getUpCopy = 'When your alarm goes off at the time you set on Day 1, count down 5–4–3–2–1 and get out of bed on 1. Mark it done once you’re up. That’s your first win of the day.'
const sharedMorningTitles = [
  'Mirror Breathwork',
  'Hydrate Your Body',
  'Brush With Your Non-Dominant Hand',
  'Morning Mirror Affirmations',
]
const sharedMorningIdSuffixes = [
  '03-mirror-breathwork',
  '04-hydrate-your-body',
  '05-brush-with-your-non-dominant-hand',
  '06-morning-mirror-affirmations',
]
const eveningTitles = [
  'Brush With Your Non-Dominant Hand',
  'Evening Mirror Affirmations',
  "Five Things I'm Grateful For",
  'Three Small Wins From Today',
  "One Thing I'm Proud Of",
]
const dailyCategories = ['Physical', 'Emotional', 'Spiritual', 'Intellectual', 'Social', 'Environmental']
const requiredAffirmations = [
  'AFFIRMATION 1 — REPEAT 3 TIMES',
  '"Every day in every way I am getting better and better."',
  'AFFIRMATION 2 — REPEAT 6 TIMES',
  '"I am who I am and that is always enough."',
  'AFFIRMATION 3 — REPEAT 9 TIMES',
  '"I love you."',
]

for (const roadmap of dayRoadmaps) {
  const { day } = roadmap
  const wakeTask = roadmap.morningActions[0]
  const wakeTitle = day === 1 ? 'Set Your Alarm' : 'First Win — 5–4–3–2–1, Get Up'
  assert.deepEqual(wakeTask.instructions, [day === 1 ? alarmCopy : getUpCopy], `Day ${day} first task must use exact owner-approved copy`)
  assert.equal(wakeTask.title, wakeTitle, `Day ${day} first title must match its wake action`)
  assert.equal(wakeTask.id, `day-${day}-morning-${day === 1 ? '01-set-your-alarm' : '02-five-four-three-two-one-get-up'}`, `Day ${day} active wake action must preserve its old ID`)
  assert.match(wakeTask.timingLabel, day === 1 ? /tonight/i : /alarm/i, `Day ${day} wake timing must be honest`)
  assert.equal(wakeTask.durationLabel, null, `Day ${day} wake offset/countdown is not an actual task duration`)
  assert.equal(roadmap.morningActions.length, 5, `Day ${day} must have 5 Morning Activation wins`)
  assert.equal(roadmap.tasks.length, 6, `Day ${day} must have 6 Daily Wellness Activity wins`)
  assert.equal(roadmap.eveningActions.length, 5, `Day ${day} must have 5 Evening Activation wins`)
  assert.deepEqual(roadmap.morningActions.map((task) => task.title), [wakeTitle, ...sharedMorningTitles], `Day ${day} morning routine/order changed`)
  assert.deepEqual(roadmap.morningActions.slice(1).map((task) => task.id), sharedMorningIdSuffixes.map((suffix) => `day-${day}-morning-${suffix}`), `Day ${day} unchanged morning IDs must retain old indexes`)
  assert.deepEqual(roadmap.morningActions.map((task) => task.order), [1, 2, 3, 4, 5], `Day ${day} morning display order must be contiguous despite stable IDs`)
  assert.deepEqual(roadmap.tasks.map((task) => task.category), dailyCategories, `Day ${day} daily activity order changed`)
  assert.deepEqual(roadmap.eveningActions.map((task) => task.title), eveningTitles, `Day ${day} evening routine/order changed`)
  assert.equal(getAllWinTasks(roadmap).length, 16, `Day ${day} must have 16 countable Small Wins`)
  assert.deepEqual(roadmap.expectedWins, { morning: 5, daily: 6, evening: 5, total: 16, weekly: 112, program: 448 }, `Day ${day} totals must match the consolidated routine`)
  assert.equal(roadmap.sourceSequenceLanguage, 'Morning Activation → Six Daily Wellness Activities → Evening Activation.', `Day ${day} source sequence label must use Evening Activation`)
  assert.ok(roadmap.morningActions.every((task) => task.what && task.smallWinInstruction), `Day ${day} morning tabs must include WHAT and YOUR SMALL WIN copy`)
  assert.ok(roadmap.eveningActions.every((task) => task.what && task.smallWinInstruction), `Day ${day} evening tabs must include WHAT and YOUR SMALL WIN copy`)
  for (const affirmation of requiredAffirmations) {
    assert.ok(roadmap.morningActions[4].instructions.includes(affirmation), `Day ${day} morning affirmations must preserve exact wording/sequence: ${affirmation}`)
    assert.ok(roadmap.eveningActions[1].instructions.includes(affirmation), `Day ${day} evening affirmations must preserve exact wording/sequence: ${affirmation}`)
  }
  assert.equal(roadmap.eveningActions[2].writingFieldLabels?.length, 5, `Day ${day} gratitude needs five private fields`)
  assert.equal(roadmap.eveningActions[3].writingFieldLabels?.length, 3, `Day ${day} daily wins needs three private fields`)
  assert.equal(roadmap.eveningActions[4].writingFieldLabels?.length, 1, `Day ${day} pride needs one private field`)
  const source = programContent.find((candidate) => candidate.day === day)
  const sourceLines = source.sections.flatMap((section) => section.content)
  for (const task of roadmap.tasks) {
    // Week 1 uses literal Task headings; later weeks use numbered source domains.
    const hasParsedCategory = sourceLines.some((line) => line.trim() === `${task.category} Task`)
    assert.ok(hasParsedCategory ? sourceLines.some((line) => line.trim() === task.title) : task.title === `${task.category} Activity` || task.title.split(' + ').every(title => sourceLines.some(line => line.includes(title))), `Day ${day} ${task.category} title must preserve the source parser contract`)
    assert.ok(task.instructions.length > 0, `Day ${day} ${task.category} task must retain instructions`)
    assert.ok(task.why, `Day ${day} ${task.category} task must have WHY copy from source or source-safe fallback`)
    assert.equal(task.sourceReference, `${source.sourceLocation} · ${task.category} Task`, `Day ${day} ${task.category} provenance must remain intact`)
  }
  const empty = deriveDayRoadmapStatus(roadmap, [])
  assert.equal(empty.completedRequiredCount, 0, `Day ${day} fresh status starts at 0`)
  assert.equal(empty.requiredCount, 16, `Day ${day} required Small Win count must be 16`)
  assert.equal(empty.dayComplete, false, `Day ${day} must not start complete`)
  assert.equal(empty.nextTask?.id, day === 1 ? roadmap.morningActions[1].id : wakeTask.id, `Day ${day} next action must follow chronological waking-to-bedtime display`)
  assert.deepEqual(empty.sectionCounts, { morning: { completed: 0, total: 5 }, daily: { completed: 0, total: 6 }, evening: { completed: 0, total: 5 } }, `Day ${day} section totals must derive correctly`)

  const allIds = getAllWinTasks(roadmap).map((task) => task.id)
  const complete = deriveDayRoadmapStatus(roadmap, allIds)
  assert.equal(complete.completedRequiredCount, 16, `Day ${day} all 16 active tasks count`)
  assert.equal(complete.dayComplete, true, `Day ${day} all 16 tasks complete the day`)
  assert.equal(complete.nextTask, null, `Day ${day} complete status has no next task (including no Day 29)`)
  assert.equal(complete.progressLabel, '16 of 16 Small Wins complete')
  const undone = toggleTaskCompletion(allIds, wakeTask.id, roadmap)
  const undoneStatus = deriveDayRoadmapStatus(roadmap, undone)
  assert.equal(undoneStatus.completedRequiredCount, 15, `Day ${day} undo removes exactly one win`)
  assert.equal(undoneStatus.dayComplete, false, `Day ${day} undo reopens the day`)
  assert.equal(undoneStatus.nextTask?.id, wakeTask.id, `Day ${day} undo resumes the actual wake task`)
  assert.equal(deriveDayRoadmapStatus(roadmap, toggleTaskCompletion(undone, wakeTask.id, roadmap)).dayComplete, true, `Day ${day} redo restores completion`)
}

// Baseline digests captured from HEAD d8186e0 before implementation: preserve every
// unchanged routine field, not just a few sampled titles. Source-format recovery
// for later weeks is covered separately by daily-task-source-scenarios.mjs.
const digest = (value) => createHash('sha256').update(JSON.stringify(value)).digest('hex')
// Refreshed after explicit baseline comparison: all 42 Week 1 tasks retain every
// non-instruction field and old instruction. Additions are exact source lines
// previously cut off after Prompt(s):. See evidence/task-four-sections/preservation.json.
assert.equal(digest(dayRoadmaps.slice(0, 7).map((day) => day.tasks)), '10414176cfd736de378c0a26635bcb77fd8e975a0bf90053e340b9c8001d4b65', 'Week 1 corrected source instructions, timing, IDs and metadata must retain the source-verified checkpoint')
assert.equal(digest(dayRoadmaps.map((day) => day.eveningActions)), '1ceb46053cfdd0d10b9c126478ef396b014acbcbbf2e1885daf381f4a84e7577', 'All 28 evening routines must remain unchanged')
assert.equal(digest(dayRoadmaps.map((day) => day.morningActions.slice(1).map(({ order: _order, ...task }) => task))), 'ff7897565e46e512f78887866db8db32e6f39f00204cd0ee3e04d6e12f8448ab', 'All 28 shared morning routines must remain unchanged except display order')

const day1 = dayRoadmaps[0]
const firstMorning = day1.morningActions[0].id
const secondMorning = day1.morningActions[1].id
const firstDaily = day1.tasks[0].id
const firstEvening = day1.eveningActions[0].id
let progress = toggleTaskCompletion([], firstMorning, day1)
assert.deepEqual(progress, [firstMorning], 'Completing one action marks only that action')
progress = toggleTaskCompletion(progress, secondMorning, day1)
assert.equal(deriveDayRoadmapStatus(day1, progress).sectionCounts.morning.completed, 2, 'Morning subtotal counts individual actions')
progress = toggleTaskCompletion(progress, firstMorning, day1)
assert.deepEqual(progress, [secondMorning], 'Undo removes the individual win')
progress = toggleTaskCompletion(progress, firstDaily, day1)
progress = toggleTaskCompletion(progress, firstEvening, day1)
const partial = deriveDayRoadmapStatus(day1, progress)
assert.equal(partial.completedRequiredCount, 3, 'Partial Small Wins count across morning/daily/evening')
assert.equal(partial.dayComplete, false, '3 of 16 must not complete Day 1')
const allDay1 = getAllWinTasks(day1).map((task) => task.id)
const sanitized = sanitizeTaskProgress({
  '1': [firstMorning, 'bad-id', firstMorning, firstDaily, firstEvening, day1.reflection.id, dayRoadmaps[1].morningActions[0].id, null, 1],
  '28': [dayRoadmaps[27].morningActions[0].id],
  '29': ['nope'],
})
assert.deepEqual(sanitized['1'], [firstMorning, firstDaily, firstEvening, day1.reflection.id], 'Sanitizer deduplicates and keeps valid own-day actions/reflection only')
assert.deepEqual(sanitized['28'], [dayRoadmaps[27].morningActions[0].id], 'Sanitizer supports all 28 days')
assert.equal(sanitized['29'], undefined, 'Sanitizer rejects outside-day progress')
for (const malformed of [null, false, 1, 'bad', [], { '1': 'not-an-array' }]) {
  assert.deepEqual(sanitizeTaskProgress(malformed), {}, 'Malformed progress must not invent completions')
}
assert.equal(deriveDayRoadmapStatus(day1, [firstMorning, firstMorning, 'bad-id', day1.reflection.id]).completedRequiredCount, 1, 'Duplicate IDs, invalid IDs and optional reflection do not inflate wins')
assert.deepEqual(toggleTaskCompletion([firstMorning, firstMorning, 'bad-id'], 'bad-id', day1), [firstMorning], 'Invalid toggles sanitize duplicates without adding any action')
assert.equal(getAllRoadmapTasks(day1).length, 17, 'Only 16 active tasks and optional reflection are renderable')

const summary = calculateSmallWins({
  '1': allDay1,
  '2': getAllWinTasks(dayRoadmaps[1]).slice(0, 4).map((task) => task.id),
}, 2)
assert.equal(summary.today.completed, 4, 'Today Small Wins counts selected current day')
assert.equal(summary.today.total, 16, 'Today total remains /16')
assert.equal(summary.week.completed, 20, 'Week count adds Day 1 16 + Day 2 4')
assert.equal(summary.week.total, 112, 'Week total remains /112')
assert.equal(summary.program.completed, 20, 'Program total adds all completed individual wins')
assert.equal(summary.program.total, 448, 'Program total remains /448')
for (const roadmap of dayRoadmaps) {
  const isolated = calculateSmallWins({ [roadmap.day]: getAllWinTasks(roadmap).map((task) => task.id) }, roadmap.day)
  assert.equal(isolated.today.completed, 16, `Day ${roadmap.day} own-day wins count in isolation`)
  assert.equal(isolated.week.completed, 16, `Day ${roadmap.day} no fabricated wins on other days in the week`)
  assert.equal(isolated.program.completed, 16, `Day ${roadmap.day} no fabricated wins elsewhere in the program`)
  const otherDay = roadmap.day === 28 ? 1 : roadmap.day + 1
  const other = calculateSmallWins({ [roadmap.day]: getAllWinTasks(roadmap).map((task) => task.id) }, otherDay)
  assert.equal(other.today.completed, 0, `Day ${roadmap.day} completions must not bleed into Day ${otherDay}`)
}
const completeProgram = Object.fromEntries(dayRoadmaps.map((roadmap) => [roadmap.day, getAllWinTasks(roadmap).map((task) => task.id)]))
assert.equal(calculateSmallWins(completeProgram, 28).program.completed, 448, 'All 28 days total exactly 448 wins')
assert.equal(calculateSmallWins(completeProgram, 28).week.completed, 112, 'Complete final week totals exactly 112 wins')

// The removed wake action is historical storage, never a visible/countable task.
for (const roadmap of dayRoadmaps) {
  const archivedId = `day-${roadmap.day}-morning-${roadmap.day === 1 ? '02-five-four-three-two-one-get-up' : '01-set-your-alarm'}`
  const firstId = roadmap.morningActions[0].id
  const allIds = getAllWinTasks(roadmap).map((task) => task.id)
  const invalidId = `day-${roadmap.day}-morning-99-set-your-alarm`
  const wrongOldIndex = `day-${roadmap.day}-morning-02-mirror-breathwork`
  const otherDay = roadmap.day === 28 ? 1 : roadmap.day + 1
  const otherArchivedId = `day-${otherDay}-morning-${otherDay === 1 ? '02-five-four-three-two-one-get-up' : '01-set-your-alarm'}`
  const stored = sanitizeTaskProgress({ [roadmap.day]: [archivedId, archivedId, firstId, invalidId, wrongOldIndex, otherArchivedId] })
  assert.deepEqual(stored[String(roadmap.day)], [archivedId, firstId], `Day ${roadmap.day} sanitizer must retain only its exact historical wake ID alongside active IDs`)
  assert.deepEqual(sanitizeTaskProgress(stored), stored, `Day ${roadmap.day} stored historical records must survive repeated sanitization`)
  assert.ok(!getAllRoadmapTasks(roadmap).some((task) => task.id === archivedId), `Day ${roadmap.day} archived action must never render`)
  const archivedOnly = deriveDayRoadmapStatus(roadmap, [archivedId])
  assert.equal(archivedOnly.completedRequiredCount, 0, `Day ${roadmap.day} archived action is not a win`)
  assert.equal(archivedOnly.dayComplete, false, `Day ${roadmap.day} historical data cannot fabricate completion`)
  assert.equal(archivedOnly.nextTask?.id, roadmap.day === 1 ? roadmap.morningActions[1].id : firstId, `Day ${roadmap.day} archived action is not the next action or a replacement completion`)
  assert.deepEqual(archivedOnly.completedTaskIds, [], `Day ${roadmap.day} display status contains only active/optional tasks`)
  assert.equal(deriveDayRoadmapStatus(roadmap, [archivedId, firstId]).nextTask?.id, roadmap.morningActions[1].id, `Day ${roadmap.day} resume skips the obsolete wake action`)
  assert.equal(deriveDayRoadmapStatus(roadmap, [archivedId, ...allIds]).completedRequiredCount, 16, `Day ${roadmap.day} archived action cannot inflate a complete day`)
  assert.equal(deriveDayRoadmapStatus(roadmap, [archivedId, ...allIds]).nextTask, null, `Day ${roadmap.day} archived action never reopens a complete day`)
  const added = toggleTaskCompletion([archivedId, archivedId, invalidId], firstId, roadmap)
  assert.deepEqual(new Set(added), new Set([archivedId, firstId]), `Day ${roadmap.day} completing an active action retains history without invalid IDs`)
  assert.equal(added.length, 2, `Day ${roadmap.day} toggling deduplicates history`)
  assert.deepEqual(toggleTaskCompletion(added, firstId, roadmap), [archivedId], `Day ${roadmap.day} undo retains the historical completion`)
  assert.deepEqual(toggleTaskCompletion([archivedId, invalidId], invalidId, roadmap), [archivedId], `Day ${roadmap.day} invalid toggle retains valid history only`)
  assert.deepEqual(toggleTaskCompletion([archivedId], archivedId, roadmap), [archivedId], `Day ${roadmap.day} archived history is not an interactive toggle target`)
  assert.deepEqual(toggleTaskCompletion([], archivedId, roadmap), [], `Day ${roadmap.day} archived records cannot be newly completed`)
  const undone = toggleTaskCompletion([archivedId, ...allIds], firstId, roadmap)
  assert.ok(undone.includes(archivedId), `Day ${roadmap.day} undoing a completed day preserves history`)
  assert.equal(deriveDayRoadmapStatus(roadmap, undone).completedRequiredCount, 15, `Day ${roadmap.day} history does not keep an undone day complete`)
  const historySummary = calculateSmallWins({ [roadmap.day]: [archivedId, firstId] }, roadmap.day)
  assert.equal(historySummary.today.completed, 1, `Day ${roadmap.day} historical record excluded from today`)
  assert.equal(historySummary.week.completed, 1, `Day ${roadmap.day} historical record excluded from week`)
  assert.equal(historySummary.program.completed, 1, `Day ${roadmap.day} historical record excluded from program`)
}

assert.equal(feelingStuckOptions.length, 6, 'Feeling Stuck must provide six support choices')
for (const option of feelingStuckOptions) {
  assert.ok(option.understand && option.tryThis && option.oneSmallStep, `${option.label} must include UNDERSTAND, TRY THIS and ONE SMALL STEP`)
}

console.log(JSON.stringify({ scenario: 'day-specific-wake-first-activation', result: 'PASS', days: dayRoadmaps.length, dailyWins: 16, weeklyWins: 112, programWins: 448 }))
