-- ============================================================
-- Hi Pangandaran — Database Schema (Supabase)
-- ============================================================
-- Save this file at /supabase/migrations/ as separate files:
--   001_create_subscribers.sql        (Phase 1)
--   002_create_accommodations.sql     (Phase 2)
--   003_create_cafes.sql              (Phase 2)
--   004_create_place_updates.sql      (Phase 2)
--   005_create_surf_conditions.sql    (Phase 4, optional)
--
-- Then run: supabase db push
-- Generate types: supabase gen types typescript
-- ============================================================


-- ============================================================
-- Phase 1: subscribers (email capture)
-- ============================================================

CREATE TABLE subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  source TEXT, -- 'homepage' | 'calculator' | 'guide:slug'
  ip_address INET,
  unsubscribed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);


-- ============================================================
-- Phase 2: accommodations
-- ============================================================

CREATE TABLE accommodations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('homestay', 'villa', 'surf_camp', 'guesthouse')),
  -- Expanded location to cover whole Kabupaten Pangandaran
  location_area TEXT NOT NULL CHECK (location_area IN (
    'batu_karas', 'pangandaran_beach', 'cijulang',
    'karapyak', 'madasari', 'batu_hiu', 'parigi'
  )),
  location_zone TEXT NOT NULL CHECK (location_zone IN ('core', 'extended')),
  price_min_usd DECIMAL(10,2) NOT NULL,
  price_max_usd DECIMAL(10,2) NOT NULL,
  wifi_speed_mbps INTEGER, -- NULL = belum diukur
  has_desk BOOLEAN NOT NULL DEFAULT false,
  has_pool BOOLEAN NOT NULL DEFAULT false,
  distance_to_beach_m INTEGER NOT NULL,
  google_maps_url TEXT,
  booking_affiliate_url TEXT,
  description TEXT,
  images TEXT[] NOT NULL DEFAULT '{}',
  verified_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_accommodations_location_area ON accommodations(location_area);
CREATE INDEX idx_accommodations_zone ON accommodations(location_zone);
CREATE INDEX idx_accommodations_price ON accommodations(price_min_usd, price_max_usd);
CREATE INDEX idx_accommodations_slug ON accommodations(slug);


-- ============================================================
-- Phase 2: cafes
-- ============================================================

CREATE TABLE cafes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  location_area TEXT NOT NULL CHECK (location_area IN (
    'batu_karas', 'pangandaran_beach', 'cijulang',
    'karapyak', 'madasari', 'batu_hiu', 'parigi'
  )),
  wifi_speed_mbps INTEGER,
  power_outlets BOOLEAN NOT NULL DEFAULT false,
  opens_at TIME,
  closes_at TIME,
  price_range TEXT CHECK (price_range IN ('budget', 'mid', 'upscale')),
  instagram_url TEXT,
  google_maps_url TEXT,
  latitude DECIMAL(10,7),
  longitude DECIMAL(10,7),
  last_verified_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);


-- ============================================================
-- Phase 2: place_updates (crowdsource updates)
-- ============================================================

CREATE TABLE place_updates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  place_type TEXT NOT NULL CHECK (place_type IN ('accommodation', 'cafe')),
  place_id UUID NOT NULL,
  field_updated TEXT NOT NULL,
  new_value TEXT NOT NULL,
  submitted_by_email TEXT,
  status TEXT NOT NULL DEFAULT 'pending'
    CHECK (status IN ('pending', 'approved', 'rejected')),
  ip_address INET, -- untuk rate limiting & anti-spam
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);


-- ============================================================
-- Auto-update updated_at trigger
-- ============================================================

CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER accommodations_updated_at BEFORE UPDATE ON accommodations
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();


-- ============================================================
-- Row Level Security (RLS) — WAJIB
-- ============================================================

ALTER TABLE accommodations ENABLE ROW LEVEL SECURITY;
ALTER TABLE cafes ENABLE ROW LEVEL SECURITY;
ALTER TABLE place_updates ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscribers ENABLE ROW LEVEL SECURITY;

-- Public read untuk accommodations & cafes
CREATE POLICY "Public read accommodations"
  ON accommodations FOR SELECT
  USING (true);

CREATE POLICY "Public read cafes"
  ON cafes FOR SELECT
  USING (true);

-- Anonymous bisa INSERT subscribers & place_updates
CREATE POLICY "Anyone can subscribe"
  ON subscribers FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can submit update"
  ON place_updates FOR INSERT
  WITH CHECK (true);

-- TIDAK ADA SELECT policy untuk subscribers/place_updates (privacy)
-- Akses admin via service role key di server-side only

-- KRITIS: SUPABASE_SERVICE_ROLE_KEY tidak boleh di-expose ke client.
-- Hanya pakai di Route Handlers (app/api/).
