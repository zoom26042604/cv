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

  await page.goto('http://10.43.193.251', { waitUntil: 'networkidle0', timeout: 60000 });

  await page.emulateMediaType('screen');

  // Force light theme for PDF
  await page.evaluate(() => {
    document.documentElement.classList.remove('dark');
  });

  // Apply PDF-specific style overrides (spacing reductions + hide dev UI)
  // These run before height measurement so the zoom is calculated on compact layout
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
      /* Compact spacing for PDF */
      .cv-header { padding: 1.1rem 2rem 0.9rem !important; min-height: 0 !important; }
      .cv-body { padding-top: 0.6rem !important; padding-bottom: 0.6rem !important; }
      .cv-section { margin-bottom: 0.15rem !important; }
      .cv-section-title { padding-bottom: 0.25rem !important; margin-bottom: 0.25rem !important; }
      .cv-entry { margin-bottom: 0.35rem !important; padding-bottom: 0.35rem !important; }
      .cv-project-card { padding: 0.28rem 0.5rem !important; }
      .cv-skills-grid { gap: 0.3rem !important; }
      .cv-language-item { padding: 0.3rem 0 !important; }
    `,
  });

  // Iterative zoom: measure content height at the actual wider paper width,
  // so converged zoom is higher and fonts appear larger in the PDF.
  let zoom = 1.0;
  let paperWidthPx = A4_WIDTH_PX;
  let contentHeight;

  for (let i = 0; i < 4; i++) {
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
    const newPaperWidthPx = newZoom < 1 ? Math.round(A4_WIDTH_PX / newZoom) : A4_WIDTH_PX;

    if (Math.abs(newZoom - zoom) < 0.02) break;
    zoom = newZoom;
    paperWidthPx = newPaperWidthPx;
  }

  // Reset inline styles set during iteration
  await page.evaluate(() => {
    const paper = document.getElementById('cv-content');
    const container = paper && paper.parentElement;
    if (paper) paper.style.width = '';
    if (container) container.style.justifyContent = '';
  });

  console.log(`Hauteur contenu: ${contentHeight}px, A4: ${A4_HEIGHT_PX}px, zoom: ${zoom}, paperWidth: ${paperWidthPx}px`);

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
