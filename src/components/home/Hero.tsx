import Image from 'next/image'
import Link from 'next/link'

interface HeroProps {
  title?: string
  subtitle?: string
  ctaText?: string
  ctaLink?: string
}

export function Hero({
  title = 'Timeless Treasures',
  subtitle = 'Discover unique vintage and antique pieces with stories to tell',
  ctaText = 'Browse Collection',
  ctaLink = '/categories',
}: HeroProps) {
  return (
    <section className="relative min-h-[500px] md:min-h-[600px] flex items-center overflow-hidden">
      {/* Background Image */}
      <Image
        src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&h=1080&fit=crop"
        alt="Vintage antique collection"
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-12 md:py-16">
        <div className="max-w-2xl">
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
      </div>
    </section>
  )
}
