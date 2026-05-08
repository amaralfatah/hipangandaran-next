'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { AccommodationCard } from './AccommodationCard'
import { Button } from '@/components/ui/Button'
import {
  DEFAULT_FILTERS,
  LOCATION_LABELS,
  TYPE_LABELS,
  type AccommodationFilters,
  type AccommodationLocationFilter,
  type AccommodationTypeFilter,
  type DistanceToBeach,
  type WifiMinSpeed,
} from '@/types/filters'
import type { Accommodation } from '@/lib/places'
import type { AccommodationType, LocationArea } from '@/types/database'
import { cn } from '@/lib/utils'

const WIFI_OPTIONS: WifiMinSpeed[] = [0, 5, 10, 20, 50]
const DISTANCE_OPTIONS: { value: DistanceToBeach; label: string }[] = [
  { value: null, label: 'Any' },
  { value: 500, label: '< 500m' },
  { value: 1000, label: '< 1km' },
  { value: 2000, label: '< 2km' },
]

function parseFilters(params: URLSearchParams): AccommodationFilters {
  const location =
    (params.get('location') as AccommodationLocationFilter) ?? DEFAULT_FILTERS.location
  const type = (params.get('type') as AccommodationTypeFilter) ?? DEFAULT_FILTERS.type
  const priceMin = Number(params.get('priceMin') ?? DEFAULT_FILTERS.priceMin)
  const priceMax = Number(params.get('priceMax') ?? DEFAULT_FILTERS.priceMax)
  const wifi = Number(params.get('wifi') ?? DEFAULT_FILTERS.wifiMinSpeed)
  const wifiMinSpeed = (WIFI_OPTIONS.includes(wifi as WifiMinSpeed) ? wifi : 0) as WifiMinSpeed
  const hasDesk = params.get('desk') === '1'
  const hasPool = params.get('pool') === '1'
  const distRaw = params.get('beach')
  const distanceToBeach: DistanceToBeach =
    distRaw === '500' ? 500 : distRaw === '1000' ? 1000 : distRaw === '2000' ? 2000 : null

  return {
    location,
    type,
    priceMin: Number.isFinite(priceMin) ? priceMin : DEFAULT_FILTERS.priceMin,
    priceMax: Number.isFinite(priceMax) ? priceMax : DEFAULT_FILTERS.priceMax,
    wifiMinSpeed,
    hasDesk,
    hasPool,
    distanceToBeach,
  }
}

function filtersToParams(f: AccommodationFilters): URLSearchParams {
  const p = new URLSearchParams()
  if (f.location !== 'all') p.set('location', f.location)
  if (f.type !== 'all') p.set('type', f.type)
  if (f.priceMin !== DEFAULT_FILTERS.priceMin) p.set('priceMin', String(f.priceMin))
  if (f.priceMax !== DEFAULT_FILTERS.priceMax) p.set('priceMax', String(f.priceMax))
  if (f.wifiMinSpeed !== 0) p.set('wifi', String(f.wifiMinSpeed))
  if (f.hasDesk) p.set('desk', '1')
  if (f.hasPool) p.set('pool', '1')
  if (f.distanceToBeach != null) p.set('beach', String(f.distanceToBeach))
  return p
}

function countActiveFilters(f: AccommodationFilters): number {
  let n = 0
  if (f.location !== 'all') n++
  if (f.type !== 'all') n++
  if (f.priceMin !== DEFAULT_FILTERS.priceMin || f.priceMax !== DEFAULT_FILTERS.priceMax) n++
  if (f.wifiMinSpeed !== 0) n++
  if (f.hasDesk) n++
  if (f.hasPool) n++
  if (f.distanceToBeach != null) n++
  return n
}

function applyFilters(items: Accommodation[], f: AccommodationFilters): Accommodation[] {
  return items.filter((item) => {
    if (f.location !== 'all' && item.location_area !== f.location) return false
    if (f.type !== 'all' && item.type !== f.type) return false
    if (Number(item.price_max_usd) < f.priceMin) return false
    if (Number(item.price_min_usd) > f.priceMax) return false
    if (f.wifiMinSpeed > 0) {
      if (item.wifi_speed_mbps == null || item.wifi_speed_mbps < f.wifiMinSpeed) return false
    }
    if (f.hasDesk && !item.has_desk) return false
    if (f.hasPool && !item.has_pool) return false
    if (f.distanceToBeach != null && item.distance_to_beach_m > f.distanceToBeach) return false
    return true
  })
}

export function AccommodationsFilterClient({ items }: { items: Accommodation[] }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [filters, setFilters] = useState<AccommodationFilters>(() => parseFilters(searchParams))
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const params = filtersToParams(filters)
    const qs = params.toString()
    router.replace(qs ? `?${qs}` : '?', { scroll: false })
  }, [filters, router])

  const filtered = useMemo(() => applyFilters(items, filters), [items, filters])
  const activeCount = countActiveFilters(filters)

  const update = useCallback(
    <K extends keyof AccommodationFilters>(key: K, value: AccommodationFilters[K]) => {
      setFilters((prev) => ({ ...prev, [key]: value }))
    },
    [],
  )

  const reset = () => setFilters(DEFAULT_FILTERS)

  const filterPanel = <FilterPanel filters={filters} update={update} onReset={reset} />

  return (
    <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-[260px_1fr] md:gap-10">
      <aside className="hidden md:block">
        <div className="sticky top-24">{filterPanel}</div>
      </aside>

      <div className="md:hidden">
        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          className="border-charcoal/15 bg-cream text-charcoal hover:border-ocean flex w-full items-center justify-between rounded-full border px-5 py-2.5 text-sm font-medium"
        >
          <span>Filters</span>
          {activeCount > 0 && (
            <span className="bg-ocean text-cream rounded-full px-2 py-0.5 text-xs">
              {activeCount}
            </span>
          )}
        </button>
      </div>

      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 md:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Filters"
        >
          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            aria-label="Close filters"
            className="bg-charcoal/40 absolute inset-0"
          />
          <div className="bg-cream absolute right-0 bottom-0 left-0 max-h-[85vh] overflow-y-auto rounded-t-3xl p-6">
            <div className="flex items-center justify-between">
              <h2 className="font-[family-name:var(--font-display)] text-lg font-semibold">
                Filters
              </h2>
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="text-charcoal/70 hover:text-ocean text-sm"
              >
                Close
              </button>
            </div>
            <div className="mt-4">{filterPanel}</div>
            <div className="mt-6">
              <Button onClick={() => setMobileOpen(false)} className="w-full">
                Show {filtered.length} result{filtered.length === 1 ? '' : 's'}
              </Button>
            </div>
          </div>
        </div>
      )}

      <section>
        <p className="text-charcoal/65 font-[family-name:var(--font-mono)] text-xs">
          {filtered.length} of {items.length} stays
        </p>

        {filtered.length === 0 ? (
          <div className="border-charcoal/10 bg-sand/30 mt-6 rounded-2xl border p-8 text-center">
            <p className="text-charcoal/80">
              No accommodations match your filters. Try widening your price range or removing
              amenity requirements.
            </p>
            <button
              type="button"
              onClick={reset}
              className="text-ocean mt-3 text-sm font-medium underline-offset-4 hover:underline"
            >
              Reset filters
            </button>
          </div>
        ) : (
          <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((item) => (
              <AccommodationCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}

interface FilterPanelProps {
  filters: AccommodationFilters
  update: <K extends keyof AccommodationFilters>(key: K, value: AccommodationFilters[K]) => void
  onReset: () => void
}

function FilterPanel({ filters, update, onReset }: FilterPanelProps) {
  return (
    <div className="space-y-6 text-sm">
      <FilterGroup label="Location">
        <select
          value={filters.location}
          onChange={(e) => update('location', e.target.value as AccommodationFilters['location'])}
          className={selectStyle}
        >
          <option value="all">All areas</option>
          {(Object.keys(LOCATION_LABELS) as LocationArea[]).map((k) => (
            <option key={k} value={k}>
              {LOCATION_LABELS[k]}
            </option>
          ))}
        </select>
      </FilterGroup>

      <FilterGroup label="Type">
        <select
          value={filters.type}
          onChange={(e) => update('type', e.target.value as AccommodationFilters['type'])}
          className={selectStyle}
        >
          <option value="all">All types</option>
          {(Object.keys(TYPE_LABELS) as AccommodationType[]).map((k) => (
            <option key={k} value={k}>
              {TYPE_LABELS[k]}
            </option>
          ))}
        </select>
      </FilterGroup>

      <FilterGroup label={`Price (USD/night) — $${filters.priceMin}–$${filters.priceMax}`}>
        <div className="flex items-center gap-3">
          <input
            type="range"
            min={0}
            max={200}
            step={5}
            value={filters.priceMin}
            onChange={(e) => update('priceMin', Math.min(Number(e.target.value), filters.priceMax))}
            className="w-full"
            aria-label="Minimum price"
          />
          <input
            type="range"
            min={0}
            max={200}
            step={5}
            value={filters.priceMax}
            onChange={(e) => update('priceMax', Math.max(Number(e.target.value), filters.priceMin))}
            className="w-full"
            aria-label="Maximum price"
          />
        </div>
      </FilterGroup>

      <FilterGroup label="Min WiFi speed">
        <div className="flex flex-wrap gap-1.5">
          {WIFI_OPTIONS.map((v) => (
            <button
              key={v}
              type="button"
              onClick={() => update('wifiMinSpeed', v)}
              className={cn(
                'rounded-full border px-3 py-1 text-xs font-medium transition-colors',
                filters.wifiMinSpeed === v
                  ? 'border-ocean bg-ocean text-cream'
                  : 'border-charcoal/15 text-charcoal/75 hover:border-ocean',
              )}
            >
              {v === 0 ? 'Any' : `${v}+ Mbps`}
            </button>
          ))}
        </div>
      </FilterGroup>

      <FilterGroup label="Distance to beach">
        <div className="flex flex-wrap gap-1.5">
          {DISTANCE_OPTIONS.map((opt) => (
            <button
              key={String(opt.value)}
              type="button"
              onClick={() => update('distanceToBeach', opt.value)}
              className={cn(
                'rounded-full border px-3 py-1 text-xs font-medium transition-colors',
                filters.distanceToBeach === opt.value
                  ? 'border-ocean bg-ocean text-cream'
                  : 'border-charcoal/15 text-charcoal/75 hover:border-ocean',
              )}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </FilterGroup>

      <FilterGroup label="Amenities">
        <label className="flex cursor-pointer items-center gap-2">
          <input
            type="checkbox"
            checked={filters.hasDesk}
            onChange={(e) => update('hasDesk', e.target.checked)}
            className="accent-ocean"
          />
          <span>Has desk (work-friendly)</span>
        </label>
        <label className="mt-2 flex cursor-pointer items-center gap-2">
          <input
            type="checkbox"
            checked={filters.hasPool}
            onChange={(e) => update('hasPool', e.target.checked)}
            className="accent-ocean"
          />
          <span>Pool</span>
        </label>
      </FilterGroup>

      <button
        type="button"
        onClick={onReset}
        className="text-ocean text-xs font-medium underline-offset-4 hover:underline"
      >
        Reset all filters
      </button>
    </div>
  )
}

const selectStyle =
  'h-10 w-full rounded-full border border-charcoal/15 bg-cream px-4 text-sm text-charcoal focus-visible:border-ocean focus-visible:ring-2 focus-visible:ring-ocean/40 focus-visible:outline-none'

function FilterGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-charcoal/85 mb-2 text-xs font-semibold tracking-wide uppercase">{label}</p>
      {children}
    </div>
  )
}
