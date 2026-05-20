import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getAllPosts } from "@/lib/posts";
import { Calendar, Clock } from "lucide-react";

export const metadata = {
  title: "Blog — PearlGate | China Sourcing Guides & Tips",
  description: "Practical guides for sourcing from China. Learn how to find reliable suppliers, manage quality, and navigate Guangdong's industrial clusters.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <>
      <Navbar />
      <main className="pt-32 pb-24 min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="max-w-2xl">
            <h1 className="text-3xl lg:text-5xl font-bold font-[family-name:var(--font-serif)]">
              Sourcing Guides
            </h1>
            <p className="mt-4 text-text-secondary text-lg leading-relaxed">
              Practical knowledge from inside China&apos;s factories. No fluff — just what you need
              to source smarter.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group rounded-2xl overflow-hidden border border-border hover:shadow-lg transition-all hover:-translate-y-1"
              >
                <div className="relative h-52 overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-900/60 to-transparent" />
                  <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-xs font-medium px-3 py-1 rounded-full">
                    {post.category}
                  </span>
                </div>

                <div className="p-6">
                  <h2 className="text-xl font-semibold leading-snug group-hover:text-navy-700 transition-colors">
                    {post.title}
                  </h2>
                  <p className="mt-3 text-text-secondary text-sm leading-relaxed">
                    {post.description}
                  </p>
                  <div className="mt-4 flex items-center gap-4 text-xs text-text-secondary">
                    <span className="flex items-center gap-1">
                      <Calendar size={12} />
                      {new Date(post.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={12} />
                      {post.readTime}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
