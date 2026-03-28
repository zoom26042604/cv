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

  await page.evaluateOnNewDocument(() => {
    localStorage.setItem('cv-theme', 'light');
  });

  await page.setViewport({ width: A4_WIDTH_PX, height: A4_HEIGHT_PX, deviceScaleFactor: 1 });

  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0', timeout: 60000 });

  await page.emulateMediaType('screen');

  await page.evaluate(() => {
    document.documentElement.classList.remove('dark');
    localStorage.setItem('cv-theme', 'light');
  });

  // Calcule le zoom CSS pour tenir sur une seule page A4
  const contentHeight = await page.evaluate(() => {
    const el = document.getElementById('cv-content');
    return el ? el.scrollHeight : document.body.scrollHeight;
  });

  const zoom = contentHeight > A4_HEIGHT_PX
    ? Math.round((A4_HEIGHT_PX / contentHeight) * 100) / 100
    : 1;

  console.log(`Hauteur contenu: ${contentHeight}px, A4: ${A4_HEIGHT_PX}px, zoom: ${zoom}`);

  await page.addStyleTag({
    content: `
      html, body {
        background: #ffffff !important;
        margin: 0 !important;
        padding: 0 !important;
      }
      .cv-container {
        padding: 0 !important;
        margin: 0 !important;
      }
      .cv-paper {
        width: 210mm !important;
        max-width: none !important;
        margin: 0 !important;
        box-shadow: none !important;
        border-radius: 0 !important;
        zoom: ${zoom} !important;
        transform-origin: top left !important;
      }
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
