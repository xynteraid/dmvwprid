import { client } from '@/sanity/lib/client'
import {
  CARS_QUERY,
  PROMOS_QUERY,
  BLOGS_QUERY,
  SITE_SETTINGS_QUERY,
} from '@/sanity/lib/queries'
import type {
  CarListItem,
  PromoListItem,
  BlogListItem,
  SiteSettings,
} from '@/types'
import {
  mockCars,
  mockPromos,
  mockBlogs,
  mockSettings,
  heroSlides,
} from '@/data/mock'
import HeroBanner from '@/components/sections/HeroBanner'
import FeaturedCars from '@/components/sections/FeaturedCars'
import BrandStatement from '@/components/sections/BrandStatement'
import PromotionsHighlight from '@/components/sections/PromotionsHighlight'
import WhyChooseUs from '@/components/sections/WhyChooseUs'
import ServiceHighlights from '@/components/sections/ServiceHighlights'
import ExperiencesTeaser from '@/components/sections/ExperiencesTeaser'
import KreditCTA from '@/components/sections/KreditCTA'
import BlogInsights from '@/components/sections/BlogInsights'
import NewsletterCTA from '@/components/sections/NewsletterCTA'
import ContactQuick from '@/components/sections/ContactQuick'

async function fetchWithFallback<T>(query: string, fallback: T): Promise<T> {
  try {
    const data = await client.fetch<T>(query, {}, { next: { revalidate: 60 } })
    return data && (Array.isArray(data) ? data.length > 0 : true) ? data : fallback
  } catch {
    return fallback
  }
}

export default async function HomePage() {
  const [cars, promos, blogs, settings] = await Promise.all([
    fetchWithFallback<CarListItem[]>(CARS_QUERY, mockCars),
    fetchWithFallback<PromoListItem[]>(PROMOS_QUERY, mockPromos),
    fetchWithFallback<BlogListItem[]>(BLOGS_QUERY, mockBlogs),
    fetchWithFallback<SiteSettings>(SITE_SETTINGS_QUERY, mockSettings),
  ])

  return (
    <>
      <HeroBanner slides={heroSlides} />
      <FeaturedCars cars={cars} />
      <BrandStatement />
      <WhyChooseUs />
      <PromotionsHighlight promos={promos} />
      <ServiceHighlights />
      <ExperiencesTeaser />
      <KreditCTA />
      <BlogInsights blogs={blogs} />
      <NewsletterCTA />
      <ContactQuick settings={settings} />
    </>
  )
}
