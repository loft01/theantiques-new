'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { Search, Menu, X } from 'lucide-react'
import { MegaMenu } from './MegaMenu'
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

  return (
    <>
      <header className="sticky top-0 z-header bg-bg-secondary border-b border-border-default">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link
              href="/"
              className="transition-opacity duration-normal hover:opacity-80"
            >
              <Image
                src="/logo_theantiques.svg"
                alt="The Antiques"
                width={160}
                height={24}
                priority
                className="h-6 w-auto invert"
              />
            </Link>

            {/* Desktop Navigation with MegaMenu */}
            <div className="hidden lg:block">
              {categories.length > 0 && <MegaMenu categories={categories} />}
            </div>

            {/* Right side */}
            <div className="flex items-center gap-2">
              {/* Desktop links */}
              <nav className="hidden md:flex items-center gap-1">
                <Link
                  href="/about"
                  className="px-4 py-2 text-caption-medium text-text-secondary transition-colors duration-normal hover:text-text-primary"
                >
                  About
                </Link>
                <Link
                  href="/contact"
                  className="px-4 py-2 text-caption-medium text-text-secondary transition-colors duration-normal hover:text-text-primary"
                >
                  Contact
                </Link>
              </nav>

              {/* Search Button */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="flex items-center justify-center gap-2 h-11 min-w-11 px-3 text-text-secondary rounded-md transition-colors duration-normal hover:text-text-primary hover:bg-bg-tertiary"
                aria-label="Open search"
              >
                <Search className="w-5 h-5" aria-hidden="true" />
                <span className="hidden sm:inline text-caption-medium">Search</span>
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden flex items-center justify-center h-11 w-11 text-text-secondary rounded-md transition-colors duration-normal hover:text-text-primary hover:bg-bg-tertiary"
                aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={isMenuOpen}
              >
                {isMenuOpen ? (
                  <X className="w-6 h-6" aria-hidden="true" />
                ) : (
                  <Menu className="w-6 h-6" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <nav className="lg:hidden py-4 border-t border-border-default">
              <div className="flex flex-col gap-1">
                {/* Mobile Search Button */}
                <button
                  onClick={() => {
                    setIsMenuOpen(false)
                    setIsSearchOpen(true)
                  }}
                  className="flex items-center gap-3 h-12 px-4 bg-bg-tertiary rounded-lg text-text-secondary transition-colors duration-normal hover:text-text-primary"
                >
                  <Search className="w-5 h-5" />
                  <span className="text-body">Search antiques...</span>
                </button>

                <div className="h-px bg-border-default my-3" />

                {categories.map((cat) => (
                  <Link
                    key={cat.slug}
                    href={`/categories/${cat.slug}`}
                    className="h-11 flex items-center px-4 text-body text-text-primary rounded-md transition-colors duration-normal hover:bg-bg-tertiary"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {cat.name}
                  </Link>
                ))}

                <div className="h-px bg-border-default my-3" />

                <Link
                  href="/about"
                  className="h-11 flex items-center px-4 text-body text-text-secondary rounded-md transition-colors duration-normal hover:bg-bg-tertiary hover:text-text-primary"
                  onClick={() => setIsMenuOpen(false)}
                >
                  About
                </Link>
                <Link
                  href="/contact"
                  className="h-11 flex items-center px-4 text-body text-text-secondary rounded-md transition-colors duration-normal hover:bg-bg-tertiary hover:text-text-primary"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contact
                </Link>
              </div>
            </nav>
          )}
        </div>
      </header>

      {/* Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  )
}
