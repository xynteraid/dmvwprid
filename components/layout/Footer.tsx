import Image from 'next/image'
import Link from 'next/link'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'
import type { SiteSettings } from '@/types'

interface FooterProps {
  settings: SiteSettings
}

const sitemapColumns = [
  {
    title: 'Cars',
    links: [
      { label: 'All Cars', href: '/cars' },
      { label: 'Financing', href: '/kredit' },
      { label: 'Promotions', href: '/promotions' },
    ],
  },
  {
    title: 'Services',
    links: [
      { label: 'Service & Repair', href: '/owner/service' },
      { label: 'Parts', href: '/owner/parts' },
      { label: 'Experiences', href: '/experiences' },
    ],
  },
  {
    title: 'Information',
    links: [
      { label: 'WLTP', href: '/useful-info/wltp' },
      { label: 'Warning Lights', href: '/useful-info/warning-lights' },
      { label: 'Important Info', href: '/useful-info/important-info' },
    ],
  },
]

export default function Footer({ settings }: FooterProps) {
  return (
    <footer className="bg-vw-gradient text-white">
      <div className="mx-auto max-w-[1280px] px-6 py-16 md:px-12 md:py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand + Contact */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-3">
              <Image
                src="/vw-logo.svg"
                alt="Volkswagen"
                width={32}
                height={32}
                className="brightness-0 invert"
              />
              <span className="font-display text-2xl tracking-tight">
                Puri Indah
              </span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-white/60">
              Authorized Volkswagen Dealer in Jakarta. Sales, service, and
              genuine parts for all Volkswagen vehicles.
            </p>

            <div className="mt-6 flex flex-col gap-3">
              {settings.address && (
                <div className="flex items-start gap-3 text-sm text-white/70">
                  <MapPin size={16} className="mt-0.5 shrink-0" />
                  <span>{settings.address}</span>
                </div>
              )}
              {settings.phone && (
                <div className="flex items-center gap-3 text-sm text-white/70">
                  <Phone size={16} className="shrink-0" />
                  <span>{settings.phone}</span>
                </div>
              )}
              {settings.email && (
                <div className="flex items-center gap-3 text-sm text-white/70">
                  <Mail size={16} className="shrink-0" />
                  <span>{settings.email}</span>
                </div>
              )}
              {settings.operationalHours && (
                <div className="flex items-center gap-3 text-sm text-white/70">
                  <Clock size={16} className="shrink-0" />
                  <span>{settings.operationalHours}</span>
                </div>
              )}
            </div>
          </div>

          {/* Sitemap Columns */}
          {sitemapColumns.map((col) => (
            <div key={col.title}>
              <h3 className="mb-4 text-xs font-medium uppercase tracking-[0.12em] text-white/40">
                {col.title}
              </h3>
              <ul className="flex flex-col gap-2.5">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/70 transition-colors duration-200 hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 md:flex-row">
          <p className="text-xs text-white/40">
            {new Date().getFullYear()} VW Puri Indah. All rights reserved.
          </p>

          <div className="flex items-center gap-4">
            {settings.instagram && (
              <a
                href={settings.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/40 transition-colors duration-200 hover:text-white"
                aria-label="Instagram"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>
            )}
            {settings.facebook && (
              <a
                href={settings.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/40 transition-colors duration-200 hover:text-white"
                aria-label="Facebook"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
            )}
          </div>
        </div>
      </div>
    </footer>
  )
}
