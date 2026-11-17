import { test, expect } from '@playwright/test'
import { defaultNotificationPreferences, notificationStorageKey } from '../../src/notificationContent'

for (const origin of ['Support', 'open Reminders'] as const) {
  test(`Your space opens visible overview with saved active reminders from ${origin}`, async ({ page }) => {
    await page.addInitScript(({ key, prefs }) => localStorage.setItem(key, JSON.stringify(prefs)), {
      key: notificationStorageKey,
      prefs: { ...defaultNotificationPreferences, programReminder: { ...defaultNotificationPreferences.programReminder, enabled: true } },
    })
    await page.goto(origin === 'Support' ? '/#support' : '/#today')
    if (origin === 'open Reminders') {
      await page.locator('.today-data-settings > summary').click()
      await expect(page.getByRole('heading', { name: 'Reminders', exact: true })).toBeVisible()
    }
    const header = page.getByRole('button', { name: 'Your space', exact: true })
    await header.focus()
    await header.press('Enter')
    const overview = page.getByRole('heading', { name: 'Your space', exact: true })
    const back = page.locator('.today-data-settings > summary')
    await expect(overview).toBeVisible()
    await expect(back).toBeVisible()
    await expect(back).toBeFocused()
    await expect(back).toBeInViewport({ ratio: 1 })
    await expect(page.locator('.notification-settings')).not.toHaveAttribute('open')
    const prefs = await page.evaluate(key => JSON.parse(localStorage.getItem(key)!), notificationStorageKey)
    expect(prefs.programReminder.enabled).toBe(true)
    expect(prefs.programReminder.schedule.time).toBe(defaultNotificationPreferences.programReminder.schedule.time)
    await page.getByRole('button', { name: 'Open Today', exact: true }).click()
    await expect(page.getByRole('button', { name: 'Reset me now', exact: true })).toBeVisible()
  })
}
