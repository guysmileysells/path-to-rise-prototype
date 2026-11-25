import { defineConfig } from '@playwright/test'
export default defineConfig({
  testDir: '../../tests/browser',
  testMatch: 'word-spacing.spec.ts',
  fullyParallel: false,
  workers: 1,
  retries: 0,
  reporter: 'list',
  use: { baseURL: process.env.BASE_URL || 'https://guysmileysells.github.io/path-to-rise-prototype/', reducedMotion: 'reduce', trace: 'retain-on-failure' },
  projects: [
    { name: 'mobile', use: { viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true } },
    { name: 'desktop', use: { viewport: { width: 1280, height: 900 } } },
  ],
})
