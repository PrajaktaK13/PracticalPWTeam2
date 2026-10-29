/*
What is test stability?

A stable test produces consistent results when the application behaves as expected. 
It should not pass sometimes and fail other times for no genuine reason.

For example, if your login test passes five times and randomly fails on the sixth run without an application defect,
it may be a flaky test.

For stability following points should remember:

1. Use auto-waiting instead of fixed waits:

     Avoid:
await page.waitForTimeout(5000);
await page.getByRole('button', { name: 'Login' }).click();


     Prefer:
await page.getByRole('button', { name: 'Login' }).click();

Playwright automatically waits for the button to become actionable

2. Use reliable locators:
     Prefer user-facing locators such as getByRole(), getByLabel(), and getByTestId().
  
     const loginButton = page.getByRole('button', {
    name: 'Login'
});
await loginButton.click();

Avoid fragile selectors that depend on changing CSS classes or deeply nested DOM structures.


3. Use assertions to verify results:
   Don't just click a button and assume it worked.

await page.getByRole('button', { name: 'Login' }).click();
await expect(
    page.getByText('Login successful')
).toBeVisible();

This verifies the expected outcome.

4. Keep tests independent:

Each test should be able to run independently of other tests.

For example, don't make Test 2 depend on Test 1 having already logged in. Set up the required state for each test,
 using appropriate fixtures or setup methods.


5. Avoid hard-coded assumptions:

Don't assume an element will always appear within one second or that a list will always contain 
exactly five items unless the application requirements guarantee it.

Wait for the required condition and assert the expected behavior.

6. Use appropriate timeouts:

Don't increase every timeout whenever a test fails. First investigate the cause: a slow application,
 a wrong locator, a failed network request, or an actual defect.

7. Use Playwright's debugging tools:

When a test fails, use:
- Screenshots to inspect the page.
- Trace Viewer to review actions, DOM snapshots, and errors.
- HTML reports to identify the failed test and assertion.
These help you identify the real cause instead of adding arbitrary waits.

Quick revision:

Practice	                     Benefit
Auto-waiting	           Avoids unnecessary delays
Reliable locators	       Reduces locator failures
Assertions	               Confirms actual behavior
Independent tests	       Prevents order-dependent failures
Appropriate timeouts	   Avoids premature or excessively late failures
Debugging tools	           Helps identify root causes
*/