import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { Slot } from 'radix-ui'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  "inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 font-medium whitespace-nowrap transition-colors outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-cream active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 disabled:pointer-events-none aria-invalid:border-destructive aria-invalid:ring-destructive/20 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        primary: 'bg-ocean text-cream hover:bg-ocean/90 focus-visible:ring-ocean',
        coral: 'bg-coral text-cream hover:bg-coral/90 focus-visible:ring-coral',
        secondary:
          'border border-charcoal/20 bg-transparent text-charcoal hover:border-ocean hover:text-ocean focus-visible:ring-ocean',
        ghost: 'bg-transparent text-charcoal hover:bg-charcoal/5 focus-visible:ring-ocean',
        outline:
          'border border-charcoal/20 bg-cream text-charcoal hover:bg-sand/40 hover:text-ocean focus-visible:ring-ocean',
      },
      size: {
        sm: 'h-9 px-4 text-sm rounded-full',
        md: 'h-11 px-6 text-sm rounded-full',
        lg: 'h-12 px-7 text-base rounded-full',
        icon: 'size-10 rounded-full',
        'icon-sm': 'size-9 rounded-full',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  },
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot.Root : 'button'

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
