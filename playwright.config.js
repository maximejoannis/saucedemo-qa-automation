// @ts-check
const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  globalSetup: require.resolve('./global-setup'),
  timeout: 30000,

  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,

  reporter: [
    ['list'],
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ...(process.env.AI_COVERAGE_EXECUTION === 'true'
      ? [['json', { outputFile: 'ai/feature-mapper/output/playwright-results.json' }]]
      : []),
    [
      'allure-playwright',
      {
        resultsDir: 'allure-results',
        detail: true,
        suiteTitle: false,
        environmentInfo: {
          application: 'SauceDemo',
          baseURL: 'https://www.saucedemo.com/',
          framework: 'Playwright',
          platform: process.platform,
          node: process.version,
        },
      },
    ],
  ],

  use: {
    baseURL: 'https://www.saucedemo.com/',
    storageState: 'playwright/.auth/user.json',
    headless: true,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    actionTimeout: 10000,
    navigationTimeout: 15000,
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
  ],
});
