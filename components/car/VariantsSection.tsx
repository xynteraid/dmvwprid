'use client'

import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { formatRupiah } from '@/lib/utils'
import { fadeUp, staggerContainer } from '@/lib/animations'
import SectionHeader from '@/components/ui/SectionHeader'
import type { Variant } from '@/types'

interface VariantsSectionProps {
  variants: Variant[]
}

export default function VariantsSection({ variants }: VariantsSectionProps) {
  return (
    <section className="py-20 md:py-32">
      <div className="mx-auto max-w-[1280px] px-6 md:px-12">
        <SectionHeader
          eyebrow="Trim Levels"
          title="Available Variants"
        />

        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: '-80px' }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 md:gap-8"
        >
          {variants.map((variant, idx) => (
            <motion.div
              key={idx}
              variants={fadeUp}
              className="rounded-2xl border border-border bg-surface p-8 transition-shadow duration-300 hover:shadow-[var(--shadow-card)]"
            >
              <h3 className="text-lg font-bold text-dark">{variant.name}</h3>
              <p className="mt-2 text-xl font-bold text-vw-blue">
                {formatRupiah(variant.price)}
              </p>

              {variant.features && variant.features.length > 0 && (
                <ul className="mt-6 flex flex-col gap-3">
                  {variant.features.map((feature, fIdx) => (
                    <li
                      key={fIdx}
                      className="flex items-start gap-2.5 text-sm text-dark"
                    >
                      <Check size={14} className="mt-0.5 shrink-0 text-vw-blue" />
                      {feature}
                    </li>
                  ))}
                </ul>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
