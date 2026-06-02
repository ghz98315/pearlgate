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
            Ready to source from UL/IEC-certified EVSE manufacturers?
          </h2>
          <p className="mt-4 text-white/50 text-lg max-w-md mx-auto">
            Submit your charging equipment specs and get matched with 2-3 verified OEMs within 48 hours.
            CCS1/CCS2/NACS connectors, DC fast charging cables, Level 2 EVSE. Completely free.
          </p>

          <div className="mt-8 flex flex-wrap gap-4 justify-center">
            <Link
              href="/quote"
              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-3.5 rounded-lg text-base transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-orange-500/25"
            >
              Submit EVSE Inquiry
            </Link>
            <Link
              href="/products"
              className="border border-white/20 hover:border-white/40 text-white/70 hover:text-white font-medium px-8 py-3.5 rounded-lg text-base transition-all"
            >
              Browse Products
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
