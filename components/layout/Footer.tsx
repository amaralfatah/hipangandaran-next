import Link from 'next/link'

const footerNav = [
  {
    heading: 'Explore',
    links: [
      { href: '/guides', label: 'Guides' },
      { href: '/places', label: 'Places' },
      { href: '/tools/cost-calculator', label: 'Cost Calculator' },
    ],
  },
  {
    heading: 'About',
    links: [
      { href: '/about', label: 'About' },
      { href: '/affiliate-disclosure', label: 'Affiliate Disclosure' },
      { href: '/privacy', label: 'Privacy' },
    ],
  },
]

export function Footer({ lastVerified }: { lastVerified?: string }) {
  const year = new Date().getFullYear()

  return (
    <footer className="border-charcoal/10 bg-sand/40 mt-16 border-t">
      <div className="mx-auto max-w-6xl px-4 py-10 md:px-6 md:py-14">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="md:col-span-2">
            <p className="text-ocean font-[family-name:var(--font-display)] text-xl font-semibold">
              Hi Pangandaran
            </p>
            <p className="text-charcoal/70 mt-2 max-w-md text-sm">
              An honest English travel guide to Pangandaran, Batukaras, and Green Canyon. Written by
              Amar — a local, not a tour operator.
            </p>
            <p className="text-charcoal/75 mt-4 text-sm">
              <a
                href="https://www.instagram.com/hipangandaran"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-ocean inline-flex items-center gap-1.5 underline-offset-4 hover:underline"
              >
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                >
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="0.75" fill="currentColor" />
                </svg>
                @hipangandaran
              </a>
            </p>
          </div>

          {footerNav.map((group) => (
            <div key={group.heading}>
              <h3 className="text-charcoal font-[family-name:var(--font-display)] text-sm font-semibold tracking-wide uppercase">
                {group.heading}
              </h3>
              <ul className="mt-3 space-y-2">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-charcoal/75 hover:text-ocean text-sm transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-charcoal/10 text-charcoal/60 mt-10 border-t pt-6 text-xs">
          <p>
            Some links on this site are affiliate links. If you book through them, we may earn a
            small commission at no extra cost to you. We only recommend places and operators we
            would tell a friend about. See our{' '}
            <Link
              href="/affiliate-disclosure"
              className="hover:text-ocean underline-offset-4 hover:underline"
            >
              full disclosure
            </Link>
            .
          </p>
          <p className="mt-3">
            <span className="font-[family-name:var(--font-mono)]">
              Data last verified: {lastVerified ?? 'May 2026'}
            </span>
            {' · '}© {year} Hi Pangandaran
          </p>
        </div>
      </div>
    </footer>
  )
}
