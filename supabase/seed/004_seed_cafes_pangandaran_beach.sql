-- ============================================================
-- Phase 2 SEED — cafes (Pangandaran Beach)
-- Generated: 2026-05-13
-- Source: research/cafes/pangadaran_beach.json (1 AI research run, 23 candidates)
-- ============================================================
-- CONFIDENT rows (15): have valid Google Maps listing + coordinates.
--   wifi_speed_mbps & power_outlets selalu butuh survey lapangan.
--   last_verified_at = 2026-05-13 untuk entri dengan source ≥medium confidence.
--
-- UNVERIFIED rows (8): di-comment, butuh manual check di Google Maps
--   atau survey sebelum di-uncomment. Termasuk hybrid bar/cafe yang
--   perlu verifikasi day-time work suitability.
-- ============================================================

INSERT INTO cafes (
  name, slug, location_area, wifi_speed_mbps, power_outlets,
  opens_at, closes_at, price_range, instagram_url, google_maps_url,
  latitude, longitude, last_verified_at
) VALUES
  -- Hello Beach Coffee and Eatery
  -- evidence: Wanderlog + Instagram (medium); Saturday hours may differ (closes 00:00)
  ('Hello Beach Coffee and Eatery', 'hello-beach-coffee-and-eatery', 'pangandaran_beach', NULL, false,
   '08:00', '23:00', 'mid', 'https://www.instagram.com/hellobeachcoffee/', 'https://www.google.com/maps/place/Hello+Beach+Coffee+and+Eatery/@-7.690204,108.657425,17z',
   -7.690204, 108.657425, '2026-05-13T00:00:00Z'),
  -- badiakopi
  -- evidence: TempatWisataSeru + Radartegal (medium)
  ('badiakopi', 'badiakopi', 'pangandaran_beach', NULL, false,
   '10:00', '23:00', 'mid', 'https://www.instagram.com/badia.kopi/', 'https://www.google.com/maps/place/badiakopi/@-7.69145,108.6578505,17z',
   -7.69145, 108.6578505, '2026-05-13T00:00:00Z'),
  -- Overtime Coffee
  -- evidence: TempatWisataSeru + MyPangandaran (medium); hours conflict across sources (some list 15:00–00:00)
  ('Overtime Coffee', 'overtime-coffee', 'pangandaran_beach', NULL, false,
   '09:00', '23:00', 'mid', 'https://www.instagram.com/overtime.ot/', 'https://www.google.com/maps/place/Overtime+Coffee+Pangandaran/@-7.6840766,108.624815,17z',
   -7.6840766, 108.624815, '2026-05-13T00:00:00Z'),
  -- MORGAN Seafood Pangandaran
  -- red_flags: seafood and cafe hybrid; verify digital-nomad suitability before publishing
  ('MORGAN Seafood Pangandaran', 'morgan-seafood', 'pangandaran_beach', NULL, false,
   '09:00', '23:00', 'mid', 'https://www.instagram.com/morgan.seafood.pangandaran/', 'https://www.google.com/maps/place/MORGAN+Seafood+Pangandaran/@-7.6845305,108.6208562,17z',
   -7.6845305, 108.6208562, '2026-05-13T00:00:00Z'),
  -- Bamboo Beach Bar Pangandaran
  -- red_flags: TripAdvisor reviews stale (>18mo); bar/cafe hybrid — verify daytime work suitability
  ('Bamboo Beach Bar Pangandaran', 'bamboo-beach-bar', 'pangandaran_beach', NULL, false,
   '08:00', '03:00', 'mid', 'https://www.instagram.com/bamboocafe_pangandaran/', 'https://www.google.com/maps/place/Bamboo+Beach+Bar+Pangandaran/@-7.6843997,108.6231033,17z',
   -7.6843997, 108.6231033, '2026-05-13T00:00:00Z'),
  -- Ahlen Resto Cafe Pangandaran
  -- evidence: TripAdvisor hours table; weekend may close 02:00; reviews stale (>18mo)
  ('Ahlen Resto Cafe Pangandaran', 'ahlen-resto-cafe', 'pangandaran_beach', NULL, false,
   '07:00', '01:00', 'budget', NULL, 'https://www.google.com/maps/place/Ahlen+Resto+Cafe+Pangandaran/@-7.692012,108.65882,17z',
   -7.692012, 108.65882, '2026-05-13T00:00:00Z'),
  -- Lacultura Koffie Bar & Supply
  -- evidence: TempatWisataSeru (medium); described as wallet-friendly
  ('Lacultura Koffie Bar & Supply', 'lacultura-koffie-bar-supply', 'pangandaran_beach', NULL, false,
   '09:00', '00:00', 'budget', NULL, 'https://www.google.com/maps/place/Lacultura+Koffie+Bar+%26+Supply/@-7.6963058,108.6543248,17z',
   -7.6963058, 108.6543248, '2026-05-13T00:00:00Z'),
  -- KOKYO by Sjahtra
  -- evidence: TempatWisataSeru + social snippet (medium); local snippet mentions Rp25,000-30,000 range
  ('KOKYO by Sjahtra', 'kokyo-by-sjahtra-pangandaran', 'pangandaran_beach', NULL, false,
   '08:00', '23:00', 'mid', 'https://www.instagram.com/kokyo.co/', 'https://www.google.com/maps/place/KOKYO+by+Sjahtra/@-7.6931611,108.6527333,17z',
   -7.6931611, 108.6527333, '2026-05-13T00:00:00Z'),
  -- Bumi Kaula Pangandaran
  -- red_flags: entity ambiguity — another source refers to Bumi Kaula Coffee in Batu Hiu; verify branch
  ('Bumi Kaula Pangandaran', 'bumi-kaula', 'pangandaran_beach', NULL, false,
   '10:00', '22:00', 'mid', 'https://www.instagram.com/bumikaula/', 'https://www.google.com/maps/place/Bumi+Kaula+Pangandaran/@-7.6929141,108.6545316,17z',
   -7.6929141, 108.6545316, '2026-05-13T00:00:00Z'),
  -- Sunset Corner urban cafe
  -- evidence: TempatWisataSeru (medium); modern cafe positioning
  ('Sunset Corner urban cafe', 'sunset-corner-urban-cafe', 'pangandaran_beach', NULL, false,
   '12:00', '22:00', 'mid', 'https://www.instagram.com/sunsetcornerurban/', 'https://www.google.com/maps/place/SUNSET+CORNER+urban+cafe/@-7.6896742,108.6461881,17z',
   -7.6896742, 108.6461881, '2026-05-13T00:00:00Z'),
  -- Captain Cafe And Bar
  -- red_flags: bar/cafe hybrid — verify daytime work suitability
  ('Captain Cafe And Bar', 'captain-cafe-and-bar', 'pangandaran_beach', NULL, false,
   '12:00', '00:00', 'mid', NULL, 'https://www.google.com/maps/place/Captain+Cafe+And+Bar/@-7.6919818,108.6490414,17z',
   -7.6919818, 108.6490414, '2026-05-13T00:00:00Z'),
  -- TEES COFFEE X BATMANS STEAK
  -- evidence: TempatWisataSeru (medium); coffee + steak concept
  ('TEES COFFEE X BATMANS STEAK', 'tees-coffee-x-batmans-steak', 'pangandaran_beach', NULL, false,
   '11:00', '21:00', 'mid', 'https://www.instagram.com/teescoffeexsteakbatmans/', 'https://www.google.com/maps/place/TEES+COFFEE+X+BATMANS+STEAK/@-7.6805039,108.6457662,17z',
   -7.6805039, 108.6457662, '2026-05-13T00:00:00Z'),
  -- Warunk Rock N Roll 78 Pangandaran
  -- red_flags: live music venue — verify quiet work suitability
  ('Warunk Rock N Roll 78 Pangandaran', 'warunk-rock-n-roll-78', 'pangandaran_beach', NULL, false,
   '12:00', '23:00', 'mid', 'https://www.instagram.com/warunk_rocknroll78/', 'https://www.google.com/maps/place/Warunk+Rock+N+Roll+78+Pangandaran/@-7.6941854,108.6578241,17z',
   -7.6941854, 108.6578241, '2026-05-13T00:00:00Z'),
  -- Madys Gelato
  -- red_flags: gelato-first venue — verify seating/work suitability before publishing
  ('Madys Gelato', 'madys-gelato', 'pangandaran_beach', NULL, false,
   '09:30', '22:00', 'budget', NULL, 'https://www.google.com/maps/place/Madys+Gelato/@-7.7039323,108.6567376,17z',
   -7.7039323, 108.6567376, '2026-05-13T00:00:00Z'),
  -- Glory Beach Cafe & Restaurant
  -- red_flags: TripAdvisor reviews stale (>18mo)
  ('Glory Beach Cafe & Restaurant', 'glory-beach-cafe-restaurant', 'pangandaran_beach', NULL, false,
   '09:00', '00:00', 'budget', NULL, 'https://www.google.com/maps/place/Glory+Beach+Cafe+%26+Restaurant/@-7.6887838,108.6439239,17z',
   -7.6887838, 108.6439239, '2026-05-13T00:00:00Z'),
  -- A&R Cafe
  -- evidence: TempatWisataSeru (medium); sea-view seating
  ('A&R Cafe', 'ar-cafe', 'pangandaran_beach', NULL, false,
   '10:00', '23:00', 'mid', 'https://www.instagram.com/ar.restocafe/', 'https://www.google.com/maps/place/A%26R+Cafe/@-7.699941,108.6578632,17z',
   -7.699941, 108.6578632, '2026-05-13T00:00:00Z')
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
  -- Nourite Coffee & Eatery
  -- red_flags: no valid place listing
  -- evidence: GotoWhere + CariKuliner — Mon-Fri 10:00-23:00, Sat-Sun 08:00-23:00; espresso Rp18k, americano Rp20k
  ('Nourite Coffee & Eatery', 'nourite-coffee-eatery', 'pangandaran_beach', NULL, false,
   '10:00', '23:00', 'budget', 'https://www.instagram.com/nouritecoffee/', NULL,
   NULL, NULL, '2026-05-13T00:00:00Z'),
  -- Litera Coffee & Library
  -- red_flags: no valid place listing; hours unknown
  -- evidence: Kabar Pangandaran mentions free Wi-Fi + library/cafe concept (work-friendly)
  ('Litera Coffee & Library', 'litera-coffee-library', 'pangandaran_beach', NULL, false,
   NULL, NULL, 'mid', NULL, NULL,
   NULL, NULL, NULL),
  -- Tepi Pangandaran
  -- red_flags: no valid place listing; opens_at unknown
  -- evidence: Lemon8 mentions Seasalt Caramel Latte Rp22k (budget)
  ('Tepi Pangandaran', 'tepi-pangandaran', 'pangandaran_beach', NULL, false,
   NULL, '22:00', 'budget', 'https://www.instagram.com/tepi.pangandaran/', NULL,
   NULL, NULL, NULL),
  -- MidSummer by.MS
  -- red_flags: no valid place listing; hours unknown
  -- evidence: Lemon8 + Radartegal — menu starts from Rp18k
  ('MidSummer by.MS', 'midsummer-by-ms', 'pangandaran_beach', NULL, false,
   NULL, NULL, 'budget', 'https://www.instagram.com/midsummer.coffee/', NULL,
   NULL, NULL, NULL),
  -- Nyiur Coffee & Eatery
  -- red_flags: no valid place listing
  -- evidence: Instagram profile snippet (medium)
  ('Nyiur Coffee & Eatery', 'nyiur-coffee-eatery', 'pangandaran_beach', NULL, false,
   '10:00', '22:00', 'budget', 'https://www.instagram.com/nyiurcoffeeeatery/', NULL,
   NULL, NULL, NULL),
  -- Hidden tropical vibes tempat nongkrong asik pangandaran
  -- red_flags: single-source low confidence — verify before publishing; name looks like SEO directory entry
  -- evidence: TempatWisataSeru only (low)
  ('Hidden tropical vibes tempat nongkrong asik pangandaran', 'hidden-tropical-vibes', 'pangandaran_beach', NULL, false,
   '10:00', '22:00', NULL, NULL, 'https://www.google.com/maps/place/Hidden+tropical+vibes+tempat+nongkrong+asik+pangandaran/@-7.6991317,108.6578623,17z',
   -7.6991317, 108.6578623, NULL),
  -- Wagoon Coffee
  -- red_flags: no valid place listing; TripAdvisor reviews stale (>18mo)
  ('Wagoon Coffee', 'wagoon-coffee-pangandaran', 'pangandaran_beach', NULL, false,
   NULL, NULL, 'budget', NULL, NULL,
   NULL, NULL, NULL),
  -- Beachside Haven
  -- red_flags: no valid place listing; single-source low confidence
  ('Beachside Haven', 'beachside-haven', 'pangandaran_beach', NULL, false,
   NULL, NULL, NULL, NULL, NULL,
   NULL, NULL, NULL)
ON CONFLICT (slug) DO NOTHING;
*/
