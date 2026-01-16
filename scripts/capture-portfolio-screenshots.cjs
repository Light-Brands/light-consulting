/**
 * Portfolio Screenshot Capture Script
 * Captures 3 screenshots per project from the master list
 * 
 * Run with: node scripts/capture-portfolio-screenshots.cjs
 */

const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

// Project data from the CSV
const PROJECTS = [
  { slug: 'light-brand-consulting', url: 'https://light-brand-consulting.vercel.app/', name: 'Light Brand Consulting' },
  { slug: 'iboga-life', url: 'https://iboga-life.vercel.app/', name: 'Iboga Life' },
  { slug: 'neurotracker-x', url: 'https://ntx8.vercel.app/', name: 'NeuroTracker X' },
  { slug: 'light-field-institute', url: 'https://www.lightfield.institute/', name: 'Light Field Institute' },
  { slug: 'mindflow-vision', url: 'https://mindflow-vision.vercel.app/', name: 'Mindflow Vision' },
  { slug: 'planetary-party', url: 'https://planetary-party.vercel.app/', name: 'The Planetary Party' },
  { slug: 'love-token', url: 'https://love-token.vercel.app/', name: 'Love Token' },
  { slug: 'lightwaves-energy', url: 'https://lightwaves.energy', name: 'Lightwaves Energy' },
  { slug: 'downtown-park', url: 'https://www.downtown-park.com/', name: 'Downtown Park' },
  { slug: 'skyzor-productions', url: 'https://www.skyzorproductions.com/', name: 'Skyzor Productions' },
  { slug: 'ai-tools', url: 'https://aitools-theta.vercel.app/', name: 'AI Tools' },
  { slug: 'growth-mastery-ai', url: 'https://growthmastery.ai/', name: 'Growth Mastery AI' },
  { slug: 'anemi-pool', url: 'https://pool.anemihotel.com/', name: 'Anemi Pool Reservation' },
  { slug: 'anemi-events', url: 'https://events.anemihotel.com/dashboard', name: 'Anemi Event Management' },
  { slug: 'melodygram-ai', url: 'https://melodygram.vercel.app/', name: 'MelodyGram AI' },
  { slug: 'mw-crypto', url: 'https://mw-dash.vercel.app/', name: 'MW Crypto Monitor' },
  { slug: 'genius-ai', url: 'https://geniusai8.vercel.app/', name: 'Genius AI' },
  { slug: 'busy-bees', url: 'https://busy-bees8.vercel.app', name: 'Busy Bees IPC' },
  { slug: 'piedra-lounge', url: 'https://piedralounge.com/', name: 'Piedra Lounge' },
  { slug: 'baracas-lounge', url: 'https://www.baracaslounge.com/', name: 'Baracas Lounge' },
  { slug: 'loft-club', url: 'https://loftclub.co/', name: 'Loft Club' },
  { slug: 'new-earth-development', url: 'https://newearthdevelopment.org', name: 'New Earth Development' },
  { slug: 'boho-bones', url: 'https://opensea.io/collection/bohobones', name: 'Boho Bones (NFT)' },
  { slug: 'auracle', url: 'https://auracle8.vercel.app/', name: 'Auracle' },
  { slug: 'oracle-studios', url: 'https://oraclestudios.io', name: 'Oracle Studios' },
  { slug: 'vector-home-robot', url: 'https://vector-home-robot.webflow.io/', name: 'Vector Home Robot' },
  { slug: 'cyprus-swim', url: 'https://cyprusswimseries.com/', name: 'Cyprus Swim Series' },
  { slug: 'cyprus-tours', url: 'https://www.cyprustours.eu/', name: 'Cyprus Tours' },
  { slug: 'dermlux-clinics', url: 'https://www.dermluxclinic.com/', name: 'Dermlux Clinics' },
  { slug: 'korakides-law', url: 'https://epaminondas-korakides-llc.webflow.io/', name: 'Korakides Law' },
  { slug: 'kk-hospitality', url: 'https://kk-hospitality.webflow.io/', name: 'KK Hospitality' },
  { slug: 'sodap-cyprus', url: 'https://www.sodap.com.cy/', name: 'Sodap Cyprus' },
  { slug: 'dr-nutri', url: 'https://dr-nutri.com', name: 'Dr. Nutri' },
  { slug: 'pafos-zoo', url: 'https://www.pafoszoo.com/', name: 'Pafos Zoo' },
  { slug: 'cyprus-athletic', url: 'https://www.cyprusathletictourism.com/', name: 'Cyprus Athletic Tourism' },
  { slug: 'palmiers', url: 'https://www.thepalmiers.com/', name: 'The Palmiers' },
  { slug: 'waterside', url: 'https://www.waterside.cy/', name: 'Waterside' },
  { slug: 'silver-park', url: 'https://www.silver-park.cy/', name: 'Silver Park' },
  { slug: 'loft-centrale', url: 'https://www.loft-centrale.cy/', name: 'Loft Centrale' },
  { slug: 'averde', url: 'https://www.averde.cy/', name: 'Averde' },
  { slug: 'mito-solar', url: 'https://www.mitosolar.cy/', name: 'Mito Solar' },
  { slug: 'linea', url: 'https://linea.strategioconsulting.com/', name: 'Linea' },
  { slug: 'sms-reminder', url: 'https://sms-reminder-teal.vercel.app/', name: 'SMS Reminder' },
  { slug: 'eventpro', url: 'https://events.anemihotel.com/landing', name: 'EventPro' },
  { slug: 'elyst-consulting', url: 'https://elystconsultingcy.com/', name: 'ELYST Business Consulting' },
  { slug: 'nickoloui', url: 'https://www.nickoloui.com/', name: 'Nickoloui' },
  { slug: 'med-yachts', url: 'https://medyachts.vercel.app/', name: 'Med Yachts' },
];

const OUTPUT_DIR = path.join(__dirname, '../public/images/portfolio');

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

async function captureScreenshot(page, outputPath) {
  try {
    await page.screenshot({ 
      path: outputPath,
      type: 'jpeg',
      quality: 85,
      fullPage: false,
    });
    console.log(`  ✓ Saved: ${path.basename(outputPath)}`);
    return true;
  } catch (error) {
    console.log(`  ✗ Failed to save: ${path.basename(outputPath)} - ${error.message}`);
    return false;
  }
}

async function captureProjectScreenshots(context, project, index) {
  const page = await context.newPage();
  
  // Set viewport to a nice size for screenshots
  await page.setViewportSize({ width: 1280, height: 800 });
  
  console.log(`\n[${index + 1}/${PROJECTS.length}] ${project.name}`);
  console.log(`  URL: ${project.url}`);
  
  try {
    // 1. Homepage screenshot (primary image)
    console.log('  Taking homepage screenshot...');
    try {
      await page.goto(project.url, { 
        waitUntil: 'domcontentloaded',
        timeout: 20000 
      });
    } catch (e) {
      console.log(`  ✗ Failed to load homepage: ${e.message}`);
      await page.close();
      return;
    }
    
    // Wait for content to load
    await page.waitForTimeout(2000);
    
    // Homepage - primary image
    const homePath = path.join(OUTPUT_DIR, `${project.slug}.jpg`);
    await captureScreenshot(page, homePath);
    
    // 2. Scroll down for second screenshot
    console.log('  Taking scroll view screenshot...');
    await page.evaluate(() => window.scrollBy(0, window.innerHeight * 1.2));
    await page.waitForTimeout(800);
    const secondPath = path.join(OUTPUT_DIR, `${project.slug}-2.jpg`);
    await captureScreenshot(page, secondPath);
    
    // 3. Scroll to bottom for third screenshot
    console.log('  Taking bottom view screenshot...');
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight * 0.7));
    await page.waitForTimeout(800);
    const thirdPath = path.join(OUTPUT_DIR, `${project.slug}-3.jpg`);
    await captureScreenshot(page, thirdPath);
    
  } catch (error) {
    console.log(`  ✗ Error processing ${project.name}: ${error.message}`);
  } finally {
    try {
      await page.close();
    } catch (e) {
      // Page already closed, ignore
    }
  }
}

async function main() {
  console.log('🚀 Portfolio Screenshot Capture Script');
  console.log('=====================================\n');
  
  // Ensure output directory exists
  ensureDir(OUTPUT_DIR);
  console.log(`📁 Output directory: ${OUTPUT_DIR}\n`);
  
  // Launch browser
  console.log('🌐 Launching browser...');
  const browser = await chromium.launch({
    headless: true,
  });
  
  // Create a browser context
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    viewport: { width: 1280, height: 800 },
  });
  
  // Process all projects
  for (let i = 0; i < PROJECTS.length; i++) {
    await captureProjectScreenshots(context, PROJECTS[i], i);
    
    // Small pause between projects
    await new Promise(resolve => setTimeout(resolve, 300));
  }
  
  await context.close();
  await browser.close();
  
  console.log('\n\n✅ Screenshot capture complete!');
  console.log(`📁 Images saved to: ${OUTPUT_DIR}`);
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
