/*
What is Device Emulation?
Device emulation means making a browser behave like a particular device, 
such as a mobile phone or tablet, so we can test how a website works on different screen sizes and device settings.

For example, as a QA tester, you might need to check whether your website works correctly on 
a desktop and an iPhone.

What can Playwright emulate?
- Viewport: the webpage's width and height.
- Device scale factor: the ratio between device pixels and CSS pixels.
- Touch support: whether touch input is supported.
- Mobile behavior: settings such as mobile viewport behavior and user agent.
- Device profiles: predefined settings for devices such as iPhones.
Remember: emulation does not mean you are testing on a real physical phone.
*/

// Check viewport size

 const { test, expect, devices } = require('@playwright/test');

// test('Check viewport size', async ({ page }) => {

//     await page.setViewportSize({       // Changes the webpage's viewport dimensions.
//         width: 390,                    // Webpage viewport is 390 CSS pixels wide.
//         height: 844                    // Webpage viewport is 844 CSS pixels high.
//     });

//     await page.goto('https://www.google.com');

//     console.log('Viewport size:', page.viewportSize());  // Returns the current viewport dimensions.

//     await expect(page).toHaveTitle(/Google/);

//     await page.waitForTimeout(3000);
// });


/*
What is a device profile?
Playwright provides predefined profiles for devices such as iPhones. A profile can include viewport dimensions, device scale factor, mobile settings, touch support, and user-agent information.

Instead of configuring each setting individually, we can reuse a profile.

*/


test.use({
    ...devices['iPhone 13']
});

test('Emulate iPhone 13', async ({ page }) => {

    await page.goto('https://www.google.com');

    console.log('Viewport:', page.viewportSize());

    console.log(
        'Touch supported:',
        await page.evaluate(() => 'ontouchstart' in window)
    );

    await expect(page).toHaveTitle(/Google/);

    await page.waitForTimeout(3000);
});