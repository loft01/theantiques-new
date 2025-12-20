import { NextRequest, NextResponse } from 'next/server'
import { searchProducts, transformProduct } from '@/lib/payload'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get('q') || ''
  const category = searchParams.get('category') || undefined

  if (!query.trim()) {
    return NextResponse.json({ results: [], total: 0 })
  }

  try {
    const { products, totalDocs } = await searchProducts({
      query: query.trim(),
      category,
      limit: 6,
    })

    const results = products.map((product) => {
      const transformed = transformProduct(product)
      return {
        slug: transformed.slug,
        title: transformed.title,
        price: transformed.price,
        category: transformed.category,
        categorySlug: transformed.categorySlug,
        status: transformed.status,
        image: transformed.image,
      }
    })

    return NextResponse.json({ results, total: totalDocs })
  } catch (error) {
    console.error('Search API error:', error)
    return NextResponse.json({ results: [], total: 0, error: 'Search failed' }, { status: 500 })
  }
}
