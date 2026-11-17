import { chromium, expect } from '@playwright/test'
import assert from 'node:assert/strict'
import { writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
const root = new URL('./', import.meta.url)
const variants=['a-reset-first','b-continue-first','c-privacy-data','d-reminders']
const report={purpose:'Design mock validation only; no hosted app implementation',layouts:[],interactions:[],errors:[]}
const browser=await chromium.launch()
const url=(variant,query='')=>new URL(`${variant}/index.html${query}`,root).href
try{
 for(const variant of variants){
  for(const [width,height] of [[390,960],[390,844],[320,844]]){
   const page=await browser.newPage({viewport:{width,height},reducedMotion:'reduce'})
   page.on('pageerror',e=>report.errors.push(e.message))
   await page.goto(url(variant))
   await expect(page.locator('main')).not.toBeEmpty()
   const geometry=await page.evaluate(()=>{
    const main=document.querySelector('main'),nav=document.querySelector('nav');const m=main.getBoundingClientRect(),n=nav.getBoundingClientRect()
    return {documentOverflow:document.documentElement.scrollWidth>innerWidth,contentOverflow:main.scrollWidth>main.clientWidth,navWithinViewport:n.bottom<=innerHeight+.1,contentNavOverlap:Math.max(0,m.bottom-n.top),smallTargets:[...document.querySelectorAll('button,summary,input,select')].filter(e=>e.checkVisibility()).map(e=>({label:e.getAttribute('aria-label')||e.textContent.trim(),rect:e.getBoundingClientRect()})).filter(x=>x.rect.height<43.99||x.rect.width<43.99).map(x=>({label:x.label,w:x.rect.width,h:x.rect.height})),navLabels:[...nav.querySelectorAll('button')].map(b=>b.textContent.trim())}
   })
   assert.equal(geometry.documentOverflow,false,variant+' document overflow')
   assert.equal(geometry.contentOverflow,false,variant+' content overflow')
   assert.equal(geometry.navWithinViewport,true)
   assert.equal(geometry.contentNavOverlap,0)
   assert.deepEqual(geometry.smallTargets,[])
   assert.deepEqual(geometry.navLabels,['Today','Reset','My Path','Support'])
   if(width===390 && height===960)await page.screenshot({path:fileURLToPath(new URL(`${variant}.png`,root))})
   report.layouts.push({variant,width,height,...geometry})
   await page.close()
  }
 }
 for(const variant of variants.slice(0,2)){
  const page=await browser.newPage({viewport:{width:390,height:960}})
  for(const state of ['fresh','partial','returning','complete']){
   await page.goto(url(variant,`?state=${state}`))
   await expect(page.getByRole('heading',{name:'Leave the shift. Keep yourself.'})).toBeVisible()
   const label=state==='complete'?'Reset or revisit a practice':state==='fresh'?'Start Day 1':'Continue Day 1'
   await page.getByRole('button',{name:label,exact:true}).click()
   await expect(page.locator('dialog')).toBeVisible()
   await page.locator('#cancel').click()
   await page.getByRole('button',{name:'Your space: privacy, reminders and local data'}).click()
   await expect(page.getByRole('heading',{name:'Your space',exact:true})).toBeVisible()
   await page.getByRole('button',{name:/Reminders Optional/}).click()
   await expect(page.getByRole('heading',{name:'Reminders',exact:true})).toBeVisible()
   if(state==='complete'){
    await expect(page.locator('[data-toggle=program]')).toBeDisabled()
    await expect(page.locator('[data-toggle=return]')).toBeDisabled()
   }
   report.interactions.push({variant,state,primaryAction:label,settingsAndReminders:true})
  }
  await page.goto(url(variant,'?shortcut=none'))
  await expect(page.getByText('Source-backed',{exact:true})).toBeVisible()
  await page.close()
 }
 const page=await browser.newPage({viewport:{width:390,height:960}})
 await page.goto(url('c-privacy-data'))
 for(const scope of ['program','tools','all']){
  await page.locator(`[data-clear=${scope}]`).click()
  await expect(page.locator('dialog')).toBeVisible()
  await expect(page.locator('#confirm')).toBeVisible()
  if(scope==='all')await page.screenshot({path:fileURLToPath(new URL('confirmation.png',root))})
  await page.locator('#cancel').click()
  await expect(page.locator('#result')).toBeEmpty()
  await page.locator(`[data-clear=${scope}]`).click()
  await page.locator('#confirm').click()
  await expect(page.locator('#result')).toContainText('no live data cleared')
  await page.reload()
 }
 report.interactions.push({scope:'three independent clear controls',cancelAndConfirmation:true,noStorageCalls:true})
 await page.goto(url('d-reminders'))
 await page.locator('[data-permission]').click()
 await expect(page.locator('#dialog-copy')).toContainText('This mock requests no permission')
 await page.locator('#cancel').click()
 await page.locator('.privacy-mode summary').click()
 await expect(page.getByText('Your next practice is ready when you are.',{exact:false})).toBeVisible()
 await page.locator('.privacy-mode summary').click()
 await page.locator('.reminder details summary').nth(1).click()
 await expect(page.locator('[data-toggle=practice]')).toBeDisabled()
 await page.locator('#practice-choice').selectOption({label:'Mirror Breathwork'})
 await expect(page.locator('[data-toggle=practice]')).toBeEnabled()
 await page.locator('[data-toggle=practice]').click()
 await expect(page.locator('[data-toggle=practice]')).toHaveAttribute('aria-pressed','true')
 await page.getByLabel('Practice reminder time',{exact:true}).fill('17:30')
 await page.screenshot({path:fileURLToPath(new URL('reminders-practice-expanded.png',root))})
 for(let i=0;i<4;i++){
  const details=page.locator('.reminder details').nth(i)
  if(!await details.getAttribute('open')) {if(await details.evaluate(e=>!e.open))await details.locator('summary').click()}
  await expect(details.locator('input[type=time]')).toBeVisible()
 }
 await page.getByLabel('Days before return reminder').fill('10')
 await page.getByLabel('Quiet hours start').fill('23:00')
 await page.getByLabel('Quiet hours end').fill('08:00')
 report.interactions.push({scope:'reminder controls',permissionExplanation:true,copyPreview:true,practiceConsentAndSelector:true,allFourTimeInputs:true,returnDays:true,overnightQuietHoursFields:true})
 await page.close()
 assert.deepEqual(report.errors,[])
 report.result='PASS'
 writeFileSync(new URL('mock-validation.json',root),JSON.stringify(report,null,2)+'\n')
 console.log(JSON.stringify({result:report.result,layouts:report.layouts.length,interactionScenarios:report.interactions.length,errors:report.errors,screenshots:variants.map(v=>v+'.png')},null,2))
}finally{await browser.close()}
