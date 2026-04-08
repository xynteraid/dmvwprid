'use client'

import { useState } from 'react'
import Image from 'next/image'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { resolveImage } from '@/lib/image'
import { fadeUp, staggerContainer } from '@/lib/animations'
import SectionHeader from '@/components/ui/SectionHeader'
import type { SanityImage } from '@/types'

interface CarGalleryProps {
  carName: string
  gallery: SanityImage[]
}

export default function CarGallery({ gallery, carName }: CarGalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const openLightbox = (idx: number) => setLightboxIndex(idx)
  const closeLightbox = () => setLightboxIndex(null)

  const goPrev = () => {
    if (lightboxIndex === null) return
    setLightboxIndex((lightboxIndex - 1 + gallery.length) % gallery.length)
  }

  const goNext = () => {
    if (lightboxIndex === null) return
    setLightboxIndex((lightboxIndex + 1) % gallery.length)
  }

  return (
    <section className="py-20 md:py-32">
      <div className="mx-auto max-w-[1280px] px-6 md:px-12">
        <SectionHeader eyebrow="Gallery" title="See Every Angle" />

        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6"
        >
          {gallery.map((img, idx) => {
            const isMock = !!img._url
            return (
              <motion.button
                key={idx}
                type="button"
                variants={fadeUp}
                onClick={() => openLightbox(idx)}
                className="group relative aspect-[4/3] overflow-hidden rounded-xl bg-bg"
              >
                <Image
                  src={resolveImage(img, 600, 450)}
                  alt={`${carName} gallery ${idx + 1}`}
                  fill
                  className={`transition-transform duration-500 group-hover:scale-105 ${isMock ? 'object-contain p-2' : 'object-cover'}`}
                  unoptimized={isMock}
                  sizes="(max-width: 640px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-dark/0 transition-colors duration-200 group-hover:bg-dark/10" />
              </motion.button>
            )
          })}
        </motion.div>
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-dark/95">
          <button
            type="button"
            onClick={closeLightbox}
            className="absolute top-6 right-6 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
            aria-label="Close gallery"
          >
            <X size={24} />
          </button>

          <button
            type="button"
            onClick={goPrev}
            className="absolute left-4 rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/20 md:left-8"
            aria-label="Previous image"
          >
            <ChevronLeft size={24} />
          </button>

          <div className="relative h-[70vh] w-[90vw] max-w-5xl">
            <Image
              src={resolveImage(gallery[lightboxIndex], 1600, 1000)}
              alt={`${carName} gallery ${lightboxIndex + 1}`}
              fill
              className="object-contain"
              unoptimized={!!(gallery[lightboxIndex] as { _url?: string })._url}
              sizes="90vw"
            />
          </div>

          <button
            type="button"
            onClick={goNext}
            className="absolute right-4 rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/20 md:right-8"
            aria-label="Next image"
          >
            <ChevronRight size={24} />
          </button>

          <p className="absolute bottom-6 text-sm text-white/50">
            {lightboxIndex + 1} / {gallery.length}
          </p>
        </div>
      )}
    </section>
  )
}
