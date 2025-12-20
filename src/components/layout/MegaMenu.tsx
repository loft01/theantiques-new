'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ChevronDown } from 'lucide-react'

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

interface MegaMenuProps {
  categories: Category[]
}

export function MegaMenu({ categories }: MegaMenuProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  return (
    <div className="relative">
      <nav className="flex items-center gap-1">
        {categories.map((category) => (
          <div
            key={category.slug}
            className="relative"
            onMouseEnter={() => setActiveCategory(category.slug)}
            onMouseLeave={() => setActiveCategory(null)}
          >
            <button
              className={`flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                activeCategory === category.slug
                  ? 'bg-zinc-800 text-white'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              {category.name}
              <ChevronDown className={`w-4 h-4 transition-transform ${
                activeCategory === category.slug ? 'rotate-180' : ''
              }`} />
            </button>

            {/* Dropdown */}
            {activeCategory === category.slug && (
              <div className="absolute left-1/2 -translate-x-1/2 top-full pt-4 z-50">
                <div className="bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl p-8 min-w-[900px]">
                  <div className="flex gap-12">
                    {/* Subcategories */}
                    <div className="w-56">
                      <h3 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-4">
                        {category.name}
                      </h3>
                      <ul className="space-y-3">
                        {category.subcategories.map((sub) => (
                          <li key={sub.slug}>
                            <Link
                              href={`/categories/${category.slug}/${sub.slug}`}
                              className="text-base text-zinc-300 hover:text-amber-500 transition-colors"
                            >
                              {sub.name}
                            </Link>
                          </li>
                        ))}
                        <li className="pt-3">
                          <Link
                            href={`/categories/${category.slug}`}
                            className="text-base text-amber-500 hover:text-amber-400 font-medium"
                          >
                            View All →
                          </Link>
                        </li>
                      </ul>
                    </div>

                    {/* Divider */}
                    <div className="w-px bg-zinc-800" />

                    {/* Featured Products */}
                    <div className="flex-1">
                      <h3 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-4">
                        Featured Items
                      </h3>
                      <div className="grid grid-cols-3 gap-6">
                        {category.featured.slice(0, 3).map((product) => (
                          <Link
                            key={product.slug}
                            href={`/products/${product.slug}`}
                            className="group"
                          >
                            <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-zinc-800 mb-3">
                              <Image
                                src={product.image.url}
                                alt={product.image.alt}
                                fill
                                className="object-cover transition-transform duration-300 group-hover:scale-105"
                                sizes="200px"
                              />
                            </div>
                            <p className="text-xs text-zinc-500 mb-1">{product.category}</p>
                            <p className="text-sm text-zinc-200 group-hover:text-amber-500 transition-colors line-clamp-2">
                              {product.title}
                            </p>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </nav>
    </div>
  )
}
