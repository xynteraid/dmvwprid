'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, ChevronDown, MessageCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import { buildWALink, waMessageGeneral } from '@/lib/whatsapp'

interface NavItem {
  label: string
  href: string
  children?: { label: string; href: string }[]
}

const navItems: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Cars', href: '/cars' },
  { label: 'Promotions', href: '/promotions' },
  {
    label: 'Owner',
    href: '/owner',
    children: [
      { label: 'Service & Repair', href: '/owner/service' },
      { label: 'Parts', href: '/owner/parts' },
    ],
  },
  {
    label: 'Info',
    href: '/useful-info',
    children: [
      { label: 'WLTP', href: '/useful-info/wltp' },
      { label: 'Warning Lights', href: '/useful-info/warning-lights' },
      { label: 'Important Info', href: '/useful-info/important-info' },
    ],
  },
  { label: 'Experiences', href: '/experiences' },
  { label: 'Financing', href: '/kredit' },
  { label: 'Contact', href: '/contact' },
]

interface NavbarProps {
  whatsappNumber: string
}

export default function Navbar({ whatsappNumber }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const pathname = usePathname()

  // Pages with dark hero backgrounds — navbar starts transparent with white text
  // Blog detail pages have white backgrounds, so they get the dark navbar
  const hasDarkHero = !pathname.startsWith('/blog/')

  // When not scrolled on a dark hero page, use light (white) text
  const isLight = hasDarkHero && !scrolled && !mobileOpen

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    setOpenDropdown(null)
  }, [pathname])

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        scrolled ? 'bg-white/90 shadow-sm backdrop-blur-md' : 'bg-transparent',
      )}
    >
      <nav className="mx-auto flex h-16 max-w-[1280px] items-center justify-between px-6 md:h-20 md:px-12">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/vw-logo.svg"
            alt="Volkswagen"
            width={36}
            height={36}
            className={cn('transition-all duration-500', isLight ? 'brightness-0 invert' : '')}
          />
          <span
            className={cn(
              'font-display text-lg tracking-tight transition-colors duration-500 md:text-xl',
              isLight ? 'text-white' : 'text-vw-blue',
            )}
          >
            Puri Indah
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <div
              key={item.label}
              className="relative"
              onMouseEnter={() => item.children && setOpenDropdown(item.label)}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <Link
                href={item.href}
                className={cn(
                  'flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium transition-all duration-300',
                  isActive(item.href)
                    ? isLight
                      ? 'text-white'
                      : 'text-vw-blue'
                    : isLight
                      ? 'text-white/70 hover:text-white'
                      : 'text-dark/70 hover:text-vw-blue',
                )}
              >
                {item.label}
                {item.children && <ChevronDown size={14} />}
              </Link>

              {item.children && openDropdown === item.label && (
                <div className="absolute top-full left-0 mt-1 min-w-[200px] rounded-xl bg-white p-2 shadow-lg ring-1 ring-border">
                  {item.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className={cn(
                        'block rounded-lg px-4 py-2.5 text-sm transition-all duration-200',
                        isActive(child.href)
                          ? 'bg-vw-blue/5 text-vw-blue'
                          : 'text-dark/70 hover:bg-vw-blue/5 hover:text-vw-blue',
                      )}
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Mobile Hamburger */}
        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          className={cn(
            'flex items-center justify-center rounded-lg p-2 transition-colors lg:hidden',
            isLight ? 'text-white hover:bg-white/10' : 'text-dark hover:bg-border/50',
          )}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        className={cn(
          'fixed inset-x-0 top-16 bottom-0 z-40 transform bg-white transition-transform duration-300 ease-out md:top-20 lg:hidden',
          mobileOpen ? 'translate-x-0' : 'translate-x-full',
        )}
      >
        <div className="flex h-full flex-col overflow-y-auto px-6 py-6">
          <div className="flex flex-col gap-1">
            {navItems.map((item) => (
              <div key={item.label}>
                {item.children ? (
                  <>
                    <button
                      type="button"
                      onClick={() =>
                        setOpenDropdown(openDropdown === item.label ? null : item.label)
                      }
                      className={cn(
                        'flex w-full items-center justify-between rounded-xl px-4 py-3 text-base font-medium transition-all duration-200',
                        isActive(item.href) ? 'text-vw-blue' : 'text-dark/70',
                      )}
                    >
                      {item.label}
                      <ChevronDown
                        size={16}
                        className={cn(
                          'transition-transform duration-200',
                          openDropdown === item.label && 'rotate-180',
                        )}
                      />
                    </button>
                    {openDropdown === item.label && (
                      <div className="ml-4 flex flex-col gap-1 border-l border-border pl-4">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className={cn(
                              'rounded-lg px-4 py-2.5 text-sm transition-all duration-200',
                              isActive(child.href)
                                ? 'text-vw-blue'
                                : 'text-dark/60 hover:text-vw-blue',
                            )}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={item.href}
                    className={cn(
                      'block rounded-xl px-4 py-3 text-base font-medium transition-all duration-200',
                      isActive(item.href) ? 'text-vw-blue' : 'text-dark/70 hover:text-vw-blue',
                    )}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </div>

          <div className="mt-auto pt-6">
            <a
              href={buildWALink(whatsappNumber, waMessageGeneral())}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center gap-2 rounded-full bg-vw-blue px-6 py-3.5 text-base font-medium text-white transition-all duration-200 hover:bg-vw-blue-hover"
            >
              <MessageCircle size={18} />
              Contact via WhatsApp
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}
