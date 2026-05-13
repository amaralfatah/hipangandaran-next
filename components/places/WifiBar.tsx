import { wifiBucket } from '@/lib/places'
import { cn } from '@/lib/utils'

const bucketLabel = {
  none: 'No data',
  slow: 'Slow',
  ok: 'OK',
  fast: 'Fast',
}

const bucketColor = {
  none: 'bg-charcoal/15',
  slow: 'bg-warning',
  ok: 'bg-ocean',
  fast: 'bg-forest',
}

export function WifiBar({ mbps, className }: { mbps: number | null; className?: string }) {
  const bucket = wifiBucket(mbps)
  const filled = bucket === 'none' ? 0 : bucket === 'slow' ? 1 : bucket === 'ok' ? 2 : 3

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <span className="sr-only">
        WiFi: {bucketLabel[bucket]}
        {mbps != null ? `, ${mbps} Mbps` : ''}
      </span>
      <div className="flex items-end gap-0.5" aria-hidden="true">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className={cn(
              'w-1.5 rounded-sm',
              i === 0 ? 'h-2' : i === 1 ? 'h-3' : 'h-4',
              i < filled ? bucketColor[bucket] : 'bg-charcoal/10',
            )}
          />
        ))}
      </div>
      <span
        aria-hidden="true"
        className="text-charcoal/75 font-[family-name:var(--font-mono)] text-xs"
      >
        {mbps == null ? bucketLabel.none : `${mbps} Mbps`}
      </span>
    </div>
  )
}
