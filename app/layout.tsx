import type { Metadata } from 'next'
import { DM_Serif_Display, DM_Sans } from 'next/font/google'
import { client } from '@/sanity/lib/client'
import { SITE_SETTINGS_QUERY } from '@/sanity/lib/queries'
import type { SiteSettings } from '@/types'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import WhatsAppButton from '@/components/ui/WhatsAppButton'
import LenisProvider from '@/components/ui/LenisProvider'
import './globals.css'

const dmSerifDisplay = DM_Serif_Display({
  variable: '--font-dm-serif-display',
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
})

const dmSans = DM_Sans({
  variable: '--font-dm-sans',
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Volkswagen Puri Indah - Authorized Volkswagen Dealer Jakarta',
    template: '%s | VW Puri Indah',
  },
  description:
    'Authorized Volkswagen dealer in Jakarta. Discover the latest VW cars, exclusive promotions, financing options, and trusted after-sales service.',
}

const defaultSettings: SiteSettings = {
  whatsappNumber: '6281234567890',
  address: 'Jl. Puri Indah Raya, West Jakarta',
  phone: '(021) 1234-5678',
  email: 'info@vwpuriindah.co.id',
  operationalHours: 'Mon - Sat: 08:00 - 17:00',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  let settings: SiteSettings = defaultSettings

  try {
    const fetched = await client.fetch<SiteSettings | null>(
      SITE_SETTINGS_QUERY,
      {},
      { next: { revalidate: 60 } },
    )
    if (fetched) {
      settings = fetched
    }
  } catch {
    // Use default settings if Sanity is not configured yet
  }

  return (
    <html
      lang="en"
      className={`${dmSerifDisplay.variable} ${dmSans.variable} h-full`}
    >
      <body className="min-h-full flex flex-col font-body bg-bg text-dark">
        <LenisProvider>
          <Navbar whatsappNumber={settings.whatsappNumber} />
          <main className="flex-1 pt-16 md:pt-20">{children}</main>
          <Footer settings={settings} />
          <WhatsAppButton number={settings.whatsappNumber} />
        </LenisProvider>
      </body>
    </html>
  )
}
