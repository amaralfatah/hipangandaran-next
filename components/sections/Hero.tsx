import Link from 'next/link'

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      {/* TODO(content): replace gradient with real Batukaras sunset photo (Next/Image, priority).
          Awaiting URL from user or photographer credit. */}
      <div
        aria-hidden="true"
        className="from-ocean via-ocean/85 to-coral/70 absolute inset-0 -z-10 bg-gradient-to-br"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.18),transparent_55%)]"
      />

      <div className="mx-auto max-w-6xl px-4 py-20 md:px-6 md:py-32">
        <p className="text-cream/80 font-[family-name:var(--font-mono)] text-xs tracking-widest uppercase">
          Pangandaran · Batukaras · Green Canyon
        </p>
        <h1 className="text-cream mt-4 max-w-3xl text-4xl leading-tight font-semibold tracking-tight md:text-6xl">
          Your honest guide to Pangandaran &amp; Batukaras
        </h1>
        <p className="text-cream/90 mt-6 max-w-2xl text-lg md:text-xl">
          For surfers, digital nomads, and adventurers — not tour groups. Real prices, real WiFi
          speeds, real beaches worth your time.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/guides"
            className="bg-coral text-cream hover:bg-coral/90 focus-visible:ring-coral focus-visible:ring-offset-ocean inline-flex h-13 items-center justify-center rounded-full px-7 text-base font-medium transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
          >
            Start planning
          </Link>
          <Link
            href="/places/accommodation"
            className="border-cream/50 text-cream hover:border-cream hover:bg-cream/10 focus-visible:ring-cream focus-visible:ring-offset-ocean inline-flex h-13 items-center justify-center rounded-full border bg-transparent px-7 text-base font-medium transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
          >
            Find accommodation
          </Link>
        </div>
      </div>
    </section>
  )
}
