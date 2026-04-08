// All GROQ queries — single source of truth for CMS data fetching

// Cars
export const CARS_QUERY = `*[_type == "car"] | order(_createdAt asc) {
  _id, name, slug, category, fuel, price, badge, tagline, thumbnail, highlights
}`

export const CAR_QUERY = `*[_type == "car" && slug.current == $slug][0] {
  ...,
  relatedCars[]->{ _id, name, slug, thumbnail, price, badge, highlights },
  relatedPromos[]->{ _id, title, slug, badge, image, validUntil }
}`

export const CAR_SLUGS_QUERY = `*[_type == "car"]{ "slug": slug.current }`

export const CARS_MINIMAL_QUERY = `*[_type == "car"] | order(_createdAt asc) {
  _id, name, slug, price
}`

// Promotions
export const PROMOS_QUERY = `*[_type == "promotion"] | order(_createdAt desc) {
  _id, title, slug, badge, image, validUntil, category
}`

export const PROMO_QUERY = `*[_type == "promotion" && slug.current == $slug][0] {
  ...,
  relatedCars[]->{ _id, name, slug, thumbnail, price }
}`

export const PROMO_SLUGS_QUERY = `*[_type == "promotion"]{ "slug": slug.current }`

// Blog
export const BLOGS_QUERY = `*[_type == "blog"] | order(publishedAt desc)[0..4] {
  _id, title, slug, thumbnail, publishedAt, category, excerpt
}`

export const BLOG_QUERY = `*[_type == "blog" && slug.current == $slug][0]`

export const BLOG_SLUGS_QUERY = `*[_type == "blog"]{ "slug": slug.current }`

// Experiences
export const EXPERIENCES_QUERY = `*[_type == "experience"] | order(_createdAt desc) {
  _id, title, slug, tag, coverImage, description
}`

export const EXPERIENCE_QUERY = `*[_type == "experience" && slug.current == $slug][0]`

export const EXPERIENCE_SLUGS_QUERY = `*[_type == "experience"]{ "slug": slug.current }`

// Site Settings (singleton)
export const SITE_SETTINGS_QUERY = `*[_type == "siteSettings"][0]`
