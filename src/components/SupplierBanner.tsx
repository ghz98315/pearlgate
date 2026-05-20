import Link from "next/link";
import { Database, ArrowRight } from "lucide-react";

export default function SupplierBanner() {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="p-8 lg:p-10 rounded-2xl bg-gradient-to-r from-navy-900 to-navy-800 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
              <Database size={24} className="text-orange-500" />
            </div>
            <div>
              <h3 className="text-white font-semibold text-lg">Browse our Verified Supplier Database</h3>
              <p className="text-white/60 text-sm mt-0.5">
                Hand-picked factories across Guangdong. Each one personally visited and verified.
              </p>
            </div>
          </div>
          <Link
            href="/suppliers"
            className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-lg transition-all hover:-translate-y-0.5 whitespace-nowrap"
          >
            View Suppliers <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
