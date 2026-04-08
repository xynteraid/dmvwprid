import type { Metadata } from 'next'
import { Wrench, Paintbrush, Zap, AlertTriangle } from 'lucide-react'
import { client } from '@/sanity/lib/client'
import { SITE_SETTINGS_QUERY } from '@/sanity/lib/queries'
import type { SiteSettings } from '@/types'
import SectionHeader from '@/components/ui/SectionHeader'
import BookingForm from '@/components/forms/BookingForm'

export const metadata: Metadata = {
  title: 'Service & Repair',
  description: 'Book your Volkswagen service appointment. Official VW-certified technicians and genuine parts.',
}

const services = [
  { icon: Wrench, title: 'General Service', desc: 'Regular maintenance to keep your VW in top condition.' },
  { icon: Paintbrush, title: 'Body & Paint', desc: 'Professional body repair and paint restoration.' },
  { icon: Zap, title: 'Electrical & AC', desc: 'Electrical diagnostics, AC service, and repairs.' },
  { icon: AlertTriangle, title: 'Emergency Repair', desc: 'Quick response for breakdowns and urgent repairs.' },
]

export default async function ServicePage() {
  const settings = await client.fetch<SiteSettings>(
    SITE_SETTINGS_QUERY, {}, { next: { revalidate: 60 } },
  )

  return (
    <>
      <section className="bg-vw-gradient -mt-16 pt-36 pb-20 md:-mt-20 md:pt-48 md:pb-28">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12">
          <p className="text-xs font-medium uppercase tracking-[0.12em] text-white/40">Owner</p>
          <h1 className="mt-3 font-display text-[clamp(2rem,4vw,4rem)] leading-tight text-white">
            Service & Repair
          </h1>
          <p className="mt-4 max-w-lg text-base text-white/60">
            Keep your Volkswagen running at its best with our certified service center.
          </p>
        </div>
      </section>

      <section className="py-20 md:py-32">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12">
          <SectionHeader eyebrow="Our Services" title="What We Offer" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 md:gap-8">
            {services.map((s) => {
              const Icon = s.icon
              return (
                <div key={s.title} className="rounded-2xl bg-surface p-8 text-center shadow-[var(--shadow-card)]">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-vw-blue/5">
                    <Icon size={24} className="text-vw-blue" />
                  </div>
                  <h3 className="mt-5 text-base font-bold text-dark">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{s.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="bg-surface py-20 md:py-32">
        <div className="mx-auto max-w-3xl px-6 md:px-12">
          <SectionHeader eyebrow="Book Now" title="Schedule Your Service" />
          <BookingForm whatsappNumber={settings?.whatsappNumber || '6281234567890'} />
        </div>
      </section>
    </>
  )
}
