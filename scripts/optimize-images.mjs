import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';
import decodeHeic from 'heic-decode';

const SOURCE_DIR = path.resolve('Image Assets');
const AMBIENCE_DIR = path.resolve('image assets ambience');
const OUTPUT_DIR = path.resolve('public/images/optimized');
const DATA_OUTPUT = path.resolve('src/data/images.json');

// Ensure output directories exist
fs.mkdirSync(OUTPUT_DIR, { recursive: true });
fs.mkdirSync(path.dirname(DATA_OUTPUT), { recursive: true });

const RESPONSIVE_WIDTHS = [480, 768, 1080, 1440, 1920];

// Clean mapping of raw filenames to semantic IDs and titles
const METADATA_MAP = {
  '0D6348B2-EB2C-4533-9CB2-FE2882C43CCC.png': {
    id: 'tres-leches',
    title: 'Saffron Mango Tres Leches',
    category: 'sweets',
    alt: 'Saffron mango soaked sponge cake topped with delicate piped chantilly cream and an edible purple flower on an ivory ceramic plate.',
  },
  '156F515B-5B82-4908-9B84-1B1018418363.png': {
    id: 'belgian-croissant',
    title: 'Artisanal Chocolate Croissant',
    category: 'bites',
    alt: 'Golden flaky artisan croissant drizzled with Belgian chocolate ganache on a warm stone plate beside a fluted sage green velvet chair.',
  },
  '19E26F82-6232-4E6B-8D23-2DB5BA32F7FE.png': {
    id: 'skillet-brownie',
    title: 'Sizzling Skillet Hazelnut Brownie',
    category: 'sweets',
    alt: 'Warm decadent chocolate fudge brownie with piped hazelnut ganache served in a cast iron skillet on a dark timber trivet.',
  },
  'Amaranth Barley salad.PNG': {
    id: 'amaranth-barley-salad',
    title: 'Warm Amaranth & Pearl Barley Salad',
    category: 'mains',
    alt: 'Nutrient-rich ancient grain bowl with amaranth, pearl barley, crisp garden herbs and microgreens.',
  },
  'American smashed chicken burger .png': {
    id: 'smashed-chicken-burger',
    title: 'American Smashed Chicken Burger',
    category: 'mains',
    alt: 'Crispy smashed chicken patty with melted cheese, house aioli and pickles in a toasted artisanal brioche bun.',
  },
  'Avocado toast.PNG': {
    id: 'avocado-toast',
    title: 'Sourdough Avocado Tartines',
    category: 'bites',
    alt: 'Trio of rustic sourdough toasts topped with creamy avocado mash, ruby pomegranate pearls and toasted sunflower seeds in a vintage tray.',
  },
  'Buratta pizza Neapolitan .png': {
    id: 'buratta-neapolitan-pizza',
    title: 'Neapolitan Burrata Pizza',
    category: 'mains',
    alt: 'Handcrafted wood-fired Neapolitan pizza with blistered crust, rich pomodoro, wild rocket and whole creamy Italian burrata ball.',
  },
  'Chicken seekh kebab.png': {
    id: 'chicken-seekh-kebab',
    title: 'Smoked Chicken Seekh Kebabs',
    category: 'bites',
    alt: 'Char-grilled succulent chicken seekh kebabs served with fresh mint yogurt dip and pickled shallots on a dark wood platter.',
  },
  'Cream Cheese Dimsums.jpg.jpeg': {
    id: 'cream-cheese-dimsums',
    title: 'Truffled Cream Cheese Dimsums',
    category: 'bites',
    alt: 'Steamed crystal dimsums filled with rich cream cheese and fresh chives, served with house chili dip and fresh microgreens.',
  },
  'Creamy penne Alfredo spaghetti .png': {
    id: 'creamy-penne-alfredo',
    title: 'Silky Penne & Tagliatelle Alfredo',
    category: 'mains',
    alt: 'Penne pasta tossed in a velvety parmesan and roasted garlic cream sauce with fresh cracked black pepper and herbs.',
  },
  'Crispy Corn.PNG': {
    id: 'crispy-corn',
    title: 'Wok-Tossed Crispy Pepper Corn',
    category: 'bites',
    alt: 'Golden sweet corn kernels flash-fried with scallions, cracked pepper, and aromatic Himalayan salt.',
  },
  'Fried Chicken wrap.PNG': {
    id: 'fried-chicken-wrap',
    title: 'Golden Fried Chicken Wrap',
    category: 'mains',
    alt: 'Crispy seasoned chicken strips rolled with crisp slaw and secret clubhouse sauce in a griddled tortilla.',
  },
  'Grilled fish.png': {
    id: 'grilled-fish',
    title: 'Pan-Seared Herb Butter Fish',
    category: 'mains',
    alt: 'Fresh pan-seared river fish fillet finished with lemon caper herb butter and seasonal greens.',
  },
  'Hakka Noodles.PNG': {
    id: 'hakka-noodles',
    title: 'Signature Wok Hakka Noodles',
    category: 'mains',
    alt: 'Wok-tossed noodles with crisp seasonal vegetables, garlic, and savory house chili oil.',
  },
  'Palak patta chaat.png': {
    id: 'palak-patta-chaat',
    title: 'Crisp Palak Patta Chaat',
    category: 'bites',
    alt: 'Crispy battered baby spinach leaves layered with spiced churned yogurt, date-tamarind chutney, and pomegranate seeds.',
  },
  'Strawberry matcha latte.PNG': {
    id: 'strawberry-matcha-latte',
    title: 'Iced Strawberry Matcha Latte',
    category: 'drinks',
    alt: 'Tri-layer iced artisan beverage with crushed ripe strawberry compote, chilled milk, and ceremonial grade Uji matcha topped with a fresh strawberry skewer.',
  },
  'Teddy mousse.PNG': {
    id: 'teddy-mousse',
    title: 'Signature Teddy Chocolate Mousse',
    category: 'sweets',
    alt: 'Artisanal sculpted chocolate mousse in the shape of a sleeping teddy bear resting on golden butter crumble on an ivory ceramic plate.',
  },
  'Turkish eggs.PNG': {
    id: 'turkish-eggs',
    title: 'Cilbir Turkish Poached Eggs',
    category: 'bites',
    alt: 'Velvety garlic-infused Greek yogurt topped with soft poached eggs, warm Aleppo pepper chili butter, fresh dill, and toasted sourdough.',
  },
  'Whole Protein Wrap.PNG': {
    id: 'whole-protein-wrap',
    title: 'Garden Protein Wellness Wrap',
    category: 'bites',
    alt: 'Nutritious whole wheat wrap packed with grilled plant protein, crisp salad greens, and light tahini dressing.',
  },
  // Ambience & Interior Photography Assets
  'ChatGPT Image Sep 17, 2026, 05_49_37 PM.png': {
    id: 'ambience-woven-booths',
    title: 'Woven Privacy Booths',
    category: 'ambience',
    alt: 'Curved olive green woven partition screens with low ivory bouclé lounge chairs and modern marble pedestal tables under warm ambient paper lanterns.',
  },
  'ChatGPT Image Sep 17, 2026, 05_49_47 PM.png': {
    id: 'ambience-interior-dining',
    title: 'The Main Dining Sanctuary',
    category: 'ambience',
    alt: 'Spacious main dining hall with sage green upholstered chairs, marble tables, long ivory curved banquette, skylight ceiling coffer, and warm plaster arches.',
  },
  'ChatGPT Image Sep 19, 2026, 08_55_48 PM.png': {
    id: 'ambience-exterior-night-v1',
    title: 'Clubhouse Café Exterior Night — v1',
    category: 'ambience',
    alt: 'Clubhouse Café dramatic night-time exterior with glowing green hedge signage, golden CLUBHOUSE lettering, checkered marble courtyard, velvet rope entrance, and lit facade.',
  },
  'Untitled design (27).png': {
    id: 'ambience-dining-hall',
    title: 'Clubhouse Café — Grand Exterior Entrance',
    category: 'ambience',
    alt: 'Clubhouse Café stunning night exterior: glowing golden CLUBHOUSE hedge sign, lit facade with CLUBHOUSE CAFE signage, Clubhouse branded flower bucket, velvet rope entrance, and elegant checkered marble courtyard.',
  },

  'ChatGPT Image Sep 17, 2026, 05_49_53 PM.png': {
    id: 'ambience-sculptural-nook',
    title: 'Sculptural Seating Corner',
    category: 'ambience',
    alt: 'Modern architectural corner showcasing sculptural circular green chairs, warm ochre plaster arches, and indoor palms.',
  },
  'ChatGPT Image Sep 17, 2026, 05_49_59 PM.png': {
    id: 'ambience-table-gathering',
    title: 'The Social Table',
    category: 'ambience',
    alt: 'Sunlit marble dining table set with dimsums in bamboo steamers, artisan craft cocktails, mezze platter, and delicate baby’s breath flowers beside a plush banquette.',
  },
  'ChatGPT Image Sep 17, 2026, 05_50_05 PM.png': {
    id: 'ambience-curved-banquette',
    title: 'Curved Lounge Banquette',
    category: 'ambience',
    alt: 'Elevated view of a sweeping crescent light grey banquette, oval marble table laden with culinary delicacies, and lush indoor greenery.',
  },
};

async function getSharpInstance(filePath) {
  const s = sharp(filePath);
  const meta = await s.metadata();
  return {
    instance: s,
    width: meta.width,
    height: meta.height,
  };
}

async function optimizeImages() {
  console.log('--- Clubhouse Café Image Optimization Pipeline ---');
  
  const allImageSources = [];
  if (fs.existsSync(SOURCE_DIR)) {
    for (const f of fs.readdirSync(SOURCE_DIR).filter(f => !f.startsWith('.'))) {
      allImageSources.push({ dir: SOURCE_DIR, file: f });
    }
  }
  if (fs.existsSync(AMBIENCE_DIR)) {
    for (const f of fs.readdirSync(AMBIENCE_DIR).filter(f => !f.startsWith('.'))) {
      allImageSources.push({ dir: AMBIENCE_DIR, file: f });
    }
  }

  let totalRawBytes = 0;
  let totalOptimizedBytes = 0;
  const imageRegistry = {};
  const reportRows = [];

  for (const item of allImageSources) {
    const file = item.file;
    const filePath = path.join(item.dir, file);
    const stat = fs.statSync(filePath);
    const rawSize = stat.size;
    totalRawBytes += rawSize;

    const meta = METADATA_MAP[file] || {
      id: file.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-'),
      title: file.replace(/\.[^/.]+$/, ''),
      category: 'general',
      alt: 'Clubhouse Café presentation.',
    };

    console.log(`Processing [${meta.id}] from ${file}...`);
    const { instance: baseSharp, width: origWidth, height: origHeight } = await getSharpInstance(filePath);
    const aspectRatio = (origWidth / origHeight).toFixed(4);

    let baseBuffer = null;
    const avifSrcsetParts = [];
    const webpSrcsetParts = [];
    let itemOptimizedBytes = 0;
    let defaultWebpSrc = '';

    for (const w of RESPONSIVE_WIDTHS) {
      if (w > origWidth * 1.1 && w !== 480) continue;

      const targetWidth = Math.min(w, origWidth);
      const avifFileName = `${meta.id}-${w}w.avif`;
      const webpFileName = `${meta.id}-${w}w.webp`;
      const avifPath = path.join(OUTPUT_DIR, avifFileName);
      const webpPath = path.join(OUTPUT_DIR, webpFileName);

      const needsAvif = !fs.existsSync(avifPath);
      const needsWebp = !fs.existsSync(webpPath);

      if (needsAvif || needsWebp) {
        if (!baseBuffer) {
          baseBuffer = await baseSharp.png().toBuffer();
        }
      }

      // AVIF variant
      if (needsAvif) {
        await sharp(baseBuffer)
          .resize({ width: targetWidth, withoutEnlargement: true })
          .avif({ quality: 78, effort: 4 })
          .toFile(avifPath);
      }

      // WebP variant
      if (needsWebp) {
        await sharp(baseBuffer)
          .resize({ width: targetWidth, withoutEnlargement: true })
          .webp({ quality: 82, effort: 4 })
          .toFile(webpPath);
      }

      const avifStat = fs.statSync(avifPath);
      const webpStat = fs.statSync(webpPath);
      itemOptimizedBytes += webpStat.size;

      avifSrcsetParts.push(`/images/optimized/${avifFileName} ${w}w`);
      webpSrcsetParts.push(`/images/optimized/${webpFileName} ${w}w`);

      if (w === 1080 || (!defaultWebpSrc && w >= 768)) {
        defaultWebpSrc = `/images/optimized/${webpFileName}`;
      }
    }

    if (!defaultWebpSrc) {
      defaultWebpSrc = `/images/optimized/${meta.id}-768w.webp`;
    }

    totalOptimizedBytes += itemOptimizedBytes;

    const itemSavingsPercent = (((rawSize - itemOptimizedBytes) / rawSize) * 100).toFixed(1);

    reportRows.push({
      id: meta.id,
      title: meta.title,
      sourceMB: (rawSize / (1024 * 1024)).toFixed(2),
      optimizedKB: (itemOptimizedBytes / 1024).toFixed(0),
      savings: `${itemSavingsPercent}%`,
      variants: webpSrcsetParts.length * 2,
    });

    imageRegistry[meta.id] = {
      id: meta.id,
      title: meta.title,
      category: meta.category,
      alt: meta.alt,
      width: origWidth,
      height: origHeight,
      aspectRatio: Number(aspectRatio),
      defaultSrc: defaultWebpSrc,
      avifSrcset: avifSrcsetParts.join(', '),
      webpSrcset: webpSrcsetParts.join(', '),
      sizes: '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw',
    };
  }

  // Save metadata JSON
  fs.writeFileSync(DATA_OUTPUT, JSON.stringify(imageRegistry, null, 2), 'utf-8');

  // Print build-time report
  console.log('\n================ IMAGE OPTIMIZATION REPORT ================');
  console.table(reportRows);
  const totalRawMB = (totalRawBytes / (1024 * 1024)).toFixed(2);
  const totalOptMB = (totalOptimizedBytes / (1024 * 1024)).toFixed(2);
  const overallReduction = (((totalRawBytes - totalOptimizedBytes) / totalRawBytes) * 100).toFixed(1);
  console.log(`\nOriginal Assets Total:    ${totalRawMB} MB (${allImageSources.length} files)`);
  console.log(`Optimized WebP/AVIF Avg:   ${totalOptMB} MB equivalent`);
  console.log(`Measured Size Reduction:   ${overallReduction}%`);
  console.log(`Output Directory:          ${OUTPUT_DIR}`);
  console.log(`Image Metadata Registry:   ${DATA_OUTPUT}`);
  console.log('===========================================================\n');
}

optimizeImages().catch((err) => {
  console.error('Error optimizing images:', err);
  process.exit(1);
});
