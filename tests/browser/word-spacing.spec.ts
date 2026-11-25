import { test, expect, type Page } from '@playwright/test'
import { mkdirSync, writeFileSync } from 'node:fs'
import { canonicalTools, resetNeeds } from '../../src/toolContent'
import { feelingStuckOptions } from '../../src/dayRoadmap'

// A CSS gap/new line is not a word separator in copied or serialized text.
// Inspect actual adjacent label/value nodes, not clinical/user-authored prose.
async function joinedLabels(page: Page) {
  return page.locator('summary, span:has(> small), .summary-metrics > span, .notice-card, .support-card, .source-banner, .daily-reminder-card, .task-row-label, button').evaluateAll(elements => elements.flatMap(el => {
    if (!el.getClientRects().length) return []
    const parts = [...el.childNodes].filter(n => n.textContent!.length)
    return parts.slice(1).flatMap((node, i) => /[\p{L}\p{N}]$/u.test(parts[i].textContent!) && /^[\p{L}\p{N}]/u.test(node.textContent!)
      ? [`${el.tagName}.${el.className}: ${parts[i].textContent!.slice(-55)}|${node.textContent!.slice(0, 65)}`] : [])
  }))
}
async function openDetails(page: Page) {
  for (const details of await page.locator('details').all()) {
    if (await details.isVisible() && await details.getAttribute('open') === null) await details.locator(':scope > summary').click()
  }
}

test('whole-prototype labels retain real word spaces across every shared screen', async ({ page }, testInfo) => {
  test.setTimeout(150_000)
  await page.emulateMedia({ reducedMotion: 'reduce' })
  const prefix = process.env.SPACING_LABEL ? `${process.env.SPACING_LABEL}-` : ''
  const findings = new Set<string>(), visited: string[] = []
  const check = async (name: string) => {
    visited.push(name)
    for (const issue of await joinedLabels(page)) findings.add(issue)
    const shape = await page.locator('.screen').evaluate(el => ({ width: el.clientWidth, scroll: el.scrollWidth }))
    expect(shape.scroll).toBeLessThanOrEqual(shape.width + 1)
  }
  let routeCounter = 0
  const enter = async (hash: string) => { await page.goto(`./?spacing=${++routeCounter}#${hash}`) }
  await enter('today')
  await check('Today')
  await page.getByRole('button', { name: 'Your space', exact: true }).click()
  await openDetails(page)
  await check('Your space, reminders and privacy/data settings')
  await enter('path')
  await openDetails(page)
  await check('My Path, metrics, map, practices, reflections and privacy')
  await page.screenshot({ path: `evidence/word-spacing/${prefix}${testInfo.project.name}-my-path.png`, fullPage: true })
  await page.getByRole('button', { name: 'Open Day 1', exact: true }).first().click()
  await page.getByRole('button', { name: 'Today’s Tasks', exact: true }).click()
  await openDetails(page)
  await check('Day 1 task rows, daily reminder and group counts')
  await page.screenshot({ path: `evidence/word-spacing/${prefix}${testInfo.project.name}-day1.png`, fullPage: true })
  for (let i = 0; i < feelingStuckOptions.length; i++) {
    await page.locator('.stuck-options > .inline-expansion > button').nth(i).click()
    await expect(page.locator('.stuck-response')).toBeVisible()
    await check(`Feeling Stuck ${feelingStuckOptions[i].id}`)
  }
  for (let i = 0; i < resetNeeds.length; i++) {
    await enter('reset')
    await openDetails(page)
    await check(`RESET choices ${i + 1}`)
    await page.locator('.need-card').nth(i).click()
    await expect(page.locator('#reset-recommendation-title')).toBeVisible()
    await check(`RESET recommendation ${resetNeeds[i].id}`)
  }
  for (const tool of canonicalTools) {
    await enter('reset')
    await page.getByRole('button', { name: 'Open Toolbox', exact: true }).click()
    await openDetails(page)
    await check(`Toolbox ${tool.id}`)
    const card = page.locator('.browse-tools-disclosure .tool-card').filter({ has: page.locator(`h2[id="${tool.id}-title"]`) })
    await card.getByRole('button', { name: 'Start', exact: true }).click()
    await expect(page.locator('#tool-runner-title')).toHaveText(tool.canonicalName)
    await openDetails(page)
    await check(`Full instructions ${tool.id}`)
    await page.getByRole('button', { name: 'Done', exact: true }).click()
    await expect(page.locator('#tool-complete-title')).toBeVisible()
    await check(`Tool completion ${tool.id}`)
  }
  await enter('support')
  await openDetails(page)
  await check('Support and crisis guidance')
  const report = { result: findings.size ? 'FAIL' : 'PASS', base: testInfo.project.use.baseURL, checks: visited.length, visited, findings: [...findings] }
  mkdirSync('evidence/word-spacing', { recursive: true })
  writeFileSync(`evidence/word-spacing/${prefix}${testInfo.project.name}-interface-audit.json`, JSON.stringify(report, null, 2))
  await testInfo.attach('word-spacing-audit', { body: JSON.stringify(report, null, 2), contentType: 'application/json' })
  expect([...findings], 'Adjacent labels/counts must include actual spaces, not only CSS gaps').toEqual([])
})
