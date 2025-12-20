'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, ZoomIn, X } from 'lucide-react'
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

  const activeImage = images[activeIndex]

  const goToPrevious = () => {
    setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const goToNext = () => {
    setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  return (
    <>
      <div className="space-y-4">
        {/* Main image - card style per rulebook */}
        <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-bg-secondary border border-border-default group">
          <Image
            src={activeImage.url}
            alt={activeImage.alt}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
          />

          {/* Zoom button - icon button pattern */}
          <button
            onClick={() => setIsZoomed(true)}
            className="absolute right-4 top-4 h-11 w-11 flex items-center justify-center bg-bg-secondary/90 rounded-md text-text-primary
                       opacity-0 group-hover:opacity-100 transition-opacity duration-normal hover:bg-bg-tertiary"
            aria-label="Zoom image"
          >
            <ZoomIn className="w-5 h-5" />
          </button>

          {/* Navigation arrows */}
          {images.length > 1 && (
            <>
              <button
                onClick={goToPrevious}
                className="absolute left-4 top-1/2 -translate-y-1/2 h-11 w-11 flex items-center justify-center bg-bg-secondary/90 rounded-md
                           text-text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-normal hover:bg-bg-tertiary"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={goToNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 h-11 w-11 flex items-center justify-center bg-bg-secondary/90 rounded-md
                           text-text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-normal hover:bg-bg-tertiary"
                aria-label="Next image"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}

          {/* Image counter - tag badge style */}
          {images.length > 1 && (
            <div className="tag absolute bottom-4 left-1/2 -translate-x-1/2">
              {activeIndex + 1} / {images.length}
            </div>
          )}
        </div>

        {/* Thumbnails - 80px per rulebook */}
        {images.length > 1 && (
          <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={cn(
                  'relative flex-shrink-0 w-20 h-20 rounded-md overflow-hidden transition-all duration-normal',
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
