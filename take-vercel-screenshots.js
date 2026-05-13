/**
 * Takes hero screenshots from live Vercel deployments for projects that need card images.
 * Saves to /public/images/{slug}-card.png
 */

const { chromium } = require('playwright');
const path = require('path');

const OUT = path.resolve(__dirname, 'public/images');

const projects = [
  {
    slug: 'lundgren',
    url: 'https://lundgren-fastigheter-malmo-lm9d4m3iy.vercel.app',
    out: 'lundgren-card.png',
  },
  {
    slug: 'sedin',
    url: 'https://sedin-hotel-g8hc7jihn-helloworkstore-4812s-projects.vercel.app',
    out: 'sedin-card.png',
  },
  {
    slug: 'viken-golf-club',
    url: 'https://nordic-icon-viken-golf-club-1yel3uxdd.vercel.app',
    out: 'viken-golf-club-card.png',
  },
];

(async () => {
  const browser = await chromium.launch();

  for (const p of projects) {
    const page = await browser.newPage();
    await page.setViewportSize({ width: 1400, height: 900 });
    console.log(`Screenshotting ${p.slug}: ${p.url}`);
    await page.goto(p.url, { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(2000);

    const dest = path.join(OUT, p.out);
    await page.screenshot({
      path: dest,
      clip: { x: 0, y: 0, width: 1400, height: 700 },
    });
    console.log(`  → ${dest}`);
    await page.close();
  }

  await browser.close();
  console.log('\nKlart!');
})();
