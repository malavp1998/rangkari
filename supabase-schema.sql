-- ─────────────────────────────────────────────────────────────────────────────
-- Rangkari — complete database schema
-- Run this in Supabase SQL Editor
-- ─────────────────────────────────────────────────────────────────────────────

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Enums
CREATE TYPE painting_status AS ENUM ('available', 'reserved', 'sold');
CREATE TYPE order_status    AS ENUM ('pending','paid','packed','shipped','delivered','cancelled');

-- ── Paintings ────────────────────────────────────────────────────────────────
CREATE TABLE paintings (
  id           UUID         PRIMARY KEY DEFAULT uuid_generate_v4(),
  title        TEXT         NOT NULL,
  description  TEXT,
  price        INTEGER      NOT NULL CHECK (price > 0),  -- paise (₹1 = 100 paise)
  dimensions   TEXT,
  medium       TEXT,
  year_created INTEGER,
  status       painting_status NOT NULL DEFAULT 'available',
  featured     BOOLEAN      NOT NULL DEFAULT false,
  created_at   TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
  updated_at   TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

CREATE TABLE painting_images (
  id            UUID  PRIMARY KEY DEFAULT uuid_generate_v4(),
  painting_id   UUID  NOT NULL REFERENCES paintings(id) ON DELETE CASCADE,
  url           TEXT  NOT NULL,
  storage_path  TEXT  NOT NULL,
  display_order INTEGER NOT NULL DEFAULT 0,
  is_primary    BOOLEAN NOT NULL DEFAULT false,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE painting_videos (
  id           UUID  PRIMARY KEY DEFAULT uuid_generate_v4(),
  painting_id  UUID  NOT NULL REFERENCES paintings(id) ON DELETE CASCADE,
  url          TEXT  NOT NULL,
  storage_path TEXT  NOT NULL,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ── Orders ───────────────────────────────────────────────────────────────────
CREATE SEQUENCE order_number_seq START 1;

CREATE TABLE orders (
  id                   UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_number         TEXT NOT NULL UNIQUE,
  customer_name        TEXT NOT NULL,
  customer_email       TEXT NOT NULL,
  customer_phone       TEXT NOT NULL,
  shipping_address     JSONB NOT NULL,
  painting_id          UUID NOT NULL REFERENCES paintings(id),
  amount_paid          INTEGER NOT NULL,   -- paise
  shipping_fee         INTEGER NOT NULL DEFAULT 0,  -- paise
  razorpay_order_id    TEXT,
  razorpay_payment_id  TEXT,
  razorpay_signature   TEXT,
  status               order_status NOT NULL DEFAULT 'pending',
  tracking_number      TEXT,
  notes                TEXT,
  created_at           TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at           TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ── Triggers ─────────────────────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$ BEGIN NEW.updated_at = NOW(); RETURN NEW; END; $$ LANGUAGE plpgsql;

CREATE TRIGGER paintings_updated_at BEFORE UPDATE ON paintings
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER orders_updated_at BEFORE UPDATE ON orders
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE OR REPLACE FUNCTION set_order_number()
RETURNS TRIGGER AS $$
BEGIN
  NEW.order_number = 'RNG-' || TO_CHAR(NOW(), 'YYYY') || '-' ||
                     LPAD(nextval('order_number_seq')::TEXT, 4, '0');
  RETURN NEW;
END; $$ LANGUAGE plpgsql;

CREATE TRIGGER orders_set_number BEFORE INSERT ON orders
  FOR EACH ROW EXECUTE FUNCTION set_order_number();

-- ── Row Level Security ───────────────────────────────────────────────────────
ALTER TABLE paintings       ENABLE ROW LEVEL SECURITY;
ALTER TABLE painting_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE painting_videos ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders          ENABLE ROW LEVEL SECURITY;

-- Public can read all paintings and media
CREATE POLICY "public read paintings"       ON paintings       FOR SELECT USING (true);
CREATE POLICY "public read painting_images" ON painting_images FOR SELECT USING (true);
CREATE POLICY "public read painting_videos" ON painting_videos FOR SELECT USING (true);

-- Public can insert orders (checkout)
CREATE POLICY "public insert orders" ON orders FOR INSERT WITH CHECK (true);

-- ── Storage buckets (run AFTER creating buckets in Supabase dashboard) ────────
-- Create two PUBLIC buckets first: "painting-images" and "painting-videos"
-- Then run these policies:

INSERT INTO storage.buckets (id, name, public) VALUES
  ('painting-images', 'painting-images', true),
  ('painting-videos', 'painting-videos', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "public view painting-images" ON storage.objects
  FOR SELECT TO public USING (bucket_id = 'painting-images');

CREATE POLICY "auth upload painting-images" ON storage.objects
  FOR INSERT TO authenticated WITH CHECK (bucket_id = 'painting-images');

CREATE POLICY "auth delete painting-images" ON storage.objects
  FOR DELETE TO authenticated USING (bucket_id = 'painting-images');

CREATE POLICY "public view painting-videos" ON storage.objects
  FOR SELECT TO public USING (bucket_id = 'painting-videos');

CREATE POLICY "auth upload painting-videos" ON storage.objects
  FOR INSERT TO authenticated WITH CHECK (bucket_id = 'painting-videos');

CREATE POLICY "auth delete painting-videos" ON storage.objects
  FOR DELETE TO authenticated USING (bucket_id = 'painting-videos');
