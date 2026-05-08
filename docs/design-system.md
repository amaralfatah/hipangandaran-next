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

## Komponen UI Wajib

Semua di `/components/ui/`:

| Komponen | Variants / Props |
|---|---|
| `Button.tsx` | primary, secondary, ghost, coral |
| `Card.tsx` | listing akomodasi & kafe |
| `Badge.tsx` | tags: "Verified", "Surf Camp", "Digital Nomad Friendly" |
| `WifiSpeedBar.tsx` | visual bar 3 warna sesuai speed |
| `PriceTag.tsx` | harga USD + Rp inline |
| `MapEmbed.tsx` | wrapper Google Maps embed (lazy-loaded) |
| `AffiliateButton.tsx` | tombol booking + UTM tracking + `rel="nofollow sponsored"` |
| `EmailCapture.tsx` | form subscribe (with honeypot) |
| `UpdateForm.tsx` | modal "Report an Update" |
| `InfoBox.tsx` | info/warning/tip boxes (untuk MDX) |
| `TableOfContents.tsx` | auto-generated dari headings |

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
