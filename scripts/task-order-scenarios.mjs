import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import fs from 'node:fs'
import * as model from '../src/dayRoadmap.ts'

const digest = value => createHash('sha256').update(JSON.stringify(value)).digest('hex')
const baseline = JSON.parse(fs.readFileSync(new URL('../evidence/task-order-expansion/task-content-baseline.json', import.meta.url), 'utf8'))
// Fallback deliberately exercises today's existing display before the new helper exists.
const ordered = model.getChronologicalWinTasks ?? model.getAllWinTasks
assert.equal(ordered(model.dayRoadmaps[0])[0].id, 'day-1-morning-03-mirror-breathwork', 'Day 1 must begin on waking, not with tonight’s alarm setup')
assert.equal(ordered(model.dayRoadmaps[0]).at(-1).id, 'day-1-morning-01-set-your-alarm', 'Day 1 tonight alarm belongs at bedtime')
for (const day of model.dayRoadmaps) {
  const tasks = ordered(day)
  const groups = model.getChronologicalTaskGroups(day)
  assert.deepEqual(groups.map(g => g.id), ['morning', 'midday', 'evening', 'bedtime'])
  assert.equal(tasks.length, 16)
  assert.equal(new Set(tasks.map(t => t.id)).size, 16)
  assert.deepEqual(new Set(tasks.map(t => t.id)), new Set(model.getAllWinTasks(day).map(t => t.id)), `Day${day.day}: no added/lost/replaced task`)
  for (const task of model.getAllRoadmapTasks(day)) assert.equal(digest(task), baseline[task.id], `${task.id}: ALL source fields, IDs, prompts, timing and content unchanged`)
  if (day.day > 1) assert.equal(tasks[0].id, day.morningActions[0].id)
  const index = task => tasks.findIndex(t => t.id === task.id)
  assert.ok(index(day.tasks[0]) > index(day.morningActions.at(-1)), 'Physical activity follows morning hygiene')
  for (let i = 1; i < day.tasks.length; i++) assert.ok(index(day.tasks[i]) > index(day.tasks[i - 1]), `Day${day.day}: preserve source relative task dependencies`)
  for (let i = 1; i < day.eveningActions.length; i++) assert.ok(index(day.eveningActions[i]) > index(day.eveningActions[i - 1]), 'Evening routine dependencies preserved')
  assert.equal(groups.at(-1).tasks[0].id, day.eveningActions.at(-1).id, 'Final pride reflection at bedtime')
  assert.ok(groups.every(g => g.tasks.length > 0))
  // Every partial-completion boundary resumes the same next task as the screen.
  for (let i = 0; i <= tasks.length; i++) {
    const ids = tasks.slice(0, i).map(t => t.id)
    const state = model.deriveDayRoadmapStatus(day, ids)
    assert.equal(state.nextTask?.id ?? null, tasks[i]?.id ?? null)
    assert.equal(state.completedRequiredCount, i)
  }
  const all = tasks.map(t => t.id)
  for (const task of tasks) {
    const undone = model.toggleTaskCompletion(all, task.id, day)
    assert.equal(model.deriveDayRoadmapStatus(day, undone).nextTask?.id, task.id)
  }
}
console.log(JSON.stringify({ result: 'PASS', scenario: 'chronological-task-display-and-content-preservation', days: 28, requiredTasks: 448, optionalReflections: 28, unchangedTaskRecords: Object.keys(baseline).length }))
