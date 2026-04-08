'use client'

import { useState, useEffect } from 'react'
import { MessageCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import { buildWALink, waMessageGeneral } from '@/lib/whatsapp'

interface WhatsAppButtonProps {
  number: string
}

export default function WhatsAppButton({ number }: WhatsAppButtonProps) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 200)
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <a
      href={buildWALink(number, waMessageGeneral())}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contact via WhatsApp"
      className={cn(
        'fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl',
        visible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0 pointer-events-none',
      )}
    >
      <MessageCircle size={24} />
    </a>
  )
}
