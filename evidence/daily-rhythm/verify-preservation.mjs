import assert from 'node:assert/strict'
import { execFileSync } from 'node:child_process'
import { createHash } from 'node:crypto'
import { readFileSync, writeFileSync } from 'node:fs'

const baseline = '8045621'
const normalize = (text) => text.replaceAll('\r\n', '\n')
const original = (path) => normalize(execFileSync('git', ['show', `${baseline}:${path}`], { encoding: 'utf8' }))
const current = (path) => normalize(readFileSync(path, 'utf8'))
const sourceFiles = ['src/dayRoadmap.ts', 'src/programContent.ts', 'src/toolContent.ts', 'src/progressContent.ts', 'src/personalizationContent.ts', 'src/notificationContent.ts', 'src/InlineExpansion.tsx', 'src/pathData.ts']
const content = sourceFiles.map((path) => {
  assert.equal(current(path), original(path), `${path}: canonical content/behavior changed`)
  return { path, unchanged: true, normalizedSha256: createHash('sha256').update(current(path)).digest('hex') }
})
const before = original('src/App.tsx'), after = current('src/App.tsx')
const region = (text, start, end) => {
  const index = text.indexOf(start)
  assert.ok(index >= 0, `Missing start marker ${start}`)
  const endIndex = end ? text.indexOf(end, index + start.length) : text.length
  assert.ok(endIndex > index)
  return text.slice(index, endIndex)
}
const boundaries = [
  ['program schema', 'type ProgramProgress = {', 'type ToolState = {'],
  ['storage keys', 'const storageKey =', 'type StorageNotice ='],
  ['progress parse and hydration', 'function parseProgress(', 'function getCurrentNotificationPermission('],
  ['notification platform and routes', 'function getCurrentNotificationPermission(', 'function getSectionKey('],
  ['reflection save/delete', '  const saveReflection =', '  const toggleRoadmapTask ='],
  ['task/day progression', '  const toggleRoadmapTask =', '\n  return ('],
  ['settings, Reset, tools, MyPath, all existing task/detail/support UIs', 'function NotificationSettings(', null],
]
const checks = boundaries.map(([name, start, end]) => {
  assert.ok(after.includes(start) && (!end || after.includes(end)), `${name}: protected marker missing`)
  assert.equal(region(after, start, end), region(before, start, end), `${name}: inspect unexpected changes`)
  return { name, status: 'UNCHANGED' }
})
const report = { baseline, content, checks, result: 'PASS' }
writeFileSync(new URL('./preservation-results.json', import.meta.url), `${JSON.stringify(report, null, 2)}\n`)
console.log(JSON.stringify(report, null, 2))
