'use client'

import { MapPin, Phone, Mail, Clock } from 'lucide-react'
import { motion } from 'framer-motion'
import { fadeUp } from '@/lib/animations'
import SectionHeader from '@/components/ui/SectionHeader'
import type { SiteSettings } from '@/types'

interface ContactQuickProps {
  settings: SiteSettings
}

const contactItems = [
  { icon: MapPin, key: 'address' as const, label: 'Address' },
  { icon: Phone, key: 'phone' as const, label: 'Phone' },
  { icon: Mail, key: 'email' as const, label: 'Email' },
  { icon: Clock, key: 'operationalHours' as const, label: 'Hours' },
]

export default function ContactQuick({ settings }: ContactQuickProps) {
  return (
    <section className="py-20 md:py-32">
      <div className="mx-auto max-w-[1280px] px-6 md:px-12">
        <SectionHeader
          eyebrow="Get in Touch"
          title="Visit Our Showroom"
          subtitle="We're ready to help you find the perfect Volkswagen."
        />

        <motion.div
          variants={fadeUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: '-80px' }}
          className="grid gap-10 lg:grid-cols-2"
        >
          {/* Contact Info */}
          <div className="flex flex-col gap-6">
            {contactItems.map((item) => {
              const Icon = item.icon
              const value = settings[item.key]
              if (!value) return null
              return (
                <div key={item.key} className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-vw-blue/5">
                    <Icon size={18} className="text-vw-blue" />
                  </div>
                  <div>
                    <p className="text-xs font-medium uppercase tracking-[0.12em] text-muted">
                      {item.label}
                    </p>
                    <p className="mt-1 text-sm text-dark">{value}</p>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Map */}
          <div className="overflow-hidden rounded-2xl bg-border">
            {settings.googleMapsEmbed ? (
              <iframe
                src={settings.googleMapsEmbed}
                width="100%"
                height="100%"
                className="min-h-[300px] border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="VW Puri Indah Location"
              />
            ) : (
              <div className="flex min-h-[300px] items-center justify-center text-sm text-muted">
                Map will be displayed here
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
