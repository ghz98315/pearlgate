"use client";

import Link from "next/link";
import { FadeIn } from "./Animations";

export default function CTA() {
  return (
    <section className="py-24 lg:py-32 bg-navy-900 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)", backgroundSize: "56px 56px" }} />

      <div className="max-w-3xl mx-auto px-6 lg:px-12 text-center relative">
        <FadeIn>
          <p className="text-sm font-semibold text-orange-500 uppercase tracking-wider mb-4">
            Start Today
          </p>
          <h2 className="text-3xl lg:text-4xl font-bold text-white font-[family-name:var(--font-serif)]">
            Stop guessing.
            <br />
            Start sourcing right.
          </h2>
          <p className="mt-4 text-white/50 text-lg max-w-md mx-auto">
            Join buyers who&apos;ve replaced Alibaba roulette with a database of factories they can actually trust.
          </p>

          {/* Price summary pill */}
          <div className="inline-flex items-center gap-5 bg-[#1E293B] border border-[#334155] rounded-2xl px-6 py-4 mt-8">
            <div className="text-center">
              <p className="text-[11px] text-white/40 mb-1">Pro Database</p>
              <p className="text-lg font-bold text-white font-[family-name:var(--font-serif)]">$79<span className="text-sm font-normal text-white/40">/mo</span></p>
            </div>
            <div className="w-px h-8 bg-[#334155]" />
            <div className="text-center">
              <p className="text-[11px] text-white/40 mb-1">Annual (-26%)</p>
              <p className="text-lg font-bold text-white font-[family-name:var(--font-serif)]">$699<span className="text-sm font-normal text-white/40">/yr</span></p>
            </div>
            <div className="w-px h-8 bg-[#334155]" />
            <div className="text-center">
              <p className="text-[11px] text-white/40 mb-1">Sourcing Agent</p>
              <p className="text-lg font-bold text-white font-[family-name:var(--font-serif)]">10–12%<span className="text-sm font-normal text-white/40"> comm.</span></p>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-4 justify-center">
            <Link
              href="/pricing"
              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-3.5 rounded-lg text-base transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-orange-500/25"
            >
              Get Access Now
            </Link>
            <Link
              href="/quote"
              className="border border-white/20 hover:border-white/40 text-white/70 hover:text-white font-medium px-8 py-3.5 rounded-lg text-base transition-all"
            >
              Book a Free Call
            </Link>
          </div>

          <p className="mt-5 text-sm text-white/30">
            Not sure yet?{" "}
            <Link href="/quote" className="text-white/50 underline hover:text-white/70 transition-colors">
              Get a free factory shortlist
            </Link>
            {" "}— 3 options in 48 hours, no payment.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
