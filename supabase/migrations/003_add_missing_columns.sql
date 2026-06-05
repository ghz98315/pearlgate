-- 添加缺失的字段
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS canonical_url TEXT;
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS noindex BOOLEAN DEFAULT FALSE;
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS nofollow BOOLEAN DEFAULT FALSE;

SELECT 'Missing columns added successfully!' as status;
