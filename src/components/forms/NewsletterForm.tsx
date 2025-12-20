'use client'

import { useState } from 'react'
import { Send, Loader2, CheckCircle, AlertCircle } from 'lucide-react'

type FormStatus = 'idle' | 'loading' | 'success' | 'error'

export function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<FormStatus>('idle')
  const [message, setMessage] = useState('')

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

      const data = await res.json()

      if (res.ok) {
        setStatus('success')
        setMessage('Thanks for subscribing!')
        setEmail('')
      } else {
        setStatus('error')
        setMessage(data.error || 'Something went wrong')
      }
    } catch {
      setStatus('error')
      setMessage('Failed to subscribe. Please try again.')
    }

    setTimeout(() => {
      setStatus('idle')
      setMessage('')
    }, 4000)
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            disabled={status === 'loading'}
            className="w-full px-5 py-4 bg-zinc-800 border border-zinc-700 rounded-full
                       text-white placeholder:text-zinc-500
                       focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500
                       disabled:opacity-50 transition-all"
          />
        </div>
        <button
          type="submit"
          disabled={status === 'loading' || !email}
          className="px-8 py-4 bg-amber-600 text-white rounded-full font-medium
                     hover:bg-amber-500 disabled:opacity-50 disabled:hover:bg-amber-600
                     transition-all flex items-center justify-center gap-2 min-w-[140px]"
        >
          {status === 'loading' ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <>
              Subscribe
              <Send className="w-4 h-4" />
            </>
          )}
        </button>
      </div>

      {/* Status message */}
      {message && (
        <div
          className={`mt-4 flex items-center justify-center gap-2 text-sm ${
            status === 'success' ? 'text-emerald-400' : 'text-red-400'
          }`}
        >
          {status === 'success' ? (
            <CheckCircle className="w-4 h-4" />
          ) : (
            <AlertCircle className="w-4 h-4" />
          )}
          {message}
        </div>
      )}
    </form>
  )
}
