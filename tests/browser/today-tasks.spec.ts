import { test, expect } from '@playwright/test'

const key = 'path-to-rise-program-progress-v1'
const alarmCopy = 'Tonight, set your alarm 15 minutes earlier than you usually wake up. Those extra minutes give you room to start the day at your own pace. If you can, move bedtime 15 minutes earlier too so you keep that sleep time.'
const getUpCopy = 'When your alarm goes off at the time you set on Day 1, count down 5–4–3–2–1 and get out of bed on 1. Mark it done once you’re up. That’s your first win of the day.'

async function openTasks(page: import('@playwright/test').Page, day = 1) {
  await page.goto('/#path')
  if (day !== 1) {
    const map = page.locator('summary').filter({ hasText: 'Path map + insights' })
    if (await map.locator('..').getAttribute('open') === null) await map.click()
    await page.locator('.day-progress-grid button').nth(day - 1).click()
  } else await page.getByRole('button', { name: 'Open Day 1', exact: true }).first().click()
  const tab = page.getByRole('button', { name: 'Today’s Tasks', exact: true })
  await expect(tab).toHaveCount(1)
  await expect(tab).toHaveAttribute('aria-expanded', 'false')
  await expect(page.locator('.roadmap-task-card')).toHaveCount(0)
  await tab.click()
  await expect(tab).toHaveAttribute('aria-expanded', 'true')
  return tab
}

test('Today’s Tasks opens downward with the new Day 1 first row and persists independent completion', async ({ page }) => {
  const errors: string[] = []
  page.on('pageerror', error => errors.push(error.message))
  await page.addInitScript(key => {
    if (!localStorage.getItem(key)) localStorage.setItem(key, JSON.stringify({ currentDay: 1, status: 'in_progress', completedDays: [], dayTaskProgress: { '2': ['day-2-morning-02-five-four-three-two-one-get-up'] }, daySectionProgress: {}, savedReflections: { 'old-note': 'PRIVATE WAKE SENTINEL' }, lastReturn: 'today' }))
  }, key)
  const tab = await openTasks(page)
  const cards = page.locator('.roadmap-task-card')
  await expect(cards).toHaveCount(16)
  const first = cards.first()
  await expect(first).toContainText('Set Your Alarm')
  await expect(page.locator('.today-tasks')).not.toContainText('First Win —')
  const row = first.locator('button[aria-expanded]')
  await expect(row).toHaveAttribute('aria-expanded', 'false')
  await row.press('Enter')
  await expect(first.locator('.task-detail-card')).toContainText(alarmCopy)
  expect(await first.evaluate(el => el.getBoundingClientRect().top)).toBeGreaterThanOrEqual(await tab.evaluate(el => el.getBoundingClientRect().bottom))
  await first.getByRole('button', { name: 'Mark as Done', exact: true }).click()
  await expect(first.getByRole('button', { name: 'Undo Mark as Done', exact: true })).toBeVisible()
  const saved = await page.evaluate(key => JSON.parse(localStorage.getItem(key)!), key)
  expect(saved.dayTaskProgress['1']).toEqual(['day-1-morning-01-set-your-alarm'])
  expect(saved.dayTaskProgress['2']).toEqual(['day-2-morning-02-five-four-three-two-one-get-up'])
  expect(saved.savedReflections['old-note']).toBe('PRIVATE WAKE SENTINEL')
  await tab.click()
  await expect(tab).toBeFocused()
  await expect(cards).toHaveCount(0)
  await page.reload()
  await page.getByRole('button', { name: 'Open Day 1', exact: true }).first().click()
  await page.getByRole('button', { name: 'Today’s Tasks', exact: true }).click()
  await cards.first().locator('button[aria-expanded]').click()
  await cards.first().getByRole('button', { name: 'Undo Mark as Done', exact: true }).click()
  const undone = await page.evaluate(key => JSON.parse(localStorage.getItem(key)!), key)
  expect(undone.dayTaskProgress['1']).toEqual([])
  expect(undone.dayTaskProgress['2']).toEqual(saved.dayTaskProgress['2'])
  expect(undone.savedReflections).toEqual(saved.savedReflections)
  expect(errors).toEqual([])
})

test('Days 2 and 28 start with the exact First Win copy and never show the old alarm row', async ({ page }) => {
  for (const day of [2, 28]) {
    await openTasks(page, day)
    const rows = page.locator('.roadmap-task-card')
    await expect(rows).toHaveCount(16)
    await expect(rows.first()).toContainText('First Win — 5–4–3–2–1, Get Up')
    await expect(page.locator('.today-tasks')).not.toContainText('Set Your Alarm')
    await rows.first().locator('button[aria-expanded]').click()
    await expect(rows.first().locator('.task-detail-card')).toContainText(getUpCopy)
    await expect(page.locator('.task-detail-card')).toHaveCount(1)
    await expect(page.getByRole('button', { name: /Day 29/ })).toHaveCount(0)
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
  }
})
