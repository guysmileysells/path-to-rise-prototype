import { execFileSync } from 'node:child_process'
import { createHash } from 'node:crypto'
import { readFileSync, writeFileSync } from 'node:fs'
import assert from 'node:assert/strict'
const paths=execFileSync('git',['ls-files','--cached','--others','--exclude-standard','--','src','tests/browser','public','scripts','package.json','package-lock.json','vite.config.ts','playwright.config.ts','.github/workflows/pages.yml'],{encoding:'utf8'}).trim().split('\n').sort()
const hash=text=>createHash('sha256').update(text).digest('hex')
const files=paths.map(path=>{ const data=readFileSync(path); const bytes=/\.(png|jpe?g|webp|gif|ico|woff2?|ttf|pdf)$/i.test(path)?data:Buffer.from(data.toString('utf8').replace(/\r\n/g,'\n')); return {path, sha256:createHash('sha256').update(bytes).digest('hex')} })
const sourceDigest=hash(JSON.stringify(files)), path='evidence/task-four-sections/candidate-manifest.json'
if(process.argv.includes('--check')) assert.deepEqual(files,JSON.parse(readFileSync(path,'utf8')).files,'Runtime/test candidate changed after verification')
else writeFileSync(path,JSON.stringify({sourceDigest,normalization:'CRLF to LF text only',files},null,2)+'\n')
console.log(JSON.stringify({result:'PASS',mode:process.argv.includes('--check')?'check':'record',sourceDigest,files:paths.length}))
