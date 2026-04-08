import type { Metadata } from 'next'
import { client } from '@/sanity/lib/client'
import { CARS_MINIMAL_QUERY, SITE_SETTINGS_QUERY } from '@/sanity/lib/queries'
import type { CarMinimal, SiteSettings } from '@/types'
import { mockCarsMinimal, mockSettings } from '@/data/mock'
import KreditForm from '@/components/car/KreditForm'

export const metadata: Metadata = {
  title: 'Financing Calculator',
  description:
    'Calculate your monthly installments for any Volkswagen model. Estimate your down payment, tenure, and financing plan.',
}

export default async function KreditPage() {
  let cars: CarMinimal[] = mockCarsMinimal
  let settings: SiteSettings = mockSettings

  try {
    const [fetchedCars, fetchedSettings] = await Promise.all([
      client.fetch<CarMinimal[]>(CARS_MINIMAL_QUERY, {}, { next: { revalidate: 60 } }),
      client.fetch<SiteSettings>(SITE_SETTINGS_QUERY, {}, { next: { revalidate: 60 } }),
    ])
    if (fetchedCars && fetchedCars.length > 0) cars = fetchedCars
    if (fetchedSettings) settings = fetchedSettings
  } catch {
    // Use mock data
  }

  return (
    <>
      <section className="bg-vw-gradient -mt-16 pt-36 pb-20 md:-mt-20 md:pt-48 md:pb-28">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/30">
            Financing
          </p>
          <h1 className="mt-3 font-display text-[clamp(2rem,4vw,4rem)] leading-tight text-white">
            Financing Calculator
          </h1>
          <p className="mt-4 max-w-lg text-base text-white/50">
            Estimate your monthly installments and find the right plan for your budget.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12">
          <KreditForm cars={cars} whatsappNumber={settings.whatsappNumber} />
        </div>
      </section>
    </>
  )
}
