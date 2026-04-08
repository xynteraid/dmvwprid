'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { resolveImage } from '@/lib/image'
import { fadeUp, staggerContainer } from '@/lib/animations'
import Badge from '@/components/ui/Badge'
import SectionHeader from '@/components/ui/SectionHeader'
import type { PromoListItem } from '@/types'

interface RelatedPromosProps {
  promos: PromoListItem[]
}

export default function RelatedPromos({ promos }: RelatedPromosProps) {
  return (
    <section className="py-20 md:py-32">
      <div className="mx-auto max-w-[1280px] px-6 md:px-12">
        <SectionHeader
          eyebrow="Special Offers"
          title="Related Promotions"
        />

        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: '-80px' }}
          className="grid gap-6 sm:grid-cols-2 md:gap-8"
        >
          {promos.slice(0, 2).map((promo) => (
            <motion.div key={promo._id} variants={fadeUp}>
              <Link
                href={`/promotions/${promo.slug.current}`}
                className="group relative block overflow-hidden rounded-2xl"
              >
                <div className="relative aspect-video">
                  <Image
                    src={resolveImage(promo.image, 800, 450)}
                    alt={promo.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    unoptimized={!!promo.image._url}
                    sizes="(max-width: 640px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark/70 to-transparent" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  {promo.badge && (
                    <Badge variant="red" className="mb-2">{promo.badge}</Badge>
                  )}
                  <h3 className="text-lg font-bold text-white">{promo.title}</h3>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
