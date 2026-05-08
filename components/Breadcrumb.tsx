import Link from 'next/link'

export interface BreadcrumbCrumb {
  label: string
  href?: string
}

export interface BreadcrumbProps {
  items: BreadcrumbCrumb[]
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-charcoal/65">
      <ol className="flex flex-wrap items-center gap-1.5">
        {items.map((item, idx) => {
          const last = idx === items.length - 1
          return (
            <li key={`${item.label}-${idx}`} className="flex items-center gap-1.5">
              {item.href && !last ? (
                <Link href={item.href} className="hover:text-ocean">
                  {item.label}
                </Link>
              ) : (
                <span className={last ? 'truncate text-charcoal/85' : ''}>{item.label}</span>
              )}
              {!last && (
                <span aria-hidden="true" className="text-charcoal/40">
                  ›
                </span>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
