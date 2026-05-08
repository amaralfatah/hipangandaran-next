import { supabaseAdmin } from '@/lib/supabase/server'
import { getAllArticles } from '@/lib/mdx'
import Link from 'next/link'

async function getStats() {
  const [updatesResult, subscribersResult, articles, accommodationsResult, cafesResult] =
    await Promise.all([
      supabaseAdmin
        .from('place_updates')
        .select('id', { count: 'exact', head: true })
        .eq('status', 'pending'),
      supabaseAdmin
        .from('subscribers')
        .select('id', { count: 'exact', head: true })
        .is('unsubscribed_at', null),
      getAllArticles(),
      supabaseAdmin.from('accommodations').select('id', { count: 'exact', head: true }),
      supabaseAdmin.from('cafes').select('id', { count: 'exact', head: true }),
    ])

  return {
    pendingUpdates: updatesResult.count ?? 0,
    subscribers: subscribersResult.count ?? 0,
    articles: articles.length,
    accommodations: accommodationsResult.count ?? 0,
    cafes: cafesResult.count ?? 0,
  }
}

export default async function DashboardPage() {
  const stats = await getStats()

  const cards = [
    {
      label: 'Pending Updates',
      value: stats.pendingUpdates,
      href: '/admin/place-updates',
      badge: stats.pendingUpdates > 0,
    },
    { label: 'Subscribers', value: stats.subscribers, href: '/admin/subscribers', badge: false },
    { label: 'Published Articles', value: stats.articles, href: '/admin/articles', badge: false },
    {
      label: 'Accommodations',
      value: stats.accommodations,
      href: '/admin/accommodations',
      badge: false,
    },
    { label: 'Cafes', value: stats.cafes, href: '/admin/cafes', badge: false },
  ]

  return (
    <div>
      <h1 className="mb-6 text-xl font-semibold text-gray-900">Overview</h1>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {cards.map(({ label, value, href, badge }) => (
          <Link
            key={label}
            href={href}
            className="rounded-lg border border-gray-200 bg-white p-5 transition-colors hover:border-gray-300"
          >
            <p className="mb-1 text-sm text-gray-500">{label}</p>
            <div className="flex items-center gap-2">
              <p className="text-3xl font-bold text-gray-900">{value}</p>
              {badge && (
                <span className="rounded-full bg-orange-100 px-2 py-0.5 text-xs font-medium text-orange-700">
                  needs review
                </span>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
