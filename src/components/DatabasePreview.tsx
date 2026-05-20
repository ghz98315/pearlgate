import Link from "next/link";
import { getAllSuppliers, type Supplier } from "@/lib/suppliers";
import { MapPin, Shield, Users, Package } from "lucide-react";

export default async function DatabasePreview() {
  const suppliers = await getAllSuppliers();
  const previewSuppliers = suppliers.slice(0, 3);

  return (
    <section className="py-24 lg:py-32 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="mb-10">
          <p className="text-sm font-semibold text-teal-600 uppercase tracking-wider mb-3">
            Inside the Database
          </p>
          <h2 className="text-3xl lg:text-4xl font-bold font-[family-name:var(--font-serif)]">
            A glimpse of what&apos;s inside.
          </h2>
          <p className="mt-3 text-text-secondary">
            Every factory personally visited and verified. Submit an inquiry to get matched.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {previewSuppliers.map((supplier) => (
            <PreviewCard key={supplier.id} supplier={supplier} />
          ))}
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
    <div className="bg-white border border-gray-200 rounded-2xl p-5 hover:shadow-md transition-shadow flex flex-col">
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
        <p className="text-[10px] text-teal-600 font-medium flex items-center gap-0.5">
          <Shield size={10} /> Verified
        </p>
      </div>

      {/* Mini stats */}
      <div className="grid grid-cols-2 gap-2 mb-4">
        <div className="bg-gray-50 rounded-lg px-3 py-2">
          <p className="text-[10px] text-text-secondary flex items-center gap-1"><Package size={9} /> MOQ</p>
          <p className="text-xs font-semibold">{supplier.moq}</p>
        </div>
        <div className="bg-gray-50 rounded-lg px-3 py-2">
          <p className="text-[10px] text-text-secondary flex items-center gap-1"><Users size={9} /> Employees</p>
          <p className="text-xs font-semibold">{supplier.employees}</p>
        </div>
      </div>

      {/* Certifications */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {supplier.certifications.slice(0, 4).map((cert) => (
          <span key={cert} className="text-[10px] font-semibold bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
            {cert}
          </span>
        ))}
      </div>

      {/* CTA */}
      <div className="mt-auto pt-3 border-t border-gray-100">
        <Link
          href={`/quote?factory=${encodeURIComponent(supplier.name)}&category=${encodeURIComponent(supplier.cluster)}`}
          className="block text-center text-sm font-semibold text-orange-600 hover:text-orange-700 hover:bg-orange-50 rounded-lg py-2 transition-colors"
        >
          Inquire About This Factory →
        </Link>
      </div>
    </div>
  );
}
