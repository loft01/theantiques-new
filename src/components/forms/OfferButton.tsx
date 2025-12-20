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
        className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-amber-600 text-white
                   rounded-full font-medium hover:bg-amber-500 disabled:opacity-50
                   disabled:cursor-not-allowed transition-colors"
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
