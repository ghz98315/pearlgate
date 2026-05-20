"use client";

import Link from "next/link";
import { Database, Users, CheckCircle } from "lucide-react";
import { FadeIn } from "./Animations";

const databaseFeatures = [
  "30+ personally-vetted Guangdong factories",
  "Full contact details — WeChat, email, WhatsApp",
  "ISO 9001, CE, SGS, BSCI certifications on file",
  "Filter by category, city, MOQ, certification",
];

const agentFeatures = [
  "Submit your RFQ — we find the right factory",
  "All Chinese-language negotiation handled",
  "Pre-shipment QC inspection included",
  "Transparent 10–12% commission, nothing hidden",
];

export default function DualProduct() {
  return (
    <section className="py-24 lg:py-32 bg-navy-900 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)", backgroundSize: "56px 56px" }} />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
        <FadeIn>
          <div className="text-center mb-12">
            <p className="text-sm font-semibold text-orange-500 uppercase tracking-wider mb-3">
              Two Ways to Source
            </p>
            <h2 className="text-3xl lg:text-4xl font-bold text-white font-[family-name:var(--font-serif)]">
              Browse it yourself.
              <br />
              <span className="text-white/40">Or let us handle everything.</span>
            </h2>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Database Card */}
          <div className="bg-[#1E293B] border border-[#334155] rounded-2xl p-7">
            <div className="inline-flex items-center gap-2 bg-teal-500/10 border border-teal-500/20 rounded-full px-3 py-1 text-xs font-semibold text-teal-400 mb-5">
              <Database size={12} />
              Factory Database
            </div>
            <h3 className="text-xl font-bold text-white font-[family-name:var(--font-serif)] mb-2">
              The Private Supplier Directory
            </h3>
            <p className="text-sm text-white/50 leading-relaxed mb-6">
              Searchable database of verified Guangdong factories. Real contacts — no middlemen, no Alibaba noise.
            </p>

            <div className="space-y-3 mb-6">
              {databaseFeatures.map((feat) => (
                <div key={feat} className="flex items-start gap-2.5">
                  <div className="w-4 h-4 rounded-full bg-teal-500/20 flex items-center justify-center shrink-0 mt-0.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-teal-500" />
                  </div>
                  <span className="text-sm text-white/80">{feat}</span>
                </div>
              ))}
            </div>

            <div className="pt-5 border-t border-[#334155] flex items-center justify-between">
              <div>
                <span className="text-2xl font-bold text-white">$79</span>
                <span className="text-sm text-white/40">/month</span>
                <p className="text-xs text-white/30 mt-1">or $699/year — save 26%</p>
              </div>
              <Link
                href="/pricing"
                className="bg-teal-600 hover:bg-teal-700 text-white font-semibold px-5 py-2.5 rounded-lg text-sm transition-all hover:-translate-y-0.5"
              >
                Start Browsing
              </Link>
            </div>
          </div>

          {/* Sourcing Agent Card */}
          <div className="bg-orange-500 rounded-2xl p-7">
            <div className="inline-flex items-center gap-2 bg-black/10 border border-black/10 rounded-full px-3 py-1 text-xs font-semibold text-orange-900 mb-5">
              <Users size={12} />
              Full Sourcing Agent
            </div>
            <h3 className="text-xl font-bold text-navy-900 font-[family-name:var(--font-serif)] mb-2">
              We Source It For You
            </h3>
            <p className="text-sm text-orange-900/70 leading-relaxed mb-6">
              Tell us what you need. We match you to the right factory, handle all negotiations in Chinese, and manage QC start to finish.
            </p>

            <div className="space-y-3 mb-6">
              {agentFeatures.map((feat) => (
                <div key={feat} className="flex items-start gap-2.5">
                  <div className="w-4 h-4 rounded-full bg-black/10 flex items-center justify-center shrink-0 mt-0.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-orange-900" />
                  </div>
                  <span className="text-sm text-orange-900/80">{feat}</span>
                </div>
              ))}
            </div>

            <div className="pt-5 border-t border-orange-600/30 flex items-center justify-between">
              <div>
                <span className="text-2xl font-bold text-navy-900">10–12%</span>
                <span className="text-sm text-orange-900/60"> commission</span>
                <p className="text-xs text-orange-900/50 mt-1">or $199/mo retainer</p>
              </div>
              <Link
                href="/quote"
                className="bg-navy-900 hover:bg-navy-800 text-white font-semibold px-5 py-2.5 rounded-lg text-sm transition-all hover:-translate-y-0.5"
              >
                Book a Call
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
