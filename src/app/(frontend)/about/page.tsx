import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About | The Antiques',
  description: 'Learn about The Antiques - our story, passion for vintage treasures, and commitment to preserving history.',
}

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-zinc-900 py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-semibold mb-6">Our Story</h1>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
            A passion for the timeless, the crafted, and the storied
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-3xl mx-auto">
          {/* Story */}
          <div className="mb-16">
            <h2 className="text-2xl font-semibold mb-6 text-amber-500">The Beginning</h2>
            <div className="space-y-4 text-zinc-300 leading-relaxed">
              <p>
                The Antiques was born from a simple belief: that every piece of furniture,
                every decorative object, every vintage treasure carries within it a piece
                of history worth preserving.
              </p>
              <p>
                What started as a personal passion for collecting and restoring antique
                pieces has grown into a curated collection of exceptional items, each
                selected for its craftsmanship, character, and timeless appeal.
              </p>
              <p>
                We travel extensively to source our pieces, visiting estate sales,
                private collections, and antique fairs across Europe and beyond.
                Every item in our collection has been carefully examined, authenticated,
                and where necessary, lovingly restored to ensure it can continue its
                journey for generations to come.
              </p>
            </div>
          </div>

          {/* Values */}
          <div className="mb-16">
            <h2 className="text-2xl font-semibold mb-6 text-amber-500">What We Believe</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-zinc-900 p-6 rounded-lg border border-zinc-800">
                <h3 className="font-semibold mb-3">Authenticity</h3>
                <p className="text-zinc-400 text-sm">
                  Every piece is genuine. We research provenance, verify materials,
                  and provide honest descriptions of condition and history.
                </p>
              </div>
              <div className="bg-zinc-900 p-6 rounded-lg border border-zinc-800">
                <h3 className="font-semibold mb-3">Preservation</h3>
                <p className="text-zinc-400 text-sm">
                  We believe in preserving the past for the future. Our restoration
                  respects original craftsmanship while ensuring longevity.
                </p>
              </div>
              <div className="bg-zinc-900 p-6 rounded-lg border border-zinc-800">
                <h3 className="font-semibold mb-3">Sustainability</h3>
                <p className="text-zinc-400 text-sm">
                  Antiques are the ultimate in sustainable living. By choosing vintage,
                  you give new life to existing pieces rather than adding to consumption.
                </p>
              </div>
              <div className="bg-zinc-900 p-6 rounded-lg border border-zinc-800">
                <h3 className="font-semibold mb-3">Personal Service</h3>
                <p className="text-zinc-400 text-sm">
                  We take the time to understand what you are looking for and help you
                  find pieces that will bring lasting joy to your space.
                </p>
              </div>
            </div>
          </div>

          {/* Quote */}
          <div className="border-l-2 border-amber-600 pl-6 py-4 mb-16">
            <blockquote className="text-xl italic text-zinc-300 mb-4">
              &ldquo;The best antiques are not merely old things, but timeless objects
              that continue to inspire and delight across generations.&rdquo;
            </blockquote>
            <cite className="text-zinc-500 text-sm">— The Antiques Philosophy</cite>
          </div>

          {/* CTA */}
          <div className="text-center bg-zinc-900 p-8 rounded-lg border border-zinc-800">
            <h2 className="text-xl font-semibold mb-4">Ready to Find Your Treasure?</h2>
            <p className="text-zinc-400 mb-6">
              Browse our collection or get in touch to discuss what you are looking for.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/categories"
                className="inline-flex items-center justify-center px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white font-medium rounded transition-colors"
              >
                Browse Collection
              </a>
              <a
                href="/contact"
                className="inline-flex items-center justify-center px-6 py-3 border border-zinc-700 hover:border-zinc-600 text-zinc-300 font-medium rounded transition-colors"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
