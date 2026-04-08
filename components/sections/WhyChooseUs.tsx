'use client'

import { motion } from 'framer-motion'
import { ShieldCheck, Wrench, Star, Users } from 'lucide-react'
import { fadeUp, staggerContainer } from '@/lib/animations'

const items = [
  {
    icon: ShieldCheck,
    title: 'Authorized Dealer',
    desc: 'Certified and trusted Volkswagen dealership in Jakarta since 2005.',
    stat: '18+',
    statLabel: 'Years',
  },
  {
    icon: Wrench,
    title: 'VW-Certified Service',
    desc: 'Factory-trained technicians using genuine parts and diagnostics.',
    stat: '50+',
    statLabel: 'Technicians',
  },
  {
    icon: Star,
    title: 'Factory Warranty',
    desc: 'Full manufacturer warranty with comprehensive after-sales support.',
    stat: '5yr',
    statLabel: 'Coverage',
  },
  {
    icon: Users,
    title: 'Trusted by Thousands',
    desc: 'A growing family of satisfied Volkswagen owners across Jakarta.',
    stat: '2,400+',
    statLabel: 'Happy Owners',
  },
]

export default function WhyChooseUs() {
  return (
    <section className="relative overflow-hidden py-24 md:py-40">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-[var(--gradient-subtle)]" />

      <div className="relative mx-auto max-w-[1280px] px-6 md:px-12">
        <motion.div
          variants={fadeUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: '-80px' }}
          className="mb-16 md:mb-20"
        >
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted">
            Why VW Puri Indah
          </p>
          <h2 className="mt-3 max-w-lg font-display text-[clamp(2rem,4vw,4rem)] leading-[1.05] text-dark">
            A Standard Above the Rest
          </h2>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: '-80px' }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 md:gap-8"
        >
          {items.map((item) => {
            const Icon = item.icon
            return (
              <motion.div
                key={item.title}
                variants={fadeUp}
                className="group rounded-2xl bg-surface p-8 transition-all duration-500 hover:shadow-[var(--shadow-card-hover)]"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-vw-blue/5 transition-colors duration-300 group-hover:bg-vw-blue/10">
                  <Icon size={22} className="text-vw-blue" strokeWidth={1.5} />
                </div>

                <div className="mt-8">
                  <span className="text-3xl font-bold tracking-tight text-dark">
                    {item.stat}
                  </span>
                  <span className="ml-1 text-xs font-medium uppercase tracking-wider text-muted">
                    {item.statLabel}
                  </span>
                </div>

                <h3 className="mt-3 text-base font-bold text-dark">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{item.desc}</p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
