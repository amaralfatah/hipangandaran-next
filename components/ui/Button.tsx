import { forwardRef, type ButtonHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'coral'
type ButtonSize = 'sm' | 'md' | 'lg'

const baseStyles =
  'inline-flex items-center justify-center rounded-full font-medium transition-colors ' +
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ' +
  'focus-visible:ring-offset-cream disabled:opacity-50 disabled:pointer-events-none'

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-ocean text-cream hover:bg-ocean/90 focus-visible:ring-ocean',
  secondary:
    'border border-charcoal/20 bg-transparent text-charcoal hover:border-ocean hover:text-ocean focus-visible:ring-ocean',
  ghost: 'bg-transparent text-charcoal hover:bg-charcoal/5 focus-visible:ring-ocean',
  coral: 'bg-coral text-cream hover:bg-coral/90 focus-visible:ring-coral',
}

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'h-9 px-4 text-sm',
  md: 'h-11 px-6 text-sm',
  lg: 'h-13 px-7 text-base',
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = 'primary', size = 'md', className, type = 'button', ...rest },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}
      {...rest}
    />
  )
})
