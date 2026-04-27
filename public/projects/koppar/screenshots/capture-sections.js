const { chromium } = require('C:/Users/maxam/AppData/Roaming/npm/node_modules/@playwright/mcp/node_modules/playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });

  const base = 'http://localhost:4321';
  const out  = 'c:/Users/maxam/OneDrive/Bilder/Nordic icon/System/projects/koppar-halmstad-PRO/screenshots';

  async function snap(url, selector, filename) {
    await page.goto(url, { waitUntil: 'networkidle' });
    await page.waitForTimeout(1500);
    if (selector) {
      await page.evaluate((sel) => {
        const el = document.querySelector(sel);
        if (el) el.scrollIntoView({ behavior: 'instant', block: 'center' });
      }, selector);
      await page.waitForTimeout(1200);
    }
    await page.screenshot({ path: path.join(out, filename) });
    console.log('done: ' + filename);
  }

  await snap(base + '/index.html', null,                'v2-01-hero.png');
  await snap(base + '/index.html', '#om-koppar',        'v2-02-intro.png');
  await snap(base + '/index.html', '#meny',             'v2-03-menu.png');
  await snap(base + '/index.html', '#rostningen',       'v2-04-process.png');
  await snap(base + '/index.html', '.editorial-break',  'v2-05-editorial.png');
  await snap(base + '/index.html', '.stats',            'v2-06-stats.png');
  await snap(base + '/index.html', '.testimonials',     'v2-07-testimonials.png');
  await snap(base + '/index.html', '.cta-section',      'v2-08-cta.png');
  await snap(base + '/index.html', '.footer',           'v2-09-footer.png');
  await snap(base + '/menu.html',  null,                'v2-10-menu-page.png');
  await snap(base + '/about.html', null,                'v2-11-about-hero.png');
  await snap(base + '/about.html', '#rostningen',       'v2-12-about-roastery.png');
  await snap(base + '/contact.html', null,              'v2-13-contact.png');
  await snap(base + '/contact.html', '#boka',           'v2-14-booking.png');

  await page.setViewportSize({ width: 375, height: 812 });
  await snap(base + '/index.html', null,                'v2-15-mobile-hero.png');
  await snap(base + '/index.html', '.cta-section',      'v2-16-mobile-cta.png');

  await browser.close();
  console.log('All done.');
})();
