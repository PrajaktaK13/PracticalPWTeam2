/*
Test tagging means assigning labels to tests so that we can identify and execute specific groups of tests.

Imagine your DAM application has 100 test cases:

- 20 Smoke tests
- 40 Regression tests
- 25 Sanity tests
- 15 Critical tests

Instead of executing all 100 tests, you can execute only Smoke tests or Regression tests using tags.
Playwright supports tags using the tag option.
*/


const { test, expect } = require('@playwright/test');

test('Valid Login', {
    tag: '@smoke'
}, async ({ page }) => {

    await page.goto('https://the-internet.herokuapp.com/login');   

});

test('Invalid Login', {
    tag: '@regression'
}, async ({ page }) => {

    await page.goto('https://the-internet.herokuapp.com/login');    

});

// Tag an entire describe block

// Instead of adding tags to every test individually, you can tag the complete test suite.
test.describe('Login Module', { tag: '@smoke' }, () => {

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

/*
1. Basic tagging commands
Purpose	                                         Command
Run all tests	                           npx playwright test
Run Smoke tests	                    npx playwright test --grep "@smoke"
Run Regression tests	           npx playwright test --grep "@regression"
Run Sanity tests	                 npx playwright test --grep "@sanity"
Exclude Smoke tests	              npx playwright test --grep-invert "@smoke"

2. Combining tags
Purpose	                                          Command
Smoke OR Regression	            npx playwright test --grep "@smoke\|@regression"
Smoke AND Regression	        npx playwright test --grep "(?=.*@smoke)(?=.*@regression)"
Exclude Smoke OR Regression	    npx playwright test --grep-invert "@smoke\|@regression"

3. Execute tagged tests from a particular file
Purpose	                                           Command
All tests in a file	            npx playwright test "path/to/file.spec.js"
Smoke tests in a file	        npx playwright test "path/to/file.spec.js" --grep "@smoke"
Regression tests in a file	    npx playwright test "path/to/file.spec.js" --grep "@regression"
Exclude Smoke in a file	        npx playwright test "path/to/file.spec.js" --grep-invert "@smoke"
*/