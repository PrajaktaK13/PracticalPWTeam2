/*
File upload handling means uploading a file from your computer to a website using Playwright automation.

Real-life example: On a registration form, you click Choose File,
 select your resume, and upload it. Playwright can automate this process.
*/


const { test, expect } = require('@playwright/test');

test('File upload test', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/upload');

    const filePath = ('sample.txt');

    await page.pause();

    const fileInput = page.locator('#file-upload');

    await page.pause();

    await fileInput.setInputFiles(filePath);
    await page.pause();

    await page.locator('#file-submit').click();
    await page.pause();

    await expect(page.locator('h3')).toHaveText('File Uploaded!');
    await expect(page.locator('#uploaded-files')).toHaveText('sample.txt');
});

// multiple pages.


test('Multiple File upload test', async ({ page }) => {
    await page.goto('https://playwrightlab.github.io/');

const fileInput = page.locator('#uploadBrowseLabel');

const filePaths = [
    'D:\\Playwright_Trainning\\sample.txt',
    'D:\\Playwright_Trainning\\sample1.txt',    
];

await fileInput.setInputFiles(filePaths);
await expect(page.locator('.file-item')).toHaveCount(2);
});
