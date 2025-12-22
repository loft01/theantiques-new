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

  const activeCategoryData = categories.find((c) => c.slug === activeCategory)

  return (
    <div
      className="relative"
      onMouseLeave={() => setActiveCategory(null)}
    >
      <nav className="flex items-center gap-1">
        {categories.map((category) => (
          <button
            key={category.slug}
            onMouseEnter={() => setActiveCategory(category.slug)}
            className={`flex items-center gap-1 px-4 py-2 text-small font-medium rounded-full transition-colors duration-normal ${
              activeCategory === category.slug
                ? 'bg-bg-tertiary text-text-primary'
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            {category.name}
            <ChevronDown className={`w-4 h-4 transition-transform ${
              activeCategory === category.slug ? 'rotate-180' : ''
            }`} />
          </button>
        ))}
      </nav>

      {/* Dropdown - centered below entire nav */}
      {activeCategoryData && (
        <div className="absolute left-1/2 -translate-x-1/2 top-full pt-4 z-50">
          <div className="bg-bg-secondary border border-border-default shadow-lg p-8 min-w-[900px]">
            <div className="flex gap-12">
              {/* Subcategories */}
              <div className="w-56">
                <h3 className="text-caption font-semibold text-text-secondary uppercase tracking-wider mb-4">
                  {activeCategoryData.name}
                </h3>
                <ul className="space-y-3">
                  {activeCategoryData.subcategories.map((sub) => (
                    <li key={sub.slug}>
                      <Link
                        href={`/categories/${activeCategoryData.slug}/${sub.slug}`}
                        className="text-body text-text-secondary transition-colors duration-normal hover:text-text-primary"
                      >
                        {sub.name}
                      </Link>
                    </li>
                  ))}
                  <li className="pt-3">
                    <Link
                      href={`/categories/${activeCategoryData.slug}`}
                      className="text-body text-text-primary font-medium transition-colors duration-normal hover:opacity-80"
                    >
                      View All →
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Divider */}
              <div className="w-px bg-border-default" />

              {/* Featured Products */}
              <div className="flex-1">
                <h3 className="text-caption font-semibold text-text-secondary uppercase tracking-wider mb-4">
                  Featured Items
                </h3>
                <div className="grid grid-cols-3 gap-6">
                  {activeCategoryData.featured.slice(0, 3).map((product) => (
                    <Link
                      key={product.slug}
                      href={`/products/${product.slug}`}
                      className="group"
                    >
                      <div className="relative aspect-[4/3] overflow-hidden bg-bg-tertiary mb-3">
                        <Image
                          src={product.image.url}
                          alt={product.image.alt}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                          sizes="200px"
                        />
                      </div>
                      <p className="text-caption text-text-secondary mb-1">{product.category}</p>
                      <p className="text-small text-text-primary transition-colors duration-normal line-clamp-2">
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
  )
}
