'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface GalleryImage {
  url: string
  alt: string
}

interface ImageGalleryProps {
  images: GalleryImage[]
  title: string
}

export function ImageGallery({ images, title }: ImageGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isZoomed, setIsZoomed] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)

  const activeImage = images[activeIndex]

  const goToPrevious = () => {
    setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const goToNext = () => {
    setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    setMousePosition({ x, y })
  }

  return (
    <>
      <div className="space-y-4 w-full max-w-full">
        {/* Main image - square container, image contained at original ratio */}
        <div
          ref={containerRef}
          className="relative aspect-square max-h-[70vh] w-full max-w-full overflow-hidden bg-bg-primary group mx-auto cursor-zoom-in"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          onMouseMove={handleMouseMove}
          onClick={() => setIsZoomed(true)}
        >
          <Image
            src={activeImage.url}
            alt={activeImage.alt}
            fill
            className={cn(
              "object-contain transition-transform duration-200 pointer-events-none",
              isHovering && "scale-150"
            )}
            style={isHovering ? { transformOrigin: `${mousePosition.x}% ${mousePosition.y}%` } : undefined}
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
          />

        </div>

        {/* Thumbnails - 80px per rulebook */}
        {images.length > 1 && (
          <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={cn(
                  'relative flex-shrink-0 w-20 h-20 overflow-hidden transition-all duration-normal',
                  index === activeIndex
                    ? 'ring-2 ring-text-primary ring-offset-2 ring-offset-bg-primary'
                    : 'opacity-60 hover:opacity-100'
                )}
              >
                <Image
                  src={image.url}
                  alt={image.alt}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Zoom Modal - full screen overlay */}
      {isZoomed && (
        <div
          className="fixed inset-0 z-modal bg-black/90 flex items-center justify-center animate-in fade-in duration-normal"
          onClick={() => setIsZoomed(false)}
        >
          <button
            onClick={() => setIsZoomed(false)}
            className="absolute top-6 right-6 h-11 w-11 flex items-center justify-center text-text-primary hover:text-text-secondary transition-colors duration-normal"
            aria-label="Close zoom"
          >
            <X className="w-8 h-8" />
          </button>

          {/* Navigation in zoom mode */}
          {images.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  goToPrevious()
                }}
                className="absolute left-6 top-1/2 -translate-y-1/2 h-12 w-12 flex items-center justify-center bg-bg-secondary/80 rounded-md
                           text-text-primary transition-colors duration-normal hover:bg-bg-tertiary"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-8 h-8" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  goToNext()
                }}
                className="absolute right-6 top-1/2 -translate-y-1/2 h-12 w-12 flex items-center justify-center bg-bg-secondary/80 rounded-md
                           text-text-primary transition-colors duration-normal hover:bg-bg-tertiary"
                aria-label="Next image"
              >
                <ChevronRight className="w-8 h-8" />
              </button>
            </>
          )}

          <div className="relative w-full h-full max-w-6xl max-h-[90vh] m-6">
            <Image
              src={activeImage.url}
              alt={activeImage.alt}
              fill
              className="object-contain"
              sizes="100vw"
            />
          </div>

          {/* Image counter in zoom */}
          {images.length > 1 && (
            <div className="tag absolute bottom-6 left-1/2 -translate-x-1/2">
              {activeIndex + 1} / {images.length}
            </div>
          )}
        </div>
      )}
    </>
  )
}
