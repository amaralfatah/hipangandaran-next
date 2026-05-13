-- ============================================================
-- Phase 2 SEED — cafes (Batu Karas)
-- Generated: 2026-05-13T07:22:42.134Z
-- Source: research/cafes-merged.json (5 AI research runs merged)
-- ============================================================
-- CONFIDENT rows (8): have valid Google Maps listing + coordinates.
--   wifi_speed_mbps & power_outlets selalu butuh survey lapangan.
--   last_verified_at = 2026-05-13 hanya untuk yang muncul di ≥2 sumber.
--
-- UNVERIFIED rows (12): di-comment, butuh manual check di Google Maps
--   atau survey sebelum di-uncomment.
-- ============================================================

INSERT INTO cafes (
  name, slug, location_area, wifi_speed_mbps, power_outlets,
  opens_at, closes_at, price_range, instagram_url, google_maps_url,
  latitude, longitude, last_verified_at
) VALUES
  -- [S/A] 5x sources: 1.json,2.json,3.json,4.json,5.json
  ('House of Sawah Batukaras', 'house-of-sawah-batukaras', 'batu_karas', NULL, false,
   '07:00', '21:00', 'mid', 'https://www.instagram.com/houseofsawah', 'https://www.google.com/maps/place/House+of+Sawah/@-7.7412852,108.4962255,17z/',
   -7.7412852, 108.4962255, '2026-05-13T00:00:00Z'),
  -- [S/A] 5x sources: 1.json,2.json,3.json,4.json,5.json
  ('Salt Cafe', 'salt-cafe', 'batu_karas', NULL, false,
   '07:00', '22:00', 'mid', 'https://www.instagram.com/saltcafe_batukaras', 'https://www.google.com/maps/place/Salt+Cafe/@-7.7478,108.5028,17z/',
   -7.7478, 108.5028, '2026-05-13T00:00:00Z'),
  -- [S/A] 3x sources: 2.json,4.json,5.json
  ('Kedai Mini Resto Rice Field', 'kedai-mini-resto-rice-field', 'batu_karas', NULL, false,
   '06:00', '22:00', 'mid', NULL, 'https://www.google.com/maps/place/Kedai+Mini+Resto+Rice+Field/@-7.741355,108.496155,17z/',
   -7.741355, 108.496155, '2026-05-13T00:00:00Z'),
  -- [S/A] 3x sources: 2.json,4.json,5.json
  ('Swell Dough', 'swell-dough', 'batu_karas', NULL, false,
   '07:00', '21:00', 'mid', 'https://instagram.com/swelldough', 'https://www.google.com/maps/place/Swell+Dough/@-7.7477544,108.4988775,17z/',
   -7.7477544, 108.4988775, '2026-05-13T00:00:00Z'),
  -- [B] 2x sources: 3.json,5.json
  ('Hangfive Coffee and Surf', 'hangfive-coffee-and-surf', 'batu_karas', NULL, false,
   '07:00', '23:00', 'mid', 'https://instagram.com/hangfivecoffeeandsurf', 'https://www.google.com/maps/place/Hangfive+Coffee+and+Surf/@-7.74957,108.500838,17z',
   -7.74957, 108.500838, '2026-05-13T00:00:00Z'),
  -- [B] 2x sources: 2.json,4.json
  ('Kedai Samboja', 'kedai-samboja', 'batu_karas', NULL, false,
   '08:00', '22:00', 'budget', NULL, 'https://www.google.com/maps/place/Kedai+Samboja/@-7.7485,108.5025,17z/',
   -7.7485, 108.5025, '2026-05-13T00:00:00Z'),
  -- [B] 1x sources: 5.json
  ('Al Fresko', 'al-fresko', 'batu_karas', NULL, false,
   '06:30', '21:00', NULL, NULL, 'https://www.google.com/maps/place/Al+Fresko/@-7.750003,108.501465,17z',
   -7.750003, 108.501465, NULL),
  -- [B] 1x sources: 5.json
  ('Amelia Bakery Batu Karas', 'amelia-bakery-batu-karas', 'batu_karas', NULL, false,
   '08:00', '20:00', NULL, NULL, 'https://www.google.com/maps/place/Amelia+Bakery+Batu+Karas/@-7.734402,108.49817,17z',
   -7.734402, 108.49817, NULL)
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
  -- Karassan Coffee  [2x: 3.json,5.json]
  -- red_flags: no valid /maps/place/ URL — listing not confirmed | coordinates missing or implausible — verify on Google Maps
  ('Karassan Coffee', 'karassan-coffee', 'batu_karas', NULL, false,
   '07:00', '22:00', 'mid', 'https://instagram.com/karassan_', NULL,
   NULL, NULL, '2026-05-13T00:00:00Z'),
  -- Le Pari  [2x: 3.json,5.json]
  -- red_flags: no valid /maps/place/ URL — listing not confirmed | coordinates missing or implausible — verify on Google Maps
  ('Le Pari', 'le-pari', 'batu_karas', NULL, false,
   '09:00', '21:00', 'mid', 'https://instagram.com/le__pari', NULL,
   NULL, NULL, '2026-05-13T00:00:00Z'),
  -- HangFive Cafe  [1x: 1.json]
  -- red_flags: single-source (1.json) — verify before publishing | no valid /maps/place/ URL — listing not confirmed
  ('HangFive Cafe', 'hangfive-cafe', 'batu_karas', NULL, false,
   '09:00', '21:00', 'mid', 'https://www.instagram.com/hangfivebatukaras', NULL,
   NULL, NULL, NULL),
  -- Kalaras Hotel, Villa, Cottage & Cafe  [1x: 5.json]
  -- red_flags: single-source (5.json) — verify before publishing | no valid /maps/place/ URL — listing not confirmed
  ('Kalaras Hotel, Villa, Cottage & Cafe', 'kalaras-hotel-villa-cottage-cafe', 'batu_karas', NULL, false,
   '10:00', '22:00', NULL, 'https://www.instagram.com/kalaras_resort/', NULL,
   NULL, NULL, NULL),
  -- KOKYO by SJAHTRA  [1x: 5.json]
  -- red_flags: single-source (5.json) — verify before publishing | no valid /maps/place/ URL — listing not confirmed
  ('KOKYO by SJAHTRA', 'kokyo-by-sjahtra', 'batu_karas', NULL, false,
   NULL, NULL, 'mid', 'https://www.instagram.com/kokyo.co/', NULL,
   NULL, NULL, NULL),
  -- Maison de Karas  [1x: 5.json]
  -- red_flags: single-source (5.json) — verify before publishing | no valid /maps/place/ URL — listing not confirmed
  ('Maison de Karas', 'maison-de-karas', 'batu_karas', NULL, false,
   '07:00', '22:00', NULL, 'https://www.instagram.com/maisondekaras/', NULL,
   NULL, NULL, NULL),
  -- Sico Coffee  [1x: 5.json]
  -- red_flags: single-source (5.json) — verify before publishing | no valid /maps/place/ URL — listing not confirmed
  ('Sico Coffee', 'sico-coffee', 'batu_karas', NULL, false,
   NULL, NULL, NULL, 'https://www.instagram.com/sico.coffee/', NULL,
   NULL, NULL, NULL),
  -- Slow Burn Coffee & Eatery  [1x: 5.json]
  -- red_flags: single-source (5.json) — verify before publishing | no valid /maps/place/ URL — listing not confirmed
  ('Slow Burn Coffee & Eatery', 'slow-burn-coffee-eatery', 'batu_karas', NULL, false,
   NULL, NULL, NULL, 'https://www.instagram.com/slowburn.bk/', NULL,
   NULL, NULL, NULL),
  -- The Maison Mini Bar Cafe  [1x: 3.json]
  -- red_flags: single-source (3.json) — verify before publishing | no valid /maps/place/ URL — listing not confirmed
  ('The Maison Mini Bar Cafe', 'the-maison-mini-bar-cafe', 'batu_karas', NULL, false,
   NULL, NULL, 'mid', NULL, NULL,
   NULL, NULL, NULL),
  -- Treehouse Cafe  [1x: 1.json]
  -- red_flags: single-source (1.json) — verify before publishing | no valid /maps/place/ URL — listing not confirmed
  ('Treehouse Cafe', 'treehouse-cafe', 'batu_karas', NULL, false,
   NULL, NULL, 'mid', NULL, NULL,
   NULL, NULL, NULL),
  -- Tropik Cafe Batu Karas  [1x: 3.json]
  -- red_flags: single-source (3.json) — verify before publishing | no valid /maps/place/ URL — listing not confirmed
  ('Tropik Cafe Batu Karas', 'tropik-cafe-batu-karas', 'batu_karas', NULL, false,
   NULL, NULL, 'budget', NULL, NULL,
   NULL, NULL, NULL),
  -- Wagoon Coffee  [1x: 1.json]
  -- red_flags: single-source (1.json) — verify before publishing | no valid /maps/place/ URL — listing not confirmed
  ('Wagoon Coffee', 'wagoon-coffee', 'batu_karas', NULL, false,
   NULL, NULL, 'budget', NULL, NULL,
   NULL, NULL, NULL)
ON CONFLICT (slug) DO NOTHING;
*/
