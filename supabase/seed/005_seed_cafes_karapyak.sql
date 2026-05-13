-- ============================================================
-- Phase 2 SEED — cafes (Karapyak)
-- Generated: 2026-05-13
-- Source: research/cafes/karapyak.json (1 AI research run, 4 candidates)
-- ============================================================
-- CONFIDENT rows (2): have valid Google Maps listing + coordinates.
--   wifi_speed_mbps & power_outlets selalu butuh survey lapangan.
--   last_verified_at = 2026-05-13 untuk entri dengan source ≥medium confidence.
--
-- UNVERIFIED rows (2): di-comment, butuh manual check di Google Maps
--   atau survey sebelum di-uncomment.
--
-- Catatan: Karapyak punya ekosistem kafe kecil. Banyak kandidat di-skip
--   (Kalipucang area, warung makan, photo spot) — lihat summary di JSON sumber.
-- ============================================================

INSERT INTO cafes (
  name, slug, location_area, wifi_speed_mbps, power_outlets,
  opens_at, closes_at, price_range, instagram_url, google_maps_url,
  latitude, longitude, last_verified_at
) VALUES
  -- Karapyak Glamping & Lodges
  -- evidence: Instagram @karapyak.glamping (medium) — 'Open daily resto 08.00 s.d 20.00'
  -- red_flags: lodging+resto+coffee-corner hybrid; verify public cafe access untuk digital nomads
  ('Karapyak Glamping & Lodges', 'karapyak-glamping-lodges', 'karapyak', NULL, false,
   '08:00', '20:00', NULL, 'https://www.instagram.com/karapyak.glamping/', 'https://www.google.com/maps/place/Karapyak+Glamping+%26+Lodges/@-7.695614,108.762755,17z',
   -7.695614, 108.762755, '2026-05-13T00:00:00Z'),
  -- REY HOUSE CAFE
  -- evidence: Sisparnas listing + Instagram (low) — hours bersumber dari Karapyak Valley snippet, perlu konfirmasi
  -- red_flags: muncul juga sebagai 'Rey House Cafe & Bar' / 'Karapyak Valley Resto N Bar' — possible alias/rebrand
  ('REY HOUSE CAFE', 'rey-house-cafe', 'karapyak', NULL, false,
   '08:00', '17:00', NULL, 'https://www.instagram.com/resto_pantai_karapyak_official/', 'https://www.google.com/maps/place/REY+HOUSE+CAFE/@-7.695084,108.764082,17z',
   -7.695084, 108.764082, '2026-05-13T00:00:00Z')
ON CONFLICT (slug) DO NOTHING;

-- ============================================================
-- UNVERIFIED — verifikasi dulu sebelum di-uncomment.
-- Cara cepat: buka Google Maps, search nama kafe, klik listing,
-- ambil koordinat dari URL (!3d<lat>!4d<lng>), tempel ke baris di bawah.
-- ============================================================

/*
INSERT INTO cafes (
  name, slug, location_area, wifi_speed_mbps, power_outlets,
  opens_at, closes_at, price_range, instagram_url, google_maps_url,
  latitude, longitude, last_verified_at
) VALUES
  -- Nuya Cafe Food and Drink
  -- red_flags: no valid place listing; hours conflict (Cybo Mon-Fri 09:00-20:00, Sat 05:30-21:00, Sun 07:00-21:00 vs Instagram 10:00-20:00)
  -- evidence: Instagram @nuyacafe_ (medium); Cybo lists '$$' (mid inferred)
  ('Nuya Cafe Food and Drink', 'nuya-cafe-food-and-drink', 'karapyak', NULL, false,
   '10:00', '20:00', 'mid', 'https://www.instagram.com/nuyacafe_/', NULL,
   NULL, NULL, NULL),
  -- Kopi +62
  -- red_flags: no valid place listing; single-source low confidence; IG bio menyebut cabang Tasikmalaya, Karapyak mungkin pop-up/tagged content
  -- evidence: Instagram tagged post 'KOPI+62 Pantai Karapyak, Bagolo, Kab. Pangandaran'
  ('Kopi +62', 'kopi-62', 'karapyak', NULL, false,
   NULL, NULL, NULL, 'https://www.instagram.com/kopiplus62_id/', NULL,
   NULL, NULL, NULL)
ON CONFLICT (slug) DO NOTHING;
*/
