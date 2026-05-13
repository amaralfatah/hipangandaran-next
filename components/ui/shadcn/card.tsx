import * as React from 'react'
import { Slot } from 'radix-ui'

import { cn } from '@/lib/utils'

function Card({
  className,
  asChild = false,
  ...props
}: React.ComponentProps<'div'> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : 'div'
  return (
    <Comp
      data-slot="card"
      className={cn(
        'border-charcoal/10 bg-cream rounded-2xl border p-5 shadow-[0_1px_2px_rgba(28,28,30,0.04)] transition-shadow hover:shadow-[0_4px_16px_rgba(28,28,30,0.06)]',
        className,
      )}
      {...props}
    />
  )
}

function CardHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-header"
      className={cn('mb-3 flex flex-col items-start gap-2', className)}
      {...props}
    />
  )
}

function CardTitle({
  className,
  asChild = false,
  ...props
}: React.ComponentProps<'h3'> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : 'h3'
  return (
    <Comp
      data-slot="card-title"
      className={cn(
        'text-charcoal font-[family-name:var(--font-display)] text-xl leading-tight font-semibold',
        className,
      )}
      {...props}
    />
  )
}

function CardDescription({ className, ...props }: React.ComponentProps<'p'>) {
  return (
    <p
      data-slot="card-description"
      className={cn('text-charcoal/70 text-sm', className)}
      {...props}
    />
  )
}

function CardAction({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-action"
      className={cn('self-start justify-self-end', className)}
      {...props}
    />
  )
}

function CardContent({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-content"
      className={cn('text-charcoal/85 line-clamp-3 text-sm', className)}
      {...props}
    />
  )
}

function CardFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-footer"
      className={cn('text-charcoal/70 mt-4 flex items-center justify-between text-sm', className)}
      {...props}
    />
  )
}

export { Card, CardHeader, CardFooter, CardTitle, CardAction, CardDescription, CardContent }
