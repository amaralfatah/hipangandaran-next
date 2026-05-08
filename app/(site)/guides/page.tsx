import type { Metadata } from 'next'
import Link from 'next/link'
import { Badge } from '@/components/ui/Badge'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/Card'
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

      {articles.length === 0 ? (
        <p className="text-charcoal/70 mt-12">No guides published yet — check back soon.</p>
      ) : (
        <ul className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
          {articles.map(({ slug, frontmatter }) => (
            <li key={slug}>
              <Link href={`/guides/${slug}`} className="block h-full">
                <Card as="article" className="flex h-full flex-col">
                  <CardHeader>
                    <Badge variant="surf">
                      {categoryLabels[frontmatter.category] ?? frontmatter.category}
                    </Badge>
                    <CardTitle>{frontmatter.title}</CardTitle>
                  </CardHeader>
                  <CardContent>{frontmatter.description}</CardContent>
                  <CardFooter>
                    <span>By {frontmatter.author}</span>
                    <span className="text-charcoal/60 font-[family-name:var(--font-mono)] text-xs">
                      {frontmatter.readingTime} min · {frontmatter.publishedAt}
                    </span>
                  </CardFooter>
                </Card>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
