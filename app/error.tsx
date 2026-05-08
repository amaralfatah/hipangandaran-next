'use client'

import { useEffect } from 'react'
import Link from 'next/link'

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function GlobalError({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error('Page error:', error)
  }, [error])

  return (
    <div className="mx-auto flex max-w-3xl flex-col items-start px-4 py-20 md:px-6 md:py-32">
      <p className="text-coral font-[family-name:var(--font-mono)] text-xs tracking-widest uppercase">
        Something broke
      </p>
      <h1 className="text-charcoal mt-3 font-[family-name:var(--font-display)] text-4xl font-semibold tracking-tight md:text-5xl">
        We hit an unexpected error
      </h1>
      <p className="text-charcoal/80 mt-4 max-w-xl md:text-lg">
        Try reloading. If it keeps happening, drop a line to{' '}
        <a
          href="mailto:hello@hipangandaran.com"
          className="text-ocean underline-offset-4 hover:underline"
        >
          hello@hipangandaran.com
        </a>{' '}
        and we&rsquo;ll dig into it.
      </p>
      {error.digest && (
        <p className="text-charcoal/55 mt-3 font-[family-name:var(--font-mono)] text-xs">
          Reference: {error.digest}
        </p>
      )}
      <div className="mt-8 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={reset}
          className="bg-ocean text-cream hover:bg-ocean/90 focus-visible:ring-ocean focus-visible:ring-offset-cream inline-flex h-11 items-center justify-center rounded-full px-6 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
        >
          Try again
        </button>
        <Link
          href="/"
          className="border-charcoal/15 text-charcoal hover:border-ocean hover:text-ocean focus-visible:ring-ocean focus-visible:ring-offset-cream inline-flex h-11 items-center justify-center rounded-full border px-6 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
        >
          Back to home
        </Link>
      </div>
    </div>
  )
}
