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
        {/* Main image */}
        <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-zinc-800 group">
          <Image
            src={activeImage.url}
            alt={activeImage.alt}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
          />

          {/* Zoom button */}
          <button
            onClick={() => setIsZoomed(true)}
            className="absolute right-4 top-4 p-3 bg-zinc-900/70 rounded-full text-white
                       opacity-0 group-hover:opacity-100 transition-opacity hover:bg-zinc-900"
            aria-label="Zoom image"
          >
            <ZoomIn className="w-5 h-5" />
          </button>

          {/* Navigation arrows */}
          {images.length > 1 && (
            <>
              <button
                onClick={goToPrevious}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-zinc-900/70 rounded-full
                           text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-zinc-900"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={goToNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-zinc-900/70 rounded-full
                           text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-zinc-900"
                aria-label="Next image"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}

          {/* Image counter */}
          {images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1 bg-zinc-900/70 rounded-full text-sm text-white">
              {activeIndex + 1} / {images.length}
            </div>
          )}
        </div>

        {/* Thumbnails */}
        {images.length > 1 && (
          <div className="flex gap-3 overflow-x-auto pb-2">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={cn(
                  'relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden transition-all',
                  index === activeIndex
                    ? 'ring-2 ring-amber-500'
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

      {/* Zoom Modal */}
      {isZoomed && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          onClick={() => setIsZoomed(false)}
        >
          <button
            onClick={() => setIsZoomed(false)}
            className="absolute top-6 right-6 p-3 text-white hover:text-amber-500 transition-colors"
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
                className="absolute left-6 top-1/2 -translate-y-1/2 p-3 bg-zinc-800/80 rounded-full
                           text-white hover:bg-zinc-700 transition-colors"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-8 h-8" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  goToNext()
                }}
                className="absolute right-6 top-1/2 -translate-y-1/2 p-3 bg-zinc-800/80 rounded-full
                           text-white hover:bg-zinc-700 transition-colors"
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
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-4 py-2 bg-zinc-800/80 rounded-full text-white">
              {activeIndex + 1} / {images.length}
            </div>
          )}
        </div>
      )}
    </>
  )
}
