"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import ChecklistDownload from "@/components/ChecklistDownload";
import SupplierCompare from "@/components/SupplierCompare";
import { type Supplier } from "@/lib/suppliers";
import { MapPin, Shield, Factory } from "lucide-react";

export default function SuppliersClient({ suppliers }: { suppliers: Supplier[] }) {
  const clusters = ["All", ...Array.from(new Set(suppliers.map((s) => s.cluster)))];
  const [filter, setFilter] = useState("All");

  const filtered = filter === "All" ? suppliers : suppliers.filter((s) => s.cluster === filter);

  return (
    <main className="pt-32 pb-24 min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 bg-navy-900/5 rounded-full px-4 py-1.5 text-sm text-navy-700 font-medium mb-4">
            <Shield size={14} />
            Every factory personally verified
          </div>
          <h1 className="text-3xl lg:text-5xl font-bold font-[family-name:var(--font-serif)]">
            Verified Supplier Directory
          </h1>
          <p className="mt-4 text-text-secondary text-lg leading-relaxed">
            Hand-picked factories across Guangdong&apos;s top industrial clusters.
            Each supplier is personally visited and verified by our team.
          </p>
          <div className="mt-4 flex items-center gap-6 text-sm text-text-secondary">
            <span className="flex items-center gap-1"><Factory size={14} /> {suppliers.length} Verified Factories</span>
            <span className="flex items-center gap-1"><MapPin size={14} /> {clusters.length - 1} Industrial Clusters</span>
          </div>
        </div>

        {/* Filters */}
        <div className="mt-10 flex flex-wrap gap-2">
          {clusters.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                filter === c
                  ? "bg-navy-900 text-white"
                  : "bg-gray-50 text-text-secondary hover:bg-gray-100"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Update notice */}
        <div className="mt-10 p-4 rounded-xl bg-navy-900/5 border border-navy-900/10 flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse shrink-0" />
          <p className="text-sm text-text-secondary">
            <span className="font-medium text-text-primary">Database growing monthly.</span>{" "}
            We add new verified factories every month. Subscribe to get notified of new additions.
          </p>
        </div>

        {/* Grid */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map((supplier) => (
            <Link key={supplier.id} href={`/suppliers/${supplier.id}`} className="block group">
              <SupplierCardContent supplier={supplier} />
            </Link>
          ))}
        </div>

        {/* Compare Tool */}
        <SupplierCompare suppliers={suppliers} />

        {/* Checklist Download */}
        <div className="mt-12">
          <ChecklistDownload />
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center p-10 rounded-2xl bg-gray-50 border border-border">
          <h3 className="text-xl font-bold font-[family-name:var(--font-serif)]">
            Need help choosing the right factory?
          </h3>
          <p className="mt-2 text-text-secondary">
            Submit an inquiry and we&apos;ll match you with 2-3 verified options within 48 hours. Free.
          </p>
          <Link
            href="/quote"
            className="inline-block mt-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-lg transition-all hover:-translate-y-0.5"
          >
            Submit an Inquiry
          </Link>
        </div>
      </div>
    </main>
  );
}

function SupplierCardContent({ supplier }: { supplier: Supplier }) {
  return (
    <div className="rounded-2xl overflow-hidden border border-border transition-all hover:shadow-lg hover:-translate-y-1">
      <div className="relative h-48 overflow-hidden">
        <Image
          src={supplier.images[0]}
          alt={supplier.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-900/70 to-transparent" />
        <div className="absolute bottom-4 left-5 right-5">
          <h3 className="text-white font-semibold text-lg">{supplier.name}</h3>
          <p className="text-white/70 text-sm flex items-center gap-1 mt-1">
            <MapPin size={12} /> {supplier.city}, Guangdong
          </p>
        </div>
        {supplier.isDirectFactory && (
          <span className="absolute top-4 right-4 bg-green-500/90 text-white text-xs font-medium px-2.5 py-1 rounded-full">
            Direct Factory
          </span>
        )}
      </div>

      <div className="p-5">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-xs font-medium bg-navy-900/5 text-navy-700 px-2.5 py-1 rounded-full">
            {supplier.cluster}
          </span>
          <span className="flex items-center gap-1 text-[10px] text-teal-600 font-medium">
            <Shield size={10} /> Verified
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <p className="text-text-secondary text-xs">MOQ</p>
            <p className="font-medium">{supplier.moq}</p>
          </div>
          <div>
            <p className="text-text-secondary text-xs">Lead Time</p>
            <p className="font-medium">{supplier.productionLeadTime}</p>
          </div>
          <div>
            <p className="text-text-secondary text-xs">Established</p>
            <p className="font-medium">{supplier.established}</p>
          </div>
          <div>
            <p className="text-text-secondary text-xs">Employees</p>
            <p className="font-medium">{supplier.employees}</p>
          </div>
        </div>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {supplier.certifications.slice(0, 3).map((cert) => (
            <span key={cert} className="text-xs bg-gray-100 text-text-secondary px-2 py-0.5 rounded">
              {cert}
            </span>
          ))}
          {supplier.certifications.length > 3 && (
            <span className="text-xs text-text-secondary">+{supplier.certifications.length - 3}</span>
          )}
        </div>
      </div>
    </div>
  );
}
