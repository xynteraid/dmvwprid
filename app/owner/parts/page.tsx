import type { Metadata } from 'next'
import { Shield, Lightbulb, Battery, Disc3, Droplets, CircleDot, Truck, Sparkles } from 'lucide-react'
import SectionHeader from '@/components/ui/SectionHeader'

export const metadata: Metadata = {
  title: 'Parts',
  description: 'Genuine Volkswagen parts and accessories. Order original OEM parts for your VW.',
}

const categories = [
  { icon: Shield, title: 'Body & Paintwork', desc: 'Body panels, paint spray, touch-up sticks.' },
  { icon: Lightbulb, title: 'Glass, Light & Visibility', desc: 'Windscreens, wiper blades, headlights.' },
  { icon: Battery, title: 'Batteries', desc: 'AGM batteries, start-stop technology.' },
  { icon: Disc3, title: 'Brakes', desc: 'Brake pads, discs, and fluid.' },
  { icon: Droplets, title: 'Engine Oil & Fluids', desc: 'Engine oil, coolant, brake fluid.' },
  { icon: CircleDot, title: 'Wheels & Tires', desc: 'Alloy wheels, tires, TPMS sensors.' },
  { icon: Truck, title: 'Transport Accessories', desc: 'Roof racks, cargo boxes, tow bars.' },
  { icon: Sparkles, title: 'Lifestyle Accessories', desc: 'Floor mats, seat covers, dash cams.' },
]

export default function PartsPage() {
  return (
    <>
      <section className="bg-vw-gradient -mt-16 pt-36 pb-20 md:-mt-20 md:pt-48 md:pb-28">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12">
          <p className="text-xs font-medium uppercase tracking-[0.12em] text-white/40">Owner</p>
          <h1 className="mt-3 font-display text-[clamp(2rem,4vw,4rem)] leading-tight text-white">
            Genuine Parts & Accessories
          </h1>
          <p className="mt-4 max-w-lg text-base text-white/60">
            Only the best for your Volkswagen. Browse our catalog of genuine OEM parts and accessories.
          </p>
        </div>
      </section>

      <section className="py-20 md:py-32">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12">
          <SectionHeader eyebrow="Categories" title="Parts Catalog" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 md:gap-8">
            {categories.map((cat) => {
              const Icon = cat.icon
              return (
                <div key={cat.title} className="rounded-2xl bg-surface p-8 shadow-[var(--shadow-card)] transition-shadow duration-300 hover:shadow-[var(--shadow-card-hover)]">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-vw-blue/5">
                    <Icon size={24} className="text-vw-blue" />
                  </div>
                  <h3 className="mt-5 text-base font-bold text-dark">{cat.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{cat.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
}
