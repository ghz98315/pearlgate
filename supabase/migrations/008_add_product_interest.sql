-- =============================================
-- 给 leads 加 product_interest 字段
-- 目的:在 admin Leads 列表里直接看到客户对什么产品感兴趣
-- =============================================

ALTER TABLE leads
  ADD COLUMN IF NOT EXISTS product_interest TEXT;

-- 重建 leads_overview 视图,补上 product_interest
-- 注意: CREATE OR REPLACE VIEW 只允许在末尾追加列,不能改已有列的顺序/名字
-- 所以 product_interest 必须放在 SELECT 的最后(放中间会报 42P16)
CREATE OR REPLACE VIEW leads_overview AS
SELECT
  l.id,
  l.email,
  l.full_name,
  l.company,
  l.country,
  l.sources,
  l.score,
  l.status,
  l.first_seen_at,
  l.last_seen_at,
  (SELECT COUNT(*) FROM lead_events e WHERE e.lead_id = l.id) AS event_count,
  (SELECT source FROM lead_events e WHERE e.lead_id = l.id ORDER BY occurred_at DESC LIMIT 1) AS last_source,
  l.product_interest
FROM leads l
ORDER BY l.score DESC, l.last_seen_at DESC;

COMMENT ON COLUMN leads.product_interest IS 'Free-text product/category the lead is interested in. First non-null wins (not overwritten by later events).';
