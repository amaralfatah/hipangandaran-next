# Hi Pangandaran

Website travel guide berbahasa Inggris untuk area Pangandaran, Batukaras, dan Green Canyon.

Fokus produk:
- Konten guide berbasis MDX (itinerary, surf guide, budget guide, transport guide)
- Direktori tempat (akomodasi dan kafe) dengan data terstruktur
- Tool interaktif seperti cost calculator
- Email capture untuk membangun audience pembaca berulang

Target pengguna:
- Surfer
- Digital nomad
- Traveler mandiri (bukan rombongan tur)

Tech stack utama:
- Next.js (App Router) + TypeScript
- Tailwind CSS
- Supabase (database + admin data)
- MDX untuk konten editorial

## Website Ini Project Apa?
Hi Pangandaran adalah media travel niche berbasis SEO + konten lokal, bukan OTA (online travel agent) dan bukan tour operator.

Peran website:
- Membantu user riset perjalanan dengan informasi yang lebih jujur dan spesifik (harga, WiFi, area menginap, aktivitas)
- Menjadi layer rekomendasi sebelum user booking di platform pihak ketiga
- Menjaga konten tetap update lewat sistem report update dan verifikasi data

Singkatnya: ini adalah content + directory business untuk travel lokal Pangandaran.

## Website Ini Mendapatkan Uang Dari Mana?
Model monetisasi utama saat ini adalah **affiliate commission**.

Cara kerjanya:
1. User membaca guide atau halaman places di Hi Pangandaran
2. User klik link affiliate ke partner booking/activity/insurance
3. Jika user melakukan booking/pembelian, partner memberi komisi ke Hi Pangandaran
4. Harga untuk user tetap sama (tanpa biaya tambahan dari sisi user)

Partner affiliate yang sudah diintegrasikan di codebase:
- Traveloka
- Agoda
- Booking.com
- GetYourGuide
- SafetyWing

Implementasi teknis monetisasi:
- URL affiliate dibangun lewat helper `lib/affiliate.ts`
- Tracking UTM konsisten (`utm_source=hipangandaran`, dll.)
- Link affiliate ditandai dengan atribut `rel="nofollow sponsored noopener noreferrer"`
- Disclosure ditampilkan di footer dan halaman khusus `/affiliate-disclosure`

Catatan:
- Saat ini belum ada implementasi iklan display di codebase
- Email subscriber dikumpulkan untuk distribusi konten dan retensi audience, bukan sumber revenue langsung

## Menjalankan Project
```bash
npm install
npm run dev
```

Buka `http://localhost:3000`.

## Struktur Penting
- `app/(site)` - halaman publik
- `app/api` - endpoint backend (subscribe, report update, admin)
- `content/guides` - artikel MDX
- `lib/affiliate.ts` - builder link affiliate
- `supabase/migrations` - skema database
