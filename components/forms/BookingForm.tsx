'use client'

import { useState } from 'react'
import { buildWALink, waMessageService } from '@/lib/whatsapp'

interface BookingFormProps {
  whatsappNumber: string
}

export default function BookingForm({ whatsappNumber }: BookingFormProps) {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [vehicleType, setVehicleType] = useState('')
  const [serviceType, setServiceType] = useState('')
  const [date, setDate] = useState('')
  const [notes, setNotes] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const message = waMessageService(vehicleType || 'my Volkswagen', date)
    const fullMessage = `${message}\n\nName: ${name}\nPhone: ${phone}\nService: ${serviceType}\nNotes: ${notes}`
    window.open(buildWALink(whatsappNumber, fullMessage), '_blank')
  }

  const inputClass =
    'w-full rounded-xl border border-border bg-bg px-4 py-3 text-sm text-dark outline-none transition-colors focus:border-vw-blue placeholder:text-muted/50'

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-dark">Full Name *</label>
          <input type="text" required value={name} onChange={(e) => setName(e.target.value)} className={inputClass} placeholder="John Doe" />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-dark">Phone / WhatsApp *</label>
          <input type="tel" required value={phone} onChange={(e) => setPhone(e.target.value)} className={inputClass} placeholder="08xx xxxx xxxx" />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-dark">Vehicle Type *</label>
          <select required value={vehicleType} onChange={(e) => setVehicleType(e.target.value)} className={inputClass}>
            <option value="">Select vehicle</option>
            <option value="Tiguan">Tiguan</option>
            <option value="T-Cross">T-Cross</option>
            <option value="Polo">Polo</option>
            <option value="Golf">Golf</option>
            <option value="ID.4">ID.4</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-dark">Service Type *</label>
          <select required value={serviceType} onChange={(e) => setServiceType(e.target.value)} className={inputClass}>
            <option value="">Select service</option>
            <option value="General Service">General Service</option>
            <option value="Body & Paint">Body & Paint</option>
            <option value="Electrical & AC">Electrical & AC</option>
            <option value="Emergency Repair">Emergency Repair</option>
          </select>
        </div>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-dark">Preferred Date *</label>
        <input type="date" required value={date} onChange={(e) => setDate(e.target.value)} className={inputClass} />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-dark">Notes</label>
        <textarea rows={3} value={notes} onChange={(e) => setNotes(e.target.value)} className={inputClass} placeholder="Describe your issue or request..." />
      </div>

      <button type="submit" className="mt-2 rounded-full bg-vw-blue px-8 py-3.5 text-sm font-medium text-white transition-all duration-200 hover:bg-vw-blue-hover">
        Book via WhatsApp
      </button>
    </form>
  )
}
