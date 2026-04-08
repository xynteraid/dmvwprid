import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { client } from '@/sanity/lib/client'
import { BLOGS_QUERY } from '@/sanity/lib/queries'
import { resolveImage } from '@/lib/image'
import { formatDate } from '@/lib/utils'
import Badge from '@/components/ui/Badge'
import type { BlogListItem } from '@/types'
import { mockBlogs } from '@/data/mock'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Latest news, reviews, tips, and community stories from VW Puri Indah.',
}

export default async function BlogPage() {
  let blogs: BlogListItem[] = mockBlogs
  try {
    const fetched = await client.fetch<BlogListItem[]>(BLOGS_QUERY, {}, { next: { revalidate: 60 } })
    if (fetched && fetched.length > 0) blogs = fetched
  } catch {
    // Use mock data
  }

  const [featured, ...rest] = blogs

  return (
    <>
      {/* Hero */}
      <section className="bg-vw-gradient -mt-16 pt-36 pb-20 md:-mt-20 md:pt-48 md:pb-28">
        <div className="mx-auto max-w-[1280px] px-6 md:px-12">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/30">
            Insights
          </p>
          <h1 className="mt-3 font-display text-[clamp(2rem,4vw,4rem)] leading-tight text-white">
            Blog &amp; News
          </h1>
          <p className="mt-4 max-w-lg text-base text-white/50">
            Stay up to date with the latest from Volkswagen. Reviews, tips, and community stories.
          </p>
        </div>
      </section>

      {/* Featured Article */}
      {featured && (
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-[1280px] px-6 md:px-12">
            <Link
              href={`/blog/${featured.slug.current}`}
              className="group grid gap-8 lg:grid-cols-2 lg:gap-12"
            >
              <div className="relative aspect-video overflow-hidden rounded-2xl">
                <Image
                  src={resolveImage(featured.thumbnail, 1200, 675)}
                  alt={featured.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  unoptimized={!!featured.thumbnail._url}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className="flex flex-col justify-center">
                <div className="flex items-center gap-3">
                  <Badge variant="muted">{featured.category}</Badge>
                  <span className="text-xs text-muted">{formatDate(featured.publishedAt)}</span>
                </div>
                <h2 className="mt-4 font-display text-2xl leading-tight text-dark transition-colors group-hover:text-vw-blue md:text-3xl">
                  {featured.title}
                </h2>
                <p className="mt-3 text-base leading-relaxed text-muted">
                  {featured.excerpt}
                </p>
                <span className="mt-6 text-sm font-medium text-vw-blue transition-colors group-hover:text-vw-blue-hover">
                  Read Article
                </span>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* All Articles Grid */}
      {rest.length > 0 && (
        <section className="border-t border-border py-16 md:py-24">
          <div className="mx-auto max-w-[1280px] px-6 md:px-12">
            <h2 className="mb-10 font-display text-2xl text-dark md:text-3xl">
              All Articles
            </h2>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {rest.map((blog) => (
                <Link
                  key={blog._id}
                  href={`/blog/${blog.slug.current}`}
                  className="group block"
                >
                  <div className="relative aspect-video overflow-hidden rounded-2xl">
                    <Image
                      src={resolveImage(blog.thumbnail, 600, 338)}
                      alt={blog.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      unoptimized={!!blog.thumbnail._url}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                  <div className="mt-4">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-medium uppercase tracking-widest text-muted/60">
                        {blog.category}
                      </span>
                      <span className="text-xs text-muted">{formatDate(blog.publishedAt)}</span>
                    </div>
                    <h3 className="mt-2 text-base font-bold text-dark transition-colors group-hover:text-vw-blue">
                      {blog.title}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-sm text-muted">
                      {blog.excerpt}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
