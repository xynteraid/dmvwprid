import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { PortableText } from '@portabletext/react'
import { client } from '@/sanity/lib/client'
import { BLOG_QUERY, BLOG_SLUGS_QUERY, BLOGS_QUERY } from '@/sanity/lib/queries'
import { resolveImage } from '@/lib/image'
import { formatDate } from '@/lib/utils'
import Badge from '@/components/ui/Badge'
import { mockBlogsDetail } from '@/data/mock-blogs-detail'
import { mockBlogs } from '@/data/mock'
import type { Blog, BlogListItem } from '@/types'

interface BlogDetailPageProps {
  params: Promise<{ slug: string }>
}

async function fetchBlog(slug: string): Promise<Blog | null> {
  try {
    const blog = await client.fetch<Blog | null>(BLOG_QUERY, { slug }, { next: { revalidate: 60 } })
    if (blog) return blog
  } catch {
    // fallback
  }
  return mockBlogsDetail[slug] || null
}

export async function generateStaticParams() {
  try {
    const blogs = await client.fetch<{ slug: string }[]>(BLOG_SLUGS_QUERY)
    if (blogs && blogs.length > 0) return blogs.map((b) => ({ slug: b.slug }))
  } catch {
    // fallback
  }
  return Object.keys(mockBlogsDetail).map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: BlogDetailPageProps): Promise<Metadata> {
  const { slug } = await params
  const blog = await fetchBlog(slug)
  if (!blog) return { title: 'Article Not Found' }
  return {
    title: blog.title,
    description: blog.excerpt || `Read "${blog.title}" on VW Puri Indah blog.`,
  }
}

async function getRelatedBlogs(currentSlug: string): Promise<BlogListItem[]> {
  try {
    const blogs = await client.fetch<BlogListItem[]>(BLOGS_QUERY, {}, { next: { revalidate: 60 } })
    if (blogs && blogs.length > 0) return blogs.filter((b) => b.slug.current !== currentSlug).slice(0, 3)
  } catch {
    // fallback
  }
  return mockBlogs.filter((b) => b.slug.current !== currentSlug).slice(0, 3)
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = await params
  const [blog, relatedBlogs] = await Promise.all([
    fetchBlog(slug),
    getRelatedBlogs(slug),
  ])

  if (!blog) notFound()

  return (
    <>
      <article className="pt-24 pb-16 md:pt-32 md:pb-24">
        <div className="mx-auto max-w-3xl px-6 md:px-12">
          <Link
            href="/"
            className="mb-8 inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-dark"
          >
            <ArrowLeft size={14} />
            Back
          </Link>

          {/* Banner */}
          {blog.thumbnail && (
            <div className="relative mb-8 aspect-video overflow-hidden rounded-2xl">
              <Image
                src={resolveImage(blog.thumbnail, 1200, 675)}
                alt={blog.title}
                fill
                className="object-cover"
                unoptimized={!!blog.thumbnail._url}
                preload
                sizes="(max-width: 768px) 100vw, 720px"
              />
            </div>
          )}

          {/* Meta */}
          <div className="flex items-center gap-3">
            {blog.category && <Badge variant="muted">{blog.category}</Badge>}
            {blog.publishedAt && (
              <span className="text-xs text-muted">{formatDate(blog.publishedAt)}</span>
            )}
          </div>

          <h1 className="mt-4 font-display text-[clamp(1.75rem,3vw,3rem)] leading-tight text-dark">
            {blog.title}
          </h1>

          {/* Content */}
          {blog.content && blog.content.length > 0 && (
            <div className="mt-8 max-w-none text-dark/80 [&_h2]:mt-10 [&_h2]:mb-4 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-dark [&_h3]:mt-8 [&_h3]:mb-3 [&_h3]:text-lg [&_h3]:font-bold [&_h3]:text-dark [&_p]:mb-4 [&_p]:leading-relaxed">
              <PortableText value={blog.content} />
            </div>
          )}
        </div>
      </article>

      {/* Related Articles */}
      {relatedBlogs.length > 0 && (
        <section className="border-t border-border py-16 md:py-24">
          <div className="mx-auto max-w-[1280px] px-6 md:px-12">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted">
              More to Read
            </p>
            <h2 className="mt-3 mb-10 font-display text-2xl text-dark md:text-3xl">
              Related Articles
            </h2>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 md:gap-8">
              {relatedBlogs.map((related) => (
                <Link
                  key={related._id}
                  href={`/blog/${related.slug.current}`}
                  className="group block overflow-hidden rounded-2xl"
                >
                  <div className="relative aspect-video overflow-hidden rounded-2xl">
                    <Image
                      src={resolveImage(related.thumbnail, 600, 338)}
                      alt={related.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      unoptimized={!!related.thumbnail._url}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                  <div className="mt-4">
                    <span className="text-xs font-medium uppercase tracking-widest text-muted/60">
                      {related.category}
                    </span>
                    <h3 className="mt-1 text-base font-bold text-dark transition-colors group-hover:text-vw-blue">
                      {related.title}
                    </h3>
                    <p className="mt-1 text-xs text-muted">{formatDate(related.publishedAt)}</p>
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
