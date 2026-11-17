import { defineConfig } from '@playwright/test'
import base from '../../playwright.config'
export default defineConfig({ ...base, testDir: '../../tests/browser', use: { ...base.use, baseURL: 'http://127.0.0.1:4180' }, webServer: undefined, reporter: [['list']], outputDir: './focused-artifacts' })
