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
    <footer className="mt-16 border-t border-charcoal/10 bg-sand/40">
      <div className="mx-auto max-w-6xl px-4 py-10 md:px-6 md:py-14">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="md:col-span-2">
            <p className="font-[family-name:var(--font-display)] text-xl font-semibold text-ocean">
              Hi Pangandaran
            </p>
            <p className="mt-2 max-w-md text-sm text-charcoal/70">
              An honest English travel guide to Pangandaran, Batukaras, and Green Canyon. Written
              by Amar — a local, not a tour operator.
            </p>
            <p className="mt-4 text-xs text-charcoal/60">
              <a
                href="https://www.instagram.com/hipangandaran"
                target="_blank"
                rel="noopener noreferrer"
                className="underline-offset-4 hover:text-ocean hover:underline"
              >
                Instagram @hipangandaran
              </a>
            </p>
          </div>

          {footerNav.map((group) => (
            <div key={group.heading}>
              <h2 className="font-[family-name:var(--font-display)] text-sm font-semibold tracking-wide text-charcoal uppercase">
                {group.heading}
              </h2>
              <ul className="mt-3 space-y-2">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-charcoal/75 transition-colors hover:text-ocean"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 border-t border-charcoal/10 pt-6 text-xs text-charcoal/60">
          <p>
            Some links on this site are affiliate links. If you book through them, we may earn a
            small commission at no extra cost to you. We only recommend places and operators we
            would tell a friend about. See our{' '}
            <Link href="/affiliate-disclosure" className="underline-offset-4 hover:text-ocean hover:underline">
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
