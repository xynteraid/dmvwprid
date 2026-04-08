'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import { ArrowRight, Play, Volume2, VolumeX } from 'lucide-react'
import { motion } from 'framer-motion'
import { fadeUp } from '@/lib/animations'

const VIDEO_ID = 'mhkrHf5SpRo'

export default function ExperiencesTeaser() {
  const [unmuted, setUnmuted] = useState(false)
  const iframeRef = useRef<HTMLIFrameElement>(null)

  return (
    <section className="bg-dark-gradient py-24 md:py-40 overflow-hidden">
      <div className="mx-auto max-w-[1280px] px-6 md:px-12">
        {/* Header */}
        <motion.div
          variants={fadeUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: '-80px' }}
          className="mb-12 flex flex-col gap-6 md:mb-16 md:flex-row md:items-end md:justify-between"
        >
          <div className="max-w-lg">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/30">
              Beyond Driving
            </p>
            <h2 className="mt-3 font-display text-[clamp(2rem,4vw,4rem)] leading-[1.05] text-white">
              Volkswagen Experiences
            </h2>
            <p className="mt-4 text-base text-white/40">
              Join a community of passionate drivers. From road trips across Indonesia to exclusive
              track days.
            </p>
          </div>
          <Link
            href="/experiences"
            className="group inline-flex items-center gap-2 text-sm font-medium text-white/50 transition-all duration-200 hover:gap-3 hover:text-white"
          >
            All Experiences
            <ArrowRight
              size={14}
              className="transition-transform duration-200 group-hover:translate-x-1"
            />
          </Link>
        </motion.div>

        {/* Large video card -- autoplay muted */}
        <motion.div
          variants={fadeUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: '-80px' }}
          className="group relative overflow-hidden rounded-2xl border border-white/[0.06]"
        >
          <div className="relative aspect-video w-full">
            <iframe
              ref={iframeRef}
              src={`https://www.youtube.com/embed/${VIDEO_ID}?autoplay=1&mute=${unmuted ? 0 : 1}&loop=1&playlist=${VIDEO_ID}&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1`}
              title="Volkswagen Experience"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 h-full w-full border-0 scale-[1.02]"
            />

            {/* Bottom overlay */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-dark/60 via-dark/20 to-transparent p-8 md:p-12">
              <p className="text-sm font-medium text-white/40">Official Film</p>
              <h3 className="mt-1 font-display text-2xl text-white md:text-3xl">
                Volkswagen Ice Experience 2026
              </h3>
            </div>

            {/* Mute/unmute toggle */}
            <button
              type="button"
              onClick={() => setUnmuted(!unmuted)}
              className="absolute right-4 bottom-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-all duration-200 hover:bg-white/20 md:right-6 md:bottom-6"
              aria-label={unmuted ? 'Mute' : 'Unmute'}
            >
              {unmuted ? <Volume2 size={16} /> : <VolumeX size={16} />}
            </button>
          </div>
        </motion.div>

        {/* Stats row below video */}
        <motion.div
          variants={fadeUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: '-80px' }}
          className="mt-12 grid grid-cols-3 gap-8"
        >
          {[
            { value: '1,200+', label: 'Km of road trips' },
            { value: '24', label: 'Events this year' },
            { value: '500+', label: 'Community members' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-2xl font-bold text-white md:text-3xl">{stat.value}</p>
              <p className="mt-1 text-xs text-white/30 md:text-sm">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
