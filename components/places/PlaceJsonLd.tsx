import type { Accommodation, Cafe } from '@/lib/places'
import { LOCATION_LABELS, TYPE_LABELS } from '@/types/filters'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://hipangandaran.com'

function script(data: object) {
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  )
}

export function AccommodationJsonLd({ item }: { item: Accommodation }) {
  return script({
    '@context': 'https://schema.org',
    '@type': 'LodgingBusiness',
    name: item.name,
    url: `${SITE_URL}/places/${item.slug}`,
    description: item.description,
    address: {
      '@type': 'PostalAddress',
      addressLocality: LOCATION_LABELS[item.location_area],
      addressRegion: 'West Java',
      addressCountry: 'ID',
    },
    priceRange: `$${item.price_min_usd}-$${item.price_max_usd}`,
    image: item.images.map((src) => (src.startsWith('http') ? src : `${SITE_URL}${src}`)),
    additionalType: TYPE_LABELS[item.type],
  })
}

export function CafeJsonLd({ item }: { item: Cafe }) {
  return script({
    '@context': 'https://schema.org',
    '@type': 'CafeOrCoffeeShop',
    name: item.name,
    url: `${SITE_URL}/places/${item.slug}`,
    address: {
      '@type': 'PostalAddress',
      addressLocality: LOCATION_LABELS[item.location_area],
      addressRegion: 'West Java',
      addressCountry: 'ID',
    },
    ...(item.latitude && item.longitude
      ? {
          geo: {
            '@type': 'GeoCoordinates',
            latitude: item.latitude,
            longitude: item.longitude,
          },
        }
      : {}),
    ...(item.opens_at && item.closes_at
      ? {
          openingHours: `Mo-Su ${item.opens_at.slice(0, 5)}-${item.closes_at.slice(0, 5)}`,
        }
      : {}),
  })
}
