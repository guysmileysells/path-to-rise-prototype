import { test, expect } from '@playwright/test'
import { dayRoadmaps, getChronologicalTaskGroups, getChronologicalWinTasks } from '../../src/dayRoadmap'

test('all 28 days show waking-to-bedtime rows and every panel pushes neighbours downward', async ({ page }) => {
  test.setTimeout(300_000)
  await page.emulateMedia({ reducedMotion: 'reduce' })
  const errors: string[] = []
  page.on('pageerror', e => errors.push(e.message))
  for (const day of dayRoadmaps) {
    await page.goto('/#path')
    const map = page.locator('summary').filter({ hasText: 'Path map + insights' })
    if (await map.locator('..').getAttribute('open') === null) await map.click()
    await page.locator('.day-progress-grid button').nth(day.day - 1).click()
    await page.getByRole('button', { name: 'Today’s Tasks', exact: true }).click()
    const rows = page.locator('.roadmap-task-card')
    const tasks = getChronologicalWinTasks(day)
    await expect(rows.locator('.task-row-label > span')).toHaveText(tasks.map(t => t.title))
    await expect(page.locator('.action-group > .status-row h3')).toHaveText(getChronologicalTaskGroups(day).map(g => g.title))
    for (let i = 0; i < tasks.length; i++) {
      const row = rows.nth(i)
      const trigger = row.locator('button[aria-expanded]')
      await trigger.click()
      await expect(trigger).toHaveAttribute('aria-expanded', 'true')
      await expect(row.locator('.task-detail-card')).toBeVisible()
      // Read real rendered rectangles, including cross-group next buttons.
      const geometry = await row.evaluate(el => {
        const button = el.querySelector('button[aria-expanded]')!
        const panel = el.querySelector('.inline-expansion-panel')!
        const detail = el.querySelector('.task-detail-card')!
        const b = button.getBoundingClientRect(), p = panel.getBoundingClientRect(), d = detail.getBoundingClientRect()
        const all = [...document.querySelectorAll('.roadmap-task-card')]
        const next = all[all.indexOf(el) + 1]?.getBoundingClientRect()
        const style = getComputedStyle(panel)
        const screen = document.querySelector('.screen')!
        return {
          below: p.top >= b.bottom - 1 && p.top - b.bottom <= 24,
          sameColumn: Math.abs(p.left - b.left) <= 1 && Math.abs(p.width - b.width) <= 1,
          inFlow: !['absolute', 'fixed', 'sticky'].includes(style.position),
          contained: d.left >= p.left - 1 && d.right <= p.right + 1,
          neighbourClear: !next || next.top >= p.bottom + 11,
          overflow: screen.scrollWidth > screen.clientWidth + 1,
        }
      })
      expect(geometry, `Day${day.day}, ${tasks[i].id}`).toEqual({ below: true, sameColumn: true, inFlow: true, contained: true, neighbourClear: true, overflow: false })
      await expect(page.locator('dialog[open], [aria-modal="true"]')).toHaveCount(0)
      await expect(page.locator('.task-detail-card')).toHaveCount(1)
      await trigger.press('Space')
      await expect(trigger).toHaveAttribute('aria-expanded', 'false')
      await expect(trigger).toBeFocused()
    }
  }
  expect(errors).toEqual([])
})
