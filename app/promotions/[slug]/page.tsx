import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ChevronDown } from 'lucide-react'
import { PortableText } from '@portabletext/react'
import { client } from '@/sanity/lib/client'
import { PROMO_QUERY, PROMO_SLUGS_QUERY, SITE_SETTINGS_QUERY } from '@/sanity/lib/queries'
import { urlFor } from '@/sanity/lib/image'
import { buildWALink, waMessagePromo } from '@/lib/whatsapp'
import Badge from '@/components/ui/Badge'
import type { Promotion, SiteSettings } from '@/types'
import PromoDetailClient from './PromoDetailClient'

interface PromoDetailPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const promos = await client.fetch<{ slug: string }[]>(PROMO_SLUGS_QUERY)
  return promos.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: PromoDetailPageProps): Promise<Metadata> {
  const { slug } = await params
  const promo = await client.fetch<Promotion | null>(
    PROMO_QUERY,
    { slug },
    { next: { revalidate: 60 } },
  )
  if (!promo) return { title: 'Promotion Not Found' }
  return {
    title: promo.title,
    description: `${promo.title} - Exclusive promotion at VW Puri Indah.`,
  }
}

export default async function PromoDetailPage({ params }: PromoDetailPageProps) {
  const { slug } = await params

  const [promo, settings] = await Promise.all([
    client.fetch<Promotion | null>(PROMO_QUERY, { slug }, { next: { revalidate: 60 } }),
    client.fetch<SiteSettings>(SITE_SETTINGS_QUERY, {}, { next: { revalidate: 60 } }),
  ])

  if (!promo) notFound()

  const waNumber = settings?.whatsappNumber || '6281234567890'

  return (
    <>
      {/* Hero */}
      <section className="relative h-[50vh] w-full overflow-hidden bg-dark -mt-16 pt-16 md:-mt-20 md:pt-20 md:h-[60vh]">
        <Image
          src={urlFor(promo.image).width(1920).height(1080).auto('format').url()}
          alt={promo.title}
          fill
          className="object-cover"
          preload
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-dark/30 to-transparent" />

        <div className="relative z-10 mx-auto flex h-full max-w-[1280px] flex-col justify-end px-6 pb-12 md:px-12 md:pb-16">
          <Link
            href="/promotions"
            className="mb-6 inline-flex items-center gap-1.5 text-sm text-white/60 transition-colors hover:text-white"
          >
            <ArrowLeft size={14} />
            Back to Promotions
          </Link>
          {promo.badge && (
            <Badge variant="red" className="mb-3 w-fit">{promo.badge}</Badge>
          )}
          <h1 className="font-display text-[clamp(2rem,4vw,4rem)] leading-tight text-white">
            {promo.title}
          </h1>
          {promo.validUntil && (
            <p className="mt-3 text-base text-white/60">
              Valid until {promo.validUntil}
            </p>
          )}
        </div>
      </section>

      {/* Content */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-6 md:px-12">
          {/* Description */}
          {promo.description && promo.description.length > 0 && (
            <div className="prose prose-lg max-w-none text-dark [&_p]:leading-relaxed [&_p]:text-dark/80">
              <PortableText value={promo.description} />
            </div>
          )}

          {/* Terms */}
          {promo.terms && promo.terms.length > 0 && (
            <PromoDetailClient terms={promo.terms} />
          )}

          {/* CTA */}
          <div className="mt-12 flex flex-col gap-4 sm:flex-row">
            <a
              href={buildWALink(waNumber, waMessagePromo(promo.title))}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-vw-blue px-8 py-3.5 text-sm font-medium text-white transition-all duration-200 hover:bg-vw-blue-hover"
            >
              Claim This Promotion
            </a>
            <Link
              href="/cars"
              className="inline-flex items-center justify-center rounded-full border border-vw-blue px-8 py-3.5 text-sm font-medium text-vw-blue transition-all duration-200 hover:bg-vw-blue hover:text-white"
            >
              View Cars
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
