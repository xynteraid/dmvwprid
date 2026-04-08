export interface SanityImage {
  asset: { _ref: string }
  hotspot?: { x: number; y: number }
  _url?: string
}

export interface Highlight {
  icon: string
  label: string
}

export interface CarColor {
  name: string
  hex: string
  image: SanityImage
}

export interface SpecSection {
  title: string
  description: string
  image: SanityImage
  highlights: string[]
}

export interface SpecRow {
  label: string
  value: string
}

export interface TechnicalSpec {
  engine?: SpecRow[]
  performance?: SpecRow[]
  dimension?: SpecRow[]
  capacity?: SpecRow[]
  features?: SpecRow[]
}

export interface Variant {
  name: string
  price: number
  features: string[]
}

export interface Car {
  _id: string
  name: string
  slug: { current: string }
  category: 'SUV' | 'Sedan' | 'Hatchback' | 'MPV' | 'Listrik'
  fuel: 'Bensin' | 'Hybrid' | 'Listrik'
  price: number
  badge?: string
  tagline: string
  heroImage: SanityImage
  thumbnail: SanityImage
  highlights: Highlight[]
  colors: CarColor[]
  gallery: SanityImage[]
  specSections: SpecSection[]
  technicalSpec: TechnicalSpec
  variants: Variant[]
  relatedCars?: CarListItem[]
  relatedPromos?: PromoListItem[]
}

export interface CarListItem {
  _id: string
  name: string
  slug: { current: string }
  category: Car['category']
  fuel: Car['fuel']
  price: number
  badge?: string
  tagline: string
  thumbnail: SanityImage
  highlights: Highlight[]
}

export interface CarMinimal {
  _id: string
  name: string
  slug: { current: string }
  price: number
}

export interface Promotion {
  _id: string
  title: string
  slug: { current: string }
  badge?: string
  image: SanityImage
  validUntil: string
  category: 'Pembelian' | 'Servis' | 'Finansial'
  description: PortableTextBlock[]
  terms: string[]
  relatedCars?: CarListItem[]
}

export interface PromoListItem {
  _id: string
  title: string
  slug: { current: string }
  badge?: string
  image: SanityImage
  validUntil: string
  category: Promotion['category']
}

export interface Blog {
  _id: string
  title: string
  slug: { current: string }
  thumbnail: SanityImage
  publishedAt: string
  category: 'Review' | 'Tips' | 'News' | 'Community'
  excerpt: string
  content: PortableTextBlock[]
}

export interface BlogListItem {
  _id: string
  title: string
  slug: { current: string }
  thumbnail: SanityImage
  publishedAt: string
  category: Blog['category']
  excerpt: string
}

export interface Experience {
  _id: string
  title: string
  slug: { current: string }
  tag: 'Road Trip' | 'Community' | 'Track Day' | 'Event'
  coverImage: SanityImage
  description: string
  videoUrl?: string
  content: PortableTextBlock[]
}

export interface ExperienceListItem {
  _id: string
  title: string
  slug: { current: string }
  tag: Experience['tag']
  coverImage: SanityImage
  description: string
}

export interface SiteSettings {
  whatsappNumber: string
  address: string
  phone: string
  email: string
  operationalHours: string
  googleMapsUrl?: string
  googleMapsEmbed?: string
  instagram?: string
  facebook?: string
}

export interface PortableTextBlock {
  _type: string
  _key: string
  children?: { _type: string; text: string; marks?: string[] }[]
  style?: string
  markDefs?: { _type: string; _key: string }[]
}
