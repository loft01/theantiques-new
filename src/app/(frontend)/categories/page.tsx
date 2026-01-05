import Link from 'next/link'
import Image from 'next/image'
import { getCategories, getCategoryProductCount, transformCategory } from '@/lib/payload'

export const metadata = {
  title: 'Categorie | The Antiques',
  description: 'Esplora la nostra collezione curata di categorie di antiquariato',
}

export default async function CategoriesPage() {
  const categories = await getCategories({ parentOnly: true })

  const categoriesWithCounts = await Promise.all(
    categories.map(async (cat) => {
      const count = await getCategoryProductCount(cat.id)
      return transformCategory(cat, count)
    })
  )

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="section-padding border-b border-border-primary">
        <div className="container-editorial text-center">
          <h1 className="text-manifesto mb-4">Tutti i Prodotti</h1>
          <p className="text-body text-text-secondary max-w-2xl mx-auto">
            Esplora la nostra collezione accuratamente curata di antiquariato e pezzi vintage
          </p>
        </div>
      </section>

      {/* Categories Grid */}
      <section>
        <div className="product-grid">
          {categoriesWithCounts.map((category) => (
            <div key={category.slug} className="product-grid-item">
              <Link
                href={`/categories/${category.slug}`}
                className="group block"
              >
                <div className="product-card-image mb-4">
                  {category.image?.url ? (
                    <Image
                      src={category.image.url}
                      alt={category.image.alt || category.name}
                      fill
                      className="object-cover group-hover:scale-[1.02] transition-transform"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-text-tertiary">
                      Nessuna immagine
                    </div>
                  )}
                </div>
                <div className="flex justify-between items-baseline">
                  <h2 className="product-card-title group-hover:opacity-70 transition-opacity">
                    {category.name}
                  </h2>
                  <span className="text-caption text-text-tertiary">
                    {category.productCount} articoli
                  </span>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
