import puppeteer from 'puppeteer';

export default async function htmlToPDF(htmlString) {
  try {
    const browser = await puppeteer.launch({
      headless: true,
      executablePath: '/usr/bin/google-chrome',
      args: ['--no-sandbox', '--disable-gpu'],
    });

    const page = await browser.newPage();

    await page.setContent(htmlString, { waitUntil: 'load' });

    const buffer = await page.pdf({
      format: 'a4',
      preferCSSPageSize: true,
      printBackground: true,
    });
    const base64 = buffer.toString('base64');

    await page.close();
    await browser.close();

    return base64;
  } catch (error) {
    console.error(error);
    throw new Error('Erro ao processar PDF.');
  }
}
