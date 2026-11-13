import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { readFileSync, writeFileSync } from 'node:fs'
import { chromium, expect } from '@playwright/test'

const base = 'https://guysmileysells.github.io/path-to-rise-prototype/'
const report = { url: base, verifiedAt: new Date().toISOString(), assets: [], browsers: [] }
const response = await fetch(`${base}?verify=90689bf`)
assert.equal(response.status, 200)
const html = await response.text()
assert.ok(html.includes('PATH to RISE Prototype'))
const assets = [...html.matchAll(/(?:src|href)="(\.\/assets\/[^\"]+)"/g)].map((match) => match[1])
assert.ok(assets.some((asset) => asset.endsWith('.js')))
for (const asset of assets) {
  const served = await fetch(new URL(asset, base))
  assert.equal(served.status, 200)
  const bytes = Buffer.from(await served.arrayBuffer())
  const local = readFileSync(new URL(`../../dist/${asset.slice(2)}`, import.meta.url))
  const sha256 = (value) => createHash('sha256').update(value).digest('hex')
  assert.equal(sha256(bytes), sha256(local), `${asset} differs from verified local build`)
  if (asset.endsWith('.js')) {
    const text = bytes.toString('utf8')
    assert.ok(!/\bpractise\b/i.test(text))
    for (const phrase of ['practice awareness', 'practice intentional, supportive self-talk', 'practice self-recognition']) assert.ok(text.includes(phrase))
  }
  report.assets.push({ asset, status: served.status, sha256: sha256(bytes), matchesLocal: true })
}

const browser = await chromium.launch()
try {
  for (const [name, viewport] of [['mobile', { width: 390, height: 844 }], ['desktop', { width: 1280, height: 900 }]]) {
    const context = await browser.newContext({ viewport, reducedMotion: 'reduce' })
    const page = await context.newPage()
    const errors = []
    page.on('pageerror', (error) => errors.push(error.message))
    page.on('console', (message) => { if (message.type() === 'error') errors.push(message.text()) })
    await page.goto(`${base}#path`)
    await page.locator('summary').filter({ hasText: 'Path map + insights' }).click()
    const before = await page.evaluate(() => Object.fromEntries(Object.entries(localStorage)))
    let checkedPanels = 0
    for (let day = 1; day <= 28; day++) {
      await page.locator('.day-progress-grid button').nth(day - 1).click()
      await expect(page.locator('#day-roadmap-title')).toContainText(`Day ${day}:`)
      const cards = page.locator('.roadmap-task-card')
      await expect(cards).toHaveCount(17)
      for (const [index, phrase] of [[4, 'practice awareness'], [5, 'practice intentional, supportive self-talk'], [16, 'practice self-recognition']]) {
        const card = cards.nth(index)
        await card.locator('button[aria-expanded]').click()
        await expect(card.locator('.task-detail-card')).toBeVisible()
        await expect(card.locator('.task-detail-card')).toContainText(phrase)
        assert.ok(!/\bpractise\b/i.test(await page.locator('body').innerText()))
        checkedPanels++
      }
    }
    assert.deepEqual(await page.evaluate(() => Object.fromEntries(Object.entries(localStorage))), before)
    assert.deepEqual(errors, [])
    report.browsers.push({ name, days: 28, checkedPanels, storageUnchanged: true, consoleErrors: errors.length })
    await context.close()
  }
} finally {
  await browser.close()
}
report.result = 'PASS'
writeFileSync(new URL('./hosted-results.json', import.meta.url), `${JSON.stringify(report, null, 2)}\n`)
console.log(JSON.stringify(report, null, 2))
