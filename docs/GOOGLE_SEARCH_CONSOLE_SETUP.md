# Google Search Console 设置指南

**日期**: 2026-06-06  
**网站**: https://www.pearlgatesourcing.com

---

## 🎯 目标

将博客文章提交到 Google 搜索，实现：
1. 验证网站所有权
2. 提交 Sitemap
3. 请求索引单篇文章
4. 监控搜索表现

---

## 📋 Step 1: 验证网站所有权

### 方法 A：HTML 文件验证（推荐）

**1.1 访问 Google Search Console**
- URL: https://search.google.com/search-console
- 登录你的 Google 账号

**1.2 添加资源**
- 点击左上角下拉菜单
- 选择"添加资源"
- 选择"网址前缀"
- 输入: `https://www.pearlgatesourcing.com`
- 点击"继续"

**1.3 下载验证文件**
- 选择"HTML 文件"验证方法
- 下载 `google-site-verification: googleXXXXXXXXXXXXXXXX.html` 文件
- **记下文件名**（包含你的唯一验证码）

**1.4 上传验证文件**
```bash
# 创建验证文件
# 文件名示例: google1234567890abcdef.html
# 内容: google-site-verification: google1234567890abcdef.html

# 将文件放到 public 目录
# 位置: public/google1234567890abcdef.html
```

**1.5 提交验证**
```bash
# 提交代码
git add public/google*.html
git commit -m "feat: 添加 Google Search Console 验证文件"
git push origin master

# 等待 Vercel 部署（2分钟）
# 访问: https://www.pearlgatesourcing.com/google1234567890abcdef.html
# 确认可访问后，在 Search Console 点击"验证"
```

---

### 方法 B：HTML 标签验证

**1.1 获取 Meta 标签**
在 Search Console 选择"HTML 标签"方法，复制 meta 标签：
```html
<meta name="google-site-verification" content="YOUR_VERIFICATION_CODE" />
```

**1.2 添加到网站**
编辑 `src/app/layout.tsx`，在 `<head>` 中添加：

```typescript
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta name="google-site-verification" content="YOUR_VERIFICATION_CODE" />
      </head>
      <body>{children}</body>
    </html>
  )
}
```

**1.3 提交验证**
```bash
git add src/app/layout.tsx
git commit -m "feat: 添加 Google Search Console 验证标签"
git push origin master
```

---

### 方法 C：DNS 验证（高级）

**1.1 获取 TXT 记录**
在 Search Console 选择"域名提供商"方法，获取 TXT 记录值。

**1.2 添加 DNS 记录**
登录你的域名服务商（如 Namecheap, GoDaddy），添加 TXT 记录：
```
类型: TXT
主机: @
值: google-site-verification=XXXXXXXXXX
```

**1.3 等待 DNS 生效**
通常需要 10 分钟到 48 小时。

---

## 📋 Step 2: 生成并提交 Sitemap

### 2.1 创建 Sitemap

**选项 A：手动创建**

创建 `public/sitemap.xml`:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- 首页 -->
  <url>
    <loc>https://www.pearlgatesourcing.com/</loc>
    <lastmod>2026-06-06</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  
  <!-- 博客列表 -->
  <url>
    <loc>https://www.pearlgatesourcing.com/blog</loc>
    <lastmod>2026-06-06</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  
  <!-- 第一篇文章 -->
  <url>
    <loc>https://www.pearlgatesourcing.com/blog/reliable-ev-charging-suppliers-china</loc>
    <lastmod>2026-06-05</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  
  <!-- 其他页面 -->
  <url>
    <loc>https://www.pearlgatesourcing.com/supplier-match</loc>
    <lastmod>2026-06-01</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  
  <url>
    <loc>https://www.pearlgatesourcing.com/factory-verification</loc>
    <lastmod>2026-06-01</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
</urlset>
```

**选项 B：动态生成（推荐）**

创建 `src/app/sitemap.ts`:

```typescript
import { MetadataRoute } from 'next'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // 获取所有已发布文章
  const { data: posts } = await supabase
    .from('blog_posts')
    .select('slug, updated_at')
    .eq('status', 'published')
    .order('published_at', { ascending: false })

  const blogUrls = posts?.map((post) => ({
    url: `https://www.pearlgatesourcing.com/blog/${post.slug}`,
    lastModified: new Date(post.updated_at),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  })) || []

  return [
    {
      url: 'https://www.pearlgatesourcing.com',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: 'https://www.pearlgatesourcing.com/blog',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    ...blogUrls,
    {
      url: 'https://www.pearlgatesourcing.com/supplier-match',
      lastModified: new Date('2026-06-01'),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: 'https://www.pearlgatesourcing.com/factory-verification',
      lastModified: new Date('2026-06-01'),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ]
}
```

### 2.2 提交 Sitemap

**在 Search Console 中**:
1. 左侧菜单 → "Sitemaps"
2. 输入: `sitemap.xml`
3. 点击"提交"

**验证 Sitemap**:
```bash
# 访问确认
https://www.pearlgatesourcing.com/sitemap.xml
```

---

## 📋 Step 3: 请求索引单篇文章

### 3.1 使用 URL 检查工具

**在 Search Console 中**:
1. 顶部搜索框输入完整 URL:
   ```
   https://www.pearlgatesourcing.com/blog/reliable-ev-charging-suppliers-china
   ```
2. 点击"请求编入索引"
3. 等待 Google 抓取（通常 1-7 天）

### 3.2 批量提交（可选）

使用 Google Indexing API（需要 API 密钥）：

```python
# 需要先在 Google Cloud Console 启用 Indexing API
# 详细步骤: https://developers.google.com/search/apis/indexing-api/v3/quickstart

from google.oauth2 import service_account
from googleapiclient.discovery import build

credentials = service_account.Credentials.from_service_account_file(
    'service-account.json',
    scopes=['https://www.googleapis.com/auth/indexing']
)

service = build('indexing', 'v3', credentials=credentials)

urls = [
    'https://www.pearlgatesourcing.com/blog/reliable-ev-charging-suppliers-china'
]

for url in urls:
    body = {
        'url': url,
        'type': 'URL_UPDATED'
    }
    response = service.urlNotifications().publish(body=body).execute()
    print(f"索引请求已提交: {url}")
```

---

## 📋 Step 4: 创建 robots.txt

创建 `public/robots.txt`:

```txt
# 允许所有搜索引擎抓取
User-agent: *
Allow: /

# Sitemap 位置
Sitemap: https://www.pearlgatesourcing.com/sitemap.xml

# 阻止抓取敏感目录（如果有）
Disallow: /api/
Disallow: /_next/
```

提交：
```bash
git add public/robots.txt
git commit -m "feat: 添加 robots.txt"
git push origin master
```

---

## 📊 监控和优化

### 5.1 监控索引状态

**在 Search Console 中查看**:
- "效果" → 查看点击、展示、CTR
- "覆盖范围" → 查看已索引页面
- "页面体验" → 查看 Core Web Vitals

### 5.2 优化建议

**结构化数据**（已完成 ✅）:
- 文章已包含 JSON-LD 结构化数据
- Open Graph 标签完整
- Meta 标签优化

**内部链接**:
- 在其他页面添加到博客文章的链接
- 博客列表页链接到文章详情页

**外部链接**:
- 分享到社交媒体（LinkedIn, Twitter）
- 提交到行业目录
- 发布到相关论坛

---

## ✅ 快速行动清单

**立即执行**:

1. [ ] 访问 Google Search Console
2. [ ] 添加资源（网址前缀）
3. [ ] 下载验证文件（或复制 meta 标签）
4. [ ] 上传验证文件到 `public/` 目录
5. [ ] 提交代码并部署
6. [ ] 在 Search Console 点击"验证"
7. [ ] 创建 Sitemap（动态或静态）
8. [ ] 提交 Sitemap
9. [ ] 请求索引文章 URL
10. [ ] 创建 robots.txt

**等待结果**:
- 验证: 即时
- Sitemap 处理: 几小时
- 索引: 1-7 天
- 搜索出现: 1-2 周

---

## 🚀 后续优化

**自动化**:
1. 每次发布新文章自动更新 Sitemap
2. 使用 Indexing API 自动提交新 URL
3. 定期检查索引状态

**SEO 增强**:
1. 添加更多内部链接
2. 优化页面加载速度
3. 增加反向链接
4. 定期更新内容

---

## 📞 需要帮助？

**常见问题**:
1. 验证失败 → 确认文件/标签已部署到生产环境
2. Sitemap 错误 → 检查 XML 格式和 URL 有效性
3. 未被索引 → 等待更长时间，或使用 URL 检查工具

**资源**:
- Google Search Console: https://search.google.com/search-console
- Sitemap 协议: https://www.sitemaps.org/
- Indexing API: https://developers.google.com/search/apis/indexing-api
