-- =============================================
-- PearlGate Blog Management System - Database Schema
-- Version: 1.0
-- Date: 2026-06-05
-- =============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =============================================
-- Table: blog_posts
-- 存储所有博客文章
-- =============================================
CREATE TABLE blog_posts (
  -- 基础字段
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,

  -- 内容
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,  -- 自动从 content 或 meta_description 提取

  -- SEO 核心
  meta_title TEXT,
  meta_description TEXT NOT NULL,
  focus_keyword TEXT,
  keywords TEXT[] DEFAULT '{}',

  -- Open Graph (社交分享)
  og_title TEXT,
  og_description TEXT,
  og_image TEXT,

  -- 分类和标签
  category TEXT NOT NULL,
  tags TEXT[] DEFAULT '{}',

  -- 媒体
  featured_image TEXT,

  -- 状态管理
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  author TEXT DEFAULT 'Alex Guan',

  -- 时间
  read_time TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  published_at TIMESTAMPTZ,

  -- 高级 SEO
  canonical_url TEXT,
  noindex BOOLEAN DEFAULT FALSE,
  nofollow BOOLEAN DEFAULT FALSE,

  -- 约束
  CONSTRAINT slug_format CHECK (slug ~ '^[a-z0-9-]+$'),
  CONSTRAINT meta_description_length CHECK (char_length(meta_description) >= 150 AND char_length(meta_description) <= 160),
  CONSTRAINT title_length CHECK (char_length(title) >= 10 AND char_length(title) <= 100)
);

-- 索引优化
CREATE INDEX idx_blog_posts_status ON blog_posts(status);
CREATE INDEX idx_blog_posts_category ON blog_posts(category);
CREATE INDEX idx_blog_posts_published_at ON blog_posts(published_at DESC NULLS LAST);
CREATE INDEX idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX idx_blog_posts_keywords ON blog_posts USING GIN (keywords);
CREATE INDEX idx_blog_posts_tags ON blog_posts USING GIN (tags);

-- =============================================
-- Table: blog_images
-- 存储博客图片信息
-- =============================================
CREATE TABLE blog_images (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  post_id UUID REFERENCES blog_posts(id) ON DELETE CASCADE,

  -- 文件信息
  filename TEXT NOT NULL,
  url TEXT NOT NULL,
  storage_path TEXT NOT NULL,

  -- 图片元数据
  alt_text TEXT NOT NULL,
  caption TEXT,
  width INTEGER,
  height INTEGER,
  size_bytes INTEGER,
  mime_type TEXT,

  -- 状态
  is_featured BOOLEAN DEFAULT FALSE,
  display_order INTEGER DEFAULT 0,

  -- 时间
  uploaded_at TIMESTAMPTZ DEFAULT NOW(),

  -- 约束
  CONSTRAINT valid_mime_type CHECK (mime_type IN ('image/jpeg', 'image/png', 'image/webp')),
  CONSTRAINT max_size CHECK (size_bytes <= 524288) -- 512KB max
);

-- 索引
CREATE INDEX idx_blog_images_post_id ON blog_images(post_id);
CREATE INDEX idx_blog_images_is_featured ON blog_images(is_featured);

-- =============================================
-- Function: 自动更新 updated_at
-- =============================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for blog_posts
CREATE TRIGGER update_blog_posts_updated_at
BEFORE UPDATE ON blog_posts
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- =============================================
-- Function: 自动设置 published_at
-- =============================================
CREATE OR REPLACE FUNCTION set_published_at()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.status = 'published' AND OLD.status != 'published' THEN
        NEW.published_at = NOW();
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for setting published_at
CREATE TRIGGER set_blog_posts_published_at
BEFORE UPDATE ON blog_posts
FOR EACH ROW
EXECUTE FUNCTION set_published_at();

-- =============================================
-- Function: 自动生成 excerpt
-- =============================================
CREATE OR REPLACE FUNCTION generate_excerpt()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.excerpt IS NULL OR NEW.excerpt = '' THEN
        -- 从 meta_description 或 content 前 200 字符生成
        NEW.excerpt = COALESCE(
            NEW.meta_description,
            substring(regexp_replace(NEW.content, E'[\\n\\r]+', ' ', 'g') from 1 for 200) || '...'
        );
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for generating excerpt
CREATE TRIGGER generate_blog_excerpt
BEFORE INSERT OR UPDATE ON blog_posts
FOR EACH ROW
EXECUTE FUNCTION generate_excerpt();

-- =============================================
-- Row Level Security (RLS) - 可选
-- =============================================
-- 如果需要认证，启用 RLS
-- ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE blog_images ENABLE ROW LEVEL SECURITY;

-- 公开读取已发布文章
-- CREATE POLICY "Public can view published posts" ON blog_posts
--   FOR SELECT
--   USING (status = 'published');

-- 只有认证用户可以管理
-- CREATE POLICY "Authenticated users can manage posts" ON blog_posts
--   FOR ALL
--   USING (auth.role() = 'authenticated');

-- =============================================
-- 初始数据（可选）
-- =============================================
-- 插入分类选项（作为参考，实际可以是动态的）
COMMENT ON COLUMN blog_posts.category IS 'Valid categories: Sourcing Guide, Technical Guide, Market Analysis, Certification Guide, Supplier Verification';

-- =============================================
-- Views: 便捷查询
-- =============================================

-- 已发布文章视图（带图片统计）
CREATE VIEW published_posts_view AS
SELECT
  p.*,
  (SELECT json_agg(json_build_object(
    'id', i.id,
    'url', i.url,
    'alt', i.alt_text,
    'caption', i.caption
  ) ORDER BY i.display_order)
  FROM blog_images i
  WHERE i.post_id = p.id) as images,
  (SELECT COUNT(*) FROM blog_images WHERE post_id = p.id) as image_count
FROM blog_posts p
WHERE p.status = 'published'
ORDER BY p.published_at DESC;

-- 草稿视图
CREATE VIEW draft_posts_view AS
SELECT
  p.*,
  (SELECT COUNT(*) FROM blog_images WHERE post_id = p.id) as image_count
FROM blog_posts p
WHERE p.status = 'draft'
ORDER BY p.updated_at DESC;

-- =============================================
-- 示例查询
-- =============================================

-- 1. 获取所有已发布文章（分页）
-- SELECT * FROM published_posts_view LIMIT 10 OFFSET 0;

-- 2. 根据分类查询
-- SELECT * FROM blog_posts WHERE category = 'Sourcing Guide' AND status = 'published';

-- 3. 全文搜索（简单版）
-- SELECT * FROM blog_posts
-- WHERE status = 'published'
-- AND (title ILIKE '%EV charging%' OR content ILIKE '%EV charging%');

-- 4. 根据标签查询
-- SELECT * FROM blog_posts WHERE 'Sourcing' = ANY(tags);

-- 5. 获取文章及其所有图片
-- SELECT p.*,
--   json_agg(json_build_object('url', i.url, 'alt', i.alt_text)) as images
-- FROM blog_posts p
-- LEFT JOIN blog_images i ON i.post_id = p.id
-- WHERE p.slug = 'reliable-ev-charging-suppliers-china'
-- GROUP BY p.id;

-- =============================================
-- 性能优化建议
-- =============================================

-- 1. 定期 VACUUM ANALYZE
-- VACUUM ANALYZE blog_posts;
-- VACUUM ANALYZE blog_images;

-- 2. 如果需要全文搜索，可以添加 tsvector
-- ALTER TABLE blog_posts ADD COLUMN search_vector tsvector;
-- CREATE INDEX idx_blog_posts_search ON blog_posts USING GIN (search_vector);

-- 3. 定期清理 archived 文章（如果需要）
-- DELETE FROM blog_posts WHERE status = 'archived' AND updated_at < NOW() - INTERVAL '1 year';
