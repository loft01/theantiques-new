'use client'

import Link from 'next/link'
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
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="text-xl font-semibold tracking-tight">
              The Antiques
            </Link>

            {/* Desktop Navigation with MegaMenu */}
            <div className="hidden lg:block">
              {categories.length > 0 && <MegaMenu categories={categories} />}
            </div>

            {/* Right side icons */}
            <div className="flex items-center gap-4">
              {/* Desktop links */}
              <nav className="hidden md:flex items-center gap-6">
                <Link href="/about" className="text-sm text-zinc-400 hover:text-white transition-colors">
                  About
                </Link>
                <Link href="/contact" className="text-sm text-zinc-400 hover:text-white transition-colors">
                  Contact
                </Link>
              </nav>

              {/* Search Button */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="flex items-center gap-2 px-3 py-1.5 text-zinc-400 hover:text-white transition-colors rounded-lg hover:bg-zinc-800"
                aria-label="Open search"
              >
                <Search className="w-5 h-5" aria-hidden="true" />
                <span className="hidden sm:inline text-sm">Search</span>
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden p-2 text-zinc-400 hover:text-white"
                aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={isMenuOpen}
              >
                {isMenuOpen ? <X className="w-6 h-6" aria-hidden="true" /> : <Menu className="w-6 h-6" aria-hidden="true" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <nav className="lg:hidden py-4 border-t border-border">
              <div className="flex flex-col gap-4">
                {/* Mobile Search Button */}
                <button
                  onClick={() => {
                    setIsMenuOpen(false)
                    setIsSearchOpen(true)
                  }}
                  className="flex items-center gap-3 p-3 bg-zinc-800/50 rounded-lg text-zinc-300 hover:text-white hover:bg-zinc-800 transition-colors"
                >
                  <Search className="w-5 h-5" />
                  <span>Search antiques...</span>
                </button>
                <div className="h-px bg-border" />
                {categories.map((cat) => (
                  <Link
                    key={cat.slug}
                    href={`/categories/${cat.slug}`}
                    className="text-zinc-300 hover:text-amber-500 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {cat.name}
                  </Link>
                ))}
                <div className="h-px bg-border my-2" />
                <Link href="/about" className="text-zinc-400 hover:text-white transition-colors" onClick={() => setIsMenuOpen(false)}>
                  About
                </Link>
                <Link href="/contact" className="text-zinc-400 hover:text-white transition-colors" onClick={() => setIsMenuOpen(false)}>
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
