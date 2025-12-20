'use client'

import { useRouter } from 'next/navigation'

interface SearchFiltersProps {
  categories: { slug: string; name: string }[]
  currentCategory: string
  query: string
}

export function SearchFilters({ categories, currentCategory, query }: SearchFiltersProps) {
  const router = useRouter()

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const category = e.target.value
    const params = new URLSearchParams()
    params.set('q', query)
    if (category) {
      params.set('category', category)
    }
    router.push(`/search?${params.toString()}`)
  }

  return (
    <div className="flex items-center gap-3">
      <label htmlFor="category-filter" className="text-sm text-zinc-400">
        Category:
      </label>
      <select
        id="category-filter"
        value={currentCategory}
        onChange={handleCategoryChange}
        className="px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-sm text-white focus:outline-none focus:border-amber-600 transition-colors"
      >
        <option value="">All Categories</option>
        {categories.map((cat) => (
          <option key={cat.slug} value={cat.slug}>
            {cat.name}
          </option>
        ))}
      </select>
    </div>
  )
}
