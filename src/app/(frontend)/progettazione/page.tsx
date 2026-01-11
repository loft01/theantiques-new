import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Progettazione | The Antiques',
  description: 'Collaboriamo con professionisti specializzati nella progettazione e nell\'arredo di ambienti, offrendo soluzioni personalizzate.',
}

export default function ProgettazionePage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative h-[40vh] lg:h-[50vh] bg-bg-tertiary">
        <Image
          src="/fallback.jpeg"
          alt="Progettazione The Antiques"
          fill
          className="object-cover opacity-60"
          priority
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center px-6">
          <h1 className="text-manifesto text-white text-center drop-shadow-lg">
            Progettazione
          </h1>
        </div>
      </section>

      {/* Content - Split Layout */}
      <section className="border-b border-border-primary">
        <div className="grid lg:grid-cols-2">
          {/* Text */}
          <div className="p-8 lg:p-16 flex flex-col justify-center">
            <p className="text-body text-text-secondary leading-relaxed mb-6">
              Ogni progetto nasce dall&apos;ascolto e dalla comprensione dello spazio, del contesto e dello stile desiderato.
              Per questo The Antiques collabora con un team di professionisti specializzati nella progettazione e nell&apos;arredo di ambienti, offrendo soluzioni personalizzate capaci di rispondere a esigenze estetiche e funzionali.
            </p>
            <p className="text-body text-text-secondary leading-relaxed mb-6">
              Che si tratti di ambienti industrial, minimal, classici, barocchi o di contaminazioni tra stili diversi, accompagniamo il cliente in ogni fase del processo: dallo studio iniziale alla definizione degli arredi, fino alla scelta degli oggetti più adatti a valorizzare lo spazio.
            </p>
            <p className="text-body text-text-secondary leading-relaxed mb-8">
              La nostra forza risiede nella conoscenza approfondita degli articoli e nella capacità di inserirli in progetti coerenti, creando atmosfere autentiche, equilibrate e senza tempo.
            </p>
            <Link href="/contact" className="btn-pill-filled self-start">
              Contattaci Ora
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Image */}
          <div className="relative aspect-square border-t lg:border-t-0 lg:border-l border-border-primary">
            <Image
              src="/fallback.jpeg"
              alt="Progettazione di interni"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>
    </div>
  )
}
