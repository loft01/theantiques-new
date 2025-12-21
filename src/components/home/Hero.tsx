'use client'

import Link from 'next/link'
import Image from 'next/image'

interface Category {
  slug: string
  name: string
}

interface HeroProps {
  categories?: Category[]
  heroImage?: string
}

export function Hero({ categories = [], heroImage }: HeroProps) {
  return (
    <section className="relative">
      <div className="grid lg:grid-cols-[280px_1fr] min-h-[calc(100vh-98px)]">
        {/* Left Sidebar - Categories (Desktop only) */}
        <div className="hidden lg:flex flex-col justify-between p-6 border-r border-border-primary">
          {/* Tagline */}
          <div>
            <p className="text-caption text-text-secondary">
              Curated Design,
              <br />
              for a timeless living.
            </p>
          </div>

          {/* Category Links */}
          <nav className="space-y-1 my-8">
            <Link
              href="/categories"
              className="block py-3 text-body-medium border-b border-border-primary hover:opacity-70 transition-opacity"
            >
              Shop All
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
          <Image
            src={heroImage || "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&h=1080&fit=crop"}
            alt="Featured antique piece"
            fill
            className="object-cover"
            priority
            sizes="(max-width: 1024px) 100vw, calc(100vw - 280px)"
          />

          {/* Minimal CTA overlay - bottom right */}
          <div className="absolute bottom-6 right-6">
            <Link
              href="/categories"
              className="btn-pill bg-bg-primary/80 backdrop-blur-sm"
            >
              Explore Collection
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
