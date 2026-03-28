const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || undefined,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
  });
  const page = await browser.newPage();

  // A4 width at 96 DPI
  await page.setViewport({ width: 794, height: 1123, deviceScaleFactor: 1 });

  await page.goto('http://10.43.193.251', { waitUntil: 'networkidle0', timeout: 60000 });

  await page.emulateMediaType('screen');

  await page.evaluate(() => {
    document.documentElement.classList.remove('dark');
  });

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
        margin: 0 auto !important;
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
