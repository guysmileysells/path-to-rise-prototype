import { chromium } from '@playwright/test'
import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import fs from 'node:fs'
import path from 'node:path'
import { dayRoadmaps, getChronologicalWinTasks } from '../../src/dayRoadmap.ts'

const base = process.env.BASE_URL || 'http://127.0.0.1:4183/'
const label = process.env.VERIFY_LABEL || 'local'
const output = path.dirname(new URL(import.meta.url).pathname).replace(/^\/(\w:)/, '$1')
const digest = value => createHash('sha256').update(value).digest('hex')
const report = { base, result: 'RUNNING', assets: [], days: [], extraWidths: [], pageErrors: [] }
const save = () => fs.writeFileSync(path.join(output, `${label}-verification.json`), JSON.stringify(report, null, 2) + '\n')
const browser = await chromium.launch()
try {
  const html = await fetch(base, { cache: 'no-store' })
  assert.equal(html.status, 200)
  const body = await html.text()
  assert.ok(body.includes('<title>PATH to RISE Prototype</title>'))
  for (const match of body.matchAll(/(?:src|href)="([^"]+\.(?:js|css))"/g)) {
    const url = new URL(match[1], base)
    const response = await fetch(url, { cache: 'no-store' })
    assert.equal(response.status, 200)
    const bytes = Buffer.from(await response.arrayBuffer())
    const local = fs.readFileSync(path.join('dist/assets', path.basename(url.pathname)))
    assert.equal(digest(bytes), digest(local), `Exact served asset mismatch: ${url}`)
    report.assets.push({ file: path.basename(url.pathname), sha256: digest(bytes), match: true })
  }
  assert.ok(report.assets.some(a => a.file.endsWith('.js')) && report.assets.some(a => a.file.endsWith('.css')))
  const page = await browser.newPage({ viewport: { width: 390, height: 844 }, reducedMotion: 'reduce' })
  page.on('pageerror', e => report.pageErrors.push(e.message))
  async function openDay(day) {
    await page.goto(new URL('#path', base).href)
    const map = page.locator('summary').filter({ hasText: 'Path map + insights' })
    if (await map.locator('..').getAttribute('open') === null) await map.click()
    await page.locator('.day-progress-grid button').nth(day - 1).click()
    const tasksButton = page.getByRole('button', { name: 'Today’s Tasks', exact: true })
    if (await tasksButton.getAttribute('aria-expanded') === 'false') await tasksButton.click()
    await page.locator('.roadmap-task-card').nth(15).waitFor({ state: 'visible' })
  }
  async function verifyRow(row) {
    const trigger = row.locator('button[aria-expanded]')
    if (await trigger.getAttribute('aria-expanded') === 'false') await trigger.click()
    await row.locator('.task-detail-card').waitFor({ state: 'visible' })
    const copy = await row.locator('.task-detail-card').innerText()
    const taskId = await row.getAttribute('data-task-id')
    if (taskId === 'day-3-daily-02-emotional') assert.ok(copy.includes('fix… just write.'), 'Day 3 Emotional actual paragraph spacing')
    if (taskId === 'day-3-daily-03-spiritual') {
      assert.ok(copy.includes('Inhale 4 seconds… Hold 2 seconds… Exhale 6 seconds'), 'Day 3 Spiritual actual breathing instruction spacing')
    }
    assert.ok(!/[A-Za-z]…\.?[A-Za-z]/.test(copy), `Words joined across an ellipsis: ${copy.slice(0, 120)}`)
    const joined = await page.locator('summary, span:has(> small), .summary-metrics > span, .notice-card, .source-banner, .task-row-label, button').evaluateAll(elements => elements.flatMap(el => {
      if (!el.getClientRects().length) return []
      const parts = [...el.childNodes].filter(n => n.textContent.length)
      return parts.slice(1).flatMap((n, i) => /[\p{L}\p{N}]$/u.test(parts[i].textContent) && /^[\p{L}\p{N}]/u.test(n.textContent) ? [el.textContent.slice(0, 150)] : [])
    }))
    assert.deepEqual(joined, [], 'Labels and values must contain actual word spaces')
    const shape = await row.evaluate(el => {
      const b = el.querySelector('button[aria-expanded]').getBoundingClientRect()
      const panel = el.querySelector('.inline-expansion-panel')
      const p = panel.getBoundingClientRect()
      const rows = [...document.querySelectorAll('.roadmap-task-card, .end-of-day-card')]
      const next = rows[rows.indexOf(el) + 1]?.getBoundingClientRect()
      const screen = document.querySelector('.screen')
      return { below: p.top >= b.bottom - 1 && p.top - b.bottom <= 24, aligned: Math.abs(p.left - b.left) <= 1 && Math.abs(p.width - b.width) <= 1, inFlow: getComputedStyle(panel).position === 'static', clear: !next || next.top >= p.bottom + 11, noOverflow: screen.scrollWidth <= screen.clientWidth + 1 }
    })
    assert.ok(Object.values(shape).every(Boolean), JSON.stringify(shape))
    assert.equal(await page.locator('dialog[open], [aria-modal="true"]').count(), 0)
    assert.equal(await page.locator('.task-detail-card').count(), 1)
  }
  await openDay(1)
  const storage = await page.evaluate(() => JSON.stringify(Object.fromEntries(Object.entries(localStorage))))
  for (const day of dayRoadmaps) {
    await openDay(day.day)
    const expected = getChronologicalWinTasks(day)
    const rows = page.locator('.roadmap-task-card')
    assert.deepEqual(await rows.evaluateAll(elements => elements.map(el => el.getAttribute('data-task-id'))), expected.map(t => t.id))
    for (let i = 0; i < expected.length; i++) await verifyRow(rows.nth(i))
    await verifyRow(page.locator('.end-of-day-card'))
    report.days.push({ day: day.day, taskOrder: expected.map(t => t.id), downwardNonoverlapRows: expected.length, optionalReflectionChecked: true })
    if ([1, 8, 28].includes(day.day)) await page.screenshot({ path: path.join(output, `${label}-day${day.day}-expanded.png`) })
    save()
  }
  for (const width of [320, 768, 1280]) {
    await page.setViewportSize({ width, height: 900 })
    await openDay(8)
    await verifyRow(page.locator('[data-task-id="day-8-daily-02-emotional"]'))
    report.extraWidths.push({ width, day: 8, longWritingTask: 'PASS' })
  }
  assert.equal(await page.evaluate(() => JSON.stringify(Object.fromEntries(Object.entries(localStorage)))) , storage, 'Reading/reordering must not mutate stored writing or completion')
  assert.deepEqual(report.pageErrors, [])
  report.result = 'PASS'
  report.requiredRows = report.days.reduce((sum, day) => sum + day.downwardNonoverlapRows, 0)
  report.storageUnchanged = true
  report.wordSpacing = 'PASS'
  report.taskPanelsRead = report.days.reduce((sum, day) => sum + day.downwardNonoverlapRows + Number(day.optionalReflectionChecked), 0)
  save()
  console.log(JSON.stringify({ result: report.result, base, days: report.days.length, requiredRows: report.requiredRows, extraWidths: report.extraWidths.length, assetsMatch: report.assets.length, pageErrors: report.pageErrors.length }))
} catch (error) {
  report.result = 'FAIL'
  report.error = String(error)
  save()
  throw error
} finally {
  await browser.close()
}
