const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');

const CHROME_PATH = '/usr/bin/google-chrome-stable';
const BASE_URL = 'https://store.google.com/us';

const urlsToScrape = [
  '/category/phones?hl=en-US',
  '/category/connected_home?hl=en-US',
  '/category/earbuds?hl=en-US',
  '/category/watches_trackers?hl=en-US',
  '/category/nest_cams?hl=en-US',
  '/category/nest_doorbells?hl=en-US',
  '/category/nest_thermostats?hl=en-US',
  '/category/nest_hubs_displays?hl=en-US',
  '/category/pixel_watch_bands?hl=en-US',
  '/?hl=en-US',
];

async function scrapeProductPage(page, productSlug) {
  const url = BASE_URL + '/product/' + productSlug + '?hl=en-US';
  console.log(`  Visiting product: ${productSlug}...`);
  try {
    await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });
    await new Promise(r => setTimeout(r, 4000));

    // Extract product image and name
    const result = await page.evaluate((slug) => {
      // Try to find the main product image
      const allImages = document.querySelectorAll('img');
      let heroImage = '';
      let productName = '';
      
      // Get page title as fallback product name
      productName = document.title.replace(/ -.*$/, '').trim();
      
      // Find hero image from googleusercontent
      for (const img of allImages) {
        const src = img.getAttribute('src') || img.getAttribute('data-src') || '';
        if (src.includes('googleusercontent.com')) {
          // Check if this is a large meaningful image (not a nav icon)
          const rect = img.getBoundingClientRect();
          if (rect.width > 100 && rect.height > 100) {
            heroImage = src;
            // Use alt text if available
            if (img.alt && img.alt.length > 2) {
              productName = img.alt;
            }
            break;
          }
          // Fallback: first googleusercontent image 
          if (!heroImage) {
            heroImage = src;
          }
        }
      }
      
      return { name: productName, image: heroImage, slug };
    }, productSlug);
    
    if (result.image) {
      console.log(`  Found image for: ${result.name}`);
    } else {
      console.log(`  No product image found for: ${productSlug}`);
    }
    return result;
  } catch (err) {
    console.error(`  Error visiting product ${productSlug}: ${err.message}`);
    return { name: '', image: '', slug: productSlug };
  }
}

// Product slugs known to exist on Google Store (from sitemap analysis)
// These match products in our products.js
const PRODUCT_SLUGS = [
  'pixel_9_pro',
  'pixel_9',
  'pixel_9_pro_fold',
  'pixel_8a',
  'pixel_8',
  'pixel_8_pro',
  'pixel_fold',
  'pixel_7a',
  'nest_learning_thermostat_4th_gen',
  'nest_thermostat',
  'nest_hub_max',
  'nest_hub_2nd_gen',
  'nest_audio',
  'nest_mini_2nd_gen',
  'nest_doorbell_wired_2nd_gen',
  'nest_doorbell_battery',
  'nest_cam_battery',
  'nest_cam_with_floodlight',
  'nest_x_yale_lock',
  'google_wifi',
  'nest_wifi_pro',
  'chromecast_google_tv_hd',
  'pixel_watch_3_45mm',
  'pixel_watch_3_41mm',
  'pixel_watch_2',
  'pixel_watch',
  'fitbit_charge_6',
  'fitbit_versa_4',
  'fitbit_inspire_3',
  'fitbit_luxe',
  'fitbit_sense_2',
  'pixel_buds_pro_2',
  'pixel_buds_2a',
  'pixel_buds_pro',
  'pixel_buds_a_series',
  'pixel_tablet',
  'google_tv_streamer_4k',
  'pixel_9_pro_case',
  'pixel_9_case',
  'pixel_30w_usb_c_charger',
  'pixel_stand_2nd_gen',
  'pixel_watch_band_active',
  'pixel_watch_band_leather',
];

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
    let page;
    try {
      page = await browser.newPage();
      await page.setViewport({ width: 1280, height: 800 });
      const result = await scrapeProductPage(page, slug);
      if (result && result.image) {
        allResults.push(result);
      }
    } catch (err) {
      console.error(`  Error with ${slug}: ${err.message}`);
    } finally {
      try { if (page) await page.close(); } catch(e) {}
    }
  }
  
  console.log(`\nSuccessfully scraped ${allResults.length}/${PRODUCT_SLUGS.length} product images`);
  
  // Save results
  const outputPath = path.join(__dirname, 'scraped_images.json');
  fs.writeFileSync(outputPath, JSON.stringify(allResults, null, 2));
  console.log(`Results saved to ${outputPath}`);
  
  await browser.close();
  console.log('Done!');
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
