import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { ProductGrid } from '@/components/products'
import { SubcategoryPills } from '@/components/categories/SubcategoryPills'

const categoryData: Record<string, { name: string; description: string }> = {
  furniture: {
    name: 'Furniture',
    description: 'Discover exceptional antique furniture pieces from various periods and styles, each with its own unique character and history.',
  },
  lighting: {
    name: 'Lighting',
    description: 'Illuminate your space with our collection of vintage chandeliers, lamps, and light fixtures.',
  },
  decorative: {
    name: 'Decorative Arts',
    description: 'Add character to your home with our selection of decorative antiques and objets d\'art.',
  },
  art: {
    name: 'Fine Art',
    description: 'Explore our curated collection of paintings, prints, and drawings from various periods.',
  },
  jewelry: {
    name: 'Jewelry',
    description: 'Timeless pieces of antique and vintage jewelry, from elegant necklaces to statement rings.',
  },
  ceramics: {
    name: 'Ceramics',
    description: 'Fine porcelain, pottery, and ceramic pieces from renowned makers and periods.',
  },
}

const subcategories = [
  { slug: 'chairs', name: 'Chairs & Seating' },
  { slug: 'tables', name: 'Tables' },
  { slug: 'cabinets', name: 'Cabinets' },
  { slug: 'desks', name: 'Desks' },
  { slug: 'beds', name: 'Beds' },
  { slug: 'mirrors', name: 'Mirrors' },
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
    slug: 'french-armchair',
    title: 'French Louis XV Armchair',
    price: 3200,
    status: 'available' as const,
    category: 'Furniture',
    image: { url: 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=800&h=600&fit=crop', alt: 'French armchair' },
  },
  {
    slug: 'oak-desk',
    title: 'Georgian Oak Writing Desk',
    price: 1850,
    status: 'pending' as const,
    category: 'Furniture',
    image: { url: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=800&h=600&fit=crop', alt: 'Oak desk' },
  },
  {
    slug: 'marble-table',
    title: 'Italian Marble Console Table',
    price: 4500,
    status: 'available' as const,
    category: 'Furniture',
    image: { url: 'https://images.unsplash.com/photo-1611269154421-4e27233ac5c7?w=800&h=600&fit=crop', alt: 'Marble table' },
  },
  {
    slug: 'wingback-chair',
    title: 'Edwardian Wingback Chair',
    price: 1200,
    status: 'sold' as const,
    category: 'Furniture',
    image: { url: 'https://images.unsplash.com/photo-1519947486511-46149fa0a254?w=800&h=600&fit=crop', alt: 'Wingback chair' },
  },
  {
    slug: 'bookcase',
    title: 'Regency Mahogany Bookcase',
    price: 5800,
    status: 'available' as const,
    category: 'Furniture',
    image: { url: 'https://images.unsplash.com/photo-1594620302200-9a762244a156?w=800&h=600&fit=crop', alt: 'Bookcase' },
  },
]

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const category = categoryData[slug]
  return {
    title: `${category?.name || 'Category'} | The Antiques`,
    description: category?.description,
  }
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params
  const category = categoryData[slug] || { name: 'Category', description: '' }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-zinc-500 mb-8">
        <Link href="/" className="hover:text-white transition-colors">Home</Link>
        <ChevronRight className="w-4 h-4" />
        <Link href="/categories" className="hover:text-white transition-colors">Categories</Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-white">{category.name}</span>
      </nav>

      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl md:text-5xl font-semibold mb-4">{category.name}</h1>
        <p className="text-zinc-400 max-w-3xl">{category.description}</p>
      </div>

      {/* Subcategory Pills */}
      <div className="mb-8">
        <SubcategoryPills
          subcategories={subcategories}
          categorySlug={slug}
        />
      </div>

      {/* Filter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-6 border-b border-zinc-800">
        <p className="text-zinc-400">
          <span className="text-white font-medium">{demoProducts.length}</span> items
        </p>
        <div className="flex items-center gap-4">
          <select className="bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-amber-500">
            <option>Sort by: Newest</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
          </select>
          <select className="bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-amber-500">
            <option>All Status</option>
            <option>Available</option>
            <option>Pending</option>
            <option>Sold</option>
          </select>
        </div>
      </div>

      {/* Products Grid */}
      <ProductGrid products={demoProducts} columns={4} />

      {/* Load More */}
      <div className="mt-12 text-center">
        <button className="px-8 py-3 bg-zinc-800 hover:bg-zinc-700 rounded-full font-medium transition-colors">
          Load More
        </button>
      </div>
    </div>
  )
}
