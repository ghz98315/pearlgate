import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// 验证 Admin Token
function verifyAuth(req: NextRequest): boolean {
  const authHeader = req.headers.get("authorization");
  const token = authHeader?.replace("Bearer ", "");
  return token === process.env.ADMIN_TOKEN;
}

// 验证必填字段
function validatePost(data: any) {
  const errors: Record<string, string> = {};

  // Title
  if (!data.title || data.title.length < 10 || data.title.length > 100) {
    errors.title = "Title must be between 10-100 characters";
  }

  // Slug
  if (!data.slug || !/^[a-z0-9-]+$/.test(data.slug)) {
    errors.slug = "Slug must contain only lowercase letters, numbers, and hyphens";
  }

  // Meta Description
  if (!data.metaDescription) {
    errors.metaDescription = "Meta description is required";
  } else if (data.metaDescription.length < 150 || data.metaDescription.length > 160) {
    errors.metaDescription = `Meta description must be 150-160 characters (current: ${data.metaDescription.length})`;
  }

  // Content
  if (!data.content || data.content.length < 500) {
    errors.content = "Content must be at least 500 characters";
  }

  // Category
  const validCategories = [
    "Sourcing Guide",
    "Technical Guide",
    "Market Analysis",
    "Certification Guide",
    "Supplier Verification",
  ];
  if (!data.category || !validCategories.includes(data.category)) {
    errors.category = `Category must be one of: ${validCategories.join(", ")}`;
  }

  // Read Time
  if (!data.readTime || !/^\d+\s*min\s*read$/i.test(data.readTime)) {
    errors.readTime = 'Read time must be in format "X min read"';
  }

  return errors;
}

// 上传图片到 Supabase Storage
async function uploadImage(
  imageData: { data: string; alt: string; filename: string; caption?: string },
  postSlug: string
): Promise<{ url: string; path: string; error?: string }> {
  try {
    // 解码 base64
    const base64Data = imageData.data.replace(/^data:image\/\w+;base64,/, "");
    const buffer = Buffer.from(base64Data, "base64");

    // 生成存储路径
    const timestamp = Date.now();
    const filename = imageData.filename.replace(/[^a-z0-9.-]/gi, "-");
    const storagePath = `blog/${postSlug}/${timestamp}-${filename}`;

    // 上传到 Supabase Storage
    const { data, error } = await supabase.storage
      .from("blog-images")
      .upload(storagePath, buffer, {
        contentType: "image/jpeg",
        cacheControl: "3600",
        upsert: false,
      });

    if (error) {
      console.error("Upload error:", error);
      return { url: "", path: "", error: error.message };
    }

    // 获取公开 URL
    const { data: publicUrlData } = supabase.storage
      .from("blog-images")
      .getPublicUrl(storagePath);

    return {
      url: publicUrlData.publicUrl,
      path: storagePath,
    };
  } catch (error: any) {
    console.error("Image upload failed:", error);
    return { url: "", path: "", error: error.message };
  }
}

export async function POST(req: NextRequest) {
  try {
    // 1. 验证认证
    if (!verifyAuth(req)) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    // 2. 解析请求体
    const body = await req.json();

    // 3. 验证字段
    const validationErrors = validatePost(body);
    if (Object.keys(validationErrors).length > 0) {
      return NextResponse.json(
        {
          success: false,
          error: "Validation failed",
          details: validationErrors,
        },
        { status: 400 }
      );
    }

    // 4. 检查 slug 是否已存在
    const { data: existingPost } = await supabase
      .from("blog_posts")
      .select("id")
      .eq("slug", body.slug)
      .single();

    if (existingPost) {
      return NextResponse.json(
        {
          success: false,
          error: "Slug already exists",
          suggestion: `${body.slug}-2026`,
        },
        { status: 409 }
      );
    }

    // 5. 上传 featured image
    let featuredImageUrl = "";
    if (body.featuredImage?.data) {
      const result = await uploadImage(body.featuredImage, body.slug);
      if (result.error) {
        return NextResponse.json(
          {
            success: false,
            error: "Featured image upload failed",
            details: result.error,
          },
          { status: 500 }
        );
      }
      featuredImageUrl = result.url;
    }

    // 6. 插入文章到数据库
    const { data: post, error: postError } = await supabase
      .from("blog_posts")
      .insert({
        title: body.title,
        slug: body.slug,
        content: body.content,
        meta_description: body.metaDescription,
        meta_title: body.metaTitle || body.title,
        focus_keyword: body.focusKeyword || "",
        keywords: body.keywords || [],
        category: body.category,
        tags: body.tags || [],
        featured_image: featuredImageUrl,
        read_time: body.readTime,
        status: body.status || "draft",
        author: body.author || "Alex Guan",
        og_title: body.ogTitle || body.title,
        og_description: body.ogDescription || body.metaDescription,
        og_image: body.ogImage || featuredImageUrl,
        canonical_url: body.canonicalUrl || null,
        noindex: body.noindex || false,
        nofollow: body.nofollow || false,
      })
      .select()
      .single();

    if (postError) {
      console.error("Post insert error:", postError);
      return NextResponse.json(
        {
          success: false,
          error: "Failed to create post",
          details: postError.message,
        },
        { status: 500 }
      );
    }

    // 7. 上传其他图片
    if (body.images && Array.isArray(body.images)) {
      for (let i = 0; i < body.images.length; i++) {
        const img = body.images[i];
        const result = await uploadImage(img, body.slug);

        if (!result.error) {
          // 保存图片信息到数据库
          await supabase.from("blog_images").insert({
            post_id: post.id,
            filename: img.filename,
            url: result.url,
            storage_path: result.path,
            alt_text: img.alt,
            caption: img.caption || null,
            is_featured: false,
            display_order: i + 1,
          });
        }
      }
    }

    // 8. 返回成功响应
    return NextResponse.json({
      success: true,
      postId: post.id,
      slug: post.slug,
      status: post.status,
      message: `${post.status === "draft" ? "Draft" : "Post"} created successfully`,
      editUrl: `/admin/blog/edit/${post.id}`,
      previewUrl: `/blog/${post.slug}${post.status === "draft" ? "?preview=true" : ""}`,
    });
  } catch (error: any) {
    console.error("API error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Internal server error",
        details: error.message,
      },
      { status: 500 }
    );
  }
}
