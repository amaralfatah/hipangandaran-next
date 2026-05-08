import type { Metadata } from 'next'
import { Suspense } from 'react'
import { Breadcrumb } from '@/components/Breadcrumb'
import { BreadcrumbJsonLd } from '@/components/JsonLd'
import { AccommodationsFilterClient } from '@/components/places/AccommodationsFilterClient'
import { getAllAccommodations } from '@/lib/places'

export const metadata: Metadata = {
  title: 'Where to Stay in Pangandaran & Batukaras',
  description:
    'Filter homestays, surf camps, villas and guesthouses across Pangandaran by price, WiFi speed, distance to beach, and amenities. Honest data, verified in person.',
  alternates: { canonical: '/places/accommodation' },
  openGraph: {
    title: 'Where to Stay in Pangandaran & Batukaras | Hi Pangandaran',
    description:
      'Filter homestays, surf camps, villas and guesthouses by price, WiFi speed, and amenities.',
    type: 'website',
  },
}

export default async function AccommodationPage() {
  const items = await getAllAccommodations()

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 md:px-6 md:py-14">
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: '/' },
          { name: 'Places', url: '/places/accommodation' },
          { name: 'Accommodation', url: '/places/accommodation' },
        ]}
      />
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Stay' }]} />

      <header className="mt-6 max-w-3xl">
        <p className="text-ocean font-[family-name:var(--font-mono)] text-xs tracking-widest uppercase">
          Stay
        </p>
        <h1 className="text-charcoal mt-3 font-[family-name:var(--font-display)] text-4xl font-semibold tracking-tight md:text-5xl">
          Where to stay
        </h1>
        <p className="text-charcoal/75 mt-4 md:text-lg">
          Real WiFi speeds, real distances, prices verified within the last 30 days. We&rsquo;ve
          stayed here ourselves or visited in person — none of these are tour-operator copy-paste.
        </p>
      </header>

      <Suspense fallback={<div className="text-charcoal/60 mt-8 text-sm">Loading filters…</div>}>
        <AccommodationsFilterClient items={items} />
      </Suspense>
    </div>
  )
}
