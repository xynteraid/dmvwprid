'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { resolveImage } from '@/lib/image'
import { cn } from '@/lib/utils'
import SectionHeader from '@/components/ui/SectionHeader'
import type { Car } from '@/types'

interface ColorPickerProps {
  car: Car
}

export default function ColorPicker({ car }: ColorPickerProps) {
  const [selected, setSelected] = useState(0)
  const color = car.colors[selected]

  return (
    <section className="py-20 md:py-32">
      <div className="mx-auto max-w-[1280px] px-6 md:px-12">
        <SectionHeader
          eyebrow="Exterior Colors"
          title="Choose Your Color"
        />

        {/* Car Image */}
        <div className="relative mx-auto aspect-video max-w-4xl overflow-hidden rounded-2xl bg-bg">
          <AnimatePresence mode="wait">
            <motion.div
              key={selected}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="absolute inset-0"
            >
              <Image
                src={resolveImage(color.image, 1200, 675)}
                alt={`${car.name} in ${color.name}`}
                fill
                className="object-contain"
                unoptimized={!!color.image._url}
                sizes="(max-width: 1024px) 100vw, 900px"
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Swatches + Name */}
        <div className="mt-8 flex flex-col items-center gap-4">
          <div className="flex items-center gap-3">
            {car.colors.map((c, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setSelected(idx)}
                className={cn(
                  'h-8 w-8 rounded-full border-2 transition-all duration-200',
                  idx === selected
                    ? 'border-vw-blue scale-110'
                    : 'border-border hover:scale-105',
                )}
                style={{ backgroundColor: c.hex }}
                aria-label={c.name}
              />
            ))}
          </div>
          <p className="text-sm font-medium text-dark">{color.name}</p>
        </div>
      </div>
    </section>
  )
}
