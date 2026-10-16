
// const { test, expect } = require('@playwright/test');

// test('Check page title', async ({ page }) => {
//     await page.goto('https://example.com');

//     await expect(page).toHaveTitle(/Example Domain/);
// });

const { test, expect } = require('@playwright/test');

test('Check viewport size', async ({ page }) => {
  await page.goto('https://www.google.com', {
    waitUntil: 'domcontentloaded',
  });
  console.log('Viewport:', page.viewportSize());
 
  await expect(page).toHaveTitle(/google/i);
  //await page.pause();
});
