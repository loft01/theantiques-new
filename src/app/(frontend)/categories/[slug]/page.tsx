import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ProductGrid } from '@/components/products'
import { getCategoryBySlug, getSubcategories, getProducts, transformProduct } from '@/lib/payload'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const category = await getCategoryBySlug(slug)

  if (!category) {
    return { title: 'Categoria Non Trovata | The Antiques' }
  }

  return {
    title: `${category.name} | The Antiques`,
    description: category.description || `Esplora la nostra collezione ${category.name}`,
  }
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params
  const category = await getCategoryBySlug(slug)

  if (!category) {
    notFound()
  }

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
    <div className="min-h-screen">
      {/* Header */}
      <section className="py-12 border-b border-border-primary">
        <div className="container-editorial">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-caption text-text-tertiary mb-8">
            <Link href="/" className="hover:text-text-primary transition-opacity">Home</Link>
            <span>/</span>
            <Link href="/categories" className="hover:text-text-primary transition-opacity">Prodotti</Link>
            <span>/</span>
            <span className="text-text-primary">{category.name}</span>
          </nav>

          <h1 className="text-manifesto mb-4">{category.name}</h1>
          {category.description && (
            <p className="text-body text-text-secondary max-w-2xl">{category.description}</p>
          )}
        </div>
      </section>

      {/* Filters & Count */}
      <section className="py-6 border-b border-border-primary">
        <div className="container-editorial flex flex-wrap items-center justify-between gap-4">
          <p className="text-caption text-text-secondary">
            <span className="text-text-primary">{productsResult.totalDocs}</span> articoli
          </p>

          {/* Subcategory Pills */}
          {subcategoryData.length > 0 && (
            <div className="flex flex-wrap gap-3">
              <Link
                href={`/categories/${slug}`}
                className="btn-pill text-sm"
              >
                Tutti
              </Link>
              {subcategoryData.map((sub) => (
                <Link
                  key={sub.slug}
                  href={`/categories/${sub.slug}`}
                  className="btn-pill text-sm"
                >
                  {sub.name}
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Products Grid */}
      <section>
        {products.length > 0 ? (
          <ProductGrid products={products} />
        ) : (
          <div className="text-center py-20">
            <p className="text-body text-text-secondary mb-4">Nessun prodotto trovato in questa categoria.</p>
            <Link href="/categories" className="link-arrow inline-flex">
              Esplora altre categorie
            </Link>
          </div>
        )}

        {/* Load More */}
        {productsResult.hasNextPage && (
          <div className="py-12 text-center">
            <button className="btn-pill">
              Carica Altri
            </button>
          </div>
        )}
      </section>
    </div>
  )
}
