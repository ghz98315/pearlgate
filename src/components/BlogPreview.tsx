import Link from "next/link";
import Image from "next/image";
import { Clock } from "lucide-react";
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// 禁用缓存，每次请求都重新获取
export const revalidate = 0;

export default async function BlogPreview() {
  // 从数据库获取最新 3 篇已发布文章
  const { data: posts } = await supabase
    .from('blog_posts')
    .select('slug, title, description, read_time, featured_image, category')
    .eq('status', 'published')
    .order('published_at', { ascending: false })
    .limit(3);

  if (!posts || posts.length === 0) {
    return null; // 没有文章时不显示此区块
  }

  return (
    <section className="py-24 lg:py-32 bg-navy-900">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-sm font-semibold text-orange-500 uppercase tracking-wider mb-3">
              From Our Blog
            </p>
            <h2 className="text-3xl lg:text-4xl font-bold text-white font-[family-name:var(--font-serif)]">
              Latest sourcing guides
            </h2>
            <p className="mt-3 text-white/50">
              Practical knowledge from inside China&apos;s factories.
            </p>
          </div>
          <Link
            href="/blog"
            className="hidden md:block text-white/60 hover:text-white text-sm font-medium transition-colors"
          >
            View all articles →
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group bg-navy-800 rounded-xl overflow-hidden hover:bg-navy-700 transition-all"
            >
              <div className="relative h-36 bg-navy-700">
                {post.featured_image && (
                  <Image
                    src={post.featured_image}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                )}
              </div>
              <div className="p-5">
                <h3 className="text-white font-semibold text-sm leading-snug group-hover:text-orange-400 transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="mt-2 text-white/40 text-xs leading-relaxed line-clamp-2">
                  {post.description}
                </p>
                <div className="mt-3 flex items-center gap-1 text-xs text-white/30">
                  <Clock size={11} />
                  {post.read_time}
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-8 text-center md:hidden">
          <Link
            href="/blog"
            className="text-white/60 hover:text-white text-sm font-medium transition-colors"
          >
            View all articles →
          </Link>
        </div>
      </div>
    </section>
  );
}
