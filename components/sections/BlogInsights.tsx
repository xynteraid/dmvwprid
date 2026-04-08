'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { resolveImage } from '@/lib/image'
import { formatDate } from '@/lib/utils'
import { fadeUp, staggerContainer } from '@/lib/animations'
import type { BlogListItem } from '@/types'

interface BlogInsightsProps {
  blogs: BlogListItem[]
}

export default function BlogInsights({ blogs }: BlogInsightsProps) {
  if (!blogs || blogs.length === 0) return null

  const [featured, ...rest] = blogs

  return (
    <section className="py-24 md:py-40">
      <div className="mx-auto max-w-[1280px] px-6 md:px-12">
        <motion.div
          variants={fadeUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: '-80px' }}
          className="mb-16 flex flex-col gap-6 md:mb-20 md:flex-row md:items-end md:justify-between"
        >
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted">
              Insights
            </p>
            <h2 className="mt-3 font-display text-[clamp(2rem,4vw,4rem)] leading-[1.05] text-dark">
              Latest from the Blog
            </h2>
          </div>
          <Link
            href="/blog"
            className="group inline-flex items-center gap-2 text-sm font-medium text-vw-blue transition-all duration-200 hover:gap-3"
          >
            All Articles
            <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: '-80px' }}
          className="grid gap-6 lg:grid-cols-2 md:gap-8"
        >
          {/* Featured large article */}
          <motion.div variants={fadeUp}>
            <Link
              href={`/blog/${featured.slug.current}`}
              className="group block overflow-hidden rounded-2xl"
            >
              <div className="relative aspect-[16/10] overflow-hidden rounded-2xl">
                <Image
                  src={resolveImage(featured.thumbnail, 1200, 675)}
                  alt={featured.title}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/70 via-dark/10 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <span className="text-xs font-medium uppercase tracking-widest text-white/40">
                    {featured.category}
                  </span>
                  <h3 className="mt-2 text-xl font-bold leading-snug text-white md:text-2xl">
                    {featured.title}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-sm text-white/50">
                    {featured.excerpt}
                  </p>
                  <p className="mt-3 text-xs text-white/30">
                    {formatDate(featured.publishedAt)}
                  </p>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Smaller articles list */}
          <div className="flex flex-col gap-5">
            {rest.slice(0, 4).map((blog) => (
              <motion.div key={blog._id} variants={fadeUp}>
                <Link
                  href={`/blog/${blog.slug.current}`}
                  className="group flex gap-5 rounded-xl transition-all duration-300"
                >
                  <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl md:h-28 md:w-28">
                    <Image
                      src={resolveImage(blog.thumbnail, 300, 300)}
                      alt={blog.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      sizes="120px"
                      unoptimized
                    />
                  </div>
                  <div className="flex flex-col justify-center">
                    <span className="text-xs font-medium uppercase tracking-widest text-muted/60">
                      {blog.category}
                    </span>
                    <h3 className="mt-1 text-sm font-bold leading-snug text-dark transition-colors duration-200 group-hover:text-vw-blue md:text-base">
                      {blog.title}
                    </h3>
                    <p className="mt-1 text-xs text-muted">
                      {formatDate(blog.publishedAt)}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
