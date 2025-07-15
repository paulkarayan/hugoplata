const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  // Set viewport but capture full page
  await page.setViewportSize({ width: 1440, height: 900 });
  
  // Navigate to blog
  await page.goto('http://localhost:1313/blog/', { waitUntil: 'networkidle' });
  
  // Take full page screenshot
  await page.screenshot({ 
    path: '/tmp/blog-full-page.png', 
    fullPage: true  // This captures the entire scrollable area
  });
  
  console.log('Full page screenshot saved!');
  
  // Also take a screenshot of the live site for comparison
  await page.goto('https://paulkarayan.com/blog/', { waitUntil: 'networkidle' });
  await page.screenshot({ 
    path: '/tmp/blog-live-site.png', 
    fullPage: true 
  });
  
  console.log('Live site screenshot saved!');
  
  await browser.close();
})();