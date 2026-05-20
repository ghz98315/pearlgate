import Link from "next/link";
import Image from "next/image";
import { getAllPosts } from "@/lib/posts";
import { Clock } from "lucide-react";

export default function BlogPreview() {
  const posts = getAllPosts().slice(0, 3);

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
            className="hidden md:inline-flex text-white/60 hover:text-white text-sm font-medium transition-colors"
          >
            View all articles →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group rounded-2xl overflow-hidden bg-white/5 border border-white/10 hover:border-white/20 transition-all hover:-translate-y-1"
            >
              <div className="relative h-40 overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-900/80 to-transparent" />
                <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-xs font-medium px-2.5 py-1 rounded-full text-navy-900">
                  {post.category}
                </span>
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
                  {post.readTime}
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
