import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Showroom | The Antiques',
  description: 'Visita il nostro showroom di 400 mq a Resana. Uno spazio pensato per accogliere clienti e professionisti.',
}

export default function ShowroomPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative h-[40vh] lg:h-[50vh] bg-bg-tertiary">
        <Image
          src="/showroom-back.jpg"
          alt="Showroom The Antiques"
          fill
          className="object-cover opacity-60"
          priority
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center px-6">
          <h1 className="text-manifesto text-white text-center drop-shadow-lg">
            Showroom
          </h1>
        </div>
      </section>

      {/* Content - Split Layout */}
      <section className="border-b border-border-primary">
        <div className="grid lg:grid-cols-2">
          {/* Text */}
          <div className="p-8 lg:p-16 flex flex-col justify-center">
            <p className="text-body text-text-secondary leading-relaxed mb-6">
              Il nostro showroom di 400 mq è uno spazio pensato per accogliere clienti e professionisti, offrendo la possibilità di vedere dal vivo gli articoli, valutarne materiali, finiture e proporzioni.
            </p>
            <p className="text-body text-text-secondary leading-relaxed mb-6">
              Un&apos;esperienza diretta che rafforza la fiducia e permette di scegliere con maggiore consapevolezza.
            </p>
            <p className="text-body text-text-secondary leading-relaxed mb-8">
              Lo showroom si trova a Resana, in una posizione strategica e facilmente raggiungibile anche dalle grandi città, come Milano, grazie alla comoda uscita di Padova.
              Un luogo dove l&apos;antiquariato prende forma, pensato non solo per l&apos;acquisto, ma anche come punto di incontro e di ispirazione per nuovi progetti.
            </p>
            <Link href="/contact" className="link-arrow self-start">
              Contattaci per una visita
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Image */}
          <div className="relative aspect-square border-t lg:border-t-0 lg:border-l border-border-primary">
            <Image
              src="/fallback.jpeg"
              alt="Showroom The Antiques"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>
    </div>
  )
}
