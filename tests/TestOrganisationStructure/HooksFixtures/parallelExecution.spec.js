/*
Hooks Behaviour in Parallel Execution:

1. First, understand two important concepts
Playwright supports two common ways of running tests in parallel:

1. Normal parallel execution.
2. Fully parallel execution (fullyParallel: true).

Let's understand the difference.
A. Normal parallel execution
Suppose your test file contains:
test.describe('Login Module', () => {

    test('Test 1', async ({ page }) => {});
    test('Test 2', async ({ page }) => {});
    test('Test 3', async ({ page }) => {});

});

test.describe('Dashboard Module', () => {

    test('Test 4', async ({ page }) => {});
    test('Test 5', async ({ page }) => {});
    test('Test 6', async ({ page }) => {});

});


By default, Playwright runs tests within a describe group sequentially,
 but different files can run in parallel.

 For example, if the tests are in separate files:
Normal parallel execution:

Worker 1                        Worker 2
File 1                           File 2
Test 1                           Test 4
Test 2                           Test 5
Test 3                           Test 6  


In this case:

- Worker 1 executes File 1.
- Worker 2 executes File 2.
- Tests within each file normally execute sequentially.

B. Fully parallel execution:

Now imagine your Playwright configuration contains:
fullyParallel: true


This allows individual tests, including tests inside the same file or describe block, to execute in parallel.

For example:
Fully parallel execution
Worker 1                     Worker 2
Test 1                        Test 2
Test 3                        Test 4
Test 5                        Test 6

Notice that tests from the same file can now be distributed between workers.

2. How do hooks behave in normal parallel execution?
Suppose you have:
- One test file.
- One describe block.
- Six tests.
- Two workers.
- fullyParallel: false (the default).
The six tests in that file are normally executed sequentially by one worker.

Assuming no retries or worker restarts:
Hook	              Executions
beforeAll()               1
beforeEach()	          6
afterEach()	              6
afterAll()	              1

Important: Even though you configured two workers, this particular file's tests 
are not split between them in normal mode.

The second worker may execute another test file.


3. How do hooks behave with fullyParallel: true?

Now change your configuration:
fullyParallel: true,
workers: 2


Suppose you have six tests inside one describe block.

Playwright can distribute those tests across two workers.

Assuming each worker runs three tests and there are no worker restarts:
Hook	              Worker 1	     Worker 2	Total
beforeAll()	            1	             1	      2
beforeEach()	        3	             3	      6
afterEach()	            3	             3	      6
afterAll()	            1	             1	      2

The key point:

beforeAll() and afterAll() execute once per worker for their applicable scope, not once globally.

Important interview concept:
A describe block does not guarantee that its beforeAll() will execute only once across all workers.
*/


const { test, expect } = require('@playwright/test');

test.describe('Parallel Hooks Demo', () => {

    test.describe.configure({ mode: 'parallel' })

    test.beforeAll(async ({}, testInfo) => {
        console.log(
            `BEFORE ALL - Worker: ${testInfo.workerIndex}`
        );
    });

    test.beforeEach(async ({ page }, testInfo) => {
        console.log(
            `BEFORE EACH - ${testInfo.title} - Worker: ${testInfo.workerIndex}`
        );

        await page.goto('https://the-internet.herokuapp.com/login');
    });

    test.afterEach(async ({}, testInfo) => {
        console.log(
            `AFTER EACH - ${testInfo.title} - Worker: ${testInfo.workerIndex}`
        );
    });

    test.afterAll(async ({}, testInfo) => {
        console.log(
            `AFTER ALL - Worker: ${testInfo.workerIndex}`
        );
    });

    for (let i = 1; i <= 6; i++) {

        test(`Test ${i}`, async ({ page }) => {

            await expect(page.locator('#username')).toBeVisible();

        });

    }

});


/*
test.describe.configure({ mode: 'parallel' })?
There is also a third option.

Suppose your configuration is:
fullyParallel: false,
workers: 2,


But you want only one particular describe block to run in parallel.

You can write:

*/
// test.describe('Login Tests', () => {

//    // test.describe.configure({ mode: 'parallel' });

//     test('Test 1', async ({ page }) => {
//        console.log("Test1");
//     });

//     test('Test 2', async ({ page }) => {
//         console.log("Test2");
//     });

//     test('Test 3', async ({ page }) => {
//         console.log("Test3");
//     });
// });

/*
This allows tests in that describe block to execute in parallel, without enabling 
fully parallel execution for the entire project.

One important detail: in a parallel describe block, each test runs in its own worker process, 
and beforeAll/afterAll hooks can run separately for each test.
 This differs from the worker grouping you observed with fullyParallel: true.


 Complete comparison table:

Feature	                     fullyParallel: false	       fullyParallel: true	               Describe parallel
Scope	                          File level	               Test level	                  Selected describe block
Different files parallel?	         Yes	                        Yes	                      Yes, subject to scheduling
Same file tests parallel?	     Normally no	                    Yes	                    Only configured describe
Selective parallelism?	             No	                         No, global	                       Yes
Execution order	             Sequential within file	           Not guaranteed	     Not guaranteed within parallel describe
Default describe behaviour	     Sequential	                      Parallel	                       Configurable


3. Important hooks difference:

This is particularly important for your current Hooks and Fixtures syllabus.

Hook	           Normal mode	                      Fully parallel	         Parallel describe
beforeEach	   Before every test	                 Before every test	         Before every test
afterEach	    After every test	                   After every test	          After every test
beforeAll	Once per worker for suite	        Once per worker for suite	Before each test in that parallel describe
afterAll	Once per worker for suite	         Once per worker for suite	After each test in that parallel describe

These counts assume no worker restarts or retries.

4. My recommendation for remembering:

Normal parallel
File level
Different files execute in parallel.


Fully parallel
Test level
Individual tests can execute in parallel throughout the project.


Describe parallel
Selected block
You choose which describe block executes in parallel.


One important rule for all three: workers: 2 means at most two tests can execute simultaneously, regardless of how many tests are eligible for parallel execution.

5. 
"What is the difference between fullyParallel and describe parallel mode?"

answer:

"By default, Playwright runs test files in parallel, 
but tests within the same file execute sequentially. 
With fullyParallel: true, individual tests can run in parallel, including tests from the same file.
With test.describe.configure({ mode: 'parallel' }), we can selectively 
enable parallel execution for a particular describe block without enabling it globally."
*/