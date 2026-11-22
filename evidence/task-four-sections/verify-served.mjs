import { chromium, expect } from '@playwright/test'
import assert from 'node:assert/strict'
import { readFileSync, writeFileSync } from 'node:fs'
import { createHash } from 'node:crypto'
import { fileURLToPath } from 'node:url'
const base = process.env.CHECK_URL || 'http://127.0.0.1:4188/'
const label = process.env.CHECK_LABEL || 'local'
const root = new URL('../../', import.meta.url)
const out = new URL('./', import.meta.url)
const hash = bytes => createHash('sha256').update(bytes).digest('hex')
const response = await fetch(base)
assert.equal(response.status, 200)
const html = await response.text()
const assets = []
for (const match of html.matchAll(/(?:src|href)="([^"]+\.(?:js|css))"/g)) {
  const url = new URL(match[1], base), res = await fetch(url)
  assert.equal(res.status, 200)
  const bytes = Buffer.from(await res.arrayBuffer()), name = url.pathname.split('/').pop()
  assert.equal(hash(bytes), hash(readFileSync(new URL(`dist/assets/${name}`, root))), `build mismatch: ${name}`)
  assets.push({ name, sha256: hash(bytes) })
}
assert.equal(assets.length, 2)
const browser = await chromium.launch()
const layouts = [], errors = []
try {
  for (const [width, height] of [[320,844],[390,844],[390,960],[768,1024],[1280,900]]) {
    const context = await browser.newContext({ viewport: { width, height }, reducedMotion: 'reduce' })
    const page = await context.newPage()
    page.on('pageerror', e => errors.push(e.message))
    page.on('response', r => { if (r.status() >= 400) errors.push(`${r.status()} ${r.url()}`) })
    await page.goto(new URL('#path', base).href)
    const map = page.locator('summary').filter({ hasText: 'Path map + insights' })
    if (await map.locator('..').getAttribute('open') === null) await map.click()
    for (const [day, index] of [[1,0],[2,0],[8,6],[9,8],[16,8],[22,5],[28,15]]) {
      await page.locator('.day-progress-grid button').nth(day - 1).click()
      const tab = page.getByRole('button', { name: 'Today’s Tasks', exact: true })
      await expect(tab).toHaveCount(1)
      await expect(tab).toHaveAttribute('aria-expanded', 'false')
      await tab.click()
      const rows = page.locator('.roadmap-task-card')
      await expect(rows).toHaveCount(16)
      const row = rows.nth(index), trigger = row.locator('button[aria-expanded]').first()
      await trigger.click()
      const detail = row.locator('.task-detail-card')
      await expect(detail.locator('h4')).toHaveText(['What','When','How','Benefits'])
      await expect(detail.getByRole('button', { name: 'Mark as Done', exact: true })).toBeVisible()
      if ([8,9].includes(day)) { await expect(detail.locator('textarea')).toHaveCount(1); assert((await detail.textContent()).includes('?')) }
      if (day === 16) await expect(detail.getByRole('note')).toContainText('Source instructions are missing')
      await page.locator('img.rise-icon').evaluateAll(images => Promise.all(images.map(image => image.decode())))
      assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), 'viewport overflow')
      const geometry = await trigger.boundingBox()
      assert(geometry.width >= 44 && geometry.height >= 44)
      const overflows = await detail.evaluate(el => [...el.querySelectorAll('p,li,textarea,button')].filter(child => child.scrollWidth > child.clientWidth + 2).map(child => child.tagName))
      assert.deepEqual(overflows, [], `task content overflow Day ${day}`)
      if (width === 390 && height === 844) await page.screenshot({ path: fileURLToPath(new URL(`${label}-day${day}-task${index+1}.png`, out)) })
      layouts.push({ width, height, day, row: index+1, sections:4, rows:16, overflow:false })
    }
    await context.close()
  }
} finally { await browser.close() }
assert.deepEqual(errors, [])
const report = { result:'PASS', base, checkedAt:new Date().toISOString(), assets, layouts, errors, sourceGaps:['Day 16 Intellectual','Day 16 Social','Day 16 Environmental'], limits:['Synthetic browser contexts only; no owner data accessed.','Not physical-phone, manual screen-reader or clinical validation.'] }
writeFileSync(new URL(`${label}-verification.json`, out), JSON.stringify(report,null,2)+'\n')
console.log(JSON.stringify({ result:'PASS', base, layouts:layouts.length, assets, errors }))
