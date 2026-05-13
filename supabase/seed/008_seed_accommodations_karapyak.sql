-- ============================================================
-- Phase 2 SEED — accommodations (Karapyak)
-- Generated: 2026-05-13
-- Source: research/hotel/karapyak.json (15 properties)
-- ============================================================
-- Catatan:
--   - Semua zona = 'extended' (Karapyak di luar core Batu Karas/Pangandaran Beach).
--   - wifi_speed_mbps NULL untuk semua — belum ada survey lapangan.
--   - 9 dari 15 unit adalah varian kamar di kompleks "Karapyak Glamping & Lodges"
--     yang berbagi koordinat (240 m ke pantai) — sengaja di-seed terpisah karena
--     masing-masing punya slug, harga, dan booking URL berbeda.
--   - booking_affiliate_url = NULL untuk listing yang belum punya partner link aktif.
--   - verified_at = 2026-05-13 (tanggal research run).
-- ============================================================

INSERT INTO accommodations (
  name, slug, type, location_area, location_zone,
  price_min_usd, price_max_usd, wifi_speed_mbps,
  has_desk, has_pool, distance_to_beach_m,
  google_maps_url, booking_affiliate_url, description, images, verified_at
) VALUES
  ('KARAPYAK GLAMPING & LODGES - LUMBUNG TRUNDLE', 'karapyak-glamping-lodges-lumbung-trundle', 'guesthouse', 'karapyak', 'extended',
   12.50, 36.00, NULL, false, true, 240,
   'https://www.google.com/maps/search/?api=1&query=KARAPYAK%20GLAMPING%20%26%20LODGES%20Bagolo%20Kalipucang%20Pangandaran',
   'https://www.agoda.com/lumbung-trudle-karapyak-glamping-lodges/hotel/pangandaran-id.html',
   'You''ll be inside the Karapyak Glamping complex, about 240 m from Pantai Karapyak Pasir Putih, with a simple room setup, AC, bathroom, and breakfast. It suits budget travelers who want to stay very close to the beach area, but it won''t feel like a digital-nomad workspace.',
   ARRAY[]::text[], '2026-05-13T00:00:00Z'),

  ('Penginapan Purnama Karapyak', 'penginapan-purnama-karapyak', 'homestay', 'karapyak', 'extended',
   17.00, 17.00, NULL, false, false, 602,
   'https://www.google.com/maps/search/?api=1&query=Penginapan%20Purnama%20Karapyak%20Bagolo%20Kalipucang%20Pangandaran',
   'https://www.traveloka.com/id-id/hotel/indonesia/penginapan-purnama-karapyak-9000001040310',
   'You''re around 602 m from Karapyak Beach in a very simple homestay-style place, so it works better as a quiet local base than a full-service stay. It suits road-trippers or families who mainly need a room and parking; availability on booking sites can be inconsistent.',
   ARRAY[]::text[], '2026-05-13T00:00:00Z'),

  ('KARAPYAK GLAMPING & LODGES - OEMAH BUHUN', 'karapyak-glamping-lodges-oemah-buhun', 'villa', 'karapyak', 'extended',
   18.75, 18.75, NULL, false, true, 240,
   'https://www.google.com/maps/search/?api=1&query=KARAPYAK%20GLAMPING%20%26%20LODGES%20Oemah%20Buhun%20Bagolo%20Pangandaran',
   NULL,
   'This is the more old-school traditional-house option inside Karapyak Glamping, about 240 m from the beach area. Pick it if you want a rustic stay and don''t mind limited modern comfort; it''s not the best choice if you need reliable work setup or bright lighting.',
   ARRAY[]::text[], '2026-05-13T00:00:00Z'),

  ('Jajapin Pondok Wisata Karapyak', 'jajapin-pondok-wisata-karapyak', 'villa', 'karapyak', 'extended',
   19.73, 19.73, NULL, false, false, 400,
   'https://www.google.com/maps/search/?api=1&query=Jajapin%20Pondok%20Wisata%20Karapyak%20Kalipucang%20Pangandaran',
   'https://www.traveloka.com/id-id/hotel/indonesia/jajapin-pondok-wisata-karapyak-9000001043568',
   'You''ll stay in a small pondok-style property roughly 400 m from Pantai Karapyak Pasir Putih, close enough for an easy beach visit. It suits groups or families looking for a basic local stay; don''t expect resort-level facilities.',
   ARRAY[]::text[], '2026-05-13T00:00:00Z'),

  ('Realita Beach Guesthouse', 'realita-beach-guesthouse', 'guesthouse', 'karapyak', 'extended',
   19.91, 19.91, NULL, false, false, 319,
   'https://www.google.com/maps/search/?api=1&query=Realita%20Beach%20Guesthouse%20Karapyak%20Pangandaran',
   'https://www.agoda.com/realita-beach-guesthouse/hotel/pangandaran-id.html',
   'You''re about 319 m from Karapyak Beach in a small guesthouse setting, so the beach is the main reason to stay here. It suits couples or short-stay travelers who want a practical room near the coast; facilities look simple rather than boutique.',
   ARRAY[]::text[], '2026-05-13T00:00:00Z'),

  ('KARAPYAK GLAMPING & LODGES - LUMBUNG KING', 'karapyak-glamping-lodges-lumbung-king', 'villa', 'karapyak', 'extended',
   26.25, 26.25, NULL, false, true, 240,
   'https://www.google.com/maps/search/?api=1&query=KARAPYAK%20GLAMPING%20%26%20LODGES%20Lumbung%20King%20Pangandaran',
   NULL,
   'This unit puts you in the Karapyak Glamping area, around 240 m from the beach, with a compact lumbung-style room for two. It''s better for couples who want a neat beach-area sleepover than for guests planning to work long hours from the room.',
   ARRAY[]::text[], '2026-05-13T00:00:00Z'),

  ('Urbanview Karapyak Glamping Lodges', 'urbanview-karapyak-glamping-lodges', 'guesthouse', 'karapyak', 'extended',
   27.06, 28.44, NULL, false, true, 240,
   'https://www.google.com/maps/search/?api=1&query=Urbanview%20Karapyak%20Glamping%20Lodges%20Pangandaran',
   'https://www.traveloka.com/id-id/hotel/indonesia/urbanview-karapyak-glamping-lodges-3000020020016',
   'You''ll be in the larger Karapyak Glamping lodging complex, about 240 m from Pantai Karapyak Pasir Putih, with pool-style leisure facilities. It suits travelers who want a slightly more organized stay than a homestay; for remote work, verify Wi-Fi quality before booking.',
   ARRAY[]::text[], '2026-05-13T00:00:00Z'),

  ('KARAPYAK GLAMPING & LODGES - GUEST HOUSE QUEEN', 'karapyak-glamping-lodges-guest-house-queen', 'guesthouse', 'karapyak', 'extended',
   31.25, 31.25, NULL, false, true, 240,
   'https://www.google.com/maps/search/?api=1&query=KARAPYAK%20GLAMPING%20%26%20LODGES%20Guest%20House%20Queen%20Pangandaran',
   'https://www.agoda.com/en-sg/guest-house-queen-karapyak-glamping-lodges/hotel/pangandaran-id.html',
   'This is a queen-bed guesthouse option inside Karapyak Glamping, about 240 m from the beach area. It works for couples who want AC, breakfast, and a managed lodging feel; it may be too quiet if you''re looking for cafés or nightlife nearby.',
   ARRAY[]::text[], '2026-05-13T00:00:00Z'),

  ('KARAPYAK GLAMPING & LODGES - GUEST HOUSE STANDARD', 'karapyak-glamping-lodges-guest-house-standard', 'guesthouse', 'karapyak', 'extended',
   31.25, 31.25, NULL, false, true, 240,
   'https://www.google.com/maps/search/?api=1&query=KARAPYAK%20GLAMPING%20%26%20LODGES%20Guest%20House%20Standard%20Pangandaran',
   NULL,
   'You''ll be in the same Karapyak Glamping complex, roughly 240 m from Pantai Karapyak Pasir Putih, in a more standard room category. It''s a practical pick if you want the location and pool access without paying for the larger units.',
   ARRAY[]::text[], '2026-05-13T00:00:00Z'),

  ('KARAPYAK GLAMPING & LODGES - LUMBUNG QUEEN', 'karapyak-glamping-lodges-lumbung-queen', 'villa', 'karapyak', 'extended',
   31.25, 31.25, NULL, false, true, 240,
   'https://www.google.com/maps/search/?api=1&query=KARAPYAK%20GLAMPING%20%26%20LODGES%20Lumbung%20Queen%20Pangandaran',
   NULL,
   'This lumbung-style queen unit keeps you close to the Karapyak beach strip, about 240 m from the shoreline area. It suits a couple wanting a compact private-feeling room; if you need a proper desk setup, this probably isn''t the strongest option.',
   ARRAY[]::text[], '2026-05-13T00:00:00Z'),

  ('KARAPYAK GLAMPING & LODGES - RUMAH PANGGUNG KING', 'karapyak-glamping-lodges-rumah-panggung-king', 'villa', 'karapyak', 'extended',
   37.50, 37.50, NULL, true, true, 240,
   'https://www.google.com/maps/search/?api=1&query=KARAPYAK%20GLAMPING%20%26%20LODGES%20Rumah%20Panggung%20King%20Pangandaran',
   'https://www.agoda.com/id-id/wooden-house-king-karapyak-glamping-lodges/hotel/pangandaran-id.html',
   'This raised-house unit is about 240 m from the Karapyak beach area and gives you a bit more room than the compact guesthouse categories. It suits couples or small families who want a local wooden-house feel; the setup is still more holiday stay than work retreat.',
   ARRAY[]::text[], '2026-05-13T00:00:00Z'),

  ('KARAPYAK GLAMPING & LODGES - RUMAH PANGGUNG BANJAR', 'karapyak-glamping-lodges-rumah-panggung-banjar', 'villa', 'karapyak', 'extended',
   40.63, 40.63, NULL, true, true, 240,
   'https://www.google.com/maps/search/?api=1&query=KARAPYAK%20GLAMPING%20%26%20LODGES%20Rumah%20Panggung%20Banjar%20Pangandaran',
   'https://www.tiket.com/id-id/homes/indonesia/karapyak-glamping-lodges-rumah-panggung-banjar-511001669032667671',
   'You''re close to the beach, about 240 m away, in a larger raised-house unit that can work for a small group. It suits families or friends who want shared space and a more traditional layout; check pool status before booking because facilities can change.',
   ARRAY[]::text[], '2026-05-13T00:00:00Z'),

  ('KARAPYAK GLAMPING & LODGES - GUEST HOUSE KING', 'karapyak-glamping-lodges-guest-house-king', 'guesthouse', 'karapyak', 'extended',
   47.44, 85.00, NULL, false, true, 240,
   'https://www.google.com/maps/search/?api=1&query=KARAPYAK%20GLAMPING%20%26%20LODGES%20Guest%20House%20King%20Pangandaran',
   'https://www.agoda.com/guest-house-king-karapyak-glamping-lodges/hotel/pangandaran-id.html',
   'This king-bed guesthouse unit is inside Karapyak Glamping, about 240 m from the beach area, and feels more comfortable than the cheapest room categories. It suits couples who want an easier stay near Karapyak; compare OTA prices because rates can vary a lot.',
   ARRAY[]::text[], '2026-05-13T00:00:00Z'),

  ('KARAPYAK GLAMPING & LODGES - GLAMPING VILLAGE VIP', 'karapyak-glamping-lodges-glamping-village-vip', 'villa', 'karapyak', 'extended',
   53.13, 53.13, NULL, false, true, 240,
   'https://www.google.com/maps/search/?api=1&query=KARAPYAK%20GLAMPING%20%26%20LODGES%20Glamping%20Village%20VIP%20Pangandaran',
   'https://www.agoda.com/glamping-village-beach-view/hotel/pangandaran-id.html',
   'This is the higher-priced glamping village option in the Karapyak Glamping complex, about 240 m from the beach area. It suits couples or small families who want the most comfortable category there; it''s still a quiet coastal stay, not a busy resort zone.',
   ARRAY[]::text[], '2026-05-13T00:00:00Z'),

  ('Sari Ater Cabins & Beach Campervan Park', 'sari-ater-cabins-and-beach-campervan-park', 'villa', 'karapyak', 'extended',
   99.42, 112.50, NULL, false, false, 1970,
   'https://www.google.com/maps/search/?api=1&query=Sari%20Ater%20Cabins%20%26%20Beach%20Campervan%20Park%20Kalipucang%20Pangandaran',
   'https://www.traveloka.com/id-id/hotel/indonesia/sari-ater-cabins--beach-campervan-park-9000001047276',
   'This cabin and campervan-style property is farther from Karapyak Beach, around 1.97 km away, so you''ll want a car or motorbike. It suits families or couples who prefer a private cabin feel near the Karang Nini side rather than staying right on the Karapyak beach strip.',
   ARRAY[]::text[], '2026-05-13T00:00:00Z')
ON CONFLICT (slug) DO NOTHING;
