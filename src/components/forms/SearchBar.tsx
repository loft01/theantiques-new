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
          placeholder="Cerca antiquariato..."
          className="input w-full pl-14"
        />
        <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary" />
        {query && (
          <button
            type="button"
            onClick={() => setQuery('')}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-text-secondary transition-colors duration-normal hover:text-text-primary"
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
          className="p-2 text-text-secondary transition-colors duration-normal hover:text-text-primary"
          aria-label="Apri ricerca"
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
              placeholder="Cerca..."
              className="w-48 md:w-64 h-10 px-4 pl-10 bg-bg-tertiary border border-border-default rounded-md text-small text-text-primary placeholder:text-text-secondary focus:outline-none focus:border-border-subtle transition-colors duration-normal"
              onBlur={() => {
                if (!query) {
                  setTimeout(() => setIsExpanded(false), 150)
                }
              }}
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="ml-2 p-2 text-text-secondary transition-colors duration-normal hover:text-text-primary"
            aria-label="Chiudi ricerca"
          >
            <X className="w-5 h-5" />
          </button>
        </form>
      )}
    </div>
  )
}
