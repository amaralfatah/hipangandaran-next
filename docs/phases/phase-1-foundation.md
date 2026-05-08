# Phase 1 — Foundation

> **Goal:** Website jalan dengan homepage, sistem MDX, 5 artikel pilar, email capture. Tidak ada database directory dulu.

## Pre-requisites

- [ ] Domain `hipangandaran.com` sudah dibeli
- [ ] Vercel account ready
- [ ] Supabase project ready (untuk subscribers table saja di Phase 1)
- [ ] Resend account ready (kalau email capture confirmation diaktifkan)
- [ ] **Validasi lapangan: 5 artikel pilar wajib divalidasi langsung sebelum Phase 1 launch** (lihat §1.7)
- [ ] Baca `docs/architecture.md`, `docs/design-system.md`, `docs/content-guide.md`

## Tasks (urutan)

### §1.1 Setup proyek
- [ ] `npx create-next-app@latest` dengan App Router + TS + Tailwind
- [ ] Setup `tsconfig.json` strict + `noUncheckedIndexedAccess`
- [ ] Setup ESLint + Prettier
- [ ] Setup `.env.example` dengan semua env vars (lihat architecture.md)
- [ ] Initial commit

### §1.2 Design tokens & layout
- [ ] Setup colors di `tailwind.config.ts` (lihat design-system.md)
- [ ] Setup fonts (Playfair Display, Source Serif 4, JetBrains Mono)
- [ ] Bikin `app/layout.tsx` (root) + `app/(site)/layout.tsx`
- [ ] Bikin `components/layout/Header.tsx` + `Footer.tsx`
- [ ] **Logo: typography-only di Phase 1**. Format: "Hi Pangandaran" (Playfair Display, color ocean #1a6b8a) + tagline "your honest guide" (Source Serif 4, smaller, charcoal/60%). JANGAN commission designer di Phase 1 — tunda ke Phase 3+.
- [ ] Test mobile-first responsive

### §1.3 UI components dasar
- [ ] `Button.tsx` (4 variants)
- [ ] `Card.tsx`
- [ ] `Badge.tsx`
- [ ] `InfoBox.tsx` (untuk MDX)
- [ ] `EmailCapture.tsx` (with honeypot)

### §1.4 MDX system
- [ ] Setup `@next/mdx` atau `next-mdx-remote`
- [ ] `lib/mdx.ts` — loader + Zod validator (lihat content-guide.md)
- [ ] `components/mdx/index.ts` — register komponen
- [ ] Test: artikel dummy harus render

### §1.5 Homepage (`app/(site)/page.tsx`)

Sections (urutan):

1. **Hero** — "Your Honest Guide to Pangandaran & Batukaras" + sub + 2 CTA
2. **Quick Navigation** (4 cards 2x2 mobile): Surf Guide, Find Accommodation, Getting Here, Cost Calculator
3. **Latest Guides** — 3 artikel terbaru dari MDX frontmatter
4. **Featured Tool teaser** (Phase 2 placeholder, atau hide sementara)
5. **Email capture**
6. **Footer**

**CTA copy untuk Phase 1:** "Cost Calculator" link ke `/tools/cost-calculator` boleh sementara redirect ke "Coming Soon" page atau hide.

### §1.6 Artikel pages
- [ ] `app/(site)/guides/page.tsx` — daftar semua artikel (sortir by publishedAt desc)
- [ ] `app/(site)/guides/[slug]/page.tsx` — load MDX, generate metadata, render TOC
- [ ] `components/TableOfContents.tsx` — auto-generated dari h2/h3
- [ ] `generateStaticParams` untuk semua artikel
- [ ] `generateMetadata` lengkap (OG, Twitter, canonical)

### §1.7 5 Artikel Pilar (Phase 1)

Tulis dan publish (lihat full list di `reference/article-list.md`):

1. How to Get from Jakarta to Batukaras (All Options)
2. Green Canyon Body Rafting: The Complete Guide
3. Surfing in Batukaras: Honest Beginner's Guide
4. Batukaras vs Pangandaran: Where Should You Stay?
5. Pangandaran 3-Day Itinerary for First-Timers

**Aturan:** semua 5 artikel wajib menyebut Batu Karas atau Green Canyon di title/opening.

**Validasi lapangan WAJIB sebelum publish (untuk semua 5 pilar):**
- [ ] Harga aktivitas/transport dicek dalam 30 hari terakhir
- [ ] WiFi speed (kalau disebut) diukur sendiri pakai fast.com, bukan claim operator
- [ ] Foto featured adalah foto sendiri ATAU lisensi clear (Unsplash/Pexels/Wikimedia, cek per gambar)
- [ ] Direction & transport cost confirmed dari pengalaman langsung
- [ ] Minimal 1 specific anecdote yang tidak bisa di-Google
- [ ] Tanggal verifikasi eksplisit di akhir artikel ("Prices verified May 2026")

### §1.8 SEO Essentials
- [ ] `app/sitemap.ts` — semua artikel + halaman utama
- [ ] `app/robots.ts` — allow `/`, disallow `/api/`
- [ ] `app/not-found.tsx` — 404 custom
- [ ] `app/error.tsx` — error boundary
- [ ] `app/loading.tsx` — loading state
- [ ] Favicon + Apple touch icon + manifest.json
- [ ] Open Graph default image di `/public/og/default-og.webp`

### §1.9 Email Capture
- [ ] Supabase: bikin tabel `subscribers` + RLS (lihat database-schema.sql)
- [ ] `app/api/subscribe/route.ts` dengan Zod + honeypot
- [ ] Test end-to-end dari homepage

### §1.10 Halaman wajib hukum
- [ ] `/about`
- [ ] `/privacy` (template, customize)
- [ ] `/affiliate-disclosure`

### §1.11 Deploy
- [ ] Push ke Vercel
- [ ] Setup custom domain `hipangandaran.com`
- [ ] Test Lighthouse > 90 di mobile + desktop
- [ ] Submit sitemap ke Google Search Console
- [ ] Submit ke Bing Webmaster Tools

## Definition of Done — Phase 1

Phase 1 dianggap selesai kalau **SEMUA** ini terpenuhi:

- [ ] Website live di `hipangandaran.com`
- [ ] 5 artikel pilar published & rendering correct
- [ ] Homepage Lighthouse > 90 semua kategori (mobile + desktop)
- [ ] Mobile responsive di 375/768/1024/1440
- [ ] Tidak ada console error/warning
- [ ] Tidak ada broken link
- [ ] TypeScript build pass tanpa error
- [ ] ESLint pass tanpa warning
- [ ] Email capture flow tested end-to-end
- [ ] All metadata (title, description, OG) terisi
- [ ] Affiliate disclosure di footer + halaman dedicated
- [ ] 404 + error + loading state tested
- [ ] Sitemap accessible at `/sitemap.xml`
- [ ] Update CHANGELOG.md
