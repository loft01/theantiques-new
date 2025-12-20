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
    className: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    description: 'This item is available for purchase',
  },
  pending: {
    label: 'Pending',
    className: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
    description: 'An offer is being considered',
  },
  sold: {
    label: 'Sold',
    className: 'bg-red-500/20 text-red-400 border-red-500/30',
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

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const product = await getProductBySlug(slug)

  if (!product) {
    return { title: 'Product Not Found | The Antiques' }
  }

  const category = product.category as Category

  return {
    title: `${product.title} | The Antiques`,
    description: `${category?.name || 'Antique'} - ${product.title}. Price: $${product.price}`,
  }
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

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-zinc-500 mb-8">
        <Link href="/" className="hover:text-white transition-colors">Home</Link>
        <ChevronRight className="w-4 h-4" />
        <Link href="/categories" className="hover:text-white transition-colors">Categories</Link>
        <ChevronRight className="w-4 h-4" />
        <Link href={`/categories/${category?.slug}`} className="hover:text-white transition-colors">
          {category?.name || 'Category'}
        </Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-zinc-400 line-clamp-1">{product.title}</span>
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
          <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-sm ${statusInfo.className}`}>
            <span className="w-2 h-2 rounded-full bg-current" />
            {statusInfo.label}
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-semibold leading-tight">
            {product.title}
          </h1>

          {/* Category */}
          <div className="flex flex-wrap gap-4 text-zinc-400">
            <Link
              href={`/categories/${category?.slug}`}
              className="hover:text-amber-500 transition-colors"
            >
              {category?.name || 'Category'}
            </Link>
          </div>

          {/* Price */}
          <div className="py-4 border-y border-zinc-800">
            <p className="text-3xl font-semibold text-amber-500">{priceDisplay}</p>
            <p className="text-sm text-zinc-500 mt-1">{statusInfo.description}</p>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <OfferButton
              productSlug={product.slug}
              productTitle={product.title}
              productPrice={product.price}
              disabled={product.status === 'sold'}
            />
            <button
              className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-zinc-800
                         rounded-full font-medium hover:bg-zinc-700 transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
              Ask a Question
            </button>
          </div>

          {/* Share */}
          <button className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors">
            <Share2 className="w-4 h-4" />
            Share this item
          </button>
        </div>
      </div>

      {/* Description */}
      {descriptionHtml && (
        <div className="mt-16 max-w-4xl">
          <h2 className="text-2xl font-semibold mb-6">Description</h2>
          <div
            className="prose prose-invert prose-zinc max-w-none
                       prose-headings:font-semibold prose-headings:text-white
                       prose-h3:text-lg prose-h3:mt-8 prose-h3:mb-3
                       prose-p:text-zinc-400 prose-p:leading-relaxed"
            dangerouslySetInnerHTML={{ __html: descriptionHtml }}
          />
        </div>
      )}

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="mt-20">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-semibold">Related Items</h2>
            <Link
              href={`/categories/${category?.slug}`}
              className="text-amber-500 hover:text-amber-400 transition-colors"
            >
              View all {category?.name}
            </Link>
          </div>
          <ProductGrid products={relatedProducts} columns={4} />
        </section>
      )}
    </div>
  )
}
