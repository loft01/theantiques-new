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
  isNew?: boolean
}

interface ProductGridProps {
  products: Product[]
}

export function ProductGrid({ products }: ProductGridProps) {
  return (
    <div className="product-grid">
      {products.map((product) => (
        <div key={product.slug} className="product-grid-item">
          <ProductCard {...product} />
        </div>
      ))}
    </div>
  )
}
