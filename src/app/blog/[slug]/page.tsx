import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EmailCapture from "@/components/EmailCapture";
import ReadingProgress from "@/components/ReadingProgress";
import { getAllPosts, getPostBySlug } from "@/lib/posts";
import { Calendar, Clock, ArrowLeft } from "lucide-react";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: `${post.title} — PearlGate`,
    description: post.description,
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <>
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
              {new Date(post.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
            </span>
            <span className="flex items-center gap-1">
              <Clock size={14} />
              {post.readTime}
            </span>
          </div>

          <div className="relative mt-8 h-64 lg:h-80 rounded-2xl overflow-hidden">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          <div className="mt-12 space-y-6">
            {post.content.split("\n\n").map((block, i) => {
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
          <div className="mt-16 p-8 rounded-2xl bg-gray-50 border border-border text-center">
            <h3 className="text-xl font-bold font-[family-name:var(--font-serif)]">
              Need help sourcing?
            </h3>
            <p className="mt-2 text-text-secondary">
              Send me your requirements — first quote is always free.
            </p>
            <div className="mt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/quote"
                className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-lg transition-all hover:-translate-y-0.5"
              >
                Get a Free Quote
              </Link>
              <Link
                href="/suppliers"
                className="text-navy-700 hover:text-navy-900 font-semibold px-6 py-3 rounded-lg border border-border hover:bg-gray-50 transition-colors"
              >
                Browse Verified Suppliers →
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
