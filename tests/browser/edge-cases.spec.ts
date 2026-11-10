import { expect, test } from '@playwright/test'
import { getAllRoadmapTasks, getRoadmapForDay } from '../../src/dayRoadmap'
import { notificationStorageKey, defaultNotificationPreferences } from '../../src/notificationContent'
const key = 'path-to-rise-program-progress-v1'

test('active reminders remain manually collapsible; editing schedules does not move or reopen them', async ({ page }) => {
  await page.addInitScript(({ key, prefs }) => localStorage.setItem(key, JSON.stringify(prefs)), {
    key: notificationStorageKey,
    prefs: { ...defaultNotificationPreferences, programReminder: { ...defaultNotificationPreferences.programReminder, enabled: true } },
  })
  await page.goto('/')
  await page.locator('.today-data-settings > summary').click()
  const reminders = page.locator('.notification-settings')
  await expect(reminders).toHaveAttribute('open')
  const summary = reminders.locator('summary')
  await summary.click()
  await expect(reminders).not.toHaveAttribute('open')
  await summary.click()
  await reminders.locator('input[type=time]').first().fill('08:30')
  await summary.click()
  await page.locator('.today-data-settings > summary').click()
  await page.locator('.today-data-settings > summary').click()
  await expect(reminders).not.toHaveAttribute('open')
})

test('saved reflections remain individually collapsed within My Path and do not leak on Today', async ({ page }) => {
  await page.addInitScript(({ key }) => localStorage.setItem(key, JSON.stringify({ currentDay: 1, status: 'in_progress', completedDays: [], dayTaskProgress: {}, daySectionProgress: {}, lastReturn: 'today', savedReflections: { 'day-1:day-section-01-today-s-focus': 'QA PRIVATE SENTINEL' } })), { key })
  await page.goto('/#path')
  await page.locator('summary').filter({ hasText: 'Practices + private reflections' }).click()
  const reflection = page.locator('.reflection-review').first()
  await expect(reflection).not.toHaveAttribute('open')
  await expect(page.getByText('QA PRIVATE SENTINEL', { exact: true })).not.toBeVisible()
  await reflection.locator('summary').click()
  await expect(page.getByText('QA PRIVATE SENTINEL', { exact: true })).toBeVisible()
  await reflection.locator('summary').click()
  await page.getByRole('button', { name: 'Open Today', exact: true }).click()
  await expect(page.getByText('QA PRIVATE SENTINEL', { exact: true })).toHaveCount(0)
})

for (const collapseVia of ['return button', 'same trigger'] as const) {
  test(`final win shortcut collapse via ${collapseVia} restores focus to permanent task trigger`, async ({ page }) => {
    const tasks = getAllRoadmapTasks(getRoadmapForDay(28)!).filter(task => task.winSection)
    const finalTask = tasks[tasks.length - 1]
    await page.addInitScript(({ key, ids }) => localStorage.setItem(key, JSON.stringify({ currentDay: 28, status: 'in_progress', completedDays: Array.from({ length: 27 }, (_, i) => i + 1), dayTaskProgress: { '28': ids }, daySectionProgress: {}, savedReflections: {}, lastReturn: 'today' })), { key, ids: tasks.slice(0, -1).map(t => t.id) })
    await page.goto('/#path')
    await page.getByRole('button', { name: 'Open Day 28', exact: true }).first().click()
    const shortcut = page.getByRole('button', { name: 'Open next action', exact: true })
    await shortcut.focus()
    await shortcut.press('Enter')
    await page.getByRole('button', { name: 'Mark as Done', exact: true }).press('Enter')
    await expect(page.getByRole('button', { name: 'Undo Mark as Done', exact: true })).toBeVisible()
    const collapse = collapseVia === 'return button'
      ? page.getByRole('button', { name: 'Return to daily roadmap', exact: true })
      : shortcut
    await collapse.focus()
    await collapse.press('Enter')
    await expect(page.locator('.task-detail-card')).toHaveCount(0)
    await expect(shortcut).toHaveCount(0)
    const permanentTrigger = page.locator(`.roadmap-task-card[aria-labelledby="${finalTask.id}-title"]`).getByRole('button', { name: 'Review tab', exact: true })
    await expect(permanentTrigger).toBeFocused()
    await expect(permanentTrigger).toBeInViewport({ ratio: 1 })
    await expect(permanentTrigger).toHaveAttribute('aria-expanded', 'false')
    // Focus is useful: Enter must reopen the completed task at its permanent card.
    await page.keyboard.press('Enter')
    await expect(permanentTrigger).toHaveAttribute('aria-expanded', 'true')
    await expect(page.getByRole('button', { name: 'Undo Mark as Done', exact: true })).toBeVisible()
  })
}

test('final win in shortcut remains reviewable and undoable, including Day 28', async ({ page }) => {
  const tasks = getAllRoadmapTasks(getRoadmapForDay(28)!).filter(task => task.winSection)
  await page.addInitScript(({ key, ids }) => localStorage.setItem(key, JSON.stringify({ currentDay: 28, status: 'in_progress', completedDays: Array.from({ length: 27 }, (_, i) => i + 1), dayTaskProgress: { '28': ids }, daySectionProgress: {}, savedReflections: {}, lastReturn: 'today' })), { key, ids: tasks.slice(0, -1).map(t => t.id) })
  await page.goto('/#path')
  await page.getByRole('button', { name: 'Open Day 28', exact: true }).first().click()
  await page.getByRole('button', { name: 'Open next action', exact: true }).click()
  await page.getByRole('button', { name: 'Mark as Done', exact: true }).click()
  await expect(page.locator('.task-detail-card')).toHaveCount(1)
  await expect(page.getByRole('button', { name: 'Undo Mark as Done', exact: true })).toBeVisible()
  const complete = await page.evaluate(key => JSON.parse(localStorage.getItem(key)!), key)
  expect(complete.status).toBe('program_complete')
  expect(complete.currentDay).toBe(28)
  await page.getByRole('button', { name: 'Undo Mark as Done', exact: true }).click()
  const undone = await page.evaluate(key => JSON.parse(localStorage.getItem(key)!), key)
  expect(undone.completedDays).not.toContain(28)
  expect(undone.dayTaskProgress['28']).toHaveLength(16)
})
