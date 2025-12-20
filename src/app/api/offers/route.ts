import { getPayload } from 'payload'
import config from '@payload-config'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { productSlug, name, email, phone, offerAmount, message } = body

    // Validate required fields
    if (!productSlug || !name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      )
    }

    const payload = await getPayload({ config })

    // Find the product by slug
    const productResult = await payload.find({
      collection: 'products',
      where: { slug: { equals: productSlug } },
      limit: 1,
    })

    if (productResult.docs.length === 0) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      )
    }

    const product = productResult.docs[0]

    // Create the offer
    await payload.create({
      collection: 'offers',
      data: {
        product: product.id,
        name,
        email,
        phone: phone || undefined,
        offerAmount: offerAmount || undefined,
        message,
        status: 'new',
      },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Offer submission error:', error)
    return NextResponse.json(
      { error: 'Failed to submit offer' },
      { status: 500 }
    )
  }
}
