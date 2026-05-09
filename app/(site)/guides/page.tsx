import type { Metadata } from 'next'
import { GuidesList } from '@/components/sections/GuidesList'
import { getAllArticles } from '@/lib/mdx'

const categoryLabels: Record<string, string> = {
  transport: 'Transport',
  accommodation: 'Stay',
  activities: 'Activities',
  food: 'Food',
  nomad: 'Nomad',
  planning: 'Planning',
}

export const metadata: Metadata = {
  title: 'All Guides',
  description:
    'Honest, field-verified travel guides for Pangandaran, Batukaras, and Green Canyon — written by a local, not a tour operator.',
  alternates: {
    canonical: '/guides',
  },
  openGraph: {
    title: 'All Guides | Hi Pangandaran',
    description:
      'Honest, field-verified travel guides for Pangandaran, Batukaras, and Green Canyon.',
    type: 'website',
  },
}

export default async function GuidesIndexPage() {
  const articles = await getAllArticles()
  const items = articles.map(({ slug, frontmatter }) => ({ slug, frontmatter }))

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-20">
      <header>
        <p className="text-ocean font-[family-name:var(--font-mono)] text-xs tracking-widest uppercase">
          Guides
        </p>
        <h1 className="text-charcoal mt-3 font-[family-name:var(--font-display)] text-4xl font-semibold tracking-tight md:text-5xl">
          All guides
        </h1>
        <p className="text-charcoal/75 mt-4 max-w-2xl md:text-lg">
          Field-verified articles on getting to Pangandaran, where to surf, where to stay, and how
          to spend a week without burning your budget.
        </p>
      </header>

      {items.length === 0 ? (
        <p className="text-charcoal/70 mt-12">No guides published yet — check back soon.</p>
      ) : (
        <GuidesList articles={items} categoryLabels={categoryLabels} />
      )}
    </div>
  )
}
