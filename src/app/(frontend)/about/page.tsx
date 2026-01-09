import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Download } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Chi Siamo | The Antiques',
  description: 'Scopri The Antiques - la nostra storia, la passione per i tesori d\'epoca e l\'impegno nel preservare la storia.',
}

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero - Dark image bar */}
      <section className="relative h-[40vh] lg:h-[50vh] bg-bg-tertiary">
        <Image
          src="/Maschera_africana_4-min.jpg"
          alt="Maschera africana - The Antiques"
          fill
          className="object-cover opacity-50"
          priority
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center px-6">
          <h1 className="text-manifesto text-white text-center drop-shadow-lg">
            Chi Siamo
          </h1>
          <p className="text-body text-white/80 text-center mt-4 max-w-2xl drop-shadow-md">
            Creiamo il punto d&apos;incontro tra il mondo dell&apos;antiquariato e quello del design moderno.
          </p>
        </div>
      </section>

      {/* Three Column Blocks */}
      <section className="border-b border-border-primary">
        <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border-primary">
          {/* Our Manifesto */}
          <div className="p-8 lg:p-12">
            <h2 className="text-caption text-text-tertiary mb-6">Il progetto The Antiques</h2>
            <p className="text-body text-text-secondary leading-relaxed">
            Una realtà quasi unica nel suo genere, dove oggetti carichi di storia dialogano con linee contemporanee, offrendo nuove possibilità di interpretazione e di utilizzo negli spazi di oggi. Immergiti nella nostra collezione e scopri i nostri oggetti unici nel suo genere, immaginali nel tuo spazio e dai vita al tuo progetto.
            </p>
          </div>

          {/* Our Approach */}
          <div className="p-8 lg:p-12">
            <h2 className="text-caption text-text-tertiary mb-6">Perchè lo facciamo?</h2>
            <p className="text-body text-text-secondary leading-relaxed">
            Non ci limitiamo a mostrare l’antiquariato, ma lo portiamo a stretto contatto con il design attuale, trasformandolo in una fonte concreta di ispirazione per l’arredamento della tua casa, di uno spazio commerciale o di un progetto creativo.
            Ogni oggetto viene selezionato per il suo carattere, la sua autenticità e la sua capacità di convivere con stili moderni, minimal o industriali, senza perdere identità.
            </p>
          </div>

          {/* Press & Inquiries */}
          <div className="p-8 lg:p-12">
            <h2 className="text-caption text-text-tertiary mb-6">Sempre alla ricerca</h2>
            <p className="text-body text-text-secondary leading-relaxed mb-6">
            The Antiques è una continua ricerca di pezzi unici e ricercati, provenienti da tutto il mondo: dagli oggetti di design ai manufatti d’epoca, fino a esemplari rari ed esclusivi.
            Una collezione in costante evoluzione, pensata per chi cerca qualcosa di diverso, autentico e senza tempo.
            </p>
            <Link href="/contact" className="link-arrow">
              Contattaci
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Full Width Image */}
      <section className="relative h-[50vh] lg:h-[70vh]">
        <Image
          src="/Cavallina_12-min.jpg"
          alt="Cavallina - Collezione The Antiques"
          fill
          className="object-cover"
        />
      </section>
    </div>
  )
}
