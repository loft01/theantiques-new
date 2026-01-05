'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'

interface HeroProps {
  heroImage?: string
  heroImageMobile?: string
}

const heroText = "Il passato non è mai passato"

export function Hero({ heroImage, heroImageMobile }: HeroProps) {
  return (
    <section className="relative min-h-[calc(100vh-98px)]">
      {/* Desktop Image */}
      <Image
        src={heroImage || "/Antiques_dicembre.jpg"}
        alt="Pezzo d'antiquariato in evidenza"
        fill
        className="object-cover hidden lg:block"
        priority
        sizes="100vw"
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
    </section>
  )
}
