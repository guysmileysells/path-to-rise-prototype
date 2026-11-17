import { expect, test, type Page } from '@playwright/test'
import { dayRoadmaps, getAllWinTasks } from '../../src/dayRoadmap'

const key = 'path-to-rise-program-progress-v1'
const privateText = 'Private synthetic acceptance entry; never a homepage recommendation.'
function state(day: number, count: number, completedDays = Array.from({ length: day - 1 }, (_, i) => i + 1)) {
  return { currentDay: day, status: 'in_progress', completedDays, daySectionProgress: {}, dayTaskProgress: { [day]: getAllWinTasks(dayRoadmaps[day - 1]).slice(0, count).map((t) => t.id) }, savedReflections: { 'day-1:source-note': privateText }, lastReturn: 'today' }
}
async function seed(page: Page, value: ReturnType<typeof state>) {
  await page.addInitScript(({ key, value }) => { if (!localStorage.getItem(key)) localStorage.setItem(key, JSON.stringify(value)) }, { key, value })
  await page.goto('/')
}
const saved = (page: Page) => page.evaluate((key) => JSON.parse(localStorage.getItem(key)!), key)

test('last morning action moves the single next CTA to Daily without exposing saved writing', async ({ page }) => {
  const initial = state(1, 5)
  await seed(page, initial)
  await expect(page.locator('.rhythm-card.next')).toHaveAttribute('data-phase', 'morning')
  await expect(page.locator('.rhythm-total')).toHaveText('5 of 17 actions complete')
  await expect(page.locator('body')).not.toContainText(privateText)
  await page.getByRole('button', { name: 'Open next step', exact: true }).click()
  await page.locator('.task-detail-card').getByRole('button', { name: 'Mark as Done', exact: true }).click()
  await expect(page.locator('.rhythm-card.next')).toHaveAttribute('data-phase', 'daily')
  await expect(page.locator('.rhythm-total')).toHaveText('6 of 17 actions complete')
  await expect(page.locator('[data-phase="morning"] .rhythm-status')).toHaveText('✓ Complete')
  await page.getByRole('button', { name: 'Open next step', exact: true }).click()
  await expect(page.locator('.task-detail-card h3')).toHaveText(dayRoadmaps[0].tasks[0].title)
  expect((await saved(page)).savedReflections).toEqual(initial.savedReflections)
})

for (const [count, phase] of [[5, 'daily'], [11, 'evening']] as const) {
  test(`TaskDetail continuation into ${phase} restores keyboard focus to the new phase`, async ({ page }) => {
    await seed(page, state(1, count))
    await page.getByRole('button', { name: 'Open next step', exact: true }).press('Enter')
    await page.locator('.task-detail-card').getByRole('button', { name: 'Mark as Done', exact: true }).press('Enter')
    await page.locator('.task-detail-card').getByRole('button', { name: /^Open next:/ }).press('Enter')
    const card = page.locator(`[data-phase="${phase}"]`)
    await expect(card.locator('.task-detail-card')).toBeVisible()
    await expect(card.locator('.inline-expansion > button')).toBeFocused()
    await expect(card.locator('.task-detail-card h3')).toHaveText(getAllWinTasks(dayRoadmaps[0])[count + 1].title)
  })
}

test('Home writing saves and reloads through existing controls without adding a completion', async ({ page }) => {
  await seed(page, state(1, 16))
  await page.getByRole('button', { name: 'Open next step', exact: true }).click()
  const writing = page.locator('.task-detail-card textarea')
  await expect(writing).toHaveCount(1)
  await writing.fill('A second private synthetic entry.')
  await page.getByRole('button', { name: 'Save fields locally', exact: true }).click()
  await expect(page.locator('.rhythm-total')).toHaveText('16 of 17 actions complete')
  expect(Object.values((await saved(page)).savedReflections)).toContain('A second private synthetic entry.')
  expect((await saved(page)).savedReflections['day-1:source-note']).toBe(privateText)
  await page.reload()
  await expect(page.locator('textarea')).toHaveCount(0)
  await expect(page.locator('body')).not.toContainText('A second private synthetic entry.')
  await page.getByRole('button', { name: 'Open next step', exact: true }).click()
  await expect(page.locator('.task-detail-card textarea')).toHaveValue('A second private synthetic entry.')
})

test('completing the day advances Home to Day 2 while old task undo and historical review remain usable', async ({ page }) => {
  await seed(page, state(1, 16))
  await page.getByRole('button', { name: 'Open next step', exact: true }).click()
  const detail = page.locator('.task-detail-card')
  await detail.getByRole('button', { name: 'Mark as Done', exact: true }).click()
  await expect(page.locator('.rhythm-progress')).toContainText('Day 2 of 28')
  await expect(page.locator('.rhythm-total')).toHaveText('0 of 17 actions complete')
  await expect(detail).toContainText('Day 1')
  await expect(detail.getByRole('button', { name: 'Undo Mark as Done', exact: true })).toBeFocused()
  expect((await saved(page)).completedDays).toEqual([1])
  await detail.getByRole('button', { name: 'Return to daily roadmap', exact: true }).click()
  await expect(page.locator('[data-phase="evening"] button[aria-expanded]')).toBeFocused()
  await page.getByRole('button', { name: 'Open next step', exact: true }).click()
  await expect(page.locator('.task-detail-card h3')).toHaveText(dayRoadmaps[1].morningActions[0].title)
  await page.getByRole('button', { name: 'Open My Path', exact: true }).click()
  await page.locator('summary').filter({ hasText: 'Path map + insights' }).click()
  await page.locator('.day-progress-grid button').first().click()
  await expect(page.locator('#day-roadmap-title')).toContainText('Day 1:')
  expect((await saved(page)).completedDays).toEqual([1])
})

test('Day 28 final action gives meaningful program completion without a Day 29 and preserves final focus/undo', async ({ page }) => {
  await seed(page, state(28, 16))
  await page.getByRole('button', { name: 'Open next step', exact: true }).click()
  const detail = page.locator('.task-detail-card')
  await detail.getByRole('button', { name: 'Mark as Done', exact: true }).click()
  await expect(page.locator('.rhythm-progress')).toContainText('Day 28 of 28 complete')
  await expect(page.getByRole('button', { name: 'Open next step', exact: true })).toHaveCount(0)
  await expect(page.locator('.rhythm-total')).toHaveText('17 of 17 actions complete · Day 28')
  await expect(detail.getByRole('button', { name: 'Undo Mark as Done', exact: true })).toBeFocused()
  await detail.getByRole('button', { name: 'Return to daily roadmap', exact: true }).click()
  await expect(page.getByRole('button', { name: 'Review evening', exact: true })).toBeFocused()
  expect((await saved(page)).currentDay).toBe(28)
  expect((await saved(page)).completedDays).toHaveLength(28)
  await page.getByRole('button', { name: 'Review evening', exact: true }).click()
  // Review starts at the phase's first real task; undoing it reopens the actual Day 28.
  await page.locator('.task-detail-card').getByRole('button', { name: 'Undo Mark as Done', exact: true }).click()
  await expect(page.locator('.rhythm-card.next')).toHaveAttribute('data-phase', 'evening')
  expect((await saved(page)).completedDays).toHaveLength(27)
})

test('terminal program status reviews actual Day 28 content even when older per-day records are absent', async ({ page }) => {
  await seed(page, { ...state(28, 0, []), status: 'program_complete' })
  await expect(page.locator('.rhythm-progress')).toContainText('Day 28 of 28 complete')
  await page.getByRole('button', { name: 'Review morning', exact: true }).click()
  await expect(page.locator('.task-detail-card')).toContainText('Day 28 · Morning Activation')
  await expect(page.locator('.task-detail-card')).not.toContainText('Day 1 · Morning Activation')
})

test('legacy completed-program progress stays honest and settings, reminders and data controls remain accessible', async ({ page }) => {
  const initial = { ...state(28, 0, Array.from({ length: 28 }, (_, i) => i + 1)), status: 'program_complete' }
  await seed(page, initial)
  await expect(page.locator('.rhythm-total')).toHaveText('0 of 17 actions complete · Day 28')
  await expect(page.locator('.rhythm-card.next')).toHaveCount(0)
  await expect(page.getByRole('button', { name: 'Review your path', exact: true })).toBeVisible()
  await page.getByRole('button', { name: 'Settings', exact: true }).click()
  await expect(page.locator('.today-data-settings')).toHaveAttribute('open', '')
  await expect(page.locator('.today-data-settings > summary')).toBeFocused()
  await page.locator('.notification-settings > summary').click()
  await expect(page.getByRole('heading', { name: 'Permission', exact: true })).toBeVisible()
  await page.locator('.local-data-controls > summary').click()
  await expect(page.getByRole('button', { name: 'Clear progress + reflections', exact: true })).toBeVisible()
  await expect(page.getByRole('button', { name: 'Clear Toolbox preferences', exact: true })).toBeVisible()
  await expect(page.getByRole('button', { name: 'Clear all local prototype data', exact: true })).toBeVisible()
  expect((await saved(page)).savedReflections).toEqual(initial.savedReflections)
  expect((await saved(page)).completedDays).toEqual(initial.completedDays)
})
