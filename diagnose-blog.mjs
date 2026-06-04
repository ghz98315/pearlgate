// 快速诊断脚本 - 检查博客数据
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

async function diagnose() {
  console.log('🔍 诊断博客系统...\n');

  // 检查环境变量
  console.log('1️⃣ 检查环境变量:');
  if (!supabaseUrl) {
    console.error('❌ NEXT_PUBLIC_SUPABASE_URL 未设置');
    return;
  }
  if (!supabaseKey) {
    console.error('❌ NEXT_PUBLIC_SUPABASE_ANON_KEY 未设置');
    return;
  }
  console.log('✅ 环境变量已配置\n');

  // 连接 Supabase
  const supabase = createClient(supabaseUrl, supabaseKey);

  // 检查表是否存在并查询数据
  console.log('2️⃣ 检查数据库:');
  try {
    const { data, error, count } = await supabase
      .from('blog_posts')
      .select('*', { count: 'exact' })
      .eq('published', true);

    if (error) {
      console.error('❌ 数据库错误:', error.message);
      console.error('   详情:', error);

      if (error.message.includes('relation "public.blog_posts" does not exist')) {
        console.log('\n📝 解决方案: 需要在 Supabase 中创建表');
        console.log('   执行: docs/supabase_blog_schema.sql');
      }

      if (error.message.includes('row-level security')) {
        console.log('\n📝 解决方案: RLS 策略问题');
        console.log('   检查 Supabase Dashboard → Authentication → Policies');
      }

      return;
    }

    console.log(`✅ 找到 ${count} 篇文章\n`);

    if (count === 0) {
      console.log('⚠️  数据库为空，需要导入数据');
      console.log('\n📝 解决方案: 运行数据迁移脚本');
      console.log('   命令: node migrate-blog-data.mjs');
      return;
    }

    console.log('3️⃣ 文章列表:');
    data.forEach((post, index) => {
      console.log(`   ${index + 1}. ${post.title}`);
      console.log(`      - Slug: ${post.slug}`);
      console.log(`      - 状态: ${post.published ? '已发布' : '草稿'}`);
      console.log(`      - 日期: ${post.date}`);
    });

    console.log('\n✅ 博客系统正常！');
    console.log('   访问: http://localhost:3000/blog (本地)');
    console.log('   或: https://your-domain.com/blog (生产)');

  } catch (err) {
    console.error('❌ 未知错误:', err);
  }
}

diagnose().catch(console.error);
