import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { client } from '@/sanity/lib/client'
import { CAR_QUERY, CAR_SLUGS_QUERY, SITE_SETTINGS_QUERY } from '@/sanity/lib/queries'
import type { Car, SiteSettings } from '@/types'
import { mockCarsDetail } from '@/data/mock-cars-detail'
import { mockSettings } from '@/data/mock'
import CarDetail from './CarDetail'

interface CarDetailPageProps {
  params: Promise<{ slug: string }>
}

async function fetchCar(slug: string): Promise<Car | null> {
  try {
    const car = await client.fetch<Car | null>(
      CAR_QUERY,
      { slug },
      { next: { revalidate: 60 } },
    )
    if (car) return car
  } catch {
    // Sanity unavailable, fall through to mock
  }
  return mockCarsDetail[slug] || null
}

export async function generateStaticParams() {
  try {
    const cars = await client.fetch<{ slug: string }[]>(CAR_SLUGS_QUERY)
    if (cars && cars.length > 0) return cars.map((c) => ({ slug: c.slug }))
  } catch {
    // fallback
  }
  return Object.keys(mockCarsDetail).map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: CarDetailPageProps): Promise<Metadata> {
  const { slug } = await params
  const car = await fetchCar(slug)

  if (!car) return { title: 'Car Not Found' }

  return {
    title: car.name,
    description: car.tagline || `Discover the Volkswagen ${car.name}. View specs, colors, variants, and pricing.`,
  }
}

export default async function CarDetailPage({ params }: CarDetailPageProps) {
  const { slug } = await params

  const [car, settings] = await Promise.all([
    fetchCar(slug),
    client.fetch<SiteSettings>(SITE_SETTINGS_QUERY, {}, { next: { revalidate: 60 } }).catch(() => mockSettings),
  ])

  if (!car) notFound()

  return <CarDetail car={car} whatsappNumber={settings?.whatsappNumber || '6281234567890'} />
}
