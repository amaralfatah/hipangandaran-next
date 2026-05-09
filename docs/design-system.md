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

## Component System

Project pakai **shadcn/ui** (di atas Radix primitives) sebagai foundation untuk komponen interaktif/styling, dipadukan dengan komponen custom untuk yang punya logic brand-specific.

### Folder layout

```
components/ui/
├── shadcn/              ← shadcn/ui components (lowercase)
│   ├── button.tsx       customized cva: variants primary/coral/secondary/ghost
│   ├── card.tsx         brand styling + asChild slot
│   ├── badge.tsx        variants verified/surf/nomad/warning
│   ├── dialog.tsx       brand styling, mobile-friendly via custom className
│   ├── select.tsx       rounded-full trigger, brand colors
│   ├── form.tsx         react-hook-form integration
│   ├── input.tsx | label.tsx | textarea.tsx
├── Button.tsx           ← bridge re-export dari ./shadcn/button (sementara)
├── Card.tsx             ← bridge re-export
├── Badge.tsx            ← bridge re-export
├── AffiliateButton.tsx  ← custom (UTM tracking + rel attrs)
├── EmailCapture.tsx     ← custom (honeypot + API call)
├── InfoBox.tsx          ← custom (untuk MDX)
└── (TableOfContents.tsx di components/, bukan ui/)
```

Konfigurasi shadcn di [components.json](../components.json). Tambah komponen baru: `npx shadcn@latest add <name>`.

### Komponen wajib

**Dari shadcn (customized):**

| Komponen | Variants / Props |
|---|---|
| `Button` | `primary` (ocean, default), `coral`, `secondary` (outline), `ghost`, plus shadcn defaults (`default`, `destructive`, `outline`, `link`). Sizes `sm`/`md`/`lg` (rounded-full) |
| `Card` + `CardHeader/Title/Description/Content/Footer` | brand-styled (rounded-2xl, bg-cream, shadow). Support `asChild` untuk semantic HTML (`<Card asChild><article>...</article></Card>`) |
| `Badge` | `default`, `verified`, `surf`, `nomad`, `warning` (brand tints) |
| `Dialog` + `DialogContent/Header/Title/Description/Footer` | Pakai untuk modal (e.g. UpdateForm). Mobile-friendly: pass `className="top-auto bottom-0 translate-y-0 rounded-t-3xl rounded-b-none sm:top-1/2 sm:translate-y-[-50%] sm:rounded-3xl"` untuk bottom-sheet di mobile |
| `Select` + `SelectTrigger/Content/Item/Value` | Pakai untuk filter dropdown. Default rounded-full trigger h-11 |
| `Form` + `FormField/Label/Control/Message` | Pakai untuk form baru bersama react-hook-form + zod |
| `Input`, `Label`, `Textarea` | Field primitives |

**Custom (jangan migrate, punya logic non-trivial):**

| Komponen | Alasan tetap custom |
|---|---|
| `AffiliateButton.tsx` | UTM tracking, affiliate URL builder, wajib `rel="nofollow sponsored noopener noreferrer"` |
| `EmailCapture.tsx` | Honeypot anti-spam, hydration guard, fetch ke `/api/subscribe` |
| `InfoBox.tsx` | MDX-only (tip/warning/info callouts) |
| `WifiBar.tsx` ([components/places/](../components/places/)) | 3-bar visual indicator pakai `wifi-slow/medium/fast` colors |
| `PriceTag.tsx`, `MapEmbed.tsx` | Domain-specific formatting |
| `UpdateForm.tsx` | Form logic manual; pakai shadcn `Dialog` sebagai shell |
| `TableOfContents.tsx` | Auto-generate dari MDX headings |

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

<PriceTag usd={25} rp={400000} note="per night" />

<MapEmbed src="..." title="Batukaras Beach location" />

<AffiliateButton href="..." variant="coral">
  Book on Traveloka
</AffiliateButton>
```

## Accessibility (WCAG 2.1 AA)

- Semua interactive element keyboard-accessible (`tabindex`, `onKeyDown`)
- Color contrast ratio minimum 4.5:1 (body), 3:1 (large text)
- Semua `<img>` punya `alt` deskriptif (bukan "image" atau "photo")
- Form fields punya `<label>` (bukan placeholder-only)
- Skip-to-content link di top of page
- Focus indicator visible (jangan hapus tanpa replacement)

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
