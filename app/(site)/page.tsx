export default function HomePage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-24">
      <div className="max-w-3xl">
        <p className="font-[family-name:var(--font-mono)] text-xs tracking-widest text-ocean uppercase">
          Pangandaran · Batukaras · Green Canyon
        </p>
        <h1 className="mt-4 text-4xl leading-tight font-semibold tracking-tight text-charcoal md:text-6xl">
          Your honest guide to Pangandaran &amp; Batukaras
        </h1>
        <p className="mt-6 text-lg text-charcoal/80 md:text-xl">
          Real prices in <span className="font-[family-name:var(--font-mono)]">Rp</span>, real WiFi
          speeds, real beaches worth your time. Written by a local — not a tour operator.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href="/guides"
            className="inline-flex h-12 items-center justify-center rounded-full bg-ocean px-6 text-sm font-medium text-cream transition-colors hover:bg-ocean/90"
          >
            Read the guides
          </a>
          <a
            href="/tools/cost-calculator"
            className="inline-flex h-12 items-center justify-center rounded-full border border-charcoal/15 px-6 text-sm font-medium text-charcoal transition-colors hover:border-ocean hover:text-ocean"
          >
            Estimate your trip cost
          </a>
        </div>
        <p className="mt-12 font-[family-name:var(--font-mono)] text-xs text-charcoal/60">
          §1.2 layout scaffold — sections (hero polish, quick nav, latest guides, email capture)
          land in §1.5.
        </p>
      </div>
    </div>
  )
}
