'use client';

import { useState, useEffect } from 'react';
import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, Search, X } from "lucide-react";

interface BlogPost {
  slug: string;
  title: string;
  description: string;
  image: string | null;
  date: string;
  read_time: string;
  category: string;
  content: string;
}

export default function BlogSearchClient({ initialPosts }: { initialPosts: BlogPost[] }) {
  const [posts, setPosts] = useState<BlogPost[]>(initialPosts);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>(initialPosts);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = ['all', ...Array.from(new Set(posts.map(p => p.category)))];

  useEffect(() => {
    let results = posts;

    // Filter by category
    if (selectedCategory !== 'all') {
      results = results.filter(post => post.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      results = results.filter(post =>
        post.title.toLowerCase().includes(query) ||
        post.description.toLowerCase().includes(query) ||
        post.content.toLowerCase().includes(query) ||
        post.category.toLowerCase().includes(query)
      );
    }

    setFilteredPosts(results);
  }, [searchQuery, selectedCategory, posts]);

  const highlightText = (text: string, query: string) => {
    if (!query.trim()) return text;

    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return parts.map((part, i) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <mark key={i} className="bg-yellow-200 text-gray-900">{part}</mark>
      ) : (
        part
      )
    );
  };

  return (
    <>
      {/* Search Bar */}
      <div className="mb-8 space-y-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="搜索博客标题、内容或分类..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X size={20} />
            </button>
          )}
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category === 'all' ? '全部' : category}
            </button>
          ))}
        </div>

        {/* Results Count */}
        {(searchQuery || selectedCategory !== 'all') && (
          <div className="text-sm text-gray-600">
            找到 {filteredPosts.length} 篇文章
            {searchQuery && (
              <span className="ml-2">
                包含 "<span className="font-medium">{searchQuery}</span>"
              </span>
            )}
          </div>
        )}
      </div>

      {/* Blog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredPosts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group rounded-2xl overflow-hidden border border-border hover:shadow-lg transition-all hover:-translate-y-1"
          >
            <div className="relative h-52 overflow-hidden">
              <Image
                src={post.image || 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800&q=80'}
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
                {searchQuery ? highlightText(post.title, searchQuery) : post.title}
              </h2>
              <p className="mt-3 text-text-secondary text-sm leading-relaxed">
                {searchQuery ? highlightText(post.description, searchQuery) : post.description}
              </p>
              <div className="mt-4 flex items-center gap-4 text-xs text-text-secondary">
                <span className="flex items-center gap-1">
                  <Calendar size={12} />
                  {new Date(post.date).toLocaleDateString("zh-CN", { month: "short", day: "numeric", year: "numeric" })}
                </span>
                <span className="flex items-center gap-1">
                  <Clock size={12} />
                  {post.read_time}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <div className="text-center py-16">
          <div className="text-gray-400 mb-4">
            <Search size={64} className="mx-auto" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            没有找到相关文章
          </h3>
          <p className="text-gray-600 mb-6">
            试试其他关键词或浏览全部分类
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
            }}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            清除筛选
          </button>
        </div>
      )}
    </>
  );
}
