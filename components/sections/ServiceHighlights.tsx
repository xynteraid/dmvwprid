'use client'

import Link from 'next/link'
import { ArrowRight, Wrench, ShieldCheck, Clock, HeadphonesIcon } from 'lucide-react'
import { motion } from 'framer-motion'
import { fadeUp, staggerContainer } from '@/lib/animations'

const services = [
  {
    icon: Wrench,
    title: 'Authorized Service Center',
    desc: 'VW-certified technicians using state-of-the-art equipment and genuine parts for every repair.',
    href: '/owner/service',
  },
  {
    icon: ShieldCheck,
    title: 'Genuine Parts & Accessories',
    desc: 'Only original VW components that meet factory specifications. No compromises on quality.',
    href: '/owner/parts',
  },
  {
    icon: Clock,
    title: 'Express Maintenance',
    desc: 'Routine service completed in under 2 hours. Book online, drop off, and get back on the road.',
    href: '/owner/service',
  },
  {
    icon: HeadphonesIcon,
    title: '24/7 Roadside Assistance',
    desc: 'Peace of mind wherever you drive. Emergency support available around the clock, nationwide.',
    href: '/useful-info/important-info',
  },
]

export default function ServiceHighlights() {
  return (
    <section className="py-24 md:py-40">
      <div className="mx-auto max-w-[1280px] px-6 md:px-12">
        <motion.div
          variants={fadeUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: '-80px' }}
          className="mb-16 max-w-xl md:mb-20"
        >
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted">
            After-Sales
          </p>
          <h2 className="mt-3 font-display text-[clamp(2rem,4vw,4rem)] leading-[1.05] text-dark">
            Complete Care for Your Volkswagen
          </h2>
          <p className="mt-4 text-base text-muted">
            Ownership is just the beginning. Our comprehensive service network
            ensures your VW stays perfect.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: '-80px' }}
          className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2"
        >
          {services.map((service) => {
            const Icon = service.icon
            return (
              <motion.div key={service.title} variants={fadeUp}>
                <Link
                  href={service.href}
                  className="group flex h-full flex-col bg-surface p-8 transition-all duration-300 hover:bg-bg md:p-10"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-vw-blue/5 transition-colors duration-300 group-hover:bg-vw-blue/10">
                    <Icon size={22} className="text-vw-blue" strokeWidth={1.5} />
                  </div>

                  <h3 className="mt-6 text-lg font-bold text-dark">
                    {service.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                    {service.desc}
                  </p>

                  <div className="mt-6 flex items-center gap-1.5 text-sm font-medium text-vw-blue opacity-0 transition-all duration-300 group-hover:opacity-100">
                    Learn More
                    <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-1" />
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
