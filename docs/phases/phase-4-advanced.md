# Phase 4 — Advanced

> **Goal:** Surf conditions tool, switch ke Mapbox, A11y/perf audit deep, scale content ke 30+ artikel.

## Pre-requisites

- [ ] Phase 3 selesai
- [ ] Traffic baseline sudah ada (organic dari Google)
- [ ] Email list ≥ 100 subscribers (validasi audience)

## Tasks

### §4.1 Migrate Maps: Google Embed → Mapbox GL JS

**Alasan migration:**
- Mapbox lebih customizable untuk styling brand-aligned
- Cost: free tier 50k loads/month (cukup untuk awal)
- Performa lebih bagus daripada iframe Google Maps

**Tasks:**
- [ ] Setup Mapbox account + access token
- [ ] Buat custom map style (warna brand: ocean, sand, coral)
- [ ] Migrate `MapEmbed.tsx` ke `MapboxMap.tsx`
- [ ] Lazy-load (intersection observer)
- [ ] Test: peformance tidak turun

### §4.2 Surf Conditions Tool (`/tools/surf-conditions`)

**Data source options:**
- Surfline API (paid, mahal)
- Stormglass.io (paid, lebih murah)
- WindGuru (free dengan attribution)
- Manual entry harian (paling murah, paling akurat)

**Disarankan:** Manual entry harian dulu (3 surf spots: Batu Karas main break, Karang reef, Pangandaran beach), upgrade ke API kalau traffic sudah signifikan.

**UI:**
- Dropdown: Pilih surf spot
- Display: wave height, period, swell direction, wind, tide
- "Updated [time ago]" indicator
- Forecast 3 hari ke depan
- Best time to surf today (calculated)

**Schema:**

```sql
CREATE TABLE surf_conditions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  spot TEXT NOT NULL CHECK (spot IN ('batukaras_main', 'karang_reef', 'pangandaran_beach')),
  wave_height_min DECIMAL(3,1),
  wave_height_max DECIMAL(3,1),
  wave_period INTEGER,
  swell_direction TEXT,
  wind_direction TEXT,
  wind_speed_kmh INTEGER,
  tide TEXT CHECK (tide IN ('low', 'rising', 'high', 'falling')),
  rating INTEGER CHECK (rating BETWEEN 1 AND 5),
  notes TEXT,
  observed_at TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);
```

### §4.3 Performance Audit Deep

- [ ] Bundle analyzer: cek apakah ada library besar yang bisa di-tree-shake
- [ ] Test loading di throttled 3G (Chrome DevTools)
- [ ] Optimize fonts: subset jika perlu
- [ ] Test INP < 200ms di semua interactive page
- [ ] Audit dengan Web Vitals plugin

### §4.4 Accessibility Deep Audit

- [ ] Screen reader test (VoiceOver atau NVDA) — minimum homepage + accommodation filter
- [ ] Keyboard-only navigation test untuk semua flow utama
- [ ] Color contrast audit dengan axe DevTools
- [ ] Fix semua violation level "serious" atau "critical"

### §4.5 Content scale: 30 artikel total

Lihat `reference/article-list.md` untuk full list. Phase 4 sisa artikel:

- Kertajati Airport (KJT) to Green Canyon: Complete Transfer Guide
- How to Get from Yogyakarta to Pangandaran
- Getting Around Pangandaran: Ojek, Motorbike Rental, and More
- Best Seafood Restaurants in Pangandaran (Honest Reviews)
- Where to Eat in Batukaras on a Budget
- Pangandaran Food Guide: Local Dishes You Must Try
- Is Pangandaran Safe? Honest Safety Guide for Foreigners
- How to Avoid Tourist Scams in Pangandaran
- Madasari Beach: Where Locals Go
- Green Canyon vs Citumang: Which Body Rafting Should You Choose?

## Definition of Done — Phase 4

- [ ] 30+ artikel published, semua verified dalam 6 bulan terakhir
- [ ] Mapbox migration completed, performance tetap > 90
- [ ] Surf conditions tool live (manual entry workflow established)
- [ ] A11y audit passed (no serious/critical violations)
- [ ] Phase 1-3 DoD masih semua ✅
- [ ] Update CHANGELOG.md
