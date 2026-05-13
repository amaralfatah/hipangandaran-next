'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'
import { Search } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/shadcn/button'
import { Input } from '@/components/ui/shadcn/input'
import { cn, formatArticleDate } from '@/lib/utils'
import type { GuideFrontmatter } from '@/lib/mdx'

export interface GuideListItem {
  slug: string
  frontmatter: GuideFrontmatter
}

interface GuidesListProps {
  articles: GuideListItem[]
  categoryLabels: Record<string, string>
}

const ALL = 'all'

const categoryBadgeVariant: Record<string, 'surf' | 'nomad' | 'cafe' | 'default'> = {
  activities: 'surf',
  nomad: 'nomad',
  food: 'cafe',
  transport: 'default',
  accommodation: 'default',
  planning: 'default',
}

export function GuidesList({ articles, categoryLabels }: GuidesListProps) {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<string>(ALL)

  const categories = useMemo(() => {
    const set = new Set(articles.map((a) => a.frontmatter.category))
    return Array.from(set)
  }, [articles])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return articles.filter(({ frontmatter }) => {
      if (category !== ALL && frontmatter.category !== category) return false
      if (!q) return true
      return (
        frontmatter.title.toLowerCase().includes(q) ||
        frontmatter.description.toLowerCase().includes(q) ||
        frontmatter.author.toLowerCase().includes(q) ||
        (categoryLabels[frontmatter.category] ?? frontmatter.category).toLowerCase().includes(q)
      )
    })
  }, [articles, query, category, categoryLabels])

  return (
    <div className="mt-10">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="relative flex-1 md:max-w-md">
          <Search
            aria-hidden="true"
            className="text-charcoal/40 pointer-events-none absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2"
          />
          <label htmlFor="guide-search" className="sr-only">
            Search guides
          </label>
          <Input
            id="guide-search"
            type="search"
            inputMode="search"
            placeholder="Search guides — surf, transport, WiFi…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="border-charcoal/15 bg-cream text-charcoal placeholder:text-charcoal/40 focus-visible:border-ocean focus-visible:ring-ocean/40 h-11 rounded-full pl-11"
          />
        </div>

        <div
          aria-label="Filter guides by category"
          className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] md:mx-0 md:flex-wrap md:overflow-visible md:px-0 md:pb-0 [&::-webkit-scrollbar]:hidden"
        >
          <FilterPill active={category === ALL} onClick={() => setCategory(ALL)} label="All" />
          {categories.map((c) => (
            <FilterPill
              key={c}
              active={category === c}
              onClick={() => setCategory(c)}
              label={categoryLabels[c] ?? c}
            />
          ))}
        </div>
      </div>

      <p className="text-charcoal/55 mt-4 font-[family-name:var(--font-mono)] text-xs tracking-wide">
        {filtered.length} of {articles.length} {articles.length === 1 ? 'guide' : 'guides'}
      </p>

      {filtered.length === 0 ? (
        <p className="text-charcoal/70 mt-10">
          No guides match that search. Try fewer words, or{' '}
          <button
            type="button"
            onClick={() => {
              setQuery('')
              setCategory(ALL)
            }}
            className="text-ocean underline-offset-2 hover:underline"
          >
            clear filters
          </button>
          .
        </p>
      ) : (
        <ul className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
          {filtered.map(({ slug, frontmatter }) => (
            <li key={slug}>
              <Link href={`/guides/${slug}`} className="block h-full">
                <Card asChild className="flex h-full flex-col">
                  <article>
                    <CardHeader>
                      <Badge variant={categoryBadgeVariant[frontmatter.category] ?? 'default'}>
                        {categoryLabels[frontmatter.category] ?? frontmatter.category}
                      </Badge>
                      <CardTitle>{frontmatter.title}</CardTitle>
                    </CardHeader>
                    <CardContent>{frontmatter.description}</CardContent>
                    <CardFooter>
                      <span>By {frontmatter.author}</span>
                      <span className="text-charcoal/60 font-[family-name:var(--font-mono)] text-xs">
                        {frontmatter.readingTime} min · {formatArticleDate(frontmatter.publishedAt)}
                      </span>
                    </CardFooter>
                  </article>
                </Card>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

function FilterPill({
  active,
  onClick,
  label,
}: {
  active: boolean
  onClick: () => void
  label: string
}) {
  return (
    <Button
      type="button"
      variant={active ? 'primary' : 'secondary'}
      size="sm"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        // Expanded hitbox: 44pt vertical tap area on touch, compact visual on desktop
        '-my-1.5 h-11 shrink-0 px-3.5 text-xs md:my-0 md:h-9',
        !active && 'bg-cream',
      )}
    >
      {label}
    </Button>
  )
}
