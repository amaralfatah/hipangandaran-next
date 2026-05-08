# Deployment Checklist

> Checklist untuk pre-launch dan setiap kali deploy ke production. Baca SEBELUM custom domain di-pointing.

## Pre-Launch (Phase 1 first deploy)

### Technical
- [ ] Lighthouse > 90 di SEMUA kategori, di mobile DAN desktop
- [ ] All metadata (title, description, OG) terisi di setiap halaman
- [ ] Sitemap accessible at `/sitemap.xml`
- [ ] `robots.txt` benar (disallow `/api/`, allow rest)
- [ ] 404 page custom (`app/not-found.tsx`)
- [ ] Error boundary (`app/error.tsx`)
- [ ] Loading states (`app/loading.tsx`)
- [ ] Favicon + Apple touch icon + manifest.json
- [ ] OG images render correct (test di [opengraph.xyz](https://opengraph.xyz))

### Compliance
- [ ] Affiliate disclosure di footer + halaman dedicated `/affiliate-disclosure`
- [ ] Privacy policy halaman terisi (template OK, customize untuk site ini)
- [ ] Cookie consent banner kalau pakai analytics (GDPR)

### Functional
- [ ] Test affiliate links — UTM params tracking benar (semua provider)
- [ ] Test email subscribe flow end-to-end
- [ ] Test "Report Update" form (Phase 2+)
- [ ] Browser test: Chrome, Safari, Firefox
- [ ] Mobile test: iOS Safari, Android Chrome

### SEO
- [ ] Submit sitemap ke Google Search Console
- [ ] Submit ke Bing Webmaster Tools
- [ ] Test schema.org markup di [Rich Results Test](https://search.google.com/test/rich-results)
- [ ] Setup uptime monitoring (UptimeRobot gratis)

## Per-Deploy (untuk update berikutnya)

### Definition of Done (cross-reference phase docs)

Sebuah fitur dianggap selesai kalau **SEMUA** ini terpenuhi:

- [ ] Berjalan tanpa error di production (Vercel)
- [ ] Mobile-responsive — tested 375/768/1024/1440
- [ ] Lighthouse score tidak turun di bawah 85 untuk halaman affected
- [ ] Tidak ada console error/warning
- [ ] Tidak ada broken link (test dengan link checker)
- [ ] Data dari Supabase tampil benar atau ada fallback masuk akal
- [ ] TypeScript build pass tanpa error
- [ ] ESLint pass tanpa warning
- [ ] Accessibility: keyboard navigable, screen reader tested (basic)
- [ ] SEO: title, meta description, Open Graph image present
- [ ] Affiliate links (jika ada) punya `rel="nofollow sponsored"`
- [ ] Update CHANGELOG.md dengan summary perubahan

## DON'Ts (Catatan untuk Claude Code)

- ❌ Jangan skip RLS di Supabase
- ❌ Jangan pakai `any` di TypeScript
- ❌ Jangan langsung implementasi tanpa baca CLAUDE.md + file relevan
- ❌ Jangan loncat fase
- ❌ Jangan publish artikel dengan trigger word AI ("nestled in", "vibrant", "boasts")
- ❌ Jangan lupa affiliate disclosure
- ❌ Jangan ubah tech stack tanpa diskusi
