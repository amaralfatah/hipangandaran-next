import Link from 'next/link'

const navLinks = [
  { href: '/guides', label: 'Guides' },
  { href: '/places', label: 'Places' },
  { href: '/tools/cost-calculator', label: 'Cost Calculator' },
  { href: '/about', label: 'About' },
]

export function Header() {
  return (
    <header className="border-b border-charcoal/10 bg-cream">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 md:px-6 md:py-5">
        <Link href="/" className="group flex flex-col leading-none" aria-label="Hi Pangandaran home">
          <span
            className="font-[family-name:var(--font-display)] text-2xl font-semibold tracking-tight text-ocean transition-colors group-hover:text-coral md:text-3xl"
          >
            Hi Pangandaran
          </span>
          <span className="mt-0.5 font-[family-name:var(--font-body)] text-xs text-charcoal/60 md:text-sm">
            your honest guide
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-7">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-charcoal/80 transition-colors hover:text-ocean"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile nav: simple inline list, no JS toggle yet */}
        <nav aria-label="Primary mobile" className="md:hidden">
          <Link
            href="/guides"
            className="text-sm font-medium text-ocean underline-offset-4 hover:underline"
          >
            Guides
          </Link>
        </nav>
      </div>
    </header>
  )
}
