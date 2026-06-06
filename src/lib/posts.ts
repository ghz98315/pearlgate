export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  content: string;
}

// 注意：这个文件已废弃，文章现在存储在 Supabase 数据库中
// BlogPreview 组件应该从数据库读取文章
// 保留空数组以避免破坏现有引用
export const posts: BlogPost[] = [];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug);
}

export function getAllPosts(): BlogPost[] {
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}
