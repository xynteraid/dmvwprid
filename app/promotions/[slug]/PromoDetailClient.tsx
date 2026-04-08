'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

interface PromoDetailClientProps {
  terms: string[]
}

export default function PromoDetailClient({ terms }: PromoDetailClientProps) {
  const [open, setOpen] = useState(false)

  return (
    <div className="mt-10 rounded-2xl border border-border">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between px-6 py-5 text-left"
      >
        <span className="text-base font-bold text-dark">Terms & Conditions</span>
        <ChevronDown
          size={18}
          className={cn(
            'text-muted transition-transform duration-200',
            open && 'rotate-180',
          )}
        />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <ul className="flex flex-col gap-2 border-t border-border px-6 py-5">
              {terms.map((term, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm text-dark/80">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-muted" />
                  {term}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
