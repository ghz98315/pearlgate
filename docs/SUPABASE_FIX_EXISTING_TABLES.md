# Supabase 数据库检查和修复指南

## 问题：表已存在

错误信息：`relation "blog_posts" already exists`

说明你的 Supabase 数据库中已经有 `blog_posts` 表了，但可能是旧结构。

---

## 解决方案 1：检查现有表结构（推荐）

### Step 1: 查看现有表字段

在 Supabase Dashboard → SQL Editor 运行：

```sql
-- 查看 blog_posts 表结构
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'blog_posts'
ORDER BY ordinal_position;
```

### Step 2: 对比缺失的字段

**新结构需要的字段：**
- `meta_title`, `meta_description`, `focus_keyword`, `keywords`
- `og_title`, `og_description`, `og_image`
- `tags`, `status`, `published_at`
- `canonical_url`, `noindex`, `nofollow`

**如果缺少字段，运行 Migration 脚本添加：**

```sql
-- 添加缺失的 SEO 字段
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS meta_title TEXT;
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS meta_description TEXT;
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS focus_keyword TEXT;
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS keywords TEXT[] DEFAULT '{}';

-- Open Graph 字段
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS og_title TEXT;
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS og_description TEXT;
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS og_image TEXT;

-- 标签和状态
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS tags TEXT[] DEFAULT '{}';
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'draft';
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS published_at TIMESTAMPTZ;

-- 高级 SEO
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS canonical_url TEXT;
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS noindex BOOLEAN DEFAULT FALSE;
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS nofollow BOOLEAN DEFAULT FALSE;

-- 添加约束
ALTER TABLE blog_posts ADD CONSTRAINT IF NOT EXISTS status_check 
  CHECK (status IN ('draft', 'published', 'archived'));

-- 添加索引（如果不存在）
CREATE INDEX IF NOT EXISTS idx_blog_posts_status ON blog_posts(status);
CREATE INDEX IF NOT EXISTS idx_blog_posts_category ON blog_posts(category);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published_at ON blog_posts(published_at DESC NULLS LAST);
CREATE INDEX IF NOT EXISTS idx_blog_posts_keywords ON blog_posts USING GIN (keywords);
CREATE INDEX IF NOT EXISTS idx_blog_posts_tags ON blog_posts USING GIN (tags);
```

### Step 3: 创建 blog_images 表（如果不存在）

```sql
-- 检查 blog_images 表是否存在
SELECT EXISTS (
  SELECT FROM information_schema.tables 
  WHERE table_name = 'blog_images'
);

-- 如果不存在，创建 blog_images 表
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
  
  uploaded_at TIMESTAMPTZ DEFAULT NOW(),
  
  CONSTRAINT valid_mime_type CHECK (mime_type IN ('image/jpeg', 'image/png', 'image/webp')),
  CONSTRAINT max_size CHECK (size_bytes <= 524288)
);

CREATE INDEX IF NOT EXISTS idx_blog_images_post_id ON blog_images(post_id);
CREATE INDEX IF NOT EXISTS idx_blog_images_is_featured ON blog_images(is_featured);
```

### Step 4: 添加触发器（如果不存在）

```sql
-- 自动更新 updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_blog_posts_updated_at ON blog_posts;
CREATE TRIGGER update_blog_posts_updated_at
BEFORE UPDATE ON blog_posts
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- 自动设置 published_at
CREATE OR REPLACE FUNCTION set_published_at()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.status = 'published' AND (OLD.status IS NULL OR OLD.status != 'published') THEN
        NEW.published_at = NOW();
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_blog_posts_published_at ON blog_posts;
CREATE TRIGGER set_blog_posts_published_at
BEFORE UPDATE ON blog_posts
FOR EACH ROW
EXECUTE FUNCTION set_published_at();

-- 自动生成 excerpt
CREATE OR REPLACE FUNCTION generate_excerpt()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.excerpt IS NULL OR NEW.excerpt = '' THEN
        NEW.excerpt = COALESCE(
            NEW.meta_description,
            substring(regexp_replace(NEW.content, E'[\\n\\r]+', ' ', 'g') from 1 for 200) || '...'
        );
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS generate_blog_excerpt ON blog_posts;
CREATE TRIGGER generate_blog_excerpt
BEFORE INSERT OR UPDATE ON blog_posts
FOR EACH ROW
EXECUTE FUNCTION generate_excerpt();
```

---

## 解决方案 2：删除旧表重新创建（⚠️ 谨慎）

**⚠️ 警告：这会删除所有现有数据！**

```sql
-- 删除旧表
DROP TABLE IF EXISTS blog_images CASCADE;
DROP TABLE IF EXISTS blog_posts CASCADE;

-- 然后运行完整的 001_create_blog_tables.sql
```

---

## 解决方案 3：查看现有数据并迁移

```sql
-- 1. 查看现有数据
SELECT id, slug, title, category, status
FROM blog_posts
LIMIT 5;

-- 2. 如果有数据，先导出
COPY blog_posts TO '/tmp/blog_posts_backup.csv' WITH CSV HEADER;

-- 3. 删除表
DROP TABLE blog_posts CASCADE;

-- 4. 运行完整迁移脚本

-- 5. 导入数据（需要映射字段）
```

---

## 推荐操作流程

### 1️⃣ 先检查（不删除数据）

运行这个查询看看现有结构：

```sql
SELECT column_name, data_type
FROM information_schema.columns
WHERE table_name = 'blog_posts'
ORDER BY ordinal_position;
```

把结果发给我，我会告诉你需要添加哪些字段。

### 2️⃣ 增量添加缺失字段

使用上面 "Step 2" 的 ALTER TABLE 语句。

### 3️⃣ 创建 blog_images 表

使用上面 "Step 3" 的 CREATE TABLE 语句。

### 4️⃣ 添加触发器

使用上面 "Step 4" 的触发器语句。

---

## 快速修复脚本（安全版本）

直接在 SQL Editor 运行这个（不会删除数据）：

```sql
-- ====================================
-- 安全升级脚本：只添加缺失的字段和表
-- ====================================

-- 1. 添加缺失字段到 blog_posts
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS meta_title TEXT;
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS meta_description TEXT;
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS focus_keyword TEXT;
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS keywords TEXT[] DEFAULT '{}';
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS og_title TEXT;
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS og_description TEXT;
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS og_image TEXT;
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS tags TEXT[] DEFAULT '{}';
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'draft';
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS published_at TIMESTAMPTZ;
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS canonical_url TEXT;
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS noindex BOOLEAN DEFAULT FALSE;
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS nofollow BOOLEAN DEFAULT FALSE;
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS excerpt TEXT;
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS author TEXT DEFAULT 'Alex Guan';

-- 2. 创建 blog_images 表
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

-- 3. 添加索引
CREATE INDEX IF NOT EXISTS idx_blog_posts_status ON blog_posts(status);
CREATE INDEX IF NOT EXISTS idx_blog_posts_category ON blog_posts(category);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published_at ON blog_posts(published_at DESC NULLS LAST);
CREATE INDEX IF NOT EXISTS idx_blog_posts_keywords ON blog_posts USING GIN (keywords);
CREATE INDEX IF NOT EXISTS idx_blog_posts_tags ON blog_posts USING GIN (tags);
CREATE INDEX IF NOT EXISTS idx_blog_images_post_id ON blog_images(post_id);

-- 4. 添加触发器
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_blog_posts_updated_at ON blog_posts;
CREATE TRIGGER update_blog_posts_updated_at
BEFORE UPDATE ON blog_posts
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- 完成！
SELECT 'Migration completed successfully!' as status;
```

---

## 测试

运行完后，测试一下：

```sql
-- 查看表结构
\d blog_posts

-- 查看现有数据
SELECT * FROM blog_posts LIMIT 1;

-- 测试插入
INSERT INTO blog_posts (slug, title, content, meta_description, category, read_time, status)
VALUES ('test-post', 'Test Post', 'Test content', 
        'Test description with exactly 150 characters for SEO optimization and Google search results display on SERP pages and social media sharing.', 
        'Technical Guide', '5 min read', 'draft')
RETURNING *;
```

---

**把"快速修复脚本"复制到 SQL Editor 运行即可！** ✅

运行完告诉我结果。
