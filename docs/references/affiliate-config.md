# Affiliate Config

## Programs to Sign Up For

| Program | URL | Phase | Notes |
|---|---|---|---|
| Traveloka | https://traveloka.com/affiliate | 2 | Best untuk akomodasi Indonesia |
| Agoda | https://agoda.com/affiliates | 2 | Sekunder untuk akomodasi |
| Booking.com | https://booking.com/affiliate-program | 2 | Cover internasional yang stay long-term |
| GetYourGuide | https://getyourguide.com/partner | 2 | Untuk activities (surf lesson, Green Canyon tour) |
| SafetyWing | https://safetywing.com/affiliate | 3 | Travel insurance untuk nomad |

## URL Builder Implementation

```ts
// lib/affiliate.ts
const env = (key: string) => process.env[`NEXT_PUBLIC_${key}`] ?? ''

export const affiliate = {
  traveloka: (propertyId: string) => {
    const params = new URLSearchParams({
      id: propertyId,
      affiliate_id: env('TRAVELOKA_AFFILIATE_ID'),
      utm_source: 'hipangandaran',
      utm_medium: 'affiliate',
      utm_campaign: 'accommodation',
    })
    return `https://www.traveloka.com/hotel/detail?${params}`
  },

  agoda: (propertyId: string) => {
    const params = new URLSearchParams({
      cid: env('AGODA_CID'),
      utm_source: 'hipangandaran',
    })
    return `https://www.agoda.com/hotel/${propertyId}?${params}`
  },

  getyourguide: (activityId: string) => {
    const params = new URLSearchParams({
      partner_id: env('GYG_PARTNER_ID'),
      utm_source: 'hipangandaran',
    })
    return `https://www.getyourguide.com/activity/${activityId}?${params}`
  },

  safetywing: () => {
    const params = new URLSearchParams({
      referenceID: env('SAFETYWING_REF_ID'),
      utm_source: 'hipangandaran',
    })
    return `https://safetywing.com/?${params}`
  },
} as const
```

## AffiliateButton Component

```tsx
// components/ui/AffiliateButton.tsx
interface Props {
  href: string
  children: React.ReactNode
  variant?: 'primary' | 'coral'
  showDisclaimer?: boolean
}

export function AffiliateButton({
  href,
  children,
  variant = 'primary',
  showDisclaimer = true
}: Props) {
  return (
    <div>
      <a
        href={href}
        target="_blank"
        rel="nofollow sponsored noopener noreferrer"
        className={/* tailwind classes per variant */}
      >
        {children}
      </a>
      {showDisclaimer && (
        <p className="text-xs text-charcoal/60 mt-1">
          We may earn a commission at no extra cost to you.
        </p>
      )}
    </div>
  )
}
```

## HARD RULES

- Setiap link affiliate WAJIB pakai `rel="nofollow sponsored noopener noreferrer"`
- UTM params WAJIB konsisten: `utm_source=hipangandaran`
- Affiliate disclosure WAJIB tampil di:
  - Footer setiap halaman (1 kalimat)
  - Atas artikel yang ada affiliate link (box kecil)
  - Halaman dedicated `/affiliate-disclosure`
