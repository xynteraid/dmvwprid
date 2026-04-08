'use client'

import Link from 'next/link'
import { ArrowRight, Percent, CreditCard, Wrench } from 'lucide-react'
import { motion } from 'framer-motion'
import { fadeUp, staggerContainer } from '@/lib/animations'
import type { PromoListItem } from '@/types'

interface PromotionsHighlightProps {
  promos: PromoListItem[]
}

const promoIcons: Record<string, typeof Percent> = {
  Pembelian: Percent,
  Finansial: CreditCard,
  Servis: Wrench,
}

export default function PromotionsHighlight({ promos }: PromotionsHighlightProps) {
  if (!promos || promos.length === 0) return null

  return (
    <section className="bg-vw-gradient py-24 md:py-40 overflow-hidden">
      <div className="mx-auto max-w-[1280px] px-6 md:px-12">
        {/* Header */}
        <motion.div
          variants={fadeUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: '-80px' }}
          className="mb-16 flex flex-col gap-6 md:mb-20 md:flex-row md:items-end md:justify-between"
        >
          <div className="max-w-xl">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/30">
              Limited Time Offers
            </p>
            <h2 className="mt-3 font-display text-[clamp(2rem,4vw,4rem)] leading-[1.05] text-white">
              Exclusive Offers
            </h2>
            <p className="mt-4 text-base text-white/40">
              Premium deals crafted for you. From cashback incentives to
              complimentary service packages.
            </p>
          </div>
          <Link
            href="/promotions"
            className="group inline-flex items-center gap-2 text-sm font-medium text-white/50 transition-all duration-200 hover:gap-3 hover:text-white"
          >
            All Promotions
            <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </motion.div>

        {/* Promo cards -- bold typographic style */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: '-80px' }}
          className="grid gap-5 md:grid-cols-3 md:gap-6"
        >
          {promos.slice(0, 3).map((promo, idx) => {
            const Icon = promoIcons[promo.category] || Percent
            return (
              <motion.div key={promo._id} variants={fadeUp}>
                <Link
                  href={`/promotions/${promo.slug.current}`}
                  className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.04] p-8 backdrop-blur-sm transition-all duration-500 hover:border-white/[0.12] hover:bg-white/[0.08] md:p-10"
                >
                  {/* Decorative glow */}
                  <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-vw-blue-hover/20 blur-3xl transition-all duration-700 group-hover:bg-vw-blue-hover/30" />

                  <div className="relative">
                    {/* Icon */}
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/[0.06]">
                      <Icon size={22} className="text-white/60" strokeWidth={1.5} />
                    </div>

                    {/* Badge */}
                    {promo.badge && (
                      <div className="mt-6">
                        <span className="inline-flex items-center rounded-full bg-accent-red/90 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
                          {promo.badge}
                        </span>
                      </div>
                    )}

                    {/* Title */}
                    <h3 className="mt-4 text-xl font-bold leading-snug text-white md:text-2xl">
                      {promo.title}
                    </h3>
                  </div>

                  {/* Footer */}
                  <div className="mt-8 flex items-center justify-between border-t border-white/[0.06] pt-6">
                    {promo.validUntil && (
                      <p className="text-xs text-white/30">
                        Valid until {promo.validUntil}
                      </p>
                    )}
                    <span className="inline-flex items-center gap-1 text-sm font-medium text-white/50 transition-all duration-200 group-hover:gap-2 group-hover:text-white">
                      Details
                      <ArrowRight size={14} />
                    </span>
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
