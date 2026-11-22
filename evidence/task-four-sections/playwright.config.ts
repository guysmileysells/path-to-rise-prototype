import { defineConfig } from '@playwright/test'
import { resolve } from 'node:path'
import base from '../../playwright.config'
export default defineConfig({ ...base,
  testDir: resolve(process.cwd(), 'tests/browser'),
  reporter: [['list'], ['json', { outputFile: 'evidence/task-four-sections/browser-results.json' }]],
  outputDir: resolve(process.cwd(), 'evidence/task-four-sections/artifacts'),
  use: { ...base.use, baseURL: 'http://127.0.0.1:4187' },
  webServer: { command: 'npm run dev -- --host 127.0.0.1 --port 4187 --strictPort', url: 'http://127.0.0.1:4187', reuseExistingServer: false },
})
