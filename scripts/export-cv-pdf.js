const puppeteer = require('puppeteer');
const path = require('path');

const A4_WIDTH_PX  = 794;
const A4_HEIGHT_PX = 1123;

(async () => {
  const browser = await puppeteer.launch({
    executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || undefined,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
  });
  const page = await browser.newPage();

  await page.setViewport({ width: A4_WIDTH_PX, height: A4_HEIGHT_PX, deviceScaleFactor: 1 });

  await page.goto('http://10.43.193.251', { waitUntil: 'networkidle0', timeout: 60000 });

  await page.emulateMediaType('screen');

  await page.evaluate(() => {
    document.documentElement.classList.remove('dark');
  });

  await page.addStyleTag({
    content: `
      .no-print, nextjs-portal, next-route-announcer,
      [data-nextjs-dev-overlay], [data-nextjs-toast],
      [data-next-badge-root], [data-nextjs-dialog-overlay] {
        display: none !important;
        visibility: hidden !important;
      }
    `,
  });

  // Measure at progressively wider paper widths until content fits A4 height.
  // This gives the highest possible zoom (closest to 1.0) so fonts look largest.
  let zoom = 1.0;
  let paperWidthPx = A4_WIDTH_PX;
  let contentHeight;

  for (let i = 0; i < 5; i++) {
    await page.evaluate((w) => {
      const paper = document.getElementById('cv-content');
      const container = paper && paper.parentElement;
      if (paper) paper.style.width = w + 'px';
      if (container) container.style.justifyContent = 'flex-start';
    }, paperWidthPx);

    contentHeight = await page.evaluate(() => {
      const el = document.getElementById('cv-content');
      return el ? el.scrollHeight : document.body.scrollHeight;
    });

    const newZoom = contentHeight > A4_HEIGHT_PX
      ? Math.round((A4_HEIGHT_PX / contentHeight) * 100) / 100
      : 1;
    const newPaper = newZoom < 1 ? Math.round(A4_WIDTH_PX / newZoom) : A4_WIDTH_PX;

    if (Math.abs(newZoom - zoom) < 0.01) break;
    zoom = newZoom;
    paperWidthPx = newPaper;
  }

  await page.evaluate(() => {
    const paper = document.getElementById('cv-content');
    const container = paper && paper.parentElement;
    if (paper) paper.style.width = '';
    if (container) container.style.justifyContent = '';
  });

  console.log(`Hauteur: ${contentHeight}px, zoom: ${zoom}, paperWidth: ${paperWidthPx}px`);

  await page.addStyleTag({
    content: `
      html { zoom: ${zoom} !important; }
      html, body { background: #ffffff !important; margin: 0 !important; padding: 0 !important; }
      .cv-container { padding: 0 !important; margin: 0 !important; justify-content: flex-start !important; }
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
