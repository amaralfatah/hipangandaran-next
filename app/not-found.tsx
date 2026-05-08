import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Page not found',
  robots: { index: false, follow: false },
}

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-3xl flex-col items-start px-4 py-20 md:px-6 md:py-32">
      <p className="text-coral font-[family-name:var(--font-mono)] text-xs tracking-widest uppercase">
        Error 404
      </p>
      <h1 className="text-charcoal mt-3 font-[family-name:var(--font-display)] text-4xl font-semibold tracking-tight md:text-5xl">
        That page doesn&rsquo;t exist
      </h1>
      <p className="text-charcoal/80 mt-4 max-w-xl md:text-lg">
        Sorry — the link you followed is either old or wrong. The good news: most of what
        you&rsquo;re probably looking for is one of these.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          href="/"
          className="bg-ocean text-cream hover:bg-ocean/90 focus-visible:ring-ocean focus-visible:ring-offset-cream inline-flex h-11 items-center justify-center rounded-full px-6 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
        >
          Back to home
        </Link>
        <Link
          href="/guides"
          className="border-charcoal/15 text-charcoal hover:border-ocean hover:text-ocean focus-visible:ring-ocean focus-visible:ring-offset-cream inline-flex h-11 items-center justify-center rounded-full border px-6 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
        >
          Browse all guides
        </Link>
      </div>
    </div>
  )
}
