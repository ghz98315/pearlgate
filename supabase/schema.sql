-- Suppliers table for PearlGate
CREATE TABLE IF NOT EXISTS suppliers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  name_zh TEXT NOT NULL,
  city TEXT NOT NULL,
  cluster TEXT NOT NULL,
  established INT NOT NULL,
  employees TEXT NOT NULL,
  categories TEXT[] DEFAULT '{}',
  certifications TEXT[] DEFAULT '{}',
  is_direct_factory BOOLEAN DEFAULT true,
  verified_date TEXT NOT NULL,
  cooperation_rating INT NOT NULL,
  quality_rating INT NOT NULL,
  moq TEXT NOT NULL,
  price_range TEXT NOT NULL,
  sample_lead_time TEXT NOT NULL,
  production_lead_time TEXT NOT NULL,
  payment_methods TEXT[] DEFAULT '{}',
  shipping_port TEXT NOT NULL,
  images TEXT[] DEFAULT '{}',
  product_images TEXT[] DEFAULT '{}',
  contact_name TEXT NOT NULL,
  contact_email TEXT NOT NULL,
  contact_wechat TEXT NOT NULL,
  description TEXT NOT NULL,
  specialties TEXT[] DEFAULT '{}',
  is_free BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Index for faster lookups
CREATE INDEX IF NOT EXISTS idx_suppliers_cluster ON suppliers(cluster);
CREATE INDEX IF NOT EXISTS idx_suppliers_city ON suppliers(city);
CREATE INDEX IF NOT EXISTS idx_suppliers_is_free ON suppliers(is_free);

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER suppliers_updated_at
  BEFORE UPDATE ON suppliers
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();
