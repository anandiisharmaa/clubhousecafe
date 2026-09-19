import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

async function buildCleanHero() {
  const sourcePath = 'c:/Users/HP/Desktop/Clubhouse/image assets ambience/Untitled design (27).png';
  
  // 1. Extract pure clean photo (939 x 1379) - NO CANVA LETTERBOXING
  console.log('Step 1: Extracting clean authentic photo from Untitled design (27).png...');
  const cleanPhotoBuffer = await sharp(sourcePath)
    .extract({ left: 0, top: 136, width: 939, height: 1379 })
    .png({ quality: 100 })
    .toBuffer();

  const cleanMeta = await sharp(cleanPhotoBuffer).metadata();
  console.log('Clean master photo dimensions:', cleanMeta.width, 'x', cleanMeta.height);

  // 2. Build Mobile Art-Directed Composition (939 x 2031):
  // Notice:
  // - Top is aligned at Y = 0 (ABSOLUTELY ZERO BLUR, ZERO TOP STRETCH, ZERO SEAM).
  // - Left & Right are at original width (ZERO horizontal distortion, 100% of the photo width).
  // - The glowing "CLUBHOUSE" hedge sign (x=34) and "CLUBHOUSE CAFE" board (x=910) are both fully inside.
  // - Bottom (y = 1379 to 2031) smoothly extends the floor shadow down into #120E0C (espresso).
  console.log('Step 2: Building mobile composition with 0 top extension (100% sharp top)...');
  const targetW = 939;
  const targetH = 2031; // Aspect ratio matches 390x844 (939 / (390/844) = 2032.7)
  const bottomH = targetH - 1379; // 652px

  // Generate smooth bottom floor shadow extension:
  // We take the bottom 30px of the tiled floor and blend it downward into espresso #120E0C
  const bottomSlice = await sharp(cleanPhotoBuffer)
    .extract({ left: 0, top: 1379 - 30, width: targetW, height: 30 })
    .resize(targetW, bottomH, { fit: 'fill' })
    .toBuffer();

  const btmGradSvg = Buffer.from(`
    <svg width="${targetW}" height="${bottomH}">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#120E0C" stop-opacity="0.2"/>
          <stop offset="20%" stop-color="#120E0C" stop-opacity="0.6"/>
          <stop offset="50%" stop-color="#120E0C" stop-opacity="0.9"/>
          <stop offset="100%" stop-color="#120E0C" stop-opacity="1.0"/>
        </linearGradient>
      </defs>
      <rect width="${targetW}" height="${bottomH}" fill="url(#bg)"/>
    </svg>
  `);

  const bottomBlended = await sharp(bottomSlice)
    .composite([{ input: btmGradSvg, blend: 'over' }])
    .toBuffer();

  // Subtle 20px feather transition at the seam y=1379 so there's zero hard line on the floor
  const seamFeatherHeight = 40;
  const seamFeatherSvg = Buffer.from(`
    <svg width="${targetW}" height="${seamFeatherHeight}">
      <defs>
        <linearGradient id="feather" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#120E0C" stop-opacity="0.0"/>
          <stop offset="100%" stop-color="#120E0C" stop-opacity="0.4"/>
        </linearGradient>
      </defs>
      <rect width="${targetW}" height="${seamFeatherHeight}" fill="url(#feather)"/>
    </svg>
  `);

  const baseCanvas = await sharp({
    create: {
      width: targetW,
      height: targetH,
      channels: 4,
      background: { r: 18, g: 14, b: 12, alpha: 1 }
    }
  }).png().toBuffer();

  const mobileMasterBuffer = await sharp(baseCanvas)
    .composite([
      { input: cleanPhotoBuffer, top: 0, left: 0 },
      { input: seamFeatherSvg, top: 1379 - seamFeatherHeight, left: 0 },
      { input: bottomBlended, top: 1379, left: 0 }
    ])
    .png({ quality: 100 })
    .toBuffer();

  // Save mobile master
  const mobileMasterPath = 'c:/Users/HP/Desktop/Clubhouse/image assets ambience/ambience-hero-mobile.png';
  await sharp(mobileMasterBuffer).toFile(mobileMasterPath);
  console.log('Saved 100% sharp mobile master to:', mobileMasterPath);

  // 3. Generate optimized mobile variants directly
  const outDir = 'c:/Users/HP/Desktop/Clubhouse/public/images/optimized';
  const widths = [480, 768, 939];

  for (const w of widths) {
    const h = Math.round((w / targetW) * targetH);
    // AVIF
    await sharp(mobileMasterBuffer)
      .resize(w, h, { fit: 'cover' })
      .avif({ quality: 80, effort: 5 })
      .toFile(path.join(outDir, `ambience-hero-mobile-${w}w.avif`));

    // WebP
    await sharp(mobileMasterBuffer)
      .resize(w, h, { fit: 'cover' })
      .webp({ quality: 85, effort: 5 })
      .toFile(path.join(outDir, `ambience-hero-mobile-${w}w.webp`));

    console.log(`Generated ambience-hero-mobile-${w}w.avif and .webp (${w}x${h})`);
  }

  // Also make sure 1000w links to 939w or generates 939w as 1000w so no 404
  await sharp(mobileMasterBuffer)
    .resize(939, Math.round((939 / targetW) * targetH), { fit: 'cover' })
    .avif({ quality: 80, effort: 4 })
    .toFile(path.join(outDir, 'ambience-hero-mobile-1000w.avif'));
  await sharp(mobileMasterBuffer)
    .resize(939, Math.round((939 / targetW) * targetH), { fit: 'cover' })
    .webp({ quality: 85, effort: 4 })
    .toFile(path.join(outDir, 'ambience-hero-mobile-1000w.webp'));

  // 4. Also generate the desktop master variants from cleanPhotoBuffer
  // (939 x 1379)
  const desktopWidths = [480, 768, 1080];
  for (const w of desktopWidths) {
    const h = Math.round((w / cleanMeta.width) * cleanMeta.height);
    await sharp(cleanPhotoBuffer)
      .resize(w, h, { fit: 'cover' })
      .avif({ quality: 80, effort: 5 })
      .toFile(path.join(outDir, `ambience-dining-hall-${w}w.avif`));
    await sharp(cleanPhotoBuffer)
      .resize(w, h, { fit: 'cover' })
      .webp({ quality: 85, effort: 5 })
      .toFile(path.join(outDir, `ambience-dining-hall-${w}w.webp`));
    console.log(`Generated ambience-dining-hall-${w}w.avif and .webp (${w}x${h})`);
  }

  console.log('All hero assets successfully generated with 100% sharp top!');
}

buildCleanHero().catch(console.error);
