import { ProductCard } from './ProductCard'

type ProductStatus = 'available' | 'pending' | 'sold'

interface Product {
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

interface ProductGridProps {
  products: Product[]
  columns?: 2 | 3 | 4
}

export function ProductGrid({ products, columns = 4 }: ProductGridProps) {
  const gridCols = {
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
  }

  return (
    <div className={`grid ${gridCols[columns]} gap-6`}>
      {products.map((product) => (
        <ProductCard key={product.slug} {...product} />
      ))}
    </div>
  )
}
