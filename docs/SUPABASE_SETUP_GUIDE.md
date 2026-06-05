# Supabase 快速配置指南

## Step 1: 运行数据库迁移

1. **登录 Supabase Dashboard**
   - 访问：https://supabase.com/dashboard
   - 选择你的项目（或创建新项目）

2. **运行 SQL 脚本**
   - 点击左侧菜单 "SQL Editor"
   - 点击 "+ New query"
   - 复制粘贴 `supabase/migrations/001_create_blog_tables.sql` 的全部内容
   - 点击 "Run" 执行

3. **验证表创建成功**
   - 点击左侧 "Table Editor"
   - 应该能看到：
     - `blog_posts` 表
     - `blog_images` 表

---

## Step 2: 创建 Storage Bucket

1. **创建图片存储 Bucket**
   - 点击左侧 "Storage"
   - 点击 "Create a new bucket"
   - Bucket name: `blog-images`
   - Public bucket: ✅ 勾选（允许公开访问）
   - 点击 "Create bucket"

2. **配置 CORS（可选）**
   - 选择 `blog-images` bucket
   - 点击 "Policies" tab
   - 添加 policy：
     - Name: "Public read access"
     - Target: `SELECT`
     - Policy: `true` (允许所有人读取)

---

## Step 3: 获取环境变量

1. **获取 Service Role Key**
   - 点击左侧 "Settings" → "API"
   - 找到 "Project API keys" section
   - 复制 `service_role` key（⚠️ 这是私密 key，不要泄露）

2. **更新 `.env.local`**

在 `silkbridge/.env.local` 中添加：

```bash
# Supabase（应该已有前两个）
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here  # ← 新增

# Admin 认证
ADMIN_TOKEN=your-secure-random-token-here  # ← 新增，随便设置一个复杂密码
```

**生成安全的 ADMIN_TOKEN：**
```bash
# 方法 1：使用 Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# 方法 2：随便设置（开发环境）
ADMIN_TOKEN=my-super-secret-admin-token-2026
```

---

## Step 4: 重启开发服务器

```bash
# 停止当前服务器（Ctrl+C）
# 重新启动
npm run dev
```

---

## Step 5: 测试数据库连接

访问：http://localhost:3000/api/blog

应该返回：
```json
{
  "posts": [],
  "total": 0,
  "limit": 10,
  "offset": 0
}
```

如果看到这个响应，说明配置成功！ ✅

---

## 常见问题

### Q: 找不到 service_role key？
A: 在 Supabase Dashboard → Settings → API → Project API keys section

### Q: 运行 SQL 脚本出错？
A: 
1. 检查是否有权限
2. 确保选择了正确的项目
3. 逐段运行（先建表，再建索引）

### Q: Storage bucket 创建失败？
A: 检查项目配额，免费版有 1GB 限制

---

## 下一步

配置完成后，告诉我结果，我会继续更新前端代码。
