const { test, expect } = require('@playwright/test');

test('Create two isolated browser contexts', async ({ browser }) => {   

  // A Browser Context in Playwright means an isolated browser session. 
  // It keeps its own cookies, local storage, and login information separate from other browser contexts.


  // Create two independent sessions
  const context1 = await browser.newContext(); // creates a new, isolated browser context and store in context1.
  const context2 = await browser.newContext(); // await waits for each context to be created before moving to the next statement.


  // Create a page in each session
  const page1 = await context1.newPage(); // creates a new tab/page in the first context.
  const page2 = await context2.newPage();


  await page1.goto('https://google.com'); // opens the website in the first page.
  await page2.goto('https://google.com');


  // Verify both pages
  await expect(page1).toHaveTitle(/Google/);
  await expect(page2).toHaveTitle(/Google/);
  

  // expect(page): checks the page.
  // toHaveTitle(/Google/): verifies the page title.

  // Close both sessions
  await context1.close(); // closes the first context and its pages.
  await context2.close();
});