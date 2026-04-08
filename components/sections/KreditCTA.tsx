'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { fadeUp } from '@/lib/animations'

export default function KreditCTA() {
  return (
    <section className="relative overflow-hidden py-24 md:py-40">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[var(--gradient-subtle)]" />
      <div className="absolute right-0 top-0 h-[600px] w-[600px] translate-x-1/3 -translate-y-1/3 rounded-full bg-vw-blue/[0.03] blur-3xl" />

      <div className="relative mx-auto max-w-[1280px] px-6 md:px-12">
        <motion.div
          variants={fadeUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: '-80px' }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted">
            Financing
          </p>
          <h2 className="mt-4 font-display text-[clamp(2rem,4vw,4rem)] leading-[1.05] text-dark">
            Own Your Dream Volkswagen Today
          </h2>
          <p className="mx-auto mt-6 max-w-md text-base text-muted">
            Calculate your monthly installments and find the perfect financing
            plan that suits your budget. Competitive rates starting from 2.99% p.a.
          </p>

          <div className="mt-10 flex flex-col items-center gap-8">
            {/* Quick stats */}
            <div className="flex items-center gap-6 sm:gap-8 md:gap-12">
              <div className="text-center">
                <p className="text-2xl font-bold text-dark">2.99%</p>
                <p className="mt-1 text-xs text-muted">Starting rate</p>
              </div>
              <div className="h-8 w-px bg-border" />
              <div className="text-center">
                <p className="text-2xl font-bold text-dark">60</p>
                <p className="mt-1 text-xs text-muted">Max months</p>
              </div>
              <div className="h-8 w-px bg-border" />
              <div className="text-center">
                <p className="text-2xl font-bold text-dark">10%</p>
                <p className="mt-1 text-xs text-muted">Min down payment</p>
              </div>
            </div>

            <Link
              href="/kredit"
              className="group inline-flex items-center gap-3 rounded-full bg-vw-blue px-10 py-4 text-sm font-medium text-white transition-all duration-300 hover:gap-4 hover:bg-vw-blue-hover"
            >
              Calculate Your Installment
              <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
