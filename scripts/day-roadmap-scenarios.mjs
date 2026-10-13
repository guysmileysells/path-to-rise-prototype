import assert from 'node:assert/strict'
import {
  calculateSmallWins,
  dayRoadmaps,
  deriveDayRoadmapStatus,
  feelingStuckOptions,
  getAllWinTasks,
  sanitizeTaskProgress,
  toggleTaskCompletion,
} from '../src/dayRoadmap.ts'

assert.equal(dayRoadmaps.length, 28, 'Master experience must cover all 28 days')

const morningTitles = [
  'Set Your Alarm',
  'The 5–4–3–2–1 Get-Up',
  'Mirror Breathwork',
  'Hydrate Your Body',
  'Brush With Your Non-Dominant Hand',
  'Morning Mirror Affirmations',
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
  assert.equal(roadmap.morningActions.length, 6, `Day ${roadmap.day} must have 6 Morning Activation wins`)
  assert.equal(roadmap.tasks.length, 6, `Day ${roadmap.day} must have 6 Daily Wellness Activity wins`)
  assert.equal(roadmap.eveningActions.length, 5, `Day ${roadmap.day} must have 5 Evening Activation wins`)
  assert.deepEqual(roadmap.morningActions.map((task) => task.title), morningTitles, `Day ${roadmap.day} morning routine/order changed`)
  assert.deepEqual(roadmap.tasks.map((task) => task.category), dailyCategories, `Day ${roadmap.day} daily activity order changed`)
  assert.deepEqual(roadmap.eveningActions.map((task) => task.title), eveningTitles, `Day ${roadmap.day} evening routine/order changed`)
  assert.equal(getAllWinTasks(roadmap).length, 17, `Day ${roadmap.day} must have 17 countable Small Wins`)
  assert.equal(roadmap.expectedWins.total, 17, `Day ${roadmap.day} total Small Wins must be 17`)
  assert.equal(roadmap.expectedWins.weekly, 119, `Day ${roadmap.day} weekly total must be 119`)
  assert.equal(roadmap.expectedWins.program, 476, `Day ${roadmap.day} program total must be 476`)
  assert.equal(roadmap.sourceSequenceLanguage, 'Morning Activation → Six Daily Wellness Activities → Evening Activation.', `Day ${roadmap.day} source sequence label must use Evening Activation`)
  assert.ok(roadmap.morningActions.every((task) => task.what && task.smallWinInstruction), `Day ${roadmap.day} morning tabs must include WHAT and YOUR SMALL WIN copy`)
  assert.ok(roadmap.eveningActions.every((task) => task.what && task.smallWinInstruction), `Day ${roadmap.day} evening tabs must include WHAT and YOUR SMALL WIN copy`)
  for (const affirmation of requiredAffirmations) {
    assert.ok(roadmap.morningActions[5].instructions.includes(affirmation), `Day ${roadmap.day} morning affirmations must preserve exact wording/sequence: ${affirmation}`)
    assert.ok(roadmap.eveningActions[1].instructions.includes(affirmation), `Day ${roadmap.day} evening affirmations must preserve exact wording/sequence: ${affirmation}`)
  }
  assert.equal(roadmap.eveningActions[2].writingFieldLabels?.length, 5, `Day ${roadmap.day} gratitude needs five private fields`)
  assert.equal(roadmap.eveningActions[3].writingFieldLabels?.length, 3, `Day ${roadmap.day} daily wins needs three private fields`)
  assert.equal(roadmap.eveningActions[4].writingFieldLabels?.length, 1, `Day ${roadmap.day} pride needs one private field`)
  for (const task of roadmap.tasks) {
    assert.ok(task.title.length > 0, `Day ${roadmap.day} ${task.category} task must retain a title`)
    assert.ok(task.instructions.length > 0, `Day ${roadmap.day} ${task.category} task must retain instructions`)
    assert.ok(task.why, `Day ${roadmap.day} ${task.category} task must have WHY copy from source or source-safe fallback`)
  }
  const empty = deriveDayRoadmapStatus(roadmap, [])
  assert.equal(empty.completedRequiredCount, 0, `Day ${roadmap.day} fresh status starts at 0`)
  assert.equal(empty.requiredCount, 17, `Day ${roadmap.day} required Small Win count must be 17`)
  assert.equal(empty.dayComplete, false, `Day ${roadmap.day} must not start complete`)
  assert.equal(empty.sectionCounts.morning.total, 6, `Day ${roadmap.day} morning subtotal must be /6`)
  assert.equal(empty.sectionCounts.daily.total, 6, `Day ${roadmap.day} daily subtotal must be /6`)
  assert.equal(empty.sectionCounts.evening.total, 5, `Day ${roadmap.day} evening subtotal must be /5`)
}

for (const dayIndex of [0, 13, 27]) {
  assert.deepEqual(dayRoadmaps[dayIndex].morningActions.map((task) => ({ title: task.title, what: task.what, instructions: task.instructions, why: task.why, smallWinInstruction: task.smallWinInstruction })), dayRoadmaps[0].morningActions.map((task) => ({ title: task.title, what: task.what, instructions: task.instructions, why: task.why, smallWinInstruction: task.smallWinInstruction })), `Day ${dayIndex + 1} Morning Activation must match Day 1 exactly`)
  assert.deepEqual(dayRoadmaps[dayIndex].eveningActions.map((task) => ({ title: task.title, what: task.what, instructions: task.instructions, why: task.why, smallWinInstruction: task.smallWinInstruction, writingFieldLabels: task.writingFieldLabels })), dayRoadmaps[0].eveningActions.map((task) => ({ title: task.title, what: task.what, instructions: task.instructions, why: task.why, smallWinInstruction: task.smallWinInstruction, writingFieldLabels: task.writingFieldLabels })), `Day ${dayIndex + 1} Evening Activation must match Day 1 exactly`)
}

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
assert.equal(partial.dayComplete, false, '3 of 17 must not complete Day 1')
const allDay1 = getAllWinTasks(day1).map((task) => task.id)
const completeDay1 = deriveDayRoadmapStatus(day1, allDay1)
assert.equal(completeDay1.completedRequiredCount, 17, 'All countable Day 1 actions count as 17')
assert.equal(completeDay1.dayComplete, true, '17 of 17 completes the day')

const sanitized = sanitizeTaskProgress({
  '1': [day1.morningActions[0].id, 'bad-id', day1.tasks[0].id, day1.eveningActions[0].id, day1.reflection.id],
  '28': [dayRoadmaps[27].morningActions[0].id],
  '29': ['nope'],
})
assert.deepEqual(sanitized['1'], [day1.morningActions[0].id, day1.tasks[0].id, day1.eveningActions[0].id, day1.reflection.id], 'Sanitizer keeps valid Day 1 actions/reflection only')
assert.deepEqual(sanitized['28'], [dayRoadmaps[27].morningActions[0].id], 'Sanitizer supports all 28 days')
assert.equal(sanitized['29'], undefined, 'Sanitizer rejects outside-day progress')

const summary = calculateSmallWins({
  '1': allDay1,
  '2': getAllWinTasks(dayRoadmaps[1]).slice(0, 4).map((task) => task.id),
}, 2)
assert.equal(summary.today.completed, 4, 'Today Small Wins counts selected current day')
assert.equal(summary.today.total, 17, 'Today total remains /17')
assert.equal(summary.week.completed, 21, 'Week count adds Day 1 17 + Day 2 4')
assert.equal(summary.week.total, 119, 'Week total remains /119')
assert.equal(summary.program.completed, 21, 'Program total adds all completed individual wins')
assert.equal(summary.program.total, 476, 'Program total remains /476')

assert.equal(feelingStuckOptions.length, 6, 'Feeling Stuck must provide six support choices')
for (const option of feelingStuckOptions) {
  assert.ok(option.understand && option.tryThis && option.oneSmallStep, `${option.label} must include UNDERSTAND, TRY THIS and ONE SMALL STEP`)
}

console.log(JSON.stringify({ scenario: 'morning-evening-final-activation', result: 'PASS', days: dayRoadmaps.length, dailyWins: 17, programWins: 476 }))
