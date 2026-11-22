import { test, expect } from '@playwright/test'
import { dayRoadmaps } from '../../src/dayRoadmap'

// Exhaustive content checks need no animation; other suites exercise smooth/reduced motion.
test.use({ reducedMotion: 'reduce' })

async function openDay(page: import('@playwright/test').Page, day: number) {
  await page.goto('/#path')
  const map = page.locator('summary').filter({ hasText: 'Path map + insights' })
  if (await map.locator('..').getAttribute('open') === null) await map.click()
  await page.locator('.day-progress-grid button').nth(day - 1).click()
  await page.getByRole('button', { name: 'Today’s Tasks', exact: true }).click()
}

test('all 28 days have four clean sections in every task, preserved prompts and exact affirmation cards', async ({ page }) => {
  test.setTimeout(300_000)
  const errors: string[] = []
  page.on('pageerror', e => errors.push(e.message))
  for (const roadmap of dayRoadmaps) {
    await openDay(page, roadmap.day)
    const tasks = [...roadmap.morningActions, ...roadmap.tasks, ...roadmap.eveningActions]
    const rows = page.locator('.roadmap-task-card')
    await expect(rows).toHaveCount(16)
    for (let i = 0; i < tasks.length; i++) {
      const row = rows.nth(i)
      await row.locator('button[aria-expanded]').first().click()
      const detail = row.locator('.task-detail-card')
      await expect(detail.locator('h4')).toHaveText(['What', 'When', 'How', 'Benefits'])
      await expect(detail.getByRole('button', { name: 'Mark as Done', exact: true })).toBeVisible()
      for (const prompt of tasks[i].prompts ?? []) await expect(detail).toContainText(prompt.replace(/_+/g, '').replace(/\s+/g, ' ').trim())
      const texts = await detail.locator('p, li').allTextContents()
      expect(texts.filter(t => /_{3,}|\t|\S {2,}\S|\b(?:WHEN|WHAT|HOW|WHY):/.test(t))).toEqual([])
      if (/Affirmations/.test(tasks[i].title)) {
        await expect(detail.locator('.affirmation-card')).toHaveCount(3)
        await expect(detail.locator('.affirmation-count')).toHaveText(['3×', '6×', '9×'])
        if (tasks[i].kind === 'MORNING') await expect(detail.getByText('The goal is repetition and reflection, not forcing yourself to believe or feel something immediately.', { exact: true })).toBeVisible()
      }
    }
    await expect(page.locator('.task-detail-card')).toHaveCount(1)
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
  }
  expect(errors).toEqual([])
})

test('recovered Day 8 and 9 questions have private writing, save/reload and completion/undo independently', async ({ page }) => {
  const key = 'path-to-rise-program-progress-v1'
  for (const day of [8, 9]) {
    await openDay(page, day)
    const row = page.locator('.roadmap-task-card').nth(6)
    await row.locator('button[aria-expanded]').first().click()
    const field = row.locator('textarea')
    await expect(field).toHaveCount(1)
    const value = `PRIVATE FOUR SECTION QA DAY ${day}`
    await field.fill(value)
    await row.getByRole('button', { name: 'Save locally', exact: true }).click()
    await row.getByRole('button', { name: 'Mark as Done', exact: true }).click()
    await expect(row.getByRole('button', { name: 'Undo Mark as Done', exact: true })).toBeVisible()
    await page.reload()
    await openDay(page, day)
    await page.locator('.roadmap-task-card').nth(6).locator('button[aria-expanded]').first().click()
    await expect(page.locator('.roadmap-task-card').nth(6).locator('textarea')).toHaveValue(value)
    await page.locator('.roadmap-task-card').nth(6).getByRole('button', { name: 'Undo Mark as Done', exact: true }).click()
    const state = await page.evaluate(key => JSON.parse(localStorage.getItem(key)!), key)
    expect(state.dayTaskProgress[String(day)]).not.toContain(`day-${day}-daily-02-emotional`)
    expect(Object.values(state.savedReflections)).toContain(value)
  }
})
