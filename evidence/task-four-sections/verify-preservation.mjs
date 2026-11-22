import ts from 'typescript'
import assert from 'node:assert/strict'
import { execFileSync } from 'node:child_process'
import { readFileSync, writeFileSync } from 'node:fs'
import { pathToFileURL } from 'node:url'
import { resolve } from 'node:path'
import { dayRoadmaps } from '../../src/dayRoadmap.ts'
import { programContent } from '../../src/programContent.ts'
const baseline='d8186e0cd9a09954646ef17e17edc8085b3fca2f'
const source=execFileSync('git',['show',`${baseline}:src/dayRoadmap.ts`],{encoding:'utf8'})
const oldJS=ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.ESNext,target:ts.ScriptTarget.ES2022}}).outputText.replace("'./programContent.ts'",JSON.stringify(pathToFileURL(resolve('src/programContent.ts')).href))
const {dayRoadmaps:old}=await import('data:text/javascript;base64,'+Buffer.from(oldJS).toString('base64'))
const changes=[]
for(const [i,day] of dayRoadmaps.slice(0,7).entries()) for(const [j,task] of day.tasks.entries()) {
 const {instructions:before,...beforeRest}=old[i].tasks[j],{instructions:after,...afterRest}=task
 assert.deepEqual(afterRest,beforeRest,`${task.id}: non-instruction fields changed`)
 for(const line of before) assert(after.includes(line),`${task.id}: lost baseline instruction`)
 const added=after.filter(line=>!before.includes(line))
 const lines=programContent[i].sections.flatMap(section=>[section.label,...section.content])
 const start=lines.indexOf(`${task.category} Task`), next=lines.findIndex((line,index)=>index>start && /^(?:Physical|Emotional|Spiritual|Intellectual|Social|Environmental) Task$|^End-of-Day Reflection/.test(line))
 const block=lines.slice(start,next<0?lines.length:next).map(line=>line.replace(/_{2,}/g,'').trim())
 for(const line of added) assert(block.includes(line),`${task.id}: added line must match exact canonical category block ${line}`)
 if(added.length) changes.push({id:task.id,restoredCanonicalLines:added})
}
for(const file of ['src/programContent.ts','src/toolContent.ts','src/notificationContent.ts','src/personalizationContent.ts','src/InlineExpansion.tsx','package-lock.json','.github/workflows/pages.yml']) assert.equal(readFileSync(file,'utf8').replace(/\r\n/g,'\n'),execFileSync('git',['show',`${baseline}:${file}`],{encoding:'utf8',maxBuffer:8*1024*1024}).replace(/\r\n/g,'\n'),file)
const report={result:'PASS',baseline,week1Tasks:42,allNonInstructionFieldsUnchanged:true,onlyRestoredCanonicalSourceLines:changes,unchangedSourceAndEngines:true}
writeFileSync(new URL('preservation.json',import.meta.url),JSON.stringify(report,null,2)+'\n')
console.log(JSON.stringify(report))
