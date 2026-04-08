'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

interface HeroSlide {
  image: string
  headline: string
  sub: string
}

interface HeroBannerProps {
  slides: HeroSlide[]
}

export default function HeroBanner({ slides }: HeroBannerProps) {
  const [current, setCurrent] = useState(0)

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length)
  }, [slides.length])

  useEffect(() => {
    const timer = setInterval(next, 5000)
    return () => clearInterval(timer)
  }, [next])

  const slide = slides[current]

  return (
    <section className="relative h-screen w-full overflow-hidden bg-dark -mt-16 md:-mt-20">
      {/* Background Images with Ken Burns */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          <Image
            src={slide.image}
            alt={slide.headline}
            fill
            className="object-cover"
            preload
            sizes="100vw"
            unoptimized
          />
        </motion.div>
      </AnimatePresence>

      {/* Cinematic gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/40 to-dark/20" />
      <div className="absolute inset-0 bg-gradient-to-r from-dark/50 to-transparent" />

      {/* Content */}
      <div className="relative z-10 mx-auto flex h-full max-w-[1280px] flex-col justify-end px-6 pb-28 md:px-12 md:pb-36">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl"
          >
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-xs font-medium uppercase tracking-[0.2em] text-white/40"
            >
              Volkswagen Puri Indah
            </motion.p>
            <h1 className="mt-4 font-display text-[clamp(3rem,7vw,7rem)] leading-[0.95] tracking-[-0.03em] text-white">
              {slide.headline}
            </h1>
            <p className="mt-6 text-lg text-white/50 md:text-xl">
              {slide.sub}
            </p>
          </motion.div>
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-10 flex flex-col gap-4 sm:flex-row"
        >
          <Link
            href="/cars"
            className="group inline-flex items-center gap-3 rounded-full bg-white px-8 py-4 text-sm font-medium text-dark transition-all duration-300 hover:gap-4 hover:bg-white/95"
          >
            Explore Collection
            <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-full border border-white/20 px-8 py-4 text-sm font-medium text-white transition-all duration-300 hover:border-white/40 hover:bg-white/5"
          >
            Book a Test Drive
          </Link>
        </motion.div>

        {/* Slide indicators */}
        <div className="absolute bottom-12 right-6 flex items-center gap-4 md:right-12">
          <span className="text-xs font-medium tabular-nums text-white/30">
            {String(current + 1).padStart(2, '0')}
          </span>
          <div className="flex items-center gap-2">
            {slides.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setCurrent(idx)}
                className={cn(
                  'h-px rounded-full transition-all duration-500',
                  idx === current ? 'w-12 bg-white' : 'w-6 bg-white/20',
                )}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
          <span className="text-xs font-medium tabular-nums text-white/30">
            {String(slides.length).padStart(2, '0')}
          </span>
        </div>
      </div>
    </section>
  )
}
