import { Metadata } from 'next'
import { ProductGrid } from '@/components/products'
import {
  Hero,
  ManifestoSection,
  CinematicBreak,
  HighlightedObject,
  EditorialStories,
  QuoteSection,
  FeaturedProductsSection
} from '@/components/home'
import { getCategories, getProducts, transformProduct } from '@/lib/payload'

export const metadata: Metadata = {
  title: 'The Antiques | Curated Vintage & Antique Treasures',
  description: 'Discover unique vintage and antique pieces with stories to tell. Browse our curated collection of furniture, art, ceramics, jewelry, and decorative arts.',
  keywords: ['antiques', 'vintage', 'furniture', 'collectibles', 'art', 'ceramics', 'jewelry', 'decorative arts'],
  openGraph: {
    title: 'The Antiques | Curated Vintage & Antique Treasures',
    description: 'Discover unique vintage and antique pieces with stories to tell.',
    type: 'website',
  },
}

export default async function HomePage() {
  // Fetch data in parallel
  const [categories, productsResult] = await Promise.all([
    getCategories({ parentOnly: true }),
    getProducts({ featured: true, limit: 9 }),
  ])

  const featuredProducts = productsResult.products.map(transformProduct)

  // Get a featured product for the highlighted section
  const highlightedProduct = featuredProducts[0]

  // Prepare categories for hero
  const heroCategories = categories.map(cat => ({
    slug: cat.slug,
    name: cat.name,
  }))

  return (
    <div className="min-h-screen">
      {/* 1. Hero Editorial Block */}
      <Hero categories={heroCategories} />

      {/* 2. Manifesto Section */}
      <ManifestoSection />

      {/* 3. Featured Collection Grid */}
      <FeaturedProductsSection>
        {featuredProducts.length > 0 ? (
          <ProductGrid products={featuredProducts.slice(0, 6)} />
        ) : (
          <p className="text-center text-text-secondary py-12">
            No featured products yet.
          </p>
        )}
      </FeaturedProductsSection>

      {/* 4. Cinematic Break */}
      <CinematicBreak
        image="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&h=800&fit=crop&sat=-100"
        alt="Antique furniture in natural setting"
      />

      {/* 5. Highlighted Object Section */}
      {highlightedProduct && (
        <HighlightedObject
          title={highlightedProduct.title}
          description="A stunning piece that embodies timeless elegance and superior craftsmanship. Each detail tells a story of artistry and dedication to quality that transcends generations."
          image={highlightedProduct.image.url}
          link={`/products/${highlightedProduct.slug}`}
          ctaText="View Object"
        />
      )}

      {/* 6. More Products */}
      {featuredProducts.length > 6 && (
        <FeaturedProductsSection>
          <ProductGrid products={featuredProducts.slice(6, 9)} />
        </FeaturedProductsSection>
      )}

      {/* 7. Editorial Stories */}
      <EditorialStories />

      {/* 8. Quote Section */}
      <QuoteSection
        quote="The Antiques redefines the concept of curated design. In a world saturated with options, this collection excels by focusing on the essentials—carefully selected pieces that embody timeless sophistication and pure simplicity."
        author="Interior Design Weekly"
      />

      {/* Footer handles newsletter */}
    </div>
  )
}
