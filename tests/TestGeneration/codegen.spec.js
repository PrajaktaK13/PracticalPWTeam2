/* 

What is Codegen?
Simple definition: Codegen is a Playwright tool that records your browser interactions and generates Playwright code automatically.
Interview-ready definition: Playwright Codegen is a test-generation tool that observes user interactions with a browser and generates corresponding Playwright scripts and locators. It can also help generate assertions for verifying application behavior.
Real-life example:
Imagine you need to test a login page. Instead of writing every action manually, you open the website, enter the username and password, and click Login. Codegen records those actions and generates code for you.
2. How Codegen works
1. Run Codegen
Execute a command in the VS Code terminal.

2. Perform browser actions
Click buttons, enter text, navigate pages.

3. Generated code appears
Playwright creates code for your actions.

4. Refine and run your test
Add assertions, save the script, and verify the result.

Command used to start codegen: npx playwright codegen https://example.com

*/

//import { test, expect } from '@playwright/test';

// test('test', async ({ page }) => {
//   await page.goto('https://example.com/');
//   await page.goto('https://www.google.com/');
//   await page.getByRole('combobox', { name: 'Search' }).click();
//   await page.getByRole('combobox', { name: 'Search' }).fill('javascript tutorial');
// });

// const { test, expect } = require('@playwright/test');

// test('Open two pages', async ({ page, context }) => {
//   await page.goto('https://example.com/');

//   const page1 = await context.newPage();

//   await page1.goto('https://www.google.com/');
// });

// import { test, expect } from '@playwright/test';

// test('test', async ({ page }) => {
//   await page.goto('https://example.com/');
//   await page.goto('https://accounts.google.com/v3/signin/identifier?continue=https://mail.google.com/mail/u/0/&emr=1&followup=https://mail.google.com/mail/u/0/&osid=1&passive=1209600&service=mail&flowName=GlifWebSignIn&flowEntry=ServiceLogin&dsh=S2050431562:1791891194076636');
//   //await page.getByRole('textbox', { name: 'Email or phone' }).click();
//   //await page.getByRole('textbox', { name: 'Email or phone' }).dblclick();
//   await page.getByRole('textbox', { name: 'Email or phone' }).fill('test@test.com');
//   await page.getByRole('button', { name: 'Next' }).click();
//   await page.getByRole('textbox', { name: 'Enter your password' }).fill('Test@12345');
//   await page.getByRole('button', { name: 'Next' }).click();
// });



import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.google.com/');

  await expect(page).toHaveTitle(/Google/);
  
  await expect(page.getByRole('img', { name: 'Google' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Google Search' })).toBeVisible();
});