'use client'

import { useState } from 'react'
import { ArrowRight } from 'lucide-react'
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
        className="btn-pill-filled disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {disabled ? 'Venduto' : 'Richiedi Info'}
        <ArrowRight className="w-4 h-4" />
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
