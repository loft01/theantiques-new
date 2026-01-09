import { getPayload, Where } from 'payload'
import config from '@payload-config'
import type { Category, Product, Media, SiteSetting } from '@/payload-types'

// Helper to get Payload instance
async function getPayloadClient() {
  return getPayload({ config })
}

// Type for populated media
type PopulatedMedia = Media & { url: string }

// Helper to get image URL from media
export function getMediaUrl(media: string | Media | null | undefined, size?: 'thumbnail' | 'card'): string {
  if (!media) return ''
  if (typeof media === 'string') return '' // Not populated, just ID

  const m = media as PopulatedMedia

  // Always prefer main URL first (most reliable)
  if (m.url) {
    return m.url
  }

  // Try requested size as fallback
  if (size && m.sizes?.[size]?.url) {
    return m.sizes[size].url!
  }

  // Last resort: try any available size
  if (m.sizes) {
    const availableSize = m.sizes.card?.url || m.sizes.thumbnail?.url
    if (availableSize) return availableSize
  }

  return ''
}

// Categories
export async function getCategories(options?: { featured?: boolean; parentOnly?: boolean }) {
  const payload = await getPayloadClient()

  const where: Where = {}
  if (options?.featured) where.featured = { equals: true }
  if (options?.parentOnly) where.parent = { exists: false }

  const result = await payload.find({
    collection: 'categories',
    where,
    sort: 'name',
    depth: 1,
  })

  return result.docs as Category[]
}

export async function getCategoryBySlug(slug: string) {
  const payload = await getPayloadClient()

  const result = await payload.find({
    collection: 'categories',
    where: { slug: { equals: slug } },
    depth: 1,
    limit: 1,
  })

  return result.docs[0] as Category | undefined
}

export async function getSubcategories(parentSlug: string) {
  const parent = await getCategoryBySlug(parentSlug)
  if (!parent) return []

  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'categories',
    where: { parent: { equals: parent.id } },
    sort: 'name',
  })

  return result.docs as Category[]
}

// Get product count for a category
export async function getCategoryProductCount(categoryId: string) {
  const payload = await getPayloadClient()
  const result = await payload.count({
    collection: 'products',
    where: { category: { equals: categoryId } },
  })
  return result.totalDocs
}

// Products
export async function getProducts(options?: {
  featured?: boolean
  category?: string
  status?: 'available' | 'pending' | 'sold'
  limit?: number
  page?: number
}) {
  const payload = await getPayloadClient()

  const where: Where = {}
  if (options?.featured) where.featured = { equals: true }
  if (options?.category) where.category = { equals: options.category }
  if (options?.status) where.status = { equals: options.status }

  const result = await payload.find({
    collection: 'products',
    where,
    sort: '-createdAt',
    limit: options?.limit || 20,
    page: options?.page || 1,
    depth: 2,
  })

  return {
    products: result.docs as Product[],
    totalDocs: result.totalDocs,
    hasNextPage: result.hasNextPage,
    page: result.page,
  }
}

export async function getProductBySlug(slug: string) {
  const payload = await getPayloadClient()

  const result = await payload.find({
    collection: 'products',
    where: { slug: { equals: slug } },
    depth: 2,
    limit: 1,
  })

  return result.docs[0] as Product | undefined
}

export async function getRelatedProducts(categoryId: string, excludeSlug: string, limit = 4) {
  const payload = await getPayloadClient()

  const result = await payload.find({
    collection: 'products',
    where: {
      and: [
        { category: { equals: categoryId } },
        { slug: { not_equals: excludeSlug } },
      ],
    },
    limit,
    depth: 2,
  })

  return result.docs as Product[]
}

// Site Settings
export async function getSiteSettings() {
  const payload = await getPayloadClient()
  const settings = await payload.findGlobal({ slug: 'site-settings', depth: 1 })
  return settings as SiteSetting
}

// Search Products
export async function searchProducts(options: {
  query: string
  category?: string
  limit?: number
  page?: number
}) {
  const payload = await getPayloadClient()

  const conditions: Where[] = []

  // Text search across title and description
  if (options.query) {
    conditions.push({
      or: [
        { title: { contains: options.query } },
        { description: { contains: options.query } },
      ],
    })
  }

  // Category filter
  if (options.category) {
    conditions.push({ category: { equals: options.category } })
  }

  const where: Where | undefined = conditions.length > 0 ? { and: conditions } : undefined

  const result = await payload.find({
    collection: 'products',
    where,
    sort: '-createdAt',
    limit: options.limit || 12,
    page: options.page || 1,
    depth: 2,
  })

  return {
    products: result.docs as Product[],
    totalDocs: result.totalDocs,
    hasNextPage: result.hasNextPage,
    page: result.page,
  }
}

// Transform product for frontend use
export function transformProduct(product: Product) {
  const category = product.category as Category
  // Use mainImage if available (and populated), fall back to first gallery image
  const mainImage = product.mainImage && typeof product.mainImage === 'object'
    ? product.mainImage as Media
    : undefined
  const firstGalleryImage = product.images?.[0] && typeof product.images[0] === 'object'
    ? product.images[0] as Media
    : undefined
  const coverImage = mainImage || firstGalleryImage

  // Get URL with fallback
  const imageUrl = getMediaUrl(coverImage, 'card')

  return {
    slug: product.slug,
    title: product.title,
    price: product.price,
    priceLabel: product.priceLabel || 'asking',
    status: product.status,
    category: category?.name || 'Uncategorized',
    categorySlug: category?.slug || '',
    image: {
      url: imageUrl || '/fallback.jpeg',
      alt: coverImage?.alt || product.title,
    },
  }
}

// Transform category for frontend use
export function transformCategory(category: Category, productCount?: number) {
  return {
    slug: category.slug,
    name: category.name,
    description: category.description || '',
    image: {
      url: getMediaUrl(category.image as Media, 'card') || '/fallback.jpeg',
      alt: (category.image as Media)?.alt || category.name,
    },
    productCount: productCount ?? 0,
  }
}

// Get homepage categories (all parent categories) with product counts
export async function getHomepageCategories(limit = 10) {
  const payload = await getPayloadClient()

  const result = await payload.find({
    collection: 'categories',
    where: { parent: { exists: false } },
    sort: 'name',
    limit,
    depth: 0,
  })

  // Process categories sequentially to avoid MongoDB session exhaustion
  const categoriesWithCounts = []
  for (const category of result.docs) {
    const count = await getCategoryProductCount(category.id)
    // Handle icon - with depth:0, it's either a string ID or old invalid string
    let iconUrl = ''
    const iconId = category.icon
    if (iconId && typeof iconId === 'string' && iconId.match(/^[0-9a-fA-F]{24}$/)) {
      // Valid MongoDB ObjectId - fetch the media
      try {
        const media = await payload.findByID({ collection: 'media', id: iconId })
        if (media) {
          iconUrl = (media as Media).url || ''
        }
      } catch {
        // Icon not found or invalid, skip
      }
    }
    categoriesWithCounts.push({
      id: category.id,
      slug: category.slug,
      name: category.name,
      iconUrl,
      productCount: count,
    })
  }

  return categoriesWithCounts
}

// Get menu categories with subcategories and featured products
export async function getMenuCategories() {
  const payload = await getPayloadClient()

  // Get parent categories
  const categoriesResult = await payload.find({
    collection: 'categories',
    where: { parent: { exists: false } },
    sort: 'name',
    limit: 6,
  })

  // Process categories sequentially to avoid MongoDB session exhaustion
  const menuCategories = []
  for (const category of categoriesResult.docs) {
    // Get subcategories
    const subcategoriesResult = await payload.find({
      collection: 'categories',
      where: { parent: { equals: category.id } },
      sort: 'name',
      limit: 8,
    })

    // Get featured products for this category
    const productsResult = await payload.find({
      collection: 'products',
      where: {
        and: [
          { category: { equals: category.id } },
          { featured: { equals: true } },
        ],
      },
      limit: 3,
      depth: 2,
    })

    const featured = productsResult.docs.map((product) => {
      const cat = product.category as Category
      const mainImage = product.mainImage && typeof product.mainImage === 'object'
        ? product.mainImage as Media
        : undefined
      const firstGalleryImage = product.images?.[0] && typeof product.images[0] === 'object'
        ? product.images[0] as Media
        : undefined
      const coverImage = mainImage || firstGalleryImage
      return {
        slug: product.slug,
        title: product.title,
        image: {
          url: getMediaUrl(coverImage, 'card') || '/fallback.jpeg',
          alt: coverImage?.alt || product.title,
        },
        category: cat?.name || 'Uncategorized',
      }
    })

    menuCategories.push({
      slug: category.slug,
      name: category.name,
      subcategories: subcategoriesResult.docs.map((sub) => ({
        slug: sub.slug,
        name: sub.name,
      })),
      featured,
    })
  }

  return menuCategories
}
