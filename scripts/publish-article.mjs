#!/usr/bin/env node
/**
 * 博客文章发布脚本：文件夹 → Supabase 草稿/发布
 *
 * 用法:
 *   node scripts/publish-article.mjs "<文章文件夹路径>"            # 上传为草稿(默认)
 *   node scripts/publish-article.mjs "<文章文件夹路径>" --publish  # 直接发布
 *   node scripts/publish-article.mjs "<文章文件夹路径>" --dry-run  # 仅校验,不传图不写库
 *
 * 文件夹约定:
 *   - article-FINAL.md   带 YAML frontmatter 的正文
 *   - images/            所有图片(封面 + 正文插图)
 *   - 正文用 ./images/xxx.png 引用插图;frontmatter.featured_image 指向封面
 *
 * 脚本会自动:传图 → 改写正文 ./images 路径为公开 URL → 规范化字段 → 写库。
 */
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
import { createClient } from '@supabase/supabase-js';
import yaml from 'js-yaml';
import { readFileSync, existsSync } from 'node:fs';
import { join, basename } from 'node:path';

// ---- 参数解析 ----
const args = process.argv.slice(2);
const flags = new Set(args.filter((a) => a.startsWith('--')));
const ART_DIR = args.find((a) => !a.startsWith('--'));
const DRY_RUN = flags.has('--dry-run');
const PUBLISH = flags.has('--publish');

if (!ART_DIR) {
  console.error('用法: node scripts/publish-article.mjs "<文章文件夹路径>" [--publish] [--dry-run]');
  process.exit(1);
}

// 系统认可的 5 个分类
const VALID_CATEGORIES = ['Sourcing Guide', 'Technical Guide', 'Market Analysis', 'Certification Guide', 'Supplier Verification'];
// 常见非标准分类 → 系统分类映射
const CATEGORY_MAP = {
  'product knowledge': 'Technical Guide',
  'product guide': 'Technical Guide',
  'technical guide': 'Technical Guide',
  'ev charging basics': 'Technical Guide',
  'market intelligence': 'Market Analysis',
  'market analysis': 'Market Analysis',
  'sourcing guide': 'Sourcing Guide',
  'certification guide': 'Certification Guide',
  'supplier verification': 'Supplier Verification',
};

const die = (msg) => { console.error('✗ ' + msg); process.exit(1); };
const log = (msg) => console.log(msg);

// ---- 1. 读取并解析 article-FINAL.md ----
const mdPath = join(ART_DIR, 'article-FINAL.md');
if (!existsSync(mdPath)) die(`找不到 ${mdPath}`);
const raw = readFileSync(mdPath, 'utf8');
const fm = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
if (!fm) die('frontmatter 解析失败(需 --- 包裹的 YAML 头)');
const meta = yaml.load(fm[1]) || {};
let content = fm[2].trim();

// ---- 2. 字段校验与规范化 ----
const errors = [];
const title = (meta.title || '').trim();
if (title.length < 10 || title.length > 100) errors.push(`title 长度需 10-100(当前 ${title.length})`);

const slug = (meta.slug || basename(ART_DIR)).trim();
if (!/^[a-z0-9-]+$/.test(slug)) errors.push(`slug 仅允许小写字母/数字/连字符(当前 "${slug}")`);

const metaDescription = (meta.meta_description || meta.description || '').trim();
if (metaDescription.length < 150 || metaDescription.length > 160) {
  errors.push(`meta_description 长度需 150-160(当前 ${metaDescription.length})`);
}

const rawCat = (meta.category || '').trim();
const category = CATEGORY_MAP[rawCat.toLowerCase()] || (VALID_CATEGORIES.includes(rawCat) ? rawCat : null);
if (!category) errors.push(`category "${rawCat}" 无法映射到系统分类: ${VALID_CATEGORIES.join(' / ')}`);
else if (category !== rawCat) log(`  · category 映射: "${rawCat}" → "${category}"`);

// read_time: 接受数字或 "X min read"
let readTime = meta.read_time || meta.reading_time || meta.readTime;
if (typeof readTime === 'number' || /^\d+$/.test(String(readTime || ''))) readTime = `${readTime} min read`;
readTime = String(readTime || '').trim();
if (!/^\d+\s*min\s*read$/i.test(readTime)) errors.push(`read_time 需为数字或 "X min read"(当前 "${readTime}")`);

if (content.length < 500) errors.push(`正文过短(需 ≥500 字符,当前 ${content.length})`);

if (errors.length) { errors.forEach((e) => console.error('✗ ' + e)); process.exit(1); }

const author = (meta.author && meta.author !== 'PearlGate Team') ? meta.author : 'Alex Guan';
const tags = Array.isArray(meta.tags) ? meta.tags : (meta.tags ? String(meta.tags).split(',').map((s) => s.trim()) : []);
const keywords = Array.isArray(meta.secondary_keywords) ? meta.secondary_keywords : (Array.isArray(meta.keywords) ? meta.keywords : []);
const excerpt = (meta.description || metaDescription).trim();
const dateIso = meta.date ? new Date(meta.date).toISOString() : new Date().toISOString();

log(`\n文章: ${title}`);
log(`slug: ${slug} | 分类: ${category} | 阅读: ${readTime} | 作者: ${author}`);
log(`meta_description: ${metaDescription.length} 字符 | tags: ${tags.length} | keywords: ${keywords.length}`);

// ---- 3. 收集正文引用的本地图片 ----
const imgRefs = [...content.matchAll(/\.\/images\/([\w.-]+\.(?:png|jpe?g|webp))/gi)];
const uniqueFiles = [...new Set(imgRefs.map((m) => m[1]))];
// 封面文件名(从 frontmatter.featured_image 取,默认第一张引用图)
const featuredFile = meta.featured_image ? basename(meta.featured_image) : uniqueFiles[0];
const allFiles = [...new Set([featuredFile, ...uniqueFiles].filter(Boolean))];

log(`\n图片 ${allFiles.length} 张(封面: ${featuredFile || '无'}):`);
for (const f of allFiles) {
  const p = join(ART_DIR, 'images', f);
  if (!existsSync(p)) die(`图片缺失: ${p}`);
  log(`  · ${f} (${(readFileSync(p).length / 1024).toFixed(0)}KB)`);
}

// ---- DRY RUN: 到此为止,不传图不写库 ----
if (DRY_RUN) {
  log(`\n[dry-run] 校验通过。正文待改写路径数: ${imgRefs.length}。未上传、未写库。`);
  log(`[dry-run] 实跑将以 status="${PUBLISH ? 'published' : 'draft'}" 写入。`);
  process.exit(0);
}

// ---- 4. 连接 Supabase ----
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!SUPABASE_URL || !SERVICE_KEY) die('缺少 NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY');
const sb = createClient(SUPABASE_URL, SERVICE_KEY);

// 重复 slug 检查
const { data: dup } = await sb.from('blog_posts').select('id,status').eq('slug', slug).maybeSingle();
// 已存在草稿 + --publish:走「更新发布」;其它情况下重复即报错
const updateExisting = dup && PUBLISH && dup.status === 'draft';
if (dup && !updateExisting) {
  die(`slug "${slug}" 已存在(id=${dup.id}, status=${dup.status})。改 slug、先删旧记录,或用 --publish 发布已有草稿。`);
}
if (updateExisting) log(`\n已有草稿(id=${dup.id}),将更新并发布。`);


// ---- 5. 上传图片 + 改写正文路径 ----
const urlMap = {};
for (const f of allFiles) {
  const buffer = readFileSync(join(ART_DIR, 'images', f));
  const ext = f.split('.').pop().toLowerCase();
  const ct = ext === 'png' ? 'image/png' : ext === 'webp' ? 'image/webp' : 'image/jpeg';
  const storagePath = `blog/${slug}/${f}`;
  const { error: upErr } = await sb.storage.from('blog-images').upload(storagePath, buffer, { contentType: ct, cacheControl: '3600', upsert: true });
  if (upErr) die(`上传 ${f} 失败: ${upErr.message}`);
  urlMap[f] = sb.storage.from('blog-images').getPublicUrl(storagePath).data.publicUrl;
  log(`  ✓ ${f}`);
}
content = content.replace(/\.\/images\/([\w.-]+\.(?:png|jpe?g|webp))/gi, (m, f) => urlMap[f] || m);
const featuredUrl = featuredFile ? urlMap[featuredFile] : '';

// ---- 6. 写库 ----
const status = PUBLISH ? 'published' : 'draft';
const now = new Date().toISOString();
const row = {
  slug, title, content, category, read_time: readTime, author,
  description: metaDescription, meta_description: metaDescription, meta_title: meta.meta_title || title,
  excerpt, focus_keyword: meta.primary_keyword || meta.focus_keyword || '', keywords, tags,
  featured_image: featuredUrl, image: featuredUrl,
  og_title: title, og_description: metaDescription, og_image: featuredUrl,
  date: dateIso, status, published: PUBLISH,
  published_at: PUBLISH ? now : null, noindex: false, nofollow: false,
};
const { data: post, error } = updateExisting
  ? await sb.from('blog_posts').update(row).eq('id', dup.id).select('id,slug,status').single()
  : await sb.from('blog_posts').insert(row).select('id,slug,status').single();
if (error) die(`写库失败: ${error.message}`);

log(`\n✓ 已${updateExisting ? '更新并发布' : '写入'} (status=${post.status}, id=${post.id})`);
log(`地址: /blog/${slug}${PUBLISH ? '' : '?preview=true'}`);
if (!PUBLISH) log(`确认无误后发布: node scripts/publish-article.mjs "${ART_DIR}" --publish`);



