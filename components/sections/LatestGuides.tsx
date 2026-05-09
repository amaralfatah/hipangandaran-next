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

export async function LatestGuides() {
  const articles = await getAllArticles()
  const latest = articles.slice(0, 3)

  if (latest.length === 0) return null

  return (
    <section className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-20">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h2 className="text-charcoal font-[family-name:var(--font-display)] text-2xl font-semibold tracking-tight md:text-3xl">
            Latest guides
          </h2>
          <p className="text-charcoal/70 mt-2 max-w-xl text-sm md:text-base">
            Verified in the last few weeks — prices, times, and who to talk to.
          </p>
        </div>
        <Link
          href="/guides"
          className="text-ocean hidden text-sm underline-offset-4 hover:underline md:inline"
        >
          All guides →
        </Link>
      </div>

      <ul className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
        {latest.map((article) => {
          const { slug, frontmatter } = article
          return (
            <li key={slug}>
              <Link href={`/guides/${slug}`} className="block h-full">
                <Card asChild className="flex h-full flex-col">
                  <article>
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
                  </article>
                </Card>
              </Link>
            </li>
          )
        })}
      </ul>

      <div className="mt-8 md:hidden">
        <Link href="/guides" className="text-ocean text-sm underline-offset-4 hover:underline">
          All guides →
        </Link>
      </div>
    </section>
  )
}
