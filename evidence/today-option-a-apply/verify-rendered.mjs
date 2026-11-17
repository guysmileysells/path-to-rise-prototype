import { chromium, expect } from '@playwright/test'
import assert from 'node:assert/strict'
import { readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { createHash } from 'node:crypto'
const base = process.env.CHECK_URL || 'http://127.0.0.1:4180/'
const label = process.env.CHECK_LABEL || 'local'
const out = new URL('./', import.meta.url)
const root = new URL('../../', import.meta.url)
const digest = bytes => createHash('sha256').update(bytes).digest('hex')
const assets = []
const iconChecks = []
const htmlResponse = await fetch(base)
assert.equal(htmlResponse.status, 200)
const html = await htmlResponse.text()
for (const relative of [...html.matchAll(/(?:src|href)="([^"]+\.(?:js|css))"/g)].map(m => m[1])) {
  const url = new URL(relative, base)
  const response = await fetch(url)
  assert.equal(response.status, 200)
  const bytes = Buffer.from(await response.arrayBuffer())
  const name = url.pathname.split('/').pop()
  const local = readFileSync(new URL(`dist/assets/${name}`, root))
  assert.equal(digest(bytes), digest(local), `served ${name} differs from tested build`)
  assets.push({ url: url.href, sha256: digest(bytes), bytes: bytes.length })
}
assert.equal(assets.length, 2)
for (const name of ['sun','wind','route','heart-handshake','bookmark','lock-keyhole']) {
  const response = await fetch(new URL(`icons/rise-${name}.svg`, base))
  assert.equal(response.status, 200)
  assert(response.headers.get('content-type').includes('image/svg+xml'))
  const served = Buffer.from(await response.arrayBuffer())
  const local = readFileSync(new URL(`public/icons/rise-${name}.svg`, root))
  // Git checks out CRLF on Windows; Pages uses LF. Only normalize text line endings.
  const normalize = bytes => bytes.toString('utf8').replace(/\r\n/g, '\n')
  assert.equal(digest(normalize(served)), digest(normalize(local)), `icon ${name} content differs`)
  iconChecks.push({ name, servedSha256: digest(served), localSha256: digest(local), normalizedSha256: digest(normalize(served)), normalization: 'CRLF to LF only' })
}
const browser = await chromium.launch()
const results = []
const flows = []
try {
  for (const [width,height] of [[320,844],[375,812],[390,844],[430,932],[1280,900]]) {
    const context = await browser.newContext({ viewport: { width, height }, reducedMotion: 'reduce' })
    const page = await context.newPage()
    const errors = []
    page.on('pageerror', e => errors.push(e.message))
    page.on('response', r => { if (r.status() >= 400) errors.push(`${r.status()} ${r.url()}`) })
    await page.goto(new URL('#today', base).href)
    await page.getByRole('heading', { name: 'Leave the shift. Keep yourself.' }).waitFor()
    const snapshot = async mode => {
      // React can render before remote icon requests finish; decode rejects real failures.
      await page.locator('img.rise-icon').evaluateAll(images => Promise.all(images.map(image => image.decode())))
      const geometry = await page.evaluate(() => {
        const screen = document.querySelector('.screen').getBoundingClientRect()
        const nav = document.querySelector('nav').getBoundingClientRect()
        const body = document.documentElement
        const navTargets = [...document.querySelectorAll('nav button')].map(e => ({ text: e.textContent.trim(), top: e.getBoundingClientRect().top, bottom: e.getBoundingClientRect().bottom }))
        const tiny = [...document.querySelectorAll('.topbar button,.today-a button,.today-a summary,.today-a input,.today-a select,nav button')].filter(e => {
          const r=e.getBoundingClientRect(); return r.width && r.height && r.bottom>screen.top && r.top<nav.bottom && (r.height<43.99 || r.width<43.99)
        }).map(e => ({ tag:e.tagName, text:e.textContent.trim().slice(0,70), width:e.getBoundingClientRect().width, height:e.getBoundingClientRect().height }))
        return { overflow:body.scrollWidth-innerWidth, screenBottom:screen.bottom, navTop:nav.top, navBottom:nav.bottom, navTargets, tiny, brokenIcons:[...document.querySelectorAll('img.rise-icon')].filter(e=>!e.complete || !e.naturalWidth).length }
      })
      assert(geometry.overflow <= 1, JSON.stringify(geometry))
      assert(geometry.screenBottom <= geometry.navTop + 1, JSON.stringify(geometry))
      assert(geometry.navBottom <= height + 1, JSON.stringify(geometry))
      assert.deepEqual(geometry.navTargets.map(t=>t.text), ['Today','Reset','My Path','Support'])
      assert.equal(geometry.brokenIcons, 0)
      assert.deepEqual(geometry.tiny, [], JSON.stringify(geometry.tiny))
      assert.deepEqual(errors, [])
      results.push({ width,height,mode,...geometry })
      if (width === 390 || (width === 1280 && mode==='home')) await page.screenshot({path:fileURLToPath(new URL(`${label}-${mode}-${width}.png`,out))})
    }
    await snapshot('home')
    await page.getByRole('button', { name:'Your space',exact:true }).click()
    await page.getByRole('heading', {name:'Your space',exact:true}).waitFor()
    await snapshot('your-space')
    await page.locator('.notification-settings > summary').click()
    await page.getByRole('heading',{name:'Reminders',exact:true}).waitFor()
    await snapshot('reminders')
    await page.locator('.reminder-group').first().evaluate(el=>el.scrollIntoView({block:'start'}))
    await snapshot('reminder-categories')
    await page.locator('#quiet-hours-title').scrollIntoViewIfNeeded()
    const quiet=await page.locator('#quiet-hours-title').boundingBox()
    assert(quiet.y+quiet.height <= (await page.locator('nav').boundingBox()).y)
    await page.getByRole('button', { name: 'Open Today', exact: true }).click()
    await page.getByRole('button', { name: 'Reset me now', exact: true }).click()
    await expect(page).toHaveURL(/#reset$/)
    await page.getByRole('button', { name: 'Open Today', exact: true }).click()
    await page.getByRole('button', { name: /Start Day 1/ }).click()
    await expect(page.locator('#day-roadmap-title')).toContainText('Day 1:')
    await expect(page.locator('.roadmap-task-card')).toHaveCount(17)
    await page.getByRole('button', { name: 'Open Today', exact: true }).click()
    await page.getByRole('button', { name: /My Quick Kit/ }).click()
    await expect(page.getByRole('heading', { name: 'Choose a practice.', exact: true })).toBeVisible()
    flows.push({ width, checks: ['Today nav closes settings', 'Reset opens real Reset', 'Start opens canonical Day 1 with 17 tasks', 'Quick Kit opens Toolbox'] })
    if (width === 390) {
      await page.getByRole('button', { name: 'Your space', exact: true }).click()
      await page.locator('.notification-settings > summary').click()
      const program = page.locator('.reminder-group').first()
      await program.locator(':scope > summary').click()
      await program.getByRole('button', { name: 'Off', exact: true }).click()
      await page.getByRole('button', { name: 'Open Support', exact: true }).click()
      for (const origin of ['Support', 'open Reminders']) {
        await page.getByRole('button', { name: 'Your space', exact: true }).click()
        await expect(page.getByRole('heading', { name: 'Your space', exact: true })).toBeVisible()
        await expect(page.locator('.today-data-settings > summary')).toBeFocused()
        await expect(page.locator('.notification-settings')).not.toHaveAttribute('open')
        await page.locator('.notification-settings > summary').click()
        await expect(page.locator('.reminder-group').first().getByRole('button', { name: 'On', exact: true })).toBeVisible()
        flows.push({ width, checks: [`Saved-active-reminder header entry from ${origin}: visible overview, correct focus, consent preserved`] })
      }
    }
    assert.deepEqual(errors, [])
    await context.close()
  }
} finally { await browser.close() }
const report={ result:'PASS',base,checkedAt:new Date().toISOString(),assets,iconChecks,layouts:results.length,results,flows,limitations:['Automated Chromium only; physical phones, real screen readers and clinical/legal readiness not verified.','Reminder preferences/browser-tab delivery only; reliable closed-app push is not implemented.'] }
writeFileSync(new URL(`${label}-verification.json`,out),JSON.stringify(report,null,2)+'\n')
console.log(JSON.stringify({result:report.result,base,layouts:results.length,assets:assets.map(a=>a.url),report:fileURLToPath(new URL(`${label}-verification.json`,out))},null,2))
