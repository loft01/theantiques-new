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
    e.preventDefault()
    setIsMouseDown(true)
    setIsDragging(false)
    setStartX(e.pageX - scrollRef.current.offsetLeft)
    setScrollLeft(scrollRef.current.scrollLeft)
  }

  const handleMouseUp = () => {
    setIsMouseDown(false)
    setTimeout(() => setIsDragging(false), 0)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isMouseDown || !scrollRef.current) return

    const x = e.pageX - scrollRef.current.offsetLeft
    const walk = x - startX

    if (Math.abs(walk) > DRAG_THRESHOLD) {
      setIsDragging(true)
      scrollRef.current.scrollLeft = scrollLeft - walk * 1.5
    }
  }

  const handleMouseLeave = () => {
    setIsMouseDown(false)
    setIsDragging(false)
  }

  const handleClick = (e: React.MouseEvent) => {
    if (isDragging) {
      e.preventDefault()
      e.stopPropagation()
    }
  }

  const scrollClass = isMouseDown 
    ? 'flex gap-4 overflow-x-auto pb-4 scrollbar-hide select-none cursor-grabbing'
    : 'flex gap-4 overflow-x-auto pb-4 scrollbar-hide select-none cursor-grab'

  return (
    <div className="relative -mx-4 px-4">
      <div
        ref={scrollRef}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClickCapture={handleClick}
        className={scrollClass}
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
