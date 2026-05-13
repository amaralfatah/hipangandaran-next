# Design System

## Prinsip Desain

- **Tone visual:** Editorial, organic, coastal — seperti panduan dari teman lokal
- **Bukan** desain OTA generik (Booking.com, Traveloka)
- **Mobile-first** — mayoritas user akses dari HP
- **Fast** — Lighthouse > 90 di semua kategori
- **Trust signals** — selalu tampilkan tanggal verifikasi data

## Color Palette

```css
:root {
  /* Brand */
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

Setup di [app/globals.css](../app/globals.css) (Tailwind v4 — pakai `@theme`, bukan `tailwind.config.ts`):

```css
@theme {
  --color-ocean: #1a6b8a;
  --color-sand: #f5e6c8;
  --color-coral: #e8624a;
  --color-forest: #2d5a3d;
  --color-cream: #faf8f3;
  --color-charcoal: #1c1c1e;
  /* ...success, warning, error, wifi-* */
}
```

### Mapping ke shadcn semantic tokens

shadcn/ui pakai semantic vars (`--primary`, `--accent`, dst.). Brand vars di-alias ke sini di `:root` + `@theme inline` block (lihat [app/globals.css](../app/globals.css)):

| shadcn var | Brand var | Dipakai untuk |
|---|---|---|
| `--background` / `--card` / `--popover` | `cream` | Surface utama |
| `--foreground` / `--card-foreground` | `charcoal` | Text utama |
| `--primary` / `--ring` | `ocean` | Primary actions, focus ring |
| `--secondary` | `sand` | Subtle background, secondary buttons |
| `--accent` | `coral` | Highlight, CTA aksen |
| `--destructive` | `error` (#c1432a) | Error state, destructive button |
| `--muted` | `sand` faded ke `cream` (color-mix) | Muted backgrounds |
| `--muted-foreground` | `charcoal/65` (color-mix) | Secondary text |

`forest` (success) tidak punya semantic equivalent di shadcn — pakai utility langsung (`bg-forest`, `text-forest`).

## Typography

```ts
// app/layout.tsx
import { Playfair_Display, Source_Serif_4, JetBrains_Mono } from 'next/font/google'

const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-display' })
const sourceSerif = Source_Serif_4({ subsets: ['latin'], variable: '--font-body' })
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' })
```

| Use case | Font |
|---|---|
| Headings (h1–h3) | Playfair Display (serif, editorial) |
| Body text | Source Serif 4 (serif, readable) |
| Numbers, prices, WiFi speeds | JetBrains Mono (monospace) |

**JANGAN pakai:** Arial, Inter, Roboto, atau sans-serif generik.

### Date & number formatting

Helper terpusat di [lib/utils.ts](../lib/utils.ts):

| Helper | Output | Pakai untuk |
|---|---|---|
| `formatArticleDate('2026-05-10')` | `10 May 2026` | Tanggal publikasi artikel (Latest Guides, Guides List) |
| `formatVerificationDate('2026-05-10')` | `May 2026` | Verifikasi data places (cafe, accommodation, footer) |

Angka & harga pakai font mono dengan `tabular-nums`:

```tsx
<span className="font-[family-name:var(--font-mono)] tabular-nums">
  {formatRp(amount)}
</span>
```

## Component System

Project pakai **shadcn/ui** (di atas Radix primitives) sebagai foundation untuk komponen interaktif/styling, dipadukan dengan komponen custom untuk yang punya logic brand-specific.

### Folder layout

```
components/ui/
├── shadcn/              ← shadcn/ui components (lowercase)
│   ├── button.tsx       cva: primary/coral/secondary/ghost/outline, semua rounded-full
│   ├── card.tsx         brand styling + asChild slot
│   ├── badge.tsx        variants verified/surf/nomad/cafe/warning
│   ├── dialog.tsx       brand styling, mobile-friendly via custom className
│   ├── select.tsx       rounded-full trigger, brand colors
│   ├── form.tsx         react-hook-form integration
│   ├── input.tsx | label.tsx | textarea.tsx
├── Button.tsx           ← bridge re-export dari ./shadcn/button (sementara)
├── Card.tsx             ← bridge re-export
├── Badge.tsx            ← bridge re-export
├── AffiliateButton.tsx  ← custom (tipis: wraps <Button asChild> + URL builder + UTM + rel)
├── EmailCapture.tsx     ← custom (honeypot + API call)
├── InfoBox.tsx          ← custom (untuk MDX)
└── (TableOfContents.tsx di components/, bukan ui/)
```

Konfigurasi shadcn di [components.json](../components.json). Tambah komponen baru: `npx shadcn@latest add <name>`.

### Komponen wajib

**Dari shadcn (customized):**

| Komponen | Variants / Props |
|---|---|
| `Button` | Variants: `primary` (ocean, default), `coral`, `secondary` (transparent + border), `ghost`, `outline`. Sizes: `sm` (h-9), `md` (h-11, default), `lg` (h-12), `icon` (size-10), `icon-sm` (size-9). **Semua `rounded-full`** — tidak ada `rounded-md` lagi. Base sudah include `cursor-pointer` + `active:scale-[0.98]` + `disabled:cursor-not-allowed` |
| `Card` + `CardHeader/Title/Description/Content/Footer` | brand-styled (rounded-2xl, bg-cream, shadow). Support `asChild` untuk semantic HTML (`<Card asChild><article>...</article></Card>`) |
| `Badge` | `default`, `verified` (forest), `surf` (ocean), `nomad` (coral), `cafe` (warning amber), `warning` (brand tints) |
| `Dialog` + `DialogContent/Header/Title/Description/Footer` | Pakai untuk modal (e.g. UpdateForm). Mobile-friendly: pass `className="top-auto bottom-0 translate-y-0 rounded-t-3xl rounded-b-none sm:top-1/2 sm:translate-y-[-50%] sm:rounded-3xl"` untuk bottom-sheet di mobile |
| `Select` + `SelectTrigger/Content/Item/Value` | Pakai untuk filter dropdown. Default rounded-full trigger h-11 |
| `Form` + `FormField/Label/Control/Message` | Pakai untuk form baru bersama react-hook-form + zod |
| `Input`, `Label`, `Textarea` | Field primitives |

**Custom (jangan migrate, punya logic non-trivial):**

| Komponen | Alasan tetap custom |
|---|---|
| `AffiliateButton.tsx` | Wraps shadcn `<Button asChild>` — hanya hold partner URL builder, UTM params, dan wajib `rel="nofollow sponsored noopener noreferrer"` (CLAUDE.md hard rule #4). Inherit semua variant/size dari Button. |
| `EmailCapture.tsx` | Honeypot anti-spam, hydration guard via `useSyncExternalStore`, fetch ke `/api/subscribe` |
| `InfoBox.tsx` | MDX-only (tip/warning/info callouts dengan Lucide icons) |
| `WifiBar.tsx` ([components/places/](../components/places/)) | 3-bar visual indicator pakai `wifi-slow/medium/fast` colors. **a11y:** sr-only bucket label (Slow/OK/Fast) supaya screen reader tidak hanya dapat angka Mbps |
| `UpdateForm.tsx` | Form logic manual; pakai shadcn `Dialog` sebagai shell |
| `TableOfContents.tsx` | Auto-generate dari MDX headings |

**Roadmap (belum ada):** `PriceTag.tsx`, `MapEmbed.tsx` — direncanakan untuk Phase 3+, belum diimplementasi.

### Aturan import

- Komponen lama yang sudah ada call site banyak (`Button`, `Card`, `Badge`) → import lewat bridge: `import { Button } from '@/components/ui/Button'` (akan resolve ke shadcn version).
- Komponen baru shadcn (`Dialog`, `Select`, `Form`, dst.) → import langsung: `import { Dialog } from '@/components/ui/shadcn/dialog'`.
- Custom: `import { AffiliateButton } from '@/components/ui/AffiliateButton'`.

## Komponen MDX

Komponen yang bisa langsung dipakai di `.mdx` tanpa import (registered di `mdx-components.tsx`):

```tsx
<InfoBox type="tip">
  Pro tip: Beli tiket bus malam untuk perjalanan lebih nyaman.
</InfoBox>

<InfoBox type="warning">
  Harga BBM bisa naik tanpa pemberitahuan.
</InfoBox>

{/* AffiliateButton — partner wajib; pakai `url` (direct) atau `query` (search fallback) */}
<AffiliateButton partner="traveloka" url="https://..." variant="coral">
  Book on Traveloka
</AffiliateButton>

<AffiliateButton partner="agoda" query="Batukaras surf camp" variant="secondary">
  Check Agoda
</AffiliateButton>
```

> `PriceTag` dan `MapEmbed` belum diimplementasi — direncanakan untuk Phase 3+.

## Iconography

- **Library:** [Lucide](https://lucide.dev) (`lucide-react`) — sudah terinstall
- **Stroke width default:** `1.75` untuk semua icon dekorasi/UI. Naikkan ke `2` hanya untuk status/feedback icons kecil (CheckCircle2 di success state, AlertTriangle di destructive flow)
- **Size scale:**
  - `h-3.5 w-3.5` — inline dengan body text (mis. ExternalLink di link)
  - `h-4 w-4` — default UI icons (chip icons, button leading icons)
  - `h-5 w-5` — InfoBox callouts, mobile-only nav
  - `h-6 w-6` — QuickNav card icons (desktop)
- **JANGAN pakai emoji sebagai structural icon** (🎒 🏨 ⚙️) — pakai SVG/Lucide. Emoji font-dependent + tidak konsisten cross-platform + tidak bisa di-theme. Emoji boleh di konten editorial (MDX) yang memang ingin nuansa "honest local friend."
- **External links** wajib pakai pattern `<ExternalLink>` icon + `aria-label="<label> (opens in new tab)"`. Helper `ExternalActionLink` ada di [app/(site)/places/[slug]/page.tsx](../app/(site)/places/[slug]/page.tsx) — promote ke `components/ui/` kalau dipakai > 2 tempat.
- **Brand mark icons** (Instagram, Twitter, etc.) — Lucide menghapus brand marks. Pakai inline SVG kecil dengan stroke `1.75` mengikuti style Lucide. Contoh di [components/layout/Footer.tsx](../components/layout/Footer.tsx).

## Interaction Patterns

### Press / active feedback
- Buttons & chips: `active:scale-[0.98]` (sudah di `Button` base, tambahkan manual di custom chip)
- Cards yang clickable: `active:scale-[0.99]` (lebih subtle karena area lebih besar)
- Semua animasi otomatis di-disable lewat `prefers-reduced-motion` global di [app/globals.css](../app/globals.css)

### Hover (desktop)
- Primary surfaces: `hover:bg-{color}/90` (turunkan opacity 10%)
- Outline surfaces: `hover:border-ocean hover:text-ocean`
- Cards: `hover:border-ocean/40 hover:bg-sand/30` atau `hover:shadow-md`

### Sticky / fixed elements
- Header tinggi ~68-76px dengan `sticky top-0 z-40`
- Sticky sidebar/result panel di bawahnya **wajib** `top-24` (96px) untuk clearance. Pernah ada bug `top-6` overlap di Cost Calculator — sudah diperbaiki, tapi gampang regress.
- Anchor scroll targets pakai `scroll-mt-24` agar tidak ketutup header saat di-scroll-to.

### Touch targets
- Minimum 44×44pt (Apple HIG) / 48×48dp (Material). Aturan ini berlaku untuk **semua tappable element**, bukan hanya tombol.
- Untuk chip kecil yang visual size-nya ~32-36px, expand hitbox tanpa ubah visual: `min-h-11 -my-1.5 md:my-0` (hitbox 44pt di mobile, visual 36px di desktop). Lihat `FilterPill` di [GuidesList.tsx](../components/sections/GuidesList.tsx).
- Spacing antar tappable element minimum 8px (gap-2 di Tailwind).

### Forms
- Input height minimum `h-11` (44px) untuk mobile-friendly tap
- Label visible (`<label>` atau `aria-label`) — JANGAN placeholder-only
- Error pakai `role="alert"` atau `aria-live`, success pakai `role="status"`
- Disabled state: `disabled:opacity-50 disabled:cursor-not-allowed` (sudah di Button base)
- Honeypot field: `absolute left-[-9999px]` + `aria-hidden="true"` + `tabIndex={-1}` (lihat EmailCapture)

## Accessibility (WCAG 2.1 AA)

- Semua interactive element keyboard-accessible (`tabindex`, `onKeyDown`)
- Color contrast ratio minimum 4.5:1 (body), 3:1 (large text)
- Semua `<img>` punya `alt` deskriptif (bukan "image" atau "photo")
- Form fields punya `<label>` (bukan placeholder-only)
- Skip-to-content link di top of page ([app/(site)/layout.tsx](../app/(site)/layout.tsx))
- Focus indicator visible — pakai `focus-visible:ring-2 focus-visible:ring-ocean focus-visible:ring-offset-2` (jangan hapus tanpa replacement)
- `prefers-reduced-motion` di-respect global di [globals.css](../app/globals.css) — animation duration di-clamp ke 0.01ms
- Color-only signaling dilarang — semua status (success/warning/error, WiFi bucket) wajib punya text/icon companion
- Sequential heading hierarchy (h1 → h2 → h3, tidak skip)
- External link: `target="_blank"` + `rel="noopener noreferrer"` + `aria-label="... (opens in new tab)"`

## Performance Target

| Metric | Target |
|---|---|
| Lighthouse Performance | > 90 |
| Lighthouse SEO | > 95 |
| Lighthouse Accessibility | > 90 |
| LCP | < 2.5s |
| CLS | < 0.1 |
| INP | < 200ms |
| Total page weight | < 1 MB on 3G |

**Wajib:**
- Semua image pakai Next.js `<Image>` dengan `width`, `height`, `alt`
- `priority` hanya untuk above-fold images
- Lazy-load Maps embeds (intersection observer)
- `font-display: swap` (default Next.js fonts)

## Responsive Breakpoints

Tested di: 375px (mobile), 768px (tablet), 1024px (laptop), 1440px (desktop).
