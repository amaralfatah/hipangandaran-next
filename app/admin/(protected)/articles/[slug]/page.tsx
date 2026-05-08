import { getArticleBySlug } from '@/lib/mdx'
import { ArticleForm } from '@/components/admin/ArticleForm'
import Link from 'next/link'
import { notFound } from 'next/navigation'

interface PageProps {
  params: Promise<{ slug: string }>
}

export default async function ArticleEditPage({ params }: PageProps) {
  const { slug } = await params
  const isNew = slug === 'new'

  let article = null
  if (!isNew) {
    article = await getArticleBySlug(slug)
    if (!article) notFound()
  }

  return (
    <div>
      <div className="mb-6 flex items-center gap-3">
        <Link href="/admin/articles" className="text-sm text-gray-500 hover:text-gray-700">
          ← Articles
        </Link>
        <h1 className="text-xl font-semibold text-gray-900">
          {isNew ? 'New Article' : `Edit: ${article!.frontmatter.title}`}
        </h1>
      </div>
      <ArticleForm
        initialSlug={isNew ? undefined : slug}
        initialFrontmatter={article?.frontmatter}
        initialContent={article?.content}
      />
    </div>
  )
}
