import type { Metadata } from 'next'
import Image from 'next/image'
import { Breadcrumb } from '@/components/Breadcrumb'

export const metadata: Metadata = {
  title: 'About',
  description:
    'Hi Pangandaran is written by Amar — a local who got tired of misleading travel content. Here&rsquo;s what this site is, and what it isn&rsquo;t.',
  alternates: { canonical: '/about' },
  openGraph: {
    title: 'About | Hi Pangandaran',
    description:
      'Hi Pangandaran is written by Amar — a local who got tired of misleading travel content.',
    type: 'profile',
  },
}

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 md:px-6 md:py-16">
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'About' }]} />

      <header className="mt-6">
        <p className="text-ocean font-[family-name:var(--font-mono)] text-xs tracking-widest uppercase">
          About
        </p>
        <h1 className="text-charcoal mt-3 font-[family-name:var(--font-display)] text-4xl font-semibold tracking-tight md:text-5xl">
          Hi, I&rsquo;m Amar
        </h1>
      </header>

      <figure className="border-charcoal/10 relative mt-8 aspect-[16/9] w-full overflow-hidden rounded-3xl border">
        <Image
          src="/images/me.png"
          alt="Amar — author of Hi Pangandaran"
          fill
          sizes="(min-width: 768px) 768px, 100vw"
          className="object-cover"
          priority
        />
      </figure>

      <div className="prose-base text-charcoal/85 mt-10 space-y-5 leading-relaxed">
        <p>
          I&rsquo;m Amar. I was born in Pangandaran town and grew up an hour east in Karapyak,
          where my family still runs <strong>Toko Cacha</strong> — a small warung in Emplak you can
          find on Google Maps. It&rsquo;s the shop that reopens earliest after Idul Fitri, while
          most of the village is still shut, because that&rsquo;s when travelers heading to
          Karapyak and Bagolo beaches stop in for water, smokes, and the things you forgot to pack.
        </p>
        <p>
          My day job is software — I work hybrid for a company in Jakarta, so most of the
          workweek I&rsquo;m in the city and Karapyak is where I head back every chance I get. The
          local rhythm is what resets me: kopi in the morning at the same warung, kopi again in
          the late afternoon at usually the same place, and a run into Pangandaran town when I
          want proper kuliner — grilled fish on the beach, the kind of food the Karapyak side
          doesn&rsquo;t really do.
        </p>
        <p>
          I started Hi Pangandaran because there isn&rsquo;t a single English-language site
          dedicated to this coast. The Indonesian ones that exist are mostly directories and
          booking pages — useful if you already know what you want, less so if you&rsquo;re trying
          to figure out whether to come at all. My goal here is narrower than &ldquo;inspire
          travelers&rdquo;: I want you to have a realistic picture before you book the flight.
        </p>

        <h2 className="text-charcoal mt-10 font-[family-name:var(--font-display)] text-2xl font-semibold md:text-3xl">
          Why this site exists
        </h2>
        <p>
          Most English-language content about Pangandaran is written by people who spent two days
          here, recycled the same five facts, and called it a guide. This site is the opposite:
          slow, specific, occasionally negative when it needs to be, and written by someone who
          actually grew up on this coast — not someone who flew in for a weekend.
        </p>

        <h2
          id="contact"
          className="text-charcoal mt-10 font-[family-name:var(--font-display)] text-2xl font-semibold md:text-3xl"
        >
          Get in touch
        </h2>
        <p>
          Spotted a price that&rsquo;s out of date? Want to report a closed warung or a broken link?
          Email{' '}
          <a
            href="mailto:hello@hipangandaran.com"
            className="text-ocean underline-offset-4 hover:underline"
          >
            hello@hipangandaran.com
          </a>
          . I read every message and I&rsquo;ll fix what needs fixing.
        </p>
        <p>
          Instagram:{' '}
          <a
            href="https://www.instagram.com/hipangandaran"
            target="_blank"
            rel="noopener noreferrer"
            className="text-ocean underline-offset-4 hover:underline"
          >
            @hipangandaran
          </a>
          .
        </p>
      </div>
    </div>
  )
}
