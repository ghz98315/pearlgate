-- ====================================
-- Supabase 安全升级脚本
-- 分步执行，避免语法错误
-- ====================================

-- Step 1: 添加 SEO 字段
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS meta_title TEXT;
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS meta_description TEXT;
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS focus_keyword TEXT;
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS keywords TEXT[] DEFAULT '{}';

-- Step 2: 添加 Open Graph 字段
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS og_title TEXT;
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS og_description TEXT;
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS og_image TEXT;

-- Step 3: 添加标签和状态
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS tags TEXT[] DEFAULT '{}';
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'draft';
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS published_at TIMESTAMPTZ;

-- Step 4: 添加其他字段
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS excerpt TEXT;
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS author TEXT DEFAULT 'Alex Guan';
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS canonical_url TEXT;
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS noindex BOOLEAN DEFAULT FALSE;
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS nofollow BOOLEAN DEFAULT FALSE;

-- Step 5: 创建 blog_images 表
CREATE TABLE IF NOT EXISTS blog_images (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  post_id UUID REFERENCES blog_posts(id) ON DELETE CASCADE,
  filename TEXT NOT NULL,
  url TEXT NOT NULL,
  storage_path TEXT NOT NULL,
  alt_text TEXT NOT NULL,
  caption TEXT,
  width INTEGER,
  height INTEGER,
  size_bytes INTEGER,
  mime_type TEXT,
  is_featured BOOLEAN DEFAULT FALSE,
  display_order INTEGER DEFAULT 0,
  uploaded_at TIMESTAMPTZ DEFAULT NOW()
);

-- Step 6: 添加索引
CREATE INDEX IF NOT EXISTS idx_blog_posts_status ON blog_posts(status);
CREATE INDEX IF NOT EXISTS idx_blog_posts_category ON blog_posts(category);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published_at ON blog_posts(published_at DESC NULLS LAST);
CREATE INDEX IF NOT EXISTS idx_blog_posts_keywords ON blog_posts USING GIN (keywords);
CREATE INDEX IF NOT EXISTS idx_blog_posts_tags ON blog_posts USING GIN (tags);
CREATE INDEX IF NOT EXISTS idx_blog_images_post_id ON blog_images(post_id);

-- Step 7: 添加触发器函数
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Step 8: 创建触发器
DROP TRIGGER IF EXISTS update_blog_posts_updated_at ON blog_posts;
CREATE TRIGGER update_blog_posts_updated_at
BEFORE UPDATE ON blog_posts
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- 完成！
SELECT 'Migration completed successfully!' as status;
