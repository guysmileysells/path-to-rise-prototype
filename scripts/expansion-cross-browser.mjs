import { chromium, webkit, firefox, devices } from 'playwright';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const base = process.env.PREVIEW_URL || 'http://127.0.0.1:4176/';
const output = process.env.EVIDENCE_DIR || 'evidence/global-expansion/cross-browser';
fs.mkdirSync(output, { recursive:true });
const results=[];
const engines = [
 ['chromium-android',chromium,{...devices['Pixel 7']}],
 ['webkit-iphone',webkit,{...devices['iPhone 13']}],
 ['firefox-desktop',firefox,{viewport:{width:1280,height:900}}]
];
async function visibleAnchor(trigger,panel) {
 await panel.waitFor({state:'visible'});
 for(let n=0;n<20;n++) {
  const g=await trigger.evaluate((t)=> {const r=t.getBoundingClientRect();const s=document.querySelector('.screen').getBoundingClientRect();return {top:r.top,bottom:r.bottom,viewTop:Math.max(0,s.top),viewBottom:Math.min(innerHeight,s.bottom)};});
  const p=await panel.boundingBox();
  if(g.top>=g.viewTop-2 && g.bottom<=g.viewBottom && p.y>=g.bottom-2 && p.y-g.bottom<=30 && p.y+32<g.viewBottom) return;
  await trigger.page().waitForTimeout(100);
 }
 throw Error('Trigger and immediate panel beginning are not both visible / adjacent');
}
async function disclosure(page,text) {
 const s=page.locator('summary').filter({hasText:text}).first();
 const d=s.locator('..');
 if(await d.getAttribute('open')!==null) await s.click();
 await s.click();
 await visibleAnchor(s,d.locator(':scope > :not(summary)').first());
 await s.click();
 assert.equal(await d.getAttribute('open'),null,`collapse ${text}`);
}
for(const [name,engine,options] of engines.filter(([name])=>!process.env.TEST_ENGINE || name===process.env.TEST_ENGINE)) {
 const result={name,base,passed:false,checks:[],errors:[]};results.push(result);
 let browser;
 try {
  browser=await engine.launch();
  const context=await browser.newContext({...options,reducedMotion:'no-preference'});
  const page=await context.newPage();
  page.on('pageerror',e=>result.errors.push(e.message));
  await page.goto(base+'#path');
  await page.getByRole('button',{name:'Open Day 1',exact:true}).first().click();
  const cards=page.locator('.roadmap-task-card');
  assert.equal(await cards.count(),17);
  const stored=()=>page.evaluate(()=>localStorage.getItem('path-to-rise-program-progress-v1'));
  const before=await stored();
  for(const index of [0,5,6,11,12,16]) {
   const card=cards.nth(index);
   const trigger=card.locator('button[aria-expanded]').first();
   await trigger.click();
   await visibleAnchor(trigger,card.locator('.inline-expansion-panel').first());
   assert.equal(await page.locator('.task-detail-card').count(),1);
   await trigger.click();
   assert.equal(await page.locator('.task-detail-card').count(),0);
  }
  assert.equal(await stored(),before,'expansions must not mutate progress');
  await cards.first().locator('button[aria-expanded]').click();
  await visibleAnchor(cards.first().locator('button[aria-expanded]'),cards.first().locator('.inline-expansion-panel'));
  await page.screenshot({path:`${output}/${name}-task.png`});
  await cards.first().locator('button[aria-expanded]').click();
  result.checks.push('morning/daily/evening inline switching and collapse; progress unchanged');
  const first=cards.first();const trigger=first.locator('button[aria-expanded]').first();
  await trigger.click();
  await first.getByRole('button',{name:'Mark as Done',exact:true}).click();
  assert.equal(JSON.parse(await stored()).dayTaskProgress['1'].length,1);
  await first.getByRole('button',{name:'Undo Mark as Done',exact:true}).click();
  assert.equal(JSON.parse(await stored()).dayTaskProgress['1'].length,0);
  await trigger.click();
  result.checks.push('completion / undo preserve one-win semantics');
  const stuck=page.locator('.feeling-stuck-card');
  const choices=stuck.locator('button[aria-expanded]');
  const count=await choices.count();assert.ok(count>1);
  for(let i=0;i<count;i++) {
   const choice=choices.nth(i);
   if(await choice.getAttribute('aria-expanded')!=='true')await choice.click();
   await visibleAnchor(choice,stuck.locator('.stuck-response'));
   await choice.click();
   assert.equal(await stuck.locator('.stuck-response').count(),0);
  }
  result.checks.push(`${count} Feeling Stuck options anchored/collapsible`);
  await page.getByRole('button',{name:'Open Today',exact:true}).click();
  await page.locator('summary').filter({hasText:'Privacy, reminders + local data'}).click();
  await disclosure(page,'Reminders — optional');
  await disclosure(page,'Local prototype data controls');
  result.checks.push('nested Today reminders/data disclosures');
  await page.getByRole('button',{name:'Open Reset',exact:true}).click();
  await disclosure(page,'More RESET needs');
  await page.getByRole('button',{name:'Open Toolbox',exact:true}).click();
  await disclosure(page,'Saved + recent practices');
  await disclosure(page,'Browse all Toolbox practices');
  result.checks.push('RESET and Toolbox disclosures; navigation remains screen-based');
  await page.getByRole('button',{name:'Open My Path',exact:true}).click();
  await disclosure(page,'Path map + insights');
  await disclosure(page,'Practices + private reflections');
  await disclosure(page,'Progress privacy');
  result.checks.push('My Path native disclosures');
  assert.deepEqual(await page.locator('[id]').evaluateAll(es=>es.map(e=>e.id).filter((id,i,a)=>a.indexOf(id)!==i)),[]);
  assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'page overflow');
  assert.deepEqual(result.errors,[]);
  result.passed=true;
  await page.screenshot({path:`${output}/${name}.png`});
 }catch(e){result.failure=e.stack;}
 finally{await browser?.close();}
 fs.writeFileSync(`${output}/results.json`,JSON.stringify(results,null,2));
 console.log(JSON.stringify(result));
}
process.exitCode=results.every(r=>r.passed)?0:1;
