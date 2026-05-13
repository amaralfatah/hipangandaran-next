-- ============================================================
-- Phase 2 SEED — accommodations (Batu Karas)
-- Generated: 2026-05-13
-- Source: research/hotel/batu_karas.json (15 properties)
-- ============================================================
-- Catatan:
--   - Semua harga dalam USD (price_min/max). Min == max berarti single rate (kamar standar).
--   - wifi_speed_mbps NULL untuk semua — butuh survey lapangan (Speedtest on-site).
--   - distance_to_beach_m mengikuti angka di JSON sumber.
--   - URL di JSON di-wrap markdown [url](url); di sini diekstrak ke bare URL.
--   - verified_at = 2026-05-13 (tanggal research run).
--   - Affiliate links di-render di komponen dengan rel="nofollow sponsored noopener noreferrer".
-- ============================================================

INSERT INTO accommodations (
  name, slug, type, location_area, location_zone,
  price_min_usd, price_max_usd, wifi_speed_mbps,
  has_desk, has_pool, distance_to_beach_m,
  google_maps_url, booking_affiliate_url, description, images, verified_at
) VALUES
  ('Ragha Homestay', 'ragha-homestay', 'homestay', 'batu_karas', 'core',
   16.14, 16.14, NULL, false, false, 400,
   'https://www.google.com/maps/search/?api=1&query=Ragha%20Homestay%20Batukaras',
   'https://www.traveloka.com/id-id/hotel/indonesia/ragha-homestay-9000007030256',
   'This is a tiny homestay set back from the beach side of the village, better for simple sleeps than resort-style lounging. You''re roughly a short walk from the sand, and it suits budget travelers who''ll spend most of the day surfing or eating outside.',
   ARRAY[]::text[], '2026-05-13T00:00:00Z'),

  ('The SO Hotel Mitra RedDoorz', 'the-so-hotel-mitra-reddoorz', 'guesthouse', 'batu_karas', 'core',
   19.31, 19.31, NULL, false, false, 450,
   'https://www.google.com/maps/search/?api=1&query=The%20SO%20Hotel%20Mitra%20RedDoorz%20Batukaras',
   'https://www.agoda.com/id-id/the-so-hotel-redpartner/hotel/batukaras-id.html',
   'The SO is a basic RedDoorz-style small hotel on Jl. Sanghiangkalang, close enough that you can walk to the beach without planning a ride. You get AC, WiFi, and 24-hour reception, but don''t expect a social surf-camp setup or much local charm.',
   ARRAY[]::text[], '2026-05-13T00:00:00Z'),

  ('Marlon''s Rest Homestay', 'marlons-rest-homestay', 'homestay', 'batu_karas', 'core',
   21.74, 21.74, NULL, false, false, 650,
   'https://www.google.com/maps/search/?api=1&query=Marlon%27s%20Rest%20Homestay%20Batukaras',
   'https://www.traveloka.com/id-id/hotel/indonesia/marlons-rest-homestay-9000007038582',
   'Marlon''s feels more like a home base than a hotel, with a sawah-side hangout feel and simple rooms. It''s a good pick if you want a cheap, quiet place near the Batu Karas stretch, but you''ll probably eat and work in nearby cafes rather than in-room.',
   ARRAY[]::text[], '2026-05-13T00:00:00Z'),

  ('Woody Villa', 'woody-villa', 'villa', 'batu_karas', 'core',
   23.01, 23.01, NULL, false, true, 500,
   'https://www.google.com/maps/search/?api=1&query=Woody%20Villa%20Batukaras',
   'https://www.traveloka.com/id-id/hotel/indonesia/woody-villa-9000006146621',
   'Woody Villa is a family-friendly villa option with a pool and kitchenette, about 500 m from Batu Karas Beach. It works best if you have a scooter or car and want more space than a homestay, not if you want to roll straight out of bed into the surf.',
   ARRAY[]::text[], '2026-05-13T00:00:00Z'),

  ('Hotel Pondok Putri', 'hotel-pondok-putri', 'guesthouse', 'batu_karas', 'core',
   23.54, 78.47, NULL, true, true, 50,
   'https://www.google.com/maps/search/?api=1&query=Hotel%20Pondok%20Putri%20Batukaras',
   'https://www.traveloka.com/id-id/hotel/indonesia/hotel-pondok-putri-9000006179408',
   'Pondok Putri is one of the more practical small-hotel choices near the beach, with 14 rooms, a pool, and desks in the rooms. It''s easy for families or casual surfers who want a simple beach-facing stay, though the room range jumps a lot for family rooms.',
   ARRAY[]::text[], '2026-05-13T00:00:00Z'),

  ('Amazon Bungalow & Cottages', 'amazon-bungalow-cottages', 'guesthouse', 'batu_karas', 'core',
   24.85, 24.85, NULL, false, false, 535,
   'https://www.google.com/maps/search/?api=1&query=Amazon%20Bungalow%20%26%20Cottages%20Batukaras',
   'https://www.traveloka.com/id-id/hotel/indonesia/amazon-bungalow--cottages-9000006289559',
   'Amazon Bungalow & Cottages has a quiet, family-run feel, with guests often mentioning the friendly owners and the sound of the sea from the property. It''s better for slow mornings and backpacker-style comfort than for polished hotel service.',
   ARRAY[]::text[], '2026-05-13T00:00:00Z'),

  ('Sadati Home Stay', 'sadati-home-stay', 'homestay', 'batu_karas', 'core',
   25.28, 25.28, NULL, false, false, 560,
   'https://www.google.com/maps/search/?api=1&query=Sadati%20Home%20Stay%20Batukaras',
   'https://www.traveloka.com/id-id/hotel/indonesia/sadati-home-stay-9000007038236',
   'Sadati Home Stay is a straightforward homestay around a 7-minute walk from Batu Karas Beach. It suits travelers who want a calmer, low-cost place with WiFi and parking, but you won''t get pool or desk-style work amenities.',
   ARRAY[]::text[], '2026-05-13T00:00:00Z'),

  ('Jelajah Batukaras Guesthouse', 'jelajah-batukaras-guesthouse', 'guesthouse', 'batu_karas', 'core',
   26.43, 26.43, NULL, true, false, 100,
   'https://www.google.com/maps/search/?api=1&query=Jelajah%20Batukaras%20Guesthouse',
   'https://www.traveloka.com/id-id/hotel/indonesia/jelajah-batukaras-guesthouse-9000007036704',
   'Jelajah is close to the beach and has the kind of helpful host energy that makes a short Batu Karas stay easier. The rooms are simple, but the desk, WiFi, and shared cooking vibe make it friendlier for budget travelers staying a few nights.',
   ARRAY[]::text[], '2026-05-13T00:00:00Z'),

  ('Bale Karang Cottages', 'bale-karang-cottages', 'guesthouse', 'batu_karas', 'core',
   30.19, 63.56, NULL, false, false, 100,
   'https://www.google.com/maps/search/?api=1&query=Bale%20Karang%20Cottages%20Batukaras',
   'https://www.booking.com/hotel/id/bale-karang.id.html',
   'Bale Karang is a small cottage-style stay near the Reef Break, around 100 m from the surf zone. It''s one of the better fits if you want beach access without a giant hotel feel, but prices can vary quite a bit by room and date.',
   ARRAY[]::text[], '2026-05-13T00:00:00Z'),

  ('ElHayya Batukaras', 'elhayya-batukaras', 'villa', 'batu_karas', 'core',
   31.06, 31.06, NULL, true, true, 850,
   'https://www.google.com/maps/search/?api=1&query=ElHayya%20Batukaras',
   'https://www.traveloka.com/id-id/hotel/indonesia/elhayya-batukaras-9000006265410',
   'ElHayya is a compact villa-style stay with a pool, rooftop terrace, and rooms that include a desk. It''s walkable to Batu Karas Beach, but it''s more of a quiet family stay than a party or surf-camp place.',
   ARRAY[]::text[], '2026-05-13T00:00:00Z'),

  ('Pondok Cowet Batukaras', 'pondok-cowet-batukaras', 'villa', 'batu_karas', 'core',
   31.61, 31.61, NULL, true, false, 350,
   'https://www.google.com/maps/search/?api=1&query=Pondok%20Cowet%20Batukaras',
   'https://www.traveloka.com/id-id/hotel/indonesia/pondok-cowet-batukaras-9000006286697',
   'Pondok Cowet is an 8-room villa-style place on Jumleng Street, close enough for a short beach run and simple stays. You get a desk and AC, but facilities are basic compared with the pool villas nearby.',
   ARRAY[]::text[], '2026-05-13T00:00:00Z'),

  ('HAU BATU KARAS', 'hau-batu-karas', 'guesthouse', 'batu_karas', 'core',
   44.16, 50.09, NULL, true, false, 80,
   'https://www.google.com/maps/search/?api=1&query=HAU%20BATU%20KARAS',
   'https://www.traveloka.com/id-id/hotel/indonesia/hau-batu-karas-9000008070237',
   'HAU is a small 17-room hotel about a minute''s walk from the beach, with rooftop space, WiFi, and desks in rooms. It''s a practical pick if you want a tidy base close to the sand, though it''s priced higher than most simple homestays.',
   ARRAY[]::text[], '2026-05-13T00:00:00Z'),

  ('Lagoona Beach Bungalows', 'lagoona-beach-bungalows', 'guesthouse', 'batu_karas', 'core',
   52.05, 52.05, NULL, false, false, 1000,
   'https://www.google.com/maps/search/?api=1&query=Lagoona%20Beach%20Bungalows%20Batukaras',
   'https://www.traveloka.com/id-id/hotel/indonesia/lagoona-beach-bungalows-9000006237125',
   'Lagoona Beach Bungalows is a B&B-style guesthouse with a homey feel and WiFi, but it sits a bit farther from the main beach action than the beachfront options. It''s better if you like a quieter base and don''t mind a walk or short ride.',
   ARRAY[]::text[], '2026-05-13T00:00:00Z'),

  ('Javacove Beach', 'javacove-beach', 'guesthouse', 'batu_karas', 'core',
   141.01, 141.01, NULL, false, true, 30,
   'https://www.google.com/maps/search/?api=1&query=Javacove%20Beach%20Batukaras',
   'https://www.traveloka.com/id-id/hotel/indonesia/javacove-beach-9000005969325',
   'Javacove is the more polished beachside option in Batu Karas, right by the main sand and suited to travelers who want a pool and hotel-style comfort. It''s much pricier than the village homestays, so it only makes sense if location and ease matter more than budget.',
   ARRAY[]::text[], '2026-05-13T00:00:00Z'),

  ('The Beach House Batukaras', 'the-beach-house-batukaras', 'villa', 'batu_karas', 'core',
   236.36, 236.36, NULL, true, true, 500,
   'https://www.google.com/maps/search/?api=1&query=The%20Beach%20House%20Batukaras',
   'https://www.traveloka.com/id-id/hotel/indonesia/the-beach-house-batukaras-9000006464475',
   'The Beach House is a private villa for groups or families, about 500 m from Batu Karas Beach, with a pool, desks, and home-style rooms. It''s comfortable for staying in and cooking, but reviews mention small maintenance issues, so it''s worth checking details before booking.',
   ARRAY[]::text[], '2026-05-13T00:00:00Z')
ON CONFLICT (slug) DO NOTHING;
