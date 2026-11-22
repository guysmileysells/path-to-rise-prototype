import assert from 'node:assert/strict'
import { dayRoadmaps } from '../src/dayRoadmap.ts'
import { getTaskPresentation } from '../src/taskPresentation.ts'

const base = dayRoadmaps[0].morningActions[0]
assert.deepEqual(getTaskPresentation(base), {
  what: base.what,
  when: base.timingLabel,
  how: base.instructions,
  benefits: base.benefits,
  sourceGap: false,
}, 'The pure helper exposes the actual task contract, not empty scaffolding')
const inline = {
  ...base,
  title: 'Gentle walk',
  what: 'Physical activity from Day 10\'s approved curriculum.',
  instructions: [
    'Gentle walk',
    'wHeN: After lunch. WHAT: A 20-minute walk. hOw: Walk slowly. WHY: A chance to notice your surroundings.',
    'BENEFITS:',
    'Time outdoors',
    'A deliberate pause',
    'Gentle walk',
  ],
  benefits: [],
}
assert.deepEqual(getTaskPresentation(inline), {
  what: 'A 20-minute walk.',
  when: 'After lunch.',
  how: ['Walk slowly.'],
  benefits: ['Time outdoors', 'A deliberate pause'],
  sourceGap: false,
}, 'Inline case-insensitive metadata is routed to clean sections, not shown as scaffolding')
const plain = {
  ...base,
  title: 'Notice your patterns',
  shortTitle: 'Notice your patterns',
  what: 'Physical activity from Day 3\'s approved curriculum.',
  timingLabel: '\tMidday   or afternoon\t',
  instructions: [
    '\tNotice your patterns  ',
    'HOW Walk\t slowly.  Keep breathing.',
    'PROMPTS:',
    'What matters   most today? ______',
    '\t______',
    'First paragraph.\n\nSecond   paragraph.',
    'Rest 30 seconds.',
    'Rest 30 seconds.',
  ],
  prompts: ['Notice your patterns', 'What matters most today?', 'What could I try next?', 'Entry 1'],
  writingFieldLabels: ['Entry 1'],
  specialNote: 'Parent renders this safety note once.',
  examples: ['Parent renders this example once.'],
  benefits: ['\tA deliberate   pause ', 'A deliberate pause', 'Time outdoors', 'Body awareness', 'Fourth benefit'],
}
assert.deepEqual(getTaskPresentation(plain), {
  what: 'Notice your patterns',
  when: 'Midday or afternoon',
  how: ['Walk slowly. Keep breathing.', 'What matters most today?', 'First paragraph.', 'Second paragraph.', 'Rest 30 seconds.', 'Rest 30 seconds.', 'What could I try next?'],
  benefits: ['A deliberate pause', 'Time outdoors', 'Body awareness'],
  sourceGap: false,
}, 'Normalize paper/whitespace, preserve paragraphs and repeated steps, merge prompts only once without field/title scaffolding')
assert.equal(getTaskPresentation(dayRoadmaps[0].tasks[0]).what, '15-Minute Walk/Stroll + 5 Minutes Stretching', 'Generic curriculum scaffolding becomes the meaningful source title')
const longQuestion = `What would it mean to ${'notice every detail without rushing '.repeat(30)}and why?`
assert.ok(getTaskPresentation({ ...base, instructions: [longQuestion], prompts: [longQuestion] }).how.includes(longQuestion), 'Long source questions are never length-truncated')
const safety = {
  ...base,
  what: 'Move gently.',
  instructions: [
    'HOW: Rules:',
    'Complete 2 rounds slowly.',
    'Sit to Stands on chair: 3x8 reps',
    'Rest 45–60 seconds between rounds.',
    'WHY: A deliberate pause. Time to notice your body.',
    'The goal is regulation, not exhaustion.',
    'Stop if movement is painful.',
    'If uncomfortable, pause and breathe comfortably.',
    '“What does comfortable movement feel like?”',
    'HOW: Repeat slowly:',
    '“I do not need to carry everything at once.”',
    'BENEFITS: Body awareness',
    'A pause',
    'A simple routine',
    'Fourth item',
    'Do not force movement.',
  ],
  prompts: [],
  benefits: [],
}
const safetyResult = getTaskPresentation(safety)
assert.deepEqual(safetyResult.how, [
  'Complete 2 rounds slowly.',
  'Sit to Stands on chair: 3x8 reps',
  'Rest 45–60 seconds between rounds.',
  'The goal is regulation, not exhaustion.',
  'Stop if movement is painful.',
  'If uncomfortable, pause and breathe comfortably.',
  '“What does comfortable movement feel like?”',
  'Repeat slowly:',
  '“I do not need to carry everything at once.”',
  'Do not force movement.',
], 'Meaningful steps, source quotations and safety notes survive even following WHY/BENEFITS; HOW scaffolding is removed')
assert.deepEqual(safetyResult.benefits, ['Body awareness', 'A pause', 'A simple routine'])
assert.deepEqual(getTaskPresentation({ ...base, instructions: ['HOW: Walk slowly.', 'WHY: Notice your surroundings. A moment outside.'], benefits: [] }).benefits,
  ['Notice your surroundings.', 'A moment outside.'], 'Without explicit benefits, use complete short source rationale sentences, not invented claims')
assert.deepEqual(getTaskPresentation({ ...base, instructions: ['Walk slowly.'], benefits: [], why: 'A chance to notice your surroundings. A deliberate pause.' }).benefits,
  ['A chance to notice your surroundings.', 'A deliberate pause.'], 'Structured source rationale is used when there is no inline WHY or benefits list')
assert.deepEqual(getTaskPresentation({ ...base, instructions: ['Walk slowly.'], benefits: [], why: 'The original source instructions and rationale are preserved below.' }).benefits,
  [], 'Developer provenance scaffolding is not a user benefit')
const gaps = []
for (const roadmap of dayRoadmaps) {
  for (const task of [...roadmap.morningActions, ...roadmap.tasks, ...roadmap.eveningActions]) {
    const before = JSON.stringify(task)
    const presentation = getTaskPresentation(task)
    assert.equal(JSON.stringify(task), before, 'Presentation never mutates the task/storage contract')
    assert.deepEqual(Object.keys(presentation).sort(), ['benefits', 'how', 'sourceGap', 'what', 'when'])
    assert.ok(presentation.what && presentation.when)
    assert.ok(presentation.benefits.length <= 3)
    assert.ok(!/activity from Day|approved curriculum|source instructions below/i.test(presentation.what))
    if (presentation.sourceGap) {
      gaps.push(task.id)
      assert.match(presentation.how.join(' '), /source.*(?:unavailable|does not include|not supplied)/i)
      assert.deepEqual(presentation.benefits, [], 'No fabricated source-gap benefits')
      assert.ok(!/follow the approved|midday|afternoon|evening/i.test(presentation.how.join(' ')))
    }
  }
}
assert.deepEqual(gaps, ['day-16-daily-04-intellectual', 'day-16-daily-05-social', 'day-16-daily-06-environmental'], 'SourceGap is exactly the three actual Day 16 daily gaps')
assert.equal(getTaskPresentation({ ...dayRoadmaps[15].tasks[3], kind: 'MORNING' }).sourceGap, false, 'A matching category alone must not flag other task kinds')
const affirmationCaveat = 'The goal is repetition and reflection, not forcing yourself to believe or feel something immediately.'
const actualAffirmation = dayRoadmaps[0].morningActions.find(task => /mirror-affirmations$/.test(task.id))
assert.ok(actualAffirmation.why.includes(affirmationCaveat), 'Actual source fixture includes the non-forcing affirmation caveat')
assert.ok(getTaskPresentation(actualAffirmation).how.includes(affirmationCaveat), 'Retain structured rationale safety/goal guidance in How even when benefits exist')
assert.ok(!getTaskPresentation(dayRoadmaps[8].tasks.find(task => task.category === 'Environmental')).how.includes('focus,'), 'Day9 rationale noun-list fragment must not become a dangling instruction')
let checkedTasks = 0
let preservedQuestionLines = 0
const normalize = value => value.replace(/_{2,}/g, '').replace(/[\t ]+/g, ' ').trim()
for (const roadmap of dayRoadmaps) {
  for (const task of [...roadmap.morningActions, ...roadmap.tasks, ...roadmap.eveningActions]) {
    checkedTasks++
    const presentation = getTaskPresentation(task)
    for (const line of presentation.how) {
      assert.ok(!/(?:^|\s)(?:WHEN|WHAT|HOW|WHY|BENEFITS?)\s*:/i.test(line), `${task.id} leaks a metadata label into How`)
      assert.ok(!/[\t]| {2,}|_{2,}|\n\s*\n/.test(line), `${task.id} contains paper/spacing scaffolding`)
    }
    for (const line of task.instructions.filter(line => line.includes('?'))) {
      if ([task.title, task.shortTitle].includes(line) || /WHEN:|WHAT:|HOW:|WHY:|BENEFIT/i.test(line)) continue
      preservedQuestionLines++
      assert.ok(presentation.how.includes(normalize(line)), `${task.id} must retain the full question line: ${line}`)
      assert.equal(presentation.how.filter(item => item === normalize(line)).length, 1, `${task.id} duplicates an original question via task.prompts`)
    }
    if (/mirror-affirmations$/.test(task.id)) {
      for (const line of task.instructions.filter(line => /^AFFIRMATION|^"/.test(line))) {
        assert.ok(presentation.how.includes(line), 'Preserve affirmation markers and exact quoted text for the parent to render as cards')
      }
    }
  }
}
for (const day of [15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28]) {
  const task = dayRoadmaps[day - 1].tasks[0]
  const presentation = getTaskPresentation(task)
  const full = [presentation.what, presentation.when, ...presentation.how].join(' ')
  for (const line of task.instructions.filter(line => /(?:\d+x\s*\d|\d+\s*deep breaths afterward|\d+\s*slow deep breaths afterward|\brest \d|\bhold (?:each stretch|stretches))/i.test(line))) {
    const how = line.match(/\bHOW:\s*(.*)/i)?.[1] ?? line
    assert.ok(full.includes(normalize(how)), `Day ${day} retains exact circuit reps, holds and rest timing: ${line}`)
  }
  for (const timing of ['Immediately before walk.', 'Immediately after calisthenics.']) assert.ok(presentation.when.includes(timing))
  for (const part of ['20-minute', 'stretching']) assert.ok(presentation.what.includes(part))
}
assert.equal(checkedTasks, 448)
console.log(JSON.stringify({ result: 'PASS', checkedTasks, preservedQuestionLines, scenarios: 'contract, metadata, normalization, prompt fidelity, safety, source gaps, exercise/affirmation fidelity' }))
