'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, RefreshCw } from 'lucide-react'

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function ErrorPage({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Optionally log to error reporting service
  }, [error])

  return (
    <section className="bg-vw-gradient -mt-16 md:-mt-20 flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <Image
        src="/vw-logo.svg"
        alt="Volkswagen"
        width={64}
        height={64}
        className="mb-8 brightness-0 invert opacity-20"
      />
      <p className="text-xs font-medium uppercase tracking-[0.3em] text-white/25">
        Something Went Wrong
      </p>
      <h1 className="mt-4 font-display text-[clamp(2rem,5vw,4rem)] leading-[1.1] text-white">
        Unexpected Error
      </h1>
      <p className="mx-auto mt-4 max-w-md text-base text-white/40">
        We encountered an issue loading this page. Please try again or return to the home page.
      </p>
      <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
        <button
          type="button"
          onClick={reset}
          className="group inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-medium text-vw-blue transition-all duration-200 hover:bg-white/90"
        >
          <RefreshCw size={14} />
          Try Again
        </button>
        <Link
          href="/"
          className="group inline-flex items-center gap-2 rounded-full border border-white/20 px-8 py-3.5 text-sm font-medium text-white transition-all duration-300 hover:border-white/40 hover:bg-white/5"
        >
          <ArrowLeft size={14} className="transition-transform duration-200 group-hover:-translate-x-1" />
          Back to Home
        </Link>
      </div>
    </section>
  )
}
