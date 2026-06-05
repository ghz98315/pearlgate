# PearlGate Sourcing - API Specification

**Version**: 2.1.0  
**Last Updated**: 2026-06-06  
**Base URL**: https://www.pearlgatesourcing.com/api

---

## 目录

1. [博客系统 API](#博客系统-api)
2. [邮件订阅 API](#邮件订阅-api)
3. [供应商匹配 API](#供应商匹配-api)
4. [认证说明](#认证说明)
5. [错误处理](#错误处理)

---

## 博客系统 API

### 1. 创建文章

**Endpoint**: `POST /api/blog/create`

**认证**: 需要 Bearer Token

**请求头**:
```
Authorization: Bearer {ADMIN_TOKEN}
Content-Type: application/json
```

**请求体**:
```json
{
  "title": "文章标题",
  "slug": "article-slug",
  "content": "Markdown 格式内容",
  "category": "Sourcing Guide",
  "tags": ["Sourcing", "China", "Factory Audit"],
  "author": "Alex Guan",
  "readTime": "8 min read",
  "status": "draft",
  
  // SEO 字段
  "metaTitle": "SEO 标题（可选，默认使用 title）",
  "metaDescription": "SEO 描述（150-160字符）",
  "focusKeyword": "主关键词",
  "keywords": ["关键词1", "关键词2"],
  "ogTitle": "Open Graph 标题（可选）",
  "ogDescription": "Open Graph 描述（可选）",
  "ogImage": "https://example.com/image.jpg",
  
  // 图片
  "featuredImage": "https://example.com/featured.jpg",
  
  // 可选字段
  "excerpt": "文章摘要",
  "canonicalUrl": "https://canonical-url.com",
  "noindex": false,
  "nofollow": false
}
```

**响应**:
```json
{
  "success": true,
  "postId": "f9f64b00-66e0-4452-abd6-89283c7deb22",
  "slug": "article-slug",
  "status": "draft"
}
```

**错误响应**:
```json
{
  "error": "A post with this slug already exists"
}
```

**状态码**:
- `201` - 创建成功
- `400` - 请求参数错误
- `401` - 未授权
- `409` - Slug 已存在

---

### 2. 获取文章列表

**Endpoint**: `GET /api/blog`

**认证**: 不需要（只返回已发布文章）

**查询参数**:
```
?limit=10           // 每页数量（默认 10，最大 100）
&offset=0           // 偏移量（默认 0）
&search=keyword     // 搜索关键词（标题或内容）
&category=Sourcing  // 按分类过滤
&slug=article-slug  // 按 slug 查询单篇
```

**响应**:
```json
{
  "posts": [
    {
      "id": "f9f64b00-66e0-4452-abd6-89283c7deb22",
      "slug": "article-slug",
      "title": "文章标题",
      "description": "文章描述",
      "category": "Sourcing Guide",
      "tags": ["Sourcing", "China"],
      "author": "Alex Guan",
      "readTime": "8 min read",
      "featuredImage": "https://...",
      "publishedAt": "2026-06-05T15:30:00Z",
      "excerpt": "文章摘要"
    }
  ],
  "total": 1,
  "limit": 10,
  "offset": 0
}
```

**按 slug 查询单篇**:
```
GET /api/blog?slug=article-slug
```

响应单篇文章的完整信息（包括 content）。

**状态码**:
- `200` - 成功
- `400` - 参数错误

---

### 3. 获取文章详情

**Endpoint**: `GET /api/blog/[id]`

**认证**: 不需要

**路径参数**:
- `id` - 文章 ID（UUID）

**响应**:
```json
{
  "id": "f9f64b00-66e0-4452-abd6-89283c7deb22",
  "slug": "article-slug",
  "title": "文章标题",
  "content": "完整 Markdown 内容",
  "description": "文章描述",
  "category": "Sourcing Guide",
  "tags": ["Sourcing", "China"],
  "author": "Alex Guan",
  "readTime": "8 min read",
  "featuredImage": "https://...",
  "images": [
    {
      "id": "image-uuid",
      "url": "https://...",
      "alt": "图片描述",
      "caption": "图片说明"
    }
  ],
  "status": "published",
  "publishedAt": "2026-06-05T15:30:00Z",
  "createdAt": "2026-06-05T14:00:00Z",
  "updatedAt": "2026-06-05T15:00:00Z",
  
  // SEO 字段
  "ogTitle": "Open Graph 标题",
  "ogDescription": "Open Graph 描述",
  "ogImage": "https://..."
}
```

**状态码**:
- `200` - 成功
- `404` - 文章不存在

---

### 4. 更新文章

**Endpoint**: `PUT /api/blog/[id]`

**认证**: 需要 Bearer Token

**请求头**:
```
Authorization: Bearer {ADMIN_TOKEN}
Content-Type: application/json
```

**路径参数**:
- `id` - 文章 ID（UUID）

**请求体**（部分更新）:
```json
{
  "title": "新标题",
  "content": "新内容",
  "status": "published",
  "published_at": "2026-06-06T10:00:00Z",
  "metaDescription": "新描述",
  "featuredImage": "https://..."
}
```

**响应**:
```json
{
  "success": true,
  "postId": "f9f64b00-66e0-4452-abd6-89283c7deb22",
  "status": "published",
  "publishedAt": "2026-06-06T10:00:00+00:00"
}
```

**状态码**:
- `200` - 更新成功
- `400` - 参数错误
- `401` - 未授权
- `404` - 文章不存在
- `409` - Slug 冲突

---

### 5. 删除文章

**Endpoint**: `DELETE /api/blog/[id]`

**认证**: 需要 Bearer Token

**请求头**:
```
Authorization: Bearer {ADMIN_TOKEN}
```

**路径参数**:
- `id` - 文章 ID（UUID）

**响应**:
```json
{
  "success": true,
  "postId": "f9f64b00-66e0-4452-abd6-89283c7deb22"
}
```

**状态码**:
- `200` - 删除成功
- `401` - 未授权
- `404` - 文章不存在

---

### 6. 预览草稿文章

**Endpoint**: `GET /blog/[slug]?preview=true`

**说明**: 
- 在博客详情页 URL 添加 `?preview=true` 可以预览草稿状态的文章
- 无需认证，但文章必须存在于数据库
- 页面顶部会显示橙色预览提示条

---

## 邮件订阅 API

### 创建订阅

**Endpoint**: `POST /api/subscribe`

**认证**: 不需要

**请求体**:
```json
{
  "email": "user@example.com",
  "source": "blog_article"
}
```

**响应**:
```json
{
  "success": true,
  "message": "Subscription successful"
}
```

**状态码**:
- `200` - 订阅成功
- `400` - 邮箱格式错误
- `409` - 邮箱已订阅

---

## 供应商匹配 API

### 提交询价请求

**Endpoint**: `POST /api/supplier-match`

**认证**: 不需要

**请求体**:
```json
{
  "name": "张三",
  "email": "user@example.com",
  "company": "ABC Company",
  "product": "EV Charging Cables",
  "quantity": "10000 units",
  "timeline": "Q2 2026",
  "message": "详细需求描述"
}
```

**响应**:
```json
{
  "success": true,
  "inquiryId": "inquiry-uuid",
  "message": "Your inquiry has been received"
}
```

**状态码**:
- `200` - 提交成功
- `400` - 参数错误

---

## 认证说明

### Bearer Token 认证

某些操作需要管理员权限，使用 Bearer Token 认证：

**请求头**:
```
Authorization: Bearer {ADMIN_TOKEN}
```

**Token 配置**:
- 环境变量: `ADMIN_TOKEN`
- 默认值: `pearlgate-admin-2026-secure-token`（生产环境应修改）

**需要认证的端点**:
- `POST /api/blog/create`
- `PUT /api/blog/[id]`
- `DELETE /api/blog/[id]`

---

## 错误处理

### 标准错误响应

所有 API 错误统一返回以下格式：

```json
{
  "error": "错误描述",
  "details": "详细错误信息（可选）"
}
```

### HTTP 状态码

| 状态码 | 含义 | 说明 |
|--------|------|------|
| 200 | OK | 请求成功 |
| 201 | Created | 资源创建成功 |
| 400 | Bad Request | 请求参数错误 |
| 401 | Unauthorized | 未授权或 Token 无效 |
| 404 | Not Found | 资源不存在 |
| 409 | Conflict | 资源冲突（如 slug 重复） |
| 500 | Internal Server Error | 服务器内部错误 |

### 常见错误

**400 Bad Request**:
```json
{
  "error": "Invalid request parameters",
  "details": "Title is required"
}
```

**401 Unauthorized**:
```json
{
  "error": "Unauthorized",
  "details": "Invalid or missing authentication token"
}
```

**404 Not Found**:
```json
{
  "error": "Post not found"
}
```

**409 Conflict**:
```json
{
  "error": "A post with this slug already exists"
}
```

**500 Internal Server Error**:
```json
{
  "error": "Internal server error",
  "details": "Database connection failed"
}
```

---

## 数据模型

### Blog Post 字段说明

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| id | UUID | 自动 | 文章唯一标识符 |
| slug | string | 是 | URL 友好的唯一标识 |
| title | string | 是 | 文章标题 |
| content | text | 是 | Markdown 格式内容 |
| category | string | 否 | 文章分类 |
| tags | array | 否 | 标签数组 |
| author | string | 否 | 作者名称 |
| read_time | string | 否 | 阅读时间（如 "8 min read"） |
| status | enum | 是 | draft 或 published |
| featured_image | string | 否 | 特色图片 URL |
| excerpt | text | 否 | 文章摘要 |
| meta_title | string | 否 | SEO 标题 |
| meta_description | string | 否 | SEO 描述（150-160字符） |
| focus_keyword | string | 否 | 主关键词 |
| keywords | array | 否 | 关键词数组 |
| og_title | string | 否 | Open Graph 标题 |
| og_description | string | 否 | Open Graph 描述 |
| og_image | string | 否 | Open Graph 图片 |
| canonical_url | string | 否 | 规范 URL |
| noindex | boolean | 否 | 是否阻止索引（默认 false） |
| nofollow | boolean | 否 | 是否阻止跟随链接（默认 false） |
| published_at | timestamp | 否 | 发布时间 |
| created_at | timestamp | 自动 | 创建时间 |
| updated_at | timestamp | 自动 | 更新时间 |

---

## 使用示例

### 示例 1: 创建并发布文章

```bash
# 1. 创建草稿
curl -X POST https://www.pearlgatesourcing.com/api/blog/create \
  -H "Authorization: Bearer pearlgate-admin-2026-secure-token" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "新文章标题",
    "slug": "new-article-2026",
    "content": "# 标题\n\n内容...",
    "category": "Sourcing Guide",
    "tags": ["Sourcing", "China"],
    "author": "Alex Guan",
    "readTime": "5 min read",
    "status": "draft",
    "metaDescription": "文章描述",
    "featuredImage": "https://..."
  }'

# 2. 发布文章
curl -X PUT https://www.pearlgatesourcing.com/api/blog/{post-id} \
  -H "Authorization: Bearer pearlgate-admin-2026-secure-token" \
  -H "Content-Type: application/json" \
  -d '{
    "status": "published",
    "published_at": "2026-06-06T10:00:00Z"
  }'
```

### 示例 2: 搜索文章

```bash
# 搜索包含 "EV charging" 的文章
curl "https://www.pearlgatesourcing.com/api/blog?search=EV%20charging&limit=5"

# 按分类过滤
curl "https://www.pearlgatesourcing.com/api/blog?category=Sourcing%20Guide"

# 按 slug 查询
curl "https://www.pearlgatesourcing.com/api/blog?slug=reliable-ev-charging-suppliers-china"
```

### 示例 3: 更新文章内容

```bash
curl -X PUT https://www.pearlgatesourcing.com/api/blog/{post-id} \
  -H "Authorization: Bearer pearlgate-admin-2026-secure-token" \
  -H "Content-Type: application/json" \
  -d '{
    "content": "更新后的内容...",
    "metaDescription": "更新后的描述"
  }'
```

---

## Python 客户端示例

### 创建文章

```python
import requests

API_URL = "https://www.pearlgatesourcing.com/api/blog/create"
ADMIN_TOKEN = "pearlgate-admin-2026-secure-token"

payload = {
    "title": "新文章标题",
    "slug": "new-article-2026",
    "content": "# 标题\n\n内容...",
    "category": "Sourcing Guide",
    "tags": ["Sourcing", "China"],
    "author": "Alex Guan",
    "readTime": "5 min read",
    "status": "draft",
    "metaDescription": "文章描述",
    "featuredImage": "https://..."
}

headers = {
    "Authorization": f"Bearer {ADMIN_TOKEN}",
    "Content-Type": "application/json"
}

response = requests.post(API_URL, json=payload, headers=headers)

if response.status_code == 201:
    data = response.json()
    print(f"文章创建成功！ID: {data['postId']}")
else:
    print(f"错误: {response.json()}")
```

### 获取文章列表

```python
import requests

API_URL = "https://www.pearlgatesourcing.com/api/blog"

params = {
    "limit": 10,
    "offset": 0,
    "search": "EV charging",
    "category": "Sourcing Guide"
}

response = requests.get(API_URL, params=params)

if response.status_code == 200:
    data = response.json()
    print(f"找到 {data['total']} 篇文章")
    for post in data['posts']:
        print(f"- {post['title']} ({post['slug']})")
else:
    print(f"错误: {response.json()}")
```

---

## 版本历史

### v2.1.0 (2026-06-06)
- ✅ 添加完整博客系统 API
- ✅ 支持 SEO 字段（meta_title, focus_keyword, keywords）
- ✅ 支持图片管理
- ✅ 支持预览模式
- ✅ 新旧字段兼容

### v2.0.0 (2026-06-01)
- ✅ 邮件订阅 API
- ✅ 供应商匹配 API

### v1.0.0 (2026-05-01)
- ✅ 初始版本

---

## 技术支持

**文档问题**: 查看 `ref-doc/phase2.1-blog-api-documentation.md`  
**数据库设计**: 查看 `ref-doc/phase2.1-blog-database-design.md`  
**SEO 指南**: 查看 `ref-doc/phase2.1-blog-seo-guide.md`  
**完成总结**: 查看 `ref-doc/phase-2.1-completion-summary.md`

**在线文档**: https://www.pearlgatesourcing.com/docs/api  
**GitHub**: https://github.com/ghz98315/pearlgate
