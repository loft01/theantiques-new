import { Metadata } from 'next'
import { ProductGrid } from '@/components/products'
import { CategoryScroll } from '@/components/categories'
import { Hero, LifestyleGrid } from '@/components/home'
import { NewsletterForm } from '@/components/forms'
import { getCategories, getProducts, getCategoryProductCount, transformCategory, transformProduct, getSiteSettings } from '@/lib/payload'

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
  const [categories, productsResult, siteSettings] = await Promise.all([
    getCategories({ parentOnly: true }),
    getProducts({ featured: true, limit: 8 }),
    getSiteSettings(),
  ])

  // Get product counts for categories
  const categoriesWithCounts = await Promise.all(
    categories.map(async (cat) => {
      const count = await getCategoryProductCount(cat.id)
      return transformCategory(cat, count)
    })
  )

  const featuredProducts = productsResult.products.map(transformProduct)

  // Hero content from site settings or defaults
  const heroTitle = siteSettings.hero?.title || 'Timeless Treasures'
  const heroSubtitle = siteSettings.hero?.subtitle || 'Discover unique vintage and antique pieces with stories to tell'

  return (
    <div className="min-h-screen">
      {/* Hero Section - full width */}
      <Hero
        title={heroTitle}
        subtitle={heroSubtitle}
        ctaText="Browse Collection"
        ctaLink="/categories"
      />

      {/* Featured Categories */}
      <section className="mx-auto max-w-7xl px-6 mt-16 mb-20">
        <h2 className="text-title-1 text-text-primary mb-8 text-center">Browse Categories</h2>
        {categoriesWithCounts.length > 0 ? (
          <CategoryScroll categories={categoriesWithCounts} />
        ) : (
          <p className="text-center text-text-secondary">No categories available yet.</p>
        )}
      </section>

      {/* Featured Products */}
      <section className="mx-auto max-w-7xl px-6 mb-20">
        <h2 className="text-title-1 text-text-primary mb-8 text-center">Featured Items</h2>
        {featuredProducts.length > 0 ? (
          <ProductGrid products={featuredProducts} columns={4} />
        ) : (
          <p className="text-center text-text-secondary">No featured products yet.</p>
        )}
      </section>

      {/* Lifestyle Grid */}
      <section className="mx-auto max-w-7xl px-6 mb-20">
        <h2 className="text-title-1 text-text-primary mb-8 text-center">Explore</h2>
        <LifestyleGrid cards={[]} />
      </section>

      {/* Newsletter - elevated section */}
      <section className="bg-bg-secondary border-y border-border-default py-20">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <h2 className="text-title-1 text-text-primary mb-4">Stay Updated</h2>
          <p className="text-body text-text-secondary mb-8 max-w-md mx-auto">
            Subscribe to receive updates on new arrivals and exclusive pieces
          </p>
          <NewsletterForm />
        </div>
      </section>
    </div>
  )
}
