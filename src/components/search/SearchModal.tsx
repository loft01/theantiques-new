'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { Search, X, ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

interface SearchResult {
  slug: string
  title: string
  price: number
  category: string
  categorySlug: string
  status: 'available' | 'pending' | 'sold'
  image: { url: string; alt: string }
}

interface Category {
  slug: string
  name: string
}

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
  categories?: Category[]
}

export function SearchModal({ isOpen, onClose, categories = [] }: SearchModalProps) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
    if (!isOpen) {
      setQuery('')
      setResults([])
      setSelectedIndex(-1)
    }
  }, [isOpen])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  useEffect(() => {
    if (!query.trim()) {
      setResults([])
      setSelectedIndex(-1)
      return
    }

    const timer = setTimeout(async () => {
      setIsLoading(true)
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`)
        const data = await res.json()
        setResults(data.results || [])
        setSelectedIndex(-1)
      } catch (error) {
        console.error('Search error:', error)
        setResults([])
      } finally {
        setIsLoading(false)
      }
    }, 300)

    return () => clearTimeout(timer)
  }, [query])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setSelectedIndex((prev) => (prev < results.length - 1 ? prev + 1 : prev))
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1))
      } else if (e.key === 'Enter') {
        e.preventDefault()
        if (selectedIndex >= 0 && results[selectedIndex]) {
          router.push(`/products/${results[selectedIndex].slug}`)
          onClose()
        } else if (query.trim()) {
          router.push(`/search?q=${encodeURIComponent(query)}`)
          onClose()
        }
      }
    },
    [results, selectedIndex, query, router, onClose]
  )

  const handleResultClick = (slug: string) => {
    router.push(`/products/${slug}`)
    onClose()
  }

  const handleViewAll = () => {
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`)
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-modal bg-bg-primary">
      {/* Header */}
      <div className="flex items-center justify-between h-14 px-6 border-b-2 border-border-primary">
        <span className="text-caption text-text-tertiary">Ricerca</span>
        <button
          onClick={onClose}
          className="nav-link"
        >
          Chiudi
        </button>
      </div>

      {/* Search Content */}
      <div className="h-[calc(100vh-56px)] overflow-y-auto">
        <div className="container-editorial py-12">
          {/* Search Input */}
          <div className="relative max-w-2xl mx-auto mb-12">
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Cosa stai cercando?"
              className="w-full h-14 px-0 bg-transparent border-0 border-b-2 border-border-primary text-manifesto text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-text-primary transition-colors"
              autoComplete="off"
            />
            {isLoading && (
              <span className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-text-primary rounded-full animate-ping" />
            )}
          </div>

          {/* Results */}
          {query && results.length > 0 && (
            <div className="max-w-2xl mx-auto">
              <p className="text-caption text-text-tertiary mb-6">
                {results.length} risultati
              </p>
              <div className="divide-y divide-border-primary">
                {results.slice(0, 6).map((result, index) => (
                  <button
                    key={result.slug}
                    onClick={() => handleResultClick(result.slug)}
                    className={`w-full flex items-center gap-6 py-4 text-left transition-opacity hover:opacity-70 ${
                      selectedIndex === index ? 'opacity-70' : ''
                    }`}
                  >
                    <div className="relative w-16 h-16 bg-bg-tertiary flex-shrink-0">
                      <Image
                        src={result.image.url}
                        alt={result.image.alt}
                        fill
                        className="object-contain p-2"
                        sizes="64px"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-body-medium text-text-primary truncate">
                        {result.title}
                      </h4>
                      <p className="text-caption text-text-tertiary">{result.category}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-body text-text-secondary">
                        €{result.price.toLocaleString('it-IT')}
                      </p>
                    </div>
                  </button>
                ))}
              </div>

              {results.length > 6 && (
                <button
                  onClick={handleViewAll}
                  className="link-arrow mt-8"
                >
                  Vedi tutti i risultati
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          )}

          {/* No results */}
          {query && !isLoading && results.length === 0 && (
            <div className="max-w-2xl mx-auto text-center py-12">
              <p className="text-body text-text-secondary">Nessun risultato trovato</p>
              <p className="text-caption text-text-tertiary mt-2">Prova con parole chiave diverse</p>
            </div>
          )}

          {/* Quick links when empty */}
          {!query && categories.length > 0 && (
            <div className="max-w-2xl mx-auto">
              <p className="text-caption text-[var(--text-tertiary)] mb-6">Categorie</p>
              <div className="flex flex-wrap gap-3">
                {categories.map((cat) => (
                  <Link
                    key={cat.slug}
                    href={`/categories/${cat.slug}`}
                    onClick={onClose}
                    className="h-9 px-4 rounded-full text-sm font-medium border border-[var(--border-secondary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--text-primary)] transition-all flex items-center"
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
