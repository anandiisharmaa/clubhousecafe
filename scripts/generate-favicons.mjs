import sharp from 'sharp';
import fs from 'node:fs';

async function generateFaviconCandidates() {
  const imgDark = sharp('public/images/logo-dark.png');
  const imgWhite = sharp('public/images/logo-white.png');

  // 1. Full logo fitted into a square with luxury background
  // Dimensions 512x512
  const fullLogoSquareDark = await sharp({
    create: {
      width: 512,
      height: 512,
      channels: 4,
      background: { r: 18, g: 14, b: 12, alpha: 1 } // #120E0C Luxury Espresso
    }
  })
  .composite([
    {
      input: await imgWhite.resize(440, null, { fit: 'inside' }).toBuffer(),
      gravity: 'center'
    }
  ])
  .png()
  .toFile('public/favicon-full-logo-dark.png');

  // 2. Full logo on transparent background
  const fullLogoSquareTrans = await sharp({
    create: {
      width: 512,
      height: 512,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 }
    }
  })
  .composite([
    {
      input: await imgDark.resize(480, null, { fit: 'inside' }).toBuffer(),
      gravity: 'center'
    }
  ])
  .png()
  .toFile('public/favicon-full-logo-trans.png');

  // 3. The Emblem / Crest from the logo:
  // Crest bounds: crestMinX: 1245, crestMaxX: 2353, width: 1109, height: 428
  const crestCropDark = await imgDark.clone()
    .extract({ left: 1240, top: 0, width: 1120, height: 430 })
    .toBuffer();

  const crestCropWhite = await imgWhite.clone()
    .extract({ left: 1240, top: 0, width: 1120, height: 430 })
    .toBuffer();

  // Crest on transparent (dark logo)
  await sharp(crestCropDark)
    .resize(512, 512, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile('public/favicon-crest-trans.png');

  // Crest on luxury espresso badge with subtle gold border
  // SVG background with rounded rect and gold border
  const badgeSvg = `
  <svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
    <rect width="512" height="512" rx="112" fill="#120E0C" />
    <rect x="8" y="8" width="496" height="496" rx="104" fill="none" stroke="#D8B467" stroke-width="8" opacity="0.6" />
  </svg>
  `;
  await sharp(Buffer.from(badgeSvg))
    .composite([
      {
        input: await sharp(crestCropWhite).resize(360, 360, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).toBuffer(),
        gravity: 'center'
      }
    ])
    .png()
    .toFile('public/favicon-crest-badge.png');

  console.log('Candidates generated in public/');
}

generateFaviconCandidates();
