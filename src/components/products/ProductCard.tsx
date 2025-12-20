'use client'

import Image from 'next/image'
import Link from 'next/link'
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
    className: 'badge-available',
  },
  pending: {
    label: 'Pending',
    className: 'badge-pending',
  },
  sold: {
    label: 'Sold',
    className: 'badge-sold',
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
    <article className="group">
      <Link href={`/products/${slug}`} className="block">
        <div
          className={cn(
            'bg-bg-secondary border border-border-default rounded-lg overflow-hidden',
            'transition-all duration-normal',
            'hover:border-border-subtle hover:-translate-y-0.5'
          )}
        >
          {/* Image container - 1:1 aspect ratio per rulebook */}
          <div className="relative aspect-square overflow-hidden bg-bg-tertiary">
            <Image
              src={image.url}
              alt={image.alt}
              fill
              className="object-cover transition-transform duration-slow group-hover:scale-[1.02]"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />

            {/* Status badge - top left per rulebook */}
            <div className={cn('badge absolute left-3 top-3', statusInfo.className)}>
              {statusInfo.label}
            </div>
          </div>

          {/* Content - 16px padding per rulebook */}
          <div className="p-4">
            {/* Category - small text, secondary color */}
            <p className="text-small text-text-secondary mb-1">{category}</p>

            {/* Title - title-3 equivalent, max 2 lines */}
            <h3 className="text-body-medium text-text-primary line-clamp-2 mb-2">
              {title}
            </h3>

            {/* Price - body-bold, primary color (NOT amber) */}
            <p className="text-body-bold text-text-primary">
              {priceLabel === 'offer' ? 'Make an Offer' : `${pricePrefix}${formattedPrice}`}
            </p>
          </div>
        </div>
      </Link>
    </article>
  )
}
