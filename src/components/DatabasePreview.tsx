import Link from "next/link";
import { getAllSuppliers, type Supplier } from "@/lib/suppliers";
import { MapPin, Star, Lock, Shield } from "lucide-react";

export default async function DatabasePreview() {
  const suppliers = await getAllSuppliers();
  const previewSuppliers = suppliers.slice(0, 3);

  return (
    <section className="py-24 lg:py-32 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-sm font-semibold text-teal-600 uppercase tracking-wider mb-3">
              Inside the Database
            </p>
            <h2 className="text-3xl lg:text-4xl font-bold font-[family-name:var(--font-serif)]">
              A glimpse of what&apos;s waiting.
            </h2>
            <p className="mt-3 text-text-secondary">
              Factory names and contact details visible to Pro members only.
            </p>
          </div>
          <Link
            href="/suppliers"
            className="hidden md:inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-5 py-2.5 rounded-lg text-sm transition-all hover:-translate-y-0.5"
          >
            Unlock All
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {previewSuppliers.map((supplier) => (
            <PreviewCard key={supplier.id} supplier={supplier} />
          ))}
        </div>
        {/* Gate CTA */}
        <div className="mt-8 bg-navy-900 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="text-white font-semibold text-lg">
              See the full database — names, contacts, pricing, certifications.
            </h4>
            <p className="text-white/50 text-sm mt-1">
              30+ verified factories · New ones added monthly · Cancel anytime
            </p>
          </div>
          <div className="flex gap-3 shrink-0">
            <Link
              href="/pricing"
              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-5 py-2.5 rounded-lg text-sm transition-all hover:-translate-y-0.5 whitespace-nowrap"
            >
              Start for $79/mo
            </Link>
            <Link
              href="/quote"
              className="border border-white/20 hover:border-white/40 text-white/70 hover:text-white font-medium px-5 py-2.5 rounded-lg text-sm transition-all whitespace-nowrap"
            >
              Free Shortlist
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function PreviewCard({ supplier }: { supplier: Supplier }) {
  const clusterColors: Record<string, string> = {
    "Knives & Hand Tools": "bg-green-50 text-green-800",
    "Precision Parts & OEM": "bg-blue-50 text-blue-800",
    "Aluminum & Building Hardware": "bg-purple-50 text-purple-800",
    "Workwear & Corporate Uniforms": "bg-orange-50 text-orange-800",
  };

  const badgeColor = clusterColors[supplier.cluster] || "bg-gray-50 text-gray-800";

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-5 hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="flex justify-between items-start mb-3">
        <div>
          <span className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full ${badgeColor}`}>
            {supplier.cluster}
          </span>
          <p className="text-xs text-text-secondary mt-2 flex items-center gap-1">
            <MapPin size={10} /> {supplier.city}, Guangdong
          </p>
        </div>
        <div className="text-right">
          <div className="flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={12} className={i < supplier.qualityRating ? "text-orange-500 fill-orange-500" : "text-gray-200"} />
            ))}
            <span className="text-xs text-text-secondary ml-1 font-semibold">{supplier.qualityRating}.0</span>
          </div>
          <p className="text-[10px] text-teal-600 font-medium mt-1 flex items-center gap-0.5 justify-end">
            <Shield size={10} /> Verified
          </p>
        </div>
      </div>

      {/* Blurred name */}
      <div className="relative mb-4">
        <p className="text-base font-semibold text-gray-900 blur-[6px] select-none">
          {supplier.nameZh}
        </p>
        <div className="absolute inset-0 flex items-center">
          <span className="inline-flex items-center gap-1.5 bg-amber-50 border border-amber-200 rounded-md px-2.5 py-1 text-[11px] text-amber-800 font-semibold">
            <Lock size={11} /> Pro members only
          </span>
        </div>
      </div>

      {/* Mini stats */}
      <div className="grid grid-cols-2 gap-2 mb-4">
        <div className="bg-gray-50 rounded-lg px-3 py-2">
          <p className="text-[10px] text-text-secondary">MOQ</p>
          <p className="text-xs font-semibold">{supplier.moq}</p>
        </div>
        <div className="bg-gray-50 rounded-lg px-3 py-2">
          <p className="text-[10px] text-text-secondary">Employees</p>
          <p className="text-xs font-semibold">{supplier.employees}</p>
        </div>
      </div>

      {/* Certifications */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {supplier.certifications.slice(0, 3).map((cert) => (
          <span key={cert} className="text-[10px] font-semibold bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
            {cert}
          </span>
        ))}
      </div>

      {/* Blurred contact */}
      <div className="border-t border-gray-100 pt-3 flex items-center gap-2 blur-[5px] select-none">
        <div className="w-7 h-7 rounded-full bg-gray-200 shrink-0" />
        <div>
          <p className="text-xs font-medium">{supplier.contactName}</p>
          <p className="text-[10px] text-text-secondary">WeChat: {supplier.contactWechat}</p>
        </div>
      </div>
    </div>
  );
}
