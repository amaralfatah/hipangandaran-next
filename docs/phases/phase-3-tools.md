# Phase 3 — Tools

> **Goal:** Cost calculator + email-gated content (save estimate via email).

## Pre-requisites

- [ ] Phase 2 selesai
- [ ] Data konstanta (transport, akomodasi, food cost) sudah verified
- [ ] **(Optional) Logo commission trigger:** Kalau sudah 30+ artikel published & 100+ email subscribers, ini momen tepat commission designer ($300-800 di 99designs/Dribbble) yang ngerti travel/coastal aesthetic. Kalau belum, lanjut pakai typography-only logo dari Phase 1.

## Tasks

### §3.1 Cost Calculator (`/tools/cost-calculator`)

**Input form:**
- Number of travelers: radio [1, 2, 3, 4+]
- Duration: radio [3, 5, 7, 14, custom days]
- Budget style: radio [Budget 🎒, Mid-range 🏨, Comfort 🛋️]
- Origin city: dropdown [Jakarta, Bandung, Yogyakarta, Surabaya, Other]
- Activities: checkboxes [Surfing lesson, Green Canyon, Citumang, Boat trip]

**Output:**

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

**Logika kalkulasi:** Hardcode di `/lib/calculator-data.ts`. Update manual setiap 3–6 bulan. Tampilkan "Last updated: [bulan tahun]" di bagian bawah.

```ts
// lib/calculator-data.ts
export const CALCULATOR_DATA = {
  lastUpdated: '2026-05',
  exchangeRate: 16000,
  transport: {
    jakarta: { budget: 150_000, mid: 250_000, comfort: 450_000 },
    bandung: { budget: 100_000, mid: 180_000, comfort: 350_000 },
    yogyakarta: { budget: 120_000, mid: 220_000, comfort: 400_000 },
    surabaya: { budget: 200_000, mid: 350_000, comfort: 600_000 },
  },
  accommodation: {
    budget: { min: 100_000, max: 250_000 },
    mid: { min: 250_000, max: 600_000 },
    comfort: { min: 600_000, max: 1_500_000 },
  },
  food: { budget: 90_000, mid: 200_000, comfort: 400_000 },
  activities: {
    surfing_lesson: 350_000,
    green_canyon: 250_000,
    citumang: 150_000,
    boat_trip: 200_000,
  },
} as const
```

### §3.2 "Save Estimate" Email Capture

- Form: email field
- Submit → `/api/subscribe` dengan `source: 'calculator'`
- Success state: "We'll send you a copy of your estimate plus our weekly Pangandaran tips"

### §3.3 Schema markup: TouristTrip

Tambah schema.org markup untuk halaman cost calculator (`Tool` atau `WebApplication`).

### §3.4 Tambahan artikel (Phase 3 batch — 10 artikel)

Lihat `reference/article-list.md`. Priority:
- Cost of Living in Batukaras: Real Monthly Budget
- Best Time to Visit Pangandaran (Month by Month)
- Pangandaran 3-Day Itinerary for First-Timers (sudah Phase 1, update kalau perlu)
- Batukaras 1-Week Itinerary for Digital Nomads
- Pangandaran vs Bali: An Honest Comparison
- Travel Insurance for Indonesia: What Nomads Actually Buy
- Pangandaran on a Budget: 7-Day Under $300 Guide
- Best Surf Breaks in Batukaras (With Conditions Calendar)
- Day Trip from Batukaras: 5 Options Worth Doing
- Cagar Alam Pananjung: Hiking the Pangandaran Nature Reserve

## Definition of Done — Phase 3

- [ ] Calculator working dengan semua input combinations
- [ ] Unit test untuk fungsi kalkulasi (Vitest, known input/output)
- [ ] "Save estimate" email capture working
- [ ] Phase 1+2 DoD masih semua ✅
- [ ] 25 artikel total
- [ ] Lighthouse > 90 di halaman calculator
- [ ] Update CHANGELOG.md
