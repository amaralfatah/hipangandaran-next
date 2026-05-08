# Architecture

## Tech Stack Detail

| Komponen | Pilihan | Alasan |
|---|---|---|
| Framework | Next.js 14+ (App Router, TypeScript) | SSR/SSG, SEO-friendly |
| Styling | Tailwind CSS | Utility-first |
| Language | TypeScript strict mode | Type safety wajib |
| Database | Supabase (PostgreSQL) | Free tier generous, RLS built-in |
| CMS | MDX files di `/content` | Git-versioned, no DB cost |
| Hosting | Vercel (Hobby tier) | Best Next.js DX |
| Email | Resend | Simpler than Mailchimp |
| Maps | Google Maps Embed API (Phase 1–2), Mapbox (Phase 3+) | Hemat di awal |
| Analytics | Vercel Analytics + Google Search Console | Privacy-friendly |
| Forms | React Hook Form + Zod | Validation type-safe |

## Folder Structure

```
/
├── app/
│   ├── (site)/
│   │   ├── layout.tsx                  # Header + Footer wrapper
│   │   ├── page.tsx                    # Homepage
│   │   ├── guides/
│   │   │   ├── page.tsx                # Daftar artikel
│   │   │   └── [slug]/page.tsx         # Artikel individual (MDX)
│   │   ├── places/
│   │   │   ├── page.tsx                # Index direktori
│   │   │   ├── accommodation/page.tsx  # Filter (Phase 2)
│   │   │   ├── cafes/page.tsx          # Direktori kafe (Phase 2)
│   │   │   └── [slug]/page.tsx         # Detail tempat
│   │   ├── tools/
│   │   │   ├── cost-calculator/page.tsx # Phase 3
│   │   │   └── surf-conditions/page.tsx # Phase 4
│   │   ├── about/page.tsx
│   │   ├── privacy/page.tsx
│   │   └── affiliate-disclosure/page.tsx
│   ├── api/
│   │   ├── subscribe/route.ts
│   │   └── report-update/route.ts
│   ├── sitemap.ts
│   ├── robots.ts
│   └── layout.tsx                      # Root layout (fonts, metadata)
├── content/
│   └── guides/                         # File .mdx artikel
├── components/
│   ├── ui/                             # Button, Card, Badge, dll
│   ├── tools/                          # Komponen tool interaktif
│   ├── mdx/                            # Komponen di .mdx
│   └── layout/                         # Header, Footer, Nav
├── lib/
│   ├── supabase/
│   │   ├── client.ts
│   │   └── server.ts
│   ├── affiliate.ts
│   ├── calculator-data.ts
│   ├── mdx.ts
│   └── utils.ts
├── types/
│   ├── database.ts                     # Generated dari Supabase CLI
│   └── content.ts
└── public/
    └── images/
```

## TypeScript Config

`tsconfig.json` wajib pakai:

```json
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true
  }
}
```

**Aturan:**
- Jangan pakai `any` — pakai `unknown` lalu narrow dengan type guard
- Build harus pass tanpa error sebelum commit
- ESLint pass tanpa warning

## Geographic Scope (Penting untuk Database & Content)

Wilayah yang dicakup, urutan prioritas:

**Tier 1 — Core (80% effort):**
- Batu Karas
- Green Canyon (Cukang Taneuh)
- Pangandaran Beach (East & West)

**Tier 2 — Extended (15% effort):**
- Citumang
- Karapyak
- Madasari
- Cagar Alam Pananjung (Nature Reserve)
- Batu Hiu

**Tier 3 — Pinggiran (5% effort):**
- Santirah
- Jojogan
- Cijulang area lainnya

**Aturan konten:** Artikel pilar (cornerstone) wajib menyebut Batu Karas atau Green Canyon di title atau opening. Tempat Tier 2/3 ditulis sebagai *expansion content* yang link balik ke pilar.

## Environment Variables

```
# Public (boleh client-side)
NEXT_PUBLIC_SITE_URL=https://hipangandaran.com
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
NEXT_PUBLIC_TRAVELOKA_AFFILIATE_ID=
NEXT_PUBLIC_AGODA_CID=
NEXT_PUBLIC_GYG_PARTNER_ID=
NEXT_PUBLIC_SAFETYWING_REF_ID=

# Server-only (JANGAN expose ke client)
SUPABASE_SERVICE_ROLE_KEY=
RESEND_API_KEY=
```

## Error Handling Pattern

### Server Components

```tsx
export default async function Page() {
  try {
    const data = await getData()
    return <Component data={data} />
  } catch (error) {
    console.error('Failed to fetch:', error)
    return <ErrorFallback message="Couldn't load. Please try again." />
  }
}
```

### Route Handlers

```tsx
try {
  // ...
} catch (e) {
  if (e instanceof z.ZodError) {
    return NextResponse.json({ ok: false, error: 'Invalid input' }, { status: 400 })
  }
  console.error('Error:', e)
  return NextResponse.json({ ok: false, error: 'Something went wrong' }, { status: 500 })
}
```

### User-Facing

- Jangan expose stack trace
- Pesan actionable: "Couldn't save your email — please try again or email us at hello@hipangandaran.com"
- Retry button kalau memungkinkan
- Log full error server-side untuk debugging
