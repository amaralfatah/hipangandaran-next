'use client'

import { useState } from 'react'
import { Badge } from '@/components/ui/Badge'
import { WifiBar } from './WifiBar'
import { UpdateForm } from './UpdateForm'
import { formatTimeRange, type Cafe } from '@/lib/places'
import { LOCATION_LABELS } from '@/types/filters'
import { formatVerificationDate } from '@/lib/utils'

const PRICE_LABEL = { budget: '$', mid: '$$', upscale: '$$$' } as const

export function CafeListItem({ cafe }: { cafe: Cafe }) {
  const [reportOpen, setReportOpen] = useState(false)

  return (
    <article className="border-charcoal/10 bg-cream rounded-2xl border p-5 shadow-[0_1px_2px_rgba(28,28,30,0.04)] transition-shadow hover:shadow-[0_4px_16px_rgba(28,28,30,0.06)]">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-charcoal font-[family-name:var(--font-display)] text-lg font-semibold">
            {cafe.name}
          </h3>
          <p className="text-charcoal/60 mt-0.5 text-xs">{LOCATION_LABELS[cafe.location_area]}</p>
        </div>
        {cafe.price_range && <Badge>{PRICE_LABEL[cafe.price_range]}</Badge>}
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs">
        <WifiBar mbps={cafe.wifi_speed_mbps} />
        <span className="text-charcoal/75 font-[family-name:var(--font-mono)]">
          {cafe.power_outlets ? '🔌 Outlets' : '✗ No outlets'}
        </span>
        <span className="text-charcoal/75 font-[family-name:var(--font-mono)]">
          {formatTimeRange(cafe.opens_at, cafe.closes_at)}
        </span>
      </div>

      <div className="text-charcoal/70 mt-4 flex flex-wrap items-center gap-3 text-xs">
        {cafe.google_maps_url && (
          <a
            href={cafe.google_maps_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-ocean font-medium underline-offset-4 hover:underline"
          >
            Google Maps →
          </a>
        )}
        <button
          type="button"
          onClick={() => setReportOpen(true)}
          className="text-charcoal/70 hover:text-ocean underline-offset-4 hover:underline"
        >
          Report update
        </button>
        {cafe.last_verified_at && (
          <span className="font-[family-name:var(--font-mono)]">
            Verified {formatVerificationDate(cafe.last_verified_at)}
          </span>
        )}
      </div>

      {reportOpen && (
        <UpdateForm
          place={{ id: cafe.id, type: 'cafe', name: cafe.name }}
          onClose={() => setReportOpen(false)}
        />
      )}
    </article>
  )
}
