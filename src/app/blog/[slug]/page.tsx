import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EmailCapture from "@/components/EmailCapture";
import ReadingProgress from "@/components/ReadingProgress";
import TableOfContents from "@/components/TableOfContents";
import ImageZoom from "@/components/ImageZoom";
import { Calendar, Clock, ArrowLeft } from "lucide-react";
import { createClient } from '@supabase/supabase-js';
import { generateSEOMetadata } from '@/lib/seo';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import PublishButton from '@/components/PublishButton';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// 动态渲染
export const dynamic = 'force-dynamic';

async function getPost(slug: string, preview: boolean = false) {
  const supabase = createClient(supabaseUrl, supabaseKey);

  let query = supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', slug);

  // 如果不是预览模式，只查询已发布的
  if (!preview) {
    query = query.eq('status', 'published');
  }

  const { data, error } = await query.single();

  if (error || !data) {
    return null;
  }

  return data;
}

async function getAllPosts() {
  const supabase = createClient(supabaseUrl, supabaseKey);

  const { data, error } = await supabase
    .from('blog_posts')
    .select('slug')
    .eq('status', 'published');

  if (error) {
    return [];
  }

  return data || [];
}

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug, false); // 元数据只用于已发布文章
  if (!post) return {};

  return generateSEOMetadata({
    title: post.meta_title || post.title,
    description: post.meta_description || post.excerpt,
    image: post.featured_image || post.og_image || undefined,
    url: `/blog/${slug}`,
    type: 'article',
    publishedTime: post.published_at || post.date,
    tags: [post.category, ...(post.tags || []), 'EV Charging', 'China Sourcing'],
  });
}

export default async function BlogPostPage({
  params,
  searchParams
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { slug } = await params;
  const { preview } = await searchParams;

  // 预览模式：允许查看草稿
  const isPreview = preview === 'true';
  const post = await getPost(slug, isPreview);

  if (!post) notFound();

  // JSON-LD structured data for SEO
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.meta_description || post.excerpt,
    image: post.featured_image || 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=1200&q=80',
    datePublished: post.published_at || post.date,
    dateModified: post.updated_at || post.published_at || post.date,
    author: {
      '@type': 'Person',
      name: post.author || 'Alex Guan',
      url: 'https://pearlgate.com/about',
    },
    publisher: {
      '@type': 'Organization',
      name: 'PearlGate',
      logo: {
        '@type': 'ImageObject',
        url: 'https://pearlgate.com/logo.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://pearlgate.com/blog/${slug}`,
    },
  };

  return (
    <>
      {isPreview && (
        <div className="fixed top-0 left-0 right-0 z-50 bg-orange-500 text-white text-center py-2 text-sm font-medium">
          🔍 预览模式 - 此文章为草稿状态，仅你可见
          <PublishButton postId={post.id} slug={post.slug} />
        </div>
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <ReadingProgress />
      <main className="pt-32 pb-24 min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex gap-12">
            {/* 主内容区 */}
            <article className="flex-1 max-w-3xl">
              <Link
                href="/blog"
                className="inline-flex items-center gap-1 text-text-secondary hover:text-navy-700 text-sm transition-colors mb-8"
              >
                <ArrowLeft size={14} />
                Back to all articles
              </Link>

          <span className="inline-block bg-navy-900/5 text-navy-700 text-xs font-medium px-3 py-1 rounded-full">
            {post.category}
          </span>

          <h1 className="mt-4 text-3xl lg:text-4xl font-bold leading-tight font-[family-name:var(--font-serif)]">
            {post.title}
          </h1>

          <div className="mt-4 flex items-center gap-4 text-sm text-text-secondary">
            <span className="flex items-center gap-1">
              <Calendar size={14} />
              {new Date(post.published_at || post.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
            </span>
            <span className="flex items-center gap-1">
              <Clock size={14} />
              {post.read_time}
            </span>
          </div>

          {(post.featured_image || post.image) && (
            <div className="mt-8">
              <ImageZoom src={post.featured_image || post.image} alt={post.title} />
            </div>
          )}

          <article className="mt-12 max-w-none">
            {(() => {
              return (
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                // 标题（添加 ID，跳过 H1）
                h1: () => null, // 跳过 H1，页面已有标题
                h2: ({node, children, ...props}) => {
                  const id = String(children)
                    .toLowerCase()
                    .replace(/[^\w\s-]/g, '')
                    .replace(/\s+/g, '-');
                  return <h2 id={id} className="text-2xl font-bold mt-14 mb-6 font-serif text-navy-900 scroll-mt-24" {...props}>{children}</h2>;
                },
                h3: ({node, children, ...props}) => {
                  const id = String(children)
                    .toLowerCase()
                    .replace(/[^\w\s-]/g, '')
                    .replace(/\s+/g, '-');
                  return <h3 id={id} className="text-xl font-semibold mt-12 mb-5 font-serif text-navy-800 scroll-mt-24" {...props}>{children}</h3>;
                },
                h4: ({node, ...props}) => <h4 className="text-lg font-semibold mt-10 mb-4 text-navy-800" {...props} />,
                h5: ({node, ...props}) => <h5 className="text-base font-semibold mt-8 mb-3 text-navy-700" {...props} />,
                h6: ({node, ...props}) => <h6 className="text-[15px] font-semibold mt-6 mb-2 text-navy-700" {...props} />,

                // 段落
                p: ({node, ...props}) => <p className="text-[15px] text-text-secondary leading-relaxed mb-6" {...props} />,

                // 无序列表
                ul: ({node, ...props}) => <ul className="my-6 ml-6 space-y-3 list-disc marker:text-navy-400" {...props} />,
                ol: ({node, ...props}) => <ol className="my-6 ml-6 space-y-3 list-decimal marker:text-navy-400" {...props} />,
                li: ({node, ...props}) => <li className="text-[15px] text-text-secondary leading-relaxed pl-2" {...props} />,

                // 链接
                a: ({node, ...props}) => <a className="text-navy-700 font-medium underline hover:text-navy-900 transition-colors" {...props} />,

                // 强调
                strong: ({node, ...props}) => <strong className="font-semibold text-navy-900" {...props} />,
                em: ({node, ...props}) => <em className="italic text-navy-800" {...props} />,

                // 代码
                code: ({node, inline, ...props}: any) =>
                  inline ? (
                    <code className="bg-navy-50 text-navy-700 px-2 py-0.5 rounded text-sm font-mono" {...props} />
                  ) : (
                    <code className="block bg-navy-900 text-white p-4 rounded-lg overflow-x-auto text-sm font-mono my-6" {...props} />
                  ),

                // 引用块
                blockquote: ({node, ...props}) => (
                  <blockquote className="border-l-4 border-navy-300 pl-6 py-2 my-8 italic text-navy-700 bg-navy-50/50" {...props} />
                ),

                // 分割线
                hr: ({node, ...props}) => <hr className="my-12 border-t border-gray-300" {...props} />,

                // 表格
                table: ({node, ...props}) => (
                  <div className="overflow-x-auto my-10">
                    <table className="min-w-full border-collapse border-2 border-navy-200 rounded-lg" {...props} />
                  </div>
                ),
                thead: ({node, ...props}) => <thead className="bg-navy-100" {...props} />,
                th: ({node, ...props}) => <th className="px-6 py-4 text-left font-semibold text-navy-900 border border-navy-200" {...props} />,
                td: ({node, ...props}) => <td className="px-6 py-4 text-text-secondary border border-navy-200" {...props} />,

                // 图片（跳过与封面图 URL 相同的图，避免重复显示）
                img: ({node, src, alt, ...props}: any) => {
                  if (src && (src === post.featured_image || src === post.image)) {
                    return null;
                  }
                  const caption = alt || '';
                  return <ImageZoom src={src || ''} alt={caption} caption={caption} />;
                },
              }}
            >
              {post.content}
            </ReactMarkdown>
              );
            })()}
          </article>

          {/* CTA */}
          <div className="mt-16 p-8 rounded-2xl bg-gradient-to-br from-navy-50 to-orange-50 border border-navy-200 text-center">
            <h3 className="text-xl font-bold font-[family-name:var(--font-serif)]">
              Sourcing EV Charging Equipment from China?
            </h3>
            <p className="mt-2 text-text-secondary">
              I'm based in the Pearl River Delta with 12 years of supply chain experience.
              I help buyers find verified EV charging manufacturers, verify certifications, and coordinate factory visits.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/supplier-match"
                className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-lg transition-all hover:-translate-y-0.5"
              >
                Get Matched with Suppliers
              </Link>
              <Link
                href="/factory-verification"
                className="text-navy-700 hover:text-navy-900 font-semibold px-6 py-3 rounded-lg border border-navy-300 hover:bg-white transition-colors"
              >
                Factory Verification Service →
              </Link>
            </div>
          </div>

          {/* Email Capture */}
          <div className="mt-8">
            <EmailCapture
              title="Subscribe for more guides like this"
              subtitle="Get sourcing tips and new factory alerts. Free, no spam."
              source="blog_article"
            />
          </div>
        </article>

        {/* 侧边栏目录 */}
        <TableOfContents content={post.content} />
      </div>
    </div>
      </main>
      <Footer />
    </>
  );
}
