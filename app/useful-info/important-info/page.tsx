import type { Metadata } from 'next'
import { Phone, FileText, Shield, Clock } from 'lucide-react'
import SectionHeader from '@/components/ui/SectionHeader'

export const metadata: Metadata = {
  title: 'Important Info',
  description: 'Roadside assistance, declaration of conformity, and important information for Volkswagen owners.',
}

export default function ImportantInfoPage() {
  return (
    <>
      <section className="bg-vw-gradient -mt-16 pt-36 pb-20 md:-mt-20 md:pt-48 md:pb-28">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12">
          <p className="text-xs font-medium uppercase tracking-[0.12em] text-white/40">Useful Info</p>
          <h1 className="mt-3 font-display text-[clamp(2rem,4vw,4rem)] leading-tight text-white">Important Information</h1>
          <p className="mt-4 max-w-lg text-base text-white/60">
            Essential resources for Volkswagen owners.
          </p>
        </div>
      </section>

      <section className="py-20 md:py-32">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12">
          <div className="grid gap-10 lg:grid-cols-2">
            {/* Roadside Assistance */}
            <div className="rounded-2xl bg-surface p-8 shadow-[var(--shadow-card)] md:p-10">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent-red/10">
                <Phone size={24} className="text-accent-red" />
              </div>
              <h2 className="mt-6 text-xl font-bold text-dark">Roadside Assistance</h2>
              <p className="mt-3 text-base leading-relaxed text-muted">
                Available 24/7 for all Volkswagen owners. Our roadside assistance team will help you with breakdowns, flat tires, battery issues, and more.
              </p>
              <div className="mt-6 flex flex-col gap-3">
                <div className="flex items-center gap-3 text-sm">
                  <Phone size={14} className="text-vw-blue" />
                  <span className="font-medium text-dark">Emergency: 0-800-VW-HELP</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Clock size={14} className="text-vw-blue" />
                  <span className="text-muted">Available 24 hours, 7 days a week</span>
                </div>
              </div>
              <h3 className="mt-6 text-sm font-bold text-dark">Services Available</h3>
              <ul className="mt-3 flex flex-col gap-2">
                {['Battery jump start', 'Flat tire change', 'Emergency fuel delivery', 'Towing service', 'Lockout assistance'].map((s) => (
                  <li key={s} className="flex items-start gap-2 text-sm text-muted">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-vw-blue" />
                    {s}
                  </li>
                ))}
              </ul>
            </div>

            {/* Declaration of Conformity */}
            <div className="rounded-2xl bg-surface p-8 shadow-[var(--shadow-card)] md:p-10">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-vw-blue/10">
                <Shield size={24} className="text-vw-blue" />
              </div>
              <h2 className="mt-6 text-xl font-bold text-dark">Declaration of Conformity</h2>
              <p className="mt-3 text-base leading-relaxed text-muted">
                All Volkswagen vehicles sold through our dealership comply with applicable Indonesian regulations and emissions standards.
              </p>
              <p className="mt-4 text-base leading-relaxed text-muted">
                The Declaration of Conformity (DoC) certifies that each vehicle meets the required safety, environmental, and quality standards as set by the relevant authorities.
              </p>
              <div className="mt-6 flex items-center gap-3">
                <FileText size={14} className="text-vw-blue" />
                <a href="#" className="text-sm font-medium text-vw-blue transition-colors hover:text-vw-blue-hover">
                  Download Declaration of Conformity (PDF)
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
