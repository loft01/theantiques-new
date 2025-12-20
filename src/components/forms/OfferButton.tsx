'use client'

import { useState } from 'react'
import { Send } from 'lucide-react'
import { OfferModal } from './OfferModal'

interface OfferButtonProps {
  productSlug: string
  productTitle: string
  productPrice: number
  disabled?: boolean
}

export function OfferButton({ productSlug, productTitle, productPrice, disabled }: OfferButtonProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        disabled={disabled}
        className="btn-primary flex-1 flex items-center justify-center gap-2"
      >
        <Send className="w-5 h-5" />
        Make an Offer
      </button>

      <OfferModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        productSlug={productSlug}
        productTitle={productTitle}
        productPrice={productPrice}
      />
    </>
  )
}
