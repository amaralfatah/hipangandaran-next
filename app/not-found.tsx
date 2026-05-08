import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Page not found',
  robots: { index: false, follow: false },
}

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-3xl flex-col items-start px-4 py-20 md:px-6 md:py-32">
      <p className="font-[family-name:var(--font-mono)] text-xs tracking-widest text-coral uppercase">
        Error 404
      </p>
      <h1 className="mt-3 font-[family-name:var(--font-display)] text-4xl font-semibold tracking-tight text-charcoal md:text-5xl">
        That page doesn&rsquo;t exist
      </h1>
      <p className="mt-4 max-w-xl text-charcoal/80 md:text-lg">
        Sorry — the link you followed is either old or wrong. The good news: most of what
        you&rsquo;re probably looking for is one of these.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          href="/"
          className="inline-flex h-11 items-center justify-center rounded-full bg-ocean px-6 text-sm font-medium text-cream transition-colors hover:bg-ocean/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ocean focus-visible:ring-offset-2 focus-visible:ring-offset-cream"
        >
          Back to home
        </Link>
        <Link
          href="/guides"
          className="inline-flex h-11 items-center justify-center rounded-full border border-charcoal/15 px-6 text-sm font-medium text-charcoal transition-colors hover:border-ocean hover:text-ocean focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ocean focus-visible:ring-offset-2 focus-visible:ring-offset-cream"
        >
          Browse all guides
        </Link>
      </div>
    </div>
  )
}
