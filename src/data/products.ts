export type Category = 'drinks' | 'snacks'

export interface Product {
  id: number
  slug: string
  name: string
  maker: string
  category: Category
  kind: string
  image: string
  description: string
  shortDescription: string
  notes: Array<string>
  size: string
  /** Shown on drink pages; drinks default to 0.0% ABV. */
  abv?: string
  pairsWith?: number
  badge?: string
  /** Price in whole US dollars. */
  price: number
}

const products: Array<Product> = [
  {
    id: 1,
    slug: 'yuzu-spritz',
    name: 'Yuzu Garden Spritz',
    maker: 'Little Orchard',
    category: 'drinks',
    kind: 'Sparkling botanical',
    image: '/img/yuzu-spritz.png',
    shortDescription: 'Bright yuzu, elderflower and a whisper of gentian. Built for sunny patios.',
    description:
      'A crisp, gently bitter spritz made with cold-pressed yuzu, elderflower and gentian root. Lightly sparkling, barely sweet and ready to pour straight over ice — no mixing, no hangover, all of the ritual.',
    notes: ['Yuzu', 'Elderflower', 'Gentian'],
    size: '4 × 250 ml cans',
    pairsWith: 7,
    badge: 'Bestseller',
    price: 14,
  },
  {
    id: 2,
    slug: 'hibiscus-aperitivo',
    name: 'Hibiscus Aperitivo',
    maker: 'Casa Rossa',
    category: 'drinks',
    kind: 'Zero-proof aperitif',
    image: '/img/hibiscus-aperitivo.png',
    shortDescription: 'Ruby-red and bittersweet. Top with soda for the perfect zero-proof spritz.',
    description:
      'Steeped hibiscus, blood orange peel and wormwood give this aperitivo its deep colour and grown-up bitterness. Mix one part with three parts soda water and an orange wheel for a sundown classic.',
    notes: ['Hibiscus', 'Blood orange', 'Wormwood'],
    size: '700 ml bottle',
    pairsWith: 8,
    price: 32,
  },
  {
    id: 3,
    slug: 'smoked-rosemary',
    name: 'Smoked Rosemary Reserve',
    maker: 'Ember & Oak',
    category: 'drinks',
    kind: 'Whiskey alternative',
    image: '/img/smoked-rosemary.png',
    shortDescription: 'Oak, smoke and charred rosemary. Sip slow over one big ice cube.',
    description:
      'Distilled botanicals rested on toasted oak, finished with smoked rosemary and a touch of cacao. Warming, dry and complex — a nightcap that keeps tomorrow morning clear.',
    notes: ['Toasted oak', 'Smoke', 'Rosemary'],
    size: '700 ml bottle',
    pairsWith: 9,
    badge: 'New',
    price: 38,
  },
  {
    id: 4,
    slug: 'sparkling-rose',
    name: 'Dealcoholised Sparkling Rosé',
    maker: 'Domaine Sobre',
    category: 'drinks',
    kind: 'Alcohol-removed wine',
    image: '/img/sparkling-rose.png',
    shortDescription: 'Real wine, gently dealcoholised. Strawberry, pink grapefruit, fine bubbles.',
    description:
      'Made from Pinot Noir and Grenache, fully fermented then gently vacuum-dealcoholised to keep every bit of aroma. Expect wild strawberry, pink grapefruit and a dry, persistent mousse.',
    notes: ['Strawberry', 'Grapefruit', 'Brioche'],
    size: '750 ml bottle',
    pairsWith: 10,
    price: 24,
  },
  {
    id: 5,
    slug: 'hazy-ipa',
    name: 'Cloud Cover Hazy IPA',
    maker: 'Low Tide Brewing',
    category: 'drinks',
    kind: 'Non-alcoholic beer',
    image: '/img/hazy-ipa.png',
    shortDescription: 'Juicy, soft and properly hoppy at 0.4%. Mango, pine and pithy citrus.',
    description:
      'Double dry-hopped with Citra and Mosaic for a soft, pillowy body and a tropical nose that rivals any full-strength IPA. Just 60 calories a can.',
    notes: ['Mango', 'Pine', 'Citrus'],
    size: '6 × 355 ml cans',
    abv: '0.4% ABV',
    pairsWith: 10,
    price: 16,
  },
  {
    id: 6,
    slug: 'ginger-kombucha',
    name: 'Ginger Turmeric Kombucha',
    maker: 'Good Culture Co.',
    category: 'drinks',
    kind: 'Raw kombucha',
    image: '/img/ginger-kombucha.png',
    shortDescription: 'Fiery fresh ginger and golden turmeric, naturally fermented and lively.',
    description:
      'Small-batch kombucha brewed on organic green tea and spiked with fresh ginger juice and turmeric root. Tangy, spicy and naturally effervescent — keep it cold.',
    notes: ['Ginger', 'Turmeric', 'Lemon'],
    size: '4 × 330 ml bottles',
    pairsWith: 7,
    price: 13,
  },
  {
    id: 7,
    slug: 'chili-almonds',
    name: 'Chili Lime Marcona Almonds',
    maker: 'Pantry Provisions',
    category: 'snacks',
    kind: 'Roasted nuts',
    image: '/img/chili-almonds.png',
    shortDescription: 'Buttery Spanish almonds roasted in olive oil with chili and lime zest.',
    description:
      'Plump Marcona almonds slow-roasted in extra virgin olive oil, then tossed with Aleppo chili, lime zest and flaky salt. Moreish alongside anything bubbly.',
    notes: ['Aleppo chili', 'Lime', 'Olive oil'],
    size: '150 g tin',
    pairsWith: 1,
    badge: 'Staff pick',
    price: 9,
  },
  {
    id: 8,
    slug: 'rosemary-crackers',
    name: 'Rosemary Sea Salt Crackers',
    maker: 'Hearth Bakery',
    category: 'snacks',
    kind: 'Crackers',
    image: '/img/rosemary-crackers.png',
    shortDescription: 'Shatter-thin crackers baked with fresh rosemary and Maldon salt.',
    description:
      'Rolled paper-thin from a sourdough starter and baked with fresh rosemary, olive oil and Maldon salt. Made for cheese boards, dips and late-night grazing.',
    notes: ['Rosemary', 'Sourdough', 'Sea salt'],
    size: '120 g box',
    pairsWith: 2,
    price: 7,
  },
  {
    id: 9,
    slug: 'chocolate-pretzels',
    name: 'Dark Chocolate Sea Salt Pretzels',
    maker: 'Twist & Co.',
    category: 'snacks',
    kind: 'Sweet & salty',
    image: '/img/chocolate-pretzels.png',
    shortDescription: 'Crunchy pretzels half-dipped in 70% dark chocolate with flaky salt.',
    description:
      'Classic baked pretzels hand-dipped in single-origin 70% dark chocolate and finished with flaky sea salt. The salty-sweet partner your nightcap has been missing.',
    notes: ['70% cacao', 'Flaky salt', 'Malt'],
    size: '180 g bag',
    pairsWith: 3,
    price: 8,
  },
  {
    id: 10,
    slug: 'truffle-popcorn',
    name: 'Truffle Parmesan Popcorn',
    maker: 'Pop Society',
    category: 'snacks',
    kind: 'Popcorn',
    image: '/img/truffle-popcorn.png',
    shortDescription: 'Air-popped and dusted with black truffle and aged parmesan.',
    description:
      'Light, air-popped corn tossed in truffle oil, aged Parmigiano and a crack of black pepper. Dangerously easy to finish in one movie.',
    notes: ['Black truffle', 'Parmesan', 'Pepper'],
    size: '90 g bag',
    pairsWith: 5,
    price: 6,
  },
]

export default products

export function getProduct(id: number) {
  return products.find((p) => p.id === id)
}

/** Serve catalog images through the Netlify Image CDN at a sensible width. */
export function imageUrl(src: string, width: number) {
  return `/.netlify/images?url=${encodeURIComponent(src)}&w=${width}&fm=webp&q=80`
}

export function formatPrice(dollars: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(dollars)
}

/** Orders at or above this amount ship free. */
export const FREE_SHIPPING_THRESHOLD = 50
