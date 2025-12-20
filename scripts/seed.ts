import { config as dotenvConfig } from 'dotenv'
dotenvConfig({ path: '.env.local' })

async function runSeed() {
  // Dynamic import to ensure env vars are loaded first
  const { getPayload } = await import('payload')
  const { default: config } = await import('../src/payload.config')

  const categories = [
    {
      name: 'Furniture',
      slug: 'furniture',
      description: 'Discover exceptional antique furniture pieces from various periods and styles, each with its own unique character and history.',
      featured: true,
    },
    {
      name: 'Lighting',
      slug: 'lighting',
      description: 'Illuminate your space with our collection of vintage chandeliers, lamps, and light fixtures from different eras.',
      featured: true,
    },
    {
      name: 'Decorative Arts',
      slug: 'decorative',
      description: 'Add character to your home with our selection of decorative antiques and objets d\'art.',
      featured: true,
    },
    {
      name: 'Fine Art',
      slug: 'art',
      description: 'Explore our curated collection of paintings, prints, and drawings from various periods.',
      featured: true,
    },
    {
      name: 'Jewelry',
      slug: 'jewelry',
      description: 'Timeless pieces of antique and vintage jewelry, from elegant necklaces to statement rings.',
      featured: true,
    },
    {
      name: 'Ceramics',
      slug: 'ceramics',
      description: 'Fine porcelain, pottery, and ceramic pieces from renowned makers and periods.',
      featured: true,
    },
  ]

  const subcategories = [
    { name: 'Chairs & Seating', slug: 'chairs', parent: 'furniture' },
    { name: 'Tables', slug: 'tables', parent: 'furniture' },
    { name: 'Cabinets & Storage', slug: 'cabinets', parent: 'furniture' },
    { name: 'Desks', slug: 'desks', parent: 'furniture' },
    { name: 'Chandeliers', slug: 'chandeliers', parent: 'lighting' },
    { name: 'Table Lamps', slug: 'table-lamps', parent: 'lighting' },
    { name: 'Wall Sconces', slug: 'wall-sconces', parent: 'lighting' },
    { name: 'Mirrors', slug: 'mirrors', parent: 'decorative' },
    { name: 'Clocks', slug: 'clocks', parent: 'decorative' },
    { name: 'Vases', slug: 'vases', parent: 'decorative' },
  ]

  function createRichText(html: string) {
    const paragraphs = html.split('\n\n').filter(p => p.trim())

    return {
      root: {
        type: 'root',
        format: '' as const,
        indent: 0,
        version: 1,
        direction: 'ltr' as const,
        children: paragraphs.map(p => {
          const isHeading = p.startsWith('### ')
          const text = isHeading ? p.replace('### ', '') : p

          if (isHeading) {
            return {
              type: 'heading',
              tag: 'h3',
              format: '' as const,
              indent: 0,
              version: 1,
              direction: 'ltr' as const,
              children: [{ type: 'text', text, format: 0, version: 1 }],
            }
          }

          return {
            type: 'paragraph',
            format: '' as const,
            indent: 0,
            version: 1,
            direction: 'ltr' as const,
            textFormat: 0,
            children: [{ type: 'text', text, format: 0, version: 1 }],
          }
        }),
      },
    }
  }

  const products = [
    {
      title: 'Victorian Mahogany Display Cabinet',
      slug: 'victorian-mahogany-cabinet',
      description: `A magnificent Victorian mahogany display cabinet, circa 1880, featuring beautifully crafted glazed doors with original glass panels. This exceptional piece showcases the finest craftsmanship of the era.

The cabinet features adjustable interior shelves, intricate carved details on the cornice, and retains its original brass hardware. The rich mahogany has developed a beautiful patina over the years.

### Provenance

Acquired from a private estate in Hampshire, England. Previously part of the Beaumont family collection.

### Condition

Excellent condition for age. Minor wear consistent with age and use. All original glass panels intact. Recently restored by our in-house craftsmen.`,
      price: 4800,
      priceLabel: 'asking' as const,
      status: 'available' as const,
      category: 'furniture',
      featured: true,
    },
    {
      title: 'Art Deco Crystal Chandelier',
      slug: 'art-deco-chandelier',
      description: `Stunning Art Deco crystal chandelier from the 1920s, featuring geometric brass framework and cascading crystal pendants. A true statement piece.

### Details

Original brass finish with beautiful age patina. All crystals intact and in excellent condition. Professionally rewired for modern use.`,
      price: 3200,
      priceLabel: 'asking' as const,
      status: 'available' as const,
      category: 'lighting',
      featured: true,
    },
    {
      title: 'French Louis XV Armchair',
      slug: 'french-armchair',
      description: `Elegant French Louis XV style armchair with original gilt frame and newly upholstered in premium silk damask. The carved details showcase exceptional French craftsmanship.`,
      price: 2800,
      priceLabel: 'asking' as const,
      status: 'available' as const,
      category: 'furniture',
      featured: true,
    },
    {
      title: 'Georgian Oak Writing Desk',
      slug: 'georgian-oak-desk',
      description: `A handsome Georgian period oak writing desk, circa 1780. Features a leather-inset writing surface and multiple drawers with original brass handles.`,
      price: 3500,
      priceLabel: 'asking' as const,
      status: 'pending' as const,
      category: 'furniture',
      featured: false,
    },
    {
      title: 'Antique Brass Table Lamp',
      slug: 'brass-table-lamp',
      description: `Beautiful antique brass table lamp with original glass shade. A perfect example of early 20th century lighting design.`,
      price: 650,
      priceLabel: 'asking' as const,
      status: 'available' as const,
      category: 'lighting',
      featured: false,
    },
    {
      title: 'Italian Marble Console Table',
      slug: 'marble-console-table',
      description: `Exquisite Italian marble console table with ornate gilded iron base. The Carrara marble top displays beautiful natural veining.`,
      price: 5200,
      priceLabel: 'asking' as const,
      status: 'available' as const,
      category: 'furniture',
      featured: true,
    },
    {
      title: 'Regency Mahogany Bookcase',
      slug: 'regency-bookcase',
      description: `Impressive Regency period mahogany bookcase with glazed upper section and solid lower cabinet. Original brass fittings throughout.`,
      price: 6800,
      priceLabel: 'asking' as const,
      status: 'available' as const,
      category: 'furniture',
      featured: false,
    },
    {
      title: 'Edwardian Wingback Chair',
      slug: 'edwardian-wingback',
      description: `Classic Edwardian wingback chair in original green leather. Beautiful turned mahogany legs with brass castors.`,
      price: 1800,
      priceLabel: 'asking' as const,
      status: 'sold' as const,
      category: 'furniture',
      featured: false,
    },
    {
      title: 'Venetian Glass Mirror',
      slug: 'venetian-mirror',
      description: `Stunning Venetian glass mirror with etched floral designs and beveled edges. A magnificent decorative piece.`,
      price: 2400,
      priceLabel: 'asking' as const,
      status: 'available' as const,
      category: 'decorative',
      featured: true,
    },
    {
      title: 'Chinese Porcelain Vase',
      slug: 'chinese-vase',
      description: `Fine Chinese export porcelain vase with hand-painted famille rose decoration. Qing Dynasty, 19th century.`,
      price: 3800,
      priceLabel: 'estimate' as const,
      status: 'available' as const,
      category: 'ceramics',
      featured: true,
    },
    {
      title: 'Art Nouveau Bronze Lamp',
      slug: 'art-nouveau-lamp',
      description: `Exquisite Art Nouveau bronze table lamp with original Tiffany-style glass shade. Signed by the artist.`,
      price: 4200,
      priceLabel: 'asking' as const,
      status: 'available' as const,
      category: 'lighting',
      featured: false,
    },
    {
      title: 'Victorian Grandfather Clock',
      slug: 'grandfather-clock',
      description: `Magnificent Victorian grandfather clock with hand-painted moon phase dial. Excellent working condition with original movement.`,
      price: 7500,
      priceLabel: 'offer' as const,
      status: 'available' as const,
      category: 'decorative',
      featured: true,
    },
  ]

  console.log('Starting seed...')

  const payload = await getPayload({ config })

  // Clear existing data
  console.log('Clearing existing data...')
  await payload.delete({ collection: 'products', where: { id: { exists: true } } })
  await payload.delete({ collection: 'categories', where: { id: { exists: true } } })

  // Create main categories
  console.log('Creating categories...')
  const categoryMap: Record<string, string> = {}

  for (const cat of categories) {
    const created = await payload.create({
      collection: 'categories',
      data: cat,
    })
    categoryMap[cat.slug] = created.id
    console.log(`  Created category: ${cat.name}`)
  }

  // Create subcategories
  console.log('Creating subcategories...')
  for (const sub of subcategories) {
    await payload.create({
      collection: 'categories',
      data: {
        name: sub.name,
        slug: sub.slug,
        parent: categoryMap[sub.parent],
        featured: false,
      },
    })
    console.log(`  Created subcategory: ${sub.name}`)
  }

  // Create products
  console.log('Creating products...')
  for (const product of products) {
    await payload.create({
      collection: 'products',
      data: {
        title: product.title,
        slug: product.slug,
        description: createRichText(product.description),
        price: product.price,
        priceLabel: product.priceLabel,
        status: product.status,
        category: categoryMap[product.category],
        featured: product.featured,
      },
    })
    console.log(`  Created product: ${product.title}`)
  }

  // Update site settings
  console.log('Updating site settings...')
  await payload.updateGlobal({
    slug: 'site-settings',
    data: {
      siteName: 'The Antiques',
      contactEmail: 'hello@theantiques.com',
      contactPhone: '+1 (555) 123-4567',
      address: '123 Antique Lane, London, UK',
      hero: {
        title: 'Timeless Treasures',
        subtitle: 'Discover unique vintage and antique pieces with stories to tell',
      },
      footerText: '© 2024 The Antiques. All rights reserved.',
      socialLinks: [
        { platform: 'instagram', url: 'https://instagram.com/theantiques' },
        { platform: 'facebook', url: 'https://facebook.com/theantiques' },
      ],
    },
  })

  console.log('\nSeed completed successfully!')
  console.log(`Created ${categories.length} categories`)
  console.log(`Created ${subcategories.length} subcategories`)
  console.log(`Created ${products.length} products`)

  process.exit(0)
}

runSeed().catch((err) => {
  console.error('Seed error:', err)
  process.exit(1)
})
