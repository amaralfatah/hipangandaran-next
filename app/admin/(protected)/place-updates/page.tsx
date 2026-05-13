import { supabaseAdmin } from '@/lib/supabase/server'
import { PlaceUpdateActions } from '@/components/admin/PlaceUpdateActions'
import type { UpdateStatus } from '@/types/database'

const STATUS_BADGE: Record<UpdateStatus, string> = {
  pending: 'bg-yellow-100 text-yellow-700',
  approved: 'bg-green-100 text-green-700',
  rejected: 'bg-red-100 text-red-700',
}

export default async function PlaceUpdatesPage() {
  const { data: updates } = await supabaseAdmin
    .from('place_updates')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(100)

  return (
    <div>
      <h1 className="mb-6 text-xl font-semibold text-gray-900">Place Updates</h1>

      {!updates || updates.length === 0 ? (
        <p className="text-sm text-gray-500">No updates submitted yet.</p>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white">
          <table className="w-full min-w-[720px] text-sm">
            <thead className="border-b border-gray-200 bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium tracking-wide text-gray-500 uppercase">
                  Place ID
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium tracking-wide text-gray-500 uppercase">
                  Field
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium tracking-wide text-gray-500 uppercase">
                  New Value
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium tracking-wide text-gray-500 uppercase">
                  Submitted
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium tracking-wide text-gray-500 uppercase">
                  Status
                </th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {updates.map((u) => (
                <tr key={u.id} className="hover:bg-gray-50">
                  <td className="max-w-[120px] truncate px-4 py-3 font-mono text-xs text-gray-500">
                    {u.place_id}
                  </td>
                  <td className="px-4 py-3 text-gray-700">{u.field_updated}</td>
                  <td className="max-w-[200px] truncate px-4 py-3 text-gray-900">{u.new_value}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-gray-500">
                    {new Date(u.created_at).toLocaleDateString('en-GB', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-medium ${STATUS_BADGE[u.status]}`}
                    >
                      {u.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {u.status === 'pending' && <PlaceUpdateActions id={u.id} />}
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
