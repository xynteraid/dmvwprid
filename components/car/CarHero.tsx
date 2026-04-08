'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { resolveImage } from '@/lib/image'
import { formatRupiah } from '@/lib/utils'
import Badge from '@/components/ui/Badge'
import type { Car } from '@/types'

interface CarHeroProps {
  car: Car
}

export default function CarHero({ car }: CarHeroProps) {
  const heroSrc = resolveImage(car.heroImage, 1920, 1080)

  return (
    <section className="relative h-[80vh] w-full overflow-hidden bg-dark -mt-16 md:-mt-20 pt-16 md:pt-20">
      <Image
        src={heroSrc}
        alt={car.name}
        fill
        className="object-cover"
        unoptimized={!!car.heroImage._url}
        preload
        sizes="100vw"
      />

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/40 to-dark/20" />

      <div className="relative z-10 mx-auto flex h-full max-w-[1280px] flex-col justify-end px-6 pb-16 md:px-12 md:pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {car.badge && (
            <Badge variant="red" className="mb-4">
              {car.badge}
            </Badge>
          )}
          <h1 className="font-display text-[clamp(2.5rem,6vw,5rem)] leading-[1.05] tracking-[-0.02em] text-white">
            {car.name}
          </h1>
          {car.tagline && (
            <p className="mt-2 text-lg text-white/70">{car.tagline}</p>
          )}
          <p className="mt-4 text-xl font-medium text-white">
            Starting from {formatRupiah(car.price)}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="mt-10 flex justify-center"
        >
          <ChevronDown size={24} className="animate-bounce text-white/50" />
        </motion.div>
      </div>
    </section>
  )
}
