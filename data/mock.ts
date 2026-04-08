import type {
  CarListItem,
  PromoListItem,
  BlogListItem,
  ExperienceListItem,
  SiteSettings,
  CarMinimal,
} from '@/types'

function mockImage(url: string) {
  return { asset: { _ref: url }, _url: url }
}

export const mockCars: CarListItem[] = [
  {
    _id: 'car-tiguan',
    name: 'Tiguan',
    slug: { current: 'tiguan' },
    category: 'SUV',
    fuel: 'Bensin',
    price: 599000000,
    badge: 'Best Seller',
    tagline: 'The SUV that redefines family driving',
    thumbnail: mockImage('/images/cars/tiguan/tiguan-main.webp'),
    highlights: [
      { icon: 'Gauge', label: '184 hp' },
      { icon: 'Fuel', label: '2.0L TSI' },
      { icon: 'Zap', label: '8-Speed AT' },
    ],
  },
  {
    _id: 'car-taos',
    name: 'Taos',
    slug: { current: 'taos' },
    category: 'SUV',
    fuel: 'Bensin',
    price: 398000000,
    badge: 'New',
    tagline: 'The compact SUV built for the city',
    thumbnail: mockImage('/images/cars/taos/taos-main.webp'),
    highlights: [
      { icon: 'Gauge', label: '158 hp' },
      { icon: 'Fuel', label: '1.5L TSI' },
      { icon: 'Zap', label: '8-Speed AT' },
    ],
  },
  {
    _id: 'car-atlas',
    name: 'Atlas',
    slug: { current: 'atlas' },
    category: 'SUV',
    fuel: 'Bensin',
    price: 749000000,
    tagline: 'Full-size SUV with room for everything',
    thumbnail: mockImage('/images/cars/atlass/atlass-main.webp'),
    highlights: [
      { icon: 'Gauge', label: '269 hp' },
      { icon: 'Fuel', label: '2.0L TSI' },
      { icon: 'Zap', label: '8-Speed AT' },
    ],
  },
  {
    _id: 'car-atlas-cross',
    name: 'Atlas Cross Sport',
    slug: { current: 'atlas-cross-sport' },
    category: 'SUV',
    fuel: 'Bensin',
    price: 689000000,
    tagline: 'Athletic style meets versatile performance',
    thumbnail: mockImage('/images/cars/atlass-cross/atlass-cross-sport-main.webp'),
    highlights: [
      { icon: 'Gauge', label: '269 hp' },
      { icon: 'Fuel', label: '2.0L TSI' },
      { icon: 'Zap', label: '8-Speed AT' },
    ],
  },
  {
    _id: 'car-golf-gti',
    name: 'Golf GTI',
    slug: { current: 'golf-gti' },
    category: 'Hatchback',
    fuel: 'Bensin',
    price: 549000000,
    badge: 'Iconic',
    tagline: 'The original hot hatch, perfected',
    thumbnail: mockImage('/images/cars/golf-gti/golf-gti-main.webp'),
    highlights: [
      { icon: 'Gauge', label: '241 hp' },
      { icon: 'Fuel', label: '2.0L TSI' },
      { icon: 'Zap', label: '7-Speed DSG' },
    ],
  },
  {
    _id: 'car-golf-r',
    name: 'Golf R',
    slug: { current: 'golf-r' },
    category: 'Hatchback',
    fuel: 'Bensin',
    price: 699000000,
    badge: 'Performance',
    tagline: 'Unleash 315 hp of pure driving thrill',
    thumbnail: mockImage('/images/cars/golf-r/golf-r-main.webp'),
    highlights: [
      { icon: 'Gauge', label: '315 hp' },
      { icon: 'Fuel', label: '2.0L TSI' },
      { icon: 'Zap', label: '7-Speed DSG' },
    ],
  },
  {
    _id: 'car-id4',
    name: 'ID.4',
    slug: { current: 'id4' },
    category: 'Listrik',
    fuel: 'Listrik',
    price: 899000000,
    badge: 'Electric',
    tagline: 'The future of driving, today',
    thumbnail: mockImage('/images/cars/id-4/id-4-main.webp'),
    highlights: [
      { icon: 'Zap', label: '201 hp' },
      { icon: 'Gauge', label: '77 kWh' },
      { icon: 'Fuel', label: '275 mi range' },
    ],
  },
  {
    _id: 'car-id-buzz',
    name: 'ID. Buzz',
    slug: { current: 'id-buzz' },
    category: 'Listrik',
    fuel: 'Listrik',
    price: 1250000000,
    badge: 'Electric',
    tagline: 'An icon, reimagined for the electric age',
    thumbnail: mockImage('/images/cars/id-buzz/id-buzz-main.webp'),
    highlights: [
      { icon: 'Zap', label: '282 hp' },
      { icon: 'Gauge', label: '91 kWh' },
      { icon: 'Fuel', label: '234 mi range' },
    ],
  },
  {
    _id: 'car-jetta',
    name: 'Jetta',
    slug: { current: 'jetta' },
    category: 'Sedan',
    fuel: 'Bensin',
    price: 329000000,
    tagline: 'Refined sedan with everyday versatility',
    thumbnail: mockImage('/images/cars/Jetta/Jetta-main.webp'),
    highlights: [
      { icon: 'Gauge', label: '158 hp' },
      { icon: 'Fuel', label: '1.5L TSI' },
      { icon: 'Zap', label: '8-Speed AT' },
    ],
  },
  {
    _id: 'car-jetta-gli',
    name: 'Jetta GLI',
    slug: { current: 'jetta-gli' },
    category: 'Sedan',
    fuel: 'Bensin',
    price: 459000000,
    badge: 'Sport',
    tagline: 'Sport sedan with GTI DNA',
    thumbnail: mockImage('/images/cars/Jetta-GTI/Jetta-GTI-main.webp'),
    highlights: [
      { icon: 'Gauge', label: '228 hp' },
      { icon: 'Fuel', label: '2.0L TSI' },
      { icon: 'Zap', label: '7-Speed DSG' },
    ],
  },
]

export const mockCarsMinimal: CarMinimal[] = mockCars.map((c) => ({
  _id: c._id,
  name: c.name,
  slug: c.slug,
  price: c.price,
}))

// --- Promos, Blogs, Experiences, Settings (keep Unsplash for non-car images) ---

export const mockPromos: PromoListItem[] = [
  {
    _id: 'promo-1',
    title: 'Year-End Cashback up to Rp 50 Million',
    slug: { current: 'year-end-cashback' },
    badge: 'Cashback',
    image: mockImage('https://images.unsplash.com/photo-1549317661-bd32c8ce0637?w=1200&h=800&fit=crop'),
    validUntil: '2025-12-31',
    category: 'Pembelian',
  },
  {
    _id: 'promo-2',
    title: 'Special Financing from 0% Interest',
    slug: { current: 'zero-interest' },
    badge: '0% Interest',
    image: mockImage('https://images.unsplash.com/photo-1542362567-b07e54358753?w=1200&h=800&fit=crop'),
    validUntil: '2025-09-30',
    category: 'Finansial',
  },
  {
    _id: 'promo-3',
    title: 'Free Service Package for 3 Years',
    slug: { current: 'free-service' },
    badge: 'Free Service',
    image: mockImage('https://images.unsplash.com/photo-1530046339160-ce3e530c7d2f?w=1200&h=800&fit=crop'),
    validUntil: '2025-06-30',
    category: 'Servis',
  },
]

export const mockBlogs: BlogListItem[] = [
  {
    _id: 'blog-1',
    title: '2025 Tiguan Review: Is It Worth the Upgrade?',
    slug: { current: 'tiguan-2025-review' },
    thumbnail: mockImage('/images/cars/tiguan_hero.webp'),
    publishedAt: '2025-03-15T10:00:00Z',
    category: 'Review',
    excerpt: 'We spent a week with the latest Tiguan to find out if the updates justify the price tag.',
  },
  {
    _id: 'blog-2',
    title: '5 Essential Tips for Maintaining Your VW',
    slug: { current: 'vw-maintenance-tips' },
    thumbnail: mockImage('/images/cars/golf-gti-hero.webp'),
    publishedAt: '2025-03-01T10:00:00Z',
    category: 'Tips',
    excerpt: 'Keep your Volkswagen in peak condition with these expert maintenance tips.',
  },
  {
    _id: 'blog-3',
    title: 'Volkswagen Launches New Electric Lineup for Southeast Asia',
    slug: { current: 'vw-electric-sea' },
    thumbnail: mockImage('/images/cars/id-4-hero.webp'),
    publishedAt: '2025-02-20T10:00:00Z',
    category: 'News',
    excerpt: 'Volkswagen accelerates its EV ambitions with three new models planned for 2025-2026.',
  },
  {
    _id: 'blog-4',
    title: 'VW Owners Community: Jakarta Chapter Meetup Recap',
    slug: { current: 'jakarta-meetup-recap' },
    thumbnail: mockImage('/images/cars/id-buzz-hero.webp'),
    publishedAt: '2025-02-10T10:00:00Z',
    category: 'Community',
    excerpt: 'Over 50 Volkswagen enthusiasts gathered for the biggest VW meetup this year.',
  },
  {
    _id: 'blog-5',
    title: 'Why Electric Vehicles Are the Future of Urban Driving',
    slug: { current: 'ev-future-urban' },
    thumbnail: mockImage('/images/cars/atlas-hero.webp'),
    publishedAt: '2025-01-25T10:00:00Z',
    category: 'News',
    excerpt: 'From zero emissions to lower running costs, discover why EVs are the future.',
  },
]

export const mockExperiences: ExperienceListItem[] = [
  {
    _id: 'exp-1',
    title: 'Java to Bali Road Trip',
    slug: { current: 'java-bali-road-trip' },
    tag: 'Road Trip',
    coverImage: mockImage('https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&h=1100&fit=crop'),
    description: 'An epic 1,200 km journey across Indonesia in the Volkswagen Tiguan.',
  },
  {
    _id: 'exp-2',
    title: 'VW Owners Community Meetup',
    slug: { current: 'owners-meetup' },
    tag: 'Community',
    coverImage: mockImage('https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?w=800&h=1100&fit=crop'),
    description: 'Monthly gatherings where VW owners share stories and passion.',
  },
  {
    _id: 'exp-3',
    title: 'Track Day at Sentul Circuit',
    slug: { current: 'sentul-track-day' },
    tag: 'Track Day',
    coverImage: mockImage('https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800&h=1100&fit=crop'),
    description: 'Push your Golf GTI to its limits on Indonesia\'s premier circuit.',
  },
]

export const mockSettings: SiteSettings = {
  whatsappNumber: '6281234567890',
  address: 'Jl. Puri Indah Raya Blok A No. 1, Kembangan, West Jakarta 11610',
  phone: '(021) 5835-8888',
  email: 'info@vwpuriindah.co.id',
  operationalHours: 'Mon - Sat: 08:00 - 17:00',
  googleMapsEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.521260322283!2d106.7288208!3d-6.1864045!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f71c88a3f307%3A0x29919c7d2b95641!2sVolkswagen%20Puri%20Indah!5e0!3m2!1sen!2sid!4v1712500000000',
  instagram: 'https://instagram.com/vwpuriindah',
  facebook: 'https://facebook.com/vwpuriindah',
}

export const heroSlides = [
  {
    image: '/images/hero/vw-1.webp',
    headline: 'An Unforgettable Journey',
    sub: 'Discover the all-new Tiguan',
  },
  {
    image: '/images/hero/tiguan.avif',
    headline: 'Born to Stand Out',
    sub: 'The compact SUV that redefines style',
  },
  {
    image: '/images/hero/id4.avif',
    headline: 'The Future is Electric',
    sub: 'Experience the Volkswagen ID.4',
  },
]
