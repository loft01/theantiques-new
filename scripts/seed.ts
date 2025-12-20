import { config as dotenvConfig } from 'dotenv'
dotenvConfig({ path: '.env.local' })

import path from 'path'
import fs from 'fs'

// Image URLs from Lorem Picsum (reliable placeholder service)
// Using seeded IDs for consistent results
const CATEGORY_IMAGES = {
  furniture: 'https://picsum.photos/seed/furniture/800/600',
  lighting: 'https://picsum.photos/seed/lighting/800/600',
  fineArt: 'https://picsum.photos/seed/fineart/800/600',
  ceramics: 'https://picsum.photos/seed/ceramics/800/600',
  jewelry: 'https://picsum.photos/seed/jewelry/800/600',
  decorative: 'https://picsum.photos/seed/decorative/800/600',
}

const PRODUCT_IMAGES = {
  furniture: [
    'https://picsum.photos/seed/furn1/800/600',
    'https://picsum.photos/seed/furn2/800/600',
    'https://picsum.photos/seed/furn3/800/600',
    'https://picsum.photos/seed/furn4/800/600',
    'https://picsum.photos/seed/furn5/800/600',
    'https://picsum.photos/seed/furn6/800/600',
    'https://picsum.photos/seed/furn7/800/600',
    'https://picsum.photos/seed/furn8/800/600',
    'https://picsum.photos/seed/furn9/800/600',
    'https://picsum.photos/seed/furn10/800/600',
  ],
  lighting: [
    'https://picsum.photos/seed/light1/800/600',
    'https://picsum.photos/seed/light2/800/600',
    'https://picsum.photos/seed/light3/800/600',
    'https://picsum.photos/seed/light4/800/600',
    'https://picsum.photos/seed/light5/800/600',
    'https://picsum.photos/seed/light6/800/600',
  ],
  fineArt: [
    'https://picsum.photos/seed/art1/800/600',
    'https://picsum.photos/seed/art2/800/600',
    'https://picsum.photos/seed/art3/800/600',
    'https://picsum.photos/seed/art4/800/600',
    'https://picsum.photos/seed/art5/800/600',
    'https://picsum.photos/seed/art6/800/600',
  ],
  ceramics: [
    'https://picsum.photos/seed/ceramic1/800/600',
    'https://picsum.photos/seed/ceramic2/800/600',
    'https://picsum.photos/seed/ceramic3/800/600',
    'https://picsum.photos/seed/ceramic4/800/600',
    'https://picsum.photos/seed/ceramic5/800/600',
    'https://picsum.photos/seed/ceramic6/800/600',
  ],
  jewelry: [
    'https://picsum.photos/seed/jewel1/800/600',
    'https://picsum.photos/seed/jewel2/800/600',
    'https://picsum.photos/seed/jewel3/800/600',
    'https://picsum.photos/seed/jewel4/800/600',
    'https://picsum.photos/seed/jewel5/800/600',
    'https://picsum.photos/seed/jewel6/800/600',
  ],
  decorative: [
    'https://picsum.photos/seed/decor1/800/600',
    'https://picsum.photos/seed/decor2/800/600',
    'https://picsum.photos/seed/decor3/800/600',
    'https://picsum.photos/seed/decor4/800/600',
    'https://picsum.photos/seed/decor5/800/600',
    'https://picsum.photos/seed/decor6/800/600',
  ],
}

// Categories with subcategories
const CATEGORIES = [
  {
    name: 'Furniture',
    slug: 'furniture',
    description: 'Timeless furniture pieces from the 18th to 20th century, including tables, chairs, cabinets, and more.',
    imageKey: 'furniture' as const,
    subcategories: [
      { name: 'Tables', slug: 'tables' },
      { name: 'Chairs', slug: 'chairs' },
      { name: 'Cabinets', slug: 'cabinets' },
      { name: 'Desks', slug: 'desks' },
      { name: 'Sofas', slug: 'sofas' },
    ],
  },
  {
    name: 'Lighting',
    slug: 'lighting',
    description: 'Antique and vintage lighting fixtures including chandeliers, table lamps, and wall sconces.',
    imageKey: 'lighting' as const,
    subcategories: [
      { name: 'Chandeliers', slug: 'chandeliers' },
      { name: 'Table Lamps', slug: 'table-lamps' },
      { name: 'Floor Lamps', slug: 'floor-lamps' },
      { name: 'Wall Sconces', slug: 'wall-sconces' },
    ],
  },
  {
    name: 'Fine Art',
    slug: 'fine-art',
    description: 'Original paintings, prints, and sculptures from renowned and emerging artists.',
    imageKey: 'fineArt' as const,
    subcategories: [
      { name: 'Paintings', slug: 'paintings' },
      { name: 'Sculptures', slug: 'sculptures' },
      { name: 'Prints', slug: 'prints' },
      { name: 'Drawings', slug: 'drawings' },
    ],
  },
  {
    name: 'Ceramics',
    slug: 'ceramics',
    description: 'Fine porcelain, pottery, and ceramic pieces from around the world.',
    imageKey: 'ceramics' as const,
    subcategories: [
      { name: 'Vases', slug: 'vases' },
      { name: 'Plates', slug: 'plates' },
      { name: 'Figurines', slug: 'figurines' },
      { name: 'Bowls', slug: 'bowls' },
    ],
  },
  {
    name: 'Jewelry',
    slug: 'jewelry',
    description: 'Estate and vintage jewelry including rings, necklaces, brooches, and watches.',
    imageKey: 'jewelry' as const,
    subcategories: [
      { name: 'Rings', slug: 'rings' },
      { name: 'Necklaces', slug: 'necklaces' },
      { name: 'Brooches', slug: 'brooches' },
      { name: 'Watches', slug: 'watches' },
    ],
  },
  {
    name: 'Decorative Arts',
    slug: 'decorative-arts',
    description: 'Decorative objects, mirrors, textiles, and home accessories with historical significance.',
    imageKey: 'decorative' as const,
    subcategories: [
      { name: 'Mirrors', slug: 'mirrors' },
      { name: 'Clocks', slug: 'clocks' },
      { name: 'Textiles', slug: 'textiles' },
      { name: 'Objects', slug: 'objects' },
    ],
  },
]

// Products with multiple images
const PRODUCTS = [
  // Furniture (10 products)
  {
    title: 'Georgian Mahogany Dining Table',
    description: `An exceptional Georgian mahogany dining table dating from circa 1780. Features elegant cabriole legs with carved ball and claw feet. The table extends to seat ten comfortably with its two additional leaves.

### Provenance
From the estate of Lord Pemberton, Wiltshire. Documented in the family inventory since 1812.

### Condition
Rich patina developed over centuries of careful use. Minor restoration to one leg. All leaves present and functional.`,
    price: 12500,
    era: '18th Century',
    origin: 'England',
    dimensions: '180 x 90 x 76 cm',
    categorySlug: 'furniture',
    status: 'available' as const,
    featured: true,
    imageCount: 4,
  },
  {
    title: 'Victorian Chesterfield Sofa',
    description: `Classic Victorian Chesterfield sofa in deep burgundy leather with traditional button-tufted back and rolled arms. Original brass castors. Horsehair stuffing and coil springs provide exceptional comfort.

A defining piece of Victorian elegance that has aged beautifully over the past 150 years.`,
    price: 8900,
    era: '19th Century',
    origin: 'England',
    dimensions: '220 x 95 x 80 cm',
    categorySlug: 'furniture',
    status: 'available' as const,
    featured: true,
    imageCount: 3,
  },
  {
    title: 'Art Deco Cocktail Cabinet',
    description: `Stunning Art Deco cocktail cabinet in burr walnut with ebonized trim. Interior features mirrored back, glass shelves, and original cocktail accessories. A statement piece from the glamorous 1930s.`,
    price: 6500,
    era: '1930s',
    origin: 'France',
    dimensions: '120 x 45 x 140 cm',
    categorySlug: 'furniture',
    status: 'pending' as const,
    featured: false,
    imageCount: 4,
  },
  {
    title: 'Louis XV Writing Desk',
    description: `Elegant Louis XV style writing desk with gilt bronze mounts and marquetry top featuring floral designs. Three drawers with original brass handles. A beautiful example of French craftsmanship.`,
    price: 15800,
    era: '19th Century',
    origin: 'France',
    dimensions: '130 x 70 x 78 cm',
    categorySlug: 'furniture',
    status: 'available' as const,
    featured: true,
    imageCount: 3,
  },
  {
    title: 'Regency Bergere Armchair',
    description: `Fine Regency period bergere armchair with original caned seat and back. Mahogany frame with reeded legs and brass caps. Includes a custom-made silk cushion in cream.`,
    price: 4200,
    era: 'Early 19th Century',
    origin: 'England',
    dimensions: '65 x 70 x 95 cm',
    categorySlug: 'furniture',
    status: 'available' as const,
    featured: false,
    imageCount: 2,
  },
  {
    title: 'Dutch Colonial Armoire',
    description: `Magnificent Dutch Colonial armoire in solid teak with carved floral panels and original brass hardware. The interior features adjustable shelving and a hanging rail.`,
    price: 9800,
    era: '18th Century',
    origin: 'Indonesia (Dutch East Indies)',
    dimensions: '220 x 120 x 60 cm',
    categorySlug: 'furniture',
    status: 'available' as const,
    featured: false,
    imageCount: 3,
  },
  {
    title: 'Biedermeier Secretaire',
    description: `Elegant Biedermeier secretaire in cherry wood with ebonized columns. Features a fall-front writing surface revealing fitted interior with multiple small drawers and secret compartments.`,
    price: 7200,
    era: 'circa 1830',
    origin: 'Austria',
    dimensions: '100 x 50 x 150 cm',
    categorySlug: 'furniture',
    status: 'available' as const,
    featured: false,
    imageCount: 4,
  },
  {
    title: 'Campaign Officer Chest',
    description: `Rare British campaign chest in brass-bound camphor wood. Designed to split in two for military transport. Complete with original leather carrying handles and brass corners.`,
    price: 5500,
    era: '19th Century',
    origin: 'England',
    dimensions: '100 x 55 x 120 cm',
    categorySlug: 'furniture',
    status: 'sold' as const,
    featured: false,
    imageCount: 2,
  },
  {
    title: 'Italian Marble Console Table',
    description: `Exquisite Italian console table with Carrara marble top and gilt iron base featuring scrollwork and acanthus leaves. A stunning entrance piece.`,
    price: 6800,
    era: '19th Century',
    origin: 'Italy',
    dimensions: '140 x 45 x 85 cm',
    categorySlug: 'furniture',
    status: 'available' as const,
    featured: true,
    imageCount: 3,
  },
  {
    title: 'Chinese Elm Altar Table',
    description: `Graceful Chinese altar table in elm wood with traditional mortise and tenon joinery. Features elegant curved spandrels and a simple horsehoof leg design.`,
    price: 4800,
    era: 'Qing Dynasty',
    origin: 'China',
    dimensions: '180 x 45 x 90 cm',
    categorySlug: 'furniture',
    status: 'available' as const,
    featured: false,
    imageCount: 2,
  },
  // Lighting (6 products)
  {
    title: 'Murano Glass Chandelier',
    description: `Spectacular mid-century Murano glass chandelier with cascading crystal drops in soft amber and clear glass. Features 12 light fittings. An iconic piece from the renowned Venini workshop.`,
    price: 18500,
    era: '1960s',
    origin: 'Italy',
    dimensions: '100 x 100 x 120 cm',
    categorySlug: 'lighting',
    status: 'available' as const,
    featured: true,
    imageCount: 4,
  },
  {
    title: 'Tiffany Studios Table Lamp',
    description: `Authentic Tiffany Studios table lamp with dragonfly pattern shade in vibrant blues and greens. Bronze base with original patina. Signed and numbered. A museum-quality piece.`,
    price: 45000,
    era: 'Early 20th Century',
    origin: 'United States',
    dimensions: '45 x 45 x 68 cm',
    categorySlug: 'lighting',
    status: 'sold' as const,
    featured: true,
    imageCount: 3,
  },
  {
    title: 'Art Nouveau Floor Lamp',
    description: `Elegant Art Nouveau floor lamp in patinated bronze with organic, flowing forms. Frosted glass shade with etched floral motifs. Attributed to the school of Hector Guimard.`,
    price: 7800,
    era: 'circa 1900',
    origin: 'France',
    dimensions: '45 x 45 x 175 cm',
    categorySlug: 'lighting',
    status: 'available' as const,
    featured: false,
    imageCount: 2,
  },
  {
    title: 'Empire Bronze Wall Sconces',
    description: `Pair of Empire period wall sconces in gilt bronze with classical motifs including laurel wreaths and winged victories. Original gilding in excellent condition. Electrified for modern use.`,
    price: 5600,
    era: 'Early 19th Century',
    origin: 'France',
    dimensions: '25 x 15 x 45 cm each',
    categorySlug: 'lighting',
    status: 'available' as const,
    featured: false,
    imageCount: 3,
  },
  {
    title: 'Danish Modern Pendant Light',
    description: `Iconic PH5 pendant light designed by Poul Henningsen for Louis Poulsen. Original 1960s production in white with red and blue accent rings. Creates beautiful, glare-free illumination.`,
    price: 2800,
    era: '1960s',
    origin: 'Denmark',
    dimensions: '50 x 50 x 28 cm',
    categorySlug: 'lighting',
    status: 'pending' as const,
    featured: false,
    imageCount: 2,
  },
  {
    title: 'Bohemian Crystal Chandelier',
    description: `Magnificent Bohemian crystal chandelier with eight arms and hundreds of hand-cut crystal pendants. Features gilt bronze structure with foliate details.`,
    price: 12000,
    era: '19th Century',
    origin: 'Czech Republic',
    dimensions: '80 x 80 x 100 cm',
    categorySlug: 'lighting',
    status: 'available' as const,
    featured: true,
    imageCount: 4,
  },
  // Fine Art (6 products)
  {
    title: 'Italian Renaissance Oil Painting',
    description: `School of Titian oil painting depicting a mythological scene with Venus and Adonis. Rich colors and masterful technique. Presented in a period gilt frame. Provenance documentation available.`,
    price: 85000,
    era: '16th Century',
    origin: 'Italy',
    dimensions: '120 x 90 cm',
    categorySlug: 'fine-art',
    status: 'available' as const,
    featured: true,
    imageCount: 3,
  },
  {
    title: 'Impressionist Garden Landscape',
    description: `Charming Impressionist landscape in the manner of Monet, depicting a garden scene with water lilies and willows. Signed by the artist. Original frame from the period.`,
    price: 28000,
    era: 'Late 19th Century',
    origin: 'France',
    dimensions: '80 x 60 cm',
    categorySlug: 'fine-art',
    status: 'available' as const,
    featured: true,
    imageCount: 2,
  },
  {
    title: 'Bronze Horse Sculpture',
    description: `Dynamic bronze sculpture of a rearing horse in the style of Frederic Remington. Rich brown patina with golden highlights. Mounted on a black marble base.`,
    price: 12500,
    era: 'Early 20th Century',
    origin: 'United States',
    dimensions: '45 x 20 x 55 cm',
    categorySlug: 'fine-art',
    status: 'available' as const,
    featured: false,
    imageCount: 4,
  },
  {
    title: 'Japanese Woodblock Print',
    description: `Rare Hokusai woodblock print from the Thirty-six Views of Mount Fuji series. Excellent impression with vibrant colors. Professionally framed with UV-protective glass.`,
    price: 35000,
    era: 'circa 1830',
    origin: 'Japan',
    dimensions: '38 x 26 cm',
    categorySlug: 'fine-art',
    status: 'sold' as const,
    featured: false,
    imageCount: 2,
  },
  {
    title: 'Modernist Abstract Painting',
    description: `Bold abstract composition in the style of Rothko. Large-scale canvas with floating rectangles in deep blues and burnt orange. Signed and dated by the artist.`,
    price: 18000,
    era: '1970s',
    origin: 'United States',
    dimensions: '180 x 150 cm',
    categorySlug: 'fine-art',
    status: 'available' as const,
    featured: false,
    imageCount: 2,
  },
  {
    title: 'Dutch Golden Age Portrait',
    description: `Circle of Rembrandt portrait of a merchant in characteristic chiaroscuro style. Oil on oak panel with period frame. Includes scholarly documentation.`,
    price: 65000,
    era: '17th Century',
    origin: 'Netherlands',
    dimensions: '60 x 50 cm',
    categorySlug: 'fine-art',
    status: 'available' as const,
    featured: true,
    imageCount: 3,
  },
  // Ceramics (5 products)
  {
    title: 'Chinese Ming Dynasty Vase',
    description: `Exceptional blue and white porcelain vase from the Ming Dynasty, featuring traditional dragon motifs. Museum deaccessioned with full documentation. A rare collector piece.`,
    price: 125000,
    era: '15th Century',
    origin: 'China',
    dimensions: '35 cm height',
    categorySlug: 'ceramics',
    status: 'available' as const,
    featured: true,
    imageCount: 4,
  },
  {
    title: 'Meissen Porcelain Figurine',
    description: `Delicate Meissen figurine depicting a courting couple in 18th-century dress. Hand-painted with fine detail. Crossed swords mark and incised model number.`,
    price: 4500,
    era: '19th Century',
    origin: 'Germany',
    dimensions: '22 cm height',
    categorySlug: 'ceramics',
    status: 'available' as const,
    featured: false,
    imageCount: 3,
  },
  {
    title: 'Japanese Satsuma Bowl',
    description: `Finely decorated Satsuma bowl with gilt and polychrome enamel depicting geishas in a garden. Excellent condition with no repairs. Signed by the artist.`,
    price: 3200,
    era: 'Meiji Period',
    origin: 'Japan',
    dimensions: '18 cm diameter',
    categorySlug: 'ceramics',
    status: 'pending' as const,
    featured: false,
    imageCount: 3,
  },
  {
    title: 'Arts & Crafts Pottery Vase',
    description: `Stunning Rookwood Pottery vase with matte green glaze and incised floral design. Flame mark and artist initials on base. A fine example of American art pottery.`,
    price: 2800,
    era: 'Early 20th Century',
    origin: 'United States',
    dimensions: '28 cm height',
    categorySlug: 'ceramics',
    status: 'available' as const,
    featured: false,
    imageCount: 2,
  },
  {
    title: 'Delft Blue Charger',
    description: `Large antique Delft charger with traditional blue and white decoration depicting a pastoral scene. Some minor glaze wear consistent with age.`,
    price: 1800,
    era: '18th Century',
    origin: 'Netherlands',
    dimensions: '35 cm diameter',
    categorySlug: 'ceramics',
    status: 'available' as const,
    featured: false,
    imageCount: 2,
  },
  // Jewelry (5 products)
  {
    title: 'Art Deco Diamond Ring',
    description: `Breathtaking Art Deco platinum ring featuring a 2.5 carat emerald-cut diamond surrounded by calibre-cut sapphires. Original period mounting in pristine condition.`,
    price: 45000,
    era: '1920s',
    origin: 'France',
    dimensions: 'Size 6.5',
    categorySlug: 'jewelry',
    status: 'available' as const,
    featured: true,
    imageCount: 3,
  },
  {
    title: 'Victorian Pearl Necklace',
    description: `Elegant graduated natural pearl necklace with diamond-set clasp. 89 pearls ranging from 4mm to 9mm. Accompanied by GIA certification. Excellent luster.`,
    price: 28000,
    era: 'Late 19th Century',
    origin: 'England',
    dimensions: '45 cm length',
    categorySlug: 'jewelry',
    status: 'available' as const,
    featured: true,
    imageCount: 2,
  },
  {
    title: 'Antique Cameo Brooch',
    description: `Exquisite shell cameo brooch depicting the goddess Diana, set in an 18k gold frame with seed pearls. Fine Italian carving with exceptional detail.`,
    price: 3200,
    era: 'Victorian',
    origin: 'Italy',
    dimensions: '5 x 4 cm',
    categorySlug: 'jewelry',
    status: 'pending' as const,
    featured: false,
    imageCount: 2,
  },
  {
    title: 'Patek Philippe Pocket Watch',
    description: `Rare Patek Philippe 18k gold pocket watch with perpetual calendar and moon phase. Hunter case with engine-turned decoration. Complete with original box and papers.`,
    price: 125000,
    era: 'Early 20th Century',
    origin: 'Switzerland',
    dimensions: '48mm diameter',
    categorySlug: 'jewelry',
    status: 'sold' as const,
    featured: true,
    imageCount: 4,
  },
  {
    title: 'Edwardian Sapphire Bracelet',
    description: `Delicate Edwardian platinum bracelet featuring alternating sapphires and diamonds in a millegrain setting. Excellent original condition.`,
    price: 15000,
    era: 'Edwardian',
    origin: 'England',
    dimensions: '18 cm length',
    categorySlug: 'jewelry',
    status: 'available' as const,
    featured: false,
    imageCount: 2,
  },
  // Decorative Arts (5 products)
  {
    title: 'Venetian Etched Mirror',
    description: `Grand Venetian mirror with elaborate etched and beveled glass frame. Floral motifs with original mirror plates showing attractive foxing. A stunning focal piece.`,
    price: 8500,
    era: '19th Century',
    origin: 'Italy',
    dimensions: '150 x 100 cm',
    categorySlug: 'decorative-arts',
    status: 'available' as const,
    featured: true,
    imageCount: 3,
  },
  {
    title: 'French Ormolu Mantel Clock',
    description: `Magnificent Louis XVI style ormolu mantel clock with Sevres-style porcelain panels. Eight-day movement striking on the hour and half hour. Original gilding.`,
    price: 12000,
    era: '19th Century',
    origin: 'France',
    dimensions: '50 x 25 x 60 cm',
    categorySlug: 'decorative-arts',
    status: 'available' as const,
    featured: true,
    imageCount: 4,
  },
  {
    title: 'Persian Silk Carpet',
    description: `Exceptional hand-knotted Persian silk carpet from Isfahan. Intricate floral medallion design in soft blues, ivory, and coral. Over 600 knots per square inch.`,
    price: 45000,
    era: 'Early 20th Century',
    origin: 'Persia (Iran)',
    dimensions: '300 x 200 cm',
    categorySlug: 'decorative-arts',
    status: 'available' as const,
    featured: false,
    imageCount: 3,
  },
  {
    title: 'Chinese Cloisonne Vases',
    description: `Matched pair of Chinese cloisonne vases with dragon and phoenix motifs on a deep blue ground. Gilt bronze mounts. Excellent enamel condition throughout.`,
    price: 6800,
    era: '19th Century',
    origin: 'China',
    dimensions: '45 cm height each',
    categorySlug: 'decorative-arts',
    status: 'pending' as const,
    featured: false,
    imageCount: 3,
  },
  {
    title: 'Art Nouveau Bronze Bust',
    description: `Sensual Art Nouveau bronze bust of a young woman with flowing hair and closed eyes. Rich green-brown patina. Signed by the sculptor on the base.`,
    price: 5500,
    era: 'circa 1900',
    origin: 'France',
    dimensions: '40 cm height',
    categorySlug: 'decorative-arts',
    status: 'available' as const,
    featured: false,
    imageCount: 2,
  },
]

// Rich text helper
function createRichText(text: string) {
  const paragraphs = text.split('\n\n').filter(p => p.trim())

  return {
    root: {
      type: 'root',
      format: '' as const,
      indent: 0,
      version: 1,
      direction: 'ltr' as const,
      children: paragraphs.map(p => {
        const isHeading = p.startsWith('### ')
        const content = isHeading ? p.replace('### ', '') : p

        if (isHeading) {
          return {
            type: 'heading',
            tag: 'h3',
            format: '' as const,
            indent: 0,
            version: 1,
            direction: 'ltr' as const,
            children: [{ type: 'text', text: content, format: 0, version: 1 }],
          }
        }

        return {
          type: 'paragraph',
          format: '' as const,
          indent: 0,
          version: 1,
          direction: 'ltr' as const,
          textFormat: 0,
          children: [{ type: 'text', text: content, format: 0, version: 1 }],
        }
      }),
    },
  }
}

// Download image from URL with proper redirect handling
async function downloadImage(url: string, filename: string): Promise<string> {
  const mediaDir = path.join(process.cwd(), 'media')
  if (!fs.existsSync(mediaDir)) {
    fs.mkdirSync(mediaDir, { recursive: true })
  }

  const filepath = path.join(mediaDir, filename)

  // Skip if already downloaded and is a valid image
  if (fs.existsSync(filepath)) {
    const stats = fs.statSync(filepath)
    if (stats.size > 1000) {
      console.log(`  Cached: ${filename}`)
      return filepath
    }
    // Remove invalid file
    fs.unlinkSync(filepath)
  }

  // Use fetch API which handles redirects automatically
  const response = await fetch(url, { redirect: 'follow' })
  if (!response.ok) {
    throw new Error(`Failed to download ${url}: ${response.status}`)
  }

  const buffer = Buffer.from(await response.arrayBuffer())
  fs.writeFileSync(filepath, buffer)
  console.log(`  Downloaded: ${filename}`)
  return filepath
}

async function runSeed() {
  const { getPayload } = await import('payload')
  const { default: config } = await import('../src/payload.config')

  console.log('🌱 Starting comprehensive seed...\n')

  const payload = await getPayload({ config })

  // Clear existing data
  console.log('📦 Clearing existing data...')
  await payload.delete({ collection: 'products', where: { id: { exists: true } } })
  await payload.delete({ collection: 'categories', where: { id: { exists: true } } })
  console.log('   Existing data cleared.\n')

  // Download category images
  console.log('📷 Downloading category images...')
  const categoryImagePaths: Record<string, string> = {}
  for (const [key, url] of Object.entries(CATEGORY_IMAGES)) {
    const filename = `category-${key}.jpg`
    categoryImagePaths[key] = await downloadImage(url, filename)
  }
  console.log('')

  // Download product images
  console.log('📷 Downloading product images...')
  const productImagePaths: Record<string, string[]> = {}
  for (const [category, urls] of Object.entries(PRODUCT_IMAGES)) {
    productImagePaths[category] = []
    for (let i = 0; i < urls.length; i++) {
      const filename = `product-${category}-${i + 1}.jpg`
      const filepath = await downloadImage(urls[i], filename)
      productImagePaths[category].push(filepath)
    }
  }
  console.log('')

  // Upload image to Payload
  async function uploadImage(filepath: string, alt: string) {
    const filename = path.basename(filepath)

    // Check if already uploaded
    const existing = await payload.find({
      collection: 'media',
      where: { filename: { equals: filename } },
    })

    if (existing.docs.length > 0) {
      return existing.docs[0]
    }

    const media = await payload.create({
      collection: 'media',
      data: { alt },
      filePath: filepath,
    })

    return media
  }

  // Create categories
  console.log('📁 Creating categories...')
  const categoryMap: Record<string, string> = {}

  for (const cat of CATEGORIES) {
    // Upload category image
    const imageMedia = await uploadImage(
      categoryImagePaths[cat.imageKey],
      `${cat.name} category`
    )

    // Create parent category
    const category = await payload.create({
      collection: 'categories',
      data: {
        name: cat.name,
        slug: cat.slug,
        description: cat.description,
        image: imageMedia.id,
        featured: true,
      },
    })
    categoryMap[cat.slug] = category.id
    console.log(`   Created: ${cat.name}`)

    // Create subcategories
    for (const sub of cat.subcategories) {
      await payload.create({
        collection: 'categories',
        data: {
          name: sub.name,
          slug: sub.slug,
          parent: category.id,
          featured: false,
        },
      })
      console.log(`     └─ ${sub.name}`)
    }
  }
  console.log('')

  // Create products
  console.log('🏺 Creating products...')
  const imageIndex: Record<string, number> = {
    furniture: 0,
    lighting: 0,
    fineArt: 0,
    ceramics: 0,
    jewelry: 0,
    decorative: 0,
  }

  // Map category slugs to image keys
  const slugToImageKey: Record<string, string> = {
    furniture: 'furniture',
    lighting: 'lighting',
    'fine-art': 'fineArt',
    ceramics: 'ceramics',
    jewelry: 'jewelry',
    'decorative-arts': 'decorative',
  }

  for (const product of PRODUCTS) {
    const imageKey = slugToImageKey[product.categorySlug]
    const availableImages = productImagePaths[imageKey]

    // Upload multiple images for this product
    const productImages = []
    for (let i = 0; i < product.imageCount; i++) {
      const imgIndex = imageIndex[imageKey] % availableImages.length
      const media = await uploadImage(
        availableImages[imgIndex],
        `${product.title} - Image ${i + 1}`
      )
      productImages.push({ image: media.id })
      imageIndex[imageKey]++
    }

    // Create the product
    const slug = product.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+$/, '')
    await payload.create({
      collection: 'products',
      data: {
        title: product.title,
        slug,
        description: createRichText(product.description),
        price: product.price,
        priceLabel: 'asking',
        era: product.era,
        origin: product.origin,
        dimensions: product.dimensions,
        category: categoryMap[product.categorySlug],
        status: product.status,
        featured: product.featured,
        images: productImages,
      },
    })
    console.log(`   Created: ${product.title} (${product.imageCount} images)`)
  }

  // Update site settings
  console.log('\n⚙️  Updating site settings...')
  await payload.updateGlobal({
    slug: 'site-settings',
    data: {
      siteName: 'The Antiques',
      contactEmail: 'info@theantiques.com',
      contactPhone: '+39 02 1234 5678',
      address: 'Via Monte Napoleone 8, 20121 Milano, Italy',
      hero: {
        title: 'Curated Antiquities',
        subtitle: 'Exceptional pieces with provenance, character, and timeless appeal',
      },
      footerText: 'The Antiques. All rights reserved.',
      socialLinks: [
        { platform: 'instagram', url: 'https://instagram.com/theantiques' },
        { platform: 'facebook', url: 'https://facebook.com/theantiques' },
      ],
    },
  })

  console.log('\n✅ Seed completed successfully!')
  console.log(`   ${CATEGORIES.length} categories created`)
  console.log(`   ${CATEGORIES.reduce((sum, c) => sum + c.subcategories.length, 0)} subcategories created`)
  console.log(`   ${PRODUCTS.length} products created with multiple images`)

  process.exit(0)
}

runSeed().catch((err) => {
  console.error('❌ Seed error:', err)
  process.exit(1)
})
