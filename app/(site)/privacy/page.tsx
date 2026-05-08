import type { Metadata } from 'next'
import { Breadcrumb } from '@/components/Breadcrumb'

const LAST_UPDATED = 'May 8, 2026'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'How Hi Pangandaran handles cookies, analytics, email signups, affiliate links, and your rights under GDPR / CCPA.',
  alternates: { canonical: '/privacy' },
  robots: { index: true, follow: true },
}

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 md:px-6 md:py-16">
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Privacy' }]} />

      <header className="mt-6">
        <p className="text-ocean font-[family-name:var(--font-mono)] text-xs tracking-widest uppercase">
          Legal
        </p>
        <h1 className="text-charcoal mt-3 font-[family-name:var(--font-display)] text-4xl font-semibold tracking-tight md:text-5xl">
          Privacy Policy
        </h1>
        <p className="text-charcoal/60 mt-3 font-[family-name:var(--font-mono)] text-xs">
          Last updated: {LAST_UPDATED}
        </p>
      </header>

      <div className="prose-base text-charcoal/85 mt-10 space-y-6 leading-relaxed">
        <p>
          This is the privacy policy for <strong>Hi Pangandaran</strong> (hipangandaran.com). It
          explains what we collect, why, and what your rights are. We try to keep it short and
          human-readable. If anything is unclear, email{' '}
          <a
            href="mailto:hello@hipangandaran.com"
            className="text-ocean underline-offset-4 hover:underline"
          >
            hello@hipangandaran.com
          </a>
          .
        </p>

        <h2 className="text-charcoal font-[family-name:var(--font-display)] text-2xl font-semibold md:text-3xl">
          What we collect
        </h2>

        <h3 className="text-charcoal mt-6 font-[family-name:var(--font-display)] text-xl font-semibold">
          Email address (only if you sign up)
        </h3>
        <p>
          If you submit your email through a subscribe form on this site, we store it in our
          newsletter database (Supabase, hosted in the EU) along with the date you subscribed, the
          page you subscribed from, and your IP address. We use it to email you when a new guide
          ships. We do not sell, trade, or share your email with third parties. You can unsubscribe
          at any time using the link in any email.
        </p>

        <h3 className="text-charcoal mt-6 font-[family-name:var(--font-display)] text-xl font-semibold">
          Analytics
        </h3>
        <p>
          We use <strong>Vercel Analytics</strong> and <strong>Google Search Console</strong> to
          understand which guides people read and where traffic comes from. Vercel Analytics is
          privacy-friendly: it does not use cookies and does not collect personally identifiable
          information. Search Console only sees aggregated search query data from Google.
        </p>

        <h3 className="text-charcoal mt-6 font-[family-name:var(--font-display)] text-xl font-semibold">
          Cookies
        </h3>
        <p>
          This site itself does not set tracking cookies. Affiliate partners we link out to
          (Traveloka, Agoda, Booking.com, GetYourGuide, SafetyWing) may set their own cookies on
          their own domains when you click through — that is governed by their privacy policies, not
          ours.
        </p>

        <h3 className="text-charcoal mt-6 font-[family-name:var(--font-display)] text-xl font-semibold">
          Affiliate links
        </h3>
        <p>
          Some links on this site are affiliate links. When you click an affiliate link, the partner
          may set a tracking cookie that tells them you came from us, so we get credited for any
          booking you make. We never see your card details, names, or booking specifics — just an
          aggregate count and commission. See our{' '}
          <a href="/affiliate-disclosure" className="text-ocean underline-offset-4 hover:underline">
            affiliate disclosure
          </a>{' '}
          for the full picture.
        </p>

        <h2 className="text-charcoal mt-10 font-[family-name:var(--font-display)] text-2xl font-semibold md:text-3xl">
          Your rights
        </h2>
        <p>
          If you are in the EU, UK, or California, you have specific rights over your personal data:
        </p>
        <ul className="mt-3 list-disc space-y-2 pl-6">
          <li>
            <strong>Access:</strong> ask us what data we hold about you.
          </li>
          <li>
            <strong>Rectification:</strong> ask us to correct it.
          </li>
          <li>
            <strong>Deletion:</strong> ask us to delete it. We will, unless we are legally required
            to keep it.
          </li>
          <li>
            <strong>Portability:</strong> ask us to send you a copy in a machine-readable format.
          </li>
          <li>
            <strong>Withdraw consent:</strong> unsubscribe from emails at any time.
          </li>
        </ul>
        <p>
          To exercise any of these rights, email{' '}
          <a
            href="mailto:hello@hipangandaran.com"
            className="text-ocean underline-offset-4 hover:underline"
          >
            hello@hipangandaran.com
          </a>{' '}
          with the words &ldquo;privacy request&rdquo; in the subject line. We respond within 14
          days.
        </p>

        <h2 className="text-charcoal mt-10 font-[family-name:var(--font-display)] text-2xl font-semibold md:text-3xl">
          Children
        </h2>
        <p>
          This site is not directed at children under 13 (or 16 in the EU). We do not knowingly
          collect data from children. If you believe a child has submitted data, email us and we
          will delete it.
        </p>

        <h2 className="text-charcoal mt-10 font-[family-name:var(--font-display)] text-2xl font-semibold md:text-3xl">
          Changes to this policy
        </h2>
        <p>
          We update this page when laws or our practices change. The &ldquo;last updated&rdquo; date
          at the top reflects the latest revision. Major changes will be announced via the
          newsletter.
        </p>

        <h2 className="text-charcoal mt-10 font-[family-name:var(--font-display)] text-2xl font-semibold md:text-3xl">
          Contact
        </h2>
        <p>
          Hi Pangandaran
          <br />
          Email:{' '}
          <a
            href="mailto:hello@hipangandaran.com"
            className="text-ocean underline-offset-4 hover:underline"
          >
            hello@hipangandaran.com
          </a>
        </p>
      </div>
    </div>
  )
}
