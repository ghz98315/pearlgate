-- =============================================
-- PearlGate Leads Management
-- 统一邮箱主表 + 接触事件流水
-- 目标:把所有入口收集的邮箱集中归档,避免靠本地 JSON 丢资产
-- =============================================

-- =============================================
-- Table: leads
-- 一个邮箱一行;来源累积、首次/最近接触时间、最高 score
-- =============================================
CREATE TABLE IF NOT EXISTS leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- 邮箱(强制小写、去空格,作为业务唯一键)
  email TEXT UNIQUE NOT NULL,

  -- 基础画像(允许 null,因为 newsletter 订阅只有 email)
  full_name TEXT,
  company TEXT,
  country TEXT,
  whatsapp TEXT,

  -- 来源累积:每次新来源 append 进数组(去重)
  -- 例: ['newsletter','quote','sample_request']
  sources TEXT[] DEFAULT '{}',

  -- 最高优先级来源(用于 admin 排序)
  -- newsletter=10, resource_download=20, quote=50, sample_request=80
  score INTEGER DEFAULT 0,

  -- 状态
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'qualified', 'converted', 'archived')),

  -- 时间戳
  first_seen_at TIMESTAMPTZ DEFAULT NOW(),
  last_seen_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  -- 备注/扩展
  notes TEXT
);

CREATE INDEX IF NOT EXISTS idx_leads_email ON leads(email);
CREATE INDEX IF NOT EXISTS idx_leads_score ON leads(score DESC);
CREATE INDEX IF NOT EXISTS idx_leads_last_seen ON leads(last_seen_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_sources ON leads USING GIN (sources);

-- =============================================
-- Table: lead_events
-- 每次接触一行流水,保留原始 metadata 用于追溯
-- =============================================
CREATE TABLE IF NOT EXISTS lead_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id UUID REFERENCES leads(id) ON DELETE CASCADE,

  -- 事件类型: newsletter / quote / sample_request / resource_download / register
  source TEXT NOT NULL,

  -- 事件分数(用于更新 leads.score = max)
  score INTEGER DEFAULT 0,

  -- 原始表单数据(询价的产品类目、样品的 reference_id 等)
  metadata JSONB DEFAULT '{}'::jsonb,

  -- 来源追踪
  user_agent TEXT,
  ip_address INET,
  referrer TEXT,

  occurred_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_lead_events_lead_id ON lead_events(lead_id);
CREATE INDEX IF NOT EXISTS idx_lead_events_source ON lead_events(source);
CREATE INDEX IF NOT EXISTS idx_lead_events_occurred_at ON lead_events(occurred_at DESC);

-- =============================================
-- Trigger: 自动维护 updated_at
-- =============================================
CREATE OR REPLACE FUNCTION update_leads_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_leads_updated_at ON leads;
CREATE TRIGGER trg_leads_updated_at
BEFORE UPDATE ON leads
FOR EACH ROW
EXECUTE FUNCTION update_leads_updated_at();

-- =============================================
-- View: leads_overview
-- admin 后台用:每个 lead 的最近事件 + 总接触次数
-- =============================================
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
  (SELECT source FROM lead_events e WHERE e.lead_id = l.id ORDER BY occurred_at DESC LIMIT 1) AS last_source
FROM leads l
ORDER BY l.score DESC, l.last_seen_at DESC;

-- 完成
COMMENT ON TABLE leads IS 'Unified email-keyed customer master across all capture channels';
COMMENT ON TABLE lead_events IS 'Per-touch event log (one row per form submission / subscribe / download)';
