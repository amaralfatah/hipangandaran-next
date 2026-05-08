import type { Metadata } from 'next'
import { Breadcrumb } from '@/components/Breadcrumb'
import { CostCalculator } from '@/components/tools/CostCalculator'

export const metadata: Metadata = {
  title: 'Pangandaran Trip Cost Calculator — Budget Your Visit to Batukaras',
  description:
    'Estimate your total trip cost to Batukaras and Pangandaran — transport, accommodation, food, and activities. Updated May 2026.',
  alternates: {
    canonical: '/tools/cost-calculator',
  },
  openGraph: {
    title: 'Pangandaran Trip Cost Calculator | Hi Pangandaran',
    description:
      'Instantly estimate what a trip to Batukaras costs — transport, stay, food, and activities — for any group size or budget.',
    type: 'website',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Pangandaran Trip Cost Calculator',
  description:
    'Interactive cost estimator for trips to Batukaras and Pangandaran, covering transport, accommodation, food, and activities.',
  url: 'https://hipangandaran.com/tools/cost-calculator',
  applicationCategory: 'TravelApplication',
  operatingSystem: 'Any',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  featureList: [
    'Transport cost by origin city',
    'Accommodation estimate by budget style',
    'Food and activity costs',
    'USD and IDR output',
  ],
}

export default function CostCalculatorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mx-auto max-w-6xl px-4 py-10 md:px-6 md:py-16">
        <Breadcrumb
          items={[{ label: 'Home', href: '/' }, { label: 'Tools' }, { label: 'Cost Calculator' }]}
        />

        <header className="mt-6">
          <p className="text-ocean font-[family-name:var(--font-mono)] text-xs tracking-widest uppercase">
            Planning Tool
          </p>
          <h1 className="text-charcoal mt-3 font-[family-name:var(--font-display)] text-4xl font-semibold tracking-tight md:text-5xl">
            Pangandaran Trip Cost Calculator
          </h1>
          <p className="text-charcoal/75 mt-4 max-w-2xl md:text-lg">
            Plug in your group size, how long you&apos;re staying, and your budget style — get a
            realistic breakdown in seconds. Prices verified May 2026.
          </p>
          <p className="text-charcoal/50 mt-2 text-sm">
            All estimates in IDR (Indonesian Rupiah). USD shown for reference at Rp&nbsp;16,000/$.
          </p>
        </header>

        <div className="mt-10 md:mt-14">
          <CostCalculator />
        </div>

        <aside className="border-charcoal/10 bg-sand/30 mt-14 rounded-3xl border p-6">
          <h2 className="text-charcoal font-[family-name:var(--font-display)] text-xl font-semibold">
            How accurate is this?
          </h2>
          <p className="text-charcoal/75 mt-3 text-sm leading-relaxed">
            These are real-world averages from field research — not inflated tour operator prices.
            Transport costs assume economy class (bus/train); accommodation uses the midpoint of
            each category&apos;s typical nightly range; food covers local warungs and mid-level
            restaurants. Prices can shift, especially during peak season (July–August,
            December–January) or after fuel price changes. Always keep a 15–20% buffer.
          </p>
          <p className="text-charcoal/75 mt-3 text-sm leading-relaxed">
            See something wrong?{' '}
            <a href="mailto:hello@hipangandaran.com" className="text-ocean hover:underline">
              Email us
            </a>{' '}
            and we&apos;ll update the data.
          </p>
        </aside>
      </div>
    </>
  )
}
