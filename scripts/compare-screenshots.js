const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  // Set consistent viewport
  await page.setViewportSize({ width: 1440, height: 900 });
  
  // Take screenshots of blog listing
  console.log('📸 Taking blog listing screenshot...');
  await page.goto('http://localhost:1313/blog/', { waitUntil: 'networkidle' });
  await page.screenshot({ path: '/tmp/blog-listing-after.png', fullPage: false });
  
  // Take screenshot of first blog card only
  console.log('📸 Taking blog card close-up...');
  const firstCard = await page.locator('.bg-body').first();
  await firstCard.screenshot({ path: '/tmp/blog-card-closeup.png' });
  
  // Navigate to a specific blog post
  console.log('📸 Taking blog post screenshot...');
  await page.goto('http://localhost:1313/blog/automation-infrastructure/', { waitUntil: 'networkidle' });
  
  // Screenshot just the article content
  const articleContent = await page.locator('article .content').first();
  await articleContent.screenshot({ path: '/tmp/article-content.png' });
  
  // Take a full page screenshot of the blog post
  await page.screenshot({ path: '/tmp/blog-post-full.png', fullPage: false });
  
  await browser.close();
  console.log('✅ All screenshots saved!');
})();