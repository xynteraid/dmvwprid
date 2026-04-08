import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft } from 'lucide-react'

export default function NotFound() {
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
        Page Not Found
      </p>
      <h1 className="mt-4 font-display text-[clamp(3rem,8vw,8rem)] leading-[1] text-white">
        404
      </h1>
      <p className="mx-auto mt-4 max-w-md text-base text-white/40">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        href="/"
        className="group mt-10 inline-flex items-center gap-2 rounded-full border border-white/20 px-8 py-3.5 text-sm font-medium text-white transition-all duration-300 hover:border-white/40 hover:bg-white/5"
      >
        <ArrowLeft size={14} className="transition-transform duration-200 group-hover:-translate-x-1" />
        Back to Home
      </Link>
    </section>
  )
}
