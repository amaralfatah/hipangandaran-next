import type { Metadata } from 'next'
import { Breadcrumb } from '@/components/Breadcrumb'

const LAST_UPDATED = 'May 8, 2026'

export const metadata: Metadata = {
  title: 'Affiliate Disclosure',
  description:
    'How affiliate links on Hi Pangandaran work, which programs we participate in, and why a commission never changes what we recommend.',
  alternates: { canonical: '/affiliate-disclosure' },
  robots: { index: true, follow: true },
}

export default function AffiliateDisclosurePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 md:px-6 md:py-16">
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Affiliate Disclosure' }]} />

      <header className="mt-6">
        <p className="text-ocean font-[family-name:var(--font-mono)] text-xs tracking-widest uppercase">
          Legal
        </p>
        <h1 className="text-charcoal mt-3 font-[family-name:var(--font-display)] text-4xl font-semibold tracking-tight md:text-5xl">
          Affiliate Disclosure
        </h1>
        <p className="text-charcoal/60 mt-3 font-[family-name:var(--font-mono)] text-xs">
          Last updated: {LAST_UPDATED}
        </p>
      </header>

      <div className="prose-base text-charcoal/85 mt-10 space-y-6 leading-relaxed">
        <p>
          <strong>The short version:</strong> some of the links on this site are affiliate links. If
          you book or buy something through them, we may earn a small commission at no extra cost to
          you. We only recommend places, operators, and gear we&rsquo;d genuinely recommend to a
          friend. A commission never changes what we recommend or how we review it.
        </p>

        <h2 className="text-charcoal mt-10 font-[family-name:var(--font-display)] text-2xl font-semibold md:text-3xl">
          What an affiliate link is
        </h2>
        <p>
          An affiliate link is a regular hyperlink with a tracking parameter that tells the partner
          site you arrived from us. If you complete a booking or purchase, the partner pays us a
          small commission — usually a few percent of the booking value. You pay the same price you
          would pay if you went directly.
        </p>

        <h2 className="text-charcoal mt-10 font-[family-name:var(--font-display)] text-2xl font-semibold md:text-3xl">
          Programs we participate in
        </h2>
        <ul className="mt-3 list-disc space-y-3 pl-6">
          <li>
            <strong>Traveloka</strong> — Indonesian booking platform for accommodation, transport,
            and activities. We mostly use them for in-country travel.
          </li>
          <li>
            <strong>Agoda</strong> — accommodation. Often the best price for South-East Asian stays.
          </li>
          <li>
            <strong>Booking.com</strong> — accommodation. Better filtering and free-cancellation
            policies than most.
          </li>
          <li>
            <strong>GetYourGuide</strong> — activity bookings (Green Canyon trips, day tours). Used
            selectively when an operator we trust is on the platform.
          </li>
          <li>
            <strong>SafetyWing</strong> — travel insurance for digital nomads. We recommend it
            because we use it ourselves.
          </li>
        </ul>
        <p>
          We may add or remove programs over time. The list above reflects our current partners as
          of {LAST_UPDATED}.
        </p>

        <h2 className="text-charcoal mt-10 font-[family-name:var(--font-display)] text-2xl font-semibold md:text-3xl">
          How affiliate links are marked
        </h2>
        <p>We label affiliate links and CTAs clearly:</p>
        <ul className="mt-3 list-disc space-y-2 pl-6">
          <li>
            Articles that contain affiliate links carry a disclosure box at the top of the page.
          </li>
          <li>
            Every affiliate link uses{' '}
            <code className="bg-charcoal/8 rounded px-1.5 py-0.5 font-[family-name:var(--font-mono)] text-[0.9em]">
              rel=&quot;nofollow sponsored noopener noreferrer&quot;
            </code>{' '}
            so that search engines and your browser know it is sponsored.
          </li>
          <li>This page lives in the footer of every page on the site.</li>
        </ul>

        <h2 className="text-charcoal mt-10 font-[family-name:var(--font-display)] text-2xl font-semibold md:text-3xl">
          How a commission does not change what we recommend
        </h2>
        <p>We commit to four things:</p>
        <ul className="mt-3 list-disc space-y-2 pl-6">
          <li>
            We never write a positive review of a place we have not stayed at, eaten at, or done the
            activity at.
          </li>
          <li>
            We never accept payment to feature a property, operator, or product. Affiliate
            commission is paid by the platform, not the place.
          </li>
          <li>
            If two options are equivalent and only one has an affiliate program, we&rsquo;ll still
            mention both. The non-affiliate option just won&rsquo;t have a tracked link.
          </li>
          <li>
            If we change our mind about a place — say, the WiFi tanked, the manager changed, the
            price tripled — we update or delist the recommendation, even if we&rsquo;ve been earning
            commission on it.
          </li>
        </ul>

        <h2 className="text-charcoal mt-10 font-[family-name:var(--font-display)] text-2xl font-semibold md:text-3xl">
          FTC compliance statement
        </h2>
        <p>
          In accordance with the United States Federal Trade Commission&rsquo;s 16 CFR Part 255{' '}
          (&ldquo;Guides Concerning the Use of Endorsements and Testimonials in Advertising&rdquo;),
          we disclose any material connection between us and the products, services, or platforms we
          link to. The presence of any affiliate link should be considered a paid endorsement, even
          when we have personal experience with the product. Our opinions, however, remain our own.
        </p>

        <h2 className="text-charcoal mt-10 font-[family-name:var(--font-display)] text-2xl font-semibold md:text-3xl">
          Questions?
        </h2>
        <p>
          Email{' '}
          <a
            href="mailto:hello@hipangandaran.com"
            className="text-ocean underline-offset-4 hover:underline"
          >
            hello@hipangandaran.com
          </a>{' '}
          if you spot a link that should be marked as affiliate but isn&rsquo;t, or if you have
          questions about how a specific recommendation came to be on the site.
        </p>
      </div>
    </div>
  )
}
