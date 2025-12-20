'use client'

import Link from 'next/link'
import { useRef, useState } from 'react'

interface Subcategory {
  slug: string
  name: string
  image?: {
    url: string
    alt: string
  }
}

interface SubcategoryPillsProps {
  subcategories: Subcategory[]
  categorySlug: string
  activeSubcategory?: string
}

export function SubcategoryPills({
  subcategories,
  categorySlug,
  activeSubcategory,
}: SubcategoryPillsProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return
    setIsDragging(true)
    setStartX(e.pageX - scrollRef.current.offsetLeft)
    setScrollLeft(scrollRef.current.scrollLeft)
  }

  const handleMouseUp = () => setIsDragging(false)
  const handleMouseLeave = () => setIsDragging(false)

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return
    e.preventDefault()
    const x = e.pageX - scrollRef.current.offsetLeft
    const walk = (x - startX) * 1.5
    scrollRef.current.scrollLeft = scrollLeft - walk
  }

  return (
    <div
      ref={scrollRef}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`flex gap-3 overflow-x-auto scrollbar-hide pb-2 ${
        isDragging ? 'cursor-grabbing select-none' : 'cursor-grab'
      }`}
    >
      {/* All option */}
      <Link
        href={`/categories/${categorySlug}`}
        className={`flex-none px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
          !activeSubcategory
            ? 'bg-amber-600 text-white'
            : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
        }`}
        style={{ pointerEvents: isDragging ? 'none' : 'auto' }}
      >
        All
      </Link>

      {subcategories.map((sub) => (
        <Link
          key={sub.slug}
          href={`/categories/${categorySlug}/${sub.slug}`}
          className={`flex-none px-5 py-2.5 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
            activeSubcategory === sub.slug
              ? 'bg-amber-600 text-white'
              : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
          }`}
          style={{ pointerEvents: isDragging ? 'none' : 'auto' }}
        >
          {sub.name}
        </Link>
      ))}
    </div>
  )
}
