'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import SectionHeader from '@/components/ui/SectionHeader'
import type { TechnicalSpec, SpecRow } from '@/types'

interface TechnicalSpecAccordionProps {
  spec: TechnicalSpec
}

const categories: { key: keyof TechnicalSpec; label: string }[] = [
  { key: 'engine', label: 'Engine' },
  { key: 'performance', label: 'Performance' },
  { key: 'dimension', label: 'Dimensions' },
  { key: 'capacity', label: 'Capacity' },
  { key: 'features', label: 'Features' },
]

export default function TechnicalSpecAccordion({ spec }: TechnicalSpecAccordionProps) {
  const [openIndex, setOpenIndex] = useState(0)

  const validCategories = categories.filter(
    (cat) => spec[cat.key] && spec[cat.key]!.length > 0,
  )

  if (validCategories.length === 0) return null

  return (
    <section className="bg-surface py-20 md:py-32">
      <div className="mx-auto max-w-[1280px] px-6 md:px-12">
        <SectionHeader
          eyebrow="Specifications"
          title="Technical Details"
        />

        <div className="mx-auto max-w-3xl">
          {validCategories.map((cat, idx) => {
            const rows = spec[cat.key] as SpecRow[]
            const isOpen = openIndex === idx

            return (
              <div key={cat.key} className="border-b border-border">
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? -1 : idx)}
                  className="flex w-full items-center justify-between py-5 text-left"
                >
                  <span className="text-base font-bold text-dark">{cat.label}</span>
                  <ChevronDown
                    size={18}
                    className={cn(
                      'text-muted transition-transform duration-200',
                      isOpen && 'rotate-180',
                    )}
                  />
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="pb-6">
                        {rows.map((row, rowIdx) => (
                          <div
                            key={rowIdx}
                            className={cn(
                              'flex items-center justify-between py-3 text-sm',
                              rowIdx !== rows.length - 1 && 'border-b border-border/50',
                            )}
                          >
                            <span className="text-muted">{row.label}</span>
                            <span className="font-medium text-dark">{row.value}</span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
