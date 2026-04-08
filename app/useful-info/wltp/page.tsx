import type { Metadata } from 'next'
import SectionHeader from '@/components/ui/SectionHeader'

export const metadata: Metadata = {
  title: 'WLTP',
  description: 'Learn about the Worldwide Harmonised Light Vehicles Test Procedure (WLTP) and what it means for your Volkswagen.',
}

const wltpData = [
  { label: 'Test Cycle', value: 'WLTP (replaces NEDC)' },
  { label: 'Duration', value: '30 minutes' },
  { label: 'Distance', value: '23.25 km' },
  { label: 'Average Speed', value: '46.5 km/h' },
  { label: 'Maximum Speed', value: '131.3 km/h' },
  { label: 'Temperature', value: '23 C' },
  { label: 'Phases', value: 'Low, Medium, High, Extra High' },
]

export default function WltpPage() {
  return (
    <>
      <section className="bg-vw-gradient -mt-16 pt-36 pb-20 md:-mt-20 md:pt-48 md:pb-28">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12">
          <p className="text-xs font-medium uppercase tracking-[0.12em] text-white/40">Useful Info</p>
          <h1 className="mt-3 font-display text-[clamp(2rem,4vw,4rem)] leading-tight text-white">WLTP</h1>
          <p className="mt-4 max-w-lg text-base text-white/60">
            Understanding the Worldwide Harmonised Light Vehicles Test Procedure.
          </p>
        </div>
      </section>

      <section className="py-20 md:py-32">
        <div className="mx-auto max-w-3xl px-6 md:px-12">
          <h2 className="text-2xl font-bold text-dark">What is WLTP?</h2>
          <p className="mt-4 text-base leading-relaxed text-muted">
            The WLTP (Worldwide Harmonised Light Vehicles Test Procedure) is a global standard for measuring fuel consumption, CO2 emissions, and electric range for passenger cars. It replaced the older NEDC cycle to provide more realistic and comparable results.
          </p>
          <p className="mt-4 text-base leading-relaxed text-muted">
            WLTP testing is conducted under more stringent conditions and better reflects real-world driving, including higher speeds, longer test distances, and more dynamic driving behavior.
          </p>

          <div className="mt-12">
            <SectionHeader eyebrow="Test Parameters" title="WLTP at a Glance" align="left" />
            <div className="rounded-2xl border border-border">
              {wltpData.map((row, idx) => (
                <div key={idx} className={`flex items-center justify-between px-6 py-4 text-sm ${idx !== wltpData.length - 1 ? 'border-b border-border' : ''}`}>
                  <span className="text-muted">{row.label}</span>
                  <span className="font-medium text-dark">{row.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
