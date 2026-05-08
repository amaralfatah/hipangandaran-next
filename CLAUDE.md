# Hi Pangandaran — Project Context

> **Untuk Claude Code:** File ini adalah entry point setiap session. Baca semua file yang di-link di bawah sesuai task yang dikerjakan. Jangan baca semua file sekaligus — load on demand.

---

## Apa Ini

Website travel guide berbahasa Inggris untuk **Kabupaten Pangandaran**, fokus utama **Batu Karas dan Green Canyon**, dengan coverage tambahan untuk Citumang, Karapyak, Madasari, Cagar Alam Pananjung, dan area sekitarnya.

**Domain:** hipangandaran.com
**Audience:** Wisatawan asing & digital nomad berbahasa Inggris
**Bahasa:** English-only (TIDAK ada versi Bahasa Indonesia)

## Tech Stack (locked — jangan ubah tanpa diskusi)

- **Framework:** Next.js 14+ (App Router, TypeScript strict)
- **Styling:** Tailwind CSS
- **Database:** Supabase (PostgreSQL) dengan RLS wajib
- **Content:** MDX files di `/content/guides/`
- **Hosting:** Vercel
- **Email:** Resend
- **Forms:** React Hook Form + Zod

Detail lengkap → `docs/architecture.md`

## Brand Identity (FINAL)

- **Voice:** "Honest local friend" — casual, second person, contractions OK ("you'll", "won't"). BUKAN korporat, BUKAN tour operator, BUKAN editorial guide.
- **Tone:** Approachable + data-driven. Specific over general ("Rp 35,000" bukan "affordable"; "20 Mbps" bukan "fast WiFi"). Honest negatives diperbolehkan dan didorong ("Pangandaran beach itself is meh — the real magic is at Batu Karas").
- **Author identity:** Pakai nama asli (first-name minimum). JANGAN "Site Author" generik atau pseudonym fake. Trust foundation untuk audience asing.
- **Design:** Mobile-first, fast, trust signals (verifikasi tanggal di setiap halaman).
- **Logo Phase 1:** Typography-only ("Hi Pangandaran" Playfair Display, color ocean). Commission designer tunda ke Phase 3+.

Detail lengkap → `docs/design-system.md` dan `docs/content-guide.md`

## Aturan Kerja (HARD RULES)

1. **Strict TypeScript** — pakai `unknown` + type guard, jangan `any`
2. **RLS wajib aktif** di semua tabel Supabase
3. **`SUPABASE_SERVICE_ROLE_KEY` tidak boleh di client** — hanya Route Handlers
4. **Affiliate links wajib** `rel="nofollow sponsored noopener noreferrer"`
5. **Image wajib** Next.js `<Image>` dengan `width`+`height`+`alt` eksplisit
6. **Setiap commit atomic** dengan format: `feat(p1): deskripsi [§task]`
7. **Jangan loncat phase** — Phase 1 → 2 → 3 → 4
8. **Jika ambigu — TANYA dulu**, jangan asumsi

## Format Lapor Saat Selesai Task

```
✅ Selesai: [nama task]
📁 File diubah: [list]
⚠️ Catatan: [hal yang user perlu tahu, atau "tidak ada"]
🔜 Selanjutnya: [task berikutnya]
```

## Routing: Mana File yang Dibaca untuk Task Apa

| Task tipe | File yang wajib dibaca |
|---|---|
| Setup awal / scaffolding | `docs/architecture.md` + `docs/phases/phase-1-foundation.md` |
| Bikin halaman/komponen UI | `docs/design-system.md` + phase aktif |
| Tulis/edit MDX article | `docs/content-guide.md` + `reference/article-list.md` |
| Database / Supabase | `docs/architecture.md` + `reference/database-schema.sql` |
| Affiliate / monetisasi | `docs/phases/phase-2-database.md` + `reference/affiliate-config.md` |
| Pre-launch | `reference/deployment-checklist.md` |

## Status Phase Saat Ini

- [ ] Phase 1: Foundation (homepage, MDX system, 5 artikel pilar)
- [ ] Phase 2: Database & Directories (akomodasi, kafe filter)
- [ ] Phase 3: Tools (cost calculator, email capture)
- [ ] Phase 4: Advanced (surf conditions, Mapbox)

Update checklist ini setelah setiap phase selesai (baca `definition-of-done.md` di phase yang relevan).

## Non-Goals (JANGAN dibangun)

- ❌ Booking system (hanya redirect ke afiliasi)
- ❌ User accounts / login
- ❌ Komentar / forum
- ❌ Versi Bahasa Indonesia
- ❌ Mobile app
- ❌ Destinasi di luar Kabupaten Pangandaran

---

*Last updated: Mei 2026*
