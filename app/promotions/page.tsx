import type { Metadata } from 'next'
import { client } from '@/sanity/lib/client'
import { PROMOS_QUERY } from '@/sanity/lib/queries'
import type { PromoListItem } from '@/types'
import { mockPromos } from '@/data/mock'
import PromosListing from './PromosListing'

export const metadata: Metadata = {
  title: 'Promotions',
  description:
    'Explore exclusive Volkswagen promotions, special financing rates, and limited-time offers at VW Puri Indah.',
}

export default async function PromotionsPage() {
  let promos: PromoListItem[] = mockPromos
  try {
    const fetched = await client.fetch<PromoListItem[]>(PROMOS_QUERY, {}, { next: { revalidate: 60 } })
    if (fetched && fetched.length > 0) promos = fetched
  } catch {
    // Use mock data
  }

  return (
    <>
      <section className="bg-vw-gradient -mt-16 pt-36 pb-20 md:-mt-20 md:pt-48 md:pb-28">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12">
          <p className="text-xs font-medium uppercase tracking-[0.12em] text-white/40">
            Special Offers
          </p>
          <h1 className="mt-3 font-display text-[clamp(2rem,4vw,4rem)] leading-tight text-white">
            Promotions
          </h1>
          <p className="mt-4 max-w-lg text-base text-white/60">
            Take advantage of our exclusive deals on Volkswagen vehicles and services.
          </p>
        </div>
      </section>

      <PromosListing promos={promos} />
    </>
  )
}
