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
      <section className="relative h-[30vh] bg-bg-tertiary">
        <Image
          src="/Maschera_africana_4-min.jpg"
          alt="Maschera africana - The Antiques"
          fill
          className="object-cover opacity-50"
          priority
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-manifesto text-white text-center drop-shadow-lg">
            Chi Siamo
          </h1>
        </div>
      </section>

      {/* Intro Text */}
      <section className="section-padding border-b border-border-primary">
        <div className="container-editorial max-w-3xl mx-auto text-center">
          <p className="text-body text-text-secondary leading-relaxed">
            The Antiques è più di un semplice negozio di antiquariato; è un&apos;esperienza curata
            che celebra la bellezza degli oggetti d&apos;epoca. Offriamo una collezione accuratamente
            selezionata di mobili, arte e accessori che portano carattere e storia negli spazi
            contemporanei. Ogni pezzo è scelto per la sua autenticità, qualità artigianale e
            capacità di raccontare una storia unica.
          </p>
        </div>
      </section>

      {/* Three Column Blocks */}
      <section className="border-b border-border-primary">
        <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border-primary">
          {/* Our Manifesto */}
          <div className="p-8 lg:p-12">
            <h2 className="text-caption text-text-tertiary mb-6">Il Nostro Manifesto</h2>
            <p className="text-body text-text-secondary leading-relaxed">
              Da The Antiques, crediamo nel potere della semplicità per creare spazi che
              ispirano calma e chiarezza. Il nostro manifesto è curare pezzi senza tempo e funzionali
              che incarnano autenticità, storia, sostenibilità e bellezza minimalista, offrendo
              oggetti che elevano e arricchiscono il tuo spazio. Ogni membro gioca un ruolo vitale nella nostra
              missione.
            </p>
          </div>

          {/* Our Approach */}
          <div className="p-8 lg:p-12">
            <h2 className="text-caption text-text-tertiary mb-6">L'Approccio The Antiques</h2>
            <p className="text-body text-text-secondary leading-relaxed">
              Il nostro team è guidato da una passione condivisa per il design eccezionale e
              l'artigianalità. Selezioniamo con cura ogni pezzo della nostra collezione per garantire
              che soddisfi i nostri rigorosi standard di qualità, autenticità e valore
              duraturo. Dalla ricerca di design iconici alla scoperta di talenti emergenti, siamo
              impegnati a portarvi la più raffinata selezione curata.
            </p>
          </div>

          {/* Press & Inquiries */}
          <div className="p-8 lg:p-12">
            <h2 className="text-caption text-text-tertiary mb-6">Stampa & Richieste</h2>
            <p className="text-body text-text-secondary leading-relaxed mb-6">
              Il nostro press kit offre una panoramica completa di The Antiques, inclusa la nostra
              storia del brand, filosofia di design e informazioni dettagliate sui prodotti.
              Fornisce immagini ad alta risoluzione, comunicati stampa e approfondimenti
              per giornalisti e partner interessati alla nostra
              collezione e approccio al design curato.
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
