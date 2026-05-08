# Content Guide

## Voice & Tone (FINAL — locked)

Brand voice: **"Honest local friend"** — definitif, tidak ambigu.

**Operationalisasi:**
- Pakai **second person**: "you'll find that...", BUKAN "we recommend"
- **Casual contractions** OK dan disarankan: "you'll", "won't", "I've", "it's"
- **Personal anecdote** wajib di setiap artikel: "When I first tried Citumang, the boatman..."
- **Honest negatives** diperbolehkan dan didorong: "Pangandaran beach itself is meh — the real magic is at Batu Karas"
- **Specific over general:** "Rp 35,000" bukan "affordable"; "20 Mbps" bukan "fast WiFi"
- **First-person occasional** OK kalau menyampaikan pengalaman: "I've been here 14 months, and..."

## Author Identity (PENTING)

- Pakai **nama asli atau first-name minimum** di frontmatter `author` field
- Setup `/about` page dengan foto + 2-3 paragraf cerita Anda di Pangandaran
- Ini multiplier kepercayaan untuk Google E-E-A-T dan audience asing

**JANGAN:**
- ❌ "Site Author" / "Editor Team" — terdengar SEO farm
- ❌ Pseudonym yang terdengar Indonesia tapi fake ("Bayu Sunset", "Andi Nomad", dll)
- ❌ Anonim — rusak trust foundation

## RED FLAGS — Jangan Dipakai (AI-Generated Tells)

❌ "In conclusion", "It's important to note", "Without a doubt"
❌ "Nestled in", "boasts", "vibrant", "bustling", "hidden gem"
❌ Bullet point storms tanpa paragraf konektor
❌ Setiap paragraf dimulai dengan kalimat topik yang kaku
❌ "Whether you're a [X] or [Y], this guide..." opener

## Wajib Ada di Setiap Artikel

- Tanggal verifikasi harga eksplisit ("Prices verified May 2026")
- Minimal satu **specific anecdote/observation** yang tidak bisa di-Google
- Disclaimer untuk hal yang berubah cepat (jadwal kapal, harga BBM, dll)
- Section "What this guide doesn't cover" jika relevan

## MDX Frontmatter (Wajib — divalidasi Zod)

```yaml
---
title: "How to Get from Jakarta to Batukaras (2026 Complete Guide)"
description: "Step-by-step transport guide including train, bus, and shuttle options with current prices"
publishedAt: "2026-05-15"
updatedAt: "2026-05-15"
category: "transport"
readingTime: 8
featuredImage: "/images/guides/jakarta-to-batukaras.jpg"
featuredImageAlt: "View from window of bus winding along Pangandaran coastal road"
affiliateDisclosure: true
author: "Andi"  # nama asli atau first-name. JANGAN "Site Author"
---
```

### Validation Schema

```ts
// lib/mdx.ts
import { z } from 'zod'

export const guideFrontmatterSchema = z.object({
  title: z.string().min(10).max(100),
  description: z.string().min(50).max(160),
  publishedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  updatedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  category: z.enum(['transport', 'accommodation', 'activities', 'food', 'nomad', 'planning']),
  readingTime: z.number().int().positive(),
  featuredImage: z.string().startsWith('/'),
  featuredImageAlt: z.string().min(10),
  affiliateDisclosure: z.boolean(),
  author: z.string().min(2),  // wajib, no default — paksa author tulis nama
})

export type GuideFrontmatter = z.infer<typeof guideFrontmatterSchema>
```

**Build harus FAIL kalau ada artikel dengan frontmatter invalid.**

## Article Layout

```
- Breadcrumb: Home > Guides > [Category] > [Judul]
- H1 Title + meta (reading time, last updated)
- Affiliate disclosure box (jika true) — DI ATAS konten
- Featured image (Next.js Image, priority={true})
- Table of Contents (auto dari h2/h3) — sticky desktop, collapsible mobile
- Konten MDX (komponen di /components/mdx/)
- Info box di akhir: "Prices verified [bulan tahun] — Help us update [link]"
- Affiliate CTA box (jika kategori accommodation/activities)
- Related articles (3 same-category, exclude current)
- Email capture
```

## Image Sources

**Boleh:**
- Foto orisinal (kunjungan lapangan)
- Unsplash / Pexels (cek license per gambar)
- Wikimedia Commons (cek license)
- Foto dari operator dengan izin tertulis (simpan email konfirmasi)

**Tidak boleh:**
- Google Image Search results (mostly copyrighted)
- AI-generated sebagai featured photo (OK untuk dekorasi internal)
- Watermarked images
- Foto orang yang dapat diidentifikasi tanpa consent

## Image Specs

- Format: WebP (Next.js handles)
- Featured: 1200×630px (OG-optimal)
- Inline: max 1200px wide
- Compress sebelum upload (TinyPNG / Squoosh)
- Selalu `<Image>` dengan `width`+`height` eksplisit (mencegah CLS)
- `alt` text deskriptif

### File Naming

```
/public/images/
├── guides/
│   └── jakarta-to-batukaras-bus.webp
├── places/
│   └── villa-monyet-pool.webp
└── og/
    └── default-og.webp
```

Format: `{topic}-{descriptor}.webp`. Lowercase, hyphen-separated.

## Content Priority Rule (Penting)

Karena prioritas brand adalah **Batu Karas + Green Canyon**, dengan coverage Tier 2/3 (Citumang, Karapyak, Madasari, dll):

**Aturan SEO/branding:**
1. Artikel pilar (cornerstone) wajib menyebut Batu Karas atau Green Canyon di title atau opening
2. Artikel Tier 2/3 ditulis sebagai *expansion content* yang link balik ke pilar
3. Contoh: artikel "Karapyak Beach Guide" wajib punya section *"How to combine with Batu Karas"*

Ini bukan formalitas — ini link equity yang signal ke Google bahwa Batu Karas adalah hub utama.

## Affiliate Disclosure (Wajib Hukum)

Wajib tampil di:
- **Footer** setiap halaman (1 kalimat)
- **Atas artikel** dengan affiliate link (box kecil)
- **Halaman dedicated** `/affiliate-disclosure` (penjelasan lengkap)

Teks standar:

> "This site contains affiliate links. If you book through our links, we may earn a small commission at no extra cost to you. This helps keep the guide free and updated. We only recommend places we'd genuinely recommend to a friend."
