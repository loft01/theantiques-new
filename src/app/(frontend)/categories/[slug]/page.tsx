import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ChevronRight } from 'lucide-react'
import { ProductGrid } from '@/components/products'
import { SubcategoryPills } from '@/components/categories/SubcategoryPills'
import { getCategoryBySlug, getSubcategories, getProducts, transformProduct } from '@/lib/payload'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const category = await getCategoryBySlug(slug)

  if (!category) {
    return { title: 'Category Not Found | The Antiques' }
  }

  return {
    title: `${category.name} | The Antiques`,
    description: category.description || `Browse our ${category.name} collection`,
  }
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params
  const category = await getCategoryBySlug(slug)

  if (!category) {
    notFound()
  }

  // Get subcategories and products in parallel
  const [subcategories, productsResult] = await Promise.all([
    getSubcategories(slug),
    getProducts({ category: category.id, limit: 12 }),
  ])

  const products = productsResult.products.map(transformProduct)
  const subcategoryData = subcategories.map(sub => ({
    slug: sub.slug,
    name: sub.name,
  }))

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
        {category.description && (
          <p className="text-zinc-400 max-w-3xl">{category.description}</p>
        )}
      </div>

      {/* Subcategory Pills */}
      {subcategoryData.length > 0 && (
        <div className="mb-8">
          <SubcategoryPills
            subcategories={subcategoryData}
            categorySlug={slug}
          />
        </div>
      )}

      {/* Filter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-6 border-b border-zinc-800">
        <p className="text-zinc-400">
          <span className="text-white font-medium">{productsResult.totalDocs}</span> items
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
      {products.length > 0 ? (
        <ProductGrid products={products} columns={4} />
      ) : (
        <div className="text-center py-16">
          <p className="text-zinc-400 text-lg">No products found in this category yet.</p>
          <Link href="/categories" className="text-amber-500 hover:text-amber-400 mt-2 inline-block">
            Browse other categories
          </Link>
        </div>
      )}

      {/* Load More */}
      {productsResult.hasNextPage && (
        <div className="mt-12 text-center">
          <button className="px-8 py-3 bg-zinc-800 hover:bg-zinc-700 rounded-full font-medium transition-colors">
            Load More
          </button>
        </div>
      )}
    </div>
  )
}
