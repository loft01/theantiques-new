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
      <label htmlFor="category-filter" className="text-caption text-text-secondary">
        Categoria:
      </label>
      <select
        id="category-filter"
        value={currentCategory}
        onChange={handleCategoryChange}
        className="h-10 px-4 bg-transparent border border-[var(--border-secondary)] rounded-full text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--text-primary)] transition-colors cursor-pointer"
      >
        <option value="">Tutte le Categorie</option>
        {categories.map((cat) => (
          <option key={cat.slug} value={cat.slug}>
            {cat.name}
          </option>
        ))}
      </select>
    </div>
  )
}
