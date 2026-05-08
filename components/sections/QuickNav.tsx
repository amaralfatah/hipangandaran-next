import Link from 'next/link'

interface QuickNavCard {
  emoji: string
  title: string
  description: string
  href: string
  comingSoon?: boolean
}

const cards: QuickNavCard[] = [
  {
    emoji: '🏄',
    title: 'Surf Guide',
    description: 'Where to surf, board rental rates, who to ask for lessons.',
    href: '/guides?category=activities',
  },
  {
    emoji: '🏠',
    title: 'Find Accommodation',
    description: 'Surf camps, villas, and homestays — filtered honestly.',
    href: '/places/accommodation',
  },
  {
    emoji: '🗺️',
    title: 'Getting Here',
    description: 'Trains, buses, and the back-road shortcut nobody mentions.',
    href: '/guides?category=transport',
  },
  {
    emoji: '💰',
    title: 'Cost Calculator',
    description: 'Estimate a realistic daily budget in Rp and USD.',
    href: '/tools/cost-calculator',
    comingSoon: true,
  },
]

export function QuickNav() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-20">
      <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold tracking-tight text-charcoal md:text-3xl">
        Start here
      </h2>
      <p className="mt-2 max-w-2xl text-sm text-charcoal/70 md:text-base">
        Four shortcuts to the questions most people ask before they land.
      </p>

      <ul className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
        {cards.map((card) => (
          <li key={card.title}>
            <Link
              href={card.href}
              className="group flex h-full flex-col rounded-2xl border border-charcoal/10 bg-cream p-4 transition-colors hover:border-ocean/40 hover:bg-sand/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ocean focus-visible:ring-offset-2 focus-visible:ring-offset-cream md:p-6"
              aria-label={`${card.title}${card.comingSoon ? ' (coming soon)' : ''}`}
            >
              <span aria-hidden="true" className="text-3xl md:text-4xl">
                {card.emoji}
              </span>
              <span className="mt-3 flex items-center gap-2">
                <span className="font-[family-name:var(--font-display)] text-base font-semibold text-charcoal group-hover:text-ocean md:text-lg">
                  {card.title}
                </span>
                {card.comingSoon && (
                  <span className="rounded-full bg-warning/15 px-2 py-0.5 text-[10px] font-medium tracking-wide text-warning uppercase">
                    Soon
                  </span>
                )}
              </span>
              <span className="mt-1 hidden text-sm text-charcoal/70 md:block">
                {card.description}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
