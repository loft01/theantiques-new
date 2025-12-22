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

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && status !== 'loading') {
        handleClose()
      }
    }
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown)
    }
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, status])

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

  const formattedPrice = new Intl.NumberFormat('it-IT', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
  }).format(productPrice)

  return (
    <div className="fixed inset-0 z-modal flex items-center justify-center p-6">
      {/* Overlay - 50% opacity per rulebook */}
      <div
        className="absolute inset-0 bg-black/50 animate-in fade-in duration-normal"
        onClick={handleClose}
      />

      {/* Modal - 24px radius per rulebook */}
      <div className="relative w-full max-w-lg bg-bg-secondary border border-border-default rounded-2xl shadow-lg animate-in zoom-in-95 fade-in duration-slow">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border-default">
          <h2 className="text-title-2 text-text-primary">Fai un'Offerta</h2>
          <button
            onClick={handleClose}
            className="p-2 text-text-secondary transition-colors duration-normal hover:text-text-primary rounded-md hover:bg-bg-tertiary"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {status === 'success' ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-success-muted flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-success" />
              </div>
              <h3 className="text-title-2 text-text-primary mb-2">Offerta Inviata!</h3>
              <p className="text-caption text-text-secondary mb-6">
                Grazie per il tuo interesse. Esamineremo la tua offerta e ti risponderemo al più presto.
              </p>
              <button onClick={handleClose} className="btn-primary w-full">
                Chiudi
              </button>
            </div>
          ) : (
            <>
              {/* Product info */}
              <div className="bg-bg-tertiary rounded-lg p-4 mb-6">
                <p className="text-small text-text-secondary mb-1">Stai facendo un'offerta per:</p>
                <p className="text-body-medium text-text-primary line-clamp-2">{productTitle}</p>
                <p className="text-body-bold text-text-primary mt-1">Prezzo: {formattedPrice}</p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-caption-medium text-text-secondary mb-2">
                      Nome *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="input"
                      placeholder="Il tuo nome"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-caption-medium text-text-secondary mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="input"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="phone" className="block text-caption-medium text-text-secondary mb-2">
                      Telefono
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="input"
                      placeholder="(opzionale)"
                    />
                  </div>
                  <div>
                    <label htmlFor="offerAmount" className="block text-caption-medium text-text-secondary mb-2">
                      La Tua Offerta (EUR)
                    </label>
                    <input
                      type="number"
                      id="offerAmount"
                      name="offerAmount"
                      value={formData.offerAmount}
                      onChange={handleChange}
                      min="0"
                      step="1"
                      className="input"
                      placeholder="(opzionale)"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-caption-medium text-text-secondary mb-2">
                    Messaggio *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="input min-h-[120px] py-4 resize-none"
                    placeholder="Raccontaci del tuo interesse per questo pezzo..."
                  />
                </div>

                {/* Error message */}
                {status === 'error' && (
                  <div className="flex items-center gap-2 text-error text-small">
                    <AlertCircle className="w-4 h-4" />
                    {errorMessage}
                  </div>
                )}

                {/* Submit button - 56px height, pill shape per rulebook */}
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="btn-primary w-full flex items-center justify-center gap-2"
                >
                  {status === 'loading' ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Invio in corso...
                    </>
                  ) : (
                    'Invia Offerta'
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
