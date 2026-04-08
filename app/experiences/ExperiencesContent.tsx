'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Play, Volume2, VolumeX } from 'lucide-react'
import { fadeUp, staggerContainer } from '@/lib/animations'

const MAIN_VIDEO_ID = 'mhkrHf5SpRo'

const secondaryVideos = [
  {
    id: 'S-PFKSA2i1c',
    title: 'The All-Electric ID. Buzz',
    description: 'A modern icon meets zero emissions. Experience the ID. Buzz in all its glory.',
  },
  {
    id: 'h74eR9CBPdE',
    title: 'The New T-Cross',
    description: 'The vibrant excitement of the new T-Cross. Compact SUV, maximum personality.',
  },
  {
    id: '0wIwwXXRV-g',
    title: 'All-New Tiguan Allspace',
    description: 'More space, more comfort, more technology. The Tiguan Allspace redefines the family SUV.',
  },
]

export default function ExperiencesContent() {
  const [mainUnmuted, setMainUnmuted] = useState(false)
  const [playingId, setPlayingId] = useState<string | null>(null)

  return (
    <>
      {/* Page Header */}
      <section className="bg-dark -mt-16 pt-36 pb-12 md:-mt-20 md:pt-48 md:pb-16">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12">
          <motion.div
            variants={fadeUp}
            initial="initial"
            animate="animate"
          >
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/30">
              Volkswagen
            </p>
            <h1 className="mt-3 font-display text-[clamp(2.5rem,5vw,5rem)] leading-[1.05] text-white">
              Experiences
            </h1>
            <p className="mt-4 max-w-lg text-lg text-white/40">
              Life is better behind the wheel. Discover our world through film.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Video -- autoplay muted */}
      <section className="bg-dark pb-16 md:pb-24">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12">
          <motion.div
            variants={fadeUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: '-80px' }}
            className="group relative overflow-hidden rounded-2xl border border-white/[0.06]"
          >
            <div className="relative aspect-video w-full">
              <iframe
                src={`https://www.youtube.com/embed/${MAIN_VIDEO_ID}?autoplay=1&mute=${mainUnmuted ? 0 : 1}&loop=1&playlist=${MAIN_VIDEO_ID}&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1`}
                title="Volkswagen Experience - Featured"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 h-full w-full border-0 scale-[1.02]"
              />

              {/* Bottom overlay */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-dark/60 via-dark/20 to-transparent p-8 md:p-12">
                <p className="text-sm font-medium text-white/40">Official Film</p>
                <h2 className="mt-1 font-display text-2xl text-white md:text-3xl">
                  Volkswagen Experience 2026
                </h2>
              </div>

              {/* Mute/unmute toggle */}
              <button
                type="button"
                onClick={() => setMainUnmuted(!mainUnmuted)}
                className="absolute right-4 bottom-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-all duration-200 hover:bg-white/20 md:right-6 md:bottom-6"
                aria-label={mainUnmuted ? 'Mute' : 'Unmute'}
              >
                {mainUnmuted ? <Volume2 size={16} /> : <VolumeX size={16} />}
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Secondary Videos */}
      <section className="bg-dark-gradient py-16 md:py-24">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12">
          <motion.div
            variants={fadeUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: '-80px' }}
            className="mb-12"
          >
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/30">
              More Films
            </p>
            <h2 className="mt-3 font-display text-[clamp(1.75rem,3vw,3rem)] leading-[1.1] text-white">
              From the Volkswagen World
            </h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: '-80px' }}
            className="grid gap-6 md:grid-cols-3 md:gap-8"
          >
            {secondaryVideos.map((video) => {
              const isPlaying = playingId === video.id
              return (
                <motion.div
                  key={video.id}
                  variants={fadeUp}
                  className="group overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02]"
                >
                  <div className="relative aspect-video w-full">
                    {isPlaying ? (
                      <iframe
                        src={`https://www.youtube.com/embed/${video.id}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
                        title={video.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="absolute inset-0 h-full w-full border-0"
                      />
                    ) : (
                      <button
                        type="button"
                        onClick={() => setPlayingId(video.id)}
                        className="relative block h-full w-full"
                        aria-label={`Play ${video.title}`}
                      >
                        {/* YouTube thumbnail */}
                        <img
                          src={`https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`}
                          alt={video.title}
                          className="absolute inset-0 h-full w-full object-cover"
                        />
                        <div className="absolute inset-0 bg-dark/30 transition-colors duration-300 group-hover:bg-dark/10" />

                        {/* Play button */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm transition-all duration-300 group-hover:scale-110 group-hover:bg-white/30">
                            <Play size={24} className="ml-1 text-white" fill="white" />
                          </div>
                        </div>
                      </button>
                    )}
                  </div>

                  {/* Info */}
                  <div className="p-6">
                    <h3 className="text-base font-bold text-white">{video.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/40">
                      {video.description}
                    </p>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-dark py-16 md:py-24">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12">
          <motion.div
            variants={fadeUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: '-80px' }}
            className="grid grid-cols-3 gap-4 sm:gap-8"
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
    </>
  )
}
