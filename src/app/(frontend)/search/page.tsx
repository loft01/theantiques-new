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
    <main className="min-h-screen">
      {/* Search Header */}
      <section className="bg-zinc-900/50 border-b border-zinc-800">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-3xl font-semibold mb-6">Search</h1>
          <div className="max-w-2xl">
            <SearchBar variant="page" defaultValue={query} autoFocus={!query} />
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="container mx-auto px-4 py-8">
        {query ? (
          <>
            {/* Results header with filters */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
              <p className="text-zinc-400">
                {totalDocs === 0 ? (
                  'No results found'
                ) : (
                  <>
                    Found <span className="text-white font-medium">{totalDocs}</span>{' '}
                    {totalDocs === 1 ? 'result' : 'results'} for{' '}
                    <span className="text-white font-medium">&ldquo;{query}&rdquo;</span>
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
              <ProductGrid products={transformedProducts} columns={4} />
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
    <div className="text-center py-16">
      <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-zinc-800 flex items-center justify-center">
        <Search className="w-8 h-8 text-zinc-500" />
      </div>
      <h2 className="text-xl font-medium mb-2">No results for &ldquo;{query}&rdquo;</h2>
      <p className="text-zinc-400 max-w-md mx-auto">
        Try adjusting your search terms or browse our categories to find what you&apos;re looking for.
      </p>
    </div>
  )
}

function EmptySearch() {
  return (
    <div className="text-center py-16">
      <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-zinc-800 flex items-center justify-center">
        <Search className="w-8 h-8 text-zinc-500" />
      </div>
      <h2 className="text-xl font-medium mb-2">Search our collection</h2>
      <p className="text-zinc-400 max-w-md mx-auto">
        Enter a search term above to find antiques, furniture, decorative pieces, and more.
      </p>
    </div>
  )
}
