import { test, expect } from '@playwright/test'

test('Real-Time Support is available independently from every main tab', async ({ page }) => {
  await page.goto('./#today')
  await expect(page.getByRole('button', { name: 'Real-Time Support', exact: true })).toBeVisible()
  for (const name of ['Today', 'Reset', 'My Path', 'Support']) {
    await page.getByRole('button', { name: `Open ${name}`, exact: true }).click()
    await page.getByRole('button', { name: 'Real-Time Support', exact: true }).click()
    await expect(page.getByRole('heading', { name: 'Real-Time Support', exact: true })).toBeVisible()
    await expect(page.locator('.rts-tool > .inline-expansion > button')).toHaveCount(10)
    await page.getByRole('button', { name: 'Exit Real-Time Support', exact: true }).click()
  }
})

const toolNames = ['Physiological Reset', 'Here and Now Reset', 'Intrusive Thought Reset', "Respond, Don't React", 'Post-Incident Recovery Reset']
const headings = ['What', 'When', 'How', 'Why', 'Benefits', 'Duration', 'Adaptations', 'Scientific References']

test('all five tools expand downward with complete ordered guidance and verified-reference links', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('./#today')
  await page.getByRole('button', { name: 'Real-Time Support', exact: true }).click()
  for (let i = 0; i < toolNames.length; i++) {
    const row = page.locator('.rts-tool').nth(i)
    await row.getByRole('button', { name: toolNames[i], exact: false }).first().click()
    const panel = row.locator('.inline-expansion-panel')
    await expect(panel.locator('h2')).toHaveText(headings, { timeout: 2500 })
    await expect(panel.locator('.rts-references a')).not.toHaveCount(0)
    await expect(panel.getByRole('button', { name: 'Start Guided Practice', exact: true })).toBeDisabled()
    await expect(panel.getByLabel('Optional guided audio')).not.toBeChecked()
    const shape = await row.evaluate(el => {
      const trigger = el.querySelector('button')!.getBoundingClientRect(), panel = el.querySelector('.inline-expansion-panel')!.getBoundingClientRect()
      const next = el.nextElementSibling?.getBoundingClientRect()
      return { triggerBottom: trigger.bottom, panelTop: panel.top, panelBottom: panel.bottom, nextTop: next?.top, right: panel.right, left: panel.left }
    })
    expect(shape.panelTop).toBeGreaterThanOrEqual(shape.triggerBottom - 1)
    if (i < 4) expect(shape.nextTop).toBeGreaterThanOrEqual(shape.panelBottom - 1)
    expect(shape.left).toBeGreaterThanOrEqual(0)
    expect(shape.right).toBeLessThanOrEqual(page.viewportSize()!.width + 1)
  }
})


test('expanded reminder selects stay within mobile fields under wider font metrics', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('./#today')
  await page.getByRole('button', { name: 'Your space', exact: true }).click()
  for (const details of await page.locator('details').all()) {
    if (await details.isVisible() && await details.getAttribute('open') === null) await details.locator(':scope > summary').click()
  }
  await page.addStyleTag({ content: 'body { font-family: Verdana; }' })
  for (const width of [390, 360, 320]) {
    await page.setViewportSize({ width, height: 844 })
    const shape = await page.locator('.setting-field select').first().evaluate(el => {
      const box = el.getBoundingClientRect(), field = el.closest('label')!.getBoundingClientRect(), screen = document.querySelector('.screen')!
      return { right: box.right, fieldRight: field.right, height: box.height, scroll: screen.scrollWidth, width: screen.clientWidth }
    })
    expect(shape.scroll).toBeLessThanOrEqual(shape.width + 1)
    expect(shape.right).toBeLessThanOrEqual(shape.fieldRight + 1)
    expect(shape.height).toBeGreaterThanOrEqual(44)
  }
  await page.locator('.setting-field select').first().selectOption('mirror-breathwork')
  await expect(page.locator('.setting-field select').first()).toHaveValue('mirror-breathwork')
})


test('all untimed guided practices finish one step at a time without storing ratings or changing program state', async ({ page }) => {
  await page.goto('./#today')
  await page.getByRole('button', { name: 'Real-Time Support', exact: true }).click()
  const baseline = await page.evaluate(() => JSON.stringify({ ...localStorage }))
  for (let i = 1; i < 5; i++) {
    const row = page.locator('.rts-tool').nth(i)
    await row.locator(':scope > .inline-expansion > button').click()
    await row.getByLabel('Before practice (optional, 0–10)').selectOption('0')
    await row.getByLabel('I am stationary and not doing a safety-critical task.').check()
    await row.getByRole('button', { name: 'Start Guided Practice', exact: true }).click()
    let steps = 0
    while (await row.getByRole('button', { name: 'Next step', exact: true }).count()) {
      expect(await row.locator('.rts-current-step').count()).toBe(1)
      await row.getByRole('button', { name: 'Next step', exact: true }).click()
      expect(++steps).toBeLessThan(15)
    }
    await row.getByRole('button', { name: 'Finish practice', exact: true }).click()
    await expect(row.getByText('Practice finished. You can stop here.', { exact: true })).toBeVisible()
    await row.getByLabel('After practice (optional, 0–10)').selectOption('10')
    expect(await page.evaluate(() => JSON.stringify({ ...localStorage }))).toBe(baseline)
    await row.getByRole('button', { name: 'Stop practice', exact: true }).click()
    await expect(row.getByLabel('Before practice (optional, 0–10)')).toHaveValue('')
  }
  await page.getByRole('button', { name: 'Connect With Support', exact: true }).click()
  await expect(page.getByRole('heading', { name: 'Need urgent help?', exact: true })).toBeVisible()
  expect(await page.evaluate(() => JSON.stringify({ ...localStorage }))).toBe(baseline)
})

for (const minutes of [1, 3, 5]) {
  test(`breathing timer completes ${minutes} minute option using elapsed time with pause and resume`, async ({ page }) => {
    await page.goto('./#today')
    await page.clock.install()
    await page.getByRole('button', { name: 'Real-Time Support', exact: true }).click()
    const row = page.locator('.rts-tool').first()
    await row.locator(':scope > .inline-expansion > button').click()
    await row.getByLabel(`${minutes} minute${minutes === 1 ? '' : 's'}`, { exact: true }).check()
    await row.getByLabel('I am stationary and not doing a safety-critical task.').check()
    await row.getByRole('button', { name: 'Start Guided Practice', exact: true }).click()
    await row.getByRole('button', { name: 'Next step', exact: true }).click()
    await expect(row.locator('.rts-breath')).toHaveAttribute('data-phase', 'inhale')
    await page.clock.fastForward(4000)
    await expect(row.locator('.rts-breath')).toHaveAttribute('data-phase', 'exhale')
    await row.getByRole('button', { name: 'Pause breathing', exact: true }).click()
    const remaining = await row.getByLabel('Breathing time remaining').textContent()
    await page.clock.fastForward(20_000)
    await expect(row.getByLabel('Breathing time remaining')).toHaveText(remaining!)
    await row.getByRole('button', { name: 'Resume breathing', exact: true }).click()
    await page.clock.fastForward(minutes * 60_000 - 4000)
    await expect(row.locator('.rts-breath')).toHaveCount(0)
    await expect(row.getByRole('button', { name: 'Finish practice', exact: true })).toBeVisible()
    await row.getByRole('button', { name: 'Finish practice', exact: true }).click()
    await expect(row.getByLabel('After practice (optional, 0–10)')).toHaveValue('')
  })
}

test('loaded tools work offline; collapse, navigation and hidden tab stop or pause practice safely', async ({ page, context }) => {
  await page.goto('./#today')
  await page.clock.install()
  await page.getByRole('button', { name: 'Real-Time Support', exact: true }).click()
  await context.setOffline(true)
  const row = page.locator('.rts-tool').first()
  await row.locator(':scope > .inline-expansion > button').click()
  await row.getByLabel('I am stationary and not doing a safety-critical task.').check()
  await row.getByRole('button', { name: 'Start Guided Practice', exact: true }).click()
  await row.getByRole('button', { name: 'Next step', exact: true }).click()
  await page.clock.fastForward(10_000)
  await page.evaluate(() => { Object.defineProperty(document, 'hidden', { configurable: true, value: true }); document.dispatchEvent(new Event('visibilitychange')) })
  await expect(row.getByRole('button', { name: 'Resume breathing', exact: true })).toBeVisible()
  await page.evaluate(() => { Object.defineProperty(document, 'hidden', { configurable: true, value: false }) })
  await row.locator(':scope > .inline-expansion > button').click()
  await row.locator(':scope > .inline-expansion > button').click()
  await expect(row.getByRole('button', { name: 'Start Guided Practice', exact: true })).toBeDisabled()
  await expect(row.getByLabel('Before practice (optional, 0–10)')).toHaveValue('')
  await page.getByRole('button', { name: 'Open My Path', exact: true }).click()
  await expect(page.locator('#rts-title')).toHaveCount(0)
  await expect(page.getByRole('heading', { name: 'Progress + Insights', exact: true })).toBeVisible()
  await context.setOffline(false)
})


test('optional on-device audio survives ordinary phase cancellation and stops on exit', async ({ page }) => {
  await page.addInitScript(() => {
    const state = { spoken: [] as string[], cancels: 0, last: null as SpeechSynthesisUtterance | null }
    ;(window as unknown as { rtsAudioTest: typeof state }).rtsAudioTest = state
    // Model both native APIs: a plain fake voice cannot be assigned to native WebIDL.
    Object.defineProperty(window, 'SpeechSynthesisUtterance', { configurable: true, value: class {
      text: string
      voice: unknown = null
      rate = 1
      onerror: ((event: { error: string }) => void) | null = null
      constructor(text: string) { this.text = text }
    } })
    Object.defineProperty(window, 'speechSynthesis', { configurable: true, value: {
      getVoices: () => [{ localService: true, lang: 'en-CA', name: 'Synthetic local test voice' }],
      addEventListener() {}, removeEventListener() {},
      speak(utterance: SpeechSynthesisUtterance) { state.spoken.push(utterance.text); state.last = utterance },
      cancel() { state.cancels++; const old = state.last; state.last = null; if (old?.onerror) old.onerror({ error: 'canceled' } as SpeechSynthesisErrorEvent) },
    } })
  })
  await page.goto('./#today')
  await page.clock.install()
  await page.getByRole('button', { name: 'Real-Time Support', exact: true }).click()
  const row = page.locator('.rts-tool').first()
  await row.locator(':scope > .inline-expansion > button').click()
  await row.getByLabel('I am stationary and not doing a safety-critical task.').check()
  await row.getByLabel('Optional guided audio').check()
  await row.getByRole('button', { name: 'Start Guided Practice', exact: true }).click()
  await row.getByRole('button', { name: 'Next step', exact: true }).click()
  await page.clock.fastForward(4000)
  await expect(row.getByLabel('Optional guided audio')).toBeChecked()
  const data = () => page.evaluate(() => (window as unknown as { rtsAudioTest: { spoken: string[]; cancels: number } }).rtsAudioTest)
  expect((await data()).spoken.some(s => s.includes('exhale for six'))).toBeTruthy()
  const prior = (await data()).cancels
  await page.getByRole('button', { name: 'Exit Real-Time Support', exact: true }).click()
  expect((await data()).cancels).toBeGreaterThan(prior)
})


test('direct hash navigation exits the toolbox and cancels active practice', async ({ page }) => {
  await page.goto('./#today')
  await page.getByRole('button', { name: 'Real-Time Support', exact: true }).click()
  const row = page.locator('.rts-tool').first()
  await row.locator(':scope > .inline-expansion > button').click()
  await row.getByLabel('I am stationary and not doing a safety-critical task.').check()
  await row.getByRole('button', { name: 'Start Guided Practice', exact: true }).click()
  await row.getByRole('button', { name: 'Next step', exact: true }).click()
  await expect(row.getByRole('button', { name: 'Pause breathing', exact: true })).toBeVisible()
  await page.evaluate(() => { location.hash = 'support' })
  await expect(page.locator('#rts-title')).toHaveCount(0, { timeout: 1500 })
  await expect(page.locator('#support-title')).toHaveText('Reach people, not a wall.')
})
