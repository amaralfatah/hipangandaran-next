// TEMPORARY — §1.4 verification only. Delete when §1.6 ships /guides/[slug].
import { MDXRemote } from 'next-mdx-remote/rsc'
import { notFound } from 'next/navigation'
import { getArticleBySlug, getAllArticles } from '@/lib/mdx'
import { mdxComponents } from '@/components/mdx'

export const dynamic = 'force-static'

export default async function TestMdxPage() {
  const article = await getArticleBySlug('test')
  if (!article) notFound()

  const all = await getAllArticles()

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 md:px-6 md:py-16">
      <p className="font-[family-name:var(--font-mono)] text-xs tracking-widest text-ocean uppercase">
        §1.4 smoke test · {article.frontmatter.category}
      </p>
      <h1 className="mt-3 font-[family-name:var(--font-display)] text-4xl leading-tight font-semibold tracking-tight text-charcoal md:text-5xl">
        {article.frontmatter.title}
      </h1>
      <p className="mt-4 text-charcoal/70">
        By {article.frontmatter.author} · {article.frontmatter.readingTime} min read · published{' '}
        {article.frontmatter.publishedAt}
      </p>

      <article className="mt-10">
        <MDXRemote source={article.content} components={mdxComponents} />
      </article>

      <hr className="my-12 border-charcoal/10" />

      <p className="font-[family-name:var(--font-mono)] text-xs text-charcoal/60">
        getAllArticles() returned {all.length} article{all.length === 1 ? '' : 's'}.
      </p>
    </div>
  )
}
