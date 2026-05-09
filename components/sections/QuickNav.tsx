import Link from 'next/link'
import { Waves, BedDouble, Route, Calculator, type LucideIcon } from 'lucide-react'

interface QuickNavCard {
  icon: LucideIcon
  title: string
  description: string
  href: string
  comingSoon?: boolean
}

const cards: QuickNavCard[] = [
  {
    icon: Waves,
    title: 'Surf Guide',
    description: 'Where to surf, board rental rates, who to ask for lessons.',
    href: '/guides?category=activities',
  },
  {
    icon: BedDouble,
    title: 'Find Accommodation',
    description: 'Surf camps, villas, and homestays — filtered honestly.',
    href: '/places/accommodation',
  },
  {
    icon: Route,
    title: 'Getting Here',
    description: 'Trains, buses, and the back-road shortcut nobody mentions.',
    href: '/guides?category=transport',
  },
  {
    icon: Calculator,
    title: 'Cost Calculator',
    description: 'Estimate a realistic daily budget in Rp and USD.',
    href: '/tools/cost-calculator',
  },
]

export function QuickNav() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-20">
      <h2 className="text-charcoal font-[family-name:var(--font-display)] text-2xl font-semibold tracking-tight md:text-3xl">
        Start here
      </h2>
      <p className="text-charcoal/70 mt-2 max-w-2xl text-sm md:text-base">
        Four shortcuts to the questions most people ask before they land.
      </p>

      <ul className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
        {cards.map((card) => (
          <li key={card.title}>
            <Link
              href={card.href}
              className="group border-charcoal/10 bg-cream hover:border-ocean/40 hover:bg-sand/30 focus-visible:ring-ocean flex h-full flex-col rounded-2xl border p-4 transition-colors focus-visible:ring-2 focus-visible:outline-none md:p-6"
              aria-label={`${card.title}${card.comingSoon ? ' (coming soon)' : ''}`}
            >
              <span
                aria-hidden="true"
                className="bg-ocean/10 text-ocean group-hover:bg-ocean group-hover:text-cream inline-flex h-10 w-10 items-center justify-center rounded-xl transition-colors md:h-12 md:w-12"
              >
                <card.icon className="h-5 w-5 md:h-6 md:w-6" strokeWidth={1.75} />
              </span>
              <span className="mt-3 flex items-center gap-2">
                <span className="text-charcoal group-hover:text-ocean font-[family-name:var(--font-display)] text-base font-semibold md:text-lg">
                  {card.title}
                </span>
                {card.comingSoon && (
                  <span className="bg-warning/15 text-warning rounded-full px-2 py-0.5 text-[10px] font-medium tracking-wide uppercase">
                    Soon
                  </span>
                )}
              </span>
              <span className="text-charcoal/70 mt-1 hidden text-sm md:block">
                {card.description}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
