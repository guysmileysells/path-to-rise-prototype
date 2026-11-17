import assert from 'node:assert/strict'
import { deriveDailyRhythm } from '../src/dailyRhythm.ts'
import { dayRoadmaps } from '../src/dayRoadmap.ts'

const fresh = deriveDailyRhythm(dayRoadmaps[0])
assert.equal(fresh.completedCount, 0)
assert.equal(fresh.totalCount, 17)
assert.equal(fresh.nextTask.id, dayRoadmaps[0].morningActions[0].id)
assert.deepEqual(fresh.cards.map(({ phase, totalCount, status }) => ({ phase, totalCount, status })), [
  { phase: 'morning', totalCount: 6, status: 'next' },
  { phase: 'daily', totalCount: 6, status: 'upcoming' },
  { phase: 'evening', totalCount: 5, status: 'upcoming' },
])
for (const roadmap of dayRoadmaps) {
  const ordered = [...roadmap.morningActions, ...roadmap.tasks, ...roadmap.eveningActions]
  for (let n = 0; n <= ordered.length; n++) {
    const ids = ordered.slice(0, n).map((task) => task.id)
    const model = deriveDailyRhythm(roadmap, ids)
    assert.equal(model.completedCount, n, `Day ${roadmap.day} boundary ${n}`)
    assert.equal(model.nextTask?.id, ordered[n]?.id)
    assert.equal(model.cards.filter((card) => card.status === 'next').length, n === 17 ? 0 : 1)
    assert.equal(model.dayComplete, n === 17)
    assert.equal(model.cards[0].status, n >= 6 ? 'complete' : 'next')
    assert.equal(model.cards[1].status, n >= 12 ? 'complete' : n >= 6 ? 'next' : 'upcoming')
    assert.equal(model.cards[2].status, n === 17 ? 'complete' : n >= 12 ? 'next' : 'upcoming')
  }
  const dirty = [ordered[7].id, ordered[2].id, ordered[7].id, roadmap.reflection.id, 'invalid-id', 'day-99-alarm']
  const model = deriveDailyRhythm(roadmap, dirty)
  assert.equal(model.completedCount, 2, 'duplicates, separate reflection and invalid IDs never count')
  assert.equal(model.nextTask.id, ordered[0].id, 'out-of-order completion cannot skip the first gap')
  assert.deepEqual(model.cards.map((card) => card.completedCount), [1, 1, 0])
  assert.deepEqual(dirty, [ordered[7].id, ordered[2].id, ordered[7].id, roadmap.reflection.id, 'invalid-id', 'day-99-alarm'], 'selector is pure')
}

const terminal = deriveDailyRhythm(dayRoadmaps[27], [], true)
assert.equal(terminal.nextTask, null, 'legacy program completion offers review, not fabricated next actions')
assert.equal(terminal.completedCount, 0, 'whole-day completion must not invent individual wins')
assert.equal(terminal.cards.some((card) => card.status === 'next'), false)
assert.equal(terminal.cards.some((card) => card.status === 'complete'), false)

const missing = deriveDailyRhythm(undefined)
assert.equal(missing.totalCount, 0)
assert.equal(missing.nextTask, null)
assert.equal(missing.dayComplete, false)
assert.ok(missing.cards.every((card) => card.status === 'unavailable'))
const noTasks = { ...dayRoadmaps[0], morningActions: [], tasks: [], eveningActions: [] }
assert.ok(deriveDailyRhythm(noTasks).cards.every((card) => card.status === 'unavailable'))
console.log('Daily Rhythm scenarios passed: all 28 days × 18 boundaries, out-of-order/invalid IDs, terminal legacy progress and missing content.')
