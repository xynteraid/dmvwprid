import type { Metadata } from 'next'
import { MapPin, Phone, Mail, Clock, MessageCircle } from 'lucide-react'
import { client } from '@/sanity/lib/client'
import { SITE_SETTINGS_QUERY } from '@/sanity/lib/queries'
import { buildWALink, waMessageGeneral } from '@/lib/whatsapp'
import type { SiteSettings } from '@/types'
import { mockSettings } from '@/data/mock'
import SectionHeader from '@/components/ui/SectionHeader'
import ContactForm from '@/components/forms/ContactForm'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with VW Puri Indah. Visit our showroom, call us, or send a message via WhatsApp.',
}

export default async function ContactPage() {
  let settings: SiteSettings = mockSettings
  try {
    const fetched = await client.fetch<SiteSettings>(SITE_SETTINGS_QUERY, {}, { next: { revalidate: 60 } })
    if (fetched) settings = fetched
  } catch {
    // Use mock data
  }

  const waNumber = settings?.whatsappNumber || '6281234567890'

  return (
    <>
      <section className="bg-vw-gradient -mt-16 pt-36 pb-20 md:-mt-20 md:pt-48 md:pb-28">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12">
          <p className="text-xs font-medium uppercase tracking-[0.12em] text-white/40">Get in Touch</p>
          <h1 className="mt-3 font-display text-[clamp(2rem,4vw,4rem)] leading-tight text-white">Contact Us</h1>
          <p className="mt-4 max-w-lg text-base text-white/60">
            We are here to help. Reach out to us for any inquiries.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12">
          {/* WhatsApp CTA */}
          <div className="mb-12 text-center">
            <a
              href={buildWALink(waNumber, waMessageGeneral())}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 rounded-full bg-[#25D366] px-8 py-4 text-base font-medium text-white transition-all duration-200 hover:bg-[#22c55e]"
            >
              <MessageCircle size={20} />
              Chat via WhatsApp
            </a>
          </div>

          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Form */}
            <div>
              <SectionHeader eyebrow="Send a Message" title="Contact Form" align="left" />
              <ContactForm whatsappNumber={waNumber} />
            </div>

            {/* Info + Map */}
            <div>
              <SectionHeader eyebrow="Visit Us" title="Our Location" align="left" />

              <div className="flex flex-col gap-5">
                {[
                  { icon: MapPin, label: settings?.address },
                  { icon: Phone, label: settings?.phone },
                  { icon: Mail, label: settings?.email },
                  { icon: Clock, label: settings?.operationalHours },
                ].map((item, idx) => {
                  if (!item.label) return null
                  const Icon = item.icon
                  return (
                    <div key={idx} className="flex items-start gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-vw-blue/5">
                        <Icon size={18} className="text-vw-blue" />
                      </div>
                      <p className="text-sm text-dark">{item.label}</p>
                    </div>
                  )
                })}
              </div>

              {/* Map */}
              <div className="mt-8 overflow-hidden rounded-2xl bg-border">
                {settings?.googleMapsEmbed ? (
                  <iframe
                    src={settings.googleMapsEmbed}
                    width="100%"
                    height="300"
                    className="border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="VW Puri Indah Location"
                  />
                ) : (
                  <div className="flex h-[300px] items-center justify-center text-sm text-muted">
                    Map will be displayed here
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
