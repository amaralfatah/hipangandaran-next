# Affiliate Config

## Programs to Sign Up For

| Program | URL | Phase | Notes |
|---|---|---|---|
| Traveloka | https://traveloka.com/affiliate | 2 | Best untuk akomodasi Indonesia |
| Agoda | https://agoda.com/affiliates | 2 | Sekunder untuk akomodasi |
| Booking.com | https://booking.com/affiliate-program | 2 | Cover internasional yang stay long-term |

## Cara Kerja Per-Partner

### Traveloka — Per-link (bukan universal ID)

Traveloka **tidak** punya universal affiliate ID. Setiap hotel generate link tracking-nya sendiri dari dashboard Traveloka.

**Cara pakai:**
1. Buka dashboard Traveloka affiliate
2. Cari hotel yang ingin dipromosikan
3. Klik "Share" → copy affiliate link
4. Simpan link tersebut di kolom `booking_affiliate_url` di tabel `accommodations` (Supabase) atau langsung di MDX

```tsx
// Di AccommodationCard / halaman detail — pakai url langsung dari DB, fallback ke search
<AffiliateButton
  partner="traveloka"
  {...(item.booking_affiliate_url
    ? { url: item.booking_affiliate_url }
    : { query: `${item.name} Batu Karas` })}
  utmContent={`card:${item.slug}`}
>
  Book on Traveloka
</AffiliateButton>

// Di MDX artikel — paste link langsung
<AffiliateButton partner="traveloka" url="https://www.traveloka.com/hotel/detail?...tracking=xxx">
  Book on Traveloka
</AffiliateButton>
```

### Agoda — Universal CID (`NEXT_PUBLIC_AGODA_CID`)

Set CID di `.env`, lalu `buildAffiliateUrl` otomatis menyisipkannya ke semua link Agoda.

### Booking.com — UTM only (belum ada affiliate ID)

Link Booking.com saat ini hanya membawa UTM params. Daftar affiliate program di booking.com/affiliate-program jika ingin menambah tracking ID.

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
