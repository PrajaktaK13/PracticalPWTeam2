/*
Test annotations are special instructions in Playwright that tell the test runner how to handle a particular test.

For example:

- Should this test execute?
- Should this test be skipped?
- Is this test expected to fail?
- Is this test not ready yet?
- Does this test need more execution time?

Think of annotations as instructions or labels that control test execution.

Types of Playwright annotations:

Annotation	                                 Meaning
test.only()	                    Execute only the selected test
test.skip()	                              Skip the test
test.fail()	                        Expect the test to fail
test.fixme()	                  Mark a test as not ready to run
test.slow()	                  Give the test 3 times its normal timeout

Defination:
       Test annotations in Playwright are used to provide additional instructions or metadata to tests, controlling
 their execution behavior, such as skipping, focusing, expecting failures, or increasing timeout."

Memory trick:
- only = Run this one.
- skip = Don't run.
- fail = Failure is expected.
- fixme = Not ready.
- slow = Needs more time.
*/

// test only()
const { test, expect } = require('@playwright/test');

test('Test 1 - Login', async ({ page }) => {          // Not executed
    console.log('Executing Test 1');
});

test.only('Test 2 - Registration', async ({ page }) => { // Executed
    console.log('Executing Test 2');
});

test('Test 3 - Logout', async ({ page }) => {            // Not executed
    console.log('Executing Test 3');
});

/*
Important points:

- test.only() is useful when debugging a particular test.
- You can also use test.describe.only() to focus on one test suite.
- Never commit or push code with .only() accidentally left in it. It can cause other tests to be ignored in CI.
*/


// test.skip()

/*
test.skip() tells Playwright to skip a test without executing it.

For example, suppose your application has three features:
- Login – Implemented.
- Registration – Implemented.
- Forgot Password – Not implemented yet.

You don't want the Forgot Password test to execute until the feature is ready. So you use test.skip().
*/

test('Forgot Password', async ({ page }) => {
    test.skip();
    console.log("Test skipped");
});// test get skipped.


// skip the test with reason
test('Forgot Password with reason', async ({ page }) => {

    test.skip(true, 'Feature is not implemented yet');

    await page.goto('https://the-internet.herokuapp.com/login');

});

//Skip a test based on a condition

test('Browser-specific test', async ({ page, browserName }) => {

    test.skip(browserName !== 'chromium', 'This test runs only in Chromium');

    await page.goto('https://example.com');

});


// test fail():

/*
test.fail() tells Playwright that the test is expected to fail.

Imagine your application has a known bug:
- You enter an invalid username.
- The application should display an error message.
- But due to a bug, it displays a success message.
You still want to execute this test and track the bug. You can use test.fail().
*/

test('Invalid Login', async ({ page }) => {

    test.fail();

    await page.goto('https://the-internet.herokuapp.com/login');

    await page.locator('#username').fill('tomsmith123');
    await page.locator('#password').fill('SuperSecretPassword!');

    await page.getByRole('button', { name: /Login/ }).click();

    await expect(page.locator('#flash'))
        .toContainText('You logged into a secure area!');
});// Here test passed as failure is exepcted.

/*
Understand the three possible situations
Situation	                          Playwright result
Test fails as expected	           Expected failure (passed)
Test passes unexpectedly	        Unexpected pass (failed)
Test is skipped separately	                Skipped

Important: test.fail() does not skip the test. It executes the test and expects it to fail.

Definition:
"test.fail() is a Playwright annotation used to mark a test as expected to fail. If the test fails, 
it is treated as expected; if it passes, Playwright reports an unexpected pass."
*/


// test.fixme()

/*
test.fixme() is used when a test is not ready to execute because of an unresolved issue or incomplete 
implementation.
*/

test('Payment functionality', async ({ page }) => {

    test.fixme(true, 'Payment feature is not ready');

    await page.goto('https://example.com');

});


//test.slow()

/*
Sometimes a test takes longer than usual to execute.

For example:
- Uploading a large file.
- Downloading a large report.
- Processing 1,000 records.
- Waiting for a slow API response.

In such cases, we can use test.slow().*/

test('Large file upload', async ({ page }) => {

    test.slow();

    await page.goto('https://playwrightlab.github.io/');

    const fileInput = page.locator('#uploadBrowseLabel');

    const filePaths = [
        'D:\\Playwright_Trainning\\sample.txt',
        'D:\\Playwright_Trainning\\sample1.txt',
    ];

    await fileInput.setInputFiles(filePaths);
    await expect(page.locator('.file-item')).toHaveCount(2);

});