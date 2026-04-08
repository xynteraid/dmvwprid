import { cn } from '@/lib/utils'

interface BadgeProps {
  children: React.ReactNode
  className?: string
  variant?: 'default' | 'red' | 'blue' | 'muted'
}

const variantClasses = {
  default: 'bg-vw-blue/10 text-vw-blue',
  red: 'bg-accent-red/10 text-accent-red',
  blue: 'bg-vw-blue text-white',
  muted: 'bg-border text-muted',
}

export default function Badge({
  children,
  className,
  variant = 'default',
}: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-3 py-1 text-xs font-medium uppercase tracking-widest',
        variantClasses[variant],
        className,
      )}
    >
      {children}
    </span>
  )
}
