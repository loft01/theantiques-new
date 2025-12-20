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
    <section className="relative min-h-[500px] md:min-h-[600px] flex items-center overflow-hidden rounded-lg bg-bg-secondary border border-border-default">
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
        <div className="absolute inset-0 bg-gradient-to-br from-bg-tertiary via-bg-secondary to-bg-primary" />
      )}

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/30" />

      {/* Content */}
      <div className="relative z-10 px-6 py-12 md:py-16 max-w-2xl">
        <h1 className="text-display md:text-[40px] md:leading-[48px] lg:text-[48px] lg:leading-[56px] text-text-primary mb-4">
          {title}
        </h1>
        <p className="text-body md:text-title-3 text-text-secondary mb-8 max-w-lg">
          {subtitle}
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Link href={ctaLink} className="btn-primary inline-flex items-center justify-center">
            {ctaText}
          </Link>
          <Link href="/about" className="btn-secondary inline-flex items-center justify-center">
            Our Story
          </Link>
        </div>
      </div>
    </section>
  )
}
