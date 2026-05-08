import type { Metadata } from 'next'
import { Breadcrumb } from '@/components/Breadcrumb'
import { BreadcrumbJsonLd } from '@/components/JsonLd'
import { CafeListItem } from '@/components/places/CafeListItem'
import { getAllCafes } from '@/lib/places'
import { LOCATION_LABELS } from '@/types/filters'
import type { LocationArea } from '@/types/database'

export const metadata: Metadata = {
  title: 'Cafes & WiFi in Pangandaran & Batukaras',
  description:
    'Cafes with measured WiFi speeds, power outlets, opening hours, and price ranges across Pangandaran, Batukaras, and Cijulang.',
  alternates: { canonical: '/places/cafes' },
  openGraph: {
    title: 'Cafes & WiFi in Pangandaran & Batukaras | Hi Pangandaran',
    description: 'Where to work, plug in, and get a decent coffee — with measured WiFi speeds.',
    type: 'website',
  },
}

export default async function CafesPage() {
  const cafes = await getAllCafes()

  const grouped = cafes.reduce<Record<string, typeof cafes>>((acc, c) => {
    const key = c.location_area
    if (!acc[key]) acc[key] = []
    acc[key].push(c)
    return acc
  }, {})

  const orderedAreas = (Object.keys(grouped) as LocationArea[]).sort((a, b) =>
    LOCATION_LABELS[a].localeCompare(LOCATION_LABELS[b]),
  )

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 md:px-6 md:py-14">
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: '/' },
          { name: 'Places', url: '/places/cafes' },
          { name: 'Cafes', url: '/places/cafes' },
        ]}
      />
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Cafes' }]} />

      <header className="mt-6 max-w-3xl">
        <p className="text-ocean font-[family-name:var(--font-mono)] text-xs tracking-widest uppercase">
          Cafes
        </p>
        <h1 className="text-charcoal mt-3 font-[family-name:var(--font-display)] text-4xl font-semibold tracking-tight md:text-5xl">
          Cafes & WiFi
        </h1>
        <p className="text-charcoal/75 mt-4 md:text-lg">
          Measured speeds, not vibes. Bring a laptop, plug in, get something done.
        </p>
      </header>

      {cafes.length === 0 ? (
        <p className="text-charcoal/70 mt-12">No cafes listed yet — check back soon.</p>
      ) : (
        <div className="mt-10 space-y-12">
          {orderedAreas.map((area) => {
            const areaCafes = grouped[area] ?? []
            return (
              <section key={area}>
                <h2 className="text-charcoal font-[family-name:var(--font-display)] text-2xl font-semibold">
                  {LOCATION_LABELS[area]}
                </h2>
                <ul className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {areaCafes.map((cafe) => (
                    <li key={cafe.id}>
                      <CafeListItem cafe={cafe} />
                    </li>
                  ))}
                </ul>
              </section>
            )
          })}
        </div>
      )}
    </div>
  )
}
