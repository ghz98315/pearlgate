import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EmailCapture from "@/components/EmailCapture";
import ReadingProgress from "@/components/ReadingProgress";
import { Calendar, Clock, ArrowLeft } from "lucide-react";
import { createClient } from '@supabase/supabase-js';
import { generateSEOMetadata } from '@/lib/seo';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

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
        </div>
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <ReadingProgress />
      <main className="pt-32 pb-24 min-h-screen bg-white">
        <article className="max-w-3xl mx-auto px-6 lg:px-12">
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
            <div className="relative mt-8 h-64 lg:h-80 rounded-2xl overflow-hidden">
              <Image
                src={post.featured_image || post.image}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          <div className="mt-12 space-y-6">
            {post.content.split("\n\n").map((block: string, i: number) => {
              if (block.startsWith("## ")) {
                return <h2 key={i} className="text-2xl font-bold mt-10 mb-4 font-[family-name:var(--font-serif)]">{block.replace("## ", "")}</h2>;
              }
              if (block.startsWith("### ")) {
                return <h3 key={i} className="text-xl font-semibold mt-8 mb-3 font-[family-name:var(--font-serif)]">{block.replace("### ", "")}</h3>;
              }
              if (block.startsWith("- ")) {
                const items = block.split("\n").filter(l => l.startsWith("- "));
                return (
                  <ul key={i} className="list-disc pl-6 space-y-2 text-text-secondary leading-relaxed">
                    {items.map((item, j) => (
                      <li key={j}>{item.replace("- ", "")}</li>
                    ))}
                  </ul>
                );
              }
              if (block.match(/^\d+\./)) {
                const items = block.split("\n").filter(l => l.match(/^\d+\./));
                return (
                  <ol key={i} className="list-decimal pl-6 space-y-2 text-text-secondary leading-relaxed">
                    {items.map((item, j) => (
                      <li key={j}>{item.replace(/^\d+\.\s*/, "")}</li>
                    ))}
                  </ol>
                );
              }
              return <p key={i} className="text-text-secondary leading-relaxed text-lg">{block}</p>;
            })}
          </div>

          {/* CTA */}
          <div className="mt-16 p-8 rounded-2xl bg-gradient-to-br from-navy-50 to-orange-50 border border-navy-200 text-center">
            <h3 className="text-xl font-bold font-[family-name:var(--font-serif)]">
              Sourcing EV Charging Equipment from China?
            </h3>
            <p className="mt-2 text-text-secondary">
              I'm based in the Pearl River Delta with 11 years of supply chain experience.
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
      </main>
      <Footer />
    </>
  );
}
