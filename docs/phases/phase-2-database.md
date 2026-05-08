# Phase 2 — Database & Directories

> **Goal:** Tambah accommodation filter, cafe directory, "Report Update" feature. Database fully populated dengan 20+ akomodasi & 15+ kafe.

## Pre-requisites

- [ ] Phase 1 selesai (lihat phase-1-foundation.md Definition of Done)
- [ ] **Validasi lapangan minimum:** 10 akomodasi & 8 kafe sudah dikunjungi langsung dengan WiFi speed terukur (fast.com), harga dicek dalam 30 hari terakhir, foto sendiri atau lisensi clear
- [ ] Affiliate accounts approved (Traveloka, Agoda, Booking.com)

## Tasks (urutan)

### §2.1 Database setup
- [ ] Run migrations dari `reference/database-schema.sql`
- [ ] Enable RLS di semua tabel
- [ ] Generate TypeScript types: `supabase gen types typescript`
- [ ] `lib/supabase/client.ts` + `lib/supabase/server.ts`
- [ ] Seed data awal (20 akomodasi, 15 kafe)

### §2.2 Affiliate URL builder
- [ ] `lib/affiliate.ts` (lihat `reference/affiliate-config.md`)
- [ ] `components/ui/AffiliateButton.tsx` dengan UTM tracking
- [ ] Test: UTM params benar di redirect

### §2.3 Accommodation Filter (`/places/accommodation`)

**Pattern:**
1. Server Component fetch SEMUA akomodasi dari Supabase
2. Pass ke Client Component sebagai props
3. Filter di client dengan `useMemo` (no refetch)
4. URL sync via `useSearchParams` (shareable links)

**TypeScript types:**

```ts
// types/filters.ts
export interface AccommodationFilters {
  location: 'all' | 'batukaras' | 'pangandaran' | 'cijulang' | 'karapyak' | 'madasari'
  type: 'all' | 'homestay' | 'villa' | 'surf_camp' | 'guesthouse'
  priceMin: number
  priceMax: number
  wifiMinSpeed: 0 | 5 | 10 | 20 | 50
  hasDesk: boolean
  hasPool: boolean
  distanceToBeach: 500 | 1000 | 2000 | null
}

export const DEFAULT_FILTERS: AccommodationFilters = {
  location: 'all',
  type: 'all',
  priceMin: 0,
  priceMax: 200,
  wifiMinSpeed: 0,
  hasDesk: false,
  hasPool: false,
  distanceToBeach: null,
}
```

**UI Layout:**
- Desktop: Sidebar filter + grid 3 kolom
- Mobile: Filter button (with active count) → bottom sheet modal

**Card menampilkan:**
- Foto (Next.js Image, lazy)
- Nama
- Harga `$15–25/night` (mono) + `(~Rp 230k–390k)` di bawah
- WiFi speed bar (3 warna)
- Amenity badges: "Has Desk", "Surf Camp", "Pool"
- Jarak ke pantai: `350m to beach` (mono)
- "Verified [bulan tahun]" badge
- Tombol "Book on Traveloka →" (affiliate)

**Empty state:** "No accommodations match your filters. Try widening your price range or removing amenity requirements." + tombol "Reset Filters".

### §2.4 Cafe & WiFi Directory (`/places/cafes`)

**Tampilan:** List + map split (desktop) / tabs (mobile)

**Setiap listing:**
- Foto (atau placeholder dengan nama)
- WiFi speed (Mbps + bar)
- Power outlets (✓/✗)
- Jam buka ("08:00 – 22:00")
- Price range badge: $/$$/$$$
- Link Google Maps
- Tombol "Report Update"

### §2.5 Report Update Feature

**Modal `UpdateForm.tsx`:**

```ts
const updateSchema = z.object({
  fieldUpdated: z.enum(['wifi_speed', 'price', 'hours', 'closed_permanently', 'other']),
  newValue: z.string().min(1).max(500),
  email: z.string().email().optional().or(z.literal('')),
  honeypot: z.string().max(0),
})
```

POST ke `/api/report-update` → insert ke `place_updates` (status: pending)

### §2.6 Place Detail Pages (`/places/[slug]`)
- [ ] Dynamic route untuk akomodasi & kafe
- [ ] Schema.org `LodgingBusiness` / `CafeOrCoffeeShop`
- [ ] Map embed
- [ ] Tombol affiliate (akomodasi) atau Google Maps (kafe)

### §2.7 Tambahan Artikel (10 artikel)

Lihat `reference/article-list.md`. Phase 2 priority:
- Best Surf Camps in Batukaras (With WiFi Speeds)
- Best Budget Homestays in Batukaras Under $20/Night
- Digital Nomad-Friendly Accommodations in Pangandaran
- Long-Stay Accommodation in Batukaras: Monthly Rates Guide
- Best Cafes with Fast WiFi in Pangandaran & Batukaras
- Citumang River Tubing Guide
- Karapyak Beach: The Quiet Alternative to Pangandaran
- Batukaras Digital Nomad Guide 2026
- SIM Card and Internet Options in Pangandaran
- How to Get from Bandung to Pangandaran

## Definition of Done — Phase 2

- [ ] 20+ akomodasi & 15+ kafe di database (data verified)
- [ ] Filter working dengan URL sync
- [ ] Affiliate links tracking benar (test UTM)
- [ ] Report Update form tested
- [ ] Phase 1 DoD masih semua ✅
- [ ] 15 artikel total published
- [ ] Lighthouse > 90 di halaman accommodation/cafes
- [ ] Update CHANGELOG.md
