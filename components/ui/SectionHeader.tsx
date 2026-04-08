import { cn } from '@/lib/utils'

interface SectionHeaderProps {
  align?: 'left' | 'center'
  className?: string
  eyebrow?: string
  subtitle?: string
  title: string
}

export default function SectionHeader({
  align = 'center',
  className,
  eyebrow,
  subtitle,
  title,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        'mb-12 md:mb-16',
        align === 'center' && 'text-center',
        className,
      )}
    >
      {eyebrow && (
        <p className="mb-3 text-xs font-medium uppercase tracking-[0.12em] text-muted">
          {eyebrow}
        </p>
      )}
      <h2 className="font-body text-[clamp(1.75rem,3vw,3rem)] font-bold leading-tight text-dark">
        {title}
      </h2>
      {subtitle && (
        <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted">
          {subtitle}
        </p>
      )}
    </div>
  )
}
