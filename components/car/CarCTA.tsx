'use client'

import Link from 'next/link'
import { CalendarCheck, MessageCircle, Calculator } from 'lucide-react'
import { motion } from 'framer-motion'
import { fadeUp } from '@/lib/animations'
import { buildWALink, waMessageTestDrive } from '@/lib/whatsapp'

interface CarCTAProps {
  carName: string
  whatsappNumber: string
}

export default function CarCTA({ carName, whatsappNumber }: CarCTAProps) {
  return (
    <section className="bg-vw-gradient py-20 md:py-32">
      <div className="mx-auto max-w-[1280px] px-6 md:px-12">
        <motion.div
          variants={fadeUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: '-80px' }}
          className="text-center"
        >
          <h2 className="font-display text-[clamp(1.75rem,3vw,3rem)] leading-tight text-white">
            Interested in the {carName}?
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-base text-white/60">
            Schedule a test drive, talk to our team, or explore financing options.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href={buildWALink(whatsappNumber, waMessageTestDrive(carName))}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-medium text-vw-blue transition-all duration-200 hover:bg-white/90"
            >
              <CalendarCheck size={16} />
              Schedule Test Drive
            </a>
            <a
              href={buildWALink(whatsappNumber, waMessageTestDrive(carName))}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/30 px-8 py-3.5 text-sm font-medium text-white transition-all duration-200 hover:bg-white/10"
            >
              <MessageCircle size={16} />
              Contact via WhatsApp
            </a>
            <Link
              href="/kredit"
              className="inline-flex items-center gap-2 rounded-full border border-white/30 px-8 py-3.5 text-sm font-medium text-white transition-all duration-200 hover:bg-white/10"
            >
              <Calculator size={16} />
              Financing Calculator
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
