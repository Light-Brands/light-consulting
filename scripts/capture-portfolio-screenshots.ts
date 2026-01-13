/**
 * Portfolio Screenshot Capture Script
 * Captures 3 screenshots per project from the master list
 * 
 * Run with: npx ts-node scripts/capture-portfolio-screenshots.ts
 */

import { chromium, Browser, Page } from 'playwright';
import * as fs from 'fs';
import * as path from 'path';

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

// Common secondary page paths to try
const SECONDARY_PATHS = [
  '/about',
  '/services', 
  '/contact',
  '/portfolio',
  '/gallery',
  '/team',
  '/products',
  '/menu',
  '/rooms',
  '/features',
];

const OUTPUT_DIR = path.join(__dirname, '../public/images/portfolio');

async function ensureDir(dir: string) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

async function captureScreenshot(page: Page, outputPath: string): Promise<boolean> {
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
    console.log(`  ✗ Failed to save: ${path.basename(outputPath)}`);
    return false;
  }
}

async function tryNavigateAndCapture(page: Page, baseUrl: string, relativePath: string, outputPath: string): Promise<boolean> {
  try {
    const url = new URL(relativePath, baseUrl).toString();
    const response = await page.goto(url, { 
      waitUntil: 'networkidle',
      timeout: 15000 
    });
    
    if (response && response.ok()) {
      // Wait a bit for any animations/lazy loading
      await page.waitForTimeout(1000);
      return await captureScreenshot(page, outputPath);
    }
    return false;
  } catch {
    return false;
  }
}

async function scrollAndCapture(page: Page, outputPath: string): Promise<boolean> {
  try {
    // Scroll down to show different content
    await page.evaluate(() => window.scrollBy(0, window.innerHeight * 1.5));
    await page.waitForTimeout(500);
    return await captureScreenshot(page, outputPath);
  } catch {
    return false;
  }
}

async function captureProjectScreenshots(browser: Browser, project: typeof PROJECTS[0], index: number) {
  const page = await browser.newPage();
  
  // Set viewport to a nice size for screenshots
  await page.setViewportSize({ width: 1280, height: 800 });
  
  console.log(`\n[${index + 1}/${PROJECTS.length}] ${project.name}`);
  console.log(`  URL: ${project.url}`);
  
  try {
    // 1. Homepage screenshot (primary image)
    console.log('  Taking homepage screenshot...');
    const response = await page.goto(project.url, { 
      waitUntil: 'networkidle',
      timeout: 30000 
    });
    
    if (!response || !response.ok()) {
      console.log(`  ✗ Failed to load: ${project.url}`);
      await page.close();
      return;
    }
    
    // Wait for content to load
    await page.waitForTimeout(2000);
    
    // Homepage - primary image
    const homePath = path.join(OUTPUT_DIR, `${project.slug}.jpg`);
    await captureScreenshot(page, homePath);
    
    // 2. Try to find a second page
    console.log('  Looking for secondary pages...');
    let foundSecondPage = false;
    
    for (const secondaryPath of SECONDARY_PATHS) {
      if (foundSecondPage) break;
      
      const secondPath = path.join(OUTPUT_DIR, `${project.slug}-2.jpg`);
      foundSecondPage = await tryNavigateAndCapture(page, project.url, secondaryPath, secondPath);
    }
    
    // If no secondary page found, scroll and capture
    if (!foundSecondPage) {
      console.log('  No secondary page found, capturing scroll view...');
      await page.goto(project.url, { waitUntil: 'networkidle', timeout: 30000 });
      await page.waitForTimeout(1000);
      const secondPath = path.join(OUTPUT_DIR, `${project.slug}-2.jpg`);
      await scrollAndCapture(page, secondPath);
    }
    
    // 3. Third screenshot - scroll further or try another page
    console.log('  Taking third screenshot...');
    let foundThirdPage = false;
    
    // Try to find a third unique page
    for (const secondaryPath of SECONDARY_PATHS.slice(SECONDARY_PATHS.indexOf('/about') + 1)) {
      if (foundThirdPage) break;
      
      const thirdPath = path.join(OUTPUT_DIR, `${project.slug}-3.jpg`);
      foundThirdPage = await tryNavigateAndCapture(page, project.url, secondaryPath, thirdPath);
    }
    
    // If no third page found, scroll to bottom
    if (!foundThirdPage) {
      await page.goto(project.url, { waitUntil: 'networkidle', timeout: 30000 });
      await page.waitForTimeout(1000);
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await page.waitForTimeout(500);
      const thirdPath = path.join(OUTPUT_DIR, `${project.slug}-3.jpg`);
      await captureScreenshot(page, thirdPath);
    }
    
  } catch (error) {
    console.log(`  ✗ Error processing ${project.name}: ${error}`);
  } finally {
    await page.close();
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
  
  // Process projects in batches to avoid overwhelming memory
  const BATCH_SIZE = 5;
  
  for (let i = 0; i < PROJECTS.length; i += BATCH_SIZE) {
    const batch = PROJECTS.slice(i, i + BATCH_SIZE);
    
    // Process batch sequentially to be respectful to servers
    for (let j = 0; j < batch.length; j++) {
      await captureProjectScreenshots(browser, batch[j], i + j);
    }
    
    // Small pause between batches
    if (i + BATCH_SIZE < PROJECTS.length) {
      console.log('\n⏳ Pausing before next batch...');
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }
  
  await browser.close();
  
  console.log('\n\n✅ Screenshot capture complete!');
  console.log(`📁 Images saved to: ${OUTPUT_DIR}`);
}

main().catch(console.error);
