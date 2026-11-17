import { execFileSync } from 'node:child_process'
import { createHash } from 'node:crypto'
import { readFileSync,writeFileSync } from 'node:fs'
import assert from 'node:assert/strict'
const paths=execFileSync('git',['ls-files','--cached','--others','--exclude-standard','--','src','tests/browser','public/icons','package.json','package-lock.json','vite.config.ts','playwright.config.ts','.github/workflows/pages.yml'],{encoding:'utf8'}).trim().split('\n').sort()
const digest=text=>createHash('sha256').update(text).digest('hex')
const files=Object.fromEntries(paths.map(path=>[path,digest(readFileSync(path,'utf8').replace(/\r\n/g,'\n'))]))
const sourceDigest=digest(JSON.stringify(files))
const path='evidence/today-option-a-apply/candidate-manifest.json'
if(process.argv.includes('--check')) assert.deepEqual(files,JSON.parse(readFileSync(path,'utf8')).files,'Candidate changed after verification started')
else writeFileSync(path,JSON.stringify({sourceDigest,normalization:'UTF-8 text; CRLF normalized to LF',files},null,2)+'\n')
console.log(JSON.stringify({result:'PASS',mode:process.argv.includes('--check')?'check':'record',sourceDigest,files:paths.length}))
