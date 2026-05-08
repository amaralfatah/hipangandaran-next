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
      <p className="font-[family-name:var(--font-mono)] text-xs tracking-widest text-coral uppercase">
        Something broke
      </p>
      <h1 className="mt-3 font-[family-name:var(--font-display)] text-4xl font-semibold tracking-tight text-charcoal md:text-5xl">
        We hit an unexpected error
      </h1>
      <p className="mt-4 max-w-xl text-charcoal/80 md:text-lg">
        Try reloading. If it keeps happening, drop a line to{' '}
        <a href="mailto:hello@hipangandaran.com" className="text-ocean underline-offset-4 hover:underline">
          hello@hipangandaran.com
        </a>{' '}
        and we&rsquo;ll dig into it.
      </p>
      {error.digest && (
        <p className="mt-3 font-[family-name:var(--font-mono)] text-xs text-charcoal/55">
          Reference: {error.digest}
        </p>
      )}
      <div className="mt-8 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={reset}
          className="inline-flex h-11 items-center justify-center rounded-full bg-ocean px-6 text-sm font-medium text-cream transition-colors hover:bg-ocean/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ocean focus-visible:ring-offset-2 focus-visible:ring-offset-cream"
        >
          Try again
        </button>
        <Link
          href="/"
          className="inline-flex h-11 items-center justify-center rounded-full border border-charcoal/15 px-6 text-sm font-medium text-charcoal transition-colors hover:border-ocean hover:text-ocean focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ocean focus-visible:ring-offset-2 focus-visible:ring-offset-cream"
        >
          Back to home
        </Link>
      </div>
    </div>
  )
}
