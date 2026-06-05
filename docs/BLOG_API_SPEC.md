# PearlGate Blog API 规范 v1.0

> **目标受众：** Hermes (AI 文档生成系统) 和开发人员  
> **更新日期：** 2026-06-05  
> **状态：** Phase 2.1 开发中

---

## 📋 概述

本文档定义了 PearlGate 博客管理系统的 API 规范，供 Hermes 自动生成和上传博客文章使用。

### 核心功能
- ✅ 创建草稿文章
- ✅ 上传图片（支持 base64 和 multipart）
- ✅ 发布/下线管理
- ✅ SEO 字段完整支持
- ✅ Markdown 内容渲染

---

## 🔐 认证

所有 API 请求需要在 Header 中包含 token：

```http
Authorization: Bearer {ADMIN_TOKEN}
Content-Type: application/json
```

**获取 token：** 联系管理员或在 `.env.local` 中配置 `ADMIN_TOKEN`

---

## 📝 SEO 要求说明（Hermes 必读）

### 必填字段验证

| 字段 | 类型 | 长度限制 | 规则 | 示例 |
|------|------|----------|------|------|
| `title` | string | 50-60 字符 | 包含主关键词，吸引点击 | "How to Find Reliable EV Charging Suppliers in China" |
| `slug` | string | 3-60 字符 | 小写字母、数字、连字符，无特殊字符 | "reliable-ev-charging-suppliers-china" |
| `metaDescription` | string | 150-160 字符 | 包含关键词，行动导向 | "Learn how to find reliable EV charging suppliers in China's Pearl River Delta..." |
| `content` | string | 1500-3000 字 | Markdown 格式，清晰 H2/H3 结构 | "# Title\n\n## Section..." |
| `category` | string | - | 固定选项之一 | "Sourcing Guide" |
| `readTime` | string | - | 格式 "X min read" | "10 min read" |

### SEO 优化字段

| 字段 | 类型 | 说明 | 示例 |
|------|------|------|------|
| `focusKeyword` | string | 主关键词（1-3 个词） | "EV charging suppliers China" |
| `keywords` | string[] | 3-5 个相关关键词 | ["EV charging", "China suppliers", "factory audit"] |
| `tags` | string[] | 2-4 个标签 | ["Sourcing", "EV Charging", "China"] |
| `ogTitle` | string | Open Graph 标题（可选，默认用 title） | - |
| `ogDescription` | string | 社交分享描述（可选） | - |
| `ogImage` | string | 社交分享图片 URL | - |

### 分类选项（Category）

- `Sourcing Guide` - 采购指南
- `Technical Guide` - 技术指南
- `Market Analysis` - 市场分析
- `Certification Guide` - 认证指南
- `Supplier Verification` - 供应商验证

### 内容结构要求

```markdown
# 主标题（H1）- 自动从 title 生成

## 引言（100-150 字）
包含主关键词，说明文章解决什么问题

## H2 小标题 1
- 使用列表
- 清晰的段落（2-4 句）

### H3 子标题（如需要）

## H2 小标题 2

## FAQ（必须）
至少 5 个问题

## 总结/CTA
行动号召
```

---

## 🖼️ 图片要求

### Featured Image（题图）
- **尺寸：** 1920×1080px (16:9)
- **格式：** JPG (推荐) 或 PNG
- **大小：** <500KB
- **命名：** `{slug}-featured.jpg`
- **Alt 文本：** 描述性，包含关键词

### 内容图片
- **尺寸：** 1920×1080px 或 1200×800px
- **格式：** JPG/PNG
- **大小：** 每张 <300KB
- **命名：** `{slug}-{description}.jpg`
- **Alt 文本：** 必须，描述图片内容

### 图片类型建议

1. **对比表格图** - 可视化对比数据
2. **流程图** - 说明步骤或流程
3. **信息图** - 统计数据可视化
4. **红旗警示图** - 注意事项
5. **地图/位置图** - 地理信息

---

## 🔌 API 端点

### 1. POST /api/blog/create
创建新文章（草稿或直接发布）

**Request Body:**
```json
{
  "title": "How to Find Reliable EV Charging Suppliers in China",
  "slug": "reliable-ev-charging-suppliers-china",
  "content": "# How to Find Reliable EV Charging Suppliers in China\n\nChina's Pearl River Delta...",
  "metaDescription": "Learn how to find reliable EV charging suppliers in China's Pearl River Delta. Expert guide covers factory audits, certifications, and red flags to avoid.",
  "category": "Sourcing Guide",
  "readTime": "10 min read",
  "focusKeyword": "EV charging suppliers China",
  "keywords": ["EV charging", "China suppliers", "factory audit", "Pearl River Delta"],
  "tags": ["Sourcing", "EV Charging", "China"],
  "featuredImage": {
    "data": "base64_encoded_image_string",
    "alt": "Pearl River Delta EV charging equipment manufacturing hub - map showing Dongguan, Shenzhen, Guangzhou",
    "filename": "reliable-ev-charging-suppliers-china-featured.jpg"
  },
  "images": [
    {
      "data": "base64_encoded_image_string",
      "alt": "Comparison between consumer electronics and automotive-grade EV charging requirements",
      "filename": "consumer-vs-automotive-ev-charging.jpg",
      "caption": "Key differences in quality requirements"
    },
    {
      "data": "base64_encoded_image_string",
      "alt": "5 critical red flags when evaluating EV charging suppliers in China",
      "filename": "supplier-red-flags-ev-charging.jpg"
    }
  ],
  "status": "draft",
  "author": "Alex Guan"
}
```

**Response (Success):**
```json
{
  "success": true,
  "postId": "uuid-here",
  "slug": "reliable-ev-charging-suppliers-china",
  "status": "draft",
  "message": "Draft created successfully",
  "editUrl": "/admin/blog/edit/uuid-here",
  "previewUrl": "/blog/reliable-ev-charging-suppliers-china?preview=true"
}
```

**Response (Error):**
```json
{
  "success": false,
  "error": "Validation failed",
  "details": {
    "metaDescription": "Must be between 150-160 characters (current: 145)",
    "slug": "Slug already exists"
  }
}
```

---

### 2. POST /api/blog/upload-image
单独上传图片（用于已存在的文章）

**Request (multipart/form-data):**
```
file: [binary data]
alt: "Image alt text"
postId: "uuid" (optional - 如果关联到文章)
filename: "custom-name.jpg" (optional)
```

**Response:**
```json
{
  "success": true,
  "imageId": "uuid",
  "url": "https://storage.supabase.co/pearlgate/blog/reliable-ev-charging-suppliers-china-featured.jpg",
  "width": 1920,
  "height": 1080,
  "sizeKB": 245
}
```

---

### 3. GET /api/blog
获取文章列表

**Query Parameters:**
```
?status=published       # draft | published | archived
&category=Sourcing Guide
&limit=10
&offset=0
&search=EV charging
```

**Response:**
```json
{
  "posts": [
    {
      "id": "uuid",
      "slug": "reliable-ev-charging-suppliers-china",
      "title": "How to Find Reliable EV Charging Suppliers in China",
      "excerpt": "Learn how to find reliable EV charging suppliers...",
      "category": "Sourcing Guide",
      "tags": ["Sourcing", "EV Charging"],
      "status": "published",
      "publishedAt": "2026-06-05T10:00:00Z",
      "readTime": "10 min read",
      "featuredImage": "url",
      "author": "Alex Guan"
    }
  ],
  "total": 25,
  "limit": 10,
  "offset": 0
}
```

---

### 4. GET /api/blog/{slug}
获取单篇文章详情

**Response:**
```json
{
  "id": "uuid",
  "slug": "reliable-ev-charging-suppliers-china",
  "title": "How to Find Reliable EV Charging Suppliers in China",
  "content": "# How to Find...\n\n...",
  "metaDescription": "Learn how to...",
  "focusKeyword": "EV charging suppliers China",
  "keywords": ["EV charging", "China suppliers"],
  "category": "Sourcing Guide",
  "tags": ["Sourcing", "EV Charging"],
  "featuredImage": "url",
  "images": [
    {
      "url": "https://...",
      "alt": "...",
      "caption": "..."
    }
  ],
  "status": "published",
  "publishedAt": "2026-06-05T10:00:00Z",
  "createdAt": "2026-06-01T08:00:00Z",
  "updatedAt": "2026-06-05T09:00:00Z",
  "readTime": "10 min read",
  "author": "Alex Guan"
}
```

---

### 5. PUT /api/blog/{id}
更新文章

**Request:**
```json
{
  "title": "Updated title",
  "content": "Updated content...",
  "status": "published"
}
```

**Response:**
```json
{
  "success": true,
  "postId": "uuid",
  "status": "published",
  "publishedAt": "2026-06-05T10:00:00Z"
}
```

---

### 6. DELETE /api/blog/{id}
删除文章（软删除，改为 archived 状态）

**Response:**
```json
{
  "success": true,
  "message": "Post archived successfully"
}
```

---

## 📋 Hermes 集成检查清单

### 文章生成前
- [ ] 确认主关键词（搜索量 + 竞争度）
- [ ] 确认次级关键词（3-5 个）
- [ ] 确认内容大纲（H2 结构）

### 文章生成
- [ ] Title: 50-60 字符，包含主关键词
- [ ] Meta Description: 150-160 字符
- [ ] Slug: 小写字母数字连字符
- [ ] Content: 1500-3000 字
- [ ] H2/H3 结构清晰
- [ ] FAQ 章节（至少 5 个问题）
- [ ] 内链 4-6 个
- [ ] 外链 2-3 个（权威来源）

### 图片生成
- [ ] Featured Image: 1920×1080px, <500KB
- [ ] 内容图片: 3-5 张
- [ ] 每张图片都有 alt 文本
- [ ] 文件名描述性（小写连字符）

### API 提交
- [ ] 所有必填字段完整
- [ ] 图片 base64 编码正确
- [ ] 初始状态设为 "draft"
- [ ] 获取返回的 postId 和 editUrl

### 发布前检查
- [ ] 在 Admin 界面预览
- [ ] 检查图片显示
- [ ] 检查内链有效
- [ ] 运行 SEO 评分器
- [ ] 手动发布或定时发布

---

## 🚨 常见错误

### 1. Slug 重复
```json
{
  "error": "Slug already exists",
  "suggestion": "reliable-ev-charging-suppliers-china-2026"
}
```

### 2. Meta Description 太短/太长
```json
{
  "error": "Meta description must be 150-160 characters",
  "current": 145,
  "recommendation": "Add 5-15 more characters"
}
```

### 3. 图片太大
```json
{
  "error": "Image size exceeds 500KB limit",
  "current": "750KB",
  "recommendation": "Compress image before upload"
}
```

### 4. 缺少必填字段
```json
{
  "error": "Missing required fields",
  "missing": ["metaDescription", "category"]
}
```

---

## 📊 SEO 评分标准（自动计算）

| 项目 | 权重 | 评分标准 |
|------|------|----------|
| Title 优化 | 15% | 长度 50-60 字符，包含关键词 |
| Meta Description | 15% | 长度 150-160 字符，包含关键词 |
| 关键词密度 | 10% | 1-2%，自然分布 |
| 内容长度 | 10% | 1500-3000 字 |
| H2/H3 结构 | 10% | 清晰层次，包含关键词 |
| 图片优化 | 10% | Alt 文本完整，尺寸合适 |
| 内链数量 | 10% | 4-6 个内链 |
| 外链质量 | 10% | 2-3 个权威外链 |
| FAQ 章节 | 5% | 至少 5 个问题 |
| 可读性 | 5% | 段落简短，列表清晰 |

**总分 100 分，≥80 分可发布**

---

## 🔄 工作流示例（Hermes）

```python
import requests
import base64

# 1. 准备数据
article = {
    "title": "How to Find Reliable EV Charging Suppliers in China",
    "slug": "reliable-ev-charging-suppliers-china",
    "content": read_markdown_file("article.md"),
    "metaDescription": "Learn how to find reliable...",
    "category": "Sourcing Guide",
    "readTime": "10 min read",
    "focusKeyword": "EV charging suppliers China",
    "keywords": ["EV charging", "China suppliers", "factory audit"],
    "tags": ["Sourcing", "EV Charging", "China"],
    "status": "draft"
}

# 2. 处理图片
featured_img = base64.b64encode(open("featured.jpg", "rb").read()).decode()
article["featuredImage"] = {
    "data": featured_img,
    "alt": "Pearl River Delta EV charging manufacturing hub",
    "filename": "reliable-ev-charging-suppliers-china-featured.jpg"
}

article["images"] = []
for img_file in ["img1.jpg", "img2.jpg", "img3.jpg"]:
    img_data = base64.b64encode(open(img_file, "rb").read()).decode()
    article["images"].append({
        "data": img_data,
        "alt": get_alt_text(img_file),
        "filename": img_file
    })

# 3. 提交到 API
response = requests.post(
    "https://pearlgatesourcing.com/api/blog/create",
    json=article,
    headers={"Authorization": f"Bearer {ADMIN_TOKEN}"}
)

# 4. 处理响应
if response.json()["success"]:
    print(f"✅ Draft created: {response.json()['slug']}")
    print(f"📝 Edit: {response.json()['editUrl']}")
    print(f"👁️ Preview: {response.json()['previewUrl']}")
else:
    print(f"❌ Error: {response.json()['error']}")
    print(f"Details: {response.json()['details']}")
```

---

## 📞 支持

**问题反馈：** 
- GitHub Issues: https://github.com/pearlgate/blog-api/issues
- Email: dev@pearlgatesourcing.com

**API 状态：**
- Status Page: https://status.pearlgatesourcing.com
- Version: v1.0
- Last Updated: 2026-06-05
