'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

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

// Infinite loop carousel hook - works with both auto-scroll and manual swipe
function useInfiniteCarousel(enabled: boolean, interval: number = 3000) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const isHovering = useRef(false)
  const isScrolling = useRef(false)

  useEffect(() => {
    if (!enabled) return

    const container = scrollRef.current
    if (!container) return

    // Handle infinite loop reset on scroll
    const handleScroll = () => {
      if (isScrolling.current) return

      const halfScroll = container.scrollWidth / 2

      // If scrolled past the duplicate set, reset to first set
      if (container.scrollLeft >= halfScroll) {
        isScrolling.current = true
        container.scrollLeft = container.scrollLeft - halfScroll
        isScrolling.current = false
      }
      // If scrolled before start (negative would be caught by browser, but near 0 going left)
      else if (container.scrollLeft <= 0) {
        isScrolling.current = true
        container.scrollLeft = halfScroll + container.scrollLeft
        isScrolling.current = false
      }
    }

    // Auto-scroll to next item
    const scrollNext = () => {
      if (isHovering.current) return

      const children = container.children
      if (children.length === 0) return

      // Scroll by roughly one item width
      const itemWidth = (children[0] as HTMLElement).offsetWidth + 24 // gap-6 = 24px
      const nextScroll = container.scrollLeft + itemWidth

      container.scrollTo({ left: nextScroll, behavior: 'smooth' })
    }

    const timer = setInterval(scrollNext, interval)

    const handleMouseEnter = () => { isHovering.current = true }
    const handleMouseLeave = () => { isHovering.current = false }
    const handleTouchStart = () => { isHovering.current = true }
    const handleTouchEnd = () => {
      setTimeout(() => { isHovering.current = false }, 2000)
    }

    container.addEventListener('scroll', handleScroll)
    container.addEventListener('mouseenter', handleMouseEnter)
    container.addEventListener('mouseleave', handleMouseLeave)
    container.addEventListener('touchstart', handleTouchStart)
    container.addEventListener('touchend', handleTouchEnd)

    return () => {
      clearInterval(timer)
      container.removeEventListener('scroll', handleScroll)
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
  const scrollRef = useInfiniteCarousel(true, 3000)

  if (!categories || categories.length === 0) return null

  // Duplicate categories for infinite loop effect
  const duplicatedCategories = [...categories, ...categories]

  const CategoryItem = ({ category, index }: { category: CategoryIconItem; index: number }) => (
    <Link
      key={`${category.id}-${index}`}
      href={`/categories/${category.slug}`}
      className="group flex flex-col items-center gap-3 min-w-[120px] flex-shrink-0"
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
  )

  return (
    <section className="border-b-2 border-border-primary">
      <div className="py-16 md:py-20">
        <div className="container-editorial">
          <SectionHeader title={title} subtitle={subtitle} />
        </div>
        {/* Mobile: infinite horizontal carousel */}
        <div
          ref={scrollRef}
          className="flex md:hidden gap-6 overflow-x-auto scrollbar-hide px-6"
        >
          {duplicatedCategories.map((category, index) => (
            <CategoryItem key={`${category.id}-${index}`} category={category} index={index} />
          ))}
        </div>
        {/* Desktop: centered flex (no infinite scroll) */}
        <div className="hidden md:flex md:flex-wrap md:justify-center gap-16">
          {categories.map((category, index) => (
            <CategoryItem key={category.id} category={category} index={index} />
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
        The Antiques è una collezione di oggetti senza tempo,
        selezionati per la loro storia e la loro eleganza,
        capaci di dare carattere e profondità agli spazi contemporanei.
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
    href: "/progettazione"
  },
  {
    title: "Shop",
    image: "/shop.jpg",
    href: "/categories"
  },
  {
    title: "Noleggio",
    image: "/noleggio.jpg",
    href: "/noleggio"
  },
  {
    title: "Showroom",
    image: "/showroom.jpg",
    href: "/showroom"
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
// Auto-sliding testimonials carousel
// ============================================
interface Testimonial {
  quote: string
  author: string
}

const defaultTestimonials: Testimonial[] = [
  {
    quote: "The Antiques ridefinisce il concetto di design curato. In un mondo saturo di opzioni, questa collezione eccelle concentrandosi sull'essenziale—pezzi accuratamente selezionati che incarnano sofisticatezza senza tempo.",
    author: "Interior Design Magazine"
  },
  {
    quote: "Ogni pezzo racconta una storia. Ho trovato qui oggetti che non avrei mai scoperto altrove, con una qualità e un'autenticità impeccabili.",
    author: "Marco R., Collezionista"
  },
  {
    quote: "Un'esperienza d'acquisto raffinata e personale. Il team conosce ogni dettaglio dei loro pezzi e sa guidarti verso la scelta perfetta.",
    author: "Giulia M., Interior Designer"
  },
  {
    quote: "Finalmente un antiquario che unisce tradizione e modernità. I loro pezzi si integrano perfettamente negli ambienti contemporanei.",
    author: "Casa & Design"
  },
  {
    quote: "Professionalità e passione in ogni interazione. The Antiques è diventato il mio punto di riferimento per l'antiquariato di qualità.",
    author: "Francesco L., Architetto"
  },
  {
    quote: "La cura nella selezione è evidente. Ogni visita allo showroom è un viaggio nel tempo attraverso oggetti straordinari.",
    author: "Elena S., Collezionista"
  }
]

interface QuoteSectionProps {
  testimonials?: Testimonial[]
  title?: string
  subtitle?: string
}

export function QuoteSection({
  testimonials = defaultTestimonials,
  title = "Cosa Dicono di Noi",
  subtitle = "Le opinioni dei nostri clienti e della stampa"
}: QuoteSectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  // Auto-scroll
  useEffect(() => {
    const timer = setInterval(() => {
      if (scrollRef.current) {
        const nextIndex = (currentIndex + 1) % testimonials.length
        const container = scrollRef.current
        const itemWidth = container.scrollWidth / testimonials.length
        container.scrollTo({ left: itemWidth * nextIndex, behavior: 'smooth' })
      }
    }, 5000)

    return () => clearInterval(timer)
  }, [currentIndex, testimonials.length])

  // Track scroll position to update dots
  useEffect(() => {
    const container = scrollRef.current
    if (!container) return

    const handleScroll = () => {
      const itemWidth = container.scrollWidth / testimonials.length
      const newIndex = Math.round(container.scrollLeft / itemWidth)
      setCurrentIndex(newIndex)
    }

    container.addEventListener('scroll', handleScroll)
    return () => container.removeEventListener('scroll', handleScroll)
  }, [testimonials.length])

  const scrollToIndex = (index: number) => {
    if (scrollRef.current) {
      const itemWidth = scrollRef.current.scrollWidth / testimonials.length
      scrollRef.current.scrollTo({ left: itemWidth * index, behavior: 'smooth' })
    }
  }

  return (
    <section className="section-padding">
      <div className="container-editorial mb-8">
        <SectionHeader title={title} subtitle={subtitle} />
      </div>

      {/* Horizontal scrollable testimonials */}
      <div
        ref={scrollRef}
        className="flex overflow-x-auto scrollbar-hide snap-x snap-mandatory"
      >
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-full snap-center px-6 md:px-16"
          >
            <div className="quote-block !pt-0 !pb-0">
              <blockquote className="quote-text">
                "{testimonial.quote}"
              </blockquote>
              <p className="text-body-medium text-text-secondary">
                — {testimonial.author}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Dots indicator */}
      <div className="flex justify-center gap-2 mt-8">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollToIndex(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? 'bg-text-primary w-6'
                : 'bg-text-tertiary hover:bg-text-secondary w-2'
            }`}
            aria-label={`Vai alla testimonianza ${index + 1}`}
          />
        ))}
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
