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
  ip_address INET,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_place_updates_place ON place_updates(place_type, place_id);
CREATE INDEX idx_place_updates_status ON place_updates(status);

ALTER TABLE place_updates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit update"
  ON place_updates FOR INSERT
  WITH CHECK (true);

-- No SELECT policy: reads only via service-role key in admin context.
