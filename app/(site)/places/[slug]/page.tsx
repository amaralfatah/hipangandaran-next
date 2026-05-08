import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Badge } from '@/components/ui/Badge'
import { AffiliateButton } from '@/components/ui/AffiliateButton'
import { Breadcrumb } from '@/components/Breadcrumb'
import { BreadcrumbJsonLd } from '@/components/JsonLd'
import { WifiBar } from '@/components/places/WifiBar'
import { PlaceImagePlaceholder } from '@/components/places/PlaceImagePlaceholder'
import { AccommodationJsonLd, CafeJsonLd } from '@/components/places/PlaceJsonLd'
import { ReportUpdateButton } from '@/components/places/ReportUpdateButton'
import {
  formatDistanceToBeach,
  formatPriceRangeIdr,
  formatPriceRangeUsd,
  formatTimeRange,
  getAccommodationBySlug,
  getAllPlaceSlugs,
  getCafeBySlug,
} from '@/lib/places'
import { LOCATION_LABELS, TYPE_LABELS } from '@/types/filters'
import { formatVerificationDate } from '@/lib/utils'

const PRICE_LABEL = { budget: '$', mid: '$$', upscale: '$$$' } as const

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const all = await getAllPlaceSlugs()
  return all.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const accom = await getAccommodationBySlug(slug)
  if (accom) {
    return {
      title: `${accom.name} — ${TYPE_LABELS[accom.type]} in ${LOCATION_LABELS[accom.location_area]}`,
      description:
        accom.description ??
        `${TYPE_LABELS[accom.type]} in ${LOCATION_LABELS[accom.location_area]}.`,
      alternates: { canonical: `/places/${slug}` },
    }
  }
  const cafe = await getCafeBySlug(slug)
  if (cafe) {
    return {
      title: `${cafe.name} — Cafe in ${LOCATION_LABELS[cafe.location_area]}`,
      description: `WiFi speed, hours, and outlets for ${cafe.name} in ${LOCATION_LABELS[cafe.location_area]}.`,
      alternates: { canonical: `/places/${slug}` },
    }
  }
  return { title: 'Not found' }
}

export default async function PlacePage({ params }: PageProps) {
  const { slug } = await params
  const accom = await getAccommodationBySlug(slug)
  if (accom) return <AccommodationDetail item={accom} />
  const cafe = await getCafeBySlug(slug)
  if (cafe) return <CafeDetail item={cafe} />
  notFound()
}

async function AccommodationDetail({
  item,
}: {
  item: NonNullable<Awaited<ReturnType<typeof getAccommodationBySlug>>>
}) {
  const cover = item.images[0]

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 md:px-6 md:py-14">
      <AccommodationJsonLd item={item} />
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: '/' },
          { name: 'Stay', url: '/places/accommodation' },
          { name: item.name, url: `/places/${item.slug}` },
        ]}
      />
      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'Stay', href: '/places/accommodation' },
          { label: item.name },
        ]}
      />

      <header className="mt-6">
        <Badge variant="surf">{TYPE_LABELS[item.type]}</Badge>
        <h1 className="text-charcoal mt-3 font-[family-name:var(--font-display)] text-4xl font-semibold tracking-tight md:text-5xl">
          {item.name}
        </h1>
        <p className="text-charcoal/65 mt-2 text-sm">{LOCATION_LABELS[item.location_area]}</p>
      </header>

      <figure className="bg-sand/40 border-charcoal/10 relative mt-8 aspect-[3/2] overflow-hidden rounded-3xl border">
        {cover ? (
          <Image
            src={cover}
            alt={`${item.name} — ${TYPE_LABELS[item.type]} in ${LOCATION_LABELS[item.location_area]}`}
            fill
            sizes="(min-width: 768px) 960px, 100vw"
            priority
            className="object-cover"
          />
        ) : (
          <PlaceImagePlaceholder name={item.name} />
        )}
      </figure>

      <div className="mt-8 grid grid-cols-1 gap-10 md:grid-cols-[1fr_280px] md:gap-12">
        <div>
          {item.description && (
            <p className="text-charcoal/85 text-lg leading-relaxed">{item.description}</p>
          )}

          <dl className="border-charcoal/10 mt-8 grid grid-cols-2 gap-x-6 gap-y-5 rounded-2xl border p-6 text-sm sm:grid-cols-3">
            <Fact
              label="Price"
              value={formatPriceRangeUsd(Number(item.price_min_usd), Number(item.price_max_usd))}
              sub={formatPriceRangeIdr(Number(item.price_min_usd), Number(item.price_max_usd))}
            />
            <div>
              <dt className="text-charcoal/60 text-xs tracking-wide uppercase">WiFi</dt>
              <dd className="mt-1.5">
                <WifiBar mbps={item.wifi_speed_mbps} />
              </dd>
            </div>
            <Fact label="Distance" value={formatDistanceToBeach(item.distance_to_beach_m)} />
            <Fact label="Desk" value={item.has_desk ? 'Yes' : 'No'} />
            <Fact label="Pool" value={item.has_pool ? 'Yes' : 'No'} />
            <Fact label="Type" value={TYPE_LABELS[item.type]} />
          </dl>

          <div className="mt-6 flex flex-wrap items-center gap-4 text-xs">
            {item.google_maps_url && (
              <a
                href={item.google_maps_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-ocean font-medium underline-offset-4 hover:underline"
              >
                Google Maps →
              </a>
            )}
            {item.verified_at && (
              <span className="text-charcoal/60 font-[family-name:var(--font-mono)]">
                Verified {formatVerificationDate(item.verified_at)}
              </span>
            )}
            <ReportUpdateButton place={{ id: item.id, type: 'accommodation', name: item.name }} />
          </div>
        </div>

        <aside>
          <div className="border-charcoal/10 bg-sand/30 sticky top-24 rounded-3xl border p-6">
            <p className="text-charcoal/80 text-sm">Book this place</p>
            <p className="text-charcoal mt-1 font-[family-name:var(--font-mono)] text-lg">
              {formatPriceRangeUsd(Number(item.price_min_usd), Number(item.price_max_usd))}
            </p>
            <p className="text-charcoal/60 mt-0.5 font-[family-name:var(--font-mono)] text-xs">
              {formatPriceRangeIdr(Number(item.price_min_usd), Number(item.price_max_usd))}
            </p>
            <div className="mt-4 flex flex-col gap-2">
              <AffiliateButton
                partner="traveloka"
                {...(item.booking_affiliate_url
                  ? { url: item.booking_affiliate_url }
                  : { query: `${item.name} ${LOCATION_LABELS[item.location_area]}` })}
                utmContent={`detail:${item.slug}`}
              >
                Book on Traveloka
              </AffiliateButton>
              <AffiliateButton
                partner="agoda"
                query={`${item.name} ${LOCATION_LABELS[item.location_area]}`}
                utmContent={`detail:${item.slug}`}
                variant="secondary"
              >
                Check Agoda
              </AffiliateButton>
            </div>
            <p className="text-charcoal/55 mt-3 text-[11px]">
              Affiliate links — we may earn a small commission at no extra cost to you.{' '}
              <Link href="/affiliate-disclosure" className="underline-offset-4 hover:underline">
                Learn more
              </Link>
              .
            </p>
          </div>
        </aside>
      </div>
    </div>
  )
}

function CafeDetail({ item }: { item: NonNullable<Awaited<ReturnType<typeof getCafeBySlug>>> }) {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 md:px-6 md:py-14">
      <CafeJsonLd item={item} />
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: '/' },
          { name: 'Cafes', url: '/places/cafes' },
          { name: item.name, url: `/places/${item.slug}` },
        ]}
      />
      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'Cafes', href: '/places/cafes' },
          { label: item.name },
        ]}
      />

      <header className="mt-6">
        <Badge>Cafe</Badge>
        <h1 className="text-charcoal mt-3 font-[family-name:var(--font-display)] text-4xl font-semibold tracking-tight md:text-5xl">
          {item.name}
        </h1>
        <p className="text-charcoal/65 mt-2 text-sm">{LOCATION_LABELS[item.location_area]}</p>
      </header>

      <dl className="border-charcoal/10 mt-8 grid grid-cols-2 gap-x-6 gap-y-5 rounded-2xl border p-6 text-sm sm:grid-cols-3">
        <div>
          <dt className="text-charcoal/60 text-xs tracking-wide uppercase">WiFi</dt>
          <dd className="mt-1.5">
            <WifiBar mbps={item.wifi_speed_mbps} />
          </dd>
        </div>
        <Fact label="Power outlets" value={item.power_outlets ? 'Yes' : 'No'} />
        <Fact label="Hours" value={formatTimeRange(item.opens_at, item.closes_at)} />
        {item.price_range && <Fact label="Price" value={PRICE_LABEL[item.price_range]} />}
      </dl>

      <div className="mt-6 flex flex-wrap items-center gap-4 text-xs">
        {item.google_maps_url && (
          <a
            href={item.google_maps_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-ocean font-medium underline-offset-4 hover:underline"
          >
            Google Maps →
          </a>
        )}
        {item.instagram_url && (
          <a
            href={item.instagram_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-ocean font-medium underline-offset-4 hover:underline"
          >
            Instagram →
          </a>
        )}
        {item.last_verified_at && (
          <span className="text-charcoal/60 font-[family-name:var(--font-mono)]">
            Verified {formatVerificationDate(item.last_verified_at)}
          </span>
        )}
        <ReportUpdateButton place={{ id: item.id, type: 'cafe', name: item.name }} />
      </div>
    </div>
  )
}

function Fact({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div>
      <dt className="text-charcoal/60 text-xs tracking-wide uppercase">{label}</dt>
      <dd className="text-charcoal mt-1 font-[family-name:var(--font-mono)] text-sm">{value}</dd>
      {sub && (
        <dd className="text-charcoal/55 font-[family-name:var(--font-mono)] text-xs">{sub}</dd>
      )}
    </div>
  )
}
