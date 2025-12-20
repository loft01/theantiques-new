import { ProductGrid } from '@/components/products'
import { CategoryScroll } from '@/components/categories'
import { Hero, LifestyleGrid } from '@/components/home'
import { NewsletterForm } from '@/components/forms'
import { getCategories, getProducts, getCategoryProductCount, transformCategory, transformProduct, getSiteSettings } from '@/lib/payload'

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
    <div>
      {/* Hero Section */}
      <section className="container mx-auto px-4 pt-8 pb-16">
        <Hero
          title={heroTitle}
          subtitle={heroSubtitle}
          ctaText="Browse Collection"
          ctaLink="/categories"
        />
      </section>

      {/* Featured Categories */}
      <section className="container mx-auto px-4 mb-20">
        <h2 className="text-3xl font-semibold mb-8 text-center">Browse Categories</h2>
        {categoriesWithCounts.length > 0 ? (
          <CategoryScroll categories={categoriesWithCounts} />
        ) : (
          <p className="text-center text-zinc-500">No categories available yet.</p>
        )}
      </section>

      {/* Featured Products */}
      <section className="container mx-auto px-4 mb-20">
        <h2 className="text-3xl font-semibold mb-8 text-center">Featured Items</h2>
        {featuredProducts.length > 0 ? (
          <ProductGrid products={featuredProducts} columns={4} />
        ) : (
          <p className="text-center text-zinc-500">No featured products yet.</p>
        )}
      </section>

      {/* Lifestyle Grid */}
      <section className="container mx-auto px-4 mb-20">
        <h2 className="text-3xl font-semibold mb-8 text-center">Explore</h2>
        <LifestyleGrid cards={[]} />
      </section>

      {/* Newsletter */}
      <section className="bg-zinc-900 py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-semibold mb-4">Stay Updated</h2>
          <p className="text-zinc-400 mb-8 max-w-md mx-auto">
            Subscribe to receive updates on new arrivals and exclusive pieces
          </p>
          <NewsletterForm />
        </div>
      </section>
    </div>
  )
}
