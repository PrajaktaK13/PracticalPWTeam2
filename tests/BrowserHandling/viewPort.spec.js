/*
A viewport is the visible area of a webpage inside the browser.
Interview-ready definition: In Playwright, the viewport defines the width and height, in pixels, 
of the visible webpage area. We can change it to test how a website behaves at different screen sizes.*/

const { test, expect } = require('@playwright/test');

test('Check desktop viewport', async ({ page }) => {
  await page.setViewportSize({
    width: 780,
    height: 320,
  });

  await page.goto('https://amazon.in');

  console.log(page.viewportSize());

  await expect(page).toHaveTitle(/Online Shopping site in India: Shop Online for Mobiles, Books, Watches, Shoes and More - Amazon.in/);
});

