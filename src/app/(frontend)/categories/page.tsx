import { CategoryCard } from '@/components/categories'
import { getCategories, getCategoryProductCount, transformCategory } from '@/lib/payload'

export const metadata = {
  title: 'Categories | The Antiques',
  description: 'Browse our curated collection of antique categories',
}

export default async function CategoriesPage() {
  // Get only parent categories (no subcategories)
  const categories = await getCategories({ parentOnly: true })

  // Get product counts for each category
  const categoriesWithCounts = await Promise.all(
    categories.map(async (cat) => {
      const count = await getCategoryProductCount(cat.id)
      return transformCategory(cat, count)
    })
  )

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-semibold mb-4">Categories</h1>
        <p className="text-zinc-400 max-w-2xl mx-auto">
          Explore our carefully curated collection of antiques and vintage pieces across various categories
        </p>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categoriesWithCounts.map((category) => (
          <CategoryCard key={category.slug} {...category} />
        ))}
      </div>
    </div>
  )
}
