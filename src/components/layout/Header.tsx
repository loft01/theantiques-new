'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Search, Menu, X } from 'lucide-react'
import { MegaMenu } from './MegaMenu'

const menuCategories = [
  {
    slug: 'furniture',
    name: 'Furniture',
    subcategories: [
      { slug: 'chairs', name: 'Chairs & Seating' },
      { slug: 'tables', name: 'Tables' },
      { slug: 'cabinets', name: 'Cabinets & Storage' },
      { slug: 'desks', name: 'Desks' },
      { slug: 'beds', name: 'Beds & Bedroom' },
    ],
    featured: [
      { slug: 'victorian-cabinet', title: 'Victorian Display Cabinet', image: { url: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=300&h=300&fit=crop', alt: 'Cabinet' }, category: 'Cabinets' },
      { slug: 'french-armchair', title: 'French Louis XV Armchair', image: { url: 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=300&h=300&fit=crop', alt: 'Armchair' }, category: 'Chairs' },
      { slug: 'oak-desk', title: 'Georgian Oak Writing Desk', image: { url: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=300&h=300&fit=crop', alt: 'Desk' }, category: 'Desks' },
    ],
  },
  {
    slug: 'lighting',
    name: 'Lighting',
    subcategories: [
      { slug: 'chandeliers', name: 'Chandeliers' },
      { slug: 'table-lamps', name: 'Table Lamps' },
      { slug: 'floor-lamps', name: 'Floor Lamps' },
      { slug: 'wall-sconces', name: 'Wall Sconces' },
    ],
    featured: [
      { slug: 'art-deco-chandelier', title: 'Art Deco Crystal Chandelier', image: { url: 'https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?w=300&h=300&fit=crop', alt: 'Chandelier' }, category: 'Chandeliers' },
      { slug: 'brass-lamp', title: 'Antique Brass Table Lamp', image: { url: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=300&h=300&fit=crop', alt: 'Lamp' }, category: 'Table Lamps' },
      { slug: 'tiffany-lamp', title: 'Tiffany Style Floor Lamp', image: { url: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=300&h=300&fit=crop', alt: 'Floor Lamp' }, category: 'Floor Lamps' },
    ],
  },
  {
    slug: 'decorative',
    name: 'Decorative',
    subcategories: [
      { slug: 'mirrors', name: 'Mirrors' },
      { slug: 'clocks', name: 'Clocks' },
      { slug: 'vases', name: 'Vases & Urns' },
      { slug: 'sculptures', name: 'Sculptures' },
    ],
    featured: [
      { slug: 'gilt-mirror', title: 'Gilt Framed Wall Mirror', image: { url: 'https://images.unsplash.com/photo-1618220179428-22790b461013?w=300&h=300&fit=crop', alt: 'Mirror' }, category: 'Mirrors' },
      { slug: 'mantle-clock', title: 'Victorian Mantle Clock', image: { url: 'https://images.unsplash.com/photo-1415604934674-561df9abf539?w=300&h=300&fit=crop', alt: 'Clock' }, category: 'Clocks' },
      { slug: 'bronze-sculpture', title: 'Bronze Horse Sculpture', image: { url: 'https://images.unsplash.com/photo-1544967082-d9d25d867d66?w=300&h=300&fit=crop', alt: 'Sculpture' }, category: 'Sculptures' },
    ],
  },
  {
    slug: 'art',
    name: 'Fine Art',
    subcategories: [
      { slug: 'paintings', name: 'Paintings' },
      { slug: 'prints', name: 'Prints & Lithographs' },
      { slug: 'drawings', name: 'Drawings' },
      { slug: 'photographs', name: 'Vintage Photography' },
    ],
    featured: [
      { slug: 'oil-landscape', title: '19th Century Oil Landscape', image: { url: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=300&h=300&fit=crop', alt: 'Painting' }, category: 'Paintings' },
      { slug: 'botanical-print', title: 'Botanical Print Set', image: { url: 'https://images.unsplash.com/photo-1582201942988-13e60e4556ee?w=300&h=300&fit=crop', alt: 'Print' }, category: 'Prints' },
      { slug: 'portrait-drawing', title: 'Charcoal Portrait Drawing', image: { url: 'https://images.unsplash.com/photo-1578926375605-eaf7559b1458?w=300&h=300&fit=crop', alt: 'Drawing' }, category: 'Drawings' },
    ],
  },
]

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="text-xl font-semibold tracking-tight">
            The Antiques
          </Link>

          {/* Desktop Navigation with MegaMenu */}
          <div className="hidden lg:block">
            <MegaMenu categories={menuCategories} />
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

            {/* Search */}
            <Link href="/search" className="p-2 text-zinc-400 hover:text-white transition-colors">
              <Search className="w-5 h-5" />
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 text-zinc-400 hover:text-white"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="lg:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-4">
              {menuCategories.map((cat) => (
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
  )
}
