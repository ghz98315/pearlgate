import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// 验证 Admin Token
function verifyAuth(req: NextRequest): boolean {
  const authHeader = req.headers.get("authorization");
  const token = authHeader?.replace("Bearer ", "");
  return token === process.env.ADMIN_TOKEN;
}

// GET /api/blog/[id] - 获取单篇文章详情
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    if (!id) {
      return NextResponse.json(
        { error: 'Post ID is required' },
        { status: 400 }
      );
    }

    // 查询文章
    const { data: post, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !post) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      );
    }

    // 查询关联图片
    const { data: images } = await supabase
      .from('blog_images')
      .select('*')
      .eq('post_id', id)
      .order('display_order', { ascending: true });

    // 格式化响应
    const response = {
      id: post.id,
      slug: post.slug,
      title: post.title,
      content: post.content,
      excerpt: post.excerpt,
      metaDescription: post.meta_description,
      metaTitle: post.meta_title,
      focusKeyword: post.focus_keyword,
      keywords: post.keywords,
      category: post.category,
      tags: post.tags,
      featuredImage: post.featured_image,
      images: images?.map(img => ({
        id: img.id,
        url: img.url,
        alt: img.alt_text,
        caption: img.caption,
      })) || [],
      status: post.status,
      author: post.author,
      readTime: post.read_time,
      createdAt: post.created_at,
      updatedAt: post.updated_at,
      publishedAt: post.published_at,
      ogTitle: post.og_title,
      ogDescription: post.og_description,
      ogImage: post.og_image,
    };

    return NextResponse.json(response);

  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PUT /api/blog/[id] - 更新文章
export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    // 验证认证
    if (!verifyAuth(request)) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { id } = await context.params;

    if (!id) {
      return NextResponse.json(
        { error: 'Post ID is required' },
        { status: 400 }
      );
    }

    // 构建更新数据（支持新旧字段）
    const updateData: any = {};

    // 新字段映射
    if (body.title !== undefined) updateData.title = body.title;
    if (body.slug !== undefined) updateData.slug = body.slug;
    if (body.content !== undefined) updateData.content = body.content;
    if (body.metaDescription !== undefined) updateData.meta_description = body.metaDescription;
    if (body.metaTitle !== undefined) updateData.meta_title = body.metaTitle;
    if (body.focusKeyword !== undefined) updateData.focus_keyword = body.focusKeyword;
    if (body.keywords !== undefined) updateData.keywords = body.keywords;
    if (body.category !== undefined) updateData.category = body.category;
    if (body.tags !== undefined) updateData.tags = body.tags;
    if (body.featuredImage !== undefined) updateData.featured_image = body.featuredImage;
    if (body.readTime !== undefined) updateData.read_time = body.readTime;
    if (body.status !== undefined) updateData.status = body.status;
    if (body.author !== undefined) updateData.author = body.author;
    if (body.published_at !== undefined) updateData.published_at = body.published_at;

    // 旧字段兼容
    if (body.description !== undefined) updateData.meta_description = body.description;
    if (body.image !== undefined) updateData.featured_image = body.image;

    const { data, error } = await supabase
      .from('blog_posts')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Update error:', error);

      if (error.code === '23505') {
        return NextResponse.json(
          { error: 'A post with this slug already exists' },
          { status: 409 }
        );
      }

      return NextResponse.json(
        { error: 'Failed to update blog post', details: error.message },
        { status: 500 }
      );
    }

    if (!data) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      postId: data.id,
      status: data.status,
      publishedAt: data.published_at,
    });

  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE /api/blog/[id] - 删除文章（软删除，改为 archived）
export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    // 验证认证
    if (!verifyAuth(request)) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { id } = await context.params;

    if (!id) {
      return NextResponse.json(
        { error: 'Post ID is required' },
        { status: 400 }
      );
    }

    // 软删除：改状态为 archived
    const { data, error } = await supabase
      .from('blog_posts')
      .update({ status: 'archived' })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Delete error:', error);
      return NextResponse.json(
        { error: 'Failed to archive blog post' },
        { status: 500 }
      );
    }

    if (!data) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Post archived successfully'
    });

  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
