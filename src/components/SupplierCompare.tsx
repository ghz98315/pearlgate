"use client";

import { useState } from "react";
import { type Supplier } from "@/lib/suppliers";
import { X, Scale } from "lucide-react";

export default function SupplierCompare({ suppliers: freeSuppliers }: { suppliers: Supplier[] }) {
  const [selected, setSelected] = useState<string[]>([]);
  const [showCompare, setShowCompare] = useState(false);

  const toggle = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : prev.length < 3 ? [...prev, id] : prev
    );
  };

  const selectedSuppliers = freeSuppliers.filter((s) => selected.includes(s.id));

  if (showCompare && selectedSuppliers.length >= 2) {
    return (
      <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[80vh] overflow-auto p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold font-[family-name:var(--font-serif)]">Supplier Comparison</h2>
            <button onClick={() => setShowCompare(false)} className="text-text-secondary hover:text-navy-900">
              <X size={24} />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-2 font-medium text-text-secondary w-36"></th>
                  {selectedSuppliers.map((s) => (
                    <th key={s.id} className="text-left py-3 px-3 font-semibold">{s.name}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <CompareRow label="City" suppliers={selectedSuppliers} field={(s) => s.city} />
                <CompareRow label="Established" suppliers={selectedSuppliers} field={(s) => String(s.established)} />
                <CompareRow label="Employees" suppliers={selectedSuppliers} field={(s) => s.employees} />
                <CompareRow label="MOQ" suppliers={selectedSuppliers} field={(s) => s.moq} />
                <CompareRow label="Price Range" suppliers={selectedSuppliers} field={(s) => s.priceRange} />
                <CompareRow label="Sample Lead Time" suppliers={selectedSuppliers} field={(s) => s.sampleLeadTime} />
                <CompareRow label="Production Lead Time" suppliers={selectedSuppliers} field={(s) => s.productionLeadTime} />
                <CompareRow label="Quality Rating" suppliers={selectedSuppliers} field={(s) => `${s.qualityRating}/5`} />
                <CompareRow label="Cooperation Rating" suppliers={selectedSuppliers} field={(s) => `${s.cooperationRating}/5`} />
                <CompareRow label="Certifications" suppliers={selectedSuppliers} field={(s) => s.certifications.join(", ")} />
                <CompareRow label="Payment" suppliers={selectedSuppliers} field={(s) => s.paymentMethods.join(", ")} />
                <CompareRow label="Port" suppliers={selectedSuppliers} field={(s) => s.shippingPort} />
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Selection UI */}
      <div className="mt-6 p-4 rounded-xl bg-navy-900/5 border border-navy-900/10">
        <div className="flex items-center gap-2 mb-3">
          <Scale size={16} className="text-navy-700" />
          <span className="text-sm font-medium">Compare suppliers (select 2-3)</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {freeSuppliers.map((s) => (
            <button
              key={s.id}
              onClick={() => toggle(s.id)}
              className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                selected.includes(s.id)
                  ? "bg-navy-900 text-white border-navy-900"
                  : "bg-white text-text-secondary border-border hover:border-navy-700"
              }`}
            >
              {s.name.split(" ").slice(0, 2).join(" ")}
            </button>
          ))}
        </div>
        {selected.length >= 2 && (
          <button
            onClick={() => setShowCompare(true)}
            className="mt-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-4 py-2 rounded-lg text-sm transition-all"
          >
            Compare {selected.length} Suppliers
          </button>
        )}
      </div>
    </>
  );
}

function CompareRow({ label, suppliers, field }: { label: string; suppliers: Supplier[]; field: (s: Supplier) => string }) {
  return (
    <tr className="border-b border-border">
      <td className="py-3 px-2 text-text-secondary font-medium">{label}</td>
      {suppliers.map((s) => (
        <td key={s.id} className="py-3 px-3">{field(s)}</td>
      ))}
    </tr>
  );
}
