'use client'

import { MessageCircle, CalendarCheck } from 'lucide-react'
import { formatRupiah } from '@/lib/utils'
import { buildWALink, waMessageTestDrive, waMessageGeneral } from '@/lib/whatsapp'
import type { Car } from '@/types'

interface KeyInfoBarProps {
  car: Car
  whatsappNumber: string
}

export default function KeyInfoBar({ car, whatsappNumber }: KeyInfoBarProps) {
  return (
    <div className="sticky top-16 z-30 border-b border-border bg-white/95 backdrop-blur-sm md:top-20">
      <div className="mx-auto flex max-w-[1280px] items-center justify-between gap-4 px-6 py-3 md:px-12">
        {/* Left: Name + Price + Specs */}
        <div className="flex items-center gap-6 overflow-hidden">
          <div className="shrink-0">
            <h2 className="text-sm font-bold text-dark md:text-base">{car.name}</h2>
            <p className="text-xs text-muted">{formatRupiah(car.price)}</p>
          </div>

          {car.highlights && car.highlights.length > 0 && (
            <div className="hidden items-center gap-4 md:flex">
              {car.highlights.slice(0, 3).map((h, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center rounded-full bg-bg px-3 py-1 text-xs text-muted"
                >
                  {h.label}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Right: CTAs */}
        <div className="flex shrink-0 items-center gap-2">
          <a
            href={buildWALink(whatsappNumber, waMessageTestDrive(car.name))}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-1.5 rounded-full bg-vw-blue px-4 py-2 text-xs font-medium text-white transition-all duration-200 hover:bg-vw-blue-hover sm:inline-flex"
          >
            <CalendarCheck size={14} />
            Test Drive
          </a>
          <a
            href={buildWALink(whatsappNumber, waMessageGeneral())}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full border border-vw-blue px-4 py-2 text-xs font-medium text-vw-blue transition-all duration-200 hover:bg-vw-blue hover:text-white"
          >
            <MessageCircle size={14} />
            <span className="hidden sm:inline">WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  )
}
