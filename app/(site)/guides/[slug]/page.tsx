import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { Badge } from '@/components/ui/Badge'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/Card'
import { EmailCapture } from '@/components/ui/EmailCapture'
import { InfoBox } from '@/components/ui/InfoBox'
import { TableOfContents } from '@/components/TableOfContents'
import { mdxComponents } from '@/components/mdx'
import { getAllArticles, getAllSlugs, getArticleBySlug } from '@/lib/mdx'
import { extractHeadings, formatVerificationDate } from '@/lib/utils'

const categoryLabels: Record<string, string> = {
  transport: 'Transport',
  accommodation: 'Stay',
  activities: 'Activities',
  food: 'Food',
  nomad: 'Nomad',
  planning: 'Planning',
}

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = await getAllSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const article = await getArticleBySlug(slug)
  if (!article) return { title: 'Not found' }

  const { frontmatter } = article
  const canonical = `/guides/${slug}`

  return {
    title: frontmatter.title,
    description: frontmatter.description,
    alternates: { canonical },
    openGraph: {
      title: frontmatter.title,
      description: frontmatter.description,
      type: 'article',
      url: canonical,
      publishedTime: frontmatter.publishedAt,
      modifiedTime: frontmatter.updatedAt,
      authors: [frontmatter.author],
      images: [
        {
          url: frontmatter.featuredImage,
          width: 1200,
          height: 630,
          alt: frontmatter.featuredImageAlt,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: frontmatter.title,
      description: frontmatter.description,
      images: [frontmatter.featuredImage],
    },
  }
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params
  const article = await getArticleBySlug(slug)
  if (!article) notFound()

  const { frontmatter, content } = article
  const headings = extractHeadings(content)

  const allArticles = await getAllArticles()
  const related = allArticles
    .filter((a) => a.slug !== slug && a.frontmatter.category === frontmatter.category)
    .slice(0, 3)

  const categoryLabel = categoryLabels[frontmatter.category] ?? frontmatter.category

  return (
    <article className="mx-auto max-w-6xl px-4 py-10 md:px-6 md:py-14">
      <Breadcrumb category={frontmatter.category} categoryLabel={categoryLabel} title={frontmatter.title} />

      <header className="mt-6 max-w-3xl">
        <Badge variant="surf">{categoryLabel}</Badge>
        <h1 className="mt-4 font-[family-name:var(--font-display)] text-4xl leading-tight font-semibold tracking-tight text-charcoal md:text-5xl">
          {frontmatter.title}
        </h1>
        <p className="mt-4 text-lg text-charcoal/80">{frontmatter.description}</p>
        <p className="mt-4 font-[family-name:var(--font-mono)] text-xs text-charcoal/60">
          By {frontmatter.author} · {frontmatter.readingTime} min read · last updated{' '}
          {formatVerificationDate(frontmatter.updatedAt)}
        </p>
      </header>

      {frontmatter.affiliateDisclosure && (
        <div className="mt-6 max-w-3xl rounded-2xl border border-warning/30 bg-warning/8 p-4 text-sm text-charcoal/85">
          <strong className="font-semibold text-warning">Affiliate disclosure:</strong> Some links
          below are affiliate links. If you book through them, we may earn a small commission at no
          extra cost to you. We only recommend places we&rsquo;d tell a friend about. See our{' '}
          <Link
            href="/affiliate-disclosure"
            className="text-ocean underline-offset-4 hover:underline"
          >
            full disclosure
          </Link>
          .
        </div>
      )}

      <figure className="mt-8 overflow-hidden rounded-3xl border border-charcoal/10">
        <Image
          src={frontmatter.featuredImage}
          alt={frontmatter.featuredImageAlt}
          width={1200}
          height={630}
          priority
          className="h-auto w-full"
        />
      </figure>

      <div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-[1fr_240px] md:gap-12 lg:grid-cols-[1fr_260px]">
        <div className="min-w-0">
          <TableOfContents headings={headings} className="md:hidden" />

          <div className="prose-base">
            <MDXRemote source={content} components={mdxComponents} />
          </div>

          <InfoBox type="info" title="Help us keep this current">
            <p>
              Prices and details verified {formatVerificationDate(frontmatter.updatedAt)}. Spotted
              something out of date?{' '}
              <Link
                href="/about#contact"
                className="text-ocean underline-offset-4 hover:underline"
              >
                Tell us what changed
              </Link>{' '}
              and we&rsquo;ll fix it.
            </p>
          </InfoBox>
        </div>

        <TableOfContents headings={headings} />
      </div>

      {related.length > 0 && (
        <section className="mt-16 border-t border-charcoal/10 pt-12">
          <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold tracking-tight text-charcoal md:text-3xl">
            Related guides
          </h2>
          <ul className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
            {related.map((r) => (
              <li key={r.slug}>
                <Link href={`/guides/${r.slug}`} className="block h-full">
                  <Card as="article" className="flex h-full flex-col">
                    <CardHeader>
                      <Badge variant="surf">
                        {categoryLabels[r.frontmatter.category] ?? r.frontmatter.category}
                      </Badge>
                      <CardTitle>{r.frontmatter.title}</CardTitle>
                    </CardHeader>
                    <CardContent>{r.frontmatter.description}</CardContent>
                    <CardFooter>
                      <span>By {r.frontmatter.author}</span>
                      <span className="font-[family-name:var(--font-mono)] text-xs text-charcoal/60">
                        {r.frontmatter.readingTime} min
                      </span>
                    </CardFooter>
                  </Card>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="mt-16">
        <EmailCapture />
      </section>
    </article>
  )
}

function Breadcrumb({
  category,
  categoryLabel,
  title,
}: {
  category: string
  categoryLabel: string
  title: string
}) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-charcoal/65">
      <ol className="flex flex-wrap items-center gap-1.5">
        <li>
          <Link href="/" className="hover:text-ocean">
            Home
          </Link>
        </li>
        <li aria-hidden="true">›</li>
        <li>
          <Link href="/guides" className="hover:text-ocean">
            Guides
          </Link>
        </li>
        <li aria-hidden="true">›</li>
        <li>
          <Link
            href={`/guides?category=${category}`}
            className="hover:text-ocean"
          >
            {categoryLabel}
          </Link>
        </li>
        <li aria-hidden="true">›</li>
        <li className="truncate text-charcoal/85">{title}</li>
      </ol>
    </nav>
  )
}
