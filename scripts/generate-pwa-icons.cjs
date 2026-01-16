#!/usr/bin/env node

/**
 * PWA Icon Generator
 *
 * Generates PNG icons from the SVG source for PWA manifest.
 * Run with: node scripts/generate-pwa-icons.js
 *
 * Requires: npm install sharp
 */

const fs = require('fs');
const path = require('path');

async function generateIcons() {
  let sharp;
  try {
    sharp = require('sharp');
  } catch (e) {
    console.log('Sharp not installed. Installing...');
    const { execSync } = require('child_process');
    execSync('npm install sharp --save-dev', { stdio: 'inherit' });
    sharp = require('sharp');
  }

  const iconsDir = path.join(__dirname, '../public/icons');
  const publicDir = path.join(__dirname, '../public');

  // Ensure icons directory exists
  if (!fs.existsSync(iconsDir)) {
    fs.mkdirSync(iconsDir, { recursive: true });
  }

  // SVG source for regular icon
  const regularSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
    <defs>
      <linearGradient id="illumination" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#E8B84A"/>
        <stop offset="100%" style="stop-color:#D4944C"/>
      </linearGradient>
    </defs>
    <rect width="512" height="512" rx="96" fill="#0F0E0D"/>
    <text x="256" y="320" font-family="system-ui, -apple-system, BlinkMacSystemFont, sans-serif" font-size="200" font-weight="700" fill="url(#illumination)" text-anchor="middle">LB</text>
  </svg>`;

  // SVG source for maskable icon (no rounded corners, safe zone padding)
  const maskableSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
    <defs>
      <linearGradient id="illumination" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#E8B84A"/>
        <stop offset="100%" style="stop-color:#D4944C"/>
      </linearGradient>
    </defs>
    <rect width="512" height="512" fill="#0F0E0D"/>
    <text x="256" y="310" font-family="system-ui, -apple-system, BlinkMacSystemFont, sans-serif" font-size="180" font-weight="700" fill="url(#illumination)" text-anchor="middle">LB</text>
  </svg>`;

  // Regular icon sizes
  const regularSizes = [72, 96, 128, 144, 152, 192, 384, 512];

  // Maskable icon sizes
  const maskableSizes = [192, 512];

  console.log('Generating PWA icons...\n');

  // Generate regular icons
  for (const size of regularSizes) {
    const outputPath = path.join(iconsDir, `icon-${size}x${size}.png`);
    await sharp(Buffer.from(regularSvg))
      .resize(size, size)
      .png()
      .toFile(outputPath);
    console.log(`✓ Generated: icon-${size}x${size}.png`);
  }

  // Generate maskable icons
  for (const size of maskableSizes) {
    const outputPath = path.join(iconsDir, `icon-maskable-${size}x${size}.png`);
    await sharp(Buffer.from(maskableSvg))
      .resize(size, size)
      .png()
      .toFile(outputPath);
    console.log(`✓ Generated: icon-maskable-${size}x${size}.png`);
  }

  // Generate Apple Touch Icon (180x180)
  const appleTouchIconPath = path.join(publicDir, 'apple-touch-icon.png');
  await sharp(Buffer.from(regularSvg))
    .resize(180, 180)
    .png()
    .toFile(appleTouchIconPath);
  console.log(`✓ Generated: apple-touch-icon.png`);

  // Generate favicon PNG (32x32)
  const faviconPath = path.join(publicDir, 'favicon.png');
  await sharp(Buffer.from(regularSvg))
    .resize(32, 32)
    .png()
    .toFile(faviconPath);
  console.log(`✓ Generated: favicon.png`);

  console.log('\n✅ All PWA icons generated successfully!');
}

generateIcons().catch(console.error);
