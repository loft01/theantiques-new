import { Metadata } from 'next'
import { ProductGrid } from '@/components/products'
import {
  Hero,
  CategoryIconsSection,
  ServicesSection,
  ManifestoSection,
  CinematicBreak,
  QuoteSection,
  FeaturedProductsSection
} from '@/components/home'
import { getProducts, transformProduct, getHomepageCategories } from '@/lib/payload'

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

//test2

export default async function HomePage() {
  // Fetch data in parallel
  const [productsResult, homepageCategories] = await Promise.all([
    getProducts({ featured: true, limit: 9 }),
    getHomepageCategories(),
  ])

  const featuredProducts = productsResult.products.map(transformProduct)

  return (
    <div className="min-h-screen">
      {/* 1. Hero Editorial Block */}
      <Hero heroImageMobile="/IMG_9478.jpg" />

      {/* 2. Category Icons Section */}
      <CategoryIconsSection categories={homepageCategories} />

      {/* 3. Services Section */}
      <ServicesSection
        title="I Nostri Servizi"
        subtitle="Scopri tutto quello che possiamo offrirti"
      />

      {/* 4. Featured Collection Grid */}
      <FeaturedProductsSection
        title="Collezione in Evidenza"
        subtitle="I pezzi più ricercati della nostra selezione"
      >
        {featuredProducts.length > 0 ? (
          <ProductGrid products={featuredProducts.slice(0, 6)} />
        ) : (
          <p className="text-center text-text-secondary py-12">
            Nessun prodotto in evidenza.
          </p>
        )}
      </FeaturedProductsSection>

      {/* 5. Manifesto Section */}
      <ManifestoSection />

      {/* 6. Cinematic Break */}
      <CinematicBreak
        image="/IMG_Sfondo.jpg"
        imageMobile="/Antiques_dicembre_1.jpg"
        alt="Sfondo antiquariato"
      />

      {/* 7. Testimonials Section */}
      <QuoteSection />

      {/* 8. More Products */}
      {featuredProducts.length > 6 && (
        <FeaturedProductsSection
          title="Altri Pezzi Selezionati"
          subtitle="Continua a esplorare la nostra collezione"
        >
          <ProductGrid products={featuredProducts.slice(6, 9)} />
        </FeaturedProductsSection>
      )}

      {/* Footer handles newsletter */}
    </div>
  )
}
