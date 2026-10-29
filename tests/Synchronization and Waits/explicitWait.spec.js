/*
An explicit wait means telling Playwright to wait for a specific condition before continuing.

For example, wait until a success message appears after clicking Submit.

waitForTimeout()?
It makes Playwright pause for a fixed amount of time.

Explicit wait	                                             Fixed wait
Waits for a specific condition	                       Waits for a fixed duration
Continues as soon as the condition is satisfied	       Waits for the full duration
Usually preferred in automation	                   Can make tests slow or unreliable

Interview tip: Prefer condition-based waits over fixed delays. Playwright already provides auto-waiting for 
many actions and assertions, so add explicit waits only when you need to wait for a particular state.
*/

const {test, expect}= require ('@playwright/test');

test('explicit wait test', async({page})=>{
    await page.goto("https://the-internet.herokuapp.com/dynamic_controls");

    const enableButton= page.getByRole('button',{name:'Enable'});
    await enableButton.click();
    const message= page.locator("#message");

    await message.waitFor({
        state:'visible',
        timeout:5000
    });

    await expect(message).toBeVisible();
});