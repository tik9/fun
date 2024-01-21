import puppeteer from 'puppeteer-core'

(async () => {
    console.log(1)

    const browser = await puppeteer.launch({
        executablePath: '/opt/homebrew/bin/chromium',
    });
    const page = await browser.newPage();

    await page.goto('https://github.com');

    await page.screenshot({ path: 'screenshot.png' });
    browser.close();
    console.log(2)
})()