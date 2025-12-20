export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center rounded-lg overflow-hidden bg-card mb-16">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/80" />
        <div className="relative z-10 text-center px-4">
          <h1 className="text-5xl md:text-7xl font-semibold mb-4">
            Timeless Treasures
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Discover unique vintage and antique pieces with stories to tell
          </p>
          <a
            href="/categories"
            className="inline-block bg-foreground text-background px-8 py-3 rounded-md font-medium hover:bg-foreground/90 transition-colors"
          >
            Browse Collection
          </a>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-8 text-center">Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {['Furniture', 'Lighting', 'Decorative', 'Art'].map((cat) => (
            <a
              key={cat}
              href={`/categories/${cat.toLowerCase()}`}
              className="aspect-square bg-card rounded-lg flex items-center justify-center hover:bg-card-hover transition-colors"
            >
              <span className="text-lg font-medium">{cat}</span>
            </a>
          ))}
        </div>
      </section>

      {/* Featured Products Placeholder */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-8 text-center">Featured Items</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-card rounded-lg overflow-hidden group">
              <div className="aspect-square bg-card-hover" />
              <div className="p-4">
                <p className="text-sm text-muted-foreground">Category</p>
                <h3 className="font-medium">Antique Item {i}</h3>
                <p className="text-accent mt-1">€1,200</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-card rounded-lg p-8 md:p-12 text-center">
        <h2 className="text-2xl font-semibold mb-4">Stay Updated</h2>
        <p className="text-muted-foreground mb-6 max-w-md mx-auto">
          Subscribe to receive updates on new arrivals and exclusive pieces
        </p>
        <form className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 px-4 py-3 bg-background border border-border rounded-md focus:outline-none focus:border-accent"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-accent text-background rounded-md font-medium hover:bg-accent-light transition-colors"
          >
            Subscribe
          </button>
        </form>
      </section>
    </div>
  )
}
