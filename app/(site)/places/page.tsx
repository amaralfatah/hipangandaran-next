import type { Metadata } from 'next'
import Link from 'next/link'
import { Breadcrumb } from '@/components/Breadcrumb'

export const metadata: Metadata = {
  title: 'Places — Stay & Cafes in Pangandaran',
  description:
    'Find where to stay and where to work in Pangandaran, Batukaras, and across the Pangandaran regency. Filter by WiFi speed, price, and amenities.',
  alternates: { canonical: '/places' },
}

const sections = [
  {
    href: '/places/accommodation',
    title: 'Where to stay',
    description:
      'Homestays, surf camps, villas, guesthouses — filtered by WiFi speed, price, distance to beach.',
    emoji: '🏠',
  },
  {
    href: '/places/cafes',
    title: 'Cafes & WiFi',
    description: 'Cafes with measured WiFi speeds, power outlets, and honest opening hours.',
    emoji: '☕',
  },
]

export default function PlacesIndexPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 md:px-6 md:py-14">
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Places' }]} />

      <header className="mt-6 max-w-3xl">
        <p className="text-ocean font-[family-name:var(--font-mono)] text-xs tracking-widest uppercase">
          Places
        </p>
        <h1 className="text-charcoal mt-3 font-[family-name:var(--font-display)] text-4xl font-semibold tracking-tight md:text-5xl">
          Where to stay, where to work
        </h1>
        <p className="text-charcoal/75 mt-4 md:text-lg">
          Field-verified data, real photos, no copy-paste from operator brochures.
        </p>
      </header>

      <ul className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
        {sections.map((s) => (
          <li key={s.href}>
            <Link
              href={s.href}
              className="border-charcoal/10 bg-cream hover:border-ocean/40 hover:bg-sand/30 group block h-full rounded-2xl border p-6 transition-colors"
            >
              <span aria-hidden="true" className="text-4xl">
                {s.emoji}
              </span>
              <h2 className="text-charcoal group-hover:text-ocean mt-4 font-[family-name:var(--font-display)] text-xl font-semibold">
                {s.title}
              </h2>
              <p className="text-charcoal/75 mt-2 text-sm">{s.description}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
