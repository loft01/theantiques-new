import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Download } from 'lucide-react'

export const metadata: Metadata = {
  title: 'About | The Antiques',
  description: 'Learn about The Antiques - our story, passion for vintage treasures, and commitment to preserving history.',
}

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero - Dark image bar */}
      <section className="relative h-[30vh] bg-bg-tertiary">
        <Image
          src="https://images.unsplash.com/photo-1493106641515-6b5631de4bb9?w=1920&h=600&fit=crop"
          alt="Antique interior"
          fill
          className="object-cover opacity-50"
          priority
        />
      </section>

      {/* Manifesto Text */}
      <section className="section-padding border-b border-border-primary">
        <div className="container-editorial">
          <p className="text-manifesto text-center max-w-5xl mx-auto">
            The Antiques is more than just a design store; it&apos;s a curated experience
            that celebrates the beauty of minimalist design. Based in Europe, we
            offer a carefully selected collection of timeless furniture and home
            accessories that bring calm luxury to modern living spaces. Our pieces are
            chosen for their understated elegance, high-quality craftsmanship, and ability
            to enhance the everyday with simple, refined beauty.
          </p>
        </div>
      </section>

      {/* Three Column Blocks */}
      <section className="border-b border-border-primary">
        <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border-primary">
          {/* Our Manifesto */}
          <div className="p-8 lg:p-12">
            <h2 className="text-caption text-text-tertiary mb-6">Our Manifesto</h2>
            <p className="text-body text-text-secondary leading-relaxed">
              At The Antiques, we believe in the power of simplicity to create spaces that
              inspire calm and clarity. Our manifesto is to curate timeless, functional
              pieces that embody authenticity, history, sustainability, and minimalist beauty, offering
              pieces that elevate and enhance your space. Every member plays a vital role in our
              mission.
            </p>
          </div>

          {/* Our Approach */}
          <div className="p-8 lg:p-12">
            <h2 className="text-caption text-text-tertiary mb-6">The Antiques Approach</h2>
            <p className="text-body text-text-secondary leading-relaxed">
              Our team is driven by a shared passion for exceptional design and
              craftsmanship. We carefully select every piece in our collection to ensure
              it meets our exacting standards of quality, authenticity, and enduring
              value. From sourcing iconic designs to discovering emerging talent, we are
              committed to bringing you the finest curated selection.
            </p>
          </div>

          {/* Press & Inquiries */}
          <div className="p-8 lg:p-12">
            <h2 className="text-caption text-text-tertiary mb-6">Press & Inquiries</h2>
            <p className="text-body text-text-secondary leading-relaxed mb-6">
              Our press kit offers a comprehensive overview of The Antiques, including our
              brand story, design philosophy, and detailed product information.
              It provides high-resolution images, press releases, and in-depth
              background for journalists and partners interested in our
              collection and approach to curated design.
            </p>
            <Link href="/contact" className="link-arrow">
              Get in Touch
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Full Width Image */}
      <section className="relative h-[50vh] lg:h-[70vh]">
        <Image
          src="https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=1920&h=1080&fit=crop"
          alt="Antique collection landscape"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <h2 className="text-manifesto text-white text-center drop-shadow-lg">
            The Antiques Objects
          </h2>
        </div>
      </section>
    </div>
  )
}
