"use client";

import Link from "next/link";
import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { FadeIn, Float, Counter } from "./Animations";

export default function Trust() {
  return (
    <section className="py-24 lg:py-32 bg-gray-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <FadeIn direction="left">
            <Float>
              <div className="relative w-44 h-44 lg:w-56 lg:h-56 shrink-0">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-navy-700 to-orange-500 opacity-20" />
                <div className="absolute inset-2 rounded-full overflow-hidden bg-navy-900/10">
                  <Image
                    src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80"
                    alt="Professional portrait"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-navy-900/30 mix-blend-multiply" />
                </div>
                <div className="absolute -bottom-2 -right-2 bg-white rounded-full px-3 py-1 shadow-md border border-border">
                  <span className="text-xs font-medium text-navy-700">BYD Alumni</span>
                </div>
              </div>
            </Float>
          </FadeIn>

          <FadeIn direction="right" delay={0.2}>
            <div>
              <h2 className="text-2xl lg:text-3xl font-bold font-[family-name:var(--font-serif)]">
                &ldquo;I&apos;ve been inside hundreds of factories — now I go in for you.&rdquo;
              </h2>
              <p className="mt-4 text-text-secondary leading-relaxed">
                I spent 8+ years managing factory operations at BYD — one of China&apos;s largest
                manufacturers. Now I help overseas businesses source directly from Guangdong&apos;s
                best factories with confidence.
              </p>
              <div className="mt-6 flex flex-wrap gap-3 text-sm text-text-secondary">
                <span className="bg-white px-3 py-1.5 rounded-full border border-border"><Counter target={8} suffix="+" /> years in manufacturing</span>
                <span className="bg-white px-3 py-1.5 rounded-full border border-border"><Counter target={10} suffix="+" /> verified factory partners</span>
                <span className="bg-white px-3 py-1.5 rounded-full border border-border">Guangdong-based</span>
              </div>
              <div className="mt-6 flex items-center gap-4">
                <Link href="/about" className="text-orange-500 hover:text-orange-600 font-semibold text-sm transition-colors">
                  Read my full story →
                </Link>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-text-secondary hover:text-navy-700 text-sm transition-colors"
                >
                  LinkedIn <ExternalLink size={14} />
                </a>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
