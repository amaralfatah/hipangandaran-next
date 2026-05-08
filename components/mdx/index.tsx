import type { MDXComponents } from 'mdx/types'
import type { ComponentPropsWithoutRef } from 'react'
import { InfoBox } from '@/components/ui/InfoBox'
import { cn } from '@/lib/utils'

function Heading2({ className, ...rest }: ComponentPropsWithoutRef<'h2'>) {
  return (
    <h2
      className={cn(
        'mt-12 scroll-mt-24 font-[family-name:var(--font-display)] text-2xl font-semibold tracking-tight text-charcoal md:text-3xl',
        className,
      )}
      {...rest}
    />
  )
}

function Heading3({ className, ...rest }: ComponentPropsWithoutRef<'h3'>) {
  return (
    <h3
      className={cn(
        'mt-8 scroll-mt-24 font-[family-name:var(--font-display)] text-xl font-semibold tracking-tight text-charcoal md:text-2xl',
        className,
      )}
      {...rest}
    />
  )
}

function Paragraph({ className, ...rest }: ComponentPropsWithoutRef<'p'>) {
  return <p className={cn('mt-4 leading-relaxed text-charcoal/85', className)} {...rest} />
}

function Anchor({ className, href, ...rest }: ComponentPropsWithoutRef<'a'>) {
  const isExternal = href?.startsWith('http')
  return (
    <a
      href={href}
      className={cn('text-ocean underline-offset-4 hover:underline', className)}
      {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      {...rest}
    />
  )
}

function UnorderedList({ className, ...rest }: ComponentPropsWithoutRef<'ul'>) {
  return (
    <ul className={cn('mt-4 list-disc space-y-2 pl-6 text-charcoal/85', className)} {...rest} />
  )
}

function OrderedList({ className, ...rest }: ComponentPropsWithoutRef<'ol'>) {
  return (
    <ol className={cn('mt-4 list-decimal space-y-2 pl-6 text-charcoal/85', className)} {...rest} />
  )
}

function Blockquote({ className, ...rest }: ComponentPropsWithoutRef<'blockquote'>) {
  return (
    <blockquote
      className={cn(
        'mt-6 border-l-4 border-ocean/40 pl-4 text-charcoal/75 italic',
        className,
      )}
      {...rest}
    />
  )
}

function InlineCode({ className, ...rest }: ComponentPropsWithoutRef<'code'>) {
  return (
    <code
      className={cn(
        'rounded bg-charcoal/8 px-1.5 py-0.5 font-[family-name:var(--font-mono)] text-[0.9em]',
        className,
      )}
      {...rest}
    />
  )
}

export const mdxComponents: MDXComponents = {
  h2: Heading2,
  h3: Heading3,
  p: Paragraph,
  a: Anchor,
  ul: UnorderedList,
  ol: OrderedList,
  blockquote: Blockquote,
  code: InlineCode,
  InfoBox,
}
