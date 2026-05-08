import { supabaseAdmin } from '@/lib/supabase/server'
import { SubscriberActions } from '@/components/admin/SubscriberActions'

export default async function SubscribersPage() {
  const { data: subscribers } = await supabaseAdmin
    .from('subscribers')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(200)

  const active = subscribers?.filter((s) => !s.unsubscribed_at) ?? []
  const total = subscribers?.length ?? 0

  return (
    <div>
      <div className="mb-6 flex items-baseline gap-3">
        <h1 className="text-xl font-semibold text-gray-900">Subscribers</h1>
        <span className="text-sm text-gray-500">
          {active.length} active / {total} total
        </span>
      </div>

      {total === 0 ? (
        <p className="text-sm text-gray-500">No subscribers yet.</p>
      ) : (
        <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
          <table className="w-full text-sm">
            <thead className="border-b border-gray-200 bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium tracking-wide text-gray-500 uppercase">
                  Email
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium tracking-wide text-gray-500 uppercase">
                  Source
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium tracking-wide text-gray-500 uppercase">
                  Signed up
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium tracking-wide text-gray-500 uppercase">
                  Status
                </th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {subscribers?.map((s) => (
                <tr key={s.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-gray-900">{s.email}</td>
                  <td className="px-4 py-3 text-gray-500">{s.source ?? '—'}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-gray-500">
                    {new Date(s.created_at).toLocaleDateString('en-GB', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </td>
                  <td className="px-4 py-3">
                    {s.unsubscribed_at ? (
                      <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-500">
                        unsubscribed
                      </span>
                    ) : (
                      <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">
                        active
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    {!s.unsubscribed_at && <SubscriberActions id={s.id} />}
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
