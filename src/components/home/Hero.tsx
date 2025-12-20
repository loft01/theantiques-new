import Image from 'next/image'
import Link from 'next/link'

interface HeroProps {
  title?: string
  subtitle?: string
  ctaText?: string
  ctaLink?: string
  image?: {
    url: string
    alt: string
  }
}

export function Hero({
  title = 'Timeless Treasures',
  subtitle = 'Discover unique vintage and antique pieces with stories to tell',
  ctaText = 'Browse Collection',
  ctaLink = '/categories',
  image,
}: HeroProps) {
  return (
    <section className="relative h-[80vh] min-h-[600px] flex items-center justify-center overflow-hidden rounded-2xl">
      {/* Background */}
      {image ? (
        <Image
          src={image.url}
          alt={image.alt}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-800 via-zinc-900 to-black" />
      )}

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-semibold mb-6 tracking-tight">
          {title}
        </h1>
        <p className="text-xl md:text-2xl text-zinc-300 mb-10 max-w-2xl mx-auto leading-relaxed">
          {subtitle}
        </p>
        <Link
          href={ctaLink}
          className="inline-block bg-white text-black px-10 py-4 rounded-full font-medium text-lg
                     hover:bg-amber-500 hover:text-white transition-all duration-300
                     shadow-lg hover:shadow-amber-500/25"
        >
          {ctaText}
        </Link>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
          <div className="w-1 h-2 bg-white/50 rounded-full" />
        </div>
      </div>
    </section>
  )
}
