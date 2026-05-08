import type { HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

type BadgeVariant = 'default' | 'verified' | 'surf' | 'nomad' | 'warning'

const variantStyles: Record<BadgeVariant, string> = {
  default: 'bg-charcoal/8 text-charcoal/80',
  verified: 'bg-forest/10 text-forest',
  surf: 'bg-ocean/10 text-ocean',
  nomad: 'bg-coral/10 text-coral',
  warning: 'bg-warning/15 text-warning',
}

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant
}

export function Badge({ variant = 'default', className, ...rest }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium',
        variantStyles[variant],
        className,
      )}
      {...rest}
    />
  )
}
