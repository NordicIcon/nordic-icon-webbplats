const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 460, height: 940 });

  const url = `file:///${__dirname}/phone-mockup.html`.replace(/\\/g, '/');
  await page.goto(url, { waitUntil: 'networkidle', timeout: 10000 });
  await page.waitForTimeout(500);

  const dest = path.join(__dirname, 'public/images/nordic-icon-enhanced.png');
  await page.screenshot({
    path: dest,
    omitBackground: true,   // transparent background
  });

  console.log(`Saved → ${dest}`);
  await browser.close();
})();
