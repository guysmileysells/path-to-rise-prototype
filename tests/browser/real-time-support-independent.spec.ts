import { test, expect, chromium, type Page, type Locator } from '@playwright/test'

// Direct mode avoids loading the repository config (which starts a server and overwrites
// another worker's evidence). Standard Playwright registration remains available.
// RTS_INDEPENDENT_DIRECT=1 node --experimental-transform-types tests/browser/real-time-support-independent.spec.ts
const base = process.env.BASE_URL || 'http://127.0.0.1:4183/'
const names = ['Physiological Reset', 'Here and Now Reset', 'Intrusive Thought Reset', "Respond, Don't React", 'Post-Incident Recovery Reset']
const headings = ['What', 'When', 'How', 'Why', 'Benefits', 'Duration', 'Adaptations', 'Scientific References']
const key = 'path-to-rise-program-progress-v1'
const savedSentinel = 'INDEPENDENT_SYNTHETIC_PRIVATE_SAVED_726'
const draftSentinel = 'INDEPENDENT_SYNTHETIC_PRIVATE_UNSAVED_827'
const button = (scope: Page | Locator, name: string) => scope.getByRole('button', { name, exact: true })
async function enter(page: Page, index = 0) {
  await button(page, 'Real-Time Support').click()
  const row = page.locator('.rts-tool').nth(index)
  await row.locator(':scope > .inline-expansion > button').click()
  return row
}
async function start(row: Locator, minutes?: number) {
  if (minutes) await row.getByLabel(`${minutes} minute${minutes === 1 ? '' : 's'}`, { exact: true }).check()
  await row.getByLabel('I am stationary and not doing a safety-critical task.').check()
  await button(row, 'Start Guided Practice').click()
  if (minutes) await button(row, 'Next step').click()
}
async function storage(page: Page) {
  return page.evaluate(() => ({ local: Object.fromEntries(Object.entries(localStorage).sort()), session: Object.fromEntries(Object.entries(sessionStorage).sort()) }))
}
async function geometry(page: Page) {
  // Use real visible control bounds, not just a clipped ancestor's scrollWidth.
  const result = await page.evaluate(() => {
    const screen = document.querySelector('.screen')!
    const controls = [...document.querySelectorAll<HTMLElement>('.rts button, .rts select, .rts-check, .rts-duration-options label, .rts-launch')]
      .filter(el => el.getClientRects().length && getComputedStyle(el).visibility !== 'hidden')
      .map(el => { const r = el.getBoundingClientRect(); return { text: el.textContent?.trim(), left: r.left, right: r.right, width: Math.round(r.width * 100) / 100, height: Math.round(r.height * 100) / 100 } })
    return { width: innerWidth, rootWidth: document.documentElement.scrollWidth, screenWidth: screen.clientWidth, screenScroll: screen.scrollWidth, controls }
  })
  expect(result.rootWidth).toBeLessThanOrEqual(result.width + 1)
  expect(result.screenScroll).toBeLessThanOrEqual(result.screenWidth + 1)
  for (const control of result.controls) {
    expect(control.height, control.text).toBeGreaterThanOrEqual(44)
    expect(control.width, control.text).toBeGreaterThanOrEqual(44)
    expect(control.left, control.text).toBeGreaterThanOrEqual(-1)
    expect(control.right, control.text).toBeLessThanOrEqual(result.width + 1)
  }
}
async function fakeAudio(page: Page, available: boolean) {
  await page.addInitScript(available => {
    const state = { spoken: [] as string[], canceled: 0, current: null as any, voices: available ? [{ localService: true, lang: 'en-CA' }] : [{ localService: false, lang: 'en-CA' }, { localService: true, lang: 'fr-CA' }] }
    ;(window as any).independentAudio = state
    // Both APIs are modeled; native SpeechSynthesisUtterance requires a real WebIDL voice.
    Object.defineProperty(window, 'SpeechSynthesisUtterance', { configurable: true, value: class { text: string; voice: unknown; rate = 1; onerror: any; constructor(text: string) { this.text = text } } })
    Object.defineProperty(window, 'speechSynthesis', { configurable: true, value: {
      getVoices: () => state.voices, addEventListener() {}, removeEventListener() {},
      speak(u: any) { state.spoken.push(u.text); state.current = u },
      cancel() { state.canceled++; const old = state.current; state.current = null; old?.onerror?.({ error: 'canceled' }) },
    } })
  }, available)
}
const checks: { name: string; run: (page: Page) => Promise<void> }[] = [
  { name: 'exact five names/eight headings, downward geometry, 44px controls', run: async page => {
    await page.goto('./')
    await button(page, 'Real-Time Support').click()
    for (let i = 0; i < names.length; i++) await expect(page.locator('.rts-tool > .inline-expansion > button').nth(i)).toHaveAccessibleName(names[i])
    await expect(page.locator('.rts')).toContainText(/not (?:received clinical review|clinically reviewed)/i)
    await expect(page.locator('.rts')).toContainText('Offline reopening/reloading and background operation are not guaranteed.')
    for (let i = 0; i < names.length; i++) {
      const row = page.locator('.rts-tool').nth(i)
      await row.locator(':scope > .inline-expansion > button').click()
      await expect(row.locator('h2')).toHaveText(headings)
      const shape = await row.evaluate(el => {
        const b = el.querySelector('button')!.getBoundingClientRect(), p = el.querySelector('.inline-expansion-panel')!.getBoundingClientRect(), next = el.nextElementSibling?.getBoundingClientRect()
        return { below: p.top >= b.bottom - 1, sameColumn: Math.abs(p.left - b.left) <= 1 && Math.abs(p.width - b.width) <= 1, nextClear: !next || next.top >= p.bottom - 1, normalFlow: !['absolute', 'fixed'].includes(getComputedStyle(el.querySelector('.inline-expansion-panel')!).position) }
      })
      expect(shape).toEqual({ below: true, sameColumn: true, nextClear: true, normalFlow: true })
      await expect(button(row, 'Start Guided Practice')).toBeDisabled()
      await geometry(page)
      await start(row)
      await geometry(page)
      while (await button(row, 'Next step').count()) {
        await button(row, 'Next step').click()
        if (await button(row, 'Skip timed breathing').count()) {
          await geometry(page)
          await button(row, 'Skip timed breathing').click()
        }
      }
      await button(row, 'Finish practice').click()
      await geometry(page)
      await button(row, 'Stop practice').click()
    }
  } },
  { name: 'actual saved and unsaved program writing survives all five tools; no storage or network rating side effects', run: async page => {
    await fakeAudio(page, true)
    await page.goto('./#path')
    await button(page, 'Open Day 1').first().click()
    await button(page, 'Today’s Tasks').click()
    // The title is discovered from the actual canonical UI, not an invented stored reflection key.
    const candidates = page.locator('.roadmap-task-card')
    let found = false
    for (let i = 0; i < await candidates.count(); i++) {
      const row = candidates.nth(i)
      await row.locator('button[aria-expanded]').click()
      if (await page.getByLabel('Gratitude 1', { exact: true }).count()) { found = true; break }
    }
    expect(found).toBe(true)

    await page.getByLabel('Gratitude 1', { exact: true }).fill(savedSentinel)
    await button(page, 'Save fields locally').click()
    await page.getByLabel('Gratitude 2', { exact: true }).fill(draftSentinel)
    const baseline = await storage(page)
    expect(JSON.parse(baseline.local[key]).savedReflections).toEqual(expect.objectContaining({ [Object.keys(JSON.parse(baseline.local[key]).savedReflections)[0]]: savedSentinel }))
    expect(JSON.stringify(baseline)).not.toContain(draftSentinel)
    const requests: string[] = [], logs: string[] = []
    page.on('request', request => requests.push(`${request.method()} ${request.url()} ${request.postData() ?? ''}`))
    page.on('console', message => logs.push(message.text()))
    await page.clock.install({ time: new Date('2026-01-01T00:00:00Z') }); await page.clock.pauseAt(new Date('2026-01-01T00:00:10Z'))
    await button(page, 'Real-Time Support').click()
    const allowedSpeech = new Set(['Gently inhale for four seconds. Do not force your breath.', 'Gently exhale for six seconds.'])
    for (let i = 0; i < 5; i++) {
      const row = page.locator('.rts-tool').nth(i)
      await row.locator(':scope > .inline-expansion > button').click()
      for (const text of await row.locator('.rts-detail > section').nth(2).locator('li').allTextContents()) allowedSpeech.add(text)
      expect(await page.locator('.rts').innerText()).not.toContain(savedSentinel)
      expect(await page.locator('.rts').innerText()).not.toContain(draftSentinel)
      await row.getByLabel('Before practice (optional, 0–10)').selectOption('10')
      await row.getByLabel('Optional guided audio').check()
      await start(row, i === 0 ? 1 : undefined)
      if (i === 0) await page.clock.fastForward(60_000)
      while (await button(row, 'Next step').count()) await button(row, 'Next step').click()
      await button(row, 'Finish practice').click()
      await row.getByLabel('After practice (optional, 0–10)').selectOption('0')
      expect(await storage(page)).toEqual(baseline)
      await button(row, 'Stop practice').click()
      await expect(row.getByLabel('Before practice (optional, 0–10)')).toHaveValue('')
    }
    expect(requests).toEqual([])
    expect(logs.join('\n')).not.toContain(savedSentinel)
    const utterances: string[] = await page.evaluate(() => (window as any).independentAudio.spoken)
    expect(utterances.length).toBeGreaterThan(0)
    expect(utterances.every(text => allowedSpeech.has(text))).toBe(true)
    expect(await page.evaluate(() => (window as any).independentAudio.spoken.join('\n'))).not.toContain(savedSentinel)
    expect(await page.evaluate(() => (window as any).independentAudio.spoken.join('\n'))).not.toContain(draftSentinel)
    await button(page, 'Exit Real-Time Support').click()
    await expect(button(page, 'Real-Time Support')).toBeFocused()
    // A controlled textarea's child text changes its wrapping label's computed text.
    // Assert the actual preserved controls instead of a now-stale exact label name.
    await expect(page.locator('.writing-field-set textarea')).toHaveCount(5)
    await expect(page.locator('.writing-field-set textarea').nth(0)).toHaveValue(savedSentinel)
    await expect(page.locator('.writing-field-set textarea').nth(1)).toHaveValue(draftSentinel)
    expect(await storage(page)).toEqual(baseline)
    await page.reload()
    const reloaded = await storage(page)
    expect(reloaded.local[key]).toBe(baseline.local[key])
    expect(Object.keys(reloaded.local)).toEqual(Object.keys(baseline.local))
    // Existing notification parser reorders equivalent JSON properties on reload;
    // tool use itself must preserve every raw storage string (asserted above).
    for (const [storedKey, value] of Object.entries(baseline.local)) expect(JSON.parse(reloaded.local[storedKey])).toEqual(JSON.parse(value))
  } },
  { name: 'remote-English/local-non-English voices do not enable purported on-device English audio', run: async page => {
    await fakeAudio(page, false)
    await page.goto('./')
    const row = await enter(page, 1)
    await expect(row.getByLabel('Optional guided audio')).toBeDisabled()
    await expect(row).toContainText('No on-device English voice is available in this browser. Follow the text instead.')
    await start(row)
    await expect(row.locator('.rts-current-step')).toContainText('See:')
    await button(row, 'Next step').click()
    await expect(row.locator('.rts-current-step')).toContainText('Feel:')
    expect(await page.evaluate(() => (window as any).independentAudio.spoken)).toEqual([])
  } },
  { name: 'local audio cancels on hidden tab, stop, collapse, exit and navigation without restarting', run: async page => {
    await fakeAudio(page, true)
    await page.goto('./')
    await page.clock.install({ time: new Date('2026-01-01T00:00:00Z') }); await page.clock.pauseAt(new Date('2026-01-01T00:00:10Z'))
    const row = await enter(page)
    const spoken = () => page.evaluate(() => (window as any).independentAudio.spoken.length)
    for (const cleanup of ['hidden', 'stop', 'collapse', 'exit', 'navigation']) {
      await row.getByLabel('Optional guided audio').check()
      await start(row, 1)
      await page.clock.fastForward(4000)
      expect(await page.evaluate(() => (window as any).independentAudio.spoken.some((s: string) => s.includes('exhale for six')))).toBe(true)
      const canceled = await page.evaluate(() => (window as any).independentAudio.canceled)
      if (cleanup === 'hidden') {
        await page.evaluate(() => { Object.defineProperty(document, 'hidden', { configurable: true, value: true }); document.dispatchEvent(new Event('visibilitychange')) })
        await expect(button(row, 'Resume breathing')).toBeVisible()
        await expect(row.getByLabel('Optional guided audio')).not.toBeChecked()
        await page.evaluate(() => Object.defineProperty(document, 'hidden', { configurable: true, value: false }))
      } else if (cleanup === 'stop') await button(row, 'Stop practice').click()
      else if (cleanup === 'collapse') await row.locator(':scope > .inline-expansion > button').click()
      else if (cleanup === 'exit') await button(page, 'Exit Real-Time Support').click()
      else await button(page, 'Open Support').click()
      expect(await page.evaluate(() => (window as any).independentAudio.canceled)).toBeGreaterThan(canceled)
      const count = await spoken()
      await page.clock.fastForward(600_000)
      expect(await spoken()).toBe(count)
      if (cleanup === 'hidden') await button(row, 'Stop practice').click()
      if (cleanup === 'collapse') await row.locator(':scope > .inline-expansion > button').click()
      if (cleanup === 'exit' || cleanup === 'navigation') {
        await button(page, 'Real-Time Support').click()
        await row.locator(':scope > .inline-expansion > button').click()
      }
    }
  } },
]
for (const minutes of [1, 3, 5]) checks.push({ name: `${minutes}-minute 4/6 timing, pause and interval cleanup after stop/collapse/exit/nav/hidden`, run: async page => {
  await page.goto('./')
  await page.clock.install({ time: new Date('2026-01-01T00:00:00Z') }); await page.clock.pauseAt(new Date('2026-01-01T00:00:10Z'))
  await page.evaluate(() => {
    const originalSet = window.setInterval, originalClear = window.clearInterval
    const state = { active: [] as number[], ticks: 0 }
    ;(window as any).independentTimers = state
    window.setInterval = ((handler: () => void, ms: number) => {
      const id = originalSet(() => { if (ms === 100) state.ticks++; handler() }, ms)
      if (ms === 100) state.active.push(id)
      return id
    }) as typeof window.setInterval
    window.clearInterval = (id: number | undefined) => { state.active = state.active.filter(v => v !== id); originalClear(id) }
  })
  const row = await enter(page)
  const timers = () => page.evaluate(() => (window as any).independentTimers as { active: number[]; ticks: number })
  await start(row, minutes)
  await expect(row.locator('.rts-breath')).toHaveAttribute('data-phase', 'inhale')
  await page.clock.fastForward(3900)
  await expect(row.locator('.rts-breath')).toHaveAttribute('data-phase', 'inhale')
  await page.clock.fastForward(100)
  await expect(row.locator('.rts-breath')).toHaveAttribute('data-phase', 'exhale')
  await page.clock.fastForward(5900)
  await expect(row.locator('.rts-breath')).toHaveAttribute('data-phase', 'exhale')
  await page.clock.fastForward(100)
  await expect(row.locator('.rts-breath')).toHaveAttribute('data-phase', 'inhale')
  await button(row, 'Pause breathing').click()
  const remaining = await row.getByLabel('Breathing time remaining').textContent()
  expect((await timers()).active).toEqual([])
  await page.clock.fastForward(900_000)
  await expect(row.getByLabel('Breathing time remaining')).toHaveText(remaining!)
  await button(row, 'Resume breathing').click()
  await page.clock.fastForward(minutes * 60_000 - 10_000)
  await expect(button(row, 'Finish practice')).toBeVisible()
  expect((await timers()).active).toEqual([])
  await button(row, 'Stop practice').click()
  for (const cleanup of ['stop', 'collapse', 'exit', 'navigation', 'hash', 'hidden']) {
    await row.getByLabel('Before practice (optional, 0–10)').selectOption('7')
    await start(row, minutes)
    await page.clock.fastForward(4100)
    expect((await timers()).active).toHaveLength(1)
    if (cleanup === 'stop') await button(row, 'Stop practice').click()
    else if (cleanup === 'collapse') await row.locator(':scope > .inline-expansion > button').click()
    else if (cleanup === 'exit') await button(page, 'Exit Real-Time Support').click()
    else if (cleanup === 'navigation') await button(page, 'Open My Path').click()
    else if (cleanup === 'hash') { await page.evaluate(() => { location.hash = 'support' }); await expect(page.locator('#rts-title')).toHaveCount(0) }
    else await page.evaluate(() => { Object.defineProperty(document, 'hidden', { configurable: true, value: true }); document.dispatchEvent(new Event('visibilitychange')) })
    const cleaned = await timers()
    expect(cleaned.active, cleanup).toEqual([])
    await page.clock.fastForward(900_000)
    expect((await timers()).ticks, cleanup).toBe(cleaned.ticks)
    if (cleanup === 'hidden') {
      await expect(button(row, 'Resume breathing')).toBeVisible()
      await page.evaluate(() => Object.defineProperty(document, 'hidden', { configurable: true, value: false }))
      await button(row, 'Stop practice').click()
    }
    if (cleanup === 'collapse') await row.locator(':scope > .inline-expansion > button').click()
    if (['exit', 'navigation', 'hash'].includes(cleanup)) { await button(page, 'Real-Time Support').click(); await row.locator(':scope > .inline-expansion > button').click() }
    await expect(row.getByLabel('Before practice (optional, 0–10)')).toHaveValue('')
    await expect(button(row, 'Start Guided Practice')).toBeDisabled()
    await expect(row.locator('.rts-breath')).toHaveCount(0)
  }
} })

if (process.env.RTS_INDEPENDENT_DIRECT === '1') {
  const browser = await chromium.launch()
  let passed = 0, failed = 0
  try {
    for (const viewport of [{ width: 320, height: 568 }, { width: 1280, height: 900 }]) {
      for (const check of checks.filter(c => !process.env.RTS_INDEPENDENT_FILTER || c.name.includes(process.env.RTS_INDEPENDENT_FILTER))) {
        const context = await browser.newContext({ baseURL: base, viewport, reducedMotion: 'reduce' })
        const page = await context.newPage()
        page.setDefaultTimeout(5000)
        const errors: string[] = []
        page.on('pageerror', e => errors.push(e.message))
        try { await check.run(page); expect(errors).toEqual([]); passed++; console.log(`PASS ${viewport.width}x${viewport.height}: ${check.name}`) }
        catch (error) { failed++; console.error(`FAIL ${viewport.width}x${viewport.height}: ${check.name}\n${error instanceof Error ? error.stack : error}`) }
        finally { await context.close() }
      }
    }
  } finally { await browser.close() }
  console.log(`Independent targeted checks: ${passed} passed; ${failed} failed.`)
  if (failed) process.exitCode = 1
} else {
  for (const check of checks) test(`independent: ${check.name}`, async ({ page }) => { await page.emulateMedia({ reducedMotion: 'reduce' }); await check.run(page) })
}
