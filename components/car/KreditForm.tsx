'use client'

import { useState, useMemo } from 'react'
import { Calculator } from 'lucide-react'
import { formatRupiah, cn } from '@/lib/utils'
import { buildWALink, waMessageKredit } from '@/lib/whatsapp'
import type { CarMinimal } from '@/types'

interface KreditFormProps {
  cars: CarMinimal[]
  whatsappNumber: string
}

const tenorOptions = [12, 24, 36, 48, 60]

export default function KreditForm({ cars, whatsappNumber }: KreditFormProps) {
  const [selectedCarId, setSelectedCarId] = useState(cars[0]?._id || '')
  const [customPrice, setCustomPrice] = useState<number | null>(null)
  const [dpPercent, setDpPercent] = useState(20)
  const [tenor, setTenor] = useState(36)
  const [interestRate, setInterestRate] = useState(5)

  const selectedCar = cars.find((c) => c._id === selectedCarId)
  const otrPrice = customPrice ?? (selectedCar?.price || 0)

  const result = useMemo(() => {
    const dpAmount = (otrPrice * dpPercent) / 100
    const principal = otrPrice - dpAmount
    const monthlyRate = interestRate / 100 / 12

    let monthlyPayment = 0
    if (monthlyRate > 0 && tenor > 0) {
      monthlyPayment =
        (principal * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -tenor))
    } else if (tenor > 0) {
      monthlyPayment = principal / tenor
    }

    const totalPayment = monthlyPayment * tenor
    const totalInterest = totalPayment - principal

    return {
      dpAmount,
      principal,
      monthlyPayment,
      totalPayment,
      totalInterest,
    }
  }, [otrPrice, dpPercent, tenor, interestRate])

  return (
    <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
      {/* Form */}
      <div className="flex flex-col gap-6">
        {/* Car Select */}
        <div>
          <label className="mb-2 block text-sm font-medium text-dark">
            Select Vehicle
          </label>
          <select
            value={selectedCarId}
            onChange={(e) => {
              setSelectedCarId(e.target.value)
              setCustomPrice(null)
            }}
            className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-dark outline-none transition-colors focus:border-vw-blue"
          >
            {cars.map((car) => (
              <option key={car._id} value={car._id}>
                {car.name} - {formatRupiah(car.price)}
              </option>
            ))}
          </select>
        </div>

        {/* OTR Price */}
        <div>
          <label className="mb-2 block text-sm font-medium text-dark">
            OTR Price (Rp)
          </label>
          <input
            type="number"
            value={otrPrice}
            onChange={(e) => setCustomPrice(Number(e.target.value))}
            className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-dark outline-none transition-colors focus:border-vw-blue"
          />
        </div>

        {/* DP Slider */}
        <div>
          <div className="mb-2 flex items-center justify-between">
            <label className="text-sm font-medium text-dark">
              Down Payment
            </label>
            <span className="text-sm font-bold text-vw-blue">{dpPercent}%</span>
          </div>
          <input
            type="range"
            min={10}
            max={80}
            step={5}
            value={dpPercent}
            onChange={(e) => setDpPercent(Number(e.target.value))}
            className="w-full accent-vw-blue"
          />
          <div className="mt-1 flex justify-between text-xs text-muted">
            <span>10%</span>
            <span>80%</span>
          </div>
        </div>

        {/* Tenor */}
        <div>
          <label className="mb-2 block text-sm font-medium text-dark">
            Tenure (Months)
          </label>
          <div className="flex flex-wrap gap-2">
            {tenorOptions.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTenor(t)}
                className={cn(
                  'rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-200',
                  tenor === t
                    ? 'bg-vw-blue text-white'
                    : 'bg-surface text-muted border border-border hover:border-vw-blue',
                )}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Interest Rate */}
        <div>
          <label className="mb-2 block text-sm font-medium text-dark">
            Interest Rate (% per year)
          </label>
          <input
            type="number"
            value={interestRate}
            onChange={(e) => setInterestRate(Number(e.target.value))}
            min={0}
            max={20}
            step={0.1}
            className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-dark outline-none transition-colors focus:border-vw-blue"
          />
        </div>
      </div>

      {/* Results */}
      <div className="rounded-2xl bg-surface p-8 shadow-[var(--shadow-card)] lg:p-10">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-vw-blue/5">
            <Calculator size={20} className="text-vw-blue" />
          </div>
          <h3 className="text-lg font-bold text-dark">Estimation Result</h3>
        </div>

        <div className="mt-8 flex flex-col gap-5">
          <ResultRow label="OTR Price" value={formatRupiah(otrPrice)} />
          <ResultRow
            label={`Down Payment (${dpPercent}%)`}
            value={formatRupiah(result.dpAmount)}
          />
          <ResultRow label="Loan Principal" value={formatRupiah(result.principal)} />

          <div className="border-t border-border pt-5">
            <p className="text-sm text-muted">Monthly Installment</p>
            <p className="mt-1 text-3xl font-bold text-vw-blue">
              {formatRupiah(Math.round(result.monthlyPayment))}
            </p>
            <p className="mt-1 text-xs text-muted">per month for {tenor} months</p>
          </div>

          <ResultRow label="Total Payment" value={formatRupiah(Math.round(result.totalPayment))} />
          <ResultRow label="Total Interest" value={formatRupiah(Math.round(result.totalInterest))} />
        </div>

        {/* CTA */}
        <a
          href={buildWALink(
            whatsappNumber,
            waMessageKredit(
              selectedCar?.name || 'Volkswagen',
              dpPercent,
              tenor,
              formatRupiah(Math.round(result.monthlyPayment)),
            ),
          )}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 flex w-full items-center justify-center gap-2 rounded-full bg-vw-blue px-8 py-3.5 text-sm font-medium text-white transition-all duration-200 hover:bg-vw-blue-hover"
        >
          Apply for Financing via WhatsApp
        </a>

        <p className="mt-4 text-center text-xs text-muted">
          * This is an estimate only. Actual rates and terms may vary.
        </p>
      </div>
    </div>
  )
}

function ResultRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-muted">{label}</span>
      <span className="text-sm font-medium text-dark">{value}</span>
    </div>
  )
}
