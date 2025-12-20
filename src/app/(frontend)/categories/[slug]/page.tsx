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
    <div className="mx-auto max-w-7xl px-6 py-12 pb-24">
      {/* Breadcrumb - caption size, secondary color per rulebook */}
      <nav className="flex items-center gap-2 text-caption text-text-secondary mb-8">
        <Link href="/" className="transition-colors duration-normal hover:text-text-primary">Home</Link>
        <ChevronRight className="w-4 h-4" />
        <Link href="/categories" className="transition-colors duration-normal hover:text-text-primary">Categories</Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-text-primary">{category.name}</span>
      </nav>

      {/* Header - title-1 per rulebook */}
      <div className="mb-10">
        <h1 className="text-display text-text-primary mb-3">{category.name}</h1>
        {category.description && (
          <p className="text-body text-text-secondary max-w-3xl">{category.description}</p>
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
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-6 border-b border-border-default">
        <p className="text-caption text-text-secondary">
          <span className="text-text-primary font-medium">{productsResult.totalDocs}</span> items
        </p>
        <div className="flex items-center gap-4">
          <select className="input h-10 px-4 text-caption">
            <option>Sort by: Newest</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
          </select>
          <select className="input h-10 px-4 text-caption">
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
        <div className="text-center py-20">
          <p className="text-body text-text-secondary mb-3">No products found in this category yet.</p>
          <Link href="/categories" className="text-text-primary transition-colors duration-normal hover:opacity-80 inline-block">
            Browse other categories
          </Link>
        </div>
      )}

      {/* Load More */}
      {productsResult.hasNextPage && (
        <div className="mt-12 text-center">
          <button className="btn-secondary">
            Load More
          </button>
        </div>
      )}
    </div>
  )
}
