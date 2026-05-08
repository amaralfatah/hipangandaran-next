import { forwardRef, type HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  as?: 'div' | 'article' | 'section'
}

export const Card = forwardRef<HTMLDivElement, CardProps>(function Card(
  { as: Component = 'div', className, ...rest },
  ref,
) {
  return (
    <Component
      ref={ref}
      className={cn(
        'border-charcoal/10 bg-cream rounded-2xl border p-5 shadow-[0_1px_2px_rgba(28,28,30,0.04)] transition-shadow hover:shadow-[0_4px_16px_rgba(28,28,30,0.06)]',
        className,
      )}
      {...rest}
    />
  )
})

export function CardHeader({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('mb-3 flex flex-col gap-1', className)} {...rest} />
}

export function CardTitle({ className, ...rest }: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn(
        'text-charcoal font-[family-name:var(--font-display)] text-xl leading-tight font-semibold',
        className,
      )}
      {...rest}
    />
  )
}

export function CardDescription({ className, ...rest }: HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn('text-charcoal/70 text-sm', className)} {...rest} />
}

export function CardContent({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('text-charcoal/85 text-sm', className)} {...rest} />
}

export function CardFooter({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('text-charcoal/70 mt-4 flex items-center justify-between text-sm', className)}
      {...rest}
    />
  )
}
