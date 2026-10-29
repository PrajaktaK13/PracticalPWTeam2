/*
What is a timeout?
A timeout is the maximum time Playwright waits for an operation to complete before reporting a failure.

await page.getByText('Welcome').waitFor({
    state: 'visible',
    timeout: 5000
});

Playwright waits up to 5 seconds for the text to become visible. If it appears earlier, execution continues immediately.
Types of timeouts:

Timeout	                                      What it controls
Test timeout	                       Maximum duration of a test
Action timeout	                  Maximum time for actions such as click()
Assertion timeout	           Maximum time for an assertion such as toBeVisible()
Navigation timeout	        Maximum time for navigation operations such as page.goto()
*/