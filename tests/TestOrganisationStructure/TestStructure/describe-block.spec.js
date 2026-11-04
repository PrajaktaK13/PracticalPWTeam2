/*
What is a describe block?
A test.describe() block is used to group related test cases together.

Imagine you are testing an application with three modules:
- Login
- User Management
- Product Management

Instead of writing all test cases separately, we can group them module-wise.
The describe block gives a logical structure to your test suite.

Important points:

- test.describe() groups related tests.
- You can create multiple describe blocks in one test file.
- You can place multiple test cases inside one describe block.
- Describe blocks can also be nested.
- Grouping tests does not automatically make them execute sequentially.

Definition:

test.describe() is a Playwright Test method used to group related test cases into logical suites, 
making tests easier to organize, maintain, and execute.
*/


const { test, expect } = require('@playwright/test');

test.describe('Login Module', () => {
    test('Valid Login', async ({ page }) => {
        console.log('Executing Valid Login test....');
        page.goto("https://the-internet.herokuapp.com/login");
        await page.locator('#username').fill("tomsmith");
        await page.locator('#password').fill("SuperSecretPassword!");
        await page.getByRole('button', {name: ' Login'}).click();
        await expect(page).toHaveURL(/secure/);
        
    });

    test('Invalid Login', async ({ page }) => {        
        console.log('Executing Invalid Login test...');
        await page.goto("https://the-internet.herokuapp.com/login");
        await page.locator('#username').fill("tomsmith123");
        await page.locator('#password').fill("SuperSecretPassword");
        await page.getByRole('button', {name: ' Login'}).click();
        await expect(page).toHaveURL(/login/);
    });
});

// nested ex

