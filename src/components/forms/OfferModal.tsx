'use client'

import { useState, useEffect } from 'react'
import { X, Loader2, CheckCircle, AlertCircle } from 'lucide-react'

interface OfferModalProps {
  isOpen: boolean
  onClose: () => void
  productSlug: string
  productTitle: string
  productPrice: number
}

type FormStatus = 'idle' | 'loading' | 'success' | 'error'

interface FormData {
  name: string
  email: string
  phone: string
  offerAmount: string
  message: string
}

export function OfferModal({ isOpen, onClose, productSlug, productTitle, productPrice }: OfferModalProps) {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    offerAmount: '',
    message: '',
  })
  const [status, setStatus] = useState<FormStatus>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMessage('')

    try {
      const res = await fetch('/api/offers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productSlug,
          ...formData,
          offerAmount: formData.offerAmount ? parseFloat(formData.offerAmount) : undefined,
        }),
      })

      const data = await res.json()

      if (res.ok) {
        setStatus('success')
        setFormData({ name: '', email: '', phone: '', offerAmount: '', message: '' })
      } else {
        setStatus('error')
        setErrorMessage(data.error || 'Failed to submit offer')
      }
    } catch {
      setStatus('error')
      setErrorMessage('Something went wrong. Please try again.')
    }
  }

  const handleClose = () => {
    if (status !== 'loading') {
      setStatus('idle')
      setErrorMessage('')
      onClose()
    }
  }

  if (!isOpen) return null

  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  }).format(productPrice)

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-lg bg-zinc-900 rounded-2xl shadow-2xl border border-zinc-800">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-zinc-800">
          <h2 className="text-xl font-semibold">Make an Offer</h2>
          <button
            onClick={handleClose}
            className="p-2 text-zinc-400 hover:text-white transition-colors rounded-full hover:bg-zinc-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {status === 'success' ? (
            <div className="text-center py-8">
              <CheckCircle className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Offer Submitted!</h3>
              <p className="text-zinc-400 mb-6">
                Thank you for your interest. We'll review your offer and get back to you soon.
              </p>
              <button
                onClick={handleClose}
                className="px-8 py-3 bg-amber-600 text-white rounded-full font-medium hover:bg-amber-500 transition-colors"
              >
                Close
              </button>
            </div>
          ) : (
            <>
              {/* Product info */}
              <div className="bg-zinc-800/50 rounded-lg p-4 mb-6">
                <p className="text-sm text-zinc-400 mb-1">You're making an offer for:</p>
                <p className="font-medium line-clamp-2">{productTitle}</p>
                <p className="text-amber-500 font-medium mt-1">Listed at {formattedPrice}</p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-zinc-400 mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg
                                 text-white placeholder:text-zinc-500
                                 focus:outline-none focus:border-amber-500 transition-colors"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-zinc-400 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg
                                 text-white placeholder:text-zinc-500
                                 focus:outline-none focus:border-amber-500 transition-colors"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-zinc-400 mb-2">
                      Phone
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg
                                 text-white placeholder:text-zinc-500
                                 focus:outline-none focus:border-amber-500 transition-colors"
                      placeholder="(optional)"
                    />
                  </div>
                  <div>
                    <label htmlFor="offerAmount" className="block text-sm font-medium text-zinc-400 mb-2">
                      Your Offer (USD)
                    </label>
                    <input
                      type="number"
                      id="offerAmount"
                      name="offerAmount"
                      value={formData.offerAmount}
                      onChange={handleChange}
                      min="0"
                      step="1"
                      className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg
                                 text-white placeholder:text-zinc-500
                                 focus:outline-none focus:border-amber-500 transition-colors"
                      placeholder="(optional)"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-zinc-400 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg
                               text-white placeholder:text-zinc-500 resize-none
                               focus:outline-none focus:border-amber-500 transition-colors"
                    placeholder="Tell us about your interest in this piece..."
                  />
                </div>

                {/* Error message */}
                {status === 'error' && (
                  <div className="flex items-center gap-2 text-red-400 text-sm">
                    <AlertCircle className="w-4 h-4" />
                    {errorMessage}
                  </div>
                )}

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full py-4 bg-amber-600 text-white rounded-full font-medium
                             hover:bg-amber-500 disabled:opacity-50 transition-colors
                             flex items-center justify-center gap-2"
                >
                  {status === 'loading' ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    'Submit Offer'
                  )}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
