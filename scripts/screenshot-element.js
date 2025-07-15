const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  await page.goto('http://localhost:1313/blog/', { waitUntil: 'networkidle' });
  
  // Screenshot just the first blog card
  const firstCard = await page.locator('.bg-body').first();
  await firstCard.screenshot({ path: '/tmp/first-blog-card.png' });
  console.log('First blog card screenshot saved');
  
  // Screenshot the header
  const header = await page.locator('header').first();
  await header.screenshot({ path: '/tmp/header.png' });
  console.log('Header screenshot saved');
  
  await browser.close();
})();