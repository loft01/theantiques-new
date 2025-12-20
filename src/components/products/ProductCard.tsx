'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Heart } from 'lucide-react'
import { cn } from '@/lib/utils'

type ProductStatus = 'available' | 'pending' | 'sold'

interface ProductCardProps {
  slug: string
  title: string
  price: number
  status: ProductStatus
  category: string
  image: {
    url: string
    alt: string
  }
  priceLabel?: 'asking' | 'starting' | 'estimate' | 'offer'
}

const statusConfig: Record<ProductStatus, { label: string; className: string }> = {
  available: {
    label: 'Available',
    className: 'bg-emerald-500/90 text-white',
  },
  pending: {
    label: 'Pending',
    className: 'bg-amber-500/90 text-white',
  },
  sold: {
    label: 'Sold',
    className: 'bg-red-500/90 text-white',
  },
}

const priceLabelText: Record<string, string> = {
  asking: '',
  starting: 'From ',
  estimate: 'Est. ',
  offer: '',
}

export function ProductCard({
  slug,
  title,
  price,
  status,
  category,
  image,
  priceLabel = 'asking',
}: ProductCardProps) {
  const statusInfo = statusConfig[status]
  const pricePrefix = priceLabelText[priceLabel]

  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price)

  return (
    <article className="group relative">
      <Link href={`/products/${slug}`} className="block">
        <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-zinc-800">
          <Image
            src={image.url}
            alt={image.alt}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />

          {/* Status badge */}
          <div
            className={cn(
              'absolute left-3 top-3 rounded px-2 py-1 text-xs font-medium',
              statusInfo.className
            )}
          >
            {statusInfo.label}
          </div>

          {/* Wishlist button */}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
            }}
            className="absolute right-3 top-3 rounded-full bg-zinc-900/70 p-2 text-zinc-400
                       opacity-0 transition-all duration-200 hover:bg-zinc-900 hover:text-amber-500
                       group-hover:opacity-100"
            aria-label="Add to wishlist"
          >
            <Heart className="h-4 w-4" />
          </button>

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/10" />
        </div>

        {/* Product info */}
        <div className="mt-3 space-y-1">
          <p className="text-sm text-zinc-500">{category}</p>
          <h3 className="font-medium text-zinc-100 line-clamp-2 group-hover:text-amber-500 transition-colors">
            {title}
          </h3>
          <p className="text-amber-500 font-medium">
            {priceLabel === 'offer' ? 'Make an Offer' : `${pricePrefix}${formattedPrice}`}
          </p>
        </div>
      </Link>
    </article>
  )
}
