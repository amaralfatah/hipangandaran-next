# Product Requirements Document (PRD)
## Pangandaran & Batukaras English Travel Hub

**Version:** 1.1
**Last Updated:** Mei 2026
**Audience:** AI Coding Agents (Claude Code, Cursor) and human developers
**Status:** Active — source of truth

---

## 0. Instruksi untuk AI Agent (BACA DULU)

Dokumen ini adalah **sumber kebenaran tunggal** untuk membangun website ini. Sebelum menulis kode apa pun, ikuti aturan berikut:

### 0.1 Aturan Eksekusi

1. **Baca dokumen ini secara penuh** sebelum mulai. Jangan implementasi parsial tanpa konteks lengkap.
2. **Ikuti urutan fase** di Bagian 8 (Phase 1 → 4). Jangan loncat fase.
3. **Jangan berasumsi.** Jika ada ambiguitas, **tanya ke user dulu** sebelum membuat keputusan teknis.
4. **Setiap commit harus atomic** dan mengacu ke nomor task di checklist Bagian 8 (contoh: `feat(p1): setup next.js + tailwind [§8.1]`).
5. **Setelah selesai sebuah fitur**, jalankan checklist "Definition of Done" di Bagian 11 sebelum lanjut.
6. **Jangan refactor** struktur folder atau stack tanpa diskusi eksplisit.

### 0.2 Format Komunikasi dengan User

Saat menyelesaikan task, lapor dengan format ini:

```
✅ Selesai: [nama task] [§nomor section]
📁 File diubah: [list file]
⚠️ Catatan: [hal yang perlu user tahu, atau "tidak ada"]
🔜 Selanjutnya: [task berikutnya menurut PRD]
```

### 0.3 Prioritas Saat Konflik

Jika ada konflik antara: (a) PRD ini, (b) best practice umum, (c) preferensi pribadi —
**urutan prioritas:** PRD > best practice > preferensi.
Jika PRD salah/usang, lapor ke user, jangan diam-diam menyimpang.

---

## 1. Ringkasan Proyek

### 1.1 Apa Ini?

Website travel guide berbahasa Inggris untuk wisatawan mancanegara dan digital nomad yang mengunjungi **Pangandaran dan Batukaras**, Jawa Barat, Indonesia.

**Domain:** TBD (akan ditentukan user sebelum Phase 1 dimulai)
**Target audience:** 100% English-speaking foreign travelers. **TIDAK ADA versi Bahasa Indonesia.**

### 1.2 Masalah yang Dipecahkan

- Tidak ada satu sumber tepercaya berbahasa Inggris untuk Pangandaran/Batukaras yang terstruktur dan ter-update
- Wisatawan asing terpaksa mengandalkan Reddit thread usang dan blog pribadi yang tidak ter-update
- Digital nomad tidak bisa menemukan data teknis terverifikasi (WiFi speed, coworking, akomodasi long-stay)

### 1.3 User Persona

**Persona A — "The Surf Nomad"**
- Usia 25–38, dari Eropa/Australia/Amerika
- Bekerja remote, mencari pantai dengan WiFi bagus
- Butuh: surf conditions, akomodasi dengan meja kerja, kecepatan internet, biaya hidup
- Device: mobile-first, desktop saat riset panjang

**Persona B — "The Adventure Traveler"**
- Backpacker atau pasangan muda, budget menengah
- Dari Asia (Singapura, Malaysia, Korea, Jepang) atau Eropa
- Butuh: itinerary, transport dari Jakarta/Bandung, aktivitas (Green Canyon, surfing, body rafting)
- Device: mostly mobile

### 1.4 Tujuan Bisnis

1. Mendapatkan organic traffic dari Google pencarian berbahasa Inggris
2. Menghasilkan komisi afiliasi (Traveloka, Agoda, Booking.com, GetYourGuide, SafetyWing)
3. Membangun email list sebagai aset jangka panjang
4. Menjadi otoritas digital #1 Pangandaran untuk wisatawan asing

### 1.5 Non-Goals (Apa yang TIDAK Dibangun)

Dokumentasi eksplisit untuk mencegah scope creep:

- ❌ Sistem booking langsung (kita hanya redirect ke afiliasi)
- ❌ User account / login system di Phase 1–3
- ❌ Komentar/forum (high moderation cost)
- ❌ Versi Bahasa Indonesia
- ❌ Mobile app (web-only)
- ❌ Multi-destinasi di luar Pangandaran/Batukaras (akan jadi terpisah jika sukses)

---

## 2. Tech Stack & Arsitektur

### 2.1 Stack Wajib (Tidak Boleh Diubah Tanpa Diskusi)

| Komponen | Pilihan | Alasan |
|---|---|---|
| Framework | **Next.js 14+** (App Router, TypeScript) | SSR/SSG, SEO-friendly |
| Styling | **Tailwind CSS** | Utility-first, fast |
| Language | **TypeScript** (strict mode) | Type safety wajib |
| Database | **Supabase (PostgreSQL)** | Free tier generous |
| CMS | **MDX files** di `/content` | Git-versioned, no DB cost |
| Hosting | **Vercel** (Hobby tier) | Best Next.js DX |
| Email | **Resend** | Simpler than Mailchimp untuk transactional |
| Maps | **Google Maps Embed API** (Phase 1–2), **Mapbox GL JS** (Phase 3+) | Hemat biaya di awal |
| Analytics | **Vercel Analytics + Google Search Console** | Privacy-friendly |
| Forms | **React Hook Form + Zod** | Validation type-safe |
| Image Optimization | **Next.js `<Image>`** + `next/image` remote patterns | Required, jangan pakai `<img>` |

### 2.2 Struktur Folder Proyek

```
/
├── app/
│   ├── (site)/
│   │   ├── layout.tsx                  # Header + Footer wrapper
│   │   ├── page.tsx                    # Homepage
│   │   ├── guides/
│   │   │   ├── page.tsx                # Daftar semua artikel
│   │   │   └── [slug]/page.tsx         # Artikel individual (load MDX)
│   │   ├── places/
│   │   │   ├── page.tsx                # Index direktori
│   │   │   ├── accommodation/page.tsx  # Filter akomodasi (Phase 2)
│   │   │   ├── cafes/page.tsx          # Direktori kafe + WiFi (Phase 2)
│   │   │   └── [slug]/page.tsx         # Detail tempat individual
│   │   ├── tools/
│   │   │   ├── cost-calculator/page.tsx # Phase 3
│   │   │   └── surf-conditions/page.tsx # Phase 4
│   │   ├── about/page.tsx
│   │   ├── privacy/page.tsx            # Wajib (GDPR)
│   │   └── affiliate-disclosure/page.tsx
│   ├── api/
│   │   ├── subscribe/route.ts          # Email capture endpoint
│   │   └── report-update/route.ts      # Crowdsource update endpoint
│   ├── sitemap.ts
│   ├── robots.ts
│   └── layout.tsx                      # Root layout (fonts, metadata)
├── content/
│   └── guides/                         # File-file .mdx artikel
├── components/
│   ├── ui/                             # Button, Card, Badge, dll
│   ├── tools/                          # Komponen tool interaktif
│   ├── mdx/                            # Komponen yang dipakai di .mdx
│   └── layout/                         # Header, Footer, Nav
├── lib/
│   ├── supabase/
│   │   ├── client.ts                   # Client-side Supabase
│   │   └── server.ts                   # Server-side Supabase
│   ├── affiliate.ts                    # Affiliate URL builders
│   ├── calculator-data.ts              # Konstanta harga
│   ├── mdx.ts                          # MDX loader & frontmatter parser
│   └── utils.ts
├── types/
│   ├── database.ts                     # Generated dari Supabase CLI
│   └── content.ts                      # Frontmatter types
├── public/
│   └── images/
└── content/
    └── guides/                         # MDX files
```

### 2.3 TypeScript Configuration

`tsconfig.json` harus pakai `strict: true` dan `noUncheckedIndexedAccess: true`. Jangan pakai `any` — pakai `unknown` lalu narrow dengan type guard.

### 2.4 Database Schema (Supabase)

Jalankan sebagai migration files di `/supabase/migrations/`. Generate types dengan `supabase gen types typescript`.

```sql
-- 001_create_accommodations.sql
CREATE TABLE accommodations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('homestay', 'villa', 'surf_camp', 'guesthouse')),
  location TEXT NOT NULL CHECK (location IN ('batukaras', 'pangandaran', 'cijulang')),
  price_min_usd DECIMAL(10,2) NOT NULL,
  price_max_usd DECIMAL(10,2) NOT NULL,
  wifi_speed_mbps INTEGER, -- NULL = belum diukur
  has_desk BOOLEAN NOT NULL DEFAULT false,
  has_pool BOOLEAN NOT NULL DEFAULT false,
  distance_to_beach_m INTEGER NOT NULL,
  google_maps_url TEXT,
  booking_affiliate_url TEXT,
  description TEXT,
  images TEXT[] NOT NULL DEFAULT '{}',
  verified_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_accommodations_location ON accommodations(location);
CREATE INDEX idx_accommodations_price ON accommodations(price_min_usd, price_max_usd);
CREATE INDEX idx_accommodations_slug ON accommodations(slug);

-- 002_create_cafes.sql
CREATE TABLE cafes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  location TEXT NOT NULL,
  wifi_speed_mbps INTEGER,
  power_outlets BOOLEAN NOT NULL DEFAULT false,
  opens_at TIME,
  closes_at TIME,
  price_range TEXT CHECK (price_range IN ('budget', 'mid', 'upscale')),
  instagram_url TEXT,
  google_maps_url TEXT,
  latitude DECIMAL(10,7),
  longitude DECIMAL(10,7),
  last_verified_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- 003_create_place_updates.sql
CREATE TABLE place_updates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  place_type TEXT NOT NULL CHECK (place_type IN ('accommodation', 'cafe')),
  place_id UUID NOT NULL,
  field_updated TEXT NOT NULL,
  new_value TEXT NOT NULL,
  submitted_by_email TEXT,
  status TEXT NOT NULL DEFAULT 'pending'
    CHECK (status IN ('pending', 'approved', 'rejected')),
  ip_address INET, -- untuk rate limiting & anti-spam
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- 004_create_subscribers.sql
CREATE TABLE subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  source TEXT, -- 'homepage' | 'calculator' | 'guide:slug'
  ip_address INET,
  unsubscribed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Auto-update updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER accommodations_updated_at BEFORE UPDATE ON accommodations
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
```

### 2.5 Row Level Security (RLS) — WAJIB

```sql
-- Enable RLS di semua tabel
ALTER TABLE accommodations ENABLE ROW LEVEL SECURITY;
ALTER TABLE cafes ENABLE ROW LEVEL SECURITY;
ALTER TABLE place_updates ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscribers ENABLE ROW LEVEL SECURITY;

-- Public read untuk accommodations & cafes (data yang dipublikasikan)
CREATE POLICY "Public read accommodations"
  ON accommodations FOR SELECT
  USING (true);

CREATE POLICY "Public read cafes"
  ON cafes FOR SELECT
  USING (true);

-- Anonymous bisa INSERT subscribers & place_updates (dengan rate limiting di app)
CREATE POLICY "Anyone can subscribe"
  ON subscribers FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can submit update"
  ON place_updates FOR INSERT
  WITH CHECK (true);

-- TIDAK ADA SELECT policy untuk subscribers/place_updates (privacy)
-- Akses admin via service role key di server-side only
```

**Kritis:** `SUPABASE_SERVICE_ROLE_KEY` **tidak boleh** di-expose ke client. Hanya pakai di Route Handlers (`app/api/`).

---

## 3. Desain & UI

### 3.1 Prinsip Desain

- **Tone:** Editorial, organic, coastal — seperti panduan dari teman lokal yang tinggal di sana, bukan korporat
- **Bukan** desain OTA generik (Booking.com, Traveloka, Trivago)
- **Mobile-first** — mayoritas user akses dari HP saat di perjalanan
- **Fast** — Lighthouse score > 90 semua kategori
- **Trust signals** — selalu tampilkan tanggal verifikasi data dan sumber

### 3.2 Color Palette

```css
:root {
  --color-ocean:     #1a6b8a;  /* Biru laut dalam — primary actions */
  --color-sand:      #f5e6c8;  /* Pasir pantai — backgrounds */
  --color-coral:     #e8624a;  /* Aksen karang — CTA, highlights */
  --color-forest:    #2d5a3d;  /* Hijau hutan tropis — success states */
  --color-cream:     #faf8f3;  /* Background utama */
  --color-charcoal:  #1c1c1e;  /* Text utama */

  /* Functional */
  --color-success:   #2d5a3d;
  --color-warning:   #d4860c;
  --color-error:     #c1432a;

  /* WiFi speed indicator */
  --wifi-slow:       #c1432a;  /* < 5 Mbps */
  --wifi-medium:     #d4860c;  /* 5–20 Mbps */
  --wifi-fast:       #2d5a3d;  /* > 20 Mbps */
}
```

Setup di `tailwind.config.ts`:

```ts
theme: {
  extend: {
    colors: {
      ocean: '#1a6b8a',
      sand: '#f5e6c8',
      coral: '#e8624a',
      forest: '#2d5a3d',
      cream: '#faf8f3',
      charcoal: '#1c1c1e',
    }
  }
}
```

### 3.3 Typography

```ts
// app/layout.tsx
import { Playfair_Display, Source_Serif_4, JetBrains_Mono } from 'next/font/google'

const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-display' })
const sourceSerif = Source_Serif_4({ subsets: ['latin'], variable: '--font-body' })
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' })
```

| Use | Font |
|---|---|
| Headings (h1–h3) | Playfair Display (serif, editorial) |
| Body text | Source Serif 4 (serif, readable) |
| Numbers, prices, WiFi speeds | JetBrains Mono (monospace) |

**JANGAN pakai:** Arial, Inter, Roboto, atau sans-serif generik lainnya.

### 3.4 Komponen UI Wajib

Semua di `/components/ui/`:

```
Button.tsx          — variants: primary, secondary, ghost, coral
Card.tsx            — listing akomodasi & kafe
Badge.tsx           — tags: "Verified", "Surf Camp", "Digital Nomad Friendly"
WifiSpeedBar.tsx    — visual bar untuk WiFi (3 warna sesuai speed)
PriceTag.tsx        — harga dalam USD + Rp inline
MapEmbed.tsx        — wrapper Google Maps embed (lazy-loaded)
AffiliateButton.tsx — tombol booking dengan UTM tracking + rel="nofollow sponsored"
EmailCapture.tsx    — form subscribe email (with honeypot)
UpdateForm.tsx      — modal "Report an Update"
InfoBox.tsx         — info/warning/tip boxes (untuk MDX)
TableOfContents.tsx — auto-generated dari headings artikel
```

### 3.5 Accessibility (WCAG 2.1 AA — Minimum)

- Semua interactive element harus keyboard-accessible (`tabindex`, `onKeyDown` di mana perlu)
- Color contrast ratio minimum 4.5:1 untuk body text, 3:1 untuk large text
- Semua `<img>` punya `alt` text yang deskriptif (bukan "image" atau "photo")
- Form fields punya `<label>` yang ter-associate (bukan placeholder-only)
- Skip-to-content link di top of page
- Focus indicator yang visible (jangan hapus default outline tanpa replacement)

---

## 4. Halaman & Fitur

### 4.1 Homepage (`/`)

**Tujuan:** Konversi pengunjung baru → pembaca artikel atau tool user

**Sections (urutan dari atas ke bawah):**

```
[1] Hero Section
    - Headline: "Your Honest Guide to Pangandaran & Batukaras"
    - Sub: "For surfers, digital nomads, and adventurers — not tour groups"
    - CTA primary: "Start Planning" → scroll ke #guides
    - CTA secondary: "Find Accommodation" → /places/accommodation
    - Background: foto Batukaras sunset (BUKAN stock photo generik)
    - Image attribution di footer kalau dari Unsplash/Pexels

[2] Quick Navigation Cards (4 cards, grid responsive 2x2 di mobile)
    🏄 Surf Guide          → /guides?category=activities
    🏠 Find Accommodation  → /places/accommodation
    🗺️ Getting Here        → /guides?category=transport
    💰 Cost Calculator     → /tools/cost-calculator

[3] Latest Guides (3 artikel terbaru, ambil dari MDX frontmatter sorted by publishedAt)
    Card per artikel: featured image, judul, reading time, kategori badge

[4] Featured Tool — Accommodation Filter Teaser (Phase 2+)
    Preview: "Filter by WiFi speed, price, and distance to beach"
    Mock UI screenshot atau live preview kecil
    CTA: "Find your perfect stay" → /places/accommodation

[5] Email Capture
    Headline: "Get the Batukaras Insider Newsletter"
    Sub: "Twice-monthly updates on prices, surf conditions, and hidden spots"
    Form: email + tombol "Subscribe"
    Honeypot field (hidden) untuk anti-bot
    POST to /api/subscribe → Supabase

[6] Footer
    - Nav links: Guides, Places, Tools, About
    - Affiliate disclosure (singkat) + link ke /affiliate-disclosure
    - Privacy link
    - "Data last verified: [tanggal]" (manual update)
    - Social links (Instagram saja awalnya)
```

### 4.2 Artikel / Guides (`/guides/[slug]`)

**Format konten:** MDX di `/content/guides/{slug}.mdx`

**Frontmatter wajib (validasi dengan Zod):**

```yaml
---
title: "How to Get from Jakarta to Batukaras (2026 Complete Guide)"
description: "Step-by-step transport guide including train, bus, and shuttle options with current prices"
publishedAt: "2026-05-15"
updatedAt: "2026-05-15"
category: "transport"  # transport | accommodation | activities | food | nomad | planning
readingTime: 8         # estimated minutes
featuredImage: "/images/guides/jakarta-to-batukaras.jpg"
featuredImageAlt: "View from window of bus winding along Pangandaran coastal road"
affiliateDisclosure: true
author: "Site Author"
---
```

**Validation schema (`lib/mdx.ts`):**

```ts
import { z } from 'zod'

export const guideFrontmatterSchema = z.object({
  title: z.string().min(10).max(100),
  description: z.string().min(50).max(160), // SEO-optimal
  publishedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  updatedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  category: z.enum(['transport', 'accommodation', 'activities', 'food', 'nomad', 'planning']),
  readingTime: z.number().int().positive(),
  featuredImage: z.string().startsWith('/'),
  featuredImageAlt: z.string().min(10),
  affiliateDisclosure: z.boolean(),
  author: z.string().default('Site Author'),
})

export type GuideFrontmatter = z.infer<typeof guideFrontmatterSchema>
```

Build harus **gagal** jika ada artikel dengan frontmatter invalid.

**Layout artikel:**

```
- Breadcrumb: Home > Guides > [Category] > [Judul]
- Judul (h1) + meta (reading time, last updated)
- Affiliate disclosure box (jika affiliateDisclosure: true) — di atas konten
- Featured image (Next.js Image, priority={true})
- Table of Contents (auto-generated dari h2/h3) — sticky di desktop, collapsible di mobile
- Konten MDX (gunakan komponen di /components/mdx/)
- Info box di akhir: "Prices verified [bulan tahun] — Help us keep this updated [link]"
- Affiliate CTA box (jika kategori = accommodation/activities)
- Related articles (3 artikel: same category, exclude current)
- Email capture (di akhir)
```

### 4.3 Daftar 30 Artikel Prioritas (Phase 1–3)

**Transport (5)**
1. How to Get from Jakarta to Batukaras (All Options)
2. How to Get from Bandung to Pangandaran
3. How to Get from Yogyakarta to Pangandaran
4. Kertajati Airport (KJT) to Green Canyon: Complete Transfer Guide
5. Getting Around Pangandaran: Ojek, Motorbike Rental, and More

**Accommodation (5)**
6. Best Surf Camps in Batukaras (With WiFi Speeds)
7. Best Budget Homestays in Batukaras Under $20/Night
8. Digital Nomad-Friendly Accommodations in Pangandaran
9. Batukaras vs Pangandaran: Where Should You Stay?
10. Long-Stay Accommodation in Batukaras: Monthly Rates Guide

**Activities (5)**
11. Green Canyon Body Rafting: The Complete Guide
12. Surfing in Batukaras: Honest Beginner's Guide
13. Best Surf Breaks in Batukaras (With Conditions Calendar)
14. Citumang River Tubing Guide
15. Day Trip from Batukaras: 5 Options Worth Doing

**Nomad & Practical (5)**
16. Batukaras Digital Nomad Guide 2026
17. Cost of Living in Batukaras: Real Monthly Budget
18. Best Cafes with Fast WiFi in Pangandaran & Batukaras
19. SIM Card and Internet Options in Pangandaran
20. Is Pangandaran Safe? Honest Safety Guide for Foreigners

**Food (3)**
21. Best Seafood Restaurants in Pangandaran (Honest Reviews)
22. Where to Eat in Batukaras on a Budget
23. Pangandaran Food Guide: Local Dishes You Must Try

**Planning (7)**
24. Pangandaran 3-Day Itinerary for First-Timers
25. Batukaras 1-Week Itinerary for Digital Nomads
26. Best Time to Visit Pangandaran (Month by Month)
27. Pangandaran vs Bali: An Honest Comparison
28. Travel Insurance for Indonesia: What Nomads Actually Buy
29. How to Avoid Tourist Scams in Pangandaran
30. Pangandaran on a Budget: 7-Day Under $300 Guide

### 4.4 Accommodation Filter Tool (`/places/accommodation`) — Phase 2

**Ini adalah fitur pembeda utama. Bukan list — tapi filter interaktif.**

**TypeScript types:**

```ts
// types/filters.ts
export interface AccommodationFilters {
  location: 'all' | 'batukaras' | 'pangandaran' | 'cijulang'
  type: 'all' | 'homestay' | 'villa' | 'surf_camp' | 'guesthouse'
  priceMin: number          // USD/night
  priceMax: number          // USD/night
  wifiMinSpeed: 0 | 5 | 10 | 20 | 50  // Mbps
  hasDesk: boolean
  hasPool: boolean
  distanceToBeach: 500 | 1000 | 2000 | null  // meters; null = no filter
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

**Implementation pattern:**

1. **Server Component** fetches **all** accommodations dari Supabase (data <500 rows, OK untuk fetch all)
2. **Client Component** menerima props, manage filter state via `useState`
3. Filter berjalan di client-side dengan `useMemo` (fast, no refetch)
4. URL sync filter via `useSearchParams` (shareable links)

**UI Filter:**

```
Desktop:
  ┌─────────────┬──────────────────────────┐
  │  Sidebar    │  Result Grid             │
  │  Filters    │  (cards 3 kolom)         │
  │             │                          │
  │  [Location] │  [Card] [Card] [Card]    │
  │  [Type]     │  [Card] [Card] [Card]    │
  │  [Price]    │                          │
  │  [WiFi]     │                          │
  │  [Amenities]│                          │
  └─────────────┴──────────────────────────┘

Mobile:
  ┌──────────────────────────────────────┐
  │  [Filter Button] showing active count│
  ├──────────────────────────────────────┤
  │  [Card]                              │
  │  [Card]                              │
  └──────────────────────────────────────┘
  Filter button → bottom sheet modal
```

**Setiap card menampilkan:**
- Foto (Next.js Image, lazy)
- Nama akomodasi
- Harga: `$15–25/night` (mono font) + `(~Rp 230k–390k)` di bawahnya
- WiFi speed bar visual (warna sesuai speed)
- Amenity badges: "Has Desk", "Surf Camp", "Pool"
- Jarak ke pantai: `350m to beach` (mono)
- "Verified [bulan tahun]" badge kecil
- Tombol "Book on Traveloka →" (affiliate, dengan UTM)

**Empty state:** "No accommodations match your filters. Try widening your price range or removing amenity requirements." + tombol "Reset Filters".

### 4.5 Cafe & WiFi Directory (`/places/cafes`) — Phase 2

**Tampilan:** List + map split view (desktop) / tabs (mobile)

**Setiap listing:**
- Foto (jika ada) atau placeholder dengan nama
- Nama
- WiFi speed (angka Mbps + bar visual)
- Power outlets indicator (✓/✗)
- Jam buka (format: "08:00 – 22:00")
- Price range badge: $/$$/$$$
- Link Google Maps
- Tombol "Report Update" → modal

**"Report Update" Modal:**

```tsx
// components/UpdateForm.tsx
const updateSchema = z.object({
  fieldUpdated: z.enum(['wifi_speed', 'price', 'hours', 'closed_permanently', 'other']),
  newValue: z.string().min(1).max(500),
  email: z.string().email().optional().or(z.literal('')),
  honeypot: z.string().max(0), // anti-bot: harus kosong
})
```

POST ke `/api/report-update` → insert ke `place_updates` table (status: pending).

### 4.6 Trip Cost Calculator (`/tools/cost-calculator`) — Phase 3

**Input form:**
- Number of travelers: radio [1, 2, 3, 4+]
- Duration: radio [3, 5, 7, 14, custom days]
- Budget style: radio [Budget 🎒, Mid-range 🏨, Comfort 🛋️]
- Origin city: dropdown [Jakarta, Bandung, Yogyakarta, Surabaya, Other]
- Activities: checkboxes [Surfing lesson, Green Canyon, Citumang, Boat trip]

**Output (table dengan responsive layout):**

```
Estimated Cost Breakdown

Transport (Jakarta → Batukaras)    Rp 350,000
Accommodation (3 nights)           Rp 450,000
Food (3 days)                      Rp 270,000
Activities                         Rp 200,000
Local transport                    Rp 90,000
─────────────────────────────────────────
TOTAL                              Rp 1,360,000
                                   ~$85 USD

[Book your accommodation →]
[Get travel insurance →]
[Save this estimate (email)]   ← capture email
```

**Logika kalkulasi:** Hardcode di `/lib/calculator-data.ts` sebagai konstanta. Update manual setiap 3–6 bulan. Tampilkan "Last updated: [bulan tahun]" di bagian bawah.

```ts
// lib/calculator-data.ts
export const CALCULATOR_DATA = {
  lastUpdated: '2026-05',
  exchangeRate: 16000, // IDR per USD
  transport: {
    jakarta: { budget: 150_000, mid: 250_000, comfort: 450_000 },
    bandung: { budget: 100_000, mid: 180_000, comfort: 350_000 },
    // ...
  },
  accommodation: {
    budget: { min: 100_000, max: 250_000 },     // per night
    mid: { min: 250_000, max: 600_000 },
    comfort: { min: 600_000, max: 1_500_000 },
  },
  food: { budget: 90_000, mid: 200_000, comfort: 400_000 }, // per day
  activities: {
    surfing_lesson: 350_000,
    green_canyon: 250_000,
    citumang: 150_000,
    boat_trip: 200_000,
  },
} as const
```

---

## 5. SEO & Konten

### 5.1 Technical SEO — Wajib

**Setiap halaman generate metadata dinamis:**

```ts
// Contoh untuk artikel
export async function generateMetadata(
  { params }: { params: { slug: string } }
): Promise<Metadata> {
  const article = await getArticleBySlug(params.slug)
  if (!article) return { title: 'Not Found' }

  return {
    title: `${article.title} | Pangandaran Travel Guide`,
    description: article.description,
    openGraph: {
      title: article.title,
      description: article.description,
      images: [{ url: article.featuredImage, width: 1200, height: 630 }],
      type: 'article',
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.description,
      images: [article.featuredImage],
    },
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/guides/${params.slug}`,
    },
  }
}
```

### 5.2 Schema.org Markup (JSON-LD)

Tambahkan di setiap halaman yang relevan:

```tsx
// components/JsonLd.tsx
export function ArticleJsonLd({ article }: { article: GuideFrontmatter & { slug: string } }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    image: article.featuredImage,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    author: { '@type': 'Person', name: article.author },
    publisher: {
      '@type': 'Organization',
      name: 'Pangandaran Travel Guide',
      logo: { '@type': 'ImageObject', url: '/logo.png' }
    }
  }
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
```

Schema types yang dipakai:
- `Article` — untuk semua /guides/*
- `LodgingBusiness` — untuk /places/[slug] (akomodasi)
- `CafeOrCoffeeShop` — untuk /places/cafes/[slug]
- `BreadcrumbList` — untuk semua halaman dengan breadcrumb
- `FAQPage` — jika artikel berisi FAQ section

### 5.3 Sitemap & Robots

```ts
// app/sitemap.ts
import { MetadataRoute } from 'next'
import { getAllArticles } from '@/lib/mdx'
import { getAllAccommodations, getAllCafes } from '@/lib/supabase/server'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL!
  const articles = await getAllArticles()
  const accommodations = await getAllAccommodations()
  const cafes = await getAllCafes()

  return [
    { url: baseUrl, lastModified: new Date(), priority: 1.0 },
    { url: `${baseUrl}/guides`, lastModified: new Date(), priority: 0.9 },
    { url: `${baseUrl}/places/accommodation`, priority: 0.9 },
    { url: `${baseUrl}/places/cafes`, priority: 0.8 },
    { url: `${baseUrl}/tools/cost-calculator`, priority: 0.8 },
    ...articles.map(a => ({
      url: `${baseUrl}/guides/${a.slug}`,
      lastModified: new Date(a.updatedAt),
      priority: 0.7,
    })),
    ...accommodations.map(a => ({
      url: `${baseUrl}/places/${a.slug}`,
      lastModified: new Date(a.updated_at),
      priority: 0.6,
    })),
  ]
}
```

```ts
// app/robots.ts
export default function robots() {
  return {
    rules: { userAgent: '*', allow: '/', disallow: ['/api/', '/admin/'] },
    sitemap: `${process.env.NEXT_PUBLIC_SITE_URL}/sitemap.xml`,
  }
}
```

### 5.4 Performa Target

| Metric | Target |
|---|---|
| Lighthouse Performance | > 90 |
| Lighthouse SEO | > 95 |
| Lighthouse Accessibility | > 90 |
| Lighthouse Best Practices | > 90 |
| LCP (Largest Contentful Paint) | < 2.5s |
| CLS (Cumulative Layout Shift) | < 0.1 |
| INP (Interaction to Next Paint) | < 200ms |
| Total page weight | < 1 MB on 3G |

**Wajib:**
- Semua image pakai Next.js `<Image>` dengan `width`, `height`, dan `alt` yang benar
- Gunakan `priority` hanya untuk above-fold images
- Lazy-load Mapbox/Maps embeds (intersection observer)
- Minimal JS bundle — hindari library besar
- `font-display: swap` (sudah default di Next.js fonts)

### 5.5 Content Style Guide

Karena artikel akan ditulis dengan bantuan AI lalu diedit manual, semua artikel **wajib** mengikuti style guide ini agar terdengar otentik:

**Voice & tone:**
- Tulis seperti teman lokal yang sudah tinggal di Pangandaran 2 tahun, bukan PR copywriter
- Pakai second person ("you'll find that...") bukan first person plural ("we recommend")
- Specific over general: "Rp 35,000" bukan "affordable"; "20 Mbps" bukan "fast WiFi"
- Honest assessments — sebut juga kekurangan, bukan cuma promosi

**HARUS dihindari (red flags AI-generated content):**
- ❌ "In conclusion", "It's important to note", "Without a doubt"
- ❌ "Nestled in", "boasts", "vibrant", "bustling", "hidden gem"
- ❌ Bullet point storms tanpa paragraf konektor
- ❌ Setiap paragraf dimulai dengan kalimat topik yang kaku
- ❌ "Whether you're a [X] or [Y], this guide..." opener

**Wajib ada di setiap artikel:**
- Tanggal verifikasi harga eksplisit ("Prices verified May 2026")
- Minimal satu specific anecdote/observation yang tidak bisa di-Google
- Disclaimer kalau ada hal yang berubah cepat (jadwal kapal, harga BBM, dll)
- Honest section "What this guide doesn't cover" jika relevan

---

## 6. Monetisasi — Implementasi Teknis

### 6.1 Affiliate Links

```ts
// lib/affiliate.ts
const env = (key: string) => process.env[`NEXT_PUBLIC_${key}`] ?? ''

export const affiliate = {
  traveloka: (propertyId: string) => {
    const params = new URLSearchParams({
      id: propertyId,
      affiliate_id: env('TRAVELOKA_AFFILIATE_ID'),
      utm_source: 'pangandaran-guide',
      utm_medium: 'affiliate',
      utm_campaign: 'accommodation',
    })
    return `https://www.traveloka.com/hotel/detail?${params}`
  },

  agoda: (propertyId: string) => {
    const params = new URLSearchParams({
      cid: env('AGODA_CID'),
      utm_source: 'pangandaran-guide',
    })
    return `https://www.agoda.com/hotel/${propertyId}?${params}`
  },

  getyourguide: (activityId: string) => {
    const params = new URLSearchParams({
      partner_id: env('GYG_PARTNER_ID'),
      utm_source: 'pangandaran-guide',
    })
    return `https://www.getyourguide.com/activity/${activityId}?${params}`
  },

  safetywing: () => {
    const params = new URLSearchParams({
      referenceID: env('SAFETYWING_REF_ID'),
      utm_source: 'pangandaran-guide',
    })
    return `https://safetywing.com/?${params}`
  },
} as const
```

**Komponen `AffiliateButton`:**

```tsx
// components/ui/AffiliateButton.tsx
interface Props {
  href: string
  children: React.ReactNode
  variant?: 'primary' | 'coral'
  showDisclaimer?: boolean
}

export function AffiliateButton({ href, children, variant = 'primary', showDisclaimer = true }: Props) {
  return (
    <div>
      <a
        href={href}
        target="_blank"
        rel="nofollow sponsored noopener noreferrer"
        className={/* tailwind classes */}
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

### 6.2 Affiliate Disclosure (Wajib Hukum FTC/EU)

Wajib tampil di:
- **Footer** setiap halaman (singkat, 1 kalimat)
- **Atas artikel** yang berisi affiliate link (box kecil)
- **Halaman dedicated** `/affiliate-disclosure` (penjelasan lengkap)

Teks standar:

> "This site contains affiliate links. If you book through our links, we may earn a small commission at no extra cost to you. This helps keep the guide free and updated. We only recommend places we'd genuinely recommend to a friend."

### 6.3 Email Capture

```ts
// app/api/subscribe/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { createServerClient } from '@/lib/supabase/server'

const subscribeSchema = z.object({
  email: z.string().email(),
  source: z.string().max(100).optional(),
  honeypot: z.string().max(0), // wajib kosong
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const data = subscribeSchema.parse(body)

    // Anti-spam: rate limit by IP (gunakan Vercel KV atau Supabase function)
    const ip = req.headers.get('x-forwarded-for') ?? 'unknown'

    const supabase = createServerClient()
    const { error } = await supabase
      .from('subscribers')
      .insert({ email: data.email, source: data.source, ip_address: ip })

    if (error?.code === '23505') { // unique violation
      return NextResponse.json({ ok: true }) // jangan reveal that email exists
    }
    if (error) throw error

    return NextResponse.json({ ok: true })
  } catch (e) {
    return NextResponse.json({ ok: false, error: 'Invalid request' }, { status: 400 })
  }
}
```

**Tidak wajib double opt-in** untuk MVP, tapi tambahkan link unsubscribe di setiap email yang dikirim (legally required di GDPR/CAN-SPAM).

---

## 7. Komponen Khusus untuk MDX

Komponen ini bisa langsung dipakai di file `.mdx` tanpa import:

```tsx
// components/mdx/index.ts → di-register di mdx-components.tsx

<InfoBox type="tip">
  Pro tip: Beli tiket bus malam untuk perjalanan lebih nyaman.
</InfoBox>

<InfoBox type="warning">
  Prices last verified May 2026. Always confirm directly with the operator.
</InfoBox>

<InfoBox type="note">
  This guide focuses on Batukaras. For Pangandaran town, see [our other guide](/guides/pangandaran-town).
</InfoBox>

<PriceTable items={[
  { item: "Bus Jakarta — Pangandaran", price: "Rp 150,000 – 250,000" },
  { item: "Ojek from terminal", price: "Rp 30,000" },
]} />

<AffiliateBox
  title="Book Accommodation in Batukaras"
  description="Find verified stays with WiFi speed data"
  ctaText="Search on Traveloka"
  ctaHref="traveloka:batukaras"  // shortcode → akan di-resolve oleh component
/>

<MapEmbed
  lat={-7.7167}
  lng={108.4833}
  zoom={13}
  label="Batukaras Beach"
/>
```

Setup MDX components:

```tsx
// mdx-components.tsx (root)
import type { MDXComponents } from 'mdx/types'
import { InfoBox, PriceTable, AffiliateBox, MapEmbed } from '@/components/mdx'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    InfoBox,
    PriceTable,
    AffiliateBox,
    MapEmbed,
    // Override default elements
    h2: (props) => <h2 className="font-display text-3xl mt-12 mb-4" {...props} />,
    h3: (props) => <h3 className="font-display text-2xl mt-8 mb-3" {...props} />,
    a: (props) => <a className="text-ocean underline hover:text-coral" {...props} />,
  }
}
```

---

## 8. Fase Pengembangan (Implementation Roadmap)

**Penting untuk AI agent:** Selesaikan task dalam urutan ini. Setiap task punya nomor untuk referensi commit.

### Phase 1 — MVP (Bulan 1–2)

**Goal:** Website online dengan konten yang bisa diindeks Google

**§8.1.1** Initialize Next.js 14 project dengan TypeScript strict + Tailwind + ESLint
**§8.1.2** Setup folder structure sesuai §2.2
**§8.1.3** Configure Tailwind dengan color palette + Google Fonts
**§8.1.4** Setup Supabase project + run migrations 001–004
**§8.1.5** Generate TypeScript types dari Supabase
**§8.1.6** Setup environment variables (`.env.local` + `.env.example`)
**§8.1.7** Create root layout dengan font loading
**§8.1.8** Implement Header + Footer + Nav components
**§8.1.9** Create Homepage (statis dulu, no live data)
**§8.1.10** Setup MDX content system dengan frontmatter validation (Zod)
**§8.1.11** Create `/guides` listing page
**§8.1.12** Create `/guides/[slug]` article page dengan TOC + Related
**§8.1.13** Implement metadata (SEO) generation per page
**§8.1.14** Implement sitemap.ts + robots.ts
**§8.1.15** Implement JSON-LD schema components
**§8.1.16** Write & publish 10 artikel pertama (priority: artikel #1, 6, 11, 16, 24)
**§8.1.17** Create `/about`, `/privacy`, `/affiliate-disclosure` pages
**§8.1.18** Deploy ke Vercel + connect domain
**§8.1.19** Submit ke Google Search Console
**§8.1.20** Verify Lighthouse > 90 di semua kategori

### Phase 2 — Interactive Tools (Bulan 3–4)

**Goal:** Fitur yang tidak bisa dicuri AI Overview

**§8.2.1** Implement Accommodation Filter Tool (UI + state)
**§8.2.2** Seed Supabase dengan minimal 25 accommodations
**§8.2.3** Implement Cafe & WiFi Directory page
**§8.2.4** Seed Supabase dengan minimal 15 cafes
**§8.2.5** Build "Report an Update" form + `/api/report-update` endpoint
**§8.2.6** Setup Resend integration
**§8.2.7** Build EmailCapture component + `/api/subscribe` endpoint
**§8.2.8** Sign up Traveloka + Agoda affiliate programs
**§8.2.9** Implement AffiliateButton + integrate ke akomodasi cards
**§8.2.10** Publish 10 artikel berikutnya (artikel #2-5, 7-10)
**§8.2.11** Setup Google Analytics 4

### Phase 3 — Monetisasi & Growth (Bulan 5–6)

**§8.3.1** Build Trip Cost Calculator
**§8.3.2** Sign up GetYourGuide + SafetyWing affiliate programs
**§8.3.3** Integrate GYG + SafetyWing affiliate links di calculator + relevant articles
**§8.3.4** Send first newsletter via Resend
**§8.3.5** Publish remaining articles (target: 30 total)
**§8.3.6** Migrate Maps embed dari Google ke Mapbox GL JS (cost optimization)
**§8.3.7** Performance audit + optimize Core Web Vitals

### Phase 4 — Scale (Bulan 7–12)

**§8.4.1** Integrate surf conditions API (Surf-Forecast atau Windy)
**§8.4.2** Implement basic user review system (5-star + comment, manually moderated)
**§8.4.3** Apply for Google AdSense (setelah traffic > 5,000/bulan)
**§8.4.4** Performance optimization round 2
**§8.4.5** A/B test homepage CTA placement
**§8.4.6** Publish 30 more articles (long-tail keywords)

---

## 9. Environment Variables

```bash
# .env.example (commit ini ke repo)

# Site
NEXT_PUBLIC_SITE_URL=https://yourdomain.com

# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=          # SERVER ONLY, never expose

# Email (Resend)
RESEND_API_KEY=                     # SERVER ONLY
RESEND_FROM_EMAIL=hello@yourdomain.com

# Maps
NEXT_PUBLIC_MAPBOX_TOKEN=           # Phase 3+
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=    # Phase 1–2

# Affiliate IDs
NEXT_PUBLIC_TRAVELOKA_AFFILIATE_ID=
NEXT_PUBLIC_AGODA_CID=
NEXT_PUBLIC_GYG_PARTNER_ID=
NEXT_PUBLIC_SAFETYWING_REF_ID=

# Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=
```

**`.env.local`** WAJIB di `.gitignore`. **Service role key** tidak boleh punya prefix `NEXT_PUBLIC_`.

---

## 10. Hal yang TIDAK Boleh Dilakukan

```
❌ Jangan buat static HTML — harus Next.js App Router
❌ Jangan hardcode data akomodasi/kafe — harus dari Supabase
❌ Jangan pakai font Arial/Inter/Roboto — sudah ditentukan
❌ Jangan affiliate link tanpa rel="nofollow sponsored"
❌ Jangan affiliate link tanpa target="_blank" + rel="noopener"
❌ Jangan halaman tanpa meta description
❌ Jangan <img> biasa — pakai Next.js <Image>
❌ Jangan client-side fetch untuk data yang bisa di-SSR
❌ Jangan deploy tanpa cek Lighthouse
❌ Jangan expose SUPABASE_SERVICE_ROLE_KEY ke client
❌ Jangan skip RLS di Supabase
❌ Jangan pakai `any` di TypeScript
❌ Jangan langsung implementasi tanpa baca PRD
❌ Jangan loncat fase
❌ Jangan publish artikel dengan kata trigger AI ("nestled in", "vibrant", "boasts")
❌ Jangan lupa affiliate disclosure
❌ Jangan ubah tech stack tanpa diskusi
```

---

## 11. Definition of Done (per Fitur)

Sebuah fitur dianggap selesai jika **SEMUA** kriteria ini terpenuhi:

- [ ] Berjalan tanpa error di production (Vercel)
- [ ] Mobile-responsive — tested di 375px, 768px, 1024px, 1440px
- [ ] Lighthouse score tidak turun di bawah 85 untuk halaman yang affected
- [ ] Tidak ada console error atau warning
- [ ] Tidak ada broken link (test dengan link checker)
- [ ] Data dari Supabase tampil benar atau ada fallback yang masuk akal
- [ ] TypeScript build pass tanpa error
- [ ] ESLint pass tanpa warning
- [ ] Accessibility: keyboard navigable, screen reader tested (basic)
- [ ] SEO: title, meta description, Open Graph image present
- [ ] Affiliate links (jika ada) punya `rel="nofollow sponsored"`
- [ ] Update CHANGELOG.md dengan summary perubahan

---

## 12. Testing Strategy

### 12.1 Yang Wajib Di-Test

**Phase 1:**
- MDX frontmatter validation — invalid frontmatter harus fail build
- Sitemap generation — semua artikel published harus muncul
- Schema validation untuk subscribe/report-update endpoints

**Phase 2+:**
- Accommodation filter logic — unit test untuk fungsi filter
- Affiliate URL builder — pastikan UTM params benar
- Cost calculator — test dengan known inputs/outputs

### 12.2 Yang TIDAK Perlu Di-Test (Untuk MVP)

- E2E browser tests (skip dulu, terlalu mahal untuk solo dev)
- Visual regression
- Storybook (skip kecuali tim besar)

### 12.3 Tools

- **Vitest** — unit tests
- **Playwright** — hanya kalau perlu E2E nanti (Phase 4+)

---

## 13. Error Handling Patterns

### 13.1 Server Components

```tsx
// app/places/accommodation/page.tsx
export default async function AccommodationPage() {
  try {
    const data = await getAccommodations()
    return <AccommodationFilter accommodations={data} />
  } catch (error) {
    console.error('Failed to fetch accommodations:', error)
    return <ErrorFallback message="Couldn't load accommodations. Please try again." />
  }
}
```

### 13.2 Route Handlers

```tsx
// app/api/subscribe/route.ts — selalu return JSON, never throw
try {
  // ...
} catch (e) {
  if (e instanceof z.ZodError) {
    return NextResponse.json({ ok: false, error: 'Invalid input' }, { status: 400 })
  }
  console.error('Subscribe error:', e)
  return NextResponse.json({ ok: false, error: 'Something went wrong' }, { status: 500 })
}
```

### 13.3 User-Facing Errors

- Jangan expose stack trace ke user
- Pakai pesan yang actionable: "Couldn't save your email — please try again or email us directly at hello@..."
- Tampilkan retry button kalau memungkinkan
- Log full error ke console (server-side) untuk debugging

---

## 14. Image & Asset Management

### 14.1 Sumber Gambar

**Boleh:**
- Foto orisinal (kunjungan lapangan)
- Unsplash / Pexels (cek license per gambar)
- Wikimedia Commons (cek license per gambar)
- Foto dari operator dengan izin tertulis (simpan email konfirmasi)

**Tidak boleh:**
- Google Image Search results (mostly copyrighted)
- AI-generated images sebagai featured photo (OK untuk dekorasi internal)
- Watermarked images
- Foto orang yang dapat diidentifikasi tanpa consent

### 14.2 Image Optimization

- Format: WebP (Next.js handles automatically)
- Featured images: 1200×630px (OG-optimal)
- Inline article images: max 1200px wide
- Compress sebelum upload (TinyPNG / Squoosh)
- Selalu pakai `<Image>` dengan `width` + `height` eksplisit (mencegah CLS)
- `alt` text deskriptif (untuk a11y dan SEO)

### 14.3 File Naming

```
/public/images/
├── guides/
│   └── jakarta-to-batukaras-bus.webp
├── places/
│   └── villa-monyet-pool.webp
└── og/
    └── default-og.webp
```

Format nama: `{topic}-{descriptor}.webp`. Lowercase, hyphen-separated.

---

## 15. Deployment Checklist (Pre-Launch)

Sebelum domain custom di-pointing:

- [ ] Lighthouse > 90 di semua kategori, di mobile dan desktop
- [ ] All metadata (title, description, OG) terisi di setiap halaman
- [ ] Sitemap accessible at `/sitemap.xml`
- [ ] `robots.txt` benar (disallow /api/)
- [ ] Affiliate disclosure di footer + halaman dedicated
- [ ] Privacy policy halaman terisi (boleh template, tapi customize untuk site ini)
- [ ] 404 page custom (`app/not-found.tsx`)
- [ ] Error boundary (`app/error.tsx`)
- [ ] Loading states (`app/loading.tsx`)
- [ ] Favicon + Apple touch icon + manifest.json
- [ ] Open Graph images render correct (test di [opengraph.xyz](https://opengraph.xyz))
- [ ] Test affiliate links — UTM params tracking benar
- [ ] Test email subscribe flow end-to-end
- [ ] Test "Report Update" form
- [ ] Browser test: Chrome, Safari, Firefox
- [ ] Mobile test: iOS Safari, Android Chrome
- [ ] Submit sitemap ke Google Search Console
- [ ] Submit ke Bing Webmaster Tools (small effort, free traffic)
- [ ] Setup uptime monitoring (UptimeRobot gratis)

---

## 16. Referensi & Resources

**Kompetitor (untuk dipelajari, bukan ditiru):**
- mypangandaran.com (kompetitor lokal Bahasa Indonesia)
- wikivoyage.org/wiki/Pangandaran (sumber data)
- nomadlist.com (referensi data-rich directory)

**Referensi desain:**
- thebolditalic.com (editorial vibe)
- nomadlist.com (data-rich directory pattern)
- thespacesbetween.com.au (travel blog yang otoritatif)

**Affiliate signup:**
- Traveloka: [traveloka.com/affiliate](https://traveloka.com/affiliate)
- Agoda: [agoda.com/affiliates](https://agoda.com/affiliates)
- GetYourGuide: [getyourguide.com/partner](https://getyourguide.com/partner)
- SafetyWing: [safetywing.com/affiliate](https://safetywing.com/affiliate)
- Booking.com: [booking.com/affiliate-program](https://booking.com/affiliate-program)

**Documentation:**
- Next.js App Router: [nextjs.org/docs/app](https://nextjs.org/docs/app)
- Supabase Next.js: [supabase.com/docs/guides/auth/server-side/nextjs](https://supabase.com/docs/guides/auth/server-side/nextjs)
- Schema.org Travel: [schema.org/docs/hotels.html](https://schema.org/docs/hotels.html)

---

## 17. Changelog

| Version | Date | Changes |
|---|---|---|
| 1.0 | Mei 2026 | Initial PRD |
| 1.1 | Mei 2026 | Tambah AI agent instructions, RLS policies, content style guide, testing strategy, error handling, image management, deployment checklist; convert ambiguous "or" jadi keputusan tegas; explicit non-goals |

---

## 18. Open Questions (Untuk Diisi Sebelum Phase 1)

- [ ] Domain final apa? (saran: include "guide" atau "nomad" untuk SEO clarity)
- [ ] Author name di artikel — pakai nama asli, pseudonym, atau brand-only?
- [ ] Logo desain — DIY atau commission?
- [ ] Brand voice: lebih ke "honest local friend" atau "expert guide"?
- [ ] Apakah akan ada validasi lapangan pertama sebelum Phase 1 launch, atau setelah?

---

*PRD ini adalah dokumen hidup. Update setiap kali ada perubahan keputusan produk.*
*Versi: 1.1 | Terakhir diperbarui: Mei 2026*