export interface MenuItem {
  id: string;
  name: string;
  category: 'coffee' | 'bites' | 'mains' | 'sweets';
  imageId: string;
  description: string;
  tag?: string;
  signature?: boolean;
}

export interface MenuCategory {
  id: 'coffee' | 'bites' | 'mains' | 'sweets';
  label: string;
  subtitle: string;
}

export const menuCategories: MenuCategory[] = [
  {
    id: 'coffee',
    label: 'Coffee & Drinks',
    subtitle: 'From ceremonial matcha to artisanal slow-brewed roasts',
  },
  {
    id: 'bites',
    label: 'Bites & Small Plates',
    subtitle: 'Vibrant daytime tartines, poached eggs & sharing plates',
  },
  {
    id: 'mains',
    label: 'Mains & Comfort',
    subtitle: 'Neapolitan wood-fired pizzas, smashed brioche burgers & silky pastas',
  },
  {
    id: 'sweets',
    label: 'Artisanal Sweets',
    subtitle: 'Handcrafted desserts, sculpted mousses & warm skillet bakes',
  },
];

export const menuItems: MenuItem[] = [
  // COFFEE & DRINKS
  {
    id: 'strawberry-matcha-latte',
    name: 'Iced Strawberry Matcha Latte',
    category: 'coffee',
    imageId: 'strawberry-matcha-latte',
    description:
      'Tri-layer iced artisan beverage featuring crushed ripe strawberry compote, organic whole milk, and ceremonial-grade Uji matcha topped with a fresh strawberry skewer.',
    tag: 'Signature Drink',
    signature: true,
  },

  // BITES & BRUNCH
  {
    id: 'avocado-toast',
    name: 'Sourdough Avocado Tartines',
    category: 'bites',
    imageId: 'avocado-toast',
    description:
      'Trio of rustic sourdough tartines crowned with chunky hass avocado mash, jewel-like pomegranate pearls, toasted sunflower kernels, and grated parmesan.',
    tag: 'Brunch Favorite',
    signature: true,
  },
  {
    id: 'turkish-eggs',
    name: 'Cilbir Turkish Poached Eggs',
    category: 'bites',
    imageId: 'turkish-eggs',
    description:
      'Velvety garlic-infused Greek yogurt, warm Aleppo chili pepper butter, poached farm eggs, fresh garden dill, and crusty toasted sourdough spears.',
    tag: 'Chef Recommendation',
    signature: true,
  },
  {
    id: 'cream-cheese-dimsums',
    name: 'Truffled Cream Cheese Dimsums',
    category: 'bites',
    imageId: 'cream-cheese-dimsums',
    description:
      'Delicate steamed translucent crystal dumplings filled with rich cream cheese and fresh chives, accompanied by house-infused chili crunch oil.',
    tag: 'Social Plate',
  },
  {
    id: 'palak-patta-chaat',
    name: 'Crisp Palak Patta Chaat',
    category: 'bites',
    imageId: 'palak-patta-chaat',
    description:
      'Flash-fried baby spinach leaves delicately layered with churned spiced yogurt, tamarind date chutney, mint reduction, and crisp pomegranate seeds.',
    tag: 'House Special',
  },
  {
    id: 'crispy-corn',
    name: 'Wok-Tossed Crispy Pepper Corn',
    category: 'bites',
    imageId: 'crispy-corn',
    description:
      'Golden sweet corn kernels tossed with crisp scallions, bell peppers, aromatic cracked pepper, and Himalayan pink salt.',
  },
  {
    id: 'chicken-seekh-kebab',
    name: 'Charred Chicken Seekh Kebabs',
    category: 'bites',
    imageId: 'chicken-seekh-kebab',
    description:
      'Succulent spiced minced chicken kebabs char-grilled over embers, served with house mint yogurt emulsion and pickled shallots.',
  },
  {
    id: 'whole-protein-wrap',
    name: 'Garden Protein Wellness Wrap',
    category: 'bites',
    imageId: 'whole-protein-wrap',
    description:
      'Toasted multi-grain tortilla filled with seasoned plant protein, garden greens, cucumber ribbons, and light tahini citrus dressing.',
  },

  // MAINS
  {
    id: 'buratta-neapolitan-pizza',
    name: 'Neapolitan Burrata Pizza',
    category: 'mains',
    imageId: 'buratta-neapolitan-pizza',
    description:
      'Wood-fired leopard-crusted sourdough base topped with San Marzano pomodoro, baby arugula, sweet blistered cherry tomatoes, and a creamy whole Italian burrata ball.',
    tag: 'Artisan Crust',
    signature: true,
  },
  {
    id: 'smashed-chicken-burger',
    name: 'American Smashed Chicken Burger',
    category: 'mains',
    imageId: 'smashed-chicken-burger',
    description:
      'Crispy double-smashed chicken patty with melted artisanal cheese, house pickles, shredded iceberg, and secret clubhouse relish in a toasted butter brioche.',
  },
  {
    id: 'creamy-penne-alfredo',
    name: 'Silky Penne & Tagliatelle Alfredo',
    category: 'mains',
    imageId: 'creamy-penne-alfredo',
    description:
      'Al dente penne folded in a slow-simmered parmesan cream reduction with roasted garlic, cracked Tellicherry pepper, and herb-infused olive oil.',
  },
  {
    id: 'grilled-fish',
    name: 'Pan-Seared Herb Butter Fish',
    category: 'mains',
    imageId: 'grilled-fish',
    description:
      'Delicate pan-seared fish fillet basted with lemon caper herb butter, rested on a bed of garden-fresh greens and citrus emulsion.',
  },
  {
    id: 'fried-chicken-wrap',
    name: 'Golden Fried Chicken Wrap',
    category: 'mains',
    imageId: 'fried-chicken-wrap',
    description:
      'Crispy buttermilk-fried chicken breast rolled with crunchy cabbage slaw and house smoked paprika aioli in a griddled tortilla.',
  },
  {
    id: 'hakka-noodles',
    name: 'Signature Wok Hakka Noodles',
    category: 'mains',
    imageId: 'hakka-noodles',
    description:
      'High-heat wok-tossed noodles with shredded bell peppers, cabbage, toasted garlic, and dark soy aromatic oil.',
  },
  {
    id: 'amaranth-barley-salad',
    name: 'Warm Amaranth & Pearl Barley Salad',
    category: 'mains',
    imageId: 'amaranth-barley-salad',
    description:
      'Ancient grains of amaranth and pearl barley tossed with crisp seasonal greens, cherry tomatoes, and cold-pressed olive dressing.',
  },

  // SWEETS
  {
    id: 'teddy-mousse',
    name: 'Signature Teddy Chocolate Mousse',
    category: 'sweets',
    imageId: 'teddy-mousse',
    description:
      'Artisanal Belgian chocolate mousse sculpted in the shape of a resting teddy bear, laid on a bed of golden butter shortbread crumble.',
    tag: 'Clubhouse Icon',
    signature: true,
  },
  {
    id: 'skillet-brownie',
    name: 'Sizzling Skillet Hazelnut Brownie',
    category: 'sweets',
    imageId: 'skillet-brownie',
    description:
      'Warm gooey dark chocolate fudge brownie served in a cast iron skillet, crowned with piped hazelnut ganache rosettes and roasted hazelnuts.',
    tag: 'Warm Comfort',
    signature: true,
  },
  {
    id: 'tres-leches',
    name: 'Saffron Mango Tres Leches',
    category: 'sweets',
    imageId: 'tres-leches',
    description:
      'Airy sponge cake steeped in a saffron-infused sweet milk reduction, finished with piped chantilly cream and an edible purple bloom.',
    tag: 'Pastry Highlight',
  },
  {
    id: 'belgian-croissant',
    name: 'Artisanal Chocolate Croissant',
    category: 'sweets',
    imageId: 'belgian-croissant',
    description:
      'Handcrafted flaky French croissant with honeycomb crumb, drizzled generously with warm Belgian chocolate ganache and powdered sugar.',
  },
];
