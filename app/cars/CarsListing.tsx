'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { staggerContainer, fadeUp } from '@/lib/animations'
import CarCard from '@/components/car/CarCard'
import type { CarListItem } from '@/types'

const categories = ['All', 'SUV', 'Sedan', 'Hatchback', 'Electric'] as const

function getDisplayCategory(car: CarListItem): string {
  if (car.fuel === 'Listrik') return 'Electric'
  return car.category
}

interface CarsListingProps {
  cars: CarListItem[]
}

export default function CarsListing({ cars }: CarsListingProps) {
  const [category, setCategory] = useState<string>('All')

  const filtered = category === 'All'
    ? cars
    : cars.filter((car) => getDisplayCategory(car) === category)

  return (
    <section className="py-12 md:py-20">
      <div className="mx-auto max-w-[1280px] px-6 md:px-12">
        {/* Category Tabs */}
        <div className="mb-10 flex items-center gap-1 overflow-x-auto border-b border-border">
          {categories.map((cat) => {
            const count = cat === 'All'
              ? cars.length
              : cars.filter((c) => getDisplayCategory(c) === cat).length
            if (count === 0 && cat !== 'All') return null
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setCategory(cat)}
                className={cn(
                  'relative shrink-0 px-6 py-3 text-sm font-medium transition-all duration-300',
                  category === cat
                    ? 'text-vw-blue'
                    : 'text-muted hover:text-dark',
                )}
              >
                {cat} ({count})
                {category === cat && (
                  <motion.div
                    layoutId="cars-tab-indicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-vw-blue"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
              </button>
            )
          })}
        </div>

        {/* Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={category}
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            exit={{ opacity: 0 }}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 md:gap-8"
          >
            {filtered.map((car) => (
              <CarCard key={car._id} car={car} />
            ))}
          </motion.div>
        </AnimatePresence>

        {filtered.length === 0 && (
          <motion.div
            variants={fadeUp}
            initial="initial"
            animate="animate"
            className="py-20 text-center"
          >
            <p className="text-lg text-muted">
              No vehicles match your selected filter.
            </p>
          </motion.div>
        )}
      </div>
    </section>
  )
}
