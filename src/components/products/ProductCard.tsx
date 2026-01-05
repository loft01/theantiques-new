'use client'

import Image from 'next/image'
import Link from 'next/link'

type ProductStatus = 'available' | 'pending' | 'sold'

interface ProductCardProps {
  slug: string
  title: string
  price: number
  status: ProductStatus
  category?: string
  image: {
    url: string
    alt: string
  }
  isNew?: boolean
}

export function ProductCard({
  slug,
  title,
  price,
  status,
  image,
  isNew = false,
}: ProductCardProps) {
  const formattedPrice = `€${price.toLocaleString('it-IT', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`

  return (
    <article className="product-card">
      <Link href={`/products/${slug}`} className="block">
        {/* Image container */}
        <div className="product-card-image">
          <Image
            src={image.url}
            alt={image.alt}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        </div>

        {/* Product info */}
        <div className="product-card-info">
          <div className="product-card-header">
            <h3 className="product-card-title">{title}</h3>
            {isNew && (
              <span className="product-card-badge">Nuovo</span>
            )}
          </div>
          <p className="product-card-price">{formattedPrice}</p>
        </div>
      </Link>
    </article>
  )
}
