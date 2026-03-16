const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();
    await page.goto('https://connectme.biz/', { waitUntil: 'networkidle0' });

    // Extract highlight text color
    const highlightColor = await page.evaluate(() => {
        const el = document.querySelector('.highlight-text');
        if (!el) return null;
        const styles = window.getComputedStyle(el);
        return {
            color: styles.color,
            background: styles.background,
            webkitTextFillColor: styles.webkitTextFillColor
        };
    });

    // Extract Get Started button styles
    const btnPrimary = await page.evaluate(() => {
        // Look for a link containing 'Get Started'
        const links = Array.from(document.querySelectorAll('a'));
        const btn = links.find(l => l.textContent.includes('Get Started'));
        if (!btn) return null;
        const styles = window.getComputedStyle(btn);
        return {
            color: styles.color,
            backgroundColor: styles.backgroundColor,
            border: styles.border,
            borderRadius: styles.borderRadius,
            boxShadow: styles.boxShadow,
            padding: styles.padding,
            fontFamily: styles.fontFamily,
            fontSize: styles.fontSize,
            fontWeight: styles.fontWeight
        };
    });

    // Extract View Products button styles
    const btnSecondary = await page.evaluate(() => {
        const links = Array.from(document.querySelectorAll('a'));
        const btn = links.find(l => l.textContent.includes('View Products'));
        if (!btn) return null;
        const styles = window.getComputedStyle(btn);
        return {
            color: styles.color,
            backgroundColor: styles.backgroundColor,
            border: styles.border,
            borderRadius: styles.borderRadius,
            boxShadow: styles.boxShadow,
            padding: styles.padding,
            fontFamily: styles.fontFamily,
            fontSize: styles.fontSize,
            fontWeight: styles.fontWeight
        };
    });

    console.log("HIGHLIGHT:", highlightColor);
    console.log("PRIMARY BTN:", btnPrimary);
    console.log("SECONDARY BTN:", btnSecondary);

    await browser.close();
})();
