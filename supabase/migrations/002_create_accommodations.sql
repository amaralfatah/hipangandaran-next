-- ============================================================
-- Phase 2: accommodations
-- ============================================================

CREATE TABLE accommodations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('homestay', 'villa', 'surf_camp', 'guesthouse')),
  location_area TEXT NOT NULL CHECK (location_area IN (
    'batu_karas', 'pangandaran_beach', 'cijulang',
    'karapyak', 'madasari', 'batu_hiu', 'parigi'
  )),
  location_zone TEXT NOT NULL CHECK (location_zone IN ('core', 'extended')),
  price_min_usd DECIMAL(10,2) NOT NULL,
  price_max_usd DECIMAL(10,2) NOT NULL,
  wifi_speed_mbps INTEGER,
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

CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER accommodations_updated_at BEFORE UPDATE ON accommodations
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

ALTER TABLE accommodations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read accommodations"
  ON accommodations FOR SELECT
  USING (true);
