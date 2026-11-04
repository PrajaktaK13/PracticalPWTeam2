/*
Test Hooks

1. What are hooks?
Imagine you are testing a Login module with five test cases:
- Valid login
- Invalid username
- Invalid password
- Empty username
- Empty password
For every test, you need to open the login page first.

Without hooks, you might write:
*/

const {test, expect}= require ('@playwright/test');
test('Valid Login', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/login');
    // Test steps
});

test('Invalid Username', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/login');
    // Test steps
});

test('Invalid Password', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/login');
    // Test steps
});
/*
Notice that we're repeating the same navigation step in every test.

Hooks solve this problem.
A hook is a special function that allows us to execute common setup or cleanup steps automatically
at specific points during test execution.

For example:
- Before every test: Open the login page.
- After every test: Perform cleanup.
- Before all tests: Prepare common resources.
- After all tests: Clean up common resources.

Four important Playwright hooks
Hook	                                  When does it execute?

beforeEach()	                            Before every test
afterEach()	                                 After every test
beforeAll()	                            Once before tests in a worker
afterAll()	                             Once after tests in a worker


Let's understand them individually.

beforeEach(): beforeEach() executes before every test in its scope.

Real-life example:

Suppose you visit a bank website to test different banking features. Before testing each feature, you need to log in.

Instead of writing login steps repeatedly, you can put them inside beforeEach().

Execution flow:

beforeEach()
Open login page -> Test 1: Valid Login -> beforeEach()       -> Test 2: Invalid Login -> beforeEach()   ->  Test 3: Empty Login
                                        Open login page again                         Open login page again

Syntax:

*/
test.beforeEach(async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/login');
});

/*


Here:
- test.beforeEach() defines the hook.
- async allows us to use asynchronous operations.
- { page } is a Playwright fixture.
- page.goto() opens the website.

*/

/*
afterEach()

Definition: afterEach() is a Playwright test hook that executes after every test case in its scope.

In TestNG, it is equivalent to @AfterMethod.

Real-life example:

Imagine you are testing three login scenarios:

1. Valid Login
2. Invalid Login
3. Empty Login

After each test, you may want to:
- Log a message.
- Capture a screenshot.
- Clear test data.
- Perform cleanup activities.

Instead of repeating these steps in every test, you can put them inside afterEach().

What happens if a test fails? Will afterEach() execute?

Yes! Playwright normally executes afterEach() even if the test fails, so cleanup activities can still happen.

However, if the test process or worker crashes unexpectedly, cleanup hooks cannot be guaranteed to run.

Also, you don't normally need to close the browser manually in afterEach() when using Playwright's
built-in page fixture.
*/

/*
Part 3: beforeAll()

Definition: beforeAll() is a Playwright hook that executes once before the tests in its scope run within a worker.

Real-life example

Imagine you are testing an e-commerce application with 5 test cases.

Before executing those tests, you need to:

- Create some common test data.
- Initialize a shared resource.
- Read test configuration.
- Prepare a common API client.

Instead of performing these activities before every test, you can execute them once using beforeAll().
*/

test.beforeAll(async () => {
    console.log('Executing before all tests');
});

/*
Notice something important: There is no { page } fixture here.

Why?

Because Playwright's built-in page fixture is created separately for each test. 
It is not available directly inside beforeAll().

Very important: Can we use page inside beforeAll()?

Consider this code:
test.beforeAll(async ({ page }) => {
    await page.goto('https://example.com');
});


Incorrect: This won't work because the built-in page fixture is test-scoped, not worker-scoped.

If you genuinely need a browser page in beforeAll(), you can create one manually:

*/

test.beforeAll(async ({ browser }) => {
    const page = await browser.newPage();

    await page.goto('https://example.com');

    await page.close();
});

/*

Here, browser is a built-in fixture that can be used in beforeAll(). 

Practical recommendation: 
Don't use beforeAll() just to open the same application URL for every test. 
Use beforeEach() for that. Let Playwright manage each test's page and context.


What is the difference between beforeEach() and beforeAll()?

- beforeEach() executes before every test in its scope.
- beforeAll() executes once per worker before tests in its scope.
- beforeEach() is commonly used for test-specific setup, whereas beforeAll() is used for common initialization.



Part 4: afterAll()
Definition: afterAll() is a Playwright hook that executes once after all tests in its scope 
have finished running within a worker.

Real-life example:

Suppose you are testing an e-commerce application.

Before testing, you initialize some common resources using beforeAll().

After all tests finish, you may want to:

- Close a manually created browser context.
- Delete temporary test data.
- Disconnect an API client.
- Release shared resources.

You can perform these activities inside afterAll().

2. Syntax

*/
test.afterAll(async () => {
    console.log('All tests completed');
});

/*
Just like beforeAll(), 
you cannot directly use the test-scoped page fixture here.
*/


// Ex:

test.describe('Login Module', () => {

    // Executes once before tests in this worker
    test.beforeAll(async () => {
        console.log('1. Before All: Initialize Login Module');
    });

    // Executes before every test
    test.beforeEach(async ({ page }) => {
        console.log('2. Before Each: Open Login Page');

        await page.goto('https://the-internet.herokuapp.com/login');
    });

    // Executes after every test
    test.afterEach(async () => {
        console.log('3. After Each: Test Completed');
    });

    // Executes once after tests in this worker
    test.afterAll(async () => {
        console.log('4. After All: Cleanup Login Module');
    });

    test('Valid Login', async ({ page }) => {
        console.log('Executing Valid Login');

        await page.locator('#username').fill('tomsmith');
        await page.locator('#password').fill('SuperSecretPassword!');
        await page.getByRole('button', { name: /Login/ }).click();

        await expect(page).toHaveURL(/secure/);
    });

    test('Invalid Login', async ({ page }) => {
        console.log('Executing Invalid Login');

        await page.locator('#username').fill('wronguser');
        await page.locator('#password').fill('wrongpassword');
        await page.getByRole('button', { name: /Login/ }).click();

        await expect(page.locator('#flash')).toContainText('Your username is invalid!');
    });

    test('Empty Login', async ({ page }) => {
        console.log('Executing Empty Login');

        await page.getByRole('button', { name: /Login/ }).click();

        await expect(page.locator('#flash')).toContainText('Your username is invalid!');
    });

});

