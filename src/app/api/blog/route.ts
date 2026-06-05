import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// GET /api/blog - 获取文章列表
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    // 支持旧的 slug 参数（向后兼容）
    const slug = searchParams.get('slug');
    if (slug) {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('slug', slug)
        .single();

      if (error) {
        console.error('Fetch error:', error);
        return NextResponse.json(
          { error: 'Blog post not found' },
          { status: 404 }
        );
      }

      return NextResponse.json(data);
    }

    // 新的查询参数
    const status = searchParams.get('status') || 'published';
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const limit = parseInt(searchParams.get('limit') || '10');
    const offset = parseInt(searchParams.get('offset') || '0');

    // 构建查询
    let query = supabase
      .from('blog_posts')
      .select('*', { count: 'exact' })
      .eq('status', status);

    if (category) {
      query = query.eq('category', category);
    }

    if (search) {
      query = query.or(`title.ilike.%${search}%,content.ilike.%${search}%`);
    }

    // 排序和分页
    query = query
      .order('published_at', { ascending: false, nullsFirst: false })
      .range(offset, offset + limit - 1);

    const { data: posts, error, count } = await query;

    if (error) {
      console.error('Query error:', error);
      return NextResponse.json(
        { error: 'Failed to fetch posts' },
        { status: 500 }
      );
    }

    // 格式化响应
    const formattedPosts = posts?.map((post) => ({
      id: post.id,
      slug: post.slug,
      title: post.title,
      excerpt: post.excerpt,
      category: post.category,
      tags: post.tags,
      status: post.status,
      publishedAt: post.published_at,
      readTime: post.read_time,
      featuredImage: post.featured_image,
      author: post.author,
    }));

    return NextResponse.json({
      posts: formattedPosts,
      total: count || 0,
      limit,
      offset,
    });

  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST /api/blog - 创建文章（简化版，详细版在 /api/blog/create）
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // 基础字段验证
    const requiredFields = ['slug', 'title', 'metaDescription', 'content', 'category', 'readTime'];
    const missingFields = requiredFields.filter(field => !body[field]);

    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: 'Missing required fields', fields: missingFields },
        { status: 400 }
      );
    }

    // 插入数据库
    const { data, error } = await supabase
      .from('blog_posts')
      .insert({
        slug: body.slug,
        title: body.title,
        content: body.content,
        meta_description: body.metaDescription,
        meta_title: body.metaTitle || body.title,
        focus_keyword: body.focusKeyword || '',
        keywords: body.keywords || [],
        category: body.category,
        tags: body.tags || [],
        featured_image: body.image || body.featuredImage || '',
        read_time: body.readTime,
        status: body.status || 'draft',
        author: body.author || 'Alex Guan',
      })
      .select()
      .single();

    if (error) {
      console.error('Insert error:', error);

      if (error.code === '23505') {
        return NextResponse.json(
          { error: 'A post with this slug already exists' },
          { status: 409 }
        );
      }

      return NextResponse.json(
        { error: 'Failed to create blog post', details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(data, { status: 201 });

  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
