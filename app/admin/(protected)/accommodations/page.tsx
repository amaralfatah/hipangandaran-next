import { supabaseAdmin } from '@/lib/supabase/server'
import Link from 'next/link'
import { AccommodationActions } from '@/components/admin/AccommodationActions'

export default async function AccommodationsPage() {
  const { data: accommodations } = await supabaseAdmin
    .from('accommodations')
    .select('*')
    .order('name', { ascending: true })

  return (
    <div>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-baseline gap-3">
          <h1 className="text-xl font-semibold text-gray-900">Accommodations</h1>
          <span className="text-sm text-gray-500">{accommodations?.length ?? 0} total</span>
        </div>
        <Link
          href="/admin/accommodations/new"
          className="inline-flex w-full justify-center rounded bg-gray-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-700 sm:w-auto"
        >
          + Add Accommodation
        </Link>
      </div>

      {!accommodations || accommodations.length === 0 ? (
        <p className="text-sm text-gray-500">No accommodations yet.</p>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white">
          <table className="w-full min-w-[640px] text-sm">
            <thead className="border-b border-gray-200 bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium tracking-wide text-gray-500 uppercase">
                  Name
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium tracking-wide text-gray-500 uppercase">
                  Type
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium tracking-wide text-gray-500 uppercase">
                  Location
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium tracking-wide text-gray-500 uppercase">
                  Price (USD)
                </th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {accommodations.map((a) => (
                <tr key={a.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-900">{a.name}</td>
                  <td className="px-4 py-3">
                    <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600">
                      {a.type}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-500">{a.location_area}</td>
                  <td className="px-4 py-3 text-gray-500">
                    {a.price_min_usd}–{a.price_max_usd}
                  </td>
                  <td className="px-4 py-3">
                    <AccommodationActions id={a.id} />
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
