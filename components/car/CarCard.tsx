'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { resolveImage } from '@/lib/image'
import { formatRupiah } from '@/lib/utils'
import Badge from '@/components/ui/Badge'
import type { CarListItem } from '@/types'
import { fadeUp } from '@/lib/animations'

interface CarCardProps {
  car: CarListItem
}

export default function CarCard({ car }: CarCardProps) {
  return (
    <motion.div
      variants={fadeUp}
      className="group rounded-2xl bg-surface transition-all duration-500 hover:shadow-[var(--shadow-card-hover)]"
    >
      <Link href={`/cars/${car.slug.current}`} className="block p-6">
        {/* Badge */}
        <div className="flex items-center justify-between">
          <p className="text-xs font-medium uppercase tracking-[0.15em] text-muted">
            {car.category}
          </p>
          {car.badge && (
            <Badge variant={car.fuel === 'Listrik' ? 'blue' : 'red'}>
              {car.badge}
            </Badge>
          )}
        </div>

        {/* Car Image */}
        <div className="relative mx-auto aspect-[16/9] w-full overflow-hidden">
          <Image
            src={resolveImage(car.thumbnail, 800, 450)}
            alt={car.name}
            fill
            className="object-contain transition-transform duration-700 ease-out group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            unoptimized
          />
        </div>

        {/* Info */}
        <div className="mt-2">
          <h3 className="text-lg font-bold text-dark">{car.name}</h3>
          <p className="mt-0.5 text-sm text-muted">{car.tagline}</p>
          <p className="mt-2 text-base font-bold text-dark">
            From {formatRupiah(car.price)}
          </p>

          {/* Highlights */}
          {car.highlights && car.highlights.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {car.highlights.slice(0, 3).map((h, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center rounded-full border border-border px-3 py-1 text-xs text-muted"
                >
                  {h.label}
                </span>
              ))}
            </div>
          )}

          {/* CTA */}
          <div className="mt-4 flex items-center gap-1.5 text-sm font-medium text-vw-blue opacity-0 transition-all duration-300 group-hover:opacity-100">
            Learn More
            <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-1" />
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
