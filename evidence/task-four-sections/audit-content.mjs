import assert from 'node:assert/strict'
import { writeFileSync } from 'node:fs'
import { dayRoadmaps } from '../../src/dayRoadmap.ts'
import { getTaskPresentation } from '../../src/taskPresentation.ts'
const rows = dayRoadmaps.flatMap(day => [...day.morningActions,...day.tasks,...day.eveningActions].map(task => ({day:day.day,id:task.id,title:task.title,...getTaskPresentation(task)})))
assert.equal(rows.length,448)
for (const row of rows) {
  assert(row.what && row.when && row.how.length && (row.sourceGap || row.benefits.length), `${row.id}: missing field`)
  for (const value of [row.what,row.when,...row.how,...row.benefits]) {
    assert.equal(value,value.trim(),`${row.id}: surrounding whitespace`)
    assert(!/\t|\r|\n| {2,}|_{3,}/.test(value),`${row.id}: dirty spacing`)
    assert(!/\b(?:WHEN|WHAT|HOW|WHY):/i.test(value),`${row.id}: leaked metadata`)
  }
}
const gaps = rows.filter(row => row.sourceGap).map(row => row.id)
assert.equal(gaps.length,3)
writeFileSync(new URL('content-inventory.json',import.meta.url),JSON.stringify({result:'PASS',requiredTasks:rows.length,days:28,sourceGaps:gaps,rows},null,2)+'\n')
console.log(JSON.stringify({result:'PASS',days:28,requiredTasks:rows.length,sourceGaps:gaps}))
