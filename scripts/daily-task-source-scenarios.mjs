import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
import { dayRoadmaps, getAllWinTasks } from '../src/dayRoadmap.ts'
import { programContent } from '../src/programContent.ts'

// Fixtures transcribed from the unchanged Week 2 source, not inferred from output.
const questions = [
  { day: 8, category: 'Emotional', count: 5, text: [
    'What have I been thinking about the most lately?',
    'What thoughts keep repeating?',
    'What feels emotionally heavy right now?',
    'What do I not want to admit to myself?',
    'What feels true right now even if I dislike it?',
  ] },
  { day: 8, category: 'Intellectual', count: 5, text: [
    'What am I currently avoiding?',
    'What areas of my life are clearly not working?',
    'Where am I being honest?',
    'Where am I avoiding honesty?',
    'What patterns are becoming noticeable?',
  ] },
  { day: 9, category: 'Emotional', count: 6, text: [
    'What do I usually do when I feel stressed?',
    'What do I do when I feel overwhelmed?',
    'What do I do when I do not want to deal with something?',
    'What unhealthy coping patterns do I notice?',
    'What situations trigger frustration, anger, shutdown, or avoidance?',
    'What patterns keep repeating in my life?',
  ] },
  { day: 9, category: 'Intellectual', count: 6, text: [
    'What habits help me and why?',
    'What habits hurt me and why?',
    'What behaviors repeat during stressful periods?',
    'What situations bring out the worst in me?',
    'What patterns have negatively affected my health, relationships, or peace?',
    'What patterns do I want to eventually change?',
  ] },
]
// The only allowed source-line transformation is removing paper answer blanks
// and trimming the resulting outer whitespace. No punctuation/case/word changes.
const removePaper = line => line.replace(/_{2,}/g, '').trim()
for (const fixture of questions) {
  const source = programContent[fixture.day - 1].sections.flatMap(section => [section.label, ...section.content])
  const task = dayRoadmaps[fixture.day - 1].tasks.find(task => task.category === fixture.category)
  for (const question of fixture.text) {
    assert.ok(source.some(line => removePaper(line) === question), `Fixture must match unchanged source: ${question}`)
    assert.ok(task.instructions.includes(question), `Day ${fixture.day} ${fixture.category} lost source question: ${question}`)
  }
  assert.equal(task.instructions.filter(line => line.includes('?')).length, fixture.count)
  assert.deepEqual(task.prompts, fixture.text, `Day ${fixture.day} ${fixture.category} retains all full prompts in order`)
}

for (const day of [1, 2, 3, 4, 5, 6, 7]) {
  const roadmap = dayRoadmaps[day - 1]
  const source = programContent[day - 1].sections.flatMap(section => [section.label, ...section.content])
  const start = source.indexOf('Emotional Task')
  const end = source.indexOf('Spiritual Task')
  for (const line of source.slice(start + 2, end).filter(line => /_{2,}/.test(line) && line.includes('?'))) {
    assert.ok(roadmap.tasks[1].instructions.includes(removePaper(line)), `Day ${day} Week 1 instructions must not discard paper-blank questions`)
  }
}
for (const day of [1, 8, 9]) {
  const roadmap = dayRoadmaps[day - 1]
  const source = programContent[day - 1].sections.flatMap(section => [section.label, ...section.content])
  const start = source.findIndex(line => /^End.of.Day Reflection/i.test(line))
  for (const line of source.slice(start + 1).filter(line => /_{2,}/.test(line) && line.includes('?'))) {
    assert.ok(roadmap.reflection.instructions.includes(removePaper(line)), `Day ${day} reflection retains entire question line`)
  }
}

let sourceBackedDomainTasks = 0
const sourceGaps = []
const categories = ['Physical', 'Emotional', 'Spiritual', 'Intellectual', 'Social', 'Environmental']
for (const roadmap of dayRoadmaps.slice(7)) {
  const source = programContent[roadmap.day - 1].sections.flatMap(section => [section.label, ...section.content])
  const heading = /^(?:\d+\.\s*)?(Physical|Emotional|Spiritual|Intellectual|Social|Environmental)\s+(?:DOMAIN|Wellness|Reset)(?:\s*[—–-]\s*(.+))?$/i
  const starts = source.flatMap((line, index) => {
    const match = line.trim().match(heading)
    return match ? [{ index, category: match[1].toLowerCase() }] : []
  })
  const ending = source.findIndex((line, index) => index > starts[0].index && /^(?:Day \d+ Evening|Evening Reset|End.of.Day Reflection)/i.test(line.trim()))
  assert.deepEqual(roadmap.tasks.map(task => task.category), categories)
  for (const task of roadmap.tasks) {
    assert.equal(task.id, `day-${roadmap.day}-daily-${String(task.order).padStart(2, '0')}-${task.category.toLowerCase()}`, 'Stable IDs preserve progress/writing binding')
    const blocks = starts.flatMap((start, index) => start.category === task.category.toLowerCase()
      ? source.slice(start.index + 1, starts[index + 1]?.index ?? (ending === -1 ? source.length : ending))
      : [])
    if (!blocks.length) {
      sourceGaps.push(`Day${roadmap.day} ${task.category}`)
      assert.equal(task.title, `${task.category} Activity`, 'Unprovided content must not be fabricated')
      assert.deepEqual(task.instructions, ['Follow the approved source instructions for this activity.'])
      continue
    }
    sourceBackedDomainTasks++
    assert.notEqual(task.title, `${task.category} Activity`, `Day ${roadmap.day} ${task.category} must load actual source instructions`)
    assert.ok(task.instructions.length > 1)
    assert.deepEqual(task.instructions, blocks.map(removePaper).filter(Boolean), `Day ${roadmap.day} ${task.category} must preserve EVERY source line in order, only removing paper blanks`)
    assert.ok(task.instructions.every(line => source.map(removePaper).includes(line)), 'No invented source lines')
    assert.notEqual(task.timingLabel, 'Use the timing from the approved daily curriculum.')
  }
}
assert.equal(sourceBackedDomainTasks, 123)
assert.deepEqual(sourceGaps, ['Day16 Intellectual', 'Day16 Social', 'Day16 Environmental'])
assert.equal(dayRoadmaps[7].tasks[0].title, 'Nervous System Regulation Walk + Mobility Reset')
assert.ok(dayRoadmaps[7].tasks[0].instructions.includes('Move slowly. No aggressive stretching.'))
for (const day of [15, 22, 28]) {
  const physical = dayRoadmaps[day - 1].tasks[0]
  for (const label of ['Immediately before walk', 'Immediately after calisthenics', 'After walk']) {
    assert.ok(physical.instructions.some(line => line.includes(label)), `Day ${day} retains circuit, walk AND stretching`)
  }
  assert.ok(!physical.instructions.some(line => /^4\. Emotional Wellness/.test(line)))
  assert.ok(!dayRoadmaps[day - 1].tasks[5].instructions.some(line => /Evening Reset Protocol|Evening Reset$|Closing Message|End-Of-Day Reflection/i.test(line)))
}
for (const roadmap of dayRoadmaps) assert.equal(getAllWinTasks(roadmap).length, 16)
assert.equal(createHash('sha256').update(JSON.stringify(dayRoadmaps.map(day => getAllWinTasks(day).map(task => task.id)))).digest('hex'), 'b8b3fbb79632422083f65fd3ac17dfe45fc983b63c3ed972af01bdd41c86749e', 'All existing win IDs must stay byte-identical')
assert.equal(createHash('sha256').update(readFileSync(new URL('../src/programContent.ts', import.meta.url))).digest('hex'), '14a6c3d49153cb3962c6747c33501b2f291127bce51110752d7ac5982ccbbd72', 'Raw programContent stays byte-identical')
console.log(JSON.stringify({ result: 'PASS', days: 21, questionFixtures: questions.map(({ day, category, count }) => ({ day, category, count })), sourceBackedDomainTasks, sourceGaps, stableIds: true }))
