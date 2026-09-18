import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

async function generateOgImage() {
  const WIDTH = 1200;
  const HEIGHT = 630;
  const OUTPUT_JPG = path.resolve('public/og-image.jpg');
  const OUTPUT_PNG = path.resolve('public/og-image.png');

  console.log('Generating 1200x630 Open Graph share image...');

  // 1. Prepare Background from landscape ambience photo
  const ambienceSrc = path.resolve('image assets ambience/ChatGPT Image Sep 17, 2026, 05_49_47 PM.png');
  
  const bgBuffer = await sharp(ambienceSrc)
    .resize(WIDTH, HEIGHT, { fit: 'cover', position: 'center' })
    .blur(1.5)
    .toBuffer();

  // 2. Prepare Logo
  const logoSrc = path.resolve('public/images/logo-white.png');
  const logoResized = await sharp(logoSrc)
    .resize({ width: 560, fit: 'inside' })
    .toBuffer();

  const logoMetadata = await sharp(logoResized).metadata();

  // 3. SVG Overlay with luxury dark emerald/espresso gradient, framing border, and editorial typography
  const overlaySvg = `
    <svg width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <!-- Rich Dark Radial Gradient to darken center and edges -->
        <radialGradient id="vignette" cx="50%" cy="50%" r="70%">
          <stop offset="0%" stop-color="#0E1A14" stop-opacity="0.72" />
          <stop offset="60%" stop-color="#0A130E" stop-opacity="0.88" />
          <stop offset="100%" stop-color="#050A07" stop-opacity="0.96" />
        </radialGradient>

        <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#C5A880" />
          <stop offset="50%" stop-color="#E5D3B3" />
          <stop offset="100%" stop-color="#C5A880" />
        </linearGradient>

        <linearGradient id="cardGlow" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.08" />
          <stop offset="100%" stop-color="#FFFFFF" stop-opacity="0.02" />
        </linearGradient>
      </defs>

      <!-- Full-bleed dark atmospheric scrim -->
      <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#vignette)" />

      <!-- Refined Inner Framing Border -->
      <rect x="36" y="36" width="${WIDTH - 72}" height="${HEIGHT - 72}" 
            fill="none" stroke="#C5A880" stroke-opacity="0.35" stroke-width="1.5" rx="8" />

      <!-- Decorative Corner Accents -->
      <path d="M 30 54 L 30 30 L 54 30" fill="none" stroke="#E5D3B3" stroke-width="2.5" />
      <path d="M ${WIDTH - 30} 54 L ${WIDTH - 30} 30 L ${WIDTH - 54} 30" fill="none" stroke="#E5D3B3" stroke-width="2.5" />
      <path d="M 30 ${HEIGHT - 54} L 30 ${HEIGHT - 30} L 54 ${HEIGHT - 30}" fill="none" stroke="#E5D3B3" stroke-width="2.5" />
      <path d="M ${WIDTH - 30} ${HEIGHT - 54} L ${WIDTH - 30} ${HEIGHT - 30} L ${WIDTH - 54} ${HEIGHT - 30}" fill="none" stroke="#E5D3B3" stroke-width="2.5" />

      <!-- Center Frosted Glass Backing -->
      <rect x="180" y="80" width="840" height="470" rx="16"
            fill="url(#cardGlow)" stroke="#FFFFFF" stroke-opacity="0.1" stroke-width="1" />

      <!-- Gold Top Pill Badge -->
      <g transform="translate(${WIDTH / 2}, 132)">
        <rect x="-135" y="-16" width="270" height="32" rx="16" fill="#0C1711" stroke="#C5A880" stroke-opacity="0.6" stroke-width="1" />
        <text text-anchor="middle" y="5" font-family="'Plus Jakarta Sans', system-ui, -apple-system, sans-serif" font-size="12" font-weight="700" letter-spacing="3" fill="#E5D3B3">
          EST. 2024 · MODEL TOWN
        </text>
      </g>

      <!-- Horizontal Divider Under Logo area -->
      <line x1="420" y1="386" x2="780" y2="386" stroke="url(#goldGradient)" stroke-width="1" stroke-opacity="0.5" />
      <circle cx="${WIDTH / 2}" cy="386" r="3.5" fill="#E5D3B3" />

      <!-- Tagline & Experience Description -->
      <text x="${WIDTH / 2}" y="426" text-anchor="middle" font-family="'Plus Jakarta Sans', system-ui, -apple-system, sans-serif" font-size="20" font-weight="600" letter-spacing="4" fill="#FAF8F5">
        COFFEE · FOOD · GOOD COMPANY
      </text>

      <text x="${WIDTH / 2}" y="458" text-anchor="middle" font-family="'Plus Jakarta Sans', system-ui, -apple-system, sans-serif" font-size="14" font-weight="400" letter-spacing="1.5" fill="#A7B9AF">
        Specialty Coffee · Artisanal Bakery · Neapolitan Pizza · Serene Ambience
      </text>

      <!-- Bottom Domain Pill -->
      <g transform="translate(${WIDTH / 2}, 510)">
        <text text-anchor="middle" y="0" font-family="'Plus Jakarta Sans', system-ui, -apple-system, sans-serif" font-size="13" font-weight="600" letter-spacing="2.5" fill="#C5A880">
          WWW.CLUBHOUSECAFE.IN
        </text>
      </g>
    </svg>
  `;

  // Calculate logo vertical center: badge is at 132, divider is at 386 -> center is ~260
  const logoTop = Math.round(260 - (logoMetadata.height || 180) / 2);
  const logoLeft = Math.round((WIDTH - (logoMetadata.width || 560)) / 2);

  // Composite layers
  const finalImage = sharp(bgBuffer)
    .composite([
      {
        input: Buffer.from(overlaySvg),
        top: 0,
        left: 0,
      },
      {
        input: logoResized,
        top: logoTop,
        left: logoLeft,
      },
    ]);

  // Export JPEG (standard for WhatsApp & Twitter)
  await finalImage
    .clone()
    .jpeg({ quality: 90, mozjpeg: true, progressive: true })
    .toFile(OUTPUT_JPG);

  // Export PNG as well
  await finalImage
    .clone()
    .png({ compressionLevel: 8 })
    .toFile(OUTPUT_PNG);

  console.log('✓ Successfully created:', OUTPUT_JPG);
  console.log('✓ Successfully created:', OUTPUT_PNG);
}

generateOgImage().catch(console.error);
