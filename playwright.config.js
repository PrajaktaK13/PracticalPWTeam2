
// @ts-check
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
    testDir: './tests',

    // Run individual tests in parallel
    fullyParallel: false,

    // CI settings
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    workers: process.env.CI ? 1 : 2,

    // Report
    reporter: [['html', { open: 'never' }]],

    // Global timeout for the complete test run
    globalTimeout: 300000,

    // Timeout for each test
    timeout: 30000,

    expect: {
        timeout: 5000
    },

    use: {
        actionTimeout: 10000,
        navigationTimeout: 15000,
        baseURL: 'http://google.com',
        headless: true,
        viewport: null,
        ignoreHTTPSErrors: true,
        permissions: ['geolocation'],
        trace: 'on-first-retry',
        launchOptions: {
            args: ['--start-maximized']
        }
    },

    projects: [
    {
        name: 'chromium',
        use: {
            browserName: 'chromium',
            viewport: null,
            launchOptions: {
                args: ['--start-maximized']
            }
        }
    }

        // You can enable these later:
        // {
        //     name: 'firefox',
        //     use: { ...devices['Desktop Firefox'] }
        // },
        // {
        //     name: 'webkit',
        //     use: { ...devices['Desktop Safari'] }
        // }
    ]
});
