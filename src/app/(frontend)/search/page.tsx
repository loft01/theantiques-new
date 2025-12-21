import { Metadata } from 'next'
import { searchProducts, getCategories, transformProduct } from '@/lib/payload'
import { ProductGrid } from '@/components/products/ProductGrid'
import { SearchBar } from '@/components/forms/SearchBar'
import { SearchFilters } from './SearchFilters'
import { Search } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Search | The Antiques',
  description: 'Search our collection of vintage and antique pieces. Find furniture, art, ceramics, jewelry, and more.',
}

interface SearchPageProps {
  searchParams: Promise<{ q?: string; category?: string }>
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams
  const query = params.q || ''
  const categorySlug = params.category || ''

  // Get categories for filter
  const allCategories = await getCategories({ parentOnly: true })
  const categoryOptions = allCategories.map((cat) => ({
    slug: cat.slug,
    name: cat.name,
  }))

  // Find selected category ID
  let categoryId = ''
  if (categorySlug) {
    const selectedCat = allCategories.find((c) => c.slug === categorySlug)
    if (selectedCat) categoryId = selectedCat.id
  }

  // Search products
  const { products, totalDocs } = query
    ? await searchProducts({ query, category: categoryId || undefined })
    : { products: [], totalDocs: 0 }

  const transformedProducts = products.map(transformProduct)

  return (
    <main className="min-h-screen pb-24">
      {/* Search Header */}
      <section className="bg-bg-secondary border-b border-border-default">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <h1 className="text-display text-text-primary mb-8">Search</h1>
          <div className="max-w-2xl">
            <SearchBar variant="page" defaultValue={query} autoFocus={!query} />
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-12">
        {query ? (
          <>
            {/* Results header with filters */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8 px-6">
              <p className="text-body text-text-secondary">
                {totalDocs === 0 ? (
                  'No results found'
                ) : (
                  <>
                    Found <span className="text-text-primary font-medium">{totalDocs}</span>{' '}
                    {totalDocs === 1 ? 'result' : 'results'} for{' '}
                    <span className="text-text-primary font-medium">&ldquo;{query}&rdquo;</span>
                  </>
                )}
              </p>
              <SearchFilters
                categories={categoryOptions}
                currentCategory={categorySlug}
                query={query}
              />
            </div>

            {/* Results Grid */}
            {products.length > 0 ? (
              <ProductGrid products={transformedProducts} />
            ) : (
              <NoResults query={query} />
            )}
          </>
        ) : (
          <EmptySearch />
        )}
      </section>
    </main>
  )
}

function NoResults({ query }: { query: string }) {
  return (
    <div className="text-center py-20">
      <div className="w-16 h-16 mx-auto mb-6 rounded-lg bg-bg-tertiary flex items-center justify-center">
        <Search className="w-8 h-8 text-text-secondary" />
      </div>
      <h2 className="text-title-2 text-text-primary mb-3">No results for &ldquo;{query}&rdquo;</h2>
      <p className="text-body text-text-secondary max-w-md mx-auto">
        Try adjusting your search terms or browse our categories to find what you&apos;re looking for.
      </p>
    </div>
  )
}

function EmptySearch() {
  return (
    <div className="text-center py-20">
      <div className="w-16 h-16 mx-auto mb-6 rounded-lg bg-bg-tertiary flex items-center justify-center">
        <Search className="w-8 h-8 text-text-secondary" />
      </div>
      <h2 className="text-title-2 text-text-primary mb-3">Search our collection</h2>
      <p className="text-body text-text-secondary max-w-md mx-auto">
        Enter a search term above to find antiques, furniture, decorative pieces, and more.
      </p>
    </div>
  )
}
