// One-time read-only baseline extraction from the accepted pre-spacing Git tree.
// Never regenerate this fixture to hide non-whitespace changes.
import { execFileSync } from 'node:child_process'
import { createHash } from 'node:crypto'
import { writeFileSync } from 'node:fs'
import ts from 'typescript'
import { dayRoadmaps, getAllRoadmapTasks } from '../../src/dayRoadmap.ts'
import { getTaskPresentation } from '../../src/taskPresentation.ts'
const gitBaseline = '692217b875966fd984877e3a5196701552b7141a'
const source = execFileSync('git', ['show', `${gitBaseline}:src/taskPresentation.ts`], { encoding: 'utf8' })
const js = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 } }).outputText
const original = await import(`data:text/javascript;base64,${Buffer.from(js).toString('base64')}`)
const digest = value => createHash('sha256').update(value).digest('hex')
const canonical = value => JSON.stringify(value, (_key, v) => typeof v === 'string' ? v.replace(/\s/g, '') : v)
const taskViews = {}, changed = []
for (const day of dayRoadmaps) for (const task of getAllRoadmapTasks(day)) {
  const before = original.getTaskPresentation(task), after = getTaskPresentation(task)
  taskViews[task.id] = digest(canonical(before))
  if (canonical(before) !== canonical(after)) throw Error(`Non-whitespace presentation change: ${task.id}`)
  if (JSON.stringify(before) !== JSON.stringify(after)) changed.push({ id: task.id, before, after })
}
const sourceBytes = execFileSync('git', ['show', `${gitBaseline}:src/programContent.ts`], { encoding: 'utf8' }).replace(/\r\n/g, '\n')
writeFileSync('evidence/word-spacing/source-spacing-baseline.json', JSON.stringify({ gitBaseline, originalProgramSourceSha256: digest(sourceBytes), taskViews }, null, 2))
writeFileSync('evidence/word-spacing/presentation-whitespace-delta.json', JSON.stringify(changed, null, 2))
console.log(JSON.stringify({ result: 'PASS', baselineTaskViews: Object.keys(taskViews).length, changedViews: changed.map(c => c.id), allNonWhitespacePresentationContentPreserved: true }))
