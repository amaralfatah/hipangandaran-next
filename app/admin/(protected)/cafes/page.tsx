import { supabaseAdmin } from '@/lib/supabase/server'
import Link from 'next/link'
import { CafeActions } from '@/components/admin/CafeActions'

export default async function CafesPage() {
  const { data: cafes } = await supabaseAdmin
    .from('cafes')
    .select('*')
    .order('name', { ascending: true })

  return (
    <div>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-baseline gap-3">
          <h1 className="text-xl font-semibold text-gray-900">Cafes</h1>
          <span className="text-sm text-gray-500">{cafes?.length ?? 0} total</span>
        </div>
        <Link
          href="/admin/cafes/new"
          className="inline-flex w-full justify-center rounded bg-gray-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-700 sm:w-auto"
        >
          + Add Cafe
        </Link>
      </div>

      {!cafes || cafes.length === 0 ? (
        <p className="text-sm text-gray-500">No cafes yet.</p>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white">
          <table className="w-full min-w-[640px] text-sm">
            <thead className="border-b border-gray-200 bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium tracking-wide text-gray-500 uppercase">
                  Name
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium tracking-wide text-gray-500 uppercase">
                  Location
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium tracking-wide text-gray-500 uppercase">
                  Price Range
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium tracking-wide text-gray-500 uppercase">
                  WiFi
                </th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {cafes.map((c) => (
                <tr key={c.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-900">{c.name}</td>
                  <td className="px-4 py-3 text-gray-500">{c.location_area}</td>
                  <td className="px-4 py-3">
                    {c.price_range ? (
                      <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600">
                        {c.price_range}
                      </span>
                    ) : (
                      <span className="text-gray-400">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-gray-500">
                    {c.wifi_speed_mbps != null ? `${c.wifi_speed_mbps} Mbps` : '—'}
                  </td>
                  <td className="px-4 py-3">
                    <CafeActions id={c.id} />
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
