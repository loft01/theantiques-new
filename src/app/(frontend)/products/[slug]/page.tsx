import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ChevronRight, MessageCircle, Share2 } from 'lucide-react'
import { ImageGallery, ProductGrid } from '@/components/products'
import { OfferButton } from '@/components/forms/OfferButton'
import { getProductBySlug, getRelatedProducts, getMediaUrl, transformProduct } from '@/lib/payload'
import type { Category, Media } from '@/payload-types'

type ProductStatus = 'available' | 'pending' | 'sold'

const statusConfig: Record<ProductStatus, { label: string; className: string; description: string }> = {
  available: {
    label: 'Available',
    className: 'badge-available',
    description: 'This item is available for purchase',
  },
  pending: {
    label: 'Pending',
    className: 'badge-pending',
    description: 'An offer is being considered',
  },
  sold: {
    label: 'Sold',
    className: 'badge-sold',
    description: 'This item has been sold',
  },
}

// Convert Lexical richText to HTML
function richTextToHtml(content: unknown): string {
  if (!content || typeof content !== 'object') return ''

  const root = (content as { root?: { children?: unknown[] } }).root
  if (!root?.children) return ''

  return root.children
    .map((node: unknown) => {
      const n = node as { type: string; tag?: string; children?: { text?: string }[] }
      const text = n.children?.map(c => c.text || '').join('') || ''

      if (n.type === 'heading') {
        const tag = n.tag || 'h3'
        return `<${tag}>${text}</${tag}>`
      }
      if (n.type === 'paragraph') {
        return `<p>${text}</p>`
      }
      return ''
    })
    .join('\n')
}

interface PageProps {
  params: Promise<{ slug: string }>
}

const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const product = await getProductBySlug(slug)

  if (!product) {
    return { title: 'Product Not Found | The Antiques' }
  }

  const category = product.category as Category
  const firstImage = product.images?.[0]?.image as Media | undefined
  const imageUrl = firstImage ? getMediaUrl(firstImage, 'card') : undefined

  return {
    title: `${product.title} | The Antiques`,
    description: `${category?.name || 'Antique'} - ${product.title}. Price: $${product.price}`,
    openGraph: {
      title: product.title,
      description: `${category?.name || 'Antique'} - ${product.title}`,
      type: 'website',
      images: imageUrl ? [{ url: imageUrl }] : undefined,
    },
  }
}

// Generate JSON-LD structured data for products
function generateProductJsonLd(product: {
  title: string
  slug: string
  price: number
  status: string
  description?: unknown
  images?: { image: string | Media }[]
  category: Category
}) {
  const firstImage = product.images?.[0]?.image as Media | undefined
  const imageUrl = firstImage ? getMediaUrl(firstImage, 'full') : undefined

  const availability = {
    available: 'https://schema.org/InStock',
    pending: 'https://schema.org/LimitedAvailability',
    sold: 'https://schema.org/SoldOut',
  }[product.status] || 'https://schema.org/InStock'

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    description: richTextToPlainText(product.description),
    image: imageUrl,
    url: `${BASE_URL}/products/${product.slug}`,
    category: product.category?.name,
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: 'USD',
      availability,
      seller: {
        '@type': 'Organization',
        name: 'The Antiques',
      },
    },
  }
}

// Extract plain text from Lexical richText for schema
function richTextToPlainText(content: unknown): string {
  if (!content || typeof content !== 'object') return ''
  const root = (content as { root?: { children?: unknown[] } }).root
  if (!root?.children) return ''

  return root.children
    .map((node: unknown) => {
      const n = node as { children?: { text?: string }[] }
      return n.children?.map(c => c.text || '').join('') || ''
    })
    .join(' ')
    .slice(0, 200)
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params
  const product = await getProductBySlug(slug)

  if (!product) {
    notFound()
  }

  const category = product.category as Category
  const categoryId = typeof product.category === 'string' ? product.category : product.category.id

  // Get related products
  const relatedProductsData = await getRelatedProducts(categoryId, slug, 4)
  const relatedProducts = relatedProductsData.map(transformProduct)

  // Get product images - use placeholder if no images uploaded
  const productImages = product.images?.length ? product.images.map(img => {
    const media = img.image as Media
    return {
      url: getMediaUrl(media, 'full') || 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200&h=900&fit=crop',
      alt: media?.alt || product.title,
    }
  }) : [{ url: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200&h=900&fit=crop', alt: product.title }]

  const images = productImages

  const statusInfo = statusConfig[product.status]
  const descriptionHtml = richTextToHtml(product.description)

  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(product.price)

  const priceDisplay = product.priceLabel === 'offer' ? 'Make an Offer' : formattedPrice

  // Generate JSON-LD for structured data
  const jsonLd = generateProductJsonLd({
    title: product.title,
    slug: product.slug,
    price: product.price,
    status: product.status,
    description: product.description,
    images: product.images,
    category,
  })

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="mx-auto max-w-7xl px-6 py-12 pb-24">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-caption text-text-secondary mb-6">
        <Link href="/" className="transition-colors duration-normal hover:text-text-primary">Home</Link>
        <ChevronRight className="w-4 h-4" />
        <Link href="/categories" className="transition-colors duration-normal hover:text-text-primary">Categories</Link>
        <ChevronRight className="w-4 h-4" />
        <Link href={`/categories/${category?.slug}`} className="transition-colors duration-normal hover:text-text-primary">
          {category?.name || 'Category'}
        </Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-text-primary line-clamp-1">{product.title}</span>
      </nav>

      {/* Main content */}
      <div className="grid lg:grid-cols-2 gap-12">
        {/* Image Gallery */}
        <div>
          <ImageGallery images={images} title={product.title} />
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          {/* Status badge */}
          <div className={`badge ${statusInfo.className}`}>
            {statusInfo.label}
          </div>

          {/* Title */}
          <h1 className="text-display text-text-primary">
            {product.title}
          </h1>

          {/* Category */}
          <div className="flex flex-wrap gap-4">
            <Link
              href={`/categories/${category?.slug}`}
              className="text-body text-text-secondary transition-colors duration-normal hover:text-text-primary"
            >
              {category?.name || 'Category'}
            </Link>
          </div>

          {/* Price */}
          <div className="py-4 border-y border-border-default">
            <p className="text-title-1 text-text-primary">{priceDisplay}</p>
            <p className="text-small text-text-secondary mt-1">{statusInfo.description}</p>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <OfferButton
              productSlug={product.slug}
              productTitle={product.title}
              productPrice={product.price}
              disabled={product.status === 'sold'}
            />
            <button className="btn-secondary flex-1 flex items-center justify-center gap-2">
              <MessageCircle className="w-5 h-5" />
              Ask a Question
            </button>
          </div>

          {/* Share */}
          <button className="flex items-center gap-2 text-text-secondary transition-colors duration-normal hover:text-text-primary">
            <Share2 className="w-4 h-4" />
            Share this item
          </button>
        </div>
      </div>

      {/* Description */}
      {descriptionHtml && (
        <div className="mt-16 max-w-4xl">
          <h2 className="text-title-1 text-text-primary mb-6">Description</h2>
          <div
            className="prose prose-invert max-w-none
                       prose-headings:font-semibold prose-headings:text-text-primary
                       prose-h3:text-title-3 prose-h3:mt-8 prose-h3:mb-3
                       prose-p:text-text-secondary prose-p:leading-relaxed"
            dangerouslySetInnerHTML={{ __html: descriptionHtml }}
          />
        </div>
      )}

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="mt-20">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-title-1 text-text-primary">Related Items</h2>
            <Link
              href={`/categories/${category?.slug}`}
              className="text-body text-text-secondary transition-colors duration-normal hover:text-text-primary"
            >
              View all {category?.name}
            </Link>
          </div>
          <ProductGrid products={relatedProducts} columns={4} />
        </section>
      )}
      </div>
    </>
  )
}
