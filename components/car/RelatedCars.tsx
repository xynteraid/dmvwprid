'use client'

import { motion } from 'framer-motion'
import { staggerContainer } from '@/lib/animations'
import SectionHeader from '@/components/ui/SectionHeader'
import CarCard from '@/components/car/CarCard'
import type { CarListItem } from '@/types'

interface RelatedCarsProps {
  cars: CarListItem[]
}

export default function RelatedCars({ cars }: RelatedCarsProps) {
  return (
    <section className="bg-surface py-20 md:py-32">
      <div className="mx-auto max-w-[1280px] px-6 md:px-12">
        <SectionHeader
          eyebrow="You Might Also Like"
          title="Related Vehicles"
        />

        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: '-80px' }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 md:gap-8"
        >
          {cars.slice(0, 3).map((car) => (
            <CarCard key={car._id} car={car} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
