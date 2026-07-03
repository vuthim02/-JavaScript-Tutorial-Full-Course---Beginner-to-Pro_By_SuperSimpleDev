const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');

const CHROME_PATH = '/usr/bin/google-chrome-stable';
const BASE_URL = 'https://store.google.com/us';

// Product slugs we need images for - only current products still on store
const PRODUCT_SLUGS = [
  // Phones
  'pixel_9_pro',
  'pixel_9',
  'pixel_9_pro_fold',
  'pixel_9a',
  'pixel_8a',
  'pixel_8',
  'pixel_8_pro',
  'pixel_fold',
  'pixel_7a',
  // Smart Home
  'nest_learning_thermostat_4th_gen',
  'nest_thermostat',
  'nest_hub_max',
  'nest_hub_2nd_gen',
  'nest_audio',
  'nest_mini_2nd_gen',
  'nest_doorbell_wired_2nd_gen',
  'nest_doorbell',
  'nest_cam_battery',
  'nest_cam_floodlight',
  'google_home_speaker',
  'nest_wifi_pro',
  'google_tv_streamer',
  'chromecast_google_tv_voice_remote',
  'pixel_tablet',
  'google_tv_streamer_4k',
  // Wearables
  'pixel_watch_3',
  'pixel_watch_2',
  'pixel_watch',
  'fitbit_charge_6',
  'fitbit_versa_4',
  'fitbit_inspire_3',
  'fitbit_luxe',
  'fitbit_sense_2',
  // Audio
  'pixel_buds_pro_2',
  'pixel_buds_2a',
  'pixel_buds_pro',
  'pixel_buds_a_series',
  // Accessories
  'pixel_9_pro_case',
  'pixel_9_case',
  'pixel_stand_2nd_gen',
  'pixel_30w_usb_c_charger',
  'google_usb_c_45w_charger',
  // Config pages for refurbished
  'pixel_7',
  'pixel_7_pro',
  'pixel_6a',
  'pixel_6',
  'pixel_6_pro',
  'pixel_5a',
  'pixel_5',
];

async function scrapeProductPage(browser, productSlug) {
  const url = BASE_URL + '/product/' + productSlug + '?hl=en-US';
  console.log(`  Visiting: ${productSlug} -> ${url}`);
  
  let page;
  try {
    page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800 });
    
    const response = await page.goto(url, { 
      waitUntil: 'networkidle0', 
      timeout: 20000 
    }).catch(() => null);
    
    if (!response) {
      console.log(`  Failed to load ${productSlug}`);
      return { slug: productSlug, image: '', name: '', status: 'failed' };
    }
    
    const status = response.status();
    const finalUrl = page.url();
    console.log(`  Status: ${status}, Final URL: ${finalUrl.substring(0, 80)}`);
    
    // Check if we were redirected away from a product page
    if (!finalUrl.includes('/product/') && !finalUrl.includes('/config/')) {
      console.log(`  Redirected away from product page for ${productSlug}`);
      // Try config page for refurbished
      const configUrl = BASE_URL + '/config/refurbished_' + productSlug + '?hl=en-US';
      console.log(`  Trying config page: ${configUrl}`);
      await page.goto(configUrl, { waitUntil: 'networkidle0', timeout: 20000 }).catch(() => null);
    }
    
    await new Promise(r => setTimeout(r, 3000));
    
    // Extract images with dimensions
    const result = await page.evaluate((slug) => {
      const allImages = document.querySelectorAll('img');
      let bestImage = '';
      let bestName = '';
      let bestArea = 0;
      let imagesFound = [];
      
      // Get page title
      const pageTitle = document.title.replace(/ - Google Store$/, '').trim();
      
      for (const img of allImages) {
        const src = img.getAttribute('src') || img.getAttribute('data-src') || '';
        if (!src.includes('googleusercontent.com')) continue;
        
        const rect = img.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const area = width * height;
        const alt = (img.alt || '').trim();
        
        imagesFound.push({ src: src.substring(0, 80), width, height, area, alt: alt.substring(0, 40) });
        
        // Prefer large images that look like product heroes
        if (width > 200 && height > 200 && area > bestArea) {
          bestArea = area;
          bestImage = src;
          if (alt && alt.length > 2) {
            bestName = alt;
          }
        }
      }
      
      return { 
        name: bestName || pageTitle, 
        image: bestImage, 
        slug, 
        imagesFound: imagesFound.slice(0, 10),
        totalImages: imagesFound.length,
        pageTitle
      };
    }, productSlug);
    
    if (result.image) {
      console.log(`  Found image for: ${result.name} (${result.totalImages} total images, best area: ${Math.round(Math.sqrt(result.imagesFound[0]?.area || 0))}x...)`);
    } else {
      console.log(`  No product image found for: ${productSlug} (${result.totalImages} images on page)`);
      if (result.imagesFound.length > 0) {
        console.log(`  Largest images:`);
        result.imagesFound.sort((a, b) => b.area - a.area).slice(0, 3).forEach(img => {
          console.log(`    ${Math.round(img.width)}x${Math.round(img.height)} alt="${img.alt}" ${img.src}`);
        });
      }
    }
    return result;
  } catch (err) {
    console.error(`  Error with ${productSlug}: ${err.message}`);
    return { slug: productSlug, image: '', name: '', status: 'error' };
  } finally {
    try { if (page) await page.close(); } catch(e) {}
  }
}

async function main() {
  console.log('Launching browser...');
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  const allResults = [];
  
  for (let i = 0; i < PRODUCT_SLUGS.length; i++) {
    const slug = PRODUCT_SLUGS[i];
    console.log(`\n[${i+1}/${PRODUCT_SLUGS.length}] ${slug}`);
    const result = await scrapeProductPage(browser, slug);
    if (result && result.image) {
      allResults.push({
        slug: result.slug,
        name: result.name,
        image: result.image,
        pageTitle: result.pageTitle
      });
    }
  }
  
  console.log(`\n\nSuccessfully scraped ${allResults.length}/${PRODUCT_SLUGS.length} product images`);
  
  // Save results
  const outputPath = path.join(__dirname, 'scraped_images_v2.json');
  fs.writeFileSync(outputPath, JSON.stringify(allResults, null, 2));
  console.log(`Results saved to ${outputPath}`);
  
  await browser.close();
  console.log('Done!');
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
