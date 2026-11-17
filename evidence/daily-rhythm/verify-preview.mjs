import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { chromium, expect } from '@playwright/test'

const base = process.argv[2] ?? 'http://127.0.0.1:4177/'
const prefix = base.startsWith('https:') ? 'hosted' : 'local'
const output = new URL('./', import.meta.url)
mkdirSync(output, { recursive: true })
const report = { url: base, verifiedAt: new Date().toISOString(), assets: [], layouts: [] }
const response = await fetch(base)
assert.equal(response.status, 200)
const html = await response.text()
assert.ok(html.includes('PATH to RISE Prototype'))
const assets = [...html.matchAll(/(?:src|href)="(\.\/assets\/[^"]+)"/g)].map((match) => match[1])
assert.ok(assets.some((asset) => asset.endsWith('.js')), 'Verify a production build, not a dev server')
for (const asset of assets) {
  const served = await fetch(new URL(asset, base))
  assert.equal(served.status, 200)
  const bytes = Buffer.from(await served.arrayBuffer())
  const sha256 = (value) => createHash('sha256').update(value).digest('hex')
  const local = readFileSync(new URL(`../../dist/${asset.slice(2)}`, import.meta.url))
  assert.equal(sha256(bytes), sha256(local), 'Served assets must match the locally tested build')
  if (asset.endsWith('.js')) {
    assert.ok(bytes.toString('utf8').includes('Today, in three parts.'))
    assert.ok(!/\bpractise\b/i.test(bytes.toString('utf8')))
  }
  report.assets.push({ asset, status: served.status, sha256: sha256(bytes), matchesLocal: true })
}

const browser = await chromium.launch()
try {
  for (const width of [320, 375, 430, 1280]) {
    const context = await browser.newContext({ viewport: { width, height: 900 }, reducedMotion: 'reduce' })
    const page = await context.newPage()
    const errors = []
    page.on('pageerror', (error) => errors.push(error.message))
    page.on('console', (message) => { if (message.type() === 'error') errors.push(message.text()) })
    page.on('response', (res) => { if (res.status() >= 400) errors.push(`${res.status()} ${res.url()}`) })
    await page.goto(base)
    await expect(page.getByRole('heading', { name: 'Today, in three parts.', exact: true })).toBeVisible()
    await expect(page.getByRole('button', { name: /Open next step/ })).toHaveCount(1)
    const geometry = await page.evaluate(() => {
      const visible = (element) => element.getClientRects().length > 0 && getComputedStyle(element).visibility !== 'hidden'
      const screen = document.querySelector('.screen')
      const undersized = [...document.querySelectorAll('.topbar button, .bottom-nav button, .screen button, .screen summary')].filter(visible).flatMap((element) => {
        const rect = element.getBoundingClientRect()
        return rect.width < 43.5 || rect.height < 43.5 ? [{ text: element.textContent.trim(), width: rect.width, height: rect.height }] : []
      })
      return {
        documentOverflow: document.documentElement.scrollWidth > innerWidth + 1,
        screenOverflow: screen.scrollWidth > screen.clientWidth + 1,
        undersized,
        navVisible: [...document.querySelectorAll('.bottom-nav button')].every((element) => {
          const r = element.getBoundingClientRect()
          return r.top >= 0 && r.bottom <= innerHeight + 1 && r.left >= 0 && r.right <= innerWidth + 1
        }),
        navLabels: [...document.querySelectorAll('.bottom-nav button')].map((element) => element.getAttribute('aria-label')),
        reducedMotion: getComputedStyle(document.querySelector('.page-enter')).animationDuration,
      }
    })
    assert.equal(geometry.documentOverflow, false)
    assert.equal(geometry.screenOverflow, false)
    assert.deepEqual(geometry.undersized, [], 'Touch targets must be at least 44px')
    assert.equal(geometry.navVisible, true)
    assert.deepEqual(geometry.navLabels, ['Open Today', 'Open Reset', 'Open My Path', 'Open Support'])
    assert.ok(parseFloat(geometry.reducedMotion) < 0.01)
    await page.screenshot({ path: fileURLToPath(new URL(`${prefix}-after-${width}.png`, output)), fullPage: true })
    const next = page.getByRole('button', { name: /Open next step/ })
    await next.focus()
    await expect(next).toBeFocused()
    const focusStyle = await next.evaluate((element) => ({ style: getComputedStyle(element).outlineStyle, width: getComputedStyle(element).outlineWidth }))
    assert.notEqual(focusStyle.style, 'none')
    assert.ok(parseFloat(focusStyle.width) >= 2)
    await next.press('Enter')
    await expect(page.locator('.task-detail-card')).toBeVisible()
    const storageBeforeReset = await page.evaluate(() => JSON.parse(localStorage.getItem('path-to-rise-program-progress-v1')))
    await page.getByRole('button', { name: 'Open Reset', exact: true }).click()
    await expect(page).toHaveURL(/#reset$/)
    await expect(page.getByRole('button', { name: 'Open Support', exact: true })).toBeVisible()
    await page.getByRole('button', { name: 'Open Support', exact: true }).click()
    await expect(page).toHaveURL(/#support$/)
    await page.getByRole('button', { name: 'Open My Path', exact: true }).click()
    await expect(page).toHaveURL(/#path$/)
    await page.reload()
    await expect(page.getByRole('heading', { name: 'Progress + Insights', exact: true })).toBeVisible()
    await page.getByRole('button', { name: 'Open Today', exact: true }).click()
    await expect(page.getByRole('heading', { name: 'Today, in three parts.', exact: true })).toBeVisible()
    assert.deepEqual(await page.evaluate(() => JSON.parse(localStorage.getItem('path-to-rise-program-progress-v1'))), storageBeforeReset)
    assert.deepEqual(errors, [])
    report.layouts.push({ width, ...geometry, keyboardFocus: focusStyle, nextTaskOpened: true, routesAndReload: true, consoleOrResourceErrors: errors.length })
    await context.close()
  }
  const recoveryContext = await browser.newContext({ viewport: { width: 375, height: 900 } })
  const recoveryPage = await recoveryContext.newPage()
  const storageKey = 'path-to-rise-program-progress-v1'
  await recoveryPage.addInitScript((key) => localStorage.setItem(key, JSON.stringify({
    currentDay: 28, status: 'program_complete', completedDays: [], daySectionProgress: {},
    dayTaskProgress: {}, savedReflections: {}, lastReturn: 'today',
  })), storageKey)
  await recoveryPage.goto(base)
  await expect(recoveryPage.locator('.rhythm-progress')).toContainText('Day 28 of 28 complete')
  await expect(recoveryPage.locator('.rhythm-total')).toHaveText('0 of 17 actions complete · Day 28')
  const beforeReview = await recoveryPage.evaluate((key) => localStorage.getItem(key), storageKey)
  await recoveryPage.getByRole('button', { name: 'Review morning', exact: true }).click()
  await expect(recoveryPage.locator('.task-detail-card')).toContainText('Day 28 · Morning Activation')
  await expect(recoveryPage.locator('.task-detail-card')).not.toContainText('Day 1 · Morning Activation')
  assert.equal(await recoveryPage.evaluate((key) => localStorage.getItem(key), storageKey), beforeReview)
  report.recoveryState = { reviewDay: 28, fabricatedCompletions: false, storageUnchangedByReview: true }
  await recoveryContext.close()
} finally {
  await browser.close()
}
report.result = 'PASS'
writeFileSync(new URL(`${prefix}-verification.json`, output), `${JSON.stringify(report, null, 2)}\n`)
console.log(JSON.stringify(report, null, 2))
