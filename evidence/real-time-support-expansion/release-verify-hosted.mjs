import { chromium } from '@playwright/test'
import fs from 'node:fs'
import path from 'node:path'
const out = path.resolve('evidence/real-time-support-expansion')
const base = process.env.BASE_URL || 'http://127.0.0.1:4183/'
const label = process.env.CHECK_LABEL || 'release-local'
const browser = await chromium.launch()
const results = []
try {
  for (const width of [320, 390, 1280]) {
    const context = await browser.newContext({ viewport: { width, height: width === 320 ? 568 : 900 }, reducedMotion: 'reduce' })
    const page = await context.newPage()
    const errors = [], requests = []
    page.on('pageerror', e => errors.push(e.message))
    page.on('request', request => { if (request.method() !== 'GET') requests.push(request.url()) })
    await page.goto(base)
    await page.getByRole('button', { name: 'Real-Time Support', exact: true }).click()
    const names = await page.locator('.rts-tool > .inline-expansion > button').allTextContents()
    if (names.length !== 10) throw new Error('Expected ten tools')
    if (!(await page.locator('.rts-safety').first().innerText()).includes('Not clinically reviewed')) throw new Error('Clinical-review disclaimer missing')
    if (width === 390) await page.setViewportSize({ width, height: 1500 })
    await page.screenshot({ path: path.join(out, `${label}-${width}-ten-tools.png`), fullPage: true })
    if (width === 390) await page.setViewportSize({ width, height: 900 })
    await context.setOffline(true)
    const cases = []
    for (let i = 0; i < 10; i++) {
      const row = page.locator('.rts-tool').nth(i)
      await row.locator(':scope > .inline-expansion > button').click()
      const headings = await row.locator('h2').allTextContents()
      if (headings.join('|') !== 'What|When|How|Why|Benefits|Duration|Adaptations|Scientific References') throw new Error('Incorrect tool headings')
      const beforeStorage = await page.evaluate(() => JSON.stringify({ ...localStorage }))
      await row.getByLabel('I am stationary and not doing a safety-critical task.').check()
      await row.getByRole('button', { name: 'Start Guided Practice', exact: true }).click()
      const geometry = await row.evaluate(el => ({
        viewport: document.documentElement.clientWidth, scroll: document.documentElement.scrollWidth,
        small: [...el.querySelectorAll('button,select')].filter(e => e.getClientRects().length).map(e => ({ name: e.textContent.trim().slice(0,60), h: e.getBoundingClientRect().height, w: e.getBoundingClientRect().width })).filter(e => e.h < 43.5 || e.w < 43.5),
      }))
      if (geometry.scroll > geometry.viewport || geometry.small.length) throw new Error(JSON.stringify({ width, i, geometry }))
      if (i === 5) {
        await row.getByRole('button', { name: 'Next step', exact: true }).click()
        await page.screenshot({ path: path.join(out, `${label}-${width}-pmr.png`), fullPage: false })
      }
      await row.getByRole('button', { name: 'Stop practice', exact: true }).click()
      if (await page.evaluate(() => JSON.stringify({ ...localStorage })) !== beforeStorage) throw new Error('Practice wrote browser storage')
      cases.push({ tool: names[i], offlineStartStop: 'PASS', geometry })
    }
    if (errors.length || requests.length) throw new Error(JSON.stringify({ errors, nonGetRequests: requests }))
    results.push({ width, cases, errors, nonGetRequests: requests, offlineScope: 'already loaded tab only; no cold-start guarantee' })
    await context.close()
  }
} finally { await browser.close() }
fs.writeFileSync(path.join(out, `${label}-verification.json`), JSON.stringify({ base, results }, null, 2))
console.log('PASS: all ten loaded-page offline start/stop flows at 320x568, 390 and 1280; no horizontal overflow or sub-44px button/select targets; no storage writes, runtime errors or non-GET requests. Screenshots saved.')
