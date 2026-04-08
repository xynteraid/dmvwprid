import Link from 'next/link'
import { cn } from '@/lib/utils'

interface ButtonProps {
  children: React.ReactNode
  className?: string
  href?: string
  onClick?: () => void
  size?: 'sm' | 'md' | 'lg'
  type?: 'button' | 'submit'
  variant?: 'primary' | 'ghost' | 'outline'
}

const sizeClasses = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
}

const variantClasses = {
  primary:
    'bg-vw-blue text-white hover:bg-vw-blue-hover focus-visible:ring-2 focus-visible:ring-focus',
  ghost:
    'text-vw-blue hover:bg-vw-blue/5 focus-visible:ring-2 focus-visible:ring-focus',
  outline:
    'border border-vw-blue text-vw-blue hover:bg-vw-blue hover:text-white focus-visible:ring-2 focus-visible:ring-focus',
}

export default function Button({
  children,
  className,
  href,
  onClick,
  size = 'md',
  type = 'button',
  variant = 'primary',
}: ButtonProps) {
  const classes = cn(
    'inline-flex items-center justify-center rounded-full font-medium transition-all duration-200 cursor-pointer',
    sizeClasses[size],
    variantClasses[variant],
    className,
  )

  if (href) {
    const isExternal = href.startsWith('http')
    if (isExternal) {
      return (
        <a href={href} className={classes} target="_blank" rel="noopener noreferrer">
          {children}
        </a>
      )
    }
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    )
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {children}
    </button>
  )
}
