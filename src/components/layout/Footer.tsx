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
    <footer className="relative bg-bg-primary">
      {/* Newsletter Bar */}
      <div className="border-t-2 border-b-2 border-border-primary">
        <div className="container-editorial py-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <p className="text-body-medium">
            Iscriviti alla nostra Newsletter e ottieni uno sconto del 10%.
          </p>
          <form onSubmit={handleSubmit} className="flex items-center gap-3 max-w-md w-full md:w-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="La tua E-Mail"
              className="flex-1 h-10 px-5 bg-transparent border border-[var(--border-secondary)] rounded-full text-sm text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] focus:outline-none focus:border-[var(--text-primary)] transition-colors"
              disabled={status === 'loading'}
            />
            <button
              type="submit"
              className="btn-pill-filled whitespace-nowrap"
              disabled={status === 'loading'}
            >
              Iscriviti
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>
        {status === 'success' && (
          <div className="container-editorial pb-4">
            <p className="text-caption text-green-500">Grazie per l'iscrizione!</p>
          </div>
        )}
      </div>

      {/* Main Footer Grid */}
      <div className="container-editorial py-12">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-10">
          {/* Column 1 - Brand Info */}
          <div>
            <p className="text-caption text-text-secondary mb-4">
              &copy; {new Date().getFullYear()} The Antiques
            </p>
            <div className="space-y-2">
              <p className="text-caption text-text-tertiary">Fatto con cura</p>
            </div>
          </div>

          {/* Column 2 - Legal Links */}
          <div>
            <nav className="flex flex-col gap-3">
              <Link
                href="/terms"
                className="text-caption text-text-primary hover:opacity-70 transition-opacity"
              >
                Termini e Condizioni
              </Link>
              <Link
                href="/shipping"
                className="text-caption text-text-primary hover:opacity-70 transition-opacity"
              >
                Spedizioni e Resi
              </Link>
              <Link
                href="/privacy"
                className="text-caption text-text-primary hover:opacity-70 transition-opacity"
              >
                Privacy Policy
              </Link>
            </nav>
          </div>

          {/* Column 3 - Social Links */}
          <div>
            <nav className="flex flex-col gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-caption text-text-primary hover:opacity-70 transition-opacity"
              >
                Instagram
              </a>
              <Link
                href="/about"
                className="text-caption text-text-primary hover:opacity-70 transition-opacity"
              >
                Chi Siamo
              </Link>
              <Link
                href="/contact"
                className="text-caption text-text-primary hover:opacity-70 transition-opacity"
              >
                Contatti
              </Link>
            </nav>
          </div>
        </div>
      </div>

      {/* Large Watermark Logo */}
      <div
        className="relative pointer-events-none select-none overflow-hidden h-[20vh] md:h-[25vh]"
        aria-hidden="true"
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full flex justify-center">
          <span
            className="text-[11vw] font-bold tracking-[-0.04em] whitespace-nowrap uppercase"
            style={{
              lineHeight: '1',
              background: 'linear-gradient(to bottom, rgba(80, 80, 80, 0.9) 0%, rgba(60, 60, 60, 0.6) 30%, rgba(40, 40, 40, 0.3) 70%, transparent 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            THE ANTIQUES
          </span>
        </div>
      </div>

      {/* Copyright */}
      <div className="absolute bottom-6 left-0 right-0 text-center">
        <p className="text-caption text-text-tertiary">
          &copy; {new Date().getFullYear()} The Antiques
        </p>
      </div>
    </footer>
  )
}
