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

-- Row Level Security — WAJIB
ALTER TABLE subscribers ENABLE ROW LEVEL SECURITY;

-- Anon role can INSERT only; no SELECT policy = no public reads (privacy)
CREATE POLICY "Anyone can subscribe"
  ON subscribers FOR INSERT
  WITH CHECK (true);

-- Admin reads happen via SUPABASE_SERVICE_ROLE_KEY in server-side route handlers only.
