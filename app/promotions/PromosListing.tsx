'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { resolveImage } from '@/lib/image'
import { cn } from '@/lib/utils'
import { fadeUp, staggerContainer } from '@/lib/animations'
import Badge from '@/components/ui/Badge'
import type { PromoListItem } from '@/types'

const filterCategories = ['All', 'Pembelian', 'Servis', 'Finansial'] as const

interface PromosListingProps {
  promos: PromoListItem[]
}

export default function PromosListing({ promos }: PromosListingProps) {
  const [filter, setFilter] = useState<string>('All')

  const filtered = filter === 'All'
    ? promos
    : promos.filter((p) => p.category === filter)

  return (
    <section className="py-12 md:py-20">
      <div className="mx-auto max-w-[1280px] px-6 md:px-12">
        {/* Filter */}
        <div className="mb-10 flex flex-wrap gap-2">
          {filterCategories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setFilter(cat)}
              className={cn(
                'rounded-full px-4 py-2 text-sm font-medium transition-all duration-200',
                filter === cat
                  ? 'bg-vw-blue text-white'
                  : 'bg-surface text-muted hover:bg-border/50',
              )}
            >
              {cat === 'All' ? 'All Promotions' : cat}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={filter}
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            exit={{ opacity: 0 }}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 md:gap-8"
          >
            {filtered.map((promo) => (
              <motion.div key={promo._id} variants={fadeUp}>
                <Link
                  href={`/promotions/${promo.slug.current}`}
                  className="group relative block overflow-hidden rounded-2xl bg-surface shadow-[var(--shadow-card)] transition-shadow duration-300 hover:shadow-[var(--shadow-card-hover)]"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={resolveImage(promo.image, 800, 600)}
                      alt={promo.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark/60 to-transparent" />
                    {promo.badge && (
                      <div className="absolute top-4 left-4">
                        <Badge variant="red">{promo.badge}</Badge>
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-dark">{promo.title}</h3>
                    {promo.validUntil && (
                      <p className="mt-1 text-sm text-muted">
                        Valid until {promo.validUntil}
                      </p>
                    )}
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {filtered.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-lg text-muted">No promotions in this category.</p>
          </div>
        )}
      </div>
    </section>
  )
}
