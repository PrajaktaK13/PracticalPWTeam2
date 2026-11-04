/*1: Launching Different Browsers:

1. What does launching different browsers mean?
Simple definition: Playwright allows us to run our automated tests in different 
browsers to check whether our application works correctly across them. 

2. Which browsers does Playwright support?
Chromium:
The browser engine used by Google Chrome and other Chromium-based browsers.
Playwright's Chromium project is commonly used to test Chrome-like behavior. 

Firefox:
A browser with its own engine. 
Testing in Firefox helps identify compatibility issues specific to Firefox.

WebKit:
The browser engine associated with Safari. 
Playwright's WebKit project helps test Safari-related compatibility, 
although it does not guarantee identical behavior in every Safari version. 


Remember: Chromium, Firefox, and WebKit are browser engines/projects.
you can test with in Playwright. They are not all browser names.*/


const { test, chromium, firefox, webkit } = require('@playwright/test');

// can check the browser option in test itself.

test('Launch Firefox directly', async () => {
  const browser = await firefox.launch({ headless: false });
  const page = await browser.newPage();

  await page.goto('https://google.com');

  console.log(await page.title());

  await browser.close();
});

test('Launch Chromium directly',async() => {
  const browser = await chromium.launch({ headless: false });

  const page = await browser.newPage();

  await page.goto("https://www.gmail.com");

  await browser.close();
})


test('Launch webkit directly',async ()=>{
  const browser = await webkit.launch();

   const context = await browser.newContext();

  const page = await context.newPage();

  await page.goto("https://www.gmail.com");

  await browser.close();
})

/*
Browser	Command:
Chromium-	npx playwright test --project=chromium
Firefox-	npx playwright test --project=firefox
WebKit-	npx playwright test --project=webkit
*/
