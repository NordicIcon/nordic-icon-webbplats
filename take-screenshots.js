/**
 * Takes screenshots of project HTML files for:
 *  - project card images (/public/images/*-card.png)
 *  - MacBook mockup image (/public/images/koppar-desktop.png)
 *  - iPhone mockup image (/public/images/koppar-mobile.jpg)
 */

const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const BASE = path.resolve(__dirname, 'public/projects');
const OUT  = path.resolve(__dirname, 'public/images');

const projects = [
  { slug: 'koppar',       file: 'index.html' },
  { slug: 'havets',       file: 'index.html' },
  { slug: 'strand-studio',file: 'index.html' },
  { slug: 'lindqvist-vvs',file: 'index.html' },
];

(async () => {
  const browser = await chromium.launch();

  // ── Card screenshots (1400×900, crop top 700px → saves as 1400×700) ─────────
  for (const p of projects) {
    const page = await browser.newPage();
    await page.setViewportSize({ width: 1400, height: 900 });
    const url = `file:///${BASE}/${p.slug}/${p.file}`.replace(/\\/g, '/');
    console.log(`Card: ${p.slug}…`);
    await page.goto(url, { waitUntil: 'networkidle', timeout: 15000 });
    await page.waitForTimeout(800);

    // Crop just the hero area for the card thumbnail
    const dest = path.join(OUT, `${p.slug}-card.png`);
    await page.screenshot({
      path: dest,
      clip: { x: 0, y: 0, width: 1400, height: 700 },
    });
    console.log(`  → ${dest}`);
    await page.close();
  }

  // ── MacBook desktop screenshot (Koppar, 1440×900) ──────────────────────────
  {
    const page = await browser.newPage();
    await page.setViewportSize({ width: 1440, height: 900 });
    const url = `file:///${BASE}/koppar/index.html`.replace(/\\/g, '/');
    console.log('MacBook mockup: koppar desktop…');
    await page.goto(url, { waitUntil: 'networkidle', timeout: 15000 });
    await page.waitForTimeout(800);
    const dest = path.join(OUT, 'koppar-desktop.png');
    await page.screenshot({ path: dest });
    console.log(`  → ${dest}`);
    await page.close();
  }

  // ── iPhone mobile screenshot (Koppar, 390×844) ─────────────────────────────
  {
    const page = await browser.newPage();
    await page.setViewportSize({ width: 390, height: 844 });
    const url = `file:///${BASE}/koppar/index.html`.replace(/\\/g, '/');
    console.log('iPhone mockup: koppar mobile…');
    await page.goto(url, { waitUntil: 'networkidle', timeout: 15000 });
    await page.waitForTimeout(800);
    const dest = path.join(OUT, 'koppar-mobile.jpg');
    await page.screenshot({ path: dest });
    console.log(`  → ${dest}`);
    await page.close();
  }

  await browser.close();
  console.log('\nKlart!');
})();
