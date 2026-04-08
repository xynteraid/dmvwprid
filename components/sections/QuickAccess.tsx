'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Wrench, Package, FileText, Car, MessageCircle, Calculator } from 'lucide-react'
import { fadeUp, staggerContainer } from '@/lib/animations'
import { buildWALink, waMessageGeneral } from '@/lib/whatsapp'

interface QuickAccessProps {
  whatsappNumber: string
}

const items = [
  { icon: Wrench, label: 'Service & Repair', href: '/owner/service' },
  { icon: Package, label: 'Parts', href: '/owner/parts' },
  { icon: FileText, label: 'Download Brochure', href: '#' },
  { icon: Car, label: 'Test Drive', href: '/contact' },
  { icon: MessageCircle, label: 'WhatsApp', href: '__wa__' },
  { icon: Calculator, label: 'Financing', href: '/kredit' },
]

export default function QuickAccess({ whatsappNumber }: QuickAccessProps) {
  return (
    <section className="py-20 md:py-32">
      <div className="mx-auto max-w-[1280px] px-6 md:px-12">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-3 gap-4 sm:grid-cols-6 md:gap-6"
        >
          {items.map((item) => {
            const Icon = item.icon
            const href =
              item.href === '__wa__'
                ? buildWALink(whatsappNumber, waMessageGeneral())
                : item.href
            const isExternal = href.startsWith('http')

            const content = (
              <motion.div
                variants={fadeUp}
                className="flex flex-col items-center gap-3 rounded-2xl bg-surface p-6 text-center shadow-[var(--shadow-card)] transition-all duration-200 hover:shadow-[var(--shadow-card-hover)] hover:-translate-y-1"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-vw-blue/5">
                  <Icon size={24} className="text-vw-blue" />
                </div>
                <span className="text-xs font-medium text-dark">{item.label}</span>
              </motion.div>
            )

            if (isExternal) {
              return (
                <a
                  key={item.label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {content}
                </a>
              )
            }

            return (
              <Link key={item.label} href={href}>
                {content}
              </Link>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
