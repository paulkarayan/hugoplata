const { chromium } = require('playwright');

(async () => {
  console.log('🎭 Testing Playwright...\n');
  
  try {
    const browser = await chromium.launch({ headless: true });
    console.log('✅ Browser launched successfully');
    
    const context = await browser.newContext();
    const page = await context.newPage();
    console.log('✅ Page created');
    
    await page.goto('http://localhost:1313/blog/');
    console.log('✅ Navigated to blog page');
    
    const title = await page.title();
    console.log(`✅ Page title: "${title}"`);
    
    const blogCards = await page.locator('.bg-body').count();
    console.log(`✅ Found ${blogCards} blog cards`);
    
    const firstTitle = await page.locator('h4 a').first().textContent();
    console.log(`✅ First blog title: "${firstTitle.trim()}"`);
    
    await browser.close();
    console.log('\n🎉 Playwright is working perfectly!');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
})();