/**
 * Takes hero screenshots from local static exports for card images.
 * Crop ratio: 1400×933 (3:2) to match .cardImage { aspect-ratio: 3/2 }
 */

const { chromium } = require('playwright');
const path = require('path');
const http = require('http');
const fs = require('fs');

const BASE = path.resolve(__dirname, 'public');
const OUT  = path.resolve(__dirname, 'public/images');

// Simple static file server for the public folder
function startServer(root, port) {
  return new Promise((resolve) => {
    const server = http.createServer((req, res) => {
      let filePath = path.join(root, decodeURIComponent(req.url.split('?')[0]));
      if (filePath.endsWith('/')) filePath += 'index.html';

      const ext = path.extname(filePath).toLowerCase();
      const mime = {
        '.html': 'text/html', '.css': 'text/css', '.js': 'application/javascript',
        '.png': 'image/png', '.jpg': 'image/jpeg', '.mp4': 'video/mp4',
        '.svg': 'image/svg+xml', '.ico': 'image/x-icon', '.woff2': 'font/woff2',
      }[ext] || 'application/octet-stream';

      try {
        const data = fs.readFileSync(filePath);
        res.writeHead(200, { 'Content-Type': mime });
        res.end(data);
      } catch {
        res.writeHead(404);
        res.end('Not found');
      }
    });
    server.listen(port, () => resolve(server));
  });
}

const projects = [
  { slug: 'lundgren', out: 'lundgren-card.png' },
  { slug: 'sedin',    out: 'sedin-card.png' },
  { slug: 'viken-golf-club', out: 'viken-golf-club-card.png' },
];

(async () => {
  const PORT = 7331;
  const server = await startServer(BASE, PORT);
  const browser = await chromium.launch({
    args: ['--autoplay-policy=no-user-gesture-required'],
  });

  for (const p of projects) {
    const page = await browser.newPage();
    await page.setViewportSize({ width: 1400, height: 940 });
    const url = `http://localhost:${PORT}/projects/${p.slug}/index.html`;
    console.log(`Card: ${p.slug}`);
    try {
      await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });

      // Force all videos to load and show first frame
      await page.evaluate(async () => {
        const videos = Array.from(document.querySelectorAll('video'));
        await Promise.all(videos.map(v => new Promise(resolve => {
          v.muted = true;
          v.currentTime = 0;
          if (v.readyState >= 2) { resolve(); return; }
          v.addEventListener('loadeddata', resolve, { once: true });
          v.load();
        })));
      });

      await page.waitForTimeout(3000);

      const dest = path.join(OUT, p.out);
      await page.screenshot({
        path: dest,
        clip: { x: 0, y: 0, width: 1400, height: 933 },
      });
      console.log(`  → ${dest}`);
    } catch (e) {
      console.error(`  ERROR: ${e.message}`);
    }
    await page.close();
  }

  await browser.close();
  server.close();
  console.log('\nKlart!');
})();
