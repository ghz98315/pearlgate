// 测试 API 路由
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

async function testAPI() {
  console.log('🧪 测试博客 API...\n');

  const supabase = createClient(supabaseUrl, supabaseKey);

  // 测试 1: 查询所有文章
  console.log('1️⃣ 查询所有已发布文章:');
  const { data: allPosts, error: allError } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('published', true);

  if (allError) {
    console.error('❌ 错误:', allError.message);
    return;
  }

  console.log(`✅ 找到 ${allPosts.length} 篇已发布文章\n`);

  // 测试 2: 查询所有文章（包括草稿）
  console.log('2️⃣ 查询所有文章（包括草稿）:');
  const { data: allPostsWithDrafts, error: allError2 } = await supabase
    .from('blog_posts')
    .select('*');

  if (allError2) {
    console.error('❌ 错误:', allError2.message);
  } else {
    console.log(`✅ 总共 ${allPostsWithDrafts.length} 篇文章`);
    allPostsWithDrafts.forEach(post => {
      console.log(`   - ${post.title} (${post.published ? '已发布' : '草稿'})`);
    });
  }

  console.log('\n3️⃣ 检查 RLS 策略:');
  console.log('   如果上面显示 0 篇文章，但数据库中有数据，');
  console.log('   说明 RLS 策略阻止了公开访问。');

  console.log('\n4️⃣ 测试从生产环境读取:');
  console.log('   访问: https://www.pearlgatesourcing.com/api/blog');
  console.log('   应该返回 JSON 格式的博客列表');
}

testAPI().catch(console.error);
