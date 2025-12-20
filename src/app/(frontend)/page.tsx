import { ProductGrid } from '@/components/products'
import { CategoryScroll } from '@/components/categories'
import { Hero, LifestyleGrid } from '@/components/home'
import { NewsletterForm } from '@/components/forms'

const demoCategories = [
  {
    slug: 'furniture',
    name: 'Furniture',
    image: { url: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&h=600&fit=crop', alt: 'Furniture' },
    productCount: 24,
  },
  {
    slug: 'lighting',
    name: 'Lighting',
    image: { url: 'https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?w=600&h=600&fit=crop', alt: 'Lighting' },
    productCount: 18,
  },
  {
    slug: 'decorative',
    name: 'Decorative Arts',
    image: { url: 'https://images.unsplash.com/photo-1490312278390-ab64016e0aa9?w=600&h=600&fit=crop', alt: 'Decorative' },
    productCount: 32,
  },
  {
    slug: 'art',
    name: 'Fine Art',
    image: { url: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=600&h=600&fit=crop', alt: 'Art' },
    productCount: 15,
  },
  {
    slug: 'jewelry',
    name: 'Jewelry',
    image: { url: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&h=600&fit=crop', alt: 'Jewelry' },
    productCount: 42,
  },
  {
    slug: 'ceramics',
    name: 'Ceramics',
    image: { url: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=600&h=600&fit=crop', alt: 'Ceramics' },
    productCount: 27,
  },
]

const demoProducts = [
  {
    slug: 'victorian-mahogany-cabinet',
    title: 'Victorian Mahogany Display Cabinet',
    price: 2400,
    status: 'available' as const,
    category: 'Furniture',
    image: { url: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&h=600&fit=crop', alt: 'Victorian cabinet' },
  },
  {
    slug: 'art-deco-chandelier',
    title: 'Art Deco Crystal Chandelier',
    price: 1850,
    status: 'available' as const,
    category: 'Lighting',
    image: { url: 'https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?w=800&h=600&fit=crop', alt: 'Art deco chandelier' },
  },
  {
    slug: 'brass-table-lamp',
    title: 'Antique Brass Table Lamp',
    price: 450,
    status: 'pending' as const,
    category: 'Lighting',
    image: { url: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&h=600&fit=crop', alt: 'Brass lamp' },
  },
  {
    slug: 'french-armchair',
    title: 'French Louis XV Armchair',
    price: 3200,
    status: 'sold' as const,
    category: 'Furniture',
    image: { url: 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=800&h=600&fit=crop', alt: 'French armchair' },
  },
]

export default function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="container mx-auto px-4 pt-8 pb-16">
        <Hero
          title="Timeless Treasures"
          subtitle="Discover unique vintage and antique pieces with stories to tell"
          ctaText="Browse Collection"
          ctaLink="/categories"
        />
      </section>

      {/* Featured Categories */}
      <section className="container mx-auto px-4 mb-20">
        <h2 className="text-3xl font-semibold mb-8 text-center">Browse Categories</h2>
        <CategoryScroll categories={demoCategories} />
      </section>

      {/* Featured Products */}
      <section className="container mx-auto px-4 mb-20">
        <h2 className="text-3xl font-semibold mb-8 text-center">Featured Items</h2>
        <ProductGrid products={demoProducts} columns={4} />
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
