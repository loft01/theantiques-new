import Image from 'next/image'
import Link from 'next/link'

interface CategoryCardProps {
  slug: string
  name: string
  image?: {
    url: string
    alt: string
  }
  productCount?: number
}

export function CategoryCard({ slug, name, image, productCount }: CategoryCardProps) {
  return (
    <Link
      href={`/categories/${slug}`}
      className="group relative block aspect-square overflow-hidden bg-bg-secondary border border-border-default transition-all duration-normal hover:border-border-subtle hover:-translate-y-0.5"
    >
      {image ? (
        <Image
          src={image.url}
          alt={image.alt}
          fill
          draggable={false}
          className="object-cover transition-transform duration-slow group-hover:scale-[1.03] pointer-events-none"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-bg-tertiary to-bg-secondary" />
      )}

      {/* Gradient overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

      {/* Content - bottom aligned, centered */}
      <div className="absolute inset-0 flex flex-col items-center justify-end p-4 text-center">
        <h3 className="text-title-3 text-text-primary mb-1">
          {name}
        </h3>
        {productCount !== undefined && (
          <p className="text-small text-text-secondary">
            {productCount} {productCount === 1 ? 'item' : 'items'}
          </p>
        )}
      </div>
    </Link>
  )
}
