READ @AGENTS.md FIRST
Please also see @PRD_VW_PuriIndah.md

# CLAUDE.md — VW Puri Indah Website

This file is the single source of truth for how you work on this project.
Read this entire file before writing a single line of code.

---
    
## Project Overview

**Client:** VW Puri Indah — Authorized Volkswagen Dealer, Jakarta  
**Project:** Premium dealer website with full content management  
**Package:** Website Standar (IDR 10.000.000) by Xyntera  
**Goal:** Drive leads via Test Drive, WhatsApp, and Kredit Simulation CTAs. Present VW cars in a premium, cinematic, and trustworthy manner.

The website must feel like it was made for a luxury European automotive brand — not a generic Indonesian dealer site. Every pixel, every interaction, every transition should reflect that standard.

---

## Tech Stack

| Layer      | Choice                                                                         |
| ---------- | ------------------------------------------------------------------------------ |
| Framework  | Next.js 14, App Router, TypeScript                                             |
| Styling    | Tailwind CSS (no inline styles, no CSS modules)                                |
| Animation  | Framer Motion (global) + GSAP with ScrollTrigger (Car Detail only)             |
| CMS        | Sanity.io — client, schemas, GROQ queries                                      |
| Icons      | **Lucide React only**                                                          |
| Fonts      | `DM Serif Display` (display/hero) + `DM Sans` (body/UI) via `next/font/google` |
| Images     | Next.js `<Image />` always — never `<img>`                                     |
| Deployment | Vercel                                                                         |

---

## Absolute Rules — Non-Negotiable

These rules are never broken under any circumstance.

### Never Do This

- **No emoji anywhere** — not in UI, not in comments, not in placeholder text
- **No `<img>` tags** — always use Next.js `<Image />` with proper `alt`, `width`/`height` or `fill`
- **No inline styles** — use Tailwind classes only
- **No generic icons** — Lucide React is the only icon library; pick icons that are precise and meaningful
- **No lorem ipsum** — use realistic VW/automotive placeholder content in Indonesian or English
- **No hardcoded colors outside CSS variables** — all colors reference `--color-*` variables
- **No `any` in TypeScript** — define proper types and interfaces for everything
- **No backend or database on Vercel** — Sanity handles all content; Next.js is stateless
- **No form submissions to an API** — all forms redirect to WhatsApp or show a success toast
- **No `console.log` in committed code**
- **No duplicate components** — before creating something new, check if it already exists in `/components`
- **No plain `<a>` tags for internal navigation** — always use Next.js `<Link />`
- **No heavy libraries without approval** — do not add new npm packages beyond what is in the PRD without flagging it

### Always Do This

- Write TypeScript with strict types for all props, data shapes, and function signatures
- Use `async/await` Server Components for all data fetching — no client-side `useEffect` fetches
- Add `{ next: { revalidate: 60 } }` to all Sanity fetch calls
- Use `generateStaticParams` for all `[slug]` routes
- Use `notFound()` from `next/navigation` when a slug returns null from Sanity
- Keep all Sanity logic inside `/sanity/lib/` — no GROQ queries outside of `queries.ts`
- Use `urlFor(image).width(x).height(y).auto('format').url()` for all Sanity images
- Wrap all page-level Framer Motion elements in `<motion.div>` with `whileInView` and `viewport={{ once: true }}`
- Add `loading="lazy"` on below-fold images

---

## Project Limitations (Demo Scope)

This is a **demo build** for client presentation. The following are intentionally out of scope:

| Feature                        | Status       |
| ------------------------------ | ------------ |
| User authentication / accounts | Out of scope |
| Payment gateway                | Out of scope |
| Real-time inventory sync       | Out of scope |
| Email sending                  | Out of scope |
| Admin beyond Sanity Studio     | Out of scope |
| Multi-language (i18n)          | Out of scope |
| Analytics integration          | Out of scope |

All form submissions (Contact, Test Drive, Service Booking, Newsletter) must:

1. Build a pre-filled WhatsApp message from the form values
2. Redirect to `https://wa.me/62${number}?text=${encodeURIComponent(message)}`
3. OR show a styled success toast — never silently fail

---

## CMS — Sanity.io (Demo + Production)

Sanity is used for this demo and may continue into production.

**Studio URL (after deploy):** `https://your-site.vercel.app/studio`  
**Dataset:** `production`

### Environment Variables

Required in `.env.local` and in Vercel project settings:

```
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_READ_TOKEN=
```

### Content Types (Sanity Schemas)

| Schema         | Description                                                            |
| -------------- | ---------------------------------------------------------------------- |
| `car`          | Mobil — hero, gallery, spec sections, variants, colors, technical spec |
| `promotion`    | Promo — badge, image, valid date, terms, portable text                 |
| `blog`         | Blog / Insights — portable text body, thumbnail, category              |
| `experience`   | Experience — cover image, video URL, portable text                     |
| `siteSettings` | Singleton — WhatsApp number, address, hours, map embed                 |

All schemas are defined in `/sanity/schemas/`. Never query Sanity outside of `/sanity/lib/queries.ts`.

### Data Flow

```
Sanity Cloud
    └── GROQ query (in queries.ts)
        └── client.fetch() (in Server Component)
            └── Props passed to Client Components
                └── Rendered with Framer Motion
```

No client-side Sanity fetching. All fetches happen server-side in page or layout components.

---

## Step-by-Step Build Order

Follow this order strictly. Do not skip ahead.

### Phase 1 — Foundation

1. Init Next.js 14 project with TypeScript and Tailwind
2. Configure `next.config.ts` — image domains (`cdn.sanity.io`), strict mode
3. Set up global CSS variables (design tokens) in `globals.css`
4. Install and configure `next/font/google` for DM Serif Display + DM Sans
5. Set up Sanity — `sanity.config.ts`, `/sanity/lib/client.ts`, `/sanity/lib/image.ts`
6. Write all Sanity schemas in `/sanity/schemas/`
7. Write all GROQ queries in `/sanity/lib/queries.ts`
8. Seed Sanity with demo content (3–5 cars, 3 promos, 3–5 blogs, 1 siteSettings)
9. Build shared TypeScript interfaces in `/types/index.ts`

### Phase 2 — Layout & Global Components

10. `<Navbar />` — logo, nav links, WhatsApp CTA, hamburger (mobile), sticky + blur on scroll
11. `<Footer />` — logo, sitemap columns, socials, copyright
12. `<WhatsAppButton />` — fixed bottom-right, always visible
13. `<Button />` — variants: `primary`, `ghost`, `outline`
14. `<Badge />` — small label, color variants
15. `<SectionHeader />` — eyebrow label + large heading + optional sub

### Phase 3 — Core Pages (Priority Order)

16. Home Page — all 10 sections
17. Cars Listing — grid + filter
18. Car Detail — all sections including color picker, GSAP spec sections, gallery
19. Promotions Listing
20. Promotion Detail
21. Kredit Calculator

### Phase 4 — Secondary Pages

22. Owner / Service & Repair
23. Owner / Parts
24. Useful Info / Warning Lights
25. Useful Info / WLTP
26. Useful Info / Important Info
27. Experiences
28. Blog Detail
29. Contact

### Phase 5 — Polish

30. Responsive QA — mobile, tablet, desktop for all pages
31. Animation pass — verify all `whileInView` triggers work, no layout shift
32. Performance — check `<Image />` usage, lazy loading, font loading
33. SEO — metadata per page, OG image, sitemap, robots.txt
34. Final Vercel deploy + domain check

---

## Design System

### Color Variables

```css
:root {
  --color-bg: #f5f5f3;
  --color-surface: #ffffff;
  --color-dark: #0a0a0a;
  --color-vw-blue: #001e50;
  --color-vw-silver: #c0c0c0;
  --color-accent: #001e50;
  --color-accent-red: #cc0000;
  --color-muted: #6b7280;
  --color-border: #e5e7eb;
  --color-white: #ffffff;
}
```

Dark sections (hero overlays, CTA blocks, footer) use `--color-vw-blue` or `--color-dark` as background with white text.

### Typography Scale

```css
/* Hero / Display */
font-family: "DM Serif Display", serif;
font-size: clamp(2.5rem, 6vw, 6rem);
letter-spacing: -0.02em;

/* Section Heading */
font-family: "DM Sans", sans-serif;
font-size: clamp(1.75rem, 3vw, 3rem);
font-weight: 700;

/* Body */
font-family: "DM Sans", sans-serif;
font-size: 1rem;
line-height: 1.65;

/* Label / Eyebrow */
font-family: "DM Sans", sans-serif;
font-size: 0.75rem;
letter-spacing: 0.12em;
text-transform: uppercase;
font-weight: 500;
```

### Spacing

- Container max-width: `1280px`, centered, `px-6 md:px-12`
- Section vertical padding: `py-20 md:py-32`
- Card gap: `gap-6 md:gap-8`

### Border Radius

- Cards: `rounded-2xl`
- Buttons: `rounded-full`
- Image containers: `rounded-xl` or `rounded-2xl`
- Badges: `rounded-full`

### Shadows

```css
/* Card hover */
box-shadow: 0 20px 60px rgba(0, 0, 0, 0.12);

/* Elevated card */
box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
```

---

## Animation Standards

### Framer Motion — Default Variants

```ts
// Use these consistently. Do not invent new easing curves.

export const fadeUp = {
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
};

export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.4, ease: "easeOut" },
};

export const staggerContainer = {
  animate: { transition: { staggerChildren: 0.08 } },
};

export const scaleUp = {
  initial: { opacity: 0, scale: 0.96 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
};
```

### Scroll Reveal (all sections)

```tsx
<motion.div
  variants={fadeUp}
  initial="initial"
  whileInView="animate"
  viewport={{ once: true, margin: "-80px" }}
>
```

### GSAP — Car Detail Only

Use GSAP + ScrollTrigger for spec storytelling sections in Car Detail:

```ts
// Image slide in from left/right
gsap.fromTo(
  imageRef.current,
  { x: isEven ? 80 : -80, opacity: 0 },
  {
    x: 0,
    opacity: 1,
    duration: 0.8,
    ease: "power3.out",
    scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
  },
);
```

Always clean up GSAP in `useEffect` return:

```ts
return () => {
  ctx.revert();
};
```

### Duration Rules

- Micro-interactions (hover, focus): `0.15s – 0.2s`
- Reveal animations: `0.4s – 0.6s`
- Page transitions: `0.3s`
- Color swatch swap (Car Detail): `0.35s crossfade`
- Hero slide auto-advance: `5000ms`, crossfade `0.6s`

---

## Component Standards

### Premium Components Only

Every component must meet this bar:

- Hover states with smooth transition (`transition-all duration-200`)
- Focus states with visible, styled outline (not default browser ring unless custom)
- Consistent use of design tokens — no hardcoded hex values
- Proper TypeScript props interface with JSDoc comment for complex props
- `motion.div` wrapper for reveal where applicable
- No visual regressions on mobile — test every component at 375px

### Component File Convention

```
components/
  layout/       → Navbar, Footer (one file each)
  ui/           → Button, Badge, Modal, Lightbox, SectionHeader, Toast
  sections/     → Page-level sections (HeroBanner, FeaturedCars, etc.)
  car/          → CarCard, ColorSwatch, SpecSection, KreditForm
  forms/        → BookingForm, ContactForm, NewsletterForm
```

Each component file exports one primary component as default export.
Name the file exactly as the component: `CarCard.tsx` exports `export default function CarCard`.

### Icon Usage

```tsx
// Always from lucide-react
import { ChevronRight, Gauge, Fuel, Zap } from "lucide-react";

// Standard sizes
// Small (inline, badge): size={14}
// Default (button, list): size={18}
// Feature icon: size={24}
// Hero / large display: size={32}

// Never use emoji as icons. Never use image files as icons.
```

---

## WhatsApp Integration

All WA links use this helper:

```ts
// lib/whatsapp.ts
export function buildWALink(number: string, message: string): string {
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
```

WA number comes from `siteSettings` fetched from Sanity. Never hardcode the number in components.

### Message Templates

| Context    | Template                                                                                                             |
| ---------- | -------------------------------------------------------------------------------------------------------------------- |
| General    | `Halo, saya ingin informasi lebih lanjut tentang VW Puri Indah.`                                                     |
| Test Drive | `Halo, saya ingin menjadwalkan test drive untuk {carName}.`                                                          |
| Kredit     | `Halo, saya tertarik simulasi kredit {carName}. DP {dp}%, tenor {tenor} bulan, estimasi cicilan Rp {monthly}/bulan.` |
| Service    | `Halo, saya ingin booking servis untuk {vehicleType} pada {date}.`                                                   |
| Parts      | `Halo, saya ingin menanyakan ketersediaan {partName}.`                                                               |
| Promo      | `Halo, saya tertarik dengan promo {promoTitle}. Bisa info lebih lanjut?`                                             |

---

## TypeScript Interfaces

Define all shared interfaces in `/types/index.ts`. Example:

```ts
export interface Car {
  _id: string;
  name: string;
  slug: { current: string };
  category: "SUV" | "Sedan" | "Hatchback" | "MPV" | "Listrik";
  fuel: "Bensin" | "Hybrid" | "Listrik";
  price: number;
  badge?: string;
  tagline: string;
  heroImage: SanityImage;
  thumbnail: SanityImage;
  highlights: { icon: string; label: string }[];
  colors: { name: string; hex: string; image: SanityImage }[];
  gallery: SanityImage[];
  specSections: SpecSection[];
  technicalSpec: TechnicalSpec;
  variants: Variant[];
  relatedCars?: Car[];
  relatedPromos?: Promotion[];
}

export interface SanityImage {
  asset: { _ref: string };
  hotspot?: { x: number; y: number };
}

export interface SiteSettings {
  whatsappNumber: string;
  address: string;
  phone: string;
  email: string;
  operationalHours: string;
  googleMapsEmbed: string;
  instagram?: string;
  facebook?: string;
}
```

---

## Formatting & Code Style

- Prettier config: single quotes, no semicolons, 2-space indent, 100 char line width
- No commented-out code in commits
- No `TODO` comments unless they reference a specific phase in the build order above
- Component props go in alphabetical order when there are more than 4
- Keep component files under 200 lines — split into sub-components if longer

---

## Responsive Behavior

| Breakpoint            | Behavior                                                   |
| --------------------- | ---------------------------------------------------------- |
| `< 640px` (mobile)    | 1-col grids, hamburger nav, full-width cards, stacked hero |
| `640–1024px` (tablet) | 2-col grids, full nav optional, medium typography          |
| `> 1024px` (desktop)  | 3-col grids, full sticky nav, large display typography     |

Mobile is not an afterthought — build mobile-first, then expand.

---

## Performance Rules

- All images use `next/image` with explicit `width` + `height`, or `fill` with a sized parent
- Hero images use `priority` prop — all other images use default lazy loading
- GSAP is dynamic-imported in Car Detail only: `const { gsap } = await import('gsap')`
- Fonts loaded via `next/font/google` with `display: 'swap'`
- No unused Tailwind classes — do not write utility classes speculatively
- `revalidate: 60` on all Sanity fetches — no `revalidate: 0` (SSR) unless there is a specific reason

---

## Deployment

**Platform:** Vercel  
**CMS:** Sanity.io (hosted, separate from Vercel)  
**Build command:** `next build`  
**Output:** Static + ISR (Incremental Static Regeneration)

Required Vercel environment variables:

```
NEXT_PUBLIC_SANITY_PROJECT_ID
NEXT_PUBLIC_SANITY_DATASET
SANITY_API_READ_TOKEN
```

Sanity Studio is accessible at `/studio` in the deployed Vercel app.
No separate Sanity Studio deployment needed.

After deploy, verify:

- All `[slug]` pages resolve correctly
- `/studio` loads and can edit content
- WhatsApp links open correctly on mobile
- Images load from `cdn.sanity.io`
- Kredit calculator computes correctly

---

## What This Project Is Not

- Not a web app — there is no user state, no login, no session
- Not a marketplace — no cart, no checkout, no payment
- Not a SaaS — no multi-tenancy, no subscription
- Not an API — Next.js here is a presentation layer only

When in doubt about scope: if it is not in the PRD and not in this file, do not build it.
