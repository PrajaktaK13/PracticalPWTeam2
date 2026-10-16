/*
What is a Page?
-> A page represents a browser tab where you can open a website and interact with its elements.

Page handling :is the process of creating, navigating, and managing browser tabs or pages during 
automated testing. Playwright supports multiple pages within a browser context, which is useful 
for testing new tabs, pop-ups, and multi-page workflows.  */

// Create and use multiple pages
const { test, expect } = require('@playwright/test');

test('Handle multiple pages', async ({ context }) => {
  const page1 = await context.newPage();
  const page2 = await context.newPage();

  await page1.goto('https://google.com');
  await page2.goto('https://gmail.com');

  console.log(await page1.title());
  console.log(await page2.title());

  await expect(page1).toHaveTitle(/Google/);
  await expect(page2).toHaveTitle(/Gmail/);
});

