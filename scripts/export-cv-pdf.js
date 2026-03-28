const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Force le thème clair avant le chargement pour éviter un PDF en mode sombre
  await page.evaluateOnNewDocument(() => {
    localStorage.setItem('cv-theme', 'light');
  });

  // A4 width at 96 DPI = 210mm * 96 / 25.4 ≈ 794px
  await page.setViewport({ width: 794, height: 1123, deviceScaleFactor: 1 });

  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });

  // Force le CSS screen (pas print) pour avoir le même rendu que le navigateur
  await page.emulateMediaType('screen');

  // Sécurise le rendu clair et masque les overlays/devtools de Next en mode dev
  await page.evaluate(() => {
    document.documentElement.classList.remove('dark');
    localStorage.setItem('cv-theme', 'light');
  });

  await page.addStyleTag({
    content: `
      html, body {
        background: #ffffff !important;
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

  // Hauteur réelle du contenu CV
  const contentHeight = await page.evaluate(() => {
    const el = document.getElementById('cv-content');
    return el ? el.scrollHeight : document.body.scrollHeight;
  });

  const outputPath = path.join(__dirname, '../public/cv.pdf');

  await page.pdf({
    path: outputPath,
    printBackground: true,
    width: '195mm',
    height: `${contentHeight}px`,
    margin: { top: '0px', right: '0px', bottom: '0px', left: '0px' },
  });

  await browser.close();
  console.log('cv.pdf généré dans public/');
})();
