# 📄 PRD — VW Puri Indah Website
**Project:** Website Resmi Dealer VW Puri Indah  
**Package:** Website Standar — IDR 10.000.000  
**Vendor:** Xyntera  
**Status:** Ready for Demo  
**Version:** 1.0.0  
**Date:** April 2025

---

## 1. Overview

### 1.1 Project Summary
Website resmi dealer Volkswagen Puri Indah. Tujuan utama: meningkatkan lead (test drive, kredit, konsultasi), menampilkan produk VW secara premium, dan memberikan informasi lengkap kepada calon pembeli maupun pemilik kendaraan VW.

### 1.2 Target User
| Segment | Deskripsi |
|---|---|
| Calon Pembeli | Mencari info harga, spesifikasi, promo, simulasi kredit |
| Pemilik VW | Butuh informasi servis, parts, dan layanan purna jual |
| Walk-in Online | Pengguna yang datang dari iklan/sosmed, butuh CTA cepat |

### 1.3 Key Goals
- Konversi → WhatsApp, Form Test Drive, Simulasi Kredit
- Branding premium sesuai identitas VW
- Cepat, responsif, dan smooth di semua device
- Mudah di-maintain oleh tim internal

---

## 2. Tech Stack

| Kategori | Stack |
|---|---|
| Framework | Next.js 14 (App Router) |
| Styling | Tailwind CSS |
| Animation | Framer Motion + GSAP (Car Detail) |
| Language | TypeScript |
| **CMS (Demo)** | **Sanity.io** (hosted, free tier) |
| Sanity Client | `@sanity/client` + `next-sanity` |
| **CMS (Production)** | **TBD** — opsi: Sanity paid / Payload CMS / Strapi / WordPress Headless |
| Icons | Lucide React |
| Font | Display: `DM Serif Display` atau `Playfair Display` · Body: `DM Sans` |
| Deployment | Vercel |

> **Note untuk Claude Code:** Data diambil dari Sanity via GROQ query. Semua fetch pakai `sanity/lib/client.ts`. Studio Sanity berjalan di `/studio` route (embedded di Next.js, tidak perlu deploy terpisah). Tidak ada database di Vercel — semua konten di-host Sanity cloud gratis.
>
> **⚠️ CMS ini khusus demo.** Untuk production, CMS akan ditentukan kemudian. Pastikan semua data-fetching logic terisolasi di `sanity/lib/queries.ts` dan `sanity/lib/client.ts` agar mudah di-swap saat migrasi.

---

## 3. Design System

### 3.1 Color Palette

```css
:root {
  /* VW Core */
  --color-vw-blue:     #001E50;   /* Primary dark navy — dominant */
  --color-vw-silver:   #C0C0C0;   /* Accent metallic */
  --color-vw-white:    #FFFFFF;

  /* UI */
  --color-bg:          #F5F5F3;   /* Off-white background */
  --color-surface:     #FFFFFF;
  --color-dark:        #0A0A0A;
  --color-accent:      #001E50;
  --color-accent-red:  #CC0000;   /* CTA, badge, highlight */
  --color-muted:       #6B7280;
  --color-border:      #E5E7EB;
}
```

### 3.2 Typography

```css
/* Display / Hero */
font-family: 'DM Serif Display', serif;
font-size: clamp(2.5rem, 6vw, 6rem);
font-weight: 400;
letter-spacing: -0.02em;

/* Heading */
font-family: 'DM Sans', sans-serif;
font-weight: 700;

/* Body */
font-family: 'DM Sans', sans-serif;
font-size: 1rem;
line-height: 1.6;

/* Label / Badge */
font-family: 'DM Sans', sans-serif;
font-size: 0.75rem;
letter-spacing: 0.1em;
text-transform: uppercase;
```

### 3.3 Animation Defaults

```js
// Framer Motion defaults
const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
}

const stagger = {
  animate: { transition: { staggerChildren: 0.08 } }
}
```

- Durasi: `0.3s – 0.6s`
- Easing: `cubic-bezier(0.22, 1, 0.36, 1)` (smooth out)
- Scroll reveal: `whileInView` dengan `viewport={{ once: true, margin: "-80px" }}`

### 3.4 Spacing & Layout

- Max width container: `1280px`
- Section padding: `py-20 md:py-32`
- Card gap: `gap-6 md:gap-8`
- Border radius: `rounded-2xl` (card) · `rounded-full` (pill/badge)

---

## 4. Site Structure & Pages

```
/                        → Home
/cars                    → Daftar Mobil
/cars/[slug]             → Car Detail
/promotions              → Daftar Promo
/promotions/[slug]       → Detail Promo
/owner                   → Owner & User (redirect ke sub)
  /owner/service         → Service & Repair
  /owner/parts           → Parts
/useful-info             → Useful Info (redirect ke sub)
  /useful-info/wltp               → WLTP
  /useful-info/warning-lights     → Warning Lights
  /useful-info/important-info     → Important Info
/experiences             → Experiences
/kredit                  → Kredit Calculator
/blog/[slug]             → Blog Detail
/contact                 → Contact
```

---

## 5. Page Specifications

---

### 5.1 HOME PAGE

#### Layout Order:
1. **Hero Banner**
2. **Featured Cars**
3. **Promotions Highlight**
4. **Quick Access Menu**
5. **Why Choose Us**
6. **Experiences Teaser**
7. **Kredit Simulation CTA**
8. **Blog / Insights**
9. **Newsletter CTA**
10. **Contact Quick Section**

---

#### Section 1 — Hero Banner

**Type:** Full-width autoplay carousel / video background  
**Height:** `100vh`

**Content:**
- Slide berisi gambar mobil VW (landscape, full-bleed)
- Overlay gelap gradient bawah
- Big headline (display font, putih)
- Subheadline (muted)
- Dua CTA: `Lihat Mobil` (primary button) + `Hubungi Kami` (ghost button)
- Dots indicator atau minimal slide counter (mis. `01 / 04`)

**Animation:** Auto-slide setiap 5s, fade/crossfade transition 0.6s

```
Data contoh:
slides: [
  { image: "/hero/vw-tiguan.jpg", headline: "Perjalanan yang Tak Terlupakan", sub: "Discover the all-new Tiguan", cta: "Lihat Mobil" },
  ...
]
```

---

#### Section 2 — Featured Cars

**Layout:** Horizontal carousel (mobile) / 3-col grid (desktop)  
**Card:** Tall card, gambar atas, nama, harga mulai dari, highlight 2-3 spec, CTA

```
Props per card:
- image
- name (e.g. "VW Tiguan")
- price (e.g. "Mulai Rp 599.000.000")
- specs: [{ icon, label }]  (3 item max)
- badge (optional, e.g. "Best Seller")
- slug
```

**Animation:** Stagger reveal saat scroll, card hover: lift shadow + image zoom subtle

---

#### Section 3 — Promotions Highlight

**Layout:** Bento grid (2 large + 2 small, atau 3 equal)  
**Style:** Dark card dengan accent warna biru VW atau merah

```
Props per promo card:
- image (background)
- title
- badge (e.g. "Bunga 0%", "Diskon 15 Juta")
- valid_until
- slug
```

---

#### Section 4 — Quick Access Menu

**Layout:** 6 icon tiles horizontal (scroll horizontal di mobile)  
**Items:**

| Icon | Label | Target |
|---|---|---|
| Wrench | Service & Repair | /owner/service |
| Package | Parts | /owner/parts |
| FileText | Download Brosur | (PDF/link, dummy) |
| Car | Test Drive | /contact#testdrive |
| MessageCircle | Konsultasi WA | wa.me/62xxx |
| Calculator | Simulasi Kredit | /kredit |

---

#### Section 5 — Why Choose Us

**Layout:** 2x2 atau 4-col grid  
**Items (4):**

| Icon | Title | Desc |
|---|---|---|
| ShieldCheck | Dealer Resmi VW | Authorized dealer terpercaya |
| Wrench | Servis Resmi | Teknisi bersertifikat VW |
| Star | Garansi Resmi | Garansi pabrik & purna jual |
| Users | 1000+ Pelanggan | Ribuan keluarga VW puas |

---

#### Section 6 — Experiences Teaser

**Layout:** Split — gambar kiri (60%), teks kanan (40%)  
**Content:**
- Tagline besar
- 2–3 kalimat deskripsi
- CTA: `Lihat Semua Experience →`

---

#### Section 7 — Kredit Simulation CTA

**Layout:** Full-width dark section (warna VW navy)  
**Content:**
- Headline: "Miliki VW Impianmu Sekarang"
- Sub: "Hitung cicilan sesuai kemampuanmu"
- CTA button putih: `Simulasi Kredit`

---

#### Section 8 — Blog / Insights

**Layout:** 3-col grid (desktop) / 1-col (mobile)  
**Card:** image thumbnail + tanggal + judul + excerpt singkat  
**Footer:** `Lihat Semua →`

---

#### Section 9 — Newsletter CTA

**Layout:** Centered, minimal  
**Content:** Input email + tombol subscribe  
**Note:** Dummy, tidak perlu backend, cukup console.log / toast

---

#### Section 10 — Contact Quick Section

**Layout:** 2-col — info kontak kiri, embed map kanan  
**Info:** Alamat, jam operasional, WhatsApp, telepon

---

### 5.2 CARS PAGE

**Path:** `/cars`

#### Sections:
1. **Page Hero** — Judul halaman, breadcrumb
2. **Filter Bar** — Horizontal pill filters:
   - Tipe: All / SUV / Sedan / Hatchback / MPV
   - Bahan Bakar: All / Bensin / Hybrid / Listrik
   - Harga (optional): range slider sederhana
3. **Car Grid** — 3-col (desktop) / 2-col (tablet) / 1-col (mobile)
4. **Load More** — Tombol load more (bukan infinite scroll)

**Car Card Component:**

```
- image (aspect-ratio 4/3)
- badge (optional: "New", "Best Seller")
- name
- price (mulai dari)
- specs: [engine, fuel, transmission]  (icon + label)
- CTA: "Lihat Detail"
- hover: slide up overlay dengan tombol Test Drive + WA
```

**Animation:** Grid stagger on load + filter change (AnimatePresence)

---

### 5.3 CAR DETAIL PAGE

**Path:** `/cars/[slug]`  
**Priority:** Core page — paling penting

#### Sections:

**A. Car Hero**
- Full-width image (`100vh` atau `80vh`)
- Overlay gradient bottom
- Nama mobil (display besar, putih)
- Harga mulai dari
- Badge kategori
- Scroll indicator arrow

**B. Key Info Bar**
- Sticky bar di bawah hero (muncul setelah scroll)
- Berisi: Nama · Harga · 3 spec utama · CTA (Test Drive, WA)
- `position: sticky; top: 64px;`

**C. Spec Storytelling Sections**
- 2–6 section, alternating layout:
  - Ganjil: Gambar kiri 60%, teks kanan 40%
  - Genap: Teks kiri 40%, gambar kanan 60%
- Setiap section: judul, paragraf, highlight spec (badge/list)
- **Animation:** GSAP ScrollTrigger — gambar slide in dari sisi, teks fade up

**D. Technical Spec Table**
- Accordion per kategori: Mesin, Performa, Dimensi, Kapasitas, Fitur
- Rows: label + nilai

```
Contoh data:
specs: {
  engine: [
    { label: "Tipe Mesin", value: "2.0L TSI 4-Cylinder" },
    { label: "Tenaga Maksimum", value: "190 hp @ 4,200 rpm" },
    ...
  ]
}
```

**E. Variants**
- Card per varian: Nama variant, Harga, fitur tambahan vs base
- Highlight selected variant

**F. CTA Section**
- 3 tombol besar:
  - `Jadwalkan Test Drive` (form/modal)
  - `Hubungi via WhatsApp` (wa.me redirect)
  - `Simulasi Kredit` (link ke /kredit atau modal)

**G. Gallery**
- Masonry atau carousel lightbox
- 6–10 gambar

**H. Color Picker / Color Swatch**
- Row swatch circles per warna tersedia
- Klik swatch → gambar mobil berubah (ganti src image)
- Nama warna tampil di bawah
- **Animation:** Framer Motion crossfade antar warna (0.4s)

```
colors: [
  { name: "Deep Black Pearl", hex: "#1a1a1a", image: "/cars/tiguan-black.jpg" },
  { name: "Pure White", hex: "#f5f5f5", image: "/cars/tiguan-white.jpg" },
  ...
]
```

**I. Related Cars**
- 2–3 card mobil lain (horizontal scroll mobile)

**J. Related Promos**
- Promo yang relevan ke model ini (1–2 card)

---

### 5.4 PROMOTIONS PAGE

**Path:** `/promotions`

- Page Hero: judul + deskripsi singkat
- Grid list premium: card dengan background image, badge diskon/bunga, judul, valid hingga, CTA
- Minimal filter: Semua / Pembelian / Servis / Finansial

---

### 5.5 PROMOTION DETAIL

**Path:** `/promotions/[slug]`

- Hero banner full-width
- Judul, periode, deskripsi panjang
- Terms & Conditions (accordion)
- CTA: Klaim Promo (WA redirect) + Lihat Mobil Terkait
- Related promotions (2 card)

---

### 5.6 OWNER & USER

#### Sub-halaman: `/owner/service` — Service & Repair

**Sections:**
1. Hero full-width + judul + sub
2. Intro text (2 paragraf, clean)
3. Layanan highlight (grid 3-4 item: icon + judul + desc)
   - General Service
   - Body & Paint Repair
   - Electrical & AC
   - Emergency Repair
4. Online Booking Form:
   ```
   Fields:
   - Nama lengkap *
   - No. HP / WhatsApp *
   - Email
   - Tipe Kendaraan * (dropdown)
   - Jenis Layanan * (dropdown)
   - Tanggal Preferred *
   - Keluhan / Catatan (textarea)
   - Submit → WA redirect dengan pre-filled message
   ```
5. Jam Operasional + Alamat Bengkel
6. CTA: Hubungi Langsung (WA)

---

#### Sub-halaman: `/owner/parts` — Parts

**Sections:**
1. Hero full-width
2. Intro
3. Parts Categories (masing-masing punya section sendiri dengan icon/gambar):

| Kategori | Sub-item contoh |
|---|---|
| Body & Paintwork | Panel body, paint spray, paint stick |
| Glass, Light & Visibility | Windscreen, wiper blade, headlight |
| Batteries | AGM battery, start-stop |
| Brakes | Brake pad, disc, fluid |
| Engine Oil & Fluids | Engine oil, coolant, brake fluid |
| Wheels & Tires | Alloy wheel, tire, TPMS |
| Accessories — Transport | Roof rack, cargo box, tow bar |
| Accessories — Lifestyle | Floor mat, seat cover, dash cam |

4. Setiap kategori: Hero kecil / banner + deskripsi + benefit list + gambar
5. Accessories punya filter pill: All / Transport / Lifestyle
6. CTA: Pesan Part (WA redirect)

---

### 5.7 USEFUL INFO

#### `/useful-info/wltp` — WLTP

1. Hero + judul
2. Intro singkat: apa itu WLTP (1–2 paragraf)
3. Infographic / ilustrasi siklus WLTP (SVG sederhana atau gambar)
4. CTA: Download PDF / Pelajari Lebih Lanjut
5. Detail teknis WLTP: table atau card (suhu uji, kecepatan, durasi, dll)

---

#### `/useful-info/warning-lights` — Warning Lights

**Layout:** Grid 4-col (desktop) / 2-col (mobile)

```
Setiap item:
- icon (SVG warning light — kuning/merah/hijau)
- nama warning
- arti / tindakan yang harus dilakukan
- severity color: merah (segera) / kuning (perhatian) / hijau (info)
```

Contoh warning lights (minimal 12):
- Engine / Check Engine
- Low Fuel
- Battery
- Oil Pressure
- Coolant Temperature
- Tire Pressure (TPMS)
- ABS
- Airbag / SRS
- Door Ajar
- Seatbelt
- Traction Control
- Service Due

---

#### `/useful-info/important-info` — Important Info

**Sub-sections (dua kartu / tab):**

1. **Roadside Assistance**
   - Hero mini
   - Nomor darurat + cara menghubungi
   - Layanan yang tersedia (list icon)
   - CTA: Hubungi Sekarang

2. **Declaration of Conformity**
   - Penjelasan singkat
   - Download link (PDF dummy)
   - Informasi regulasi

---

### 5.8 EXPERIENCES PAGE

**Path:** `/experiences`

**Concept:** Visual storytelling — immersive, bukan listing biasa

**Sections:**
1. **Hero fullscreen** — video loop atau gambar sinematik + headline besar
2. **Experience Cards** — 3–5 experience:
   - Full-bleed image (tall, aspect 3/4)
   - Judul experience
   - Deskripsi singkat
   - Tag: [Road Trip / Community / Track Day / etc]
   - CTA: `Explore →`
3. **Video Section** — embed YouTube / video lokal jika ada
4. **CTA** — Join Community / Hubungi Kami

**Animation:** Parallax scroll ringan pada gambar, reveal stagger

---

### 5.9 KREDIT CALCULATOR

**Path:** `/kredit`

**Layout:** 2-col (desktop) — form kiri, result kanan  

**Form Fields:**
```
- Pilih Mobil (dropdown dari data mobil)
- Harga OTR (auto-fill dari pilihan, bisa manual)
- Uang Muka / DP (%) — slider + input
- Tenor — 12 / 24 / 36 / 48 / 60 bulan (pill select)
- Suku Bunga (%) — pre-filled default ~5%, bisa edit
```

**Hasil Kalkulasi (real-time):**
```
- Harga OTR
- DP (Rp)
- Pokok Pinjaman (Rp)
- Cicilan per Bulan (Rp) ← highlight besar
- Total Bayar (Rp)
- Total Bunga (Rp)
```

**Formula:**
```
monthlyPayment = (principal * monthlyRate) / (1 - (1 + monthlyRate)^(-tenor))
```

**CTA:** `Ajukan Kredit via WhatsApp` → wa.me redirect dengan pesan pre-filled (nama mobil, DP, tenor, cicilan)

**Note:** Disclaimer bahwa angka bersifat estimasi dan bisa berbeda dengan penawaran resmi.

---

### 5.10 BLOG DETAIL

**Path:** `/blog/[slug]`

**Layout:** Centered single column, max-width 720px

**Sections:**
1. Back button (`← Kembali`)
2. Banner gambar full-width (aspect 16/9)
3. Kategori badge + tanggal
4. Judul (display besar, center)
5. Author (opsional)
6. Konten artikel (MDX / rich text)
7. Divider
8. Related Articles (2–3 card horizontal)

---

### 5.11 CONTACT PAGE

**Path:** `/contact`

**Sections:**
1. **Page Hero** — minimal, judul + sub
2. **Contact Form:**
   ```
   - Nama *
   - Email *
   - No. HP *
   - Keperluan * (dropdown: Test Drive / Harga / Servis / Lainnya)
   - Pesan (textarea)
   - Submit → WA redirect atau dummy success toast
   ```
3. **WhatsApp CTA** — button besar hijau, di atas form
4. **Info Kontak:**
   - Alamat lengkap
   - Telepon
   - Email
   - Jam operasional
5. **Google Maps Embed** — iframe embed (dummy/placeholder untuk demo)

---

## 6. Components Library

| Component | Deskripsi |
|---|---|
| `<Navbar />` | Logo VW + navigasi + CTA WA · sticky + backdrop blur on scroll |
| `<Footer />` | Logo, sitemap, sosmed, copyright |
| `<CarCard />` | Reusable untuk grid & carousel |
| `<PromoCard />` | Untuk promotions grid |
| `<Button />` | Variant: primary / ghost / outline / icon |
| `<Badge />` | Label kecil dengan warna |
| `<SectionHeader />` | Label + Judul + Sub |
| `<ColorSwatch />` | Untuk car detail color picker |
| `<SpecRow />` | Alternating image-text section |
| `<KreditForm />` | Kalkulasi kredit real-time |
| `<WhatsAppButton />` | Floating WA button (sticky bottom right) |
| `<Modal />` | Untuk test drive form pop-up |
| `<Lightbox />` | Gallery full-screen |

---

## 7. WhatsApp Integration

Semua WA button menggunakan format:

```
https://wa.me/628XXXXXXXXXX?text=PESAN_ENCODED
```

Contoh pesan per context:

| Context | Pre-filled Message |
|---|---|
| Umum | "Halo, saya ingin informasi lebih lanjut tentang VW Puri Indah." |
| Test Drive | "Halo, saya ingin menjadwalkan test drive untuk [Nama Mobil]." |
| Kredit | "Halo, saya tertarik dengan simulasi kredit [Nama Mobil] DP [X]% tenor [X] bulan, cicilan estimasi Rp [X]/bulan." |
| Servis | "Halo, saya ingin melakukan booking servis untuk [Tipe Kendaraan]." |
| Parts | "Halo, saya ingin menanyakan ketersediaan parts [Nama Part]." |

---

## 8. CMS — Sanity.io

### 8.1 Setup

```bash
npm create sanity@latest -- --project <projectId> --dataset production --template clean
npm install next-sanity @sanity/image-url
```

**Environment Variables (Vercel + `.env.local`):**
```env
NEXT_PUBLIC_SANITY_PROJECT_ID=xxxxxxxx
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=sk...   # read-only token, untuk fetch server-side
```

**File struktur CMS:**
```
/sanity/
├── lib/
│   ├── client.ts        # createClient()
│   ├── image.ts         # urlFor() helper
│   └── queries.ts       # semua GROQ queries
├── schemas/
│   ├── index.ts         # export semua schema
│   ├── car.ts
│   ├── promotion.ts
│   ├── blog.ts
│   ├── experience.ts
│   └── siteSettings.ts
```

**`sanity/lib/client.ts`:**
```ts
import { createClient } from 'next-sanity'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2024-01-01',
  useCdn: true,
})
```

**`sanity/lib/image.ts`:**
```ts
import imageUrlBuilder from '@sanity/image-url'
import { client } from './client'

const builder = imageUrlBuilder(client)
export const urlFor = (source: any) => builder.image(source)
```

---

### 8.2 Sanity Studio — Embedded di Next.js

Akses studio di: `https://your-site.vercel.app/studio`

**`app/studio/[[...tool]]/page.tsx`:**
```tsx
'use client'
import { NextStudio } from 'next-sanity/studio'
import config from '@/sanity.config'

export default function StudioPage() {
  return <NextStudio config={config} />
}
```

**`sanity.config.ts` (root):**
```ts
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemas } from './sanity/schemas'

export default defineConfig({
  basePath: '/studio',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: 'production',
  plugins: [structureTool(), visionTool()],
  schema: { types: schemas },
})
```

---

### 8.3 Schema Definitions

#### `sanity/schemas/car.ts`
```ts
export const car = defineType({
  name: 'car',
  title: 'Mobil',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Nama Mobil', type: 'string', validation: r => r.required() }),
    defineField({ name: 'slug', type: 'slug', options: { source: 'name' }, validation: r => r.required() }),
    defineField({ name: 'category', type: 'string', options: { list: ['SUV', 'Sedan', 'Hatchback', 'MPV', 'Listrik'] } }),
    defineField({ name: 'fuel', type: 'string', options: { list: ['Bensin', 'Hybrid', 'Listrik'] } }),
    defineField({ name: 'price', title: 'Harga (Rp)', type: 'number' }),
    defineField({ name: 'badge', title: 'Badge (opsional)', type: 'string' }),  // "Best Seller", "New"
    defineField({ name: 'tagline', type: 'string' }),
    defineField({ name: 'heroImage', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'thumbnail', type: 'image', options: { hotspot: true } }),
    defineField({
      name: 'highlights',
      title: 'Highlight Spec (3 item)',
      type: 'array',
      of: [{ type: 'object', fields: [
        { name: 'icon', type: 'string' },   // lucide icon name
        { name: 'label', type: 'string' },
      ]}]
    }),
    defineField({
      name: 'colors',
      type: 'array',
      of: [{ type: 'object', fields: [
        { name: 'name', type: 'string' },
        { name: 'hex', type: 'string' },
        { name: 'image', type: 'image', options: { hotspot: true } },
      ]}]
    }),
    defineField({ name: 'gallery', type: 'array', of: [{ type: 'image', options: { hotspot: true } }] }),
    defineField({
      name: 'specSections',
      title: 'Spec Storytelling Sections',
      type: 'array',
      of: [{ type: 'object', fields: [
        { name: 'title', type: 'string' },
        { name: 'description', type: 'text' },
        { name: 'image', type: 'image', options: { hotspot: true } },
        { name: 'highlights', type: 'array', of: [{ type: 'string' }] },
      ]}]
    }),
    defineField({
      name: 'technicalSpec',
      type: 'object',
      fields: ['engine', 'performance', 'dimension', 'capacity', 'features'].map(cat => ({
        name: cat,
        type: 'array',
        of: [{ type: 'object', fields: [
          { name: 'label', type: 'string' },
          { name: 'value', type: 'string' },
        ]}]
      }))
    }),
    defineField({
      name: 'variants',
      type: 'array',
      of: [{ type: 'object', fields: [
        { name: 'name', type: 'string' },
        { name: 'price', type: 'number' },
        { name: 'features', type: 'array', of: [{ type: 'string' }] },
      ]}]
    }),
    defineField({ name: 'relatedCars', type: 'array', of: [{ type: 'reference', to: [{ type: 'car' }] }] }),
    defineField({ name: 'relatedPromos', type: 'array', of: [{ type: 'reference', to: [{ type: 'promotion' }] }] }),
  ]
})
```

#### `sanity/schemas/promotion.ts`
```ts
export const promotion = defineType({
  name: 'promotion',
  title: 'Promosi',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', validation: r => r.required() }),
    defineField({ name: 'slug', type: 'slug', options: { source: 'title' } }),
    defineField({ name: 'badge', title: 'Badge (e.g. "Bunga 0%")', type: 'string' }),
    defineField({ name: 'image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'validUntil', type: 'date' }),
    defineField({ name: 'category', type: 'string', options: { list: ['Pembelian', 'Servis', 'Finansial'] } }),
    defineField({ name: 'description', type: 'array', of: [{ type: 'block' }] }),  // portable text
    defineField({ name: 'terms', title: 'Syarat & Ketentuan', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'relatedCars', type: 'array', of: [{ type: 'reference', to: [{ type: 'car' }] }] }),
  ]
})
```

#### `sanity/schemas/blog.ts`
```ts
export const blog = defineType({
  name: 'blog',
  title: 'Blog / Insights',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', validation: r => r.required() }),
    defineField({ name: 'slug', type: 'slug', options: { source: 'title' } }),
    defineField({ name: 'thumbnail', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'publishedAt', type: 'datetime' }),
    defineField({ name: 'category', type: 'string', options: { list: ['Review', 'Tips', 'News', 'Community'] } }),
    defineField({ name: 'excerpt', type: 'text', rows: 3 }),
    defineField({ name: 'content', title: 'Konten', type: 'array', of: [{ type: 'block' }, { type: 'image' }] }),
  ]
})
```

#### `sanity/schemas/experience.ts`
```ts
export const experience = defineType({
  name: 'experience',
  title: 'Experience',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string' }),
    defineField({ name: 'slug', type: 'slug', options: { source: 'title' } }),
    defineField({ name: 'tag', type: 'string', options: { list: ['Road Trip', 'Community', 'Track Day', 'Event'] } }),
    defineField({ name: 'coverImage', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'description', type: 'text' }),
    defineField({ name: 'videoUrl', title: 'YouTube URL (opsional)', type: 'url' }),
    defineField({ name: 'content', type: 'array', of: [{ type: 'block' }, { type: 'image' }] }),
  ]
})
```

#### `sanity/schemas/siteSettings.ts`
```ts
export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  __experimental_actions: ['update', 'publish'],  // singleton, no create/delete
  fields: [
    defineField({ name: 'whatsappNumber', title: 'Nomor WhatsApp (62xxx)', type: 'string' }),
    defineField({ name: 'address', type: 'text' }),
    defineField({ name: 'phone', type: 'string' }),
    defineField({ name: 'email', type: 'string' }),
    defineField({ name: 'operationalHours', type: 'string' }),
    defineField({ name: 'googleMapsUrl', type: 'url' }),
    defineField({ name: 'googleMapsEmbed', title: 'Google Maps Embed src URL', type: 'url' }),
    defineField({ name: 'instagram', type: 'url' }),
    defineField({ name: 'facebook', type: 'url' }),
  ]
})
```

---

### 8.4 GROQ Queries

**`sanity/lib/queries.ts`:**

```ts
// Semua mobil (untuk listing)
export const CARS_QUERY = `*[_type == "car"] | order(_createdAt asc) {
  _id, name, slug, category, fuel, price, badge, tagline, thumbnail, highlights
}`

// Satu mobil by slug (untuk detail)
export const CAR_QUERY = `*[_type == "car" && slug.current == $slug][0] {
  ...,
  relatedCars[]->{ name, slug, thumbnail, price },
  relatedPromos[]->{ title, slug, badge, image, validUntil }
}`

// Semua promo
export const PROMOS_QUERY = `*[_type == "promotion"] | order(_createdAt desc) {
  _id, title, slug, badge, image, validUntil, category
}`

// Satu promo by slug
export const PROMO_QUERY = `*[_type == "promotion" && slug.current == $slug][0] {
  ...,
  relatedCars[]->{ name, slug, thumbnail }
}`

// Blog list (5 terbaru)
export const BLOGS_QUERY = `*[_type == "blog"] | order(publishedAt desc)[0..4] {
  _id, title, slug, thumbnail, publishedAt, category, excerpt
}`

// Satu blog by slug
export const BLOG_QUERY = `*[_type == "blog" && slug.current == $slug][0]`

// Site settings (singleton)
export const SITE_SETTINGS_QUERY = `*[_type == "siteSettings"][0]`

// Experiences
export const EXPERIENCES_QUERY = `*[_type == "experience"] | order(_createdAt desc) {
  _id, title, slug, tag, coverImage, description
}`
```

---

### 8.5 Fetching di Next.js (Server Component)

```ts
// app/cars/page.tsx
import { client } from '@/sanity/lib/client'
import { CARS_QUERY } from '@/sanity/lib/queries'

export default async function CarsPage() {
  const cars = await client.fetch(CARS_QUERY, {}, { next: { revalidate: 60 } })
  return <CarGrid cars={cars} />
}

// app/cars/[slug]/page.tsx
export default async function CarDetailPage({ params }: { params: { slug: string } }) {
  const car = await client.fetch(CAR_QUERY, { slug: params.slug }, { next: { revalidate: 60 } })
  if (!car) notFound()
  return <CarDetail car={car} />
}

// generateStaticParams untuk SSG
export async function generateStaticParams() {
  const cars = await client.fetch(`*[_type == "car"]{ "slug": slug.current }`)
  return cars.map((c: any) => ({ slug: c.slug }))
}
```

> **Revalidation:** `revalidate: 60` — konten update otomatis tiap 60 detik tanpa redeploy. Cukup untuk demo.

---

### 8.6 Image Helper

```tsx
import { urlFor } from '@/sanity/lib/image'
import Image from 'next/image'

// Usage di component
<Image
  src={urlFor(car.thumbnail).width(800).height(600).auto('format').url()}
  alt={car.name}
  fill
  className="object-cover"
/>
```

---

## 9. Performance Requirements

| Metric | Target |
|---|---|
| LCP | < 2.5s |
| CLS | < 0.1 |
| FID / INP | < 100ms |
| Mobile Score (Lighthouse) | ≥ 85 |
| Desktop Score (Lighthouse) | ≥ 90 |

**Optimasi:**
- Next.js `<Image />` untuk semua gambar (lazy + blur placeholder)
- Font subset dengan `next/font`
- GSAP hanya load di car detail page (dynamic import)
- Framer Motion tree-shaking
- Static generation (`generateStaticParams`) untuk semua halaman dinamis

---

## 10. SEO Basics

- `<title>` dan `<meta description>` per halaman (via Next.js metadata API)
- Open Graph image per halaman
- Canonical URL
- Sitemap.xml (auto generate)
- Robots.txt
- Structured data: `Product` schema untuk car detail, `LocalBusiness` untuk homepage

---

## 11. Responsive Breakpoints

```
Mobile:  < 640px
Tablet:  640px – 1024px
Desktop: > 1024px
```

- Semua grid collapse ke 1-col di mobile
- Sticky nav berubah jadi hamburger menu di mobile
- Hero image portrait crop di mobile

---

## 12. Floating Elements (Global)

| Elemen | Posisi | Behavior |
|---|---|---|
| WhatsApp Button | Bottom-right | Fixed, selalu tampil |
| Back to Top | Bottom-right (di atas WA) | Muncul setelah scroll 400px |
| Sticky Nav | Top | Backdrop blur setelah scroll |
| Cookie Banner | Bottom | Dismiss ke localStorage |

---

## 13. File Structure

```
/
├── sanity/
│   ├── lib/
│   │   ├── client.ts               # createClient()
│   │   ├── image.ts                # urlFor() helper
│   │   └── queries.ts              # semua GROQ queries
│   └── schemas/
│       ├── index.ts
│       ├── car.ts
│       ├── promotion.ts
│       ├── blog.ts
│       ├── experience.ts
│       └── siteSettings.ts
├── sanity.config.ts                # Sanity studio config
├── app/
│   ├── studio/[[...tool]]/page.tsx # Embedded Sanity Studio
│   ├── page.tsx                    # Home
│   ├── cars/
│   │   ├── page.tsx                # Car list
│   │   └── [slug]/page.tsx         # Car detail
│   ├── promotions/
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx
│   ├── owner/
│   │   ├── service/page.tsx
│   │   └── parts/page.tsx
│   ├── useful-info/
│   │   ├── wltp/page.tsx
│   │   ├── warning-lights/page.tsx
│   │   └── important-info/page.tsx
│   ├── experiences/page.tsx
│   ├── kredit/page.tsx
│   ├── blog/[slug]/page.tsx
│   └── contact/page.tsx
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── Badge.tsx
│   │   ├── Modal.tsx
│   │   └── Lightbox.tsx
│   ├── sections/
│   │   ├── HeroBanner.tsx
│   │   ├── FeaturedCars.tsx
│   │   ├── PromotionsHighlight.tsx
│   │   ├── QuickAccess.tsx
│   │   ├── WhyChooseUs.tsx
│   │   └── ...
│   └── car/
│       ├── CarCard.tsx
│       ├── ColorSwatch.tsx
│       ├── SpecSection.tsx
│       └── KreditForm.tsx
├── data/
│   ├── cars.json
│   ├── promotions.json
│   ├── blogs.json
│   └── warning-lights.json
├── public/
│   └── images/
│       ├── cars/
│       ├── promos/
│       └── blog/
├── lib/
│   ├── utils.ts                    # formatRupiah, etc
│   └── whatsapp.ts                 # buildWALink()
└── styles/
    └── globals.css                 # CSS vars + base
```

---

## 14. Scope & Batasan Demo

> Ini adalah **demo presentasi**. Beberapa hal sengaja disederhanakan:

| Fitur | Status Demo |
|---|---|
| Form submission | WA redirect atau toast dummy |
| Newsletter | Toast "Terima kasih!" tanpa backend |
| Booking service | WA redirect |
| Login / user account | ❌ Tidak ada |
| Payment gateway | ❌ Tidak ada |
| Real inventory | ✅ Dikelola via Sanity CMS |
| CMS admin | ✅ Sanity Studio di `/studio` |
| Blog | 3–5 post statis saja |
| Maps | Iframe embed Google Maps |

---

## 15. Deliverables

- [x] Source code Next.js (TypeScript)
- [x] Sanity CMS — schema lengkap + embedded Studio di `/studio`
- [x] GROQ queries untuk semua content type
- [x] Data JSON lengkap (3–5 mobil, 3 promo, 3–5 blog)
- [x] Semua halaman responsif
- [x] Animasi Framer Motion + GSAP di car detail
- [x] Kredit kalkulator fungsional
- [x] WhatsApp integration (semua CTA)
- [x] Color picker fungsional
- [x] Deploy ke Vercel

---

*PRD ini dibuat untuk keperluan presentasi dan handoff ke Claude Code / developer. Semua keputusan teknis dan desain dapat disesuaikan selama sesuai dengan design guidelines yang ditetapkan.*
