/*
File download handling
1. What is file download handling?
Suppose you are testing an application that has a Download Report button.

When you click it:
- A file gets downloaded.
- You need to verify that the download happened.
- You may need to check the file name.
- You may need to save the file at a particular location.
Playwright provides a special event called download to handle this.

2. Important methods:

          Method	                                       Purpose
page.waitForEvent('download')	             Waits for a file download to start
download.suggestedFilename()	             Gets the suggested file name
download.saveAs(path)	                     Saves the downloaded file at the specified path
download.path()	                             Gets the temporary file path
download.failure()	                         Checks whether the download failed
*/


const { test, expect } = require('@playwright/test');

test('Handle file download', async ({ page }) => {

    await page.goto('https://demoqa.com/upload-download');

    const downloadPromise = page.waitForEvent('download');

    await page.locator('#downloadButton').click();

    const download = await downloadPromise;

    console.log('Downloaded file:', download.suggestedFilename());

    //console.log('File path:', await download.path());

    await download.saveAs('D:\\Playwright_Trainning\\downloads\\sampleFile.jpeg');

});

// check with forword slash.