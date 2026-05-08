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

CREATE INDEX idx_cafes_location_area ON cafes(location_area);
CREATE INDEX idx_cafes_slug ON cafes(slug);

ALTER TABLE cafes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read cafes"
  ON cafes FOR SELECT
  USING (true);
