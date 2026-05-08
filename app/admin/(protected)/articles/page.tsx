import { getAllArticles } from '@/lib/mdx'
import Link from 'next/link'
import { ArticleRowActions } from '@/components/admin/ArticleRowActions'

export default async function ArticlesPage() {
  const articles = await getAllArticles()

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-baseline gap-3">
          <h1 className="text-xl font-semibold text-gray-900">Articles</h1>
          <span className="text-sm text-gray-500">{articles.length} published</span>
        </div>
        <Link
          href="/admin/articles/new"
          className="rounded bg-gray-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-700"
        >
          + New Article
        </Link>
      </div>

      {articles.length === 0 ? (
        <p className="text-sm text-gray-500">No articles yet.</p>
      ) : (
        <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
          <table className="w-full text-sm">
            <thead className="border-b border-gray-200 bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium tracking-wide text-gray-500 uppercase">
                  Title
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium tracking-wide text-gray-500 uppercase">
                  Category
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium tracking-wide text-gray-500 uppercase">
                  Published
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium tracking-wide text-gray-500 uppercase">
                  Updated
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium tracking-wide text-gray-500 uppercase">
                  Read time
                </th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {articles.map((a) => (
                <tr key={a.slug} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <a
                      href={`/guides/${a.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-900 hover:underline"
                    >
                      {a.frontmatter.title}
                    </a>
                  </td>
                  <td className="px-4 py-3">
                    <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600">
                      {a.frontmatter.category}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-gray-500">
                    {a.frontmatter.publishedAt}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-gray-500">
                    {a.frontmatter.updatedAt}
                  </td>
                  <td className="px-4 py-3 text-gray-500">{a.frontmatter.readingTime} min</td>
                  <td className="px-4 py-3">
                    <ArticleRowActions slug={a.slug} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
