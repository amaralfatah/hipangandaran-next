import Image from 'next/image'
import Link from 'next/link'
import { Badge } from '@/components/ui/Badge'
import { AffiliateButton } from '@/components/ui/AffiliateButton'
import { PlaceImagePlaceholder } from './PlaceImagePlaceholder'
import { WifiBar } from './WifiBar'
import {
  formatDistanceToBeach,
  formatPriceRangeIdr,
  formatPriceRangeUsd,
  type Accommodation,
} from '@/lib/places'
import { LOCATION_LABELS, TYPE_LABELS } from '@/types/filters'
import { formatVerificationDate } from '@/lib/utils'

export function AccommodationCard({ item }: { item: Accommodation }) {
  const cover = item.images[0]

  return (
    <article className="border-charcoal/10 bg-cream group flex flex-col overflow-hidden rounded-2xl border shadow-[0_1px_2px_rgba(28,28,30,0.04)] transition-shadow hover:shadow-[0_4px_16px_rgba(28,28,30,0.08)]">
      <Link href={`/places/${item.slug}`} className="block">
        <div className="bg-sand/40 relative aspect-[4/3]">
          {cover ? (
            <Image
              src={cover}
              alt={`${item.name} — ${TYPE_LABELS[item.type]} in ${LOCATION_LABELS[item.location_area]}`}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          ) : (
            <PlaceImagePlaceholder name={item.name} />
          )}
          {item.verified_at && (
            <Badge
              variant="verified"
              className="bg-cream/90 absolute top-3 right-3 backdrop-blur-sm"
            >
              Verified {formatVerificationDate(item.verified_at)}
            </Badge>
          )}
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <div>
          <Link href={`/places/${item.slug}`} className="hover:text-ocean">
            <h3 className="text-charcoal line-clamp-2 min-h-[2.6em] font-[family-name:var(--font-display)] text-lg leading-tight font-semibold">
              {item.name}
            </h3>
          </Link>
          <p className="text-charcoal/60 mt-0.5 text-xs">
            {TYPE_LABELS[item.type]} · {LOCATION_LABELS[item.location_area]}
          </p>
        </div>

        <div className="mt-3">
          <p className="text-charcoal font-[family-name:var(--font-mono)] text-sm">
            {formatPriceRangeUsd(Number(item.price_min_usd), Number(item.price_max_usd))}
          </p>
          <p className="text-charcoal/60 font-[family-name:var(--font-mono)] text-xs">
            ({formatPriceRangeIdr(Number(item.price_min_usd), Number(item.price_max_usd))})
          </p>
        </div>

        <div className="mt-3">
          <WifiBar mbps={item.wifi_speed_mbps} />
        </div>

        {(item.has_desk || item.type === 'surf_camp' || item.has_pool) && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {item.has_desk && <Badge variant="nomad">Has Desk</Badge>}
            {item.type === 'surf_camp' && <Badge variant="surf">Surf Camp</Badge>}
            {item.has_pool && <Badge>Pool</Badge>}
          </div>
        )}

        <p className="text-charcoal/60 mt-auto pt-3 font-[family-name:var(--font-mono)] text-xs">
          {formatDistanceToBeach(item.distance_to_beach_m)}
        </p>

        <AffiliateButton
          partner="traveloka"
          {...(item.booking_affiliate_url
            ? { url: item.booking_affiliate_url }
            : { query: `${item.name} ${LOCATION_LABELS[item.location_area]}` })}
          utmContent={`accommodation-card:${item.slug}`}
          variant="primary"
          className="mt-3"
        >
          Book on Traveloka
        </AffiliateButton>
      </div>
    </article>
  )
}
