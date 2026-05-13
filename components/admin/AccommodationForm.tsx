'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { slugify } from '@/lib/utils'
import type { AccommodationType, LocationArea, LocationZone, Database } from '@/types/database'

type Row = Database['public']['Tables']['accommodations']['Row']

const LOCATION_AREAS: LocationArea[] = [
  'batu_karas',
  'pangandaran_beach',
  'cijulang',
  'karapyak',
  'madasari',
  'batu_hiu',
  'parigi',
]
const ACCOMMODATION_TYPES: AccommodationType[] = ['homestay', 'villa', 'surf_camp', 'guesthouse']

interface FormState {
  name: string
  slug: string
  type: AccommodationType
  location_area: LocationArea
  location_zone: LocationZone
  price_min_usd: string
  price_max_usd: string
  wifi_speed_mbps: string
  has_desk: boolean
  has_pool: boolean
  distance_to_beach_m: string
  google_maps_url: string
  booking_affiliate_url: string
  description: string
  verified_at: string
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

export function AccommodationForm({ accommodation }: { accommodation?: Row }) {
  const router = useRouter()
  const isEdit = !!accommodation

  const [form, setForm] = useState<FormState>({
    name: accommodation?.name ?? '',
    slug: accommodation?.slug ?? '',
    type: accommodation?.type ?? 'homestay',
    location_area: accommodation?.location_area ?? 'batu_karas',
    location_zone: accommodation?.location_zone ?? 'core',
    price_min_usd: accommodation?.price_min_usd?.toString() ?? '',
    price_max_usd: accommodation?.price_max_usd?.toString() ?? '',
    wifi_speed_mbps: accommodation?.wifi_speed_mbps?.toString() ?? '',
    has_desk: accommodation?.has_desk ?? false,
    has_pool: accommodation?.has_pool ?? false,
    distance_to_beach_m: accommodation?.distance_to_beach_m?.toString() ?? '',
    google_maps_url: accommodation?.google_maps_url ?? '',
    booking_affiliate_url: accommodation?.booking_affiliate_url ?? '',
    description: accommodation?.description ?? '',
    verified_at: accommodation?.verified_at?.slice(0, 10) ?? '',
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
      ...(isEdit && { id: accommodation!.id }),
      name: form.name,
      slug: form.slug,
      type: form.type,
      location_area: form.location_area,
      location_zone: form.location_zone,
      price_min_usd: Number(form.price_min_usd),
      price_max_usd: Number(form.price_max_usd),
      wifi_speed_mbps: form.wifi_speed_mbps ? Number(form.wifi_speed_mbps) : null,
      has_desk: form.has_desk,
      has_pool: form.has_pool,
      distance_to_beach_m: Number(form.distance_to_beach_m),
      google_maps_url: form.google_maps_url || null,
      booking_affiliate_url: form.booking_affiliate_url || null,
      description: form.description || null,
      verified_at: form.verified_at || null,
    }

    const res = await fetch('/api/admin/accommodations', {
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

    router.push('/admin/accommodations')
    router.refresh()
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-5">
      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Type *">
          <select
            value={form.type}
            onChange={(e) => setForm((f) => ({ ...f, type: e.target.value as AccommodationType }))}
            className={inputCls}
          >
            {ACCOMMODATION_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </Field>
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
      </div>

      <Field label="Location Zone *">
        <select
          value={form.location_zone}
          onChange={(e) =>
            setForm((f) => ({ ...f, location_zone: e.target.value as LocationZone }))
          }
          className={inputCls}
        >
          <option value="core">core</option>
          <option value="extended">extended</option>
        </select>
      </Field>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Field label="Price Min (USD) *">
          <input
            type="number"
            required
            min="0"
            value={form.price_min_usd}
            onChange={(e) => setForm((f) => ({ ...f, price_min_usd: e.target.value }))}
            className={inputCls}
          />
        </Field>
        <Field label="Price Max (USD) *">
          <input
            type="number"
            required
            min="0"
            value={form.price_max_usd}
            onChange={(e) => setForm((f) => ({ ...f, price_max_usd: e.target.value }))}
            className={inputCls}
          />
        </Field>
        <Field label="WiFi Speed (Mbps)">
          <input
            type="number"
            min="0"
            value={form.wifi_speed_mbps}
            onChange={(e) => setForm((f) => ({ ...f, wifi_speed_mbps: e.target.value }))}
            className={inputCls}
          />
        </Field>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Distance to Beach (m) *">
          <input
            type="number"
            required
            min="0"
            value={form.distance_to_beach_m}
            onChange={(e) => setForm((f) => ({ ...f, distance_to_beach_m: e.target.value }))}
            className={inputCls}
          />
        </Field>
        <Field label="Verified At">
          <input
            type="date"
            value={form.verified_at}
            onChange={(e) => setForm((f) => ({ ...f, verified_at: e.target.value }))}
            className={inputCls}
          />
        </Field>
      </div>

      <div className="flex gap-6">
        <label className="flex cursor-pointer items-center gap-2 text-sm text-gray-700">
          <input
            type="checkbox"
            checked={form.has_desk}
            onChange={(e) => setForm((f) => ({ ...f, has_desk: e.target.checked }))}
            className="rounded"
          />
          Has Desk
        </label>
        <label className="flex cursor-pointer items-center gap-2 text-sm text-gray-700">
          <input
            type="checkbox"
            checked={form.has_pool}
            onChange={(e) => setForm((f) => ({ ...f, has_pool: e.target.checked }))}
            className="rounded"
          />
          Has Pool
        </label>
      </div>

      <Field label="Google Maps URL">
        <input
          type="url"
          value={form.google_maps_url}
          onChange={(e) => setForm((f) => ({ ...f, google_maps_url: e.target.value }))}
          className={inputCls}
        />
      </Field>

      <Field label="Traveloka Affiliate URL">
        <input
          type="url"
          value={form.booking_affiliate_url}
          onChange={(e) => setForm((f) => ({ ...f, booking_affiliate_url: e.target.value }))}
          className={inputCls}
        />
      </Field>

      <Field label="Description">
        <textarea
          rows={4}
          value={form.description}
          onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
          className={inputCls}
        />
      </Field>

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
          onClick={() => router.push('/admin/accommodations')}
          className="rounded px-5 py-2 text-sm text-gray-600 transition-colors hover:bg-gray-100"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}
