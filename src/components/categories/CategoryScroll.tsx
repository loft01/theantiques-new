'use client'

import { useRef, useState } from 'react'
import { CategoryCard } from './CategoryCard'

interface Category {
  slug: string
  name: string
  image?: {
    url: string
    alt: string
  }
  productCount?: number
}

interface CategoryScrollProps {
  categories: Category[]
}

export function CategoryScroll({ categories }: CategoryScrollProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [isMouseDown, setIsMouseDown] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)

  const DRAG_THRESHOLD = 5

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return
    setIsMouseDown(true)
    setIsDragging(false)
    setStartX(e.pageX - scrollRef.current.offsetLeft)
    setScrollLeft(scrollRef.current.scrollLeft)
  }

  const handleMouseUp = () => {
    setIsMouseDown(false)
    // Small delay to allow click to be blocked if we were dragging
    setTimeout(() => setIsDragging(false), 0)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isMouseDown || !scrollRef.current) return

    const x = e.pageX - scrollRef.current.offsetLeft
    const walk = x - startX

    // Only start dragging after threshold
    if (Math.abs(walk) > DRAG_THRESHOLD) {
      setIsDragging(true)
      e.preventDefault()
      scrollRef.current.scrollLeft = scrollLeft - walk * 1.5
    }
  }

  const handleMouseLeave = () => {
    setIsMouseDown(false)
    setIsDragging(false)
  }

  return (
    <div className="relative -mx-4 px-4">
      <div
        ref={scrollRef}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={`flex gap-4 overflow-x-auto pb-4 scrollbar-hide ${
          isDragging ? 'cursor-grabbing select-none' : 'cursor-grab'
        }`}
        style={{ scrollBehavior: isDragging ? 'auto' : 'smooth' }}
      >
        {categories.map((category) => (
          <div
            key={category.slug}
            className="flex-none w-[280px]"
            style={{ pointerEvents: isDragging ? 'none' : 'auto' }}
          >
            <CategoryCard {...category} />
          </div>
        ))}
      </div>
    </div>
  )
}
