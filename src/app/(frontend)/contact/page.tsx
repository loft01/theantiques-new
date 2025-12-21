import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { ContactForm } from '@/components/forms'

export const metadata: Metadata = {
  title: 'Contact | The Antiques',
  description: 'Get in touch with The Antiques. Send us a message, ask about our pieces, or schedule a visit.',
}

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      {/* Split Layout */}
      <section className="border-b border-border-primary">
        <div className="grid lg:grid-cols-2 min-h-[60vh]">
          {/* Left - Contact Info */}
          <div className="p-8 lg:p-12 xl:p-16 flex flex-col justify-between border-r border-border-primary">
            <div>
              <h2 className="text-caption text-text-tertiary mb-8">Contact</h2>

              {/* Large Address */}
              <address className="not-italic mb-12">
                <p className="text-manifesto leading-tight">
                  The Antiques
                  <br />
                  25 Via del Design
                  <br />
                  20121 Milano
                  <br />
                  Italy
                </p>
              </address>
            </div>

            {/* Contact Links */}
            <div className="flex flex-wrap gap-6">
              <a
                href="mailto:info@theantiques.com"
                className="link-arrow"
              >
                Email
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="link-arrow"
              >
                Insta
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="tel:+390000000000"
                className="link-arrow"
              >
                Call
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Right - Form */}
          <div className="p-8 lg:p-12 xl:p-16 flex flex-col justify-between">
            <div>
              <h2 className="text-caption text-text-tertiary mb-8">Message</h2>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Full Width Image */}
      <section className="relative h-[50vh] lg:h-[60vh]">
        <Image
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop"
          alt="Mountain landscape"
          fill
          className="object-cover grayscale-[30%]"
        />
      </section>
    </div>
  )
}
