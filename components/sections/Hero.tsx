import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      <Image
        src="/images/hero-1.png"
        alt="Sunset over a Pangandaran tidepool reef, with a silhouetted tree on the right and distant island on the horizon"
        fill
        priority
        sizes="100vw"
        className="-z-20 object-cover object-center"
      />
      {/* Scrim — guarantees text contrast (>=4.5:1) against any photo */}
      <div
        aria-hidden="true"
        className="from-charcoal/75 via-charcoal/40 absolute inset-0 -z-10 bg-gradient-to-r to-transparent"
      />
      <div
        aria-hidden="true"
        className="from-charcoal/50 absolute inset-0 -z-10 bg-gradient-to-t to-transparent"
      />

      <div className="relative mx-auto max-w-6xl px-4 py-20 md:px-6 md:py-32">
        <p className="text-cream/90 font-[family-name:var(--font-mono)] text-sm tracking-widest uppercase">
          Pangandaran · Batukaras · Karapyak
        </p>
        <h1 className="text-cream mt-4 max-w-3xl text-4xl leading-tight font-semibold tracking-tight md:text-6xl">
          Your honest guide to Pangandaran &amp; Batukaras
        </h1>
        <p className="text-cream/90 mt-6 max-w-2xl text-lg md:text-xl">
          For surfers, digital nomads, and adventurers — not tour groups. Real prices, real WiFi
          speeds, real beaches worth your time.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild variant="coral" size="lg" className="focus-visible:ring-offset-ocean">
            <Link href="/guides">Start planning</Link>
          </Button>
          <Button
            asChild
            size="lg"
            className="border-cream/50 text-cream hover:border-cream hover:bg-cream/10 focus-visible:ring-cream focus-visible:ring-offset-ocean border bg-transparent font-normal"
          >
            <Link href="/places/accommodation">Find accommodation</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
