const puppeteer = require('puppeteer');
const path = require('path');

// A4 at 96 DPI : 210mm x 297mm
const A4_WIDTH_PX  = 794;
const A4_HEIGHT_PX = 1123;

(async () => {
  const browser = await puppeteer.launch({
    executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || undefined,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
  });
  const page = await browser.newPage();

  await page.setViewport({ width: A4_WIDTH_PX, height: A4_HEIGHT_PX, deviceScaleFactor: 1 });

  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0', timeout: 60000 });

  await page.emulateMediaType('screen');

  // Force light theme for PDF
  await page.evaluate(() => {
    document.documentElement.classList.remove('dark');
  });

  // Hide dev UI overlays
  await page.addStyleTag({
    content: `
      .no-print,
      nextjs-portal,
      next-route-announcer,
      [data-nextjs-dev-overlay],
      [data-nextjs-toast],
      [data-next-badge-root],
      [data-nextjs-dialog-overlay] {
        display: none !important;
        visibility: hidden !important;
      }
    `,
  });

  // Measure natural content height at A4 width
  const contentHeight = await page.evaluate(() => {
    const el = document.getElementById('cv-content');
    return el ? el.scrollHeight : document.body.scrollHeight;
  });

  const zoom = contentHeight > A4_HEIGHT_PX
    ? Math.round((A4_HEIGHT_PX / contentHeight) * 100) / 100
    : 1;

  // Paper width expanded so that after zoom it visually equals A4 width
  const paperWidthPx = zoom < 1 ? Math.round(A4_WIDTH_PX / zoom) : A4_WIDTH_PX;

  console.log(`Hauteur contenu: ${contentHeight}px, A4: ${A4_HEIGHT_PX}px, zoom: ${zoom}, paperWidth: ${paperWidthPx}px`);

  await page.addStyleTag({
    content: `
      html {
        zoom: ${zoom} !important;
      }
      html, body {
        background: #ffffff !important;
        margin: 0 !important;
        padding: 0 !important;
      }
      .cv-container {
        padding: 0 !important;
        margin: 0 !important;
        justify-content: flex-start !important;
      }
      .cv-paper {
        width: ${paperWidthPx}px !important;
        max-width: none !important;
        margin: 0 !important;
        box-shadow: none !important;
        border-radius: 0 !important;
      }
    `,
  });

  const outputPath = path.join(__dirname, '../public/cv.pdf');

  await page.pdf({
    path: outputPath,
    printBackground: true,
    format: 'A4',
    margin: { top: '0px', right: '0px', bottom: '0px', left: '0px' },
  });

  await browser.close();
  console.log('cv.pdf genere dans public/');
})();
