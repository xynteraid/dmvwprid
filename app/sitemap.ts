import type { MetadataRoute } from 'next'
import { client } from '@/sanity/lib/client'
import { CAR_SLUGS_QUERY, PROMO_SLUGS_QUERY, BLOG_SLUGS_QUERY } from '@/sanity/lib/queries'

const BASE_URL = 'https://vwpuriindah.co.id'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [carSlugs, promoSlugs, blogSlugs] = await Promise.all([
    client.fetch<{ slug: string }[]>(CAR_SLUGS_QUERY),
    client.fetch<{ slug: string }[]>(PROMO_SLUGS_QUERY),
    client.fetch<{ slug: string }[]>(BLOG_SLUGS_QUERY),
  ])

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${BASE_URL}/cars`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE_URL}/promotions`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/kredit`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/experiences`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE_URL}/owner/service`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE_URL}/owner/parts`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE_URL}/useful-info/wltp`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.4 },
    { url: `${BASE_URL}/useful-info/warning-lights`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.4 },
    { url: `${BASE_URL}/useful-info/important-info`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.4 },
  ]

  const carPages: MetadataRoute.Sitemap = carSlugs.map((c) => ({
    url: `${BASE_URL}/cars/${c.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  const promoPages: MetadataRoute.Sitemap = promoSlugs.map((p) => ({
    url: `${BASE_URL}/promotions/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  const blogPages: MetadataRoute.Sitemap = blogSlugs.map((b) => ({
    url: `${BASE_URL}/blog/${b.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.5,
  }))

  return [...staticPages, ...carPages, ...promoPages, ...blogPages]
}
