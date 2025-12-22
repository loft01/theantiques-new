'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

// ============================================
// MANIFESTO SECTION
// Large centered statement text
// ============================================
export function ManifestoSection() {
  return (
    <section className="section-padding border-b border-border-primary">
      <div className="container-editorial">
        <p className="text-manifesto text-center max-w-4xl mx-auto">
          The Antiques è una collezione accuratamente curata di oggetti senza tempo.
          Ogni pezzo combina storia ed eleganza, perfetto per arricchire
          spazi moderni con carattere e significato.
        </p>
      </div>
    </section>
  )
}

// ============================================
// CINEMATIC BREAK
// Full-width image with no text
// ============================================
interface CinematicBreakProps {
  image?: string
  alt?: string
}

export function CinematicBreak({
  image = "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&h=800&fit=crop",
  alt = "Scena cinematografica di antiquariato"
}: CinematicBreakProps) {
  return (
    <section className="relative h-[50vh] md:h-[70vh]">
      <Image
        src={image}
        alt={alt}
        fill
        className="object-cover grayscale-[20%]"
        sizes="100vw"
      />
    </section>
  )
}

// ============================================
// HIGHLIGHTED OBJECT SECTION
// 50/50 split with image and description
// ============================================
interface HighlightedObjectProps {
  title: string
  description: string
  image: string
  link: string
  ctaText?: string
}

export function HighlightedObject({
  title = "Scrivania Vittoriana",
  description = "Una straordinaria fusione di funzionalità e arte, questo pezzo ridefinisce i confini del design. Realizzato con materiali pregiati come mogano e ottone, questo tesoro in edizione limitata è una dichiarazione audace di eleganza e artigianalità. Possiedi un pezzo di storia oggi.",
  image = "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&h=1000&fit=crop",
  link = "/products/victorian-writing-desk",
  ctaText = "Scopri l'Oggetto"
}: HighlightedObjectProps) {
  return (
    <section className="border-y border-border-primary">
      <div className="grid lg:grid-cols-2">
        {/* Left - Image */}
        <div className="relative aspect-square lg:aspect-auto lg:min-h-[600px] bg-bg-tertiary">
          <Image
            src={image}
            alt={title}
            fill
            className="object-contain p-12"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>

        {/* Right - Content */}
        <div className="flex flex-col justify-center p-8 lg:p-16 border-l border-border-primary">
          <div className="max-w-md">
            <h2 className="text-section-title mb-6">{title}</h2>
            <p className="text-body text-text-secondary mb-8 leading-relaxed">
              {description}
            </p>
            <Link href={link} className="link-arrow">
              {ctaText}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

// ============================================
// EDITORIAL STORIES SECTION
// 3-column grid of stories/articles
// ============================================
interface Story {
  title: string
  date: string
  image: string
  link: string
}

interface EditorialStoriesProps {
  stories?: Story[]
}

const defaultStories: Story[] = [
  {
    title: "Un Capolavoro Moderno",
    date: "24/9/25",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=750&fit=crop",
    link: "/stories/modern-masterpiece"
  },
  {
    title: "Il Comfort Scultoreo è Arrivato",
    date: "8/8/25",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&h=750&fit=crop",
    link: "/stories/sculptural-comfort"
  },
  {
    title: "Una Nuova Era nel Design",
    date: "20/6/25",
    image: "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=600&h=750&fit=crop",
    link: "/stories/new-era-design"
  }
]

export function EditorialStories({ stories = defaultStories }: EditorialStoriesProps) {
  return (
    <section className="section-padding">
      <div className="container-editorial">
        <div className="grid-editorial">
          {stories.map((story, index) => (
            <Link key={index} href={story.link} className="editorial-card">
              <div className="editorial-card-image">
                <Image
                  src={story.image}
                  alt={story.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <div className="editorial-card-info">
                <span className="editorial-card-title">{story.title}</span>
                <span className="editorial-card-date">{story.date}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

// ============================================
// QUOTE SECTION
// Centered testimonial with avatar
// ============================================
interface QuoteSectionProps {
  quote?: string
  author?: string
  avatar?: string
}

export function QuoteSection({
  quote = "The Antiques ridefinisce il concetto di design curato. In un mondo saturo di opzioni, questa collezione eccelle concentrandosi sull'essenziale—pezzi accuratamente selezionati che incarnano sofisticatezza senza tempo e pura semplicità.",
  author = "Interior Design Magazine",
  avatar = "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop"
}: QuoteSectionProps) {
  return (
    <section className="section-padding border-t border-border-primary">
      <div className="quote-block">
        {/* Avatar */}
        <div className="quote-avatar">
          <Image
            src={avatar}
            alt={author}
            width={64}
            height={64}
            className="object-cover"
          />
        </div>

        {/* Quote */}
        <blockquote className="quote-text">
          "{quote}"
        </blockquote>

        {/* Author */}
        <Link href="/about" className="link-arrow justify-center">
          {author}
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  )
}

// ============================================
// FEATURED PRODUCTS SECTION WRAPPER
// Section wrapper for product grid
// ============================================
interface FeaturedProductsSectionProps {
  children: React.ReactNode
  title?: string
}

export function FeaturedProductsSection({
  children,
  title
}: FeaturedProductsSectionProps) {
  return (
    <section className="border-b border-border-primary">
      {title && (
        <div className="container-editorial text-center py-12">
          <h2 className="text-section-title">{title}</h2>
        </div>
      )}
      {children}
    </section>
  )
}
