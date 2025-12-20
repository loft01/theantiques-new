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
      className="group relative block aspect-square overflow-hidden rounded-lg bg-zinc-800"
    >
      {image ? (
        <Image
          src={image.url}
          alt={image.alt}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-700 to-zinc-800" />
      )}

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-end p-6 text-center">
        <h3 className="text-xl font-semibold text-white mb-1 group-hover:text-amber-500 transition-colors">
          {name}
        </h3>
        {productCount !== undefined && (
          <p className="text-sm text-zinc-400">
            {productCount} {productCount === 1 ? 'item' : 'items'}
          </p>
        )}
      </div>
    </Link>
  )
}
