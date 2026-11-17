import { expect, test } from '@playwright/test'

for (const width of [320, 375, 430, 1280]) {
  test(`Daily Rhythm fits ${width}px with reachable navigation, readable contrast and touch targets`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 })
    const errors: string[] = []
    page.on('pageerror', (error) => errors.push(error.message))
    page.on('response', (response) => { if (response.status() >= 400) errors.push(`${response.status()} ${response.url()}`) })
    await page.goto('/')
    const nav = page.getByRole('navigation', { name: 'Main navigation' })
    await expect(nav.getByRole('button')).toHaveCount(4)
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
    const box = await nav.boundingBox()
    expect(box!.y + box!.height).toBeLessThanOrEqual(901)
    const shell = await page.locator('.phone').boundingBox()
    if (width === 1280) expect(shell!.width).toBeGreaterThan(600)
    for (const button of await page.locator('.daily-rhythm button, .bottom-nav button').all()) {
      const size = await button.boundingBox()
      // Chromium can report 43.999992px for a 44px target during translation.
      // Compare to hundredth-pixel precision; a genuinely undersized target still fails.
      if (size) expect(Number(size.height.toFixed(2)), await button.innerText()).toBeGreaterThanOrEqual(44)
    }
    const next = page.getByRole('button', { name: 'Open next step', exact: true })
    await expect(next).toHaveCount(1)
    await next.focus()
    expect(await next.evaluate((el) => getComputedStyle(el).outlineStyle)).not.toBe('none')
    // WCAG relative luminance for the actual new accent/text pairs.
    const pairs = await page.evaluate(() => {
      const home = getComputedStyle(document.querySelector('.daily-rhythm')!)
      const primary = getComputedStyle(document.querySelector('.rhythm-card.next > .inline-expansion > button')!)
      return [[home.color, '#fffefa'], ['#666276', '#eeeaf8'], [primary.color, primary.backgroundColor]]
    })
    const luminance = (color: string) => {
      const rgb = color.startsWith('#') ? color.slice(1).match(/../g)!.map((c) => parseInt(c, 16)) : color.match(/[\d.]+/g)!.slice(0, 3).map(Number)
      return rgb.map((n) => n / 255).map((n) => n <= 0.04045 ? n / 12.92 : ((n + 0.055) / 1.055) ** 2.4).reduce((sum, n, i) => sum + n * [0.2126, 0.7152, 0.0722][i], 0)
    }
    for (const [fg, bg] of pairs) {
      const values = [luminance(fg), luminance(bg)].sort((a, b) => b - a)
      expect((values[0] + 0.05) / (values[1] + 0.05)).toBeGreaterThanOrEqual(4.5)
    }
    await next.press('Enter')
    await expect(page.locator('.task-detail-card')).toBeVisible()
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
    expect(errors).toEqual([])
  })
}

test('Today opens the real next task, updates counts, preserves completion focus and supports undo', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('heading', { name: 'Today, in three parts.' })).toBeVisible()
  const summary = page.getByRole('region', { name: 'Your daily rhythm' })
  await expect(summary).toContainText('0 of 17 actions complete')
  const morning = page.getByRole('article', { name: 'Morning', exact: true })
  const trigger = morning.getByRole('button', { name: 'Open next step', exact: true })
  await trigger.press('Enter')
  const detail = morning.locator('.task-detail-card')
  await expect(detail.getByRole('heading', { name: 'Set Your Alarm', exact: true })).toBeVisible()
  await expect(detail).toContainText('Set your alarm 15 minutes earlier.')
  await detail.getByRole('button', { name: 'Mark as Done', exact: true }).click()
  await expect(detail.getByRole('heading', { name: 'Set Your Alarm', exact: true })).toBeVisible()
  await expect(detail.getByRole('button', { name: 'Undo Mark as Done', exact: true })).toBeFocused()
  await expect(summary).toContainText('1 of 17 actions complete')
  await expect(morning.locator('.rhythm-count')).toHaveText('1 of 6 actions complete')
  await detail.getByRole('button', { name: 'Undo Mark as Done', exact: true }).click()
  await expect(summary).toContainText('0 of 17 actions complete')
  await detail.getByRole('button', { name: 'Mark as Done', exact: true }).click()
  await detail.getByRole('button', { name: /^Open next:/ }).click()
  await expect(detail.getByRole('heading', { name: 'The 5–4–3–2–1 Get-Up', exact: true })).toBeVisible()
  await detail.getByRole('button', { name: 'Return to daily roadmap', exact: true }).click()
  await expect(trigger).toBeFocused()
  await expect(page.locator('.task-detail-card')).toHaveCount(0)
  await page.reload()
  await expect(summary).toContainText('1 of 17 actions complete')
})
