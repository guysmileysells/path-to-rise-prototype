import assert from 'node:assert/strict'
import { writeFileSync } from 'node:fs'
import { chromium } from '@playwright/test'

const browser = await chromium.launch()
try {
  const page = await browser.newPage({ viewport: { width: 375, height: 900 }, reducedMotion: 'reduce' })
  await page.goto(process.argv[2] ?? 'http://127.0.0.1:4177/')
  await page.getByRole('heading', { name: 'Today, in three parts.', exact: true }).waitFor()
  const report = await page.evaluate(() => {
    const rgb = (value) => {
      const values = value.match(/[\d.]+/g)?.map(Number) ?? [0, 0, 0]
      return [...values.slice(0, 3), values[3] ?? 1]
    }
    const composite = (fg, bg) => fg.slice(0, 3).map((v, i) => v * fg[3] + bg[i] * (1 - fg[3]))
    const luminance = (color) => color.slice(0, 3).map((v) => {
      const s = v / 255
      return s <= 0.04045 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4
    }).reduce((sum, v, i) => sum + v * [0.2126, 0.7152, 0.0722][i], 0)
    const checked = []
    const skipped = []
    for (const element of document.querySelectorAll('.screen *, .topbar button, .bottom-nav button')) {
      const text = [...element.childNodes].filter((n) => n.nodeType === Node.TEXT_NODE).map((n) => n.textContent.trim()).filter(Boolean).join(' ')
      if (!text || !element.getClientRects().length || getComputedStyle(element).visibility === 'hidden' || element.closest('[aria-hidden="true"]')) continue
      const ancestors = []
      for (let parent = element; parent; parent = parent.parentElement) ancestors.unshift(parent)
      let background = [255, 255, 255]
      let complexBackground = false
      for (const parent of ancestors) {
        const parentStyle = getComputedStyle(parent)
        const layer = rgb(parentStyle.backgroundColor)
        if (layer[3] === 1) complexBackground = false
        background = composite(layer, background)
        if (parentStyle.backgroundImage !== 'none') complexBackground = true
      }
      if (complexBackground) {
        skipped.push({ text, reason: 'Gradient/image background needs visual review' })
        continue
      }
      const style = getComputedStyle(element)
      const color = composite(rgb(style.color), background)
      const l1 = luminance(color), l2 = luminance(background)
      const ratio = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05)
      const large = parseFloat(style.fontSize) >= 24 || (parseFloat(style.fontSize) >= 18.666 && Number(style.fontWeight) >= 700)
      const required = large ? 3 : 4.5
      checked.push({ text, color: style.color, background, ratio: Number(ratio.toFixed(3)), required, pass: ratio >= required })
    }
    return { checked, skipped, failures: checked.filter((item) => !item.pass) }
  })
  writeFileSync(new URL('./contrast-results.json', import.meta.url), `${JSON.stringify(report, null, 2)}\n`)
  console.log(JSON.stringify({ checked: report.checked.length, skipped: report.skipped, failures: report.failures }, null, 2))
  assert.ok(report.checked.length > 10)
  assert.deepEqual(report.failures, [])
} finally {
  await browser.close()
}
