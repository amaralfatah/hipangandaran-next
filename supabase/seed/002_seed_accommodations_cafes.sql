-- ============================================================
-- Phase 2 SEED DATA — placeholder rows for development only.
-- ============================================================
-- These rows are NOT field-verified. Replace with real data before
-- pushing to production. See phase-2-database.md prerequisites.
-- ============================================================

INSERT INTO accommodations (
  name, slug, type, location_area, location_zone,
  price_min_usd, price_max_usd, wifi_speed_mbps,
  has_desk, has_pool, distance_to_beach_m,
  google_maps_url, booking_affiliate_url, description, images, verified_at
) VALUES
  ('Batukaras Beach Homestay', 'batukaras-beach-homestay', 'homestay', 'batu_karas', 'core',
   15, 25, 12, true, false, 120,
   'https://maps.google.com/?q=Batu+Karas', NULL,
   'Family-run homestay 2 minutes from the sand. Simple rooms, strong fan, decent breakfast.',
   ARRAY[]::text[], '2026-04-15T00:00:00Z'),
  ('Java Cove Surf Camp', 'java-cove-surf-camp', 'surf_camp', 'batu_karas', 'core',
   35, 65, 25, true, true, 80,
   'https://maps.google.com/?q=Java+Cove+Batu+Karas', NULL,
   'Long-running surf camp with package deals. Pool, decent WiFi, instructor on staff.',
   ARRAY[]::text[], '2026-04-20T00:00:00Z'),
  ('Bonsai Bungalows', 'bonsai-bungalows', 'guesthouse', 'batu_karas', 'core',
   22, 38, 18, true, false, 200,
   NULL, NULL,
   'Quiet bungalows set back from the main road. Garden setting, good for longer stays.',
   ARRAY[]::text[], '2026-04-22T00:00:00Z'),
  ('Villa Monyet', 'villa-monyet', 'villa', 'batu_karas', 'core',
   80, 140, 30, true, true, 350,
   NULL, NULL,
   'Two-bedroom villa with pool. Suits couples or small groups doing longer remote-work stays.',
   ARRAY[]::text[], '2026-04-18T00:00:00Z'),
  ('Pondok Putri Pantai', 'pondok-putri-pantai', 'homestay', 'pangandaran_beach', 'core',
   12, 20, 8, false, false, 60,
   NULL, NULL,
   'Cheap, cheerful, right on the west beach. Walls are thin, crowd is friendly.',
   ARRAY[]::text[], '2026-04-10T00:00:00Z'),
  ('Sunrise Guesthouse Pangandaran', 'sunrise-guesthouse-pangandaran', 'guesthouse', 'pangandaran_beach', 'core',
   18, 32, 15, true, false, 150,
   NULL, NULL,
   'Mid-range guesthouse on the east-beach side. Quieter mornings, decent breakfast.',
   ARRAY[]::text[], '2026-04-12T00:00:00Z'),
  ('Karapyak Beach Cottage', 'karapyak-beach-cottage', 'homestay', 'karapyak', 'extended',
   14, 22, 5, false, false, 100,
   NULL, NULL,
   'No frills, no neighbours. WiFi is unreliable but the beach is empty.',
   ARRAY[]::text[], '2026-03-28T00:00:00Z'),
  ('Madasari Cliffside Villas', 'madasari-cliffside-villas', 'villa', 'madasari', 'extended',
   55, 95, 12, true, true, 400,
   NULL, NULL,
   'Cliff-edge villas with raw views. Bring a vehicle — it''s remote.',
   ARRAY[]::text[], '2026-04-05T00:00:00Z'),
  ('Cijulang Riverside Lodge', 'cijulang-riverside-lodge', 'guesthouse', 'cijulang', 'extended',
   20, 35, 10, false, false, 1800,
   NULL, NULL,
   'Inland option near Green Canyon. Good base if you''re here for body rafting.',
   ARRAY[]::text[], '2026-04-08T00:00:00Z'),
  ('Surf Stoke House', 'surf-stoke-house', 'surf_camp', 'batu_karas', 'core',
   28, 48, 22, true, false, 180,
   NULL, NULL,
   'Smaller surf camp run by an Aussie-Indo couple. Lessons available, social vibe.',
   ARRAY[]::text[], '2026-04-25T00:00:00Z')
ON CONFLICT (slug) DO NOTHING;


INSERT INTO cafes (
  name, slug, location_area, wifi_speed_mbps, power_outlets,
  opens_at, closes_at, price_range, instagram_url, google_maps_url
) VALUES
  ('Warung Kopi Karas', 'warung-kopi-karas', 'batu_karas', 18, true,
   '07:00', '22:00', 'budget', NULL, 'https://maps.google.com/?q=Warung+Kopi+Karas'),
  ('Beachfront Roastery', 'beachfront-roastery', 'batu_karas', 30, true,
   '08:00', '21:00', 'mid', NULL, NULL),
  ('Kopi & Kanvas', 'kopi-dan-kanvas', 'batu_karas', 25, true,
   '08:00', '23:00', 'mid', NULL, NULL),
  ('Pantai Timur Coffee', 'pantai-timur-coffee', 'pangandaran_beach', 12, false,
   '07:30', '20:00', 'budget', NULL, NULL),
  ('The Workspace Pangandaran', 'the-workspace-pangandaran', 'pangandaran_beach', 45, true,
   '08:00', '22:00', 'mid', NULL, NULL),
  ('Sunset Sip Cafe', 'sunset-sip-cafe', 'pangandaran_beach', 20, true,
   '09:00', '23:00', 'mid', NULL, NULL),
  ('Kedai Kopi Cijulang', 'kedai-kopi-cijulang', 'cijulang', 8, false,
   '06:30', '18:00', 'budget', NULL, NULL),
  ('Green Canyon Cafe', 'green-canyon-cafe', 'cijulang', 15, true,
   '08:00', '20:00', 'budget', NULL, NULL)
ON CONFLICT (slug) DO NOTHING;
