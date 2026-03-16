const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();
    await page.goto('https://connectme.biz/', { waitUntil: 'networkidle0' });

    // Extract root CSS variables for light mode
    const rootColors = await page.evaluate(() => {
        // Only fetch computed colors from the :root element
        const rootStyle = window.getComputedStyle(document.documentElement);

        // List of core color variables we are tracking locally
        const variables = [
            '--color-primary',
            '--color-primary-strong',
            '--color-primary-soft',
            '--color-secondary',
            '--color-accent',
            '--color-accent-soft',
            '--color-text-main',
            '--color-text-body',
            '--color-text-muted',
            '--color-text-dark',
            '--color-bg-white',
            '--color-bg-light',
            '--color-bg',
            '--color-surface-raised',
            '--color-border',
            '--color-border-strong'
        ];

        let result = {};
        variables.forEach(v => {
            let val = rootStyle.getPropertyValue(v).trim();
            if (val) {
                result[v] = val;
            }
        });

        return result;
    });

    console.log(JSON.stringify(rootColors, null, 2));

    await browser.close();
})();
