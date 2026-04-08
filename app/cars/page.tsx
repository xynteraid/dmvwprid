import type { Metadata } from 'next'
import { client } from '@/sanity/lib/client'
import { CARS_QUERY } from '@/sanity/lib/queries'
import type { CarListItem } from '@/types'
import { mockCars } from '@/data/mock'
import CarsListing from './CarsListing'

export const metadata: Metadata = {
  title: 'Cars',
  description:
    'Explore the full range of Volkswagen vehicles. Find your perfect SUV, sedan, hatchback, or electric car.',
}

export default async function CarsPage() {
  let cars: CarListItem[] = mockCars

  try {
    const fetched = await client.fetch<CarListItem[]>(CARS_QUERY, {}, { next: { revalidate: 60 } })
    if (fetched && fetched.length > 0) cars = fetched
  } catch {
    // Use mock data
  }

  return (
    <>
      <section className="bg-vw-gradient -mt-16 pt-36 pb-20 md:-mt-20 md:pt-48 md:pb-28">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/30">
            The Collection
          </p>
          <h1 className="mt-3 font-display text-[clamp(2rem,4vw,4rem)] leading-tight text-white">
            Volkswagen Vehicles
          </h1>
          <p className="mt-4 max-w-lg text-base text-white/50">
            Discover the full lineup of Volkswagen cars, from compact SUVs to
            electric vehicles.
          </p>
        </div>
      </section>

      <CarsListing cars={cars} />
    </>
  )
}
