import Image from 'next/image'
import Link from 'next/link'

interface LifestyleCard {
  title: string
  subtitle?: string
  image: {
    url: string
    alt: string
  }
  link: string
  size: 'large' | 'medium' | 'small'
}

interface LifestyleGridProps {
  cards: LifestyleCard[]
}

const demoCards: LifestyleCard[] = [
  {
    title: 'Living Spaces',
    subtitle: 'Curated comfort',
    image: { url: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&h=600&fit=crop', alt: 'Living room' },
    link: '/categories/furniture',
    size: 'large',
  },
  {
    title: 'Illuminate',
    subtitle: 'Light & shadow',
    image: { url: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=600&h=600&fit=crop', alt: 'Lighting' },
    link: '/categories/lighting',
    size: 'medium',
  },
  {
    title: 'Artful Details',
    image: { url: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=600&h=400&fit=crop', alt: 'Art' },
    link: '/categories/art',
    size: 'small',
  },
  {
    title: 'Timeless Elegance',
    image: { url: 'https://images.unsplash.com/photo-1618220179428-22790b461013?w=600&h=400&fit=crop', alt: 'Decorative' },
    link: '/categories/decorative',
    size: 'small',
  },
]

export function LifestyleGrid({ cards = demoCards }: LifestyleGridProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[200px] md:auto-rows-[250px]">
      {cards.map((card, index) => {
        const spanClass = {
          large: 'col-span-2 row-span-2',
          medium: 'col-span-2 md:col-span-2 row-span-2',
          small: 'col-span-1 row-span-1',
        }[card.size]

        return (
          <Link
            key={index}
            href={card.link}
            className={`group relative overflow-hidden rounded-xl ${spanClass}`}
          >
            <Image
              src={card.image.url}
              alt={card.image.alt}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              sizes={card.size === 'large' ? '50vw' : '25vw'}
            />

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

            {/* Content */}
            <div className="absolute inset-0 flex flex-col justify-end p-6">
              <h3 className="text-xl md:text-2xl font-semibold text-white mb-1 group-hover:text-amber-500 transition-colors">
                {card.title}
              </h3>
              {card.subtitle && (
                <p className="text-sm text-zinc-300">{card.subtitle}</p>
              )}
            </div>

            {/* Hover border effect */}
            <div className="absolute inset-0 border-2 border-transparent group-hover:border-amber-500/50 rounded-xl transition-colors duration-300" />
          </Link>
        )
      })}
    </div>
  )
}
