'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

export default function BrandStatement() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.3, 1, 1, 0.3])
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [60, 0, -60])

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-vw-gradient py-32 md:py-48"
    >
      {/* Decorative elements */}
      <div className="absolute left-0 top-0 h-full w-px bg-gradient-to-b from-transparent via-white/[0.06] to-transparent" />
      <div className="absolute right-0 top-0 h-full w-px bg-gradient-to-b from-transparent via-white/[0.06] to-transparent" />
      <div className="absolute left-1/4 top-0 h-full w-px bg-gradient-to-b from-transparent via-white/[0.03] to-transparent" />
      <div className="absolute left-2/4 top-0 h-full w-px bg-gradient-to-b from-transparent via-white/[0.03] to-transparent" />
      <div className="absolute left-3/4 top-0 h-full w-px bg-gradient-to-b from-transparent via-white/[0.03] to-transparent" />

      <div className="relative mx-auto max-w-[1280px] px-6 md:px-12">
        <motion.div style={{ opacity, y }} className="mx-auto max-w-4xl text-center">
          <Image
            src="/vw-logo.svg"
            alt="Volkswagen"
            width={56}
            height={56}
            className="mx-auto mb-6 brightness-0 invert opacity-20"
          />
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-white/25">
            Das Auto
          </p>

          <h2 className="mt-8 font-display text-[clamp(2.5rem,5vw,5rem)] leading-[1] tracking-[-0.02em] text-white">
            People First.{' '}
            <span className="text-white/30">Then Everything Else Follows.</span>
          </h2>

          <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-white/40">
            Volkswagen means &ldquo;people&apos;s car.&rdquo; For over eight decades, that
            philosophy has driven every decision -- from safety engineering to
            intuitive design. At VW Puri Indah, we carry that commitment
            forward.
          </p>

          <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/cars"
              className="group inline-flex items-center gap-3 rounded-full border border-white/20 px-8 py-4 text-sm font-medium text-white transition-all duration-300 hover:border-white/40 hover:bg-white/5"
            >
              Explore the Lineup
              <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center px-8 py-4 text-sm font-medium text-white/50 transition-colors duration-200 hover:text-white"
            >
              Visit the Showroom
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
