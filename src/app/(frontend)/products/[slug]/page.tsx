import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowRight } from 'lucide-react'
import { ProductGrid } from '@/components/products'
import { ImageGallery } from '@/components/products/ImageGallery'
import { OfferButton } from '@/components/forms/OfferButton'
import { getProductBySlug, getRelatedProducts, getMediaUrl, transformProduct } from '@/lib/payload'
import type { Category, Media } from '@/payload-types'

type ProductStatus = 'available' | 'pending' | 'sold'

const statusLabels: Record<ProductStatus, string> = {
  available: 'Disponibile',
  pending: 'In Trattativa',
  sold: 'Venduto',
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
    return { title: 'Prodotto Non Trovato | The Antiques' }
  }

  const category = product.category as Category
  const firstImage = product.images?.[0]?.image as Media | undefined
  const imageUrl = firstImage ? getMediaUrl(firstImage, 'card') : undefined

  return {
    title: `${product.title} | The Antiques`,
    description: `${category?.name || 'Antiquariato'} - ${product.title}. Prezzo: ${product.price}€`,
    openGraph: {
      title: product.title,
      description: `${category?.name || 'Antiquariato'} - ${product.title}`,
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
  const imageUrl = firstImage ? getMediaUrl(firstImage) : undefined

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
      url: getMediaUrl(media) || 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200&h=900&fit=crop',
      alt: media?.alt || product.title,
    }
  }) : [{ url: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200&h=900&fit=crop', alt: product.title }]

  const mainImage = productImages[0]
  const description = richTextToPlainText(product.description)

  const formattedPrice = new Intl.NumberFormat('it-IT', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(product.price)

  const jsonLd = generateProductJsonLd({
    title: product.title,
    slug: product.slug,
    price: product.price,
    status: product.status,
    description: product.description,
    images: product.images ?? undefined,
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
            {/* Left - Image Gallery */}
            <div className="p-4 lg:p-8">
              <ImageGallery images={productImages} title={product.title} />
            </div>

            {/* Right - Info */}
            <div className="p-8 lg:p-16 flex flex-col justify-center border-l border-border-primary">
              {/* Breadcrumb */}
              <nav className="flex items-center gap-2 text-caption text-text-tertiary mb-8">
                <Link href="/" className="hover:text-text-primary transition-opacity">Home</Link>
                <span>/</span>
                <Link href="/categories" className="hover:text-text-primary transition-opacity">Prodotti</Link>
                <span>/</span>
                <Link href={`/categories/${category?.slug}`} className="hover:text-text-primary transition-opacity">
                  {category?.name || 'Categoria'}
                </Link>
              </nav>

              {/* Title & Price */}
              <div className="mb-8">
                <h1 className="text-section-title mb-4">{product.title}</h1>
                <p className="text-body text-text-secondary">{formattedPrice}</p>
              </div>

              {/* Status */}
              <div className="mb-8 py-4 border-y border-border-primary">
                <p className="text-caption text-text-tertiary mb-1">Stato</p>
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
              <h2 className="text-section-title">Articoli Correlati</h2>
              <Link
                href={`/categories/${category?.slug}`}
                className="link-arrow"
              >
                Vedi tutti {category?.name}
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
