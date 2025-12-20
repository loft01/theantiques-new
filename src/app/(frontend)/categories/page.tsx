import { CategoryCard } from '@/components/categories'

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
  {
    slug: 'textiles',
    name: 'Textiles',
    image: { url: 'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=600&h=600&fit=crop', alt: 'Textiles' },
    productCount: 19,
  },
  {
    slug: 'silver',
    name: 'Silver & Metalware',
    image: { url: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&h=600&fit=crop', alt: 'Silver' },
    productCount: 35,
  },
]

export const metadata = {
  title: 'Categories | The Antiques',
  description: 'Browse our curated collection of antique categories',
}

export default function CategoriesPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-semibold mb-4">Categories</h1>
        <p className="text-zinc-400 max-w-2xl mx-auto">
          Explore our carefully curated collection of antiques and vintage pieces across various categories
        </p>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {demoCategories.map((category) => (
          <CategoryCard key={category.slug} {...category} />
        ))}
      </div>
    </div>
  )
}
