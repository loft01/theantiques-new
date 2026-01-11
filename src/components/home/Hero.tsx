'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

interface HeroProps {
  heroVideo?: string
  heroVideoMobile?: string
}

const heroText = "Dove l'antiquariato incontra il design contemporaneo."

export function Hero({
  heroVideo = "https://pub-86a8f9e390ac437988ab1a5db1a20295.r2.dev/media/the_antiques_home_.mp4",
  heroVideoMobile = "https://pub-86a8f9e390ac437988ab1a5db1a20295.r2.dev/media/videohome_antiques_verticale.mp4"
}: HeroProps) {
  return (
    <section className="relative min-h-[calc(100vh-98px)]">
      {/* Desktop Video */}
      <video
        src={heroVideo}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover hidden lg:block"
      />
      {/* Mobile Video */}
      <video
        src={heroVideoMobile}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover lg:hidden"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Centered text with animation */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.p
          className="text-xl md:text-2xl lg:text-3xl text-white italic text-center px-6 tracking-tight"
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
