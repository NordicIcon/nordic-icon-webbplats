/**
 * Takes hero screenshots from local static exports (file://) for card images.
 * Fixes Vercel-auth problem with take-vercel-screenshots.js.
 */

const { chromium } = require('playwright');
const path = require('path');

const BASE = path.resolve(__dirname, 'public/projects');
const OUT  = path.resolve(__dirname, 'public/images');

const projects = [
  { slug: 'lundgren', out: 'lundgren-card.png' },
  { slug: 'sedin',    out: 'sedin-card.png' },
];

(async () => {
  const browser = await chromium.launch();

  for (const p of projects) {
    const page = await browser.newPage();
    await page.setViewportSize({ width: 1400, height: 900 });
    const url = `file:///${BASE}/${p.slug}/index.html`.replace(/\\/g, '/');
    console.log(`Card: ${p.slug} → ${url}`);
    await page.goto(url, { waitUntil: 'networkidle', timeout: 20000 });
    await page.waitForTimeout(1200);

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
