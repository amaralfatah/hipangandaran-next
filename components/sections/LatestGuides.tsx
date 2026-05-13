import Link from 'next/link'
import { Badge } from '@/components/ui/Badge'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/Card'
import { getAllArticles } from '@/lib/mdx'
import { formatArticleDate } from '@/lib/utils'

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
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between sm:gap-4">
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
          className="text-ocean shrink-0 text-sm underline-offset-4 hover:underline"
        >
          All guides →
        </Link>
      </div>

      <ul className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
        {latest.map((article) => {
          const { slug, frontmatter } = article
          return (
            <li key={slug}>
              <article className="h-full">
                <Card className="group focus-within:ring-ring relative flex h-full flex-col transition-shadow focus-within:ring-2 focus-within:ring-offset-2 hover:shadow-md">
                  <CardHeader>
                    <Badge variant="surf">
                      {categoryLabels[frontmatter.category] ?? frontmatter.category}
                    </Badge>
                    <CardTitle>
                      <Link
                        href={`/guides/${slug}`}
                        className="group-hover:text-ocean after:absolute after:inset-0 after:rounded-2xl focus-visible:outline-none"
                      >
                        {frontmatter.title}
                      </Link>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>{frontmatter.description}</CardContent>
                  <CardFooter>
                    <span>By {frontmatter.author}</span>
                    <span className="text-charcoal/60 font-[family-name:var(--font-mono)] text-xs">
                      {frontmatter.readingTime} min · {formatArticleDate(frontmatter.publishedAt)}
                    </span>
                  </CardFooter>
                </Card>
              </article>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
