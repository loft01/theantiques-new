import { Metadata } from 'next'
import { ProductGrid } from '@/components/products'
import {
  Hero,
  ManifestoSection,
  CinematicBreak,
  HighlightedObject,
  QuoteSection,
  FeaturedProductsSection
} from '@/components/home'
import { getCategories, getProducts, transformProduct } from '@/lib/payload'

export const metadata: Metadata = {
  title: 'The Antiques | Antiquariato e Oggetti d\'Epoca',
  description: 'Scopri pezzi unici di antiquariato con storie da raccontare. Esplora la nostra collezione curata di mobili, arte, ceramiche, gioielli e oggetti decorativi.',
  keywords: ['antiquariato', 'vintage', 'mobili', 'collezionismo', 'arte', 'ceramiche', 'gioielli', 'oggetti decorativi'],
  openGraph: {
    title: 'The Antiques | Antiquariato e Oggetti d\'Epoca',
    description: 'Scopri pezzi unici di antiquariato con storie da raccontare.',
    type: 'website',
  },
}

export default async function HomePage() {
  // Fetch data in parallel
  const [categories, productsResult] = await Promise.all([
    getCategories({ parentOnly: true }),
    getProducts({ featured: true, limit: 9 }),
  ])

  const featuredProducts = productsResult.products.map(transformProduct)

  // Get a featured product for the highlighted section
  const highlightedProduct = featuredProducts[0]

  // Prepare categories for hero
  const heroCategories = categories.map(cat => ({
    slug: cat.slug,
    name: cat.name,
  }))

  return (
    <div className="min-h-screen">
      {/* 1. Hero Editorial Block */}
      <Hero
        categories={heroCategories}
        heroImageMobile="/IMG_9478.jpg"
      />

      {/* 2. Manifesto Section */}
      <ManifestoSection />

      {/* 3. Featured Collection Grid */}
      <FeaturedProductsSection>
        {featuredProducts.length > 0 ? (
          <ProductGrid products={featuredProducts.slice(0, 6)} />
        ) : (
          <p className="text-center text-text-secondary py-12">
            Nessun prodotto in evidenza.
          </p>
        )}
      </FeaturedProductsSection>

      {/* 4. Cinematic Break */}
      <CinematicBreak
        image="/IMG_9415.jpg"
        imageMobile="/IMG_9846.jpg"
        alt="Mobili antichi in ambiente naturale"
      />

      {/* 5. Highlighted Object Section */}
      {highlightedProduct && (
        <HighlightedObject
          title={highlightedProduct.title}
          description="Un pezzo straordinario che incarna eleganza senza tempo e maestria artigianale. Ogni dettaglio racconta una storia di arte e dedizione alla qualità che trascende le generazioni."
          image={highlightedProduct.image.url}
          link={`/products/${highlightedProduct.slug}`}
          ctaText="Scopri l'Oggetto"
        />
      )}

      {/* 6. More Products */}
      {featuredProducts.length > 6 && (
        <FeaturedProductsSection>
          <ProductGrid products={featuredProducts.slice(6, 9)} />
        </FeaturedProductsSection>
      )}

      {/* 8. Quote Section */}
      <QuoteSection
        quote="The Antiques ridefinisce il concetto di design curato. In un mondo saturo di opzioni, questa collezione eccelle concentrandosi sull'essenziale—pezzi accuratamente selezionati che incarnano sofisticatezza senza tempo e pura semplicità."
        author="Interior Design Magazine"
      />

      {/* 9. Final Cinematic Break */}
      <CinematicBreak
        image="/IMG_Sfondo.jpg"
        imageMobile="/Antiques_dicembre_1.jpg"
        alt="Sfondo antiquariato"
      />

      {/* Footer handles newsletter */}
    </div>
  )
}
