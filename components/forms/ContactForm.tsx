'use client'

import { useState } from 'react'
import { buildWALink } from '@/lib/whatsapp'

interface ContactFormProps {
  whatsappNumber: string
}

export default function ContactForm({ whatsappNumber }: ContactFormProps) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const waMessage = `Hello, my name is ${name}.\n\nSubject: ${subject}\n\nMessage: ${message}\n\nEmail: ${email}\nPhone: ${phone}`
    window.open(buildWALink(whatsappNumber, waMessage), '_blank')
  }

  const inputClass =
    'w-full rounded-xl border border-border bg-bg px-4 py-3 text-sm text-dark outline-none transition-colors focus:border-vw-blue placeholder:text-muted/50'

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-dark">Name *</label>
          <input type="text" required value={name} onChange={(e) => setName(e.target.value)} className={inputClass} placeholder="John Doe" />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-dark">Email *</label>
          <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className={inputClass} placeholder="john@example.com" />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-dark">Phone *</label>
          <input type="tel" required value={phone} onChange={(e) => setPhone(e.target.value)} className={inputClass} placeholder="08xx xxxx xxxx" />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-dark">Subject *</label>
          <select required value={subject} onChange={(e) => setSubject(e.target.value)} className={inputClass}>
            <option value="">Select subject</option>
            <option value="Test Drive">Test Drive</option>
            <option value="Pricing">Pricing</option>
            <option value="Service">Service</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-dark">Message</label>
        <textarea rows={4} value={message} onChange={(e) => setMessage(e.target.value)} className={inputClass} placeholder="How can we help you?" />
      </div>

      <button type="submit" className="mt-2 rounded-full bg-vw-blue px-8 py-3.5 text-sm font-medium text-white transition-all duration-200 hover:bg-vw-blue-hover">
        Send via WhatsApp
      </button>
    </form>
  )
}
