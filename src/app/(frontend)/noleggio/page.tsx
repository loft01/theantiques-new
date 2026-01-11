import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Noleggio Articoli | The Antiques',
  description: 'Servizio di noleggio flessibile per allestimenti, set cinematografici, eventi e showroom temporanei.',
}

export default function NoleggioPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative h-[40vh] lg:h-[50vh] bg-bg-tertiary">
        <Image
          src="/fallback.jpeg"
          alt="Noleggio Articoli The Antiques"
          fill
          className="object-cover opacity-60"
          priority
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center px-6">
          <h1 className="text-manifesto text-white text-center drop-shadow-lg">
            Noleggio Articoli
          </h1>
        </div>
      </section>

      {/* Content - Split Layout */}
      <section className="border-b border-border-primary">
        <div className="grid lg:grid-cols-2">
          {/* Text */}
          <div className="p-8 lg:p-16 flex flex-col justify-center">
            <p className="text-body text-text-secondary leading-relaxed mb-6">
              The Antiques offre un servizio di noleggio flessibile e completo, mettendo a disposizione tutti gli articoli presenti nel proprio catalogo come props per allestimenti, set cinematografici e fotografici, eventi, showroom temporanei o arredo di spazi commerciali.
            </p>
            <p className="text-body text-text-secondary leading-relaxed mb-6">
              Ogni oggetto viene selezionato per il suo carattere, la sua storia e il suo impatto visivo, diventando parte integrante del progetto.
            </p>
            <p className="text-body text-text-secondary leading-relaxed mb-8">
              Il noleggio rappresenta una soluzione ideale per chi desidera dare personalità a un ambiente o a una produzione, mantenendo la libertà di rinnovare e sperimentare, senza rinunciare alla qualità e all&apos;autenticità dell&apos;antiquariato.
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
              alt="Noleggio articoli"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>
    </div>
  )
}
