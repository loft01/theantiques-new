'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { Search } from 'lucide-react'
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
}

export function Header({ categories = [] }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)

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

  // Prevent scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMenuOpen])

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-header bg-bg-primary/90 backdrop-blur-sm">
        {/* Main Nav Bar */}
        <div className="flex items-center justify-between h-14 px-6 border-b border-border-primary/50">
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
              className="h-5 w-auto invert"
            />
          </Link>

          {/* Right - Search */}
          <div className="flex items-center gap-6">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="nav-link flex items-center gap-2"
              aria-label="Apri ricerca"
            >
              <Search className="w-4 h-4" />
            </button>
          </div>
        </div>

      </header>

      {/* Spacer for fixed header */}
      <div className="h-14" />

      {/* Full Screen Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-overlay bg-bg-primary">
          {/* Menu Header */}
          <div className="flex items-center justify-between h-14 px-6 border-b border-border-primary">
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
                className="h-5 w-auto invert"
              />
            </Link>
            <div className="w-10" />
          </div>

          {/* Menu Content */}
          <div className="h-[calc(100vh-56px)] overflow-y-auto">
            <div className="grid lg:grid-cols-2 min-h-full">
              {/* Left Side - Navigation */}
              <div className="p-6 lg:p-12 border-r border-border-primary">
                {/* Categories Sidebar */}
                <div className="mb-12">
                  <p className="text-caption text-text-tertiary mb-4">
                    Design Curato,
                    <br />
                    per un vivere senza tempo.
                  </p>
                </div>

                {/* Category Links */}
                <nav className="space-y-1">
                  <Link
                    href="/categories"
                    onClick={() => setIsMenuOpen(false)}
                    className="block py-3 text-body-medium border-b border-border-primary hover:opacity-70 transition-opacity"
                  >
                    Tutti i Prodotti
                  </Link>
                  {categories.map((cat) => (
                    <Link
                      key={cat.slug}
                      href={`/categories/${cat.slug}`}
                      onClick={() => setIsMenuOpen(false)}
                      className="block py-3 text-body-medium border-b border-border-primary hover:opacity-70 transition-opacity"
                    >
                      {cat.name}
                    </Link>
                  ))}
                </nav>

                {/* Secondary Links */}
                <div className="mt-12 space-y-4">
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

              {/* Right Side - Featured Image */}
              <div className="hidden lg:block relative">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: 'url(/images/hero-antique.jpg)',
                    filter: 'grayscale(20%)',
                  }}
                />
                {/* Optional: Featured product or CTA */}
                <div className="absolute bottom-6 right-6">
                  <Link
                    href="/categories"
                    onClick={() => setIsMenuOpen(false)}
                    className="btn-pill bg-bg-primary/80 backdrop-blur-sm"
                  >
                    60%
                  </Link>
                </div>
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
