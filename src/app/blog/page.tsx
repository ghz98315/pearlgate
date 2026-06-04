import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { createClient } from '@supabase/supabase-js';
import BlogSearchClient from '@/components/BlogSearchClient';
import { generateSEOMetadata } from '@/lib/seo';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// 使用动态渲染，确保始终显示最新博客数据
export const dynamic = 'force-dynamic';

export const metadata = generateSEOMetadata({
  title: 'Blog — EV Charging Supply Chain Guides & Sourcing Insights',
  description: 'Expert insights on sourcing EV charging equipment from China. Learn from 11+ years of supply chain experience, including BYD background. Covering standards, certifications, supplier verification, and market trends.',
  url: '/blog',
  type: 'website',
});

async function getPosts() {
  const supabase = createClient(supabaseUrl, supabaseKey);

  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('published', true)
    .order('date', { ascending: false });

  if (error) {
    console.error('Error fetching posts:', error);
    return [];
  }

  return data || [];
}

export default async function BlogPage() {
  const posts = await getPosts();

  // JSON-LD for blog list
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'PearlGate Blog',
    description: 'Expert insights on sourcing EV charging equipment from China',
    url: 'https://pearlgate.com/blog',
    blogPost: posts.map(post => ({
      '@type': 'BlogPosting',
      headline: post.title,
      description: post.description,
      image: post.image,
      datePublished: post.date,
      url: `https://pearlgate.com/blog/${post.slug}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <main className="pt-32 pb-24 min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="max-w-2xl mb-12">
            <h1 className="text-3xl lg:text-5xl font-bold font-[family-name:var(--font-serif)]">
              Sourcing Guides
            </h1>
            <p className="mt-4 text-text-secondary text-lg leading-relaxed">
              Practical knowledge from inside China&apos;s factories. No fluff — just what you need
              to source smarter.
            </p>
          </div>

          <BlogSearchClient initialPosts={posts} />

          {posts.length === 0 && (
            <div className="mt-16 text-center text-text-secondary">
              暂无博客文章
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
