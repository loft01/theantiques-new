'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'

interface Category {
  slug: string
  name: string
}

interface HeroProps {
  categories?: Category[]
  heroImage?: string
  heroImageMobile?: string
}

const heroText = "Il passato non è mai passato"

export function Hero({ categories = [], heroImage, heroImageMobile }: HeroProps) {
  return (
    <section className="relative">
      <div className="grid lg:grid-cols-[280px_1fr] min-h-[calc(100vh-98px)]">
        {/* Left Sidebar - Categories (Desktop only) */}
        <div className="hidden lg:flex flex-col justify-between p-6 border-r border-border-primary">
          {/* Tagline */}
          <div>
            <p className="text-caption text-text-secondary">
              Design Curato,
              <br />
              per un vivere senza tempo.
            </p>
          </div>

          {/* Category Links */}
          <nav className="space-y-1 my-8">
            <Link
              href="/categories"
              className="block py-3 text-body-medium border-b border-border-primary hover:opacity-70 transition-opacity"
            >
              Tutti i Prodotti
            </Link>
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/categories/${cat.slug}`}
                className="block py-3 text-body-medium border-b border-border-primary hover:opacity-70 transition-opacity"
              >
                {cat.name}
              </Link>
            ))}
          </nav>

          {/* Empty space at bottom */}
          <div />
        </div>

        {/* Right Side - Hero Image */}
        <div className="relative min-h-[60vh] lg:min-h-0">
          {/* Desktop Image */}
          <Image
            src={heroImage || "/Antiques_dicembre.jpg"}
            alt="Pezzo d'antiquariato in evidenza"
            fill
            className="object-cover hidden lg:block"
            priority
            sizes="calc(100vw - 280px)"
          />
          {/* Mobile Image */}
          <Image
            src={heroImageMobile || heroImage || "/Antiques_dicembre.jpg"}
            alt="Pezzo d'antiquariato in evidenza"
            fill
            className="object-cover lg:hidden"
            priority
            sizes="100vw"
          />

          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/40" />

          {/* Centered text with animation */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.p
              className="text-3xl md:text-5xl lg:text-6xl text-white italic text-center px-6 tracking-tight"
              initial={{
                opacity: 0,
                scale: 1.1,
                filter: 'blur(20px)'
              }}
              animate={{
                opacity: 1,
                scale: 1,
                filter: 'blur(0px)'
              }}
              transition={{
                duration: 1.8,
                delay: 0.5,
                ease: [0.22, 1, 0.36, 1]
              }}
            >
              {heroText}
            </motion.p>
          </div>

          {/* Minimal CTA overlay - bottom right */}
          <div className="absolute bottom-6 right-6">
            <Link
              href="/categories"
              className="btn-pill bg-bg-primary/80 backdrop-blur-sm"
            >
              Esplora la Collezione
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
