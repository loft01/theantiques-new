'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Search, X } from 'lucide-react'

interface SearchBarProps {
  variant?: 'header' | 'page'
  defaultValue?: string
  autoFocus?: boolean
  onClose?: () => void
}

export function SearchBar({ variant = 'header', defaultValue = '', autoFocus = false, onClose }: SearchBarProps) {
  const [query, setQuery] = useState(defaultValue)
  const [isExpanded, setIsExpanded] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  useEffect(() => {
    if ((isExpanded || autoFocus) && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isExpanded, autoFocus])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`)
      setIsExpanded(false)
      onClose?.()
    }
  }

  const handleExpand = () => {
    setIsExpanded(true)
  }

  const handleClose = () => {
    setIsExpanded(false)
    setQuery('')
    onClose?.()
  }

  // Page variant - full width search input
  if (variant === 'page') {
    return (
      <form onSubmit={handleSubmit} className="relative w-full">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for antiques..."
          className="w-full px-5 py-4 pl-14 bg-zinc-900 border border-zinc-800 rounded-lg text-white placeholder:text-zinc-500 focus:outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-600 transition-colors"
        />
        <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
        {query && (
          <button
            type="button"
            onClick={() => setQuery('')}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-zinc-500 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </form>
    )
  }

  // Header variant - expandable search
  return (
    <div className="relative">
      {!isExpanded ? (
        <button
          onClick={handleExpand}
          className="p-2 text-zinc-400 hover:text-white transition-colors"
          aria-label="Open search"
        >
          <Search className="w-5 h-5" />
        </button>
      ) : (
        <form onSubmit={handleSubmit} className="flex items-center">
          <div className="relative">
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search..."
              className="w-48 md:w-64 px-4 py-2 pl-10 bg-zinc-900 border border-zinc-700 rounded-lg text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-amber-600 transition-colors"
              onBlur={() => {
                if (!query) {
                  setTimeout(() => setIsExpanded(false), 150)
                }
              }}
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="ml-2 p-2 text-zinc-400 hover:text-white transition-colors"
            aria-label="Close search"
          >
            <X className="w-5 h-5" />
          </button>
        </form>
      )}
    </div>
  )
}
