import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

function createIco(images) {
  const count = images.length;
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type = 1 (icon)
  header.writeUInt16LE(count, 4); // count of images

  const dirEntries = [];
  let offset = 6 + count * 16;

  for (const img of images) {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(img.width === 256 ? 0 : img.width, 0);
    entry.writeUInt8(img.height === 256 ? 0 : img.height, 1);
    entry.writeUInt8(0, 2); // 0 = no palette
    entry.writeUInt8(0, 3); // reserved
    entry.writeUInt16LE(1, 4); // planes = 1
    entry.writeUInt16LE(32, 6); // bits per pixel = 32
    entry.writeUInt32LE(img.buffer.length, 8); // image size
    entry.writeUInt32LE(offset, 12); // image offset
    dirEntries.push(entry);
    offset += img.buffer.length;
  }

  return Buffer.concat([header, ...dirEntries, ...images.map((i) => i.buffer)]);
}

async function build() {
  console.log('Building Clubhouse Café Favicons & Chrome Browser Icons from white logo...');

  // High-res source requested by user
  const sourcePath = path.resolve('Image Assets/clubhouse cafe_logo-white (1).png');

  // Trim transparent padding to get the complete full white logo
  const logoWhiteBuf = await sharp(sourcePath)
    .trim()
    .toBuffer();

  // Background Badge (512x512) with luxury espresso gradient & gold trim
  const badgeSvg = `
  <svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="bgGlow" cx="50%" cy="40%" r="65%">
        <stop offset="0%" stop-color="#1F1714" />
        <stop offset="60%" stop-color="#120E0C" />
        <stop offset="100%" stop-color="#080605" />
      </radialGradient>
      <linearGradient id="goldRim" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#F3E5C8" />
        <stop offset="35%" stop-color="#D8B467" />
        <stop offset="70%" stop-color="#B88E3E" />
        <stop offset="100%" stop-color="#E8CCA0" />
      </linearGradient>
      <linearGradient id="innerShine" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="white" stop-opacity="0.12" />
        <stop offset="100%" stop-color="white" stop-opacity="0.0" />
      </linearGradient>
    </defs>
    <!-- Rounded Squircle Base -->
    <rect width="512" height="512" rx="118" fill="url(#bgGlow)" />
    <rect width="512" height="512" rx="118" fill="url(#innerShine)" />
    <!-- Luxury Gold Border Ring -->
    <rect x="10" y="10" width="492" height="492" rx="108" fill="none" stroke="url(#goldRim)" stroke-width="8" opacity="0.85" />
  </svg>
  `;

  // Scale the full white logo to fit inside badge prominently (440px wide)
  const logoWhiteResized = await sharp(logoWhiteBuf)
    .resize(440, null, { fit: 'inside' })
    .toBuffer();

  // Generate Master 512x512 Badge Icon
  const master512Buf = await sharp(Buffer.from(badgeSvg))
    .composite([
      {
        input: logoWhiteResized,
        gravity: 'center'
      }
    ])
    .png()
    .toBuffer();

  // Save 512x512 icons
  await sharp(master512Buf).toFile('public/icon-512.png');
  await sharp(master512Buf).toFile('public/favicon-512x512.png');

  // Save 192x192 (Android PWA / Chrome shortcut)
  const master192Buf = await sharp(master512Buf).resize(192, 192).png().toBuffer();
  await sharp(master192Buf).toFile('public/icon-192.png');

  // Save 180x180 (Apple Touch Icon / iOS)
  const appleTouchBuf = await sharp(master512Buf).resize(180, 180).png().toBuffer();
  await sharp(appleTouchBuf).toFile('public/apple-touch-icon.png');

  // Save 48x48, 32x32, 16x16 with subtle sharpening for crisp text at small dimensions
  const buf48 = await sharp(master512Buf).resize(48, 48, { kernel: 'lanczos3' }).sharpen().png().toBuffer();
  const buf32 = await sharp(master512Buf).resize(32, 32, { kernel: 'lanczos3' }).sharpen().png().toBuffer();
  const buf16 = await sharp(master512Buf).resize(16, 16, { kernel: 'lanczos3' }).sharpen().png().toBuffer();

  await sharp(buf48).toFile('public/favicon-48x48.png');
  await sharp(buf32).toFile('public/favicon-32x32.png');
  await sharp(buf16).toFile('public/favicon-16x16.png');

  // Create favicon.ico containing 16x16, 32x32, 48x48
  const icoData = createIco([
    { width: 16, height: 16, buffer: buf16 },
    { width: 32, height: 32, buffer: buf32 },
    { width: 48, height: 48, buffer: buf48 }
  ]);
  fs.writeFileSync('public/favicon.ico', icoData);
  console.log('✓ Created public/favicon.ico (16x16, 32x32, 48x48)');

  // Create public/favicon.svg using embedded base64 of the master 512 icon for vector crispness
  const base64Png = master512Buf.toString('base64');
  const svgFaviconContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="100%" height="100%">
  <image href="data:image/png;base64,${base64Png}" width="512" height="512" />
</svg>`;
  fs.writeFileSync('public/favicon.svg', svgFaviconContent);
  console.log('✓ Created public/favicon.svg');

  // Create public/site.webmanifest for PWA & modern Chrome installability
  const manifest = {
    name: "Clubhouse Café",
    short_name: "Clubhouse",
    description: "Boutique café & sanctuary in Model Town, Jalandhar.",
    start_url: "/",
    display: "standalone",
    background_color: "#120E0C",
    theme_color: "#120E0C",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png"
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png"
      }
    ]
  };
  fs.writeFileSync('public/site.webmanifest', JSON.stringify(manifest, null, 2));
  console.log('✓ Created public/site.webmanifest');

  console.log('All favicon and Chrome icon assets generated successfully!');
}

build().catch(err => {
  console.error(err);
  process.exit(1);
});
