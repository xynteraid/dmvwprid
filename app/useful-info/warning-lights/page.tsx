import type { Metadata } from 'next'
import { cn } from '@/lib/utils'
import SectionHeader from '@/components/ui/SectionHeader'

export const metadata: Metadata = {
  title: 'Warning Lights',
  description: 'Understand your Volkswagen dashboard warning lights. Learn what each indicator means and what action to take.',
}

interface WarningLight {
  name: string
  description: string
  severity: 'red' | 'yellow' | 'green'
}

const warningLights: WarningLight[] = [
  { name: 'Check Engine', description: 'Engine malfunction detected. Have your vehicle inspected as soon as possible.', severity: 'red' },
  { name: 'Oil Pressure', description: 'Low oil pressure warning. Stop the vehicle immediately and check oil level.', severity: 'red' },
  { name: 'Coolant Temperature', description: 'Engine is overheating. Pull over safely and let the engine cool down.', severity: 'red' },
  { name: 'Battery', description: 'Charging system failure. Battery is not being charged properly.', severity: 'red' },
  { name: 'Airbag / SRS', description: 'Airbag system malfunction. Have the system inspected immediately.', severity: 'red' },
  { name: 'Brake System', description: 'Brake system warning. Check brake fluid level and brake pad wear.', severity: 'red' },
  { name: 'Low Fuel', description: 'Fuel level is low. Refuel at the nearest station.', severity: 'yellow' },
  { name: 'Tire Pressure (TPMS)', description: 'One or more tires have low pressure. Check and inflate tires.', severity: 'yellow' },
  { name: 'ABS', description: 'Anti-lock braking system fault. Normal braking still works but ABS is disabled.', severity: 'yellow' },
  { name: 'Traction Control', description: 'Traction control system is active or has a fault.', severity: 'yellow' },
  { name: 'Service Due', description: 'Scheduled maintenance is due. Book your service appointment.', severity: 'yellow' },
  { name: 'Door Ajar', description: 'One or more doors are not fully closed. Check all doors.', severity: 'green' },
  { name: 'Seatbelt', description: 'Seatbelt reminder. Fasten your seatbelt before driving.', severity: 'green' },
  { name: 'Parking Lights', description: 'Parking lights are on. This is an informational indicator.', severity: 'green' },
]

const severityColors = {
  red: 'bg-accent-red/10 text-accent-red border-accent-red/20',
  yellow: 'bg-amber-50 text-amber-700 border-amber-200',
  green: 'bg-emerald-50 text-emerald-700 border-emerald-200',
}

const severityLabels = {
  red: 'Immediate Action',
  yellow: 'Attention Required',
  green: 'Information',
}

export default function WarningLightsPage() {
  return (
    <>
      <section className="bg-vw-gradient -mt-16 pt-36 pb-20 md:-mt-20 md:pt-48 md:pb-28">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12">
          <p className="text-xs font-medium uppercase tracking-[0.12em] text-white/40">Useful Info</p>
          <h1 className="mt-3 font-display text-[clamp(2rem,4vw,4rem)] leading-tight text-white">Warning Lights</h1>
          <p className="mt-4 max-w-lg text-base text-white/60">
            Understand what your dashboard indicators mean and what action to take.
          </p>
        </div>
      </section>

      <section className="py-20 md:py-32">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12">
          <SectionHeader eyebrow="Dashboard Guide" title="Warning Light Reference" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 md:gap-6">
            {warningLights.map((light) => (
              <div key={light.name} className={cn('rounded-2xl border p-6', severityColors[light.severity])}>
                <span className="text-xs font-medium uppercase tracking-widest opacity-70">
                  {severityLabels[light.severity]}
                </span>
                <h3 className="mt-2 text-base font-bold">{light.name}</h3>
                <p className="mt-2 text-sm leading-relaxed opacity-80">{light.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
