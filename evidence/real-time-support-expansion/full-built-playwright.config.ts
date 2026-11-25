import { defineConfig } from '@playwright/test'
import path from 'node:path'
import root from '../../playwright.config'

// Non-destructive full regression against the already-running production preview.
// Do not start, kill, reuse or reconfigure the occupied development server.
export default defineConfig({
  ...root,
  testDir: path.resolve('tests/browser'),
  workers: 2,
  use: { ...root.use, baseURL: process.env.BASE_URL || 'http://127.0.0.1:4183/' },
  webServer: undefined,
  reporter: [['list'], ['json', { outputFile: 'evidence/real-time-support-expansion/final-built-results.json' }]],
  outputDir: 'evidence/real-time-support-expansion/final-built-artifacts',
})
