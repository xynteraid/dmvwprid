'use client'

import { useState } from 'react'
import { Send } from 'lucide-react'
import { motion } from 'framer-motion'
import { fadeUp } from '@/lib/animations'

export default function NewsletterCTA() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setSubmitted(true)
    setEmail('')
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <section className="bg-surface py-20 md:py-32">
      <div className="mx-auto max-w-[1280px] px-6 md:px-12">
        <motion.div
          variants={fadeUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: '-80px' }}
          className="mx-auto max-w-lg text-center"
        >
          <p className="text-xs font-medium uppercase tracking-[0.12em] text-muted">
            Stay Updated
          </p>
          <h2 className="mt-3 text-[clamp(1.75rem,3vw,2.5rem)] font-bold leading-tight text-dark">
            Subscribe to Our Newsletter
          </h2>
          <p className="mt-3 text-sm text-muted">
            Get the latest updates on new models, promotions, and exclusive events.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 flex gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="flex-1 rounded-full border border-border bg-bg px-5 py-3 text-sm text-dark outline-none transition-colors duration-200 placeholder:text-muted/50 focus:border-vw-blue"
            />
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-full bg-vw-blue px-6 py-3 text-sm font-medium text-white transition-all duration-200 hover:bg-vw-blue-hover"
            >
              <Send size={14} />
              <span className="hidden sm:inline">Subscribe</span>
            </button>
          </form>

          {submitted && (
            <p className="mt-4 text-sm font-medium text-vw-blue">
              Thank you for subscribing!
            </p>
          )}
        </motion.div>
      </div>
    </section>
  )
}
