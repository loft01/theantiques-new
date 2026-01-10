'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { useState } from 'react'

export function Footer() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setStatus('loading')
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      if (res.ok) {
        setStatus('success')
        setEmail('')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <footer className="relative bg-bg-primary border-t border-border-primary">
      {/* Main Footer Content */}
      <div className="container-editorial py-16 md:py-20">
        {/* Top Section - Brand and Newsletter */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-10 mb-16 pb-12 border-b border-border-primary">
          {/* Brand */}
          <div className="max-w-md">
            <Link href="/" className="inline-block mb-4">
              <span className="text-2xl font-semibold tracking-tight text-text-primary">
                The Antiques
              </span>
            </Link>
            <p className="text-body text-text-secondary leading-relaxed">
              Antiquariato italiano di pregio. Dal 1985 selezioniamo con cura mobili,
              oggetti d'arte e pezzi unici per collezionisti e amanti del bello.
            </p>
          </div>

          {/* Newsletter */}
          <div className="lg:max-w-sm w-full">
            <h3 className="text-label-nav text-text-secondary mb-4">Newsletter</h3>
            <p className="text-small text-text-tertiary mb-4">
              Ricevi in anteprima i nuovi arrivi e le offerte esclusive.
            </p>
            <form onSubmit={handleSubmit} className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="La tua email"
                className="flex-1 h-11 px-4 bg-transparent text-sm text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] border border-[var(--border-secondary)] focus:border-[var(--text-primary)] focus:outline-none transition-colors"
                disabled={status === 'loading'}
              />
              <button
                type="submit"
                className="h-11 w-11 flex items-center justify-center bg-[var(--text-primary)] text-[var(--bg-primary)] hover:bg-[var(--text-secondary)] transition-colors disabled:opacity-50"
                disabled={status === 'loading'}
                aria-label="Iscriviti"
              >
                <ArrowRight className="w-5 h-5" />
              </button>
            </form>
            {status === 'success' && (
              <p className="text-small text-green-500 mt-2">Grazie per l'iscrizione!</p>
            )}
            {status === 'error' && (
              <p className="text-small text-red-500 mt-2">Errore. Riprova.</p>
            )}
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {/* Menu */}
          <div>
            <h3 className="text-label-nav text-text-secondary mb-5">Menu</h3>
            <nav className="flex flex-col gap-3">
              <Link href="/" className="text-body text-text-primary hover:text-text-secondary transition-colors">
                Home
              </Link>
              <Link href="/catalogo" className="text-body text-text-primary hover:text-text-secondary transition-colors">
                Catalogo
              </Link>
              <Link href="/about" className="text-body text-text-primary hover:text-text-secondary transition-colors">
                Chi Siamo
              </Link>
              <Link href="/servizi" className="text-body text-text-primary hover:text-text-secondary transition-colors">
                Servizi
              </Link>
              <Link href="/contact" className="text-body text-text-primary hover:text-text-secondary transition-colors">
                Contatti
              </Link>
            </nav>
          </div>

          {/* Categorie */}
          <div>
            <h3 className="text-label-nav text-text-secondary mb-5">Categorie</h3>
            <nav className="flex flex-col gap-3">
              <Link href="/catalogo?category=mobili" className="text-body text-text-primary hover:text-text-secondary transition-colors">
                Mobili
              </Link>
              <Link href="/catalogo?category=illuminazione" className="text-body text-text-primary hover:text-text-secondary transition-colors">
                Illuminazione
              </Link>
              <Link href="/catalogo?category=oggettistica" className="text-body text-text-primary hover:text-text-secondary transition-colors">
                Oggettistica
              </Link>
              <Link href="/catalogo?category=arte" className="text-body text-text-primary hover:text-text-secondary transition-colors">
                Arte
              </Link>
              <Link href="/catalogo?category=specchi" className="text-body text-text-primary hover:text-text-secondary transition-colors">
                Specchi
              </Link>
            </nav>
          </div>

          {/* Informazioni */}
          <div>
            <h3 className="text-label-nav text-text-secondary mb-5">Informazioni</h3>
            <nav className="flex flex-col gap-3">
              <Link href="/shipping" className="text-body text-text-primary hover:text-text-secondary transition-colors">
                Spedizioni e Resi
              </Link>
              <Link href="/terms" className="text-body text-text-primary hover:text-text-secondary transition-colors">
                Termini e Condizioni
              </Link>
              <Link href="/privacy" className="text-body text-text-primary hover:text-text-secondary transition-colors">
                Privacy Policy
              </Link>
              <Link href="/cookies" className="text-body text-text-primary hover:text-text-secondary transition-colors">
                Cookie Policy
              </Link>
            </nav>
          </div>

          {/* Contatti */}
          <div>
            <h3 className="text-label-nav text-text-secondary mb-5">Contatti</h3>
            <div className="flex flex-col gap-3">
              <a href="tel:+390123456789" className="text-body text-text-primary hover:text-text-secondary transition-colors">
                +39 012 345 6789
              </a>
              <a href="mailto:info@theantiques.it" className="text-body text-text-primary hover:text-text-secondary transition-colors">
                info@theantiques.it
              </a>
              <p className="text-body text-text-tertiary">
                Via Roma 123<br />
                20121 Milano, Italia
              </p>
              <div className="flex gap-4 mt-2">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-body text-text-primary hover:text-text-secondary transition-colors"
                  aria-label="Instagram"
                >
                  Instagram
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-body text-text-primary hover:text-text-secondary transition-colors"
                  aria-label="Facebook"
                >
                  Facebook
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Large Watermark Logo */}
      <div
        className="relative pointer-events-none select-none overflow-hidden h-[18vh] md:h-[22vh]"
        aria-hidden="true"
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full flex justify-center">
          <span
            className="text-[12vw] font-bold tracking-[-0.04em] whitespace-nowrap uppercase"
            style={{
              lineHeight: '1',
              background: 'linear-gradient(to bottom, rgba(70, 70, 70, 0.7) 0%, rgba(50, 50, 50, 0.4) 40%, rgba(30, 30, 30, 0.15) 80%, transparent 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            THE ANTIQUES
          </span>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border-primary">
        <div className="container-editorial py-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <p className="text-small text-text-tertiary">
            &copy; {new Date().getFullYear()} The Antiques. Tutti i diritti riservati.
          </p>
          <p className="text-small text-text-tertiary">
            P.IVA 01234567890
          </p>
        </div>
      </div>
    </footer>
  )
}
