import { Metadata } from 'next'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { ContactForm } from '@/components/forms'
import { getSiteSettings } from '@/lib/payload'

export const metadata: Metadata = {
  title: 'Contatti | The Antiques',
  description: 'Contattaci. Inviaci un messaggio, chiedi informazioni sui nostri pezzi o prenota una visita.',
}

export default async function ContactPage() {
  const settings = await getSiteSettings()

  // Parse address lines
  const addressLines = settings.address?.split('\n').filter(Boolean) || [
    'The Antiques',
    'Via del Design 25',
    '20121 Milano',
    'Italia'
  ]

  // Find Instagram link from social links
  const instagramLink = settings.socialLinks?.find(s => s.platform === 'instagram')?.url || 'https://instagram.com'

  return (
    <div className="min-h-screen">
      {/* Split Layout */}
      <section className="border-b border-border-primary">
        <div className="grid lg:grid-cols-2 min-h-[60vh]">
          {/* Left - Contact Info */}
          <div className="p-8 lg:p-12 xl:p-16 flex flex-col justify-between border-r border-border-primary">
            <div>
              <h2 className="text-caption text-text-tertiary mb-8">Contatti</h2>

              {/* Large Address */}
              <address className="not-italic mb-12">
                <p className="text-manifesto leading-tight">
                  {addressLines.map((line, i) => (
                    <span key={i}>
                      {line}
                      {i < addressLines.length - 1 && <br />}
                    </span>
                  ))}
                </p>
              </address>
            </div>

            {/* Contact Links */}
            <div className="flex flex-wrap gap-6">
              {settings.contactEmail && (
                <a
                  href={`mailto:${settings.contactEmail}`}
                  className="link-arrow"
                >
                  Email
                  <ArrowRight className="w-4 h-4" />
                </a>
              )}
              <a
                href={instagramLink}
                target="_blank"
                rel="noopener noreferrer"
                className="link-arrow"
              >
                Instagram
                <ArrowRight className="w-4 h-4" />
              </a>
              {settings.contactPhone && (
                <a
                  href={`tel:${settings.contactPhone}`}
                  className="link-arrow"
                >
                  Chiama
                  <ArrowRight className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>

          {/* Right - Form */}
          <div className="p-8 lg:p-12 xl:p-16 flex flex-col justify-between">
            <div>
              <h2 className="text-caption text-text-tertiary mb-8">Messaggio</h2>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Full Width Image */}
      <section className="relative h-[50vh] lg:h-[60vh]">
        <Image
          src="/IMG_Sfondo.jpg"
          alt="The Antiques"
          fill
          className="object-cover"
        />
      </section>
    </div>
  )
}
