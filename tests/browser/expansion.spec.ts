import { expect, test, type Locator, type Page } from '@playwright/test'

async function openDay(page: Page) {
  await page.goto('/#path')
  await page.getByRole('button', { name: 'Open Day 1', exact: true }).first().click()
}

async function anchored(trigger: Locator, panel: Locator) {
  await expect(panel).toBeVisible()
  // Measure both rectangles in one frame; separate browser calls race smooth scrolling.
  const content = await panel.elementHandle()
  await expect.poll(async () => trigger.evaluate((element, content) => {
    const rect = element.getBoundingClientRect()
    const panelRect = content!.getBoundingClientRect()
    const screen = document.querySelector('.screen')!.getBoundingClientRect()
    const bottom = Math.min(innerHeight, screen.bottom)
    return rect.top >= Math.max(0, screen.top) - 1 && rect.bottom < bottom &&
      panelRect.top >= rect.bottom - 1 && panelRect.top - rect.bottom <= 24 && panelRect.top + 40 < bottom
  }, content)).toBe(true)
}

async function uniqueIds(page: Page) {
  expect(await page.locator('[id]').evaluateAll((elements) => {
    const ids = elements.map((element) => element.id)
    return ids.filter((id, i) => ids.indexOf(id) !== i)
  })).toEqual([])
}

test('Feeling Stuck response is directly below selected choice and collapses', async ({ page }) => {
  await openDay(page)
  const panel = page.locator('.feeling-stuck-card')
  const buttons = panel.locator('.stuck-options > div > button')
  await expect(buttons).toHaveCount(6)
  for (let i = 0; i < await buttons.count(); i++) {
    const button = buttons.nth(i)
    await button.click()
    await anchored(button, panel.locator('.stuck-response'))
    await button.click()
    await expect(panel.locator('.stuck-response')).toHaveCount(0)
  }
})

test('native and nested disclosures position the trigger and content beginning', async ({ page }) => {
  await page.goto('/')
  const outer = page.locator('.today-data-settings')
  const trigger = outer.locator(':scope > summary')
  await trigger.evaluate((element) => element.scrollIntoView({ block: 'end' }))
  await trigger.click()
  await anchored(trigger, outer.locator(':scope > .disclosure-stack'))
  const nested = outer.locator('.notification-settings')
  const nestedTrigger = nested.locator('summary')
  await nestedTrigger.evaluate((element) => element.scrollIntoView({ block: 'end' }))
  await nestedTrigger.press('Enter')
  await anchored(nestedTrigger, nested.locator('.notification-stack'))
  await expect(outer).toHaveAttribute('open', '')
  await nestedTrigger.press('Space')
  await expect(nested).not.toHaveAttribute('open')
  await expect(nestedTrigger).toBeFocused()
  await trigger.click()
  await expect(outer).not.toHaveAttribute('open')
})

test('task opens beneath its own trigger, switches and collapses without replacing roadmap', async ({ page }) => {
  await openDay(page)
  const first = page.locator('.roadmap-task-card').first()
  const firstTrigger = first.getByRole('button', { name: 'Open tab', exact: true })
  await firstTrigger.click()
  await expect(page.locator('#day-roadmap-title')).toBeVisible()
  await expect(first.locator('.task-detail-card')).toBeVisible()
  await expect(firstTrigger).toHaveAttribute('aria-expanded', 'true')
  await anchored(firstTrigger, first.locator('.inline-expansion-panel'))
  const second = page.locator('.roadmap-task-card').nth(1)
  const secondTrigger = second.getByRole('button', { name: 'Open tab', exact: true })
  await secondTrigger.click()
  await expect(first.locator('.task-detail-card')).toHaveCount(0)
  await anchored(secondTrigger, second.locator('.inline-expansion-panel'))
  await uniqueIds(page)
  await secondTrigger.click()
  await expect(secondTrigger).toHaveAttribute('aria-expanded', 'false')
  await expect(page.locator('.task-detail-card')).toHaveCount(0)
})
