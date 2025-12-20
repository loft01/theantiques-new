'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { Search, X, Loader2, ArrowRight } from 'lucide-react'
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

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  // Focus input when modal opens
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

  // Close on Escape
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

  // Debounced search
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

  // Keyboard navigation
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
    <div className="fixed inset-0 z-modal">
      {/* Overlay - dark for readability */}
      <div
        className="absolute inset-0 bg-black/85 backdrop-blur-sm animate-in fade-in duration-normal"
        onClick={onClose}
      />

      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 z-10 w-11 h-11 flex items-center justify-center rounded-md bg-bg-secondary/80 text-text-secondary transition-colors duration-normal hover:text-text-primary hover:bg-bg-tertiary"
        aria-label="Close search"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Modal content - vertically centered */}
      <div className="relative h-full flex items-center justify-center px-6 py-12 overflow-y-auto">
        <div className="w-full max-w-2xl my-auto animate-in fade-in slide-in-from-top-4 duration-slow">
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search for antiques..."
              className="w-full h-14 pl-14 pr-14 bg-bg-secondary border border-border-default rounded-lg text-body text-text-primary placeholder:text-text-secondary shadow-lg focus:outline-none focus:border-border-subtle transition-colors duration-normal"
              autoComplete="off"
            />
            {isLoading ? (
              <Loader2 className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary animate-spin" />
            ) : query ? (
              <button
                onClick={() => setQuery('')}
                className="absolute right-5 top-1/2 -translate-y-1/2 p-1 text-text-secondary transition-colors duration-normal hover:text-text-primary"
              >
                <X className="w-5 h-5" />
              </button>
            ) : null}
          </div>

          {/* Results - card style with border */}
          {query && (
            <div className="mt-4 bg-bg-secondary border border-border-default rounded-lg overflow-hidden shadow-lg max-h-[60vh] overflow-y-auto">
              {results.length > 0 ? (
                <>
                  <div className="divide-y divide-border-default">
                    {results.slice(0, 5).map((result, index) => (
                      <button
                        key={result.slug}
                        onClick={() => handleResultClick(result.slug)}
                        className={`w-full flex items-center gap-4 p-4 text-left transition-colors duration-normal ${
                          selectedIndex === index
                            ? 'bg-bg-tertiary'
                            : 'hover:bg-bg-tertiary'
                        }`}
                      >
                        {/* Thumbnail - 40px per list item pattern */}
                        <div className="relative w-10 h-10 rounded-md overflow-hidden bg-bg-tertiary flex-shrink-0">
                          <Image
                            src={result.image.url}
                            alt={result.image.alt}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-body-medium text-text-primary truncate">
                            {result.title}
                          </h4>
                          <p className="text-small text-text-secondary">{result.category}</p>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <p className="text-body-bold text-text-primary">
                            ${result.price.toLocaleString()}
                          </p>
                          <StatusBadge status={result.status} />
                        </div>
                      </button>
                    ))}
                  </div>

                  {/* View all results */}
                  <button
                    onClick={handleViewAll}
                    className="w-full flex items-center justify-center gap-2 p-4 bg-bg-tertiary text-text-secondary transition-colors duration-normal hover:text-text-primary border-t border-border-default"
                  >
                    <span className="text-caption-medium">View all results for &ldquo;{query}&rdquo;</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </>
              ) : !isLoading ? (
                <div className="p-8 text-center">
                  <p className="text-body text-text-secondary">No results found for &ldquo;{query}&rdquo;</p>
                  <p className="text-small text-text-tertiary mt-1">Try different keywords</p>
                </div>
              ) : null}
            </div>
          )}

          {/* Quick links when empty */}
          {!query && (
            <div className="mt-6">
              <p className="text-small text-text-tertiary mb-3">Popular categories</p>
              <div className="flex flex-wrap gap-2">
                {['Furniture', 'Ceramics', 'Fine Art', 'Jewelry'].map((cat) => (
                  <Link
                    key={cat}
                    href={`/categories/${cat.toLowerCase().replace(' ', '-')}`}
                    onClick={onClose}
                    className="tag transition-colors duration-normal hover:text-text-primary"
                  >
                    {cat}
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

function StatusBadge({ status }: { status: 'available' | 'pending' | 'sold' }) {
  const config = {
    available: 'badge-available',
    pending: 'badge-pending',
    sold: 'badge-sold',
  }
  const labels = { available: 'Available', pending: 'Pending', sold: 'Sold' }

  return (
    <span className={`badge text-[10px] px-2 py-0.5 ${config[status]}`}>
      {labels[status]}
    </span>
  )
}
