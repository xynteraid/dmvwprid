'use client'

import { useRef, useEffect } from 'react'
import Image from 'next/image'
import { resolveImage } from '@/lib/image'
import SectionHeader from '@/components/ui/SectionHeader'
import type { SpecSection } from '@/types'

interface SpecStorytellingProps {
  sections: SpecSection[]
}

export default function SpecStorytelling({ sections }: SpecStorytellingProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let ctx: { revert: () => void } | null = null

    const initGsap = async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      ctx = gsap.context(() => {
        sections.forEach((_, idx) => {
          const imageEl = containerRef.current?.querySelector(`[data-spec-image="${idx}"]`)
          const textEl = containerRef.current?.querySelector(`[data-spec-text="${idx}"]`)
          const sectionEl = containerRef.current?.querySelector(`[data-spec-section="${idx}"]`)

          if (!imageEl || !textEl || !sectionEl) return

          const isEven = idx % 2 === 0

          gsap.fromTo(
            imageEl,
            { x: isEven ? 80 : -80, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: 0.8,
              ease: 'power3.out',
              scrollTrigger: { trigger: sectionEl, start: 'top 75%' },
            },
          )

          gsap.fromTo(
            textEl,
            { y: 40, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.6,
              ease: 'power3.out',
              scrollTrigger: { trigger: sectionEl, start: 'top 70%' },
            },
          )
        })
      }, containerRef)
    }

    initGsap()

    return () => {
      ctx?.revert()
    }
  }, [sections])

  return (
    <section className="py-20 md:py-32">
      <div className="mx-auto max-w-[1280px] px-6 md:px-12">
        <SectionHeader
          eyebrow="Features"
          title="Designed for Excellence"
        />

        <div ref={containerRef} className="flex flex-col gap-20 md:gap-32">
          {sections.map((section, idx) => {
            const isEven = idx % 2 === 0
            const imgSrc = resolveImage(section.image, 900, 675)
            const isMock = !!section.image._url
            return (
              <div
                key={idx}
                data-spec-section={idx}
                className={`grid items-center gap-10 lg:grid-cols-5 lg:gap-16 ${
                  isEven ? '' : 'lg:[direction:rtl]'
                }`}
              >
                {/* Image */}
                <div
                  data-spec-image={idx}
                  className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-bg lg:col-span-3 lg:[direction:ltr]"
                >
                  <Image
                    src={imgSrc}
                    alt={section.title}
                    fill
                    className={isMock ? 'object-contain p-4' : 'object-cover'}
                    unoptimized={isMock}
                    sizes="(max-width: 1024px) 100vw, 60vw"
                  />
                </div>

                {/* Text */}
                <div
                  data-spec-text={idx}
                  className="lg:col-span-2 lg:[direction:ltr]"
                >
                  <h3 className="text-xl font-bold text-dark md:text-2xl">
                    {section.title}
                  </h3>
                  <p className="mt-3 text-base leading-relaxed text-muted">
                    {section.description}
                  </p>
                  {section.highlights && section.highlights.length > 0 && (
                    <ul className="mt-5 flex flex-col gap-2">
                      {section.highlights.map((h, hIdx) => (
                        <li
                          key={hIdx}
                          className="flex items-start gap-2 text-sm text-dark"
                        >
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-vw-blue" />
                          {h}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
