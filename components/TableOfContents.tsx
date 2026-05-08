import { cn } from '@/lib/utils'
import type { Heading } from '@/lib/utils'

export interface TableOfContentsProps {
  headings: Heading[]
  className?: string
}

export function TableOfContents({ headings, className }: TableOfContentsProps) {
  if (headings.length === 0) return null

  const list = (
    <ol className="space-y-2 text-sm">
      {headings.map((h) => (
        <li
          key={h.slug}
          className={cn(h.level === 3 && 'pl-4')}
        >
          <a
            href={`#${h.slug}`}
            className="text-charcoal/70 underline-offset-4 transition-colors hover:text-ocean hover:underline"
          >
            {h.text}
          </a>
        </li>
      ))}
    </ol>
  )

  return (
    <>
      {/* Mobile — collapsible */}
      <details className={cn('group mb-8 rounded-2xl border border-charcoal/10 bg-cream p-4 md:hidden', className)}>
        <summary className="cursor-pointer list-none font-[family-name:var(--font-display)] text-sm font-semibold text-charcoal">
          <span className="inline-flex items-center gap-2">
            <span className="transition-transform group-open:rotate-90" aria-hidden="true">
              ›
            </span>
            On this page
          </span>
        </summary>
        <nav aria-label="Table of contents" className="mt-3">
          {list}
        </nav>
      </details>

      {/* Desktop — sticky sidebar */}
      <aside
        className={cn('hidden md:block', className)}
        aria-label="Table of contents"
      >
        <div className="sticky top-8">
          <p className="font-[family-name:var(--font-display)] text-xs font-semibold tracking-widest text-charcoal/60 uppercase">
            On this page
          </p>
          <nav className="mt-3">{list}</nav>
        </div>
      </aside>
    </>
  )
}
