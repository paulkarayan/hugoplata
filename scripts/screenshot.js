const { chromium } = require('playwright');

(async () => {
  const url = process.argv[2] || 'http://localhost:1313/blog/';
  const outputPath = process.argv[3] || '/tmp/playwright-screenshot.png';
  
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  // Set viewport to a reasonable desktop size
  await page.setViewportSize({ width: 1440, height: 900 });
  
  try {
    await page.goto(url, { waitUntil: 'networkidle' });
    await page.screenshot({ path: outputPath, fullPage: true });
    console.log(`Screenshot saved to ${outputPath}`);
  } catch (error) {
    console.error('Error taking screenshot:', error);
  } finally {
    await browser.close();
  }
})();