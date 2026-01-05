'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { useEffect, useRef } from 'react'

// Auto-scroll hook for carousels
function useAutoScroll(enabled: boolean, interval: number = 3000) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const isHovering = useRef(false)

  useEffect(() => {
    if (!enabled) return

    const container = scrollRef.current
    if (!container) return

    const scrollNext = () => {
      if (isHovering.current) return

      const children = container.children
      if (children.length === 0) return

      const containerWidth = container.offsetWidth
      const scrollLeft = container.scrollLeft
      const maxScroll = container.scrollWidth - containerWidth

      // Find next snap point
      let nextScroll = scrollLeft + containerWidth * 0.75

      // Loop back to start if at end
      if (scrollLeft >= maxScroll - 10) {
        nextScroll = 0
      }

      container.scrollTo({ left: nextScroll, behavior: 'smooth' })
    }

    const timer = setInterval(scrollNext, interval)

    const handleMouseEnter = () => { isHovering.current = true }
    const handleMouseLeave = () => { isHovering.current = false }
    const handleTouchStart = () => { isHovering.current = true }
    const handleTouchEnd = () => {
      setTimeout(() => { isHovering.current = false }, 2000)
    }

    container.addEventListener('mouseenter', handleMouseEnter)
    container.addEventListener('mouseleave', handleMouseLeave)
    container.addEventListener('touchstart', handleTouchStart)
    container.addEventListener('touchend', handleTouchEnd)

    return () => {
      clearInterval(timer)
      container.removeEventListener('mouseenter', handleMouseEnter)
      container.removeEventListener('mouseleave', handleMouseLeave)
      container.removeEventListener('touchstart', handleTouchStart)
      container.removeEventListener('touchend', handleTouchEnd)
    }
  }, [enabled, interval])

  return scrollRef
}

// ============================================
// SECTION HEADER
// Reusable title + subtitle for all sections
// ============================================
interface SectionHeaderProps {
  title: string
  subtitle?: string
  centered?: boolean
}

export function SectionHeader({ title, subtitle, centered = true }: SectionHeaderProps) {
  return (
    <div className={`mb-12 ${centered ? 'text-center' : ''}`}>
      <h2 className="text-section-title text-text-primary mb-3">{title}</h2>
      {subtitle && (
        <p className="text-body text-text-secondary max-w-2xl mx-auto">{subtitle}</p>
      )}
    </div>
  )
}

// ============================================
// CATEGORY ICONS SECTION
// Displays categories with uploaded icons and product counts
// ============================================
interface CategoryIconItem {
  id: string
  slug: string
  name: string
  iconUrl: string
  productCount: number
}

interface CategoryIconsSectionProps {
  categories: CategoryIconItem[]
  title?: string
  subtitle?: string
}

export function CategoryIconsSection({
  categories,
  title = "Esplora le Categorie",
  subtitle = "Scopri la nostra selezione curata di pezzi d'antiquariato"
}: CategoryIconsSectionProps) {
  const scrollRef = useAutoScroll(true, 3000)

  if (!categories || categories.length === 0) return null

  return (
    <section className="border-b-2 border-border-primary">
      <div className="py-16 md:py-20">
        <div className="container-editorial">
          <SectionHeader title={title} subtitle={subtitle} />
        </div>
        {/* Mobile: horizontal carousel / Desktop: centered flex */}
        <div
          ref={scrollRef}
          className="flex md:flex-wrap md:justify-center gap-6 md:gap-16 overflow-x-auto md:overflow-visible scrollbar-hide px-[30vw] md:px-0 snap-x snap-mandatory"
        >
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/categories/${category.slug}`}
              className="group flex flex-col items-center gap-3 min-w-[120px] flex-shrink-0 snap-center"
            >
              {/* Icon */}
              <div className="w-32 h-32 flex items-center justify-center">
                {category.iconUrl ? (
                  <Image
                    src={category.iconUrl}
                    alt={category.name}
                    width={128}
                    height={128}
                    className="w-full h-full object-contain opacity-70 group-hover:opacity-100 transition-opacity duration-300"
                  />
                ) : (
                  <div className="w-20 h-20 rounded-full bg-bg-tertiary" />
                )}
              </div>

              {/* Name */}
              <span className="text-body-medium text-text-primary group-hover:text-text-secondary transition-colors duration-300 text-center">
                {category.name}
              </span>

              {/* Product Count */}
              <span className="text-caption text-text-tertiary">
                {category.productCount} {category.productCount === 1 ? 'prodotto' : 'prodotti'}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

// ============================================
// MANIFESTO SECTION
// Large centered statement text
// ============================================
export function ManifestoSection() {
  return (
    <section className="section-padding border-b-2 border-border-primary">
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
// SERVICES SECTION
// 4 services with images (4 cols desktop, 2 cols mobile)
// ============================================
interface ServiceItem {
  title: string
  image: string
  href?: string
}

interface ServicesSectionProps {
  services?: ServiceItem[]
  title?: string
  subtitle?: string
}

const defaultServices: ServiceItem[] = [
  {
    title: "Progettazione",
    image: "/progettazione.jpg",
    href: "/services/progettazione"
  },
  {
    title: "Shop",
    image: "/shop.jpg",
    href: "/categories"
  },
  {
    title: "Noleggio",
    image: "/noleggio.jpg",
    href: "/services/noleggio"
  },
  {
    title: "Showroom",
    image: "/showroom.jpg",
    href: "/services/showroom"
  }
]

export function ServicesSection({
  services = defaultServices,
  title,
  subtitle
}: ServicesSectionProps) {
  const scrollRef = useAutoScroll(true, 4000)

  return (
    <section>
      {title && (
        <div className="container-editorial pt-16 md:pt-20 pb-8">
          <SectionHeader title={title} subtitle={subtitle} />
        </div>
      )}
      {/* Mobile: horizontal carousel / Desktop: grid */}
      <div
        ref={scrollRef}
        className="flex md:hidden overflow-x-auto scrollbar-hide snap-x snap-mandatory border-y-2 border-border-primary px-[12.5vw]"
      >
        {services.map((service, index) => (
          <Link
            key={index}
            href={service.href || '#'}
            className="relative flex-shrink-0 w-[75vw] aspect-square snap-center border-r-2 border-border-primary last:border-r-0"
          >
            <Image
              src={service.image}
              alt={service.title}
              fill
              className="object-cover"
              sizes="75vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <h3 className="text-body-medium text-white">
                {service.title}
              </h3>
            </div>
          </Link>
        ))}
      </div>
      {/* Desktop grid */}
      <div className="hidden md:grid grid-cols-4 border-y-2 border-border-primary">
        {services.map((service, index) => (
          <Link
            key={index}
            href={service.href || '#'}
            className="group relative aspect-square overflow-hidden border-r-2 border-border-primary last:border-r-0"
          >
            <Image
              src={service.image}
              alt={service.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="25vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <h3 className="text-section-title text-white">
                {service.title}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}

// ============================================
// SPLIT IMAGE SECTION
// Half image, half title+subtitle
// ============================================
interface SplitImageSectionProps {
  title: string
  subtitle?: string
  image: string
  imageMobile?: string
  imagePosition?: 'left' | 'right'
}

export function SplitImageSection({
  title,
  subtitle,
  image,
  imageMobile,
  imagePosition = 'left'
}: SplitImageSectionProps) {
  const imageContent = (
    <div className="relative aspect-square lg:aspect-auto lg:h-full min-h-[400px]">
      <Image
        src={imageMobile || image}
        alt={title}
        fill
        className="object-cover lg:hidden"
        sizes="100vw"
      />
      <Image
        src={image}
        alt={title}
        fill
        className="object-cover hidden lg:block"
        sizes="50vw"
      />
    </div>
  )

  const textContent = (
    <div className="flex items-center justify-center p-8 lg:p-16 min-h-[300px] lg:min-h-full">
      <div className="text-center max-w-lg">
        <h2 className="text-section-title md:text-manifesto text-text-primary mb-4">{title}</h2>
        {subtitle && (
          <p className="text-body text-text-secondary">{subtitle}</p>
        )}
      </div>
    </div>
  )

  return (
    <section className="border-b-2 border-border-primary">
      <div className="grid lg:grid-cols-2">
        {imagePosition === 'left' ? (
          <>
            {imageContent}
            {textContent}
          </>
        ) : (
          <>
            {textContent}
            {imageContent}
          </>
        )}
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
  imageMobile?: string
  alt?: string
}

export function CinematicBreak({
  image = "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&h=800&fit=crop",
  imageMobile,
  alt = "Scena cinematografica di antiquariato"
}: CinematicBreakProps) {
  return (
    <section className="relative h-[50vh] md:h-[70vh]">
      {/* Desktop Image */}
      <Image
        src={image}
        alt={alt}
        fill
        className="object-cover hidden md:block"
        sizes="100vw"
      />
      {/* Mobile Image */}
      <Image
        src={imageMobile || image}
        alt={alt}
        fill
        className="object-cover md:hidden"
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
    <section className="border-y-2 border-border-primary">
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
        <div className="flex flex-col justify-center p-8 lg:p-16 border-l-2 border-border-primary">
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
    <section className="section-padding">
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
  subtitle?: string
}

export function FeaturedProductsSection({
  children,
  title,
  subtitle
}: FeaturedProductsSectionProps) {
  return (
    <section className="border-b-2 border-border-primary">
      {title && (
        <div className="container-editorial pt-16 md:pt-20">
          <SectionHeader title={title} subtitle={subtitle} />
        </div>
      )}
      {children}
    </section>
  )
}
