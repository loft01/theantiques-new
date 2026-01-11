'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { Search, ChevronDown } from 'lucide-react'
import { SearchModal } from '../search/SearchModal'

interface FeaturedProduct {
  slug: string
  title: string
  image: { url: string; alt: string }
  category: string
}

interface SubCategory {
  slug: string
  name: string
}

interface Category {
  slug: string
  name: string
  subcategories: SubCategory[]
  featured: FeaturedProduct[]
}

interface HeaderProps {
  categories?: Category[]
  allProducts?: FeaturedProduct[]
}

export function Header({ categories = [], allProducts = [] }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isServicesOpen, setIsServicesOpen] = useState(false)
  const [hoveredCategory, setHoveredCategory] = useState<string | null>('all')

  // Get featured products for hovered category (or all products as default)
  const hoveredCategoryData = categories.find(c => c.slug === hoveredCategory)
  const featuredImages = hoveredCategory === 'all'
    ? allProducts
    : (hoveredCategoryData?.featured || [])

  // Close menu on escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMenuOpen(false)
      }
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [])

  // Prevent scroll when menu is open and reset hover state when closed
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
      setHoveredCategory('all')
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMenuOpen])

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-header bg-bg-primary/90 backdrop-blur-sm">
        {/* Main Nav Bar */}
        <div className="flex items-center justify-between h-14 px-6 border-b-2 border-border-primary">
          {/* Left - Menu */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="nav-link"
            aria-label={isMenuOpen ? 'Chiudi menu' : 'Apri menu'}
            aria-expanded={isMenuOpen}
          >
            Menu
          </button>

          {/* Center - Brand */}
          <Link
            href="/"
            className="absolute left-1/2 -translate-x-1/2"
          >
            <Image
              src="/logo_theantiques.svg"
              alt="The Antiques"
              width={140}
              height={20}
              priority
              className="h-5 w-auto logo-themed"
            />
          </Link>

          {/* Right - Search */}
          <button
            onClick={() => setIsSearchOpen(true)}
            className="nav-link flex items-center gap-2"
            aria-label="Apri ricerca"
          >
            <Search className="w-4 h-4" />
          </button>
        </div>

      </header>

      {/* Spacer for fixed header */}
      <div className="h-14" />

      {/* Full Screen Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-overlay bg-bg-primary">
          {/* Menu Header */}
          <div className="flex items-center justify-between h-14 px-6 border-b-2 border-border-primary">
            <button
              onClick={() => setIsMenuOpen(false)}
              className="nav-link"
            >
              Chiudi
            </button>
            <Link
              href="/"
              className="absolute left-1/2 -translate-x-1/2"
              onClick={() => setIsMenuOpen(false)}
            >
              <Image
                src="/logo_theantiques.svg"
                alt="The Antiques"
                width={140}
                height={20}
                className="h-5 w-auto logo-themed"
              />
            </Link>
            <div className="w-10" />
          </div>

          {/* Menu Content */}
          <div className="h-[calc(100vh-56px)] overflow-y-auto">
            <div className="grid lg:grid-cols-2 min-h-full">
              {/* Left Side - Navigation */}
              <div className="p-6 lg:p-12 border-r-2 border-border-primary">
                {/* Categories Sidebar */}
                <div className="mb-12">
                  <p className="text-caption text-text-tertiary mb-4">
                    Dove l&apos;antiquariato incontra
                    <br />
                    il design contemporaneo.
                  </p>
                </div>

                {/* Category Links */}
                <nav className="space-y-1">
                  <Link
                    href="/categories"
                    onClick={() => setIsMenuOpen(false)}
                    onMouseEnter={() => setHoveredCategory('all')}
                    className="block py-3 text-body-medium border-b-2 border-border-primary hover:opacity-70 transition-opacity"
                  >
                    Tutti i Prodotti
                  </Link>
                  {categories.map((cat) => (
                    <Link
                      key={cat.slug}
                      href={`/categories/${cat.slug}`}
                      onClick={() => setIsMenuOpen(false)}
                      onMouseEnter={() => setHoveredCategory(cat.slug)}
                      className="block py-3 text-body-medium border-b-2 border-border-primary hover:opacity-70 transition-opacity"
                    >
                      {cat.name}
                    </Link>
                  ))}
                </nav>

                {/* Secondary Links */}
                <div className="mt-12 space-y-4">
                  <div>
                    <button
                      onClick={() => setIsServicesOpen(!isServicesOpen)}
                      className="flex items-center gap-2 text-caption text-text-secondary hover:text-text-primary transition-colors"
                    >
                      Servizi
                      <ChevronDown className={`w-3 h-3 transition-transform ${isServicesOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {isServicesOpen && (
                      <div className="mt-2 ml-3 space-y-2">
                        <Link
                          href="/progettazione"
                          onClick={() => setIsMenuOpen(false)}
                          className="block text-caption text-text-secondary hover:text-text-primary transition-colors"
                        >
                          Progettazione
                        </Link>
                        <Link
                          href="/categories"
                          onClick={() => setIsMenuOpen(false)}
                          className="block text-caption text-text-secondary hover:text-text-primary transition-colors"
                        >
                          Shop
                        </Link>
                        <Link
                          href="/noleggio"
                          onClick={() => setIsMenuOpen(false)}
                          className="block text-caption text-text-secondary hover:text-text-primary transition-colors"
                        >
                          Noleggio
                        </Link>
                        <Link
                          href="/showroom"
                          onClick={() => setIsMenuOpen(false)}
                          className="block text-caption text-text-secondary hover:text-text-primary transition-colors"
                        >
                          Showroom
                        </Link>
                      </div>
                    )}
                  </div>
                  <Link
                    href="/about"
                    onClick={() => setIsMenuOpen(false)}
                    className="block text-caption text-text-secondary hover:text-text-primary transition-colors"
                  >
                    Chi Siamo
                  </Link>
                  <Link
                    href="/contact"
                    onClick={() => setIsMenuOpen(false)}
                    className="block text-caption text-text-secondary hover:text-text-primary transition-colors"
                  >
                    Contatti
                  </Link>
                </div>
              </div>

              {/* Right Side - Featured Products */}
              <div className="hidden lg:block relative bg-bg-secondary overflow-hidden">
                {featuredImages.length > 0 ? (
                  <div className="absolute inset-0 grid grid-cols-2 gap-1 p-1">
                    {featuredImages.slice(0, 4).map((product) => (
                      <Link
                        key={product.slug}
                        href={`/products/${product.slug}`}
                        onClick={() => setIsMenuOpen(false)}
                        className="relative overflow-hidden group"
                      >
                        <Image
                          src={product.image.url}
                          alt={product.image.alt}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          sizes="25vw"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                        <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                          <p className="text-caption text-white truncate">{product.title}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-opacity duration-300"
                    style={{
                      backgroundImage: 'url(/images/hero-antique.jpg)',
                      filter: 'grayscale(20%)',
                    }}
                  />
                )}
                {/* Category name overlay */}
                {(hoveredCategory === 'all' || hoveredCategoryData) && (
                  <div className="absolute bottom-6 left-6">
                    <p className="text-section-title text-white drop-shadow-lg">
                      {hoveredCategory === 'all' ? 'Tutti i Prodotti' : hoveredCategoryData?.name}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        categories={categories.map(c => ({ slug: c.slug, name: c.name }))}
      />
    </>
  )
}
