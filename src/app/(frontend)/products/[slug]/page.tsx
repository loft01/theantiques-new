import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { ArrowRight } from 'lucide-react'
import { ProductGrid } from '@/components/products'
import { OfferButton } from '@/components/forms/OfferButton'
import { getProductBySlug, getRelatedProducts, getMediaUrl, transformProduct } from '@/lib/payload'
import type { Category, Media } from '@/payload-types'

type ProductStatus = 'available' | 'pending' | 'sold'

const statusLabels: Record<ProductStatus, string> = {
  available: 'Available',
  pending: 'Pending',
  sold: 'Sold',
}

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

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params
  const product = await getProductBySlug(slug)

  if (!product) {
    notFound()
  }

  const category = product.category as Category
  const categoryId = typeof product.category === 'string' ? product.category : product.category.id

  const relatedProductsData = await getRelatedProducts(categoryId, slug, 3)
  const relatedProducts = relatedProductsData.map(transformProduct)

  const productImages = product.images?.length ? product.images.map(img => {
    const media = img.image as Media
    return {
      url: getMediaUrl(media, 'full') || 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200&h=900&fit=crop',
      alt: media?.alt || product.title,
    }
  }) : [{ url: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200&h=900&fit=crop', alt: product.title }]

  const mainImage = productImages[0]
  const description = richTextToPlainText(product.description)

  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(product.price)

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

      <div className="min-h-screen">
        {/* Product Detail - Split Layout */}
        <section className="border-b border-border-primary">
          <div className="grid lg:grid-cols-2">
            {/* Left - Image */}
            <div className="relative aspect-square lg:aspect-auto lg:min-h-[80vh] bg-bg-tertiary">
              <Image
                src={mainImage.url}
                alt={mainImage.alt}
                fill
                className="object-contain p-8 lg:p-16"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />

              {/* Thumbnails */}
              {productImages.length > 1 && (
                <div className="absolute bottom-4 left-4 right-4 flex gap-2 overflow-x-auto p-2">
                  {productImages.map((img, idx) => (
                    <div
                      key={idx}
                      className="relative w-16 h-16 flex-shrink-0 bg-bg-secondary border border-border-primary"
                    >
                      <Image
                        src={img.url}
                        alt={img.alt}
                        fill
                        className="object-contain p-1"
                        sizes="64px"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Right - Info */}
            <div className="p-8 lg:p-16 flex flex-col justify-center border-l border-border-primary">
              {/* Breadcrumb */}
              <nav className="flex items-center gap-2 text-caption text-text-tertiary mb-8">
                <Link href="/" className="hover:text-text-primary transition-opacity">Home</Link>
                <span>/</span>
                <Link href="/categories" className="hover:text-text-primary transition-opacity">Shop</Link>
                <span>/</span>
                <Link href={`/categories/${category?.slug}`} className="hover:text-text-primary transition-opacity">
                  {category?.name || 'Category'}
                </Link>
              </nav>

              {/* Title & Price */}
              <div className="mb-8">
                <h1 className="text-section-title mb-4">{product.title}</h1>
                <p className="text-body text-text-secondary">{formattedPrice}</p>
              </div>

              {/* Status */}
              <div className="mb-8 py-4 border-y border-border-primary">
                <p className="text-caption text-text-tertiary mb-1">Status</p>
                <p className="text-body-medium">{statusLabels[product.status]}</p>
              </div>

              {/* Description */}
              {description && (
                <div className="mb-8">
                  <p className="text-body text-text-secondary leading-relaxed">
                    {description}
                  </p>
                </div>
              )}

              {/* CTA */}
              <div className="mt-auto">
                <OfferButton
                  productSlug={product.slug}
                  productTitle={product.title}
                  productPrice={product.price}
                  disabled={product.status === 'sold'}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section>
            <div className="px-6 py-12 flex items-center justify-between">
              <h2 className="text-section-title">Related Items</h2>
              <Link
                href={`/categories/${category?.slug}`}
                className="link-arrow"
              >
                View all {category?.name}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <ProductGrid products={relatedProducts} />
          </section>
        )}
      </div>
    </>
  )
}
