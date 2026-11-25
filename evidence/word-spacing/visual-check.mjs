import { chromium } from '@playwright/test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
const base = process.env.BASE_URL || 'http://127.0.0.1:4183/'
const label = process.env.VERIFY_LABEL || 'local'
const browser = await chromium.launch()
try {
  const page = await browser.newPage({ viewport: { width: 390, height: 844 }, reducedMotion: 'reduce' })
  const errors = []
  page.on('pageerror', e => errors.push(e.message))
  await page.goto(new URL('#path', base).href)
  await page.locator('.summary-metrics').first().waitFor({ state: 'visible' })
  const metrics = await page.locator('.summary-metrics>span').allTextContents()
  assert.equal(metrics[0], 'Week 1 · Stabilize')
  assert.equal(metrics[2], 'Small Wins 0/16 today')
  await page.locator('.screen').evaluate(el => el.scrollTo(0, 0))
  await page.screenshot({ path: `evidence/word-spacing/${label}-mobile-path-top.png` })
  const map = page.locator('summary').filter({ hasText: 'Path map + insights' })
  await map.click()
  await page.locator('.day-progress-grid button').nth(2).click()
  const tasks = page.getByRole('button', { name: 'Today’s Tasks', exact: true })
  if (await tasks.getAttribute('aria-expanded') === 'false') await tasks.click()
  const row = page.locator('[data-task-id="day-3-daily-03-spiritual"]')
  await row.locator('button[aria-expanded]').click()
  const text = await row.locator('.task-detail-card').innerText()
  assert.ok(text.includes('Inhale 4 seconds… Hold 2 seconds… Exhale 6 seconds'))
  await row.getByRole('heading', { name: 'How', exact: true }).scrollIntoViewIfNeeded()
  await page.screenshot({ path: `evidence/word-spacing/${label}-mobile-day3-how.png` })
  assert.deepEqual(errors, [])
  fs.writeFileSync(`evidence/word-spacing/${label}-visual-check.json`, JSON.stringify({ result: 'PASS', base, metrics, correctedBreathingInstruction: true, pageErrors: errors }, null, 2))
  console.log(JSON.stringify({ result: 'PASS', base, metrics, correctedBreathingInstruction: true, pageErrors: errors }))
} finally { await browser.close() }
