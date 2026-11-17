import ts from 'typescript'
import { execFileSync } from 'node:child_process'
import { readFileSync,writeFileSync } from 'node:fs'
import assert from 'node:assert/strict'
const baseline='424d3be1f90615a05ad58d5f774c9315ec9f189a'
const normalize=s=>s.replace(/\r\n/g,'\n')
const before=normalize(execFileSync('git',['show',`${baseline}:src/App.tsx`],{encoding:'utf8'}))
const after=normalize(readFileSync('src/App.tsx','utf8'))
const parse=text=>ts.createSourceFile('App.tsx',text,ts.ScriptTarget.Latest,true,ts.ScriptKind.TSX)
const functions=source=>new Map(source.statements.filter(ts.isFunctionDeclaration).map(n=>[n.name.text,n]))
const a=functions(parse(before)), b=functions(parse(after))
const intentional=new Set(['App','Today','NotificationSettings','LocalDataControls','firstIncompleteDay'])
const unchangedFunctions=[]
for (const [name,node] of a) if (!intentional.has(name)) { assert.equal(b.get(name)?.getText(),node.getText(),`${name} changed unexpectedly`);unchangedFunctions.push(name) }
const declarations=node=>new Map(node.body.statements.filter(ts.isVariableStatement).flatMap(s=>s.declarationList.declarations.map(d=>[d.name.getText(),d.getText()])))
const oldApp=declarations(a.get('App')), newApp=declarations(b.get('App'))
for (const [name,text] of oldApp) assert.equal(newApp.get(name),text,`App state/handler ${name} changed`)
const engines=['src/dayRoadmap.ts','src/programContent.ts','src/toolContent.ts','src/notificationContent.ts','src/personalizationContent.ts','src/progressContent.ts','src/InlineExpansion.tsx','package.json','package-lock.json','.github/workflows/pages.yml']
for(const file of engines) assert.equal(normalize(readFileSync(file,'utf8')),normalize(execFileSync('git',['show',`${baseline}:${file}`],{encoding:'utf8',maxBuffer:8*1024*1024})),`${file} changed`)
const report={result:'PASS',baseline,unchangedFunctions,unchangedAppDeclarations:[...oldApp.keys()],unchangedFiles:engines,intentionalChanges:[...intentional],note:'App return JSX and one header-request layout effect are intentionally changed; firstIncompleteDay adds a read-only completed-program guard. This check does not claim exhaustive semantic/security equivalence.'}
writeFileSync('evidence/today-option-a-apply/preservation.json',JSON.stringify(report,null,2)+'\n')
console.log(JSON.stringify({result:report.result,unchangedFunctions:unchangedFunctions.length,unchangedAppDeclarations:oldApp.size,unchangedFiles:engines.length},null,2))
