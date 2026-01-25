const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  // Remplace l'URL ci-dessous par l'URL locale de ton CV si besoin
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
    const element = await page.$('.cv-paper');
    let boundingBox = await element.boundingBox();

    // Rogner 2px sur les côtés et 12px en haut/bas pour éviter la bordure blanche
    const bleedX = 2;
    const cropTop = 65; // pixels à rogner en haut
    const bleedBottom = 12;
    boundingBox = {
      x: boundingBox.x - bleedX,
      y: boundingBox.y + cropTop,
      width: boundingBox.width + 2 * bleedX,
      height: boundingBox.height - cropTop + bleedBottom,
    };

    await page.pdf({
      path: 'cv.pdf',
      printBackground: true,
      margin: { top: '0px', right: '0px', bottom: '0px', left: '0px' },
      width: Math.round(boundingBox.width) + 'px',
      height: Math.round(boundingBox.height) + 'px',
      pageRanges: '1',
      clip: boundingBox
    });
  await browser.close();
})();
