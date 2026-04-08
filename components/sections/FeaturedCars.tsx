'use client'

import { useState, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { resolveImage } from '@/lib/image'
import { formatRupiah, cn } from '@/lib/utils'
import Badge from '@/components/ui/Badge'
import type { CarListItem } from '@/types'

interface FeaturedCarsProps {
  cars: CarListItem[]
}

const categories = ['All', 'SUV', 'Sedan', 'Hatchback', 'Electric'] as const

type CategoryKey = (typeof categories)[number]

function mapCategory(car: CarListItem): CategoryKey {
  if (car.fuel === 'Listrik') return 'Electric'
  if (car.category === 'Hatchback') return 'Hatchback'
  if (car.category === 'Sedan') return 'Sedan'
  return 'SUV'
}

export default function FeaturedCars({ cars }: FeaturedCarsProps) {
  const [activeCategory, setActiveCategory] = useState<CategoryKey>('All')
  const [currentIndex, setCurrentIndex] = useState(0)

  const filtered = activeCategory === 'All'
    ? cars
    : cars.filter((c) => mapCategory(c) === activeCategory)

  const current = filtered[currentIndex] || filtered[0]

  const handleCategoryChange = useCallback((cat: CategoryKey) => {
    setActiveCategory(cat)
    setCurrentIndex(0)
  }, [])

  const goPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + filtered.length) % filtered.length)
  }, [filtered.length])

  const goNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % filtered.length)
  }, [filtered.length])

  if (!cars || cars.length === 0) return null

  return (
    <section className="relative overflow-hidden py-24 md:py-40">
      <div className="mx-auto max-w-[1280px] px-6 md:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 flex flex-col gap-6 md:mb-16 md:flex-row md:items-end md:justify-between"
        >
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted">
              The Collection
            </p>
            <h2 className="mt-3 font-display text-[clamp(2rem,4vw,4rem)] leading-[1.05] text-dark">
              Explore Our Lineup
            </h2>
          </div>
          <Link
            href="/cars"
            className="group inline-flex items-center gap-2 text-sm font-medium text-vw-blue transition-all duration-200 hover:gap-3"
          >
            View All Vehicles
            <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </motion.div>

        {/* Category Tabs */}
        <div className="mb-12 flex items-center gap-1 overflow-x-auto md:mb-16">
          {categories.map((cat) => {
            const count = cat === 'All'
              ? cars.length
              : cars.filter((c) => mapCategory(c) === cat).length
            if (count === 0 && cat !== 'All') return null
            return (
              <button
                key={cat}
                type="button"
                onClick={() => handleCategoryChange(cat)}
                className={cn(
                  'relative shrink-0 px-6 py-3 text-sm font-medium transition-all duration-300',
                  activeCategory === cat
                    ? 'text-vw-blue'
                    : 'text-muted hover:text-dark',
                )}
              >
                {cat}
                {activeCategory === cat && (
                  <motion.div
                    layoutId="category-indicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-vw-blue"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
              </button>
            )
          })}
        </div>

        {/* Showcase */}
        <div className="relative">
          {/* Car display area */}
          <div className="relative mx-auto max-w-4xl">
            {/* Gradient background behind car */}
            <div className="absolute inset-x-0 bottom-0 h-2/3 rounded-3xl bg-[var(--gradient-subtle)]" />

            <AnimatePresence mode="wait">
              <motion.div
                key={current._id}
                initial={{ opacity: 0, x: 60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -60 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="relative"
              >
                {/* Badge */}
                {current.badge && (
                  <div className="absolute top-4 left-1/2 z-10 -translate-x-1/2">
                    <Badge variant={current.fuel === 'Listrik' ? 'blue' : 'red'}>
                      {current.badge}
                    </Badge>
                  </div>
                )}

                {/* Car Image */}
                <div className="relative mx-auto aspect-[16/9] max-w-3xl">
                  <Image
                    src={resolveImage(current.thumbnail, 1200, 675)}
                    alt={current.name}
                    fill
                    className="object-contain drop-shadow-2xl"
                    sizes="(max-width: 768px) 100vw, 900px"
                    unoptimized
                  />
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation arrows */}
            {filtered.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={goPrev}
                  className="absolute left-0 top-1/2 z-10 -translate-x-2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full border border-border bg-surface text-dark shadow-sm transition-all duration-200 hover:shadow-md hover:border-vw-blue hover:text-vw-blue md:-translate-x-8"
                  aria-label="Previous car"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  type="button"
                  onClick={goNext}
                  className="absolute right-0 top-1/2 z-10 translate-x-2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full border border-border bg-surface text-dark shadow-sm transition-all duration-200 hover:shadow-md hover:border-vw-blue hover:text-vw-blue md:translate-x-8"
                  aria-label="Next car"
                >
                  <ChevronRight size={20} />
                </button>
              </>
            )}
          </div>

          {/* Car info below */}
          <AnimatePresence mode="wait">
            <motion.div
              key={current._id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="mt-10 text-center"
            >
              <p className="text-xs font-medium uppercase tracking-[0.15em] text-muted">
                {mapCategory(current)}
              </p>
              <h3 className="mt-2 font-display text-3xl text-dark md:text-4xl">
                {current.name}
              </h3>
              <p className="mt-2 text-base text-muted">
                {current.tagline}
              </p>

              <div className="mt-2">
                <span className="text-lg font-bold text-dark">
                  Starting from {formatRupiah(current.price)}
                </span>
              </div>

              {/* Spec pills */}
              {current.highlights && current.highlights.length > 0 && (
                <div className="mt-5 flex flex-wrap justify-center gap-3">
                  {current.highlights.map((h, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center rounded-full border border-border bg-surface px-4 py-2 text-xs font-medium text-dark"
                    >
                      {h.label}
                    </span>
                  ))}
                </div>
              )}

              {/* CTA */}
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link
                  href={`/cars/${current.slug.current}`}
                  className="group inline-flex items-center gap-2 rounded-full bg-vw-blue px-8 py-3.5 text-sm font-medium text-white transition-all duration-300 hover:bg-vw-blue-hover"
                >
                  Learn More
                  <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center rounded-full border border-border px-8 py-3.5 text-sm font-medium text-dark transition-all duration-200 hover:border-vw-blue hover:text-vw-blue"
                >
                  Book Test Drive
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Dot indicators */}
          {filtered.length > 1 && (
            <div className="mt-8 flex items-center justify-center gap-2">
              {filtered.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setCurrentIndex(idx)}
                  className={cn(
                    'h-1.5 rounded-full transition-all duration-300',
                    idx === currentIndex
                      ? 'w-8 bg-vw-blue'
                      : 'w-1.5 bg-border hover:bg-muted',
                  )}
                  aria-label={`Go to car ${idx + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
