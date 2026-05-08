import Link from 'next/link'

const navLinks = [
  { href: '/guides', label: 'Guides' },
  { href: '/places', label: 'Places' },
  { href: '/tools/cost-calculator', label: 'Cost Calculator' },
  { href: '/about', label: 'About' },
]

export function Header() {
  return (
    <header className="border-charcoal/10 bg-cream border-b">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 md:px-6 md:py-5">
        <Link
          href="/"
          className="group flex flex-col leading-none"
          aria-label="Hi Pangandaran home"
        >
          <span className="text-ocean group-hover:text-coral font-[family-name:var(--font-display)] text-2xl font-semibold tracking-tight transition-colors md:text-3xl">
            Hi Pangandaran
          </span>
          <span className="text-charcoal/60 mt-0.5 font-[family-name:var(--font-body)] text-xs md:text-sm">
            your honest guide
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-7">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-charcoal/80 hover:text-ocean text-sm transition-colors"
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
            className="text-ocean text-sm font-medium underline-offset-4 hover:underline"
          >
            Guides
          </Link>
        </nav>
      </div>
    </header>
  )
}
