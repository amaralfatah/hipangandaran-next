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
      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'About' },
        ]}
      />

      <header className="mt-6">
        <p className="font-[family-name:var(--font-mono)] text-xs tracking-widest text-ocean uppercase">
          About
        </p>
        <h1 className="mt-3 font-[family-name:var(--font-display)] text-4xl font-semibold tracking-tight text-charcoal md:text-5xl">
          Hi, I&rsquo;m Amar
        </h1>
      </header>

      <figure className="mt-8 overflow-hidden rounded-3xl border border-charcoal/10">
        {/* TODO(content): replace with real photo of Amar in Pangandaran. */}
        <Image
          src="/images/guides/placeholder.jpg"
          alt="Placeholder portrait — replace with author photo"
          width={1200}
          height={630}
          className="h-auto w-full"
        />
      </figure>

      <div className="prose-base mt-10 space-y-5 leading-relaxed text-charcoal/85">
        <p>
          [PLACEHOLDER: 1 paragraf — siapa Anda, sudah berapa lama di Pangandaran, kenapa di sini.
          Tulis dengan voice &ldquo;honest local friend&rdquo; — second person, casual, satu detail spesifik
          yang tidak generik.]
        </p>
        <p>
          [PLACEHOLDER: 1 paragraf — apa yang Anda kerjakan sehari-hari. Surf? Remote work? Ngajar?
          Ini bagian &ldquo;trust foundation&rdquo; untuk audience asing — semakin spesifik, semakin
          dipercaya.]
        </p>
        <p>
          [PLACEHOLDER: 1 paragraf — kenapa Anda bikin site ini. Frustrasi sama travel content yang
          generik? Capek lihat turis ditipu di Green Canyon? Tulis honest.]
        </p>

        <h2 className="font-[family-name:var(--font-display)] mt-10 text-2xl font-semibold text-charcoal md:text-3xl">
          Why this site exists
        </h2>
        <p>
          Most English-language content about Pangandaran is written by people who spent two days
          here, recycled the same five facts, and called it a guide. This site is the opposite:
          slow, specific, occasionally negative when it needs to be, and updated by someone who
          actually lives within walking distance of the lineup.
        </p>

        <h2 id="contact" className="font-[family-name:var(--font-display)] mt-10 text-2xl font-semibold text-charcoal md:text-3xl">
          Get in touch
        </h2>
        <p>
          Spotted a price that&rsquo;s out of date? Want to report a closed warung or a broken
          link? Email{' '}
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
