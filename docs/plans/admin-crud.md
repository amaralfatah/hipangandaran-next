# Admin Panel — Full CRUD Implementation Plan

> **Untuk Claude Code:** Baca file ini di awal session baru untuk melanjutkan implementasi CRUD admin panel.
> Baca juga `docs/architecture.md` dan `CLAUDE.md` untuk context project.

---

## Status

- [x] Admin panel read-only sudah live (`app/admin/dashboard/`)
- [x] Vercel Analytics terpasang
- [x] Auth via Supabase (middleware + login page)
- [ ] **Routing refactor: `/admin/dashboard/*` → `/admin/*`**
- [ ] **CRUD belum diimplementasi — ini yang perlu dikerjakan**

---

## Context

Admin panel saat ini hanya menampilkan data (read-only). Perlu full CRUD untuk:
- **Accommodations** — tambah/edit/hapus listing akomodasi di Supabase
- **Cafes** — tambah/edit/hapus listing kafe di Supabase
- **Articles (MDX)** — create/edit/delete file `.mdx` di filesystem **(local dev only)**
- **Subscribers** — soft-delete (set `unsubscribed_at = now()`)

---

## Routing yang Diinginkan

Semua sub-halaman admin langsung di `/admin/*`, bukan `/admin/dashboard/*`:

| URL Lama | URL Baru |
|---|---|
| `/admin/dashboard` | `/admin/dashboard` (tetap — halaman overview) |
| `/admin/dashboard/place-updates` | `/admin/place-updates` |
| `/admin/dashboard/subscribers` | `/admin/subscribers` |
| `/admin/dashboard/articles` | `/admin/articles` |
| *(baru)* | `/admin/accommodations` |
| *(baru)* | `/admin/cafes` |

### Struktur folder setelah refactor

```
app/admin/
├── login/page.tsx                   → /admin/login (tanpa sidebar)
└── (protected)/                     ← route group, tidak menambah URL prefix
    ├── layout.tsx                   ← sidebar (dipindah dari dashboard/layout.tsx)
    ├── dashboard/page.tsx           → /admin/dashboard (overview)
    ├── place-updates/page.tsx       → /admin/place-updates
    ├── subscribers/page.tsx         → /admin/subscribers
    ├── articles/
    │   ├── page.tsx                 → /admin/articles
    │   └── [slug]/page.tsx          → /admin/articles/[slug]
    ├── accommodations/
    │   ├── page.tsx                 → /admin/accommodations
    │   └── [id]/page.tsx            → /admin/accommodations/[id]
    └── cafes/
        ├── page.tsx                 → /admin/cafes
        └── [id]/page.tsx            → /admin/cafes/[id]
```

Route group `(protected)` menjaga sidebar layout tidak berlaku di login page.

### File yang dipindah (bukan dibuat baru)

| Dari | Ke |
|---|---|
| `app/admin/dashboard/layout.tsx` | `app/admin/(protected)/layout.tsx` |
| `app/admin/dashboard/page.tsx` | `app/admin/(protected)/dashboard/page.tsx` |
| `app/admin/dashboard/place-updates/page.tsx` | `app/admin/(protected)/place-updates/page.tsx` |
| `app/admin/dashboard/subscribers/page.tsx` | `app/admin/(protected)/subscribers/page.tsx` |
| `app/admin/dashboard/articles/page.tsx` | `app/admin/(protected)/articles/page.tsx` |

---

## Pola Yang Harus Diikuti (Sudah Ada di Codebase)

| Layer | Pattern | Contoh |
|---|---|---|
| **List page** | Server Component + `supabaseAdmin` | `app/admin/(protected)/place-updates/page.tsx` |
| **Action buttons** | Client Component + `useRouter().refresh()` | `components/admin/PlaceUpdateActions.tsx` |
| **API routes** | Zod validate + auth check + supabaseAdmin | `app/api/admin/update-status/route.ts` |
| **Slug** | `slugify()` dari `lib/utils.ts` | — |
| **DB types** | `types/database.ts` — accommodations, cafes, subscribers, place_updates | — |

**Auth pattern di API routes** (wajib semua endpoint):
```ts
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

const cookieStore = await cookies()
const supabase = createServerClient(url, anonKey, {
  cookies: { getAll: () => cookieStore.getAll(), setAll: () => {} }
})
const { data: { user } } = await supabase.auth.getUser()
if (!user) return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 })
```

---

## File Yang Perlu Dibuat

### Components
```
components/admin/
├── DeleteButton.tsx          ← reusable confirm-before-delete (2 klik: "Delete" → "Confirm?")
├── AccommodationForm.tsx     ← create & edit form (client component)
├── CafeForm.tsx              ← create & edit form (client component)
└── ArticleForm.tsx           ← frontmatter fields + MDX content textarea
```

### Pages (semua di dalam `app/admin/(protected)/`)
```
app/admin/(protected)/
├── accommodations/
│   ├── page.tsx              ← /admin/accommodations (list + "+ Add")
│   └── [id]/page.tsx         ← /admin/accommodations/[id] (create jika id="new", edit jika UUID)
├── cafes/
│   ├── page.tsx              ← /admin/cafes
│   └── [id]/page.tsx         ← /admin/cafes/[id]
└── articles/
    └── [slug]/page.tsx       ← /admin/articles/[slug] (create jika slug="new")
```

### API Routes
```
app/api/admin/
├── accommodations/route.ts   ← POST (create), PUT (update), DELETE
├── cafes/route.ts            ← POST, PUT, DELETE
├── articles/route.ts         ← POST (tulis file), PUT (overwrite), DELETE (unlink)
└── subscribers/route.ts      ← POST → set unsubscribed_at = now()
```

---

## File Yang Perlu Diupdate

| File | Perubahan |
|---|---|
| `components/admin/AdminNav.tsx` | Update semua href ke `/admin/*` (tanpa `/dashboard`), tambah Accommodations & Cafes |
| `app/admin/(protected)/articles/page.tsx` | Tambah: "+ New Article" button + Edit/Delete per baris |
| `app/admin/(protected)/subscribers/page.tsx` | Tambah: "Unsubscribe" button per baris |

---

## Detail: DeleteButton

```tsx
// components/admin/DeleteButton.tsx — 'use client'
// Props: onDelete: () => Promise<void>, label?: string
// State: idle → confirm → loading
// idle:    [Delete]
// confirm: [Cancel] [Confirm delete?]  (5 detik auto-reset ke idle)
// loading: [Deleting…]
```

---

## Detail: AccommodationForm Fields

```
name          text, required
slug          text, required, auto-fill dari name (pakai slugify)
type          select: homestay | villa | surf_camp | guesthouse
location_area select: batu_karas | pangandaran_beach | cijulang | karapyak | madasari | batu_hiu | parigi
location_zone select: core | extended
price_min_usd number, required
price_max_usd number, required
wifi_speed_mbps number, optional
has_desk      checkbox
has_pool      checkbox
distance_to_beach_m number, required
google_maps_url text, optional
booking_affiliate_url text, optional
description   textarea, optional
verified_at   date, optional
```

Submit ke:
- Create: `POST /api/admin/accommodations`
- Edit: `PUT /api/admin/accommodations`

---

## Detail: CafeForm Fields

```
name          text, required
slug          text, required, auto-fill dari name
location_area select (sama seperti accommodation)
wifi_speed_mbps number, optional
power_outlets checkbox
opens_at      time (HH:MM), optional
closes_at     time (HH:MM), optional
price_range   select: budget | mid | upscale, optional
instagram_url text, optional
google_maps_url text, optional
latitude      number, optional
longitude     number, optional
last_verified_at date, optional
```

---

## Detail: ArticleForm Fields

```
title         text, required (10-100 chars)
description   textarea, required (50-160 chars)
category      select: transport | accommodation | activities | food | nomad | planning
author        text, required
publishedAt   date, required (format YYYY-MM-DD)
updatedAt     date, required (format YYYY-MM-DD)
readingTime   number, required
featuredImage text, required (starts with /)
featuredImageAlt text, required (10+ chars)
affiliateDisclosure checkbox
content       textarea (raw MDX), required
```

**Warning banner wajib tampil:**
> ⚠️ Article edits write to the local filesystem. This only works in local dev — changes will not persist on Vercel production.

**API filesystem ops:**
```ts
import { writeFile, unlink } from 'fs/promises'
import path from 'path'

const filePath = path.join(process.cwd(), 'content', 'guides', `${slug}.mdx`)

// Create/Update: tulis frontmatter + content ke file
// Delete: fs.unlink(filePath)
```

---

## Detail: Subscribers Delete

Di `app/admin/(protected)/subscribers/page.tsx` tambah kolom Actions.
API `POST /api/admin/subscribers`:
```ts
await supabaseAdmin
  .from('subscribers')
  .update({ unsubscribed_at: new Date().toISOString() })
  .eq('id', id)
```

---

## Verifikasi Setelah Implementasi

1. **Accommodations:** Create → muncul di list → Edit → tersimpan → Delete → hilang
2. **Cafes:** Sama seperti di atas
3. **Articles:** `npm run dev` → Create artikel → file `.mdx` muncul di `content/guides/` → Edit → isi berubah → Delete → file terhapus
4. **Subscribers:** Klik Unsubscribe → badge berubah ke "unsubscribed" setelah refresh
5. **Auth guard:** Semua API routes return 401 jika tanpa session (test dengan curl tanpa cookie)
6. **TypeScript:** `npx tsc --noEmit` pass tanpa error
