-- ============================================================
-- PearlGate Suppliers: 建表 + 种子数据
-- 在 Supabase SQL Editor 中执行
-- ============================================================

-- 1. 建表
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
  is_free BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_suppliers_cluster ON suppliers(cluster);
CREATE INDEX IF NOT EXISTS idx_suppliers_city ON suppliers(city);

CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS suppliers_updated_at ON suppliers;
CREATE TRIGGER suppliers_updated_at
  BEFORE UPDATE ON suppliers
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- 2. 插入 5 家供应商数据
INSERT INTO suppliers (slug, name, name_zh, city, cluster, established, employees, categories, certifications, is_direct_factory, verified_date, cooperation_rating, quality_rating, moq, price_range, sample_lead_time, production_lead_time, payment_methods, shipping_port, images, product_images, contact_name, contact_email, contact_wechat, description, specialties, is_free)
VALUES
(
  'yangjiang-kingstar',
  'Kingstar Knife Industry Co., Ltd',
  '阳江金星刀具实业有限公司',
  'Yangjiang',
  'Knives & Hand Tools',
  2008,
  '200-500',
  ARRAY['Kitchen Knives', 'Chef Knives', 'Knife Sets', 'Scissors'],
  ARRAY['ISO 9001', 'LFGB', 'FDA', 'SGS'],
  true,
  '2026-03-15',
  5, 4,
  '500 pieces',
  '$3-12 per unit',
  '5-7 days',
  '20-30 days',
  ARRAY['T/T', 'PayPal', 'L/C'],
  'Guangzhou Port',
  ARRAY['https://images.unsplash.com/photo-1593618998160-e34014e67546?w=800&q=80'],
  ARRAY['https://images.unsplash.com/photo-1593618998160-e34014e67546?w=600&q=80'],
  'David Chen',
  'david@kingstarknife.com',
  'kingstar_david',
  'Established in 2008, Kingstar is a leading knife manufacturer in Yangjiang with over 15 years of export experience. Specializing in high-carbon stainless steel kitchen knives, they supply major brands across Europe and North America. Their factory covers 8,000 sqm with 6 production lines and strict QC at every stage.',
  ARRAY['High-carbon stainless steel', 'Damascus pattern blades', 'Custom handle materials', 'OEM/ODM for major brands'],
  true
),
(
  'dongguan-precision-tech',
  'Dongguan Precision Tech Mold Co., Ltd',
  '东莞精密科技模具有限公司',
  'Dongguan',
  'Precision Parts & OEM',
  2012,
  '100-200',
  ARRAY['Injection Molds', 'Die Casting Molds', 'CNC Parts', 'Precision Components'],
  ARRAY['ISO 9001', 'ISO 14001', 'IATF 16949'],
  true,
  '2026-02-20',
  4, 5,
  '1 set (molds) / 200 pcs (parts)',
  '$500-15000 per mold / $2-20 per part',
  '7-10 days',
  '25-45 days',
  ARRAY['T/T', 'L/C'],
  'Shenzhen Yantian Port',
  ARRAY['https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=800&q=80'],
  ARRAY['https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=600&q=80'],
  'Jason Wang',
  'jason@dgprecisiontech.com',
  'dg_precision_jason',
  'Dongguan Precision Tech specializes in high-precision injection molds and die-casting molds for automotive, electronics, and consumer products. Equipped with Makino and Sodick CNC machines, they achieve tolerances of ±0.005mm. Serving clients including Bosch, Philips, and multiple Fortune 500 companies.',
  ARRAY['High-precision injection molds', 'Automotive mold tooling', 'Multi-cavity molds', 'Overmolding and insert molding'],
  true
),
(
  'foshan-alumax',
  'Foshan AluMax Building Materials Co., Ltd',
  '佛山铝美建材有限公司',
  'Foshan',
  'Knives & Hand Tools',
  2005,
  '300-500',
  ARRAY['Aluminum Extrusion', 'Aluminum Windows', 'Curtain Wall', 'Industrial Profiles'],
  ARRAY['ISO 9001', 'CE', 'Qualicoat', 'SGS'],
  true,
  '2026-01-10',
  4, 4,
  '1 ton',
  '$3200-4800 per ton',
  '10-14 days',
  '15-25 days',
  ARRAY['T/T', 'L/C', 'D/P'],
  'Guangzhou Nansha Port',
  ARRAY['https://images.unsplash.com/photo-1504917595217-d4dc5ebb6571?w=800&q=80'],
  ARRAY['https://images.unsplash.com/photo-1504917595217-d4dc5ebb6571?w=600&q=80'],
  'Michelle Liu',
  'michelle@alumaxfs.com',
  'alumax_michelle',
  'AluMax is one of Foshan''s top aluminum extrusion manufacturers with 20+ years of experience. Operating 12 extrusion presses (600T-3600T), they produce architectural and industrial aluminum profiles. In-house anodizing and powder coating lines ensure quality control from billet to finished product.',
  ARRAY['Custom aluminum extrusion', 'Architectural profiles', 'Anodizing & powder coating', 'Large-section industrial profiles'],
  true
),
(
  'yangjiang-ironcraft',
  'Yangjiang IronCraft Tools Co., Ltd',
  '阳江铁匠工具有限公司',
  'Yangjiang',
  'Knives & Hand Tools',
  2010,
  '100-200',
  ARRAY['Garden Tools', 'Hand Tools', 'Pruning Shears', 'Axes'],
  ARRAY['ISO 9001', 'CE', 'GS', 'BSCI'],
  true,
  '2026-04-01',
  5, 4,
  '300 pieces',
  '$2-15 per unit',
  '5-7 days',
  '15-25 days',
  ARRAY['T/T', 'PayPal', 'Western Union'],
  'Guangzhou Port',
  ARRAY['https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&q=80'],
  ARRAY['https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&q=80'],
  'Tony Zhang',
  'tony@ironcrafttools.com',
  'ironcraft_tony',
  'IronCraft specializes in garden and hand tools with a focus on the European market. Their factory has dedicated heat treatment and surface finishing workshops. Known for competitive pricing on medium-volume orders and flexible MOQ for new customers.',
  ARRAY['Garden tool sets', 'Forged hand tools', 'Custom branding & packaging', 'European safety standards'],
  true
),
(
  'dongguan-moldmaster',
  'Dongguan MoldMaster Precision Co., Ltd',
  '东莞模德精密有限公司',
  'Dongguan',
  'Precision Parts & OEM',
  2015,
  '50-100',
  ARRAY['Plastic Injection Molds', 'Silicone Molds', 'Rapid Prototyping', 'Small Batch Production'],
  ARRAY['ISO 9001', 'ISO 13485'],
  true,
  '2026-03-28',
  5, 5,
  '1 set (molds) / 100 pcs (parts)',
  '$800-8000 per mold / $0.5-10 per part',
  '3-5 days',
  '15-30 days',
  ARRAY['T/T', 'PayPal'],
  'Shenzhen Yantian Port',
  ARRAY['https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&q=80'],
  ARRAY['https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=600&q=80'],
  'Kevin Li',
  'kevin@moldmaster.cn',
  'moldmaster_kevin',
  'MoldMaster is a boutique mold shop focused on rapid prototyping and small-batch production. Ideal for startups and hardware companies needing fast turnaround. They specialize in medical-grade silicone molds and consumer electronics housings with ISO 13485 certification.',
  ARRAY['Rapid prototyping (3-5 days)', 'Medical-grade silicone', 'Consumer electronics housings', 'Low-MOQ friendly'],
  true
)
ON CONFLICT (slug) DO NOTHING;

-- 完成
DO $$ BEGIN RAISE NOTICE 'Done: 5 suppliers inserted into PearlGate database'; END $$;
