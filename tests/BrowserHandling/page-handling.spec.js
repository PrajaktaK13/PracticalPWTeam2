/*
What is a Page?
-> A page represents a browser tab where you can open a website and interact with its elements.

Page handling :is the process of creating, navigating, and managing browser tabs or pages during 
automated testing. Playwright supports multiple pages within a browser context, which is useful 
for testing new tabs, pop-ups, and multi-page workflows.  */

// Create and use multiple pages
const { test, expect } = require('@playwright/test');

// test('Handle multiple pages', async ({ context }) => {
//   const page1 = await context.newPage();
//   const page2 = await context.newPage();

//   await page1.goto('https://google.com');
//   await page2.goto('https://gmail.com');

//   console.log(await page1.title());
//   console.log(await page2.title());
//   console.log(page1.viewportSize());

//   await expect(page1).toHaveTitle(/Google/);
//   await expect(page2).toHaveTitle(/Gmail/);
// });

// difference between page, context, browser.


// test('Browser context and page', async ({ browser }) => {
//   const context = await browser.newContext(); // creates an isolated session.
//   const page = await context.newPage();  // creates a tab in that session.

//   await page.goto('https://example.com'); // navigates that tab to a URL.

//   await context.close();  //closes the context and its pages.
// });
// navgate to different page from first page link.


test('Handle a new browser window', async ({ page, context }) => {
  await page.goto('https://the-internet.herokuapp.com/windows');

  // Wait for the new page before clicking the link
  const newPagePromise = context.waitForEvent('page');

  await page.getByText('Click Here').click();

  const newPage = await newPagePromise;

  await newPage.waitForLoadState();

  await expect(newPage).toHaveTitle('New Window');

  await newPage.close();
    await page.getByText('Click Here').click();
});


// page methods(naviagate etc).
// test('Practice page navigation commands', async ({ page }) => {

//   // 1. Open the first website
//   await page.goto('https://example.com');
//   console.log('First URL:', page.url());

//   // 2. Navigate to another website
//   await page.goto('https://playwright.dev');
//   console.log('Second URL:', page.url());
//   await page.pause();

//   // 3. Go back to the previous page
//   await page.goBack();
//   console.log('After going back:', page.url());
//   await page.pause();

//   // 4. Go forward again
//   await page.goForward();
//   console.log('After going forward:', page.url());
//   await page.pause();

  // 5. Reload the current page
  // await page.reload();
  // await page.pause();

  // 6. Get the page title
//   console.log('Page title:', await page.title());

// });


// close the tabs.


// test('Close one tab', async ({ context }) => {

//   const page1 = await context.newPage();
//   const page2 = await context.newPage();

//   await page1.goto('https://example.com');
//   await page2.goto('https://playwright.dev');
//   await page1.pause();
//   await page2.pause();

//   // Close only the second tab
//   await page2.close(); 
//   // First tab is still available
//   await expect(page1).toHaveTitle('Example Domain');
//    await page1.pause();




 //});

 // close the session
 test('close the session', async ({browser})=>{
   const context = await browser.newContext();
   const page1 = await context.newPage();
   const page2 = await context.newPage();
  
   // Close the context and all its pages
   await context.close();
   await page1.pause();
 });

/*
Command	Result
await page1.close()	Closes only page1
await page2.close()	Closes only page2
await context.close()	Closes the context and all its pages
*/

/* browser configuration:
grant permissions passed in test or in browser configartion
camera permisisons and locale
// Disables browser push notifications
*/
