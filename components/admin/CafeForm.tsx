'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { slugify } from '@/lib/utils'
import type { LocationArea, PriceRange, Database } from '@/types/database'

type Row = Database['public']['Tables']['cafes']['Row']

const LOCATION_AREAS: LocationArea[] = [
  'batu_karas',
  'pangandaran_beach',
  'cijulang',
  'karapyak',
  'madasari',
  'batu_hiu',
  'parigi',
]

interface FormState {
  name: string
  slug: string
  location_area: LocationArea
  wifi_speed_mbps: string
  power_outlets: boolean
  opens_at: string
  closes_at: string
  price_range: PriceRange | ''
  instagram_url: string
  google_maps_url: string
  latitude: string
  longitude: string
  last_verified_at: string
}

const inputCls =
  'w-full px-3 py-2 text-sm border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-gray-400'

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-medium text-gray-500">{label}</label>
      {children}
    </div>
  )
}

export function CafeForm({ cafe }: { cafe?: Row }) {
  const router = useRouter()
  const isEdit = !!cafe

  const [form, setForm] = useState<FormState>({
    name: cafe?.name ?? '',
    slug: cafe?.slug ?? '',
    location_area: cafe?.location_area ?? 'batu_karas',
    wifi_speed_mbps: cafe?.wifi_speed_mbps?.toString() ?? '',
    power_outlets: cafe?.power_outlets ?? false,
    opens_at: cafe?.opens_at ?? '',
    closes_at: cafe?.closes_at ?? '',
    price_range: cafe?.price_range ?? '',
    instagram_url: cafe?.instagram_url ?? '',
    google_maps_url: cafe?.google_maps_url ?? '',
    latitude: cafe?.latitude?.toString() ?? '',
    longitude: cafe?.longitude?.toString() ?? '',
    last_verified_at: cafe?.last_verified_at?.slice(0, 10) ?? '',
  })
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  function handleNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    const name = e.target.value
    setForm((f) => ({ ...f, name, ...(!isEdit && { slug: slugify(name) }) }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const body = {
      ...(isEdit && { id: cafe!.id }),
      name: form.name,
      slug: form.slug,
      location_area: form.location_area,
      wifi_speed_mbps: form.wifi_speed_mbps ? Number(form.wifi_speed_mbps) : null,
      power_outlets: form.power_outlets,
      opens_at: form.opens_at || null,
      closes_at: form.closes_at || null,
      price_range: (form.price_range as PriceRange) || null,
      instagram_url: form.instagram_url || null,
      google_maps_url: form.google_maps_url || null,
      latitude: form.latitude ? Number(form.latitude) : null,
      longitude: form.longitude ? Number(form.longitude) : null,
      last_verified_at: form.last_verified_at || null,
    }

    const res = await fetch('/api/admin/cafes', {
      method: isEdit ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
    const data = (await res.json()) as { ok: boolean; error?: string }

    if (!data.ok) {
      setError(data.error ?? 'Something went wrong')
      setLoading(false)
      return
    }

    router.push('/admin/cafes')
    router.refresh()
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-5">
      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <Field label="Name *">
          <input
            type="text"
            required
            value={form.name}
            onChange={handleNameChange}
            className={inputCls}
          />
        </Field>
        <Field label="Slug *">
          <input
            type="text"
            required
            value={form.slug}
            onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))}
            className={inputCls}
          />
        </Field>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Field label="Location Area *">
          <select
            value={form.location_area}
            onChange={(e) =>
              setForm((f) => ({ ...f, location_area: e.target.value as LocationArea }))
            }
            className={inputCls}
          >
            {LOCATION_AREAS.map((a) => (
              <option key={a} value={a}>
                {a}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Price Range">
          <select
            value={form.price_range}
            onChange={(e) =>
              setForm((f) => ({ ...f, price_range: e.target.value as PriceRange | '' }))
            }
            className={inputCls}
          >
            <option value="">—</option>
            <option value="budget">budget</option>
            <option value="mid">mid</option>
            <option value="upscale">upscale</option>
          </select>
        </Field>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Field label="WiFi Speed (Mbps)">
          <input
            type="number"
            min="0"
            value={form.wifi_speed_mbps}
            onChange={(e) => setForm((f) => ({ ...f, wifi_speed_mbps: e.target.value }))}
            className={inputCls}
          />
        </Field>
        <Field label="Opens At">
          <input
            type="time"
            value={form.opens_at}
            onChange={(e) => setForm((f) => ({ ...f, opens_at: e.target.value }))}
            className={inputCls}
          />
        </Field>
        <Field label="Closes At">
          <input
            type="time"
            value={form.closes_at}
            onChange={(e) => setForm((f) => ({ ...f, closes_at: e.target.value }))}
            className={inputCls}
          />
        </Field>
      </div>

      <label className="flex cursor-pointer items-center gap-2 text-sm text-gray-700">
        <input
          type="checkbox"
          checked={form.power_outlets}
          onChange={(e) => setForm((f) => ({ ...f, power_outlets: e.target.checked }))}
          className="rounded"
        />
        Power Outlets
      </label>

      <div className="grid grid-cols-2 gap-4">
        <Field label="Instagram URL">
          <input
            type="url"
            value={form.instagram_url}
            onChange={(e) => setForm((f) => ({ ...f, instagram_url: e.target.value }))}
            className={inputCls}
          />
        </Field>
        <Field label="Google Maps URL">
          <input
            type="url"
            value={form.google_maps_url}
            onChange={(e) => setForm((f) => ({ ...f, google_maps_url: e.target.value }))}
            className={inputCls}
          />
        </Field>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Field label="Latitude">
          <input
            type="number"
            step="any"
            value={form.latitude}
            onChange={(e) => setForm((f) => ({ ...f, latitude: e.target.value }))}
            className={inputCls}
          />
        </Field>
        <Field label="Longitude">
          <input
            type="number"
            step="any"
            value={form.longitude}
            onChange={(e) => setForm((f) => ({ ...f, longitude: e.target.value }))}
            className={inputCls}
          />
        </Field>
        <Field label="Last Verified At">
          <input
            type="date"
            value={form.last_verified_at}
            onChange={(e) => setForm((f) => ({ ...f, last_verified_at: e.target.value }))}
            className={inputCls}
          />
        </Field>
      </div>

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={loading}
          className="rounded bg-gray-900 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-700 disabled:opacity-50"
        >
          {loading ? 'Saving…' : isEdit ? 'Save Changes' : 'Create'}
        </button>
        <button
          type="button"
          onClick={() => router.push('/admin/cafes')}
          className="rounded px-5 py-2 text-sm text-gray-600 transition-colors hover:bg-gray-100"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}
