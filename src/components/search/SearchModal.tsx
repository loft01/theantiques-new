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
    <div className="fixed inset-0 z-[100]">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative flex flex-col items-center pt-[15vh] px-4 animate-in fade-in slide-in-from-top-4 duration-300">
        <div className="w-full max-w-2xl">
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-zinc-400" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search for antiques..."
              className="w-full px-6 py-5 pl-16 pr-14 bg-zinc-900 border border-zinc-700 rounded-2xl text-xl text-white placeholder:text-zinc-500 focus:outline-none focus:border-amber-600 focus:ring-2 focus:ring-amber-600/20 transition-all shadow-2xl"
              autoComplete="off"
            />
            {isLoading ? (
              <Loader2 className="absolute right-5 top-1/2 -translate-y-1/2 w-6 h-6 text-zinc-400 animate-spin" />
            ) : query ? (
              <button
                onClick={() => setQuery('')}
                className="absolute right-5 top-1/2 -translate-y-1/2 p-1 text-zinc-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            ) : null}
          </div>


          {/* Results */}
          {query && (
            <div className="mt-4 bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden shadow-2xl max-h-[50vh] overflow-y-auto">
              {results.length > 0 ? (
                <>
                  <div className="divide-y divide-zinc-800">
                    {results.slice(0, 5).map((result, index) => (
                      <button
                        key={result.slug}
                        onClick={() => handleResultClick(result.slug)}
                        className={`w-full flex items-center gap-4 p-4 text-left transition-colors ${
                          selectedIndex === index
                            ? 'bg-zinc-800'
                            : 'hover:bg-zinc-800/50'
                        }`}
                      >
                        <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-zinc-800 flex-shrink-0">
                          <Image
                            src={result.image.url}
                            alt={result.image.alt}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-white truncate">
                            {result.title}
                          </h4>
                          <p className="text-sm text-zinc-400">{result.category}</p>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <p className="font-medium text-amber-500">
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
                    className="w-full flex items-center justify-center gap-2 p-4 bg-zinc-800/50 text-zinc-300 hover:text-white hover:bg-zinc-800 transition-colors border-t border-zinc-800"
                  >
                    View all results for &ldquo;{query}&rdquo;
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </>
              ) : !isLoading ? (
                <div className="p-8 text-center">
                  <p className="text-zinc-400">No results found for &ldquo;{query}&rdquo;</p>
                  <p className="text-sm text-zinc-500 mt-1">Try different keywords</p>
                </div>
              ) : null}
            </div>
          )}

          {/* Quick links when empty */}
          {!query && (
            <div className="mt-6">
              <p className="text-sm text-zinc-500 mb-3">Popular categories</p>
              <div className="flex flex-wrap gap-2">
                {['Furniture', 'Ceramics', 'Fine Art', 'Jewelry'].map((cat) => (
                  <Link
                    key={cat}
                    href={`/categories/${cat.toLowerCase().replace(' ', '-')}`}
                    onClick={onClose}
                    className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-full text-sm text-zinc-300 hover:text-white transition-colors"
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
  const styles = {
    available: 'bg-emerald-500/20 text-emerald-400',
    pending: 'bg-amber-500/20 text-amber-400',
    sold: 'bg-red-500/20 text-red-400',
  }
  const labels = { available: 'Available', pending: 'Pending', sold: 'Sold' }

  return (
    <span className={`text-xs px-2 py-0.5 rounded ${styles[status]}`}>
      {labels[status]}
    </span>
  )
}
