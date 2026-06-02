import Link from "next/link";
import { Cable, Zap, Package, Plug, ChevronRight, Beaker } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FadeIn, Stagger, StaggerItem } from "@/components/Animations";

const products = [
  {
    slug: "ccs1-cable",
    name: "CCS1 DC Charging Cables",
    icon: Cable,
    description: "150A-250A DC fast charging cables for CCS1 standard. UL 2251/2594 certified.",
    specs: "150A-250A, UL 2251/2594",
    priceRange: "$180-$450/unit",
    supplierCount: 5,
    color: "from-blue-500 to-blue-600",
  },
  {
    slug: "ccs2-cable",
    name: "CCS2 DC Charging Cables",
    icon: Cable,
    description: "European CCS2 DC charging cables. IEC 62196-3 compliant.",
    specs: "150A-200A, IEC 62196-3",
    priceRange: "$160-$420/unit",
    supplierCount: 3,
    color: "from-purple-500 to-purple-600",
  },
  {
    slug: "nacs-cable",
    name: "NACS (Tesla) Charging Cables",
    icon: Zap,
    description: "Tesla/North American Charging Standard cables. SAE J3400 compliant.",
    specs: "250A, SAE J3400",
    priceRange: "$200-$520/unit",
    supplierCount: 4,
    color: "from-orange-500 to-orange-600",
  },
  {
    slug: "type2-cable",
    name: "Type 2 AC Charging Cables",
    icon: Cable,
    description: "IEC 62196-2 Mode 3 AC charging cables. Most common in Europe & China.",
    specs: "16A-32A, IEC 62196-2",
    priceRange: "$28-$55/unit",
    supplierCount: 6,
    color: "from-green-500 to-green-600",
  },
  {
    slug: "portable-evse",
    name: "Portable EVSE Units",
    icon: Package,
    description: "Level 1/2 portable charging stations. UL/ETL listed for US market.",
    specs: "Level 1/2, 16A-40A",
    priceRange: "$55-$140/unit",
    supplierCount: 3,
    color: "from-teal-500 to-teal-600",
  },
  {
    slug: "connectors",
    name: "Connectors & Adapters",
    icon: Plug,
    description: "EVSE connectors, inlets, and cross-standard adapters.",
    specs: "CCS, NACS, Type 1/2",
    priceRange: "$18-$180/unit",
    supplierCount: 4,
    color: "from-indigo-500 to-indigo-600",
  },
];

export default function ProductsPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="pt-32 pb-16 px-6 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <FadeIn>
              <div className="text-center mb-4">
                <span className="inline-block px-4 py-1.5 text-sm font-semibold text-orange-600 uppercase tracking-wider mb-6">
                  EVSE & Connector Product Database
                </span>
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 font-[family-name:var(--font-serif)]">
                  Browse Verified EVSE Products
                </h1>
                <p className="text-lg text-text-secondary max-w-3xl mx-auto leading-relaxed">
                  Every charging cable, connector, and EVSE unit personally verified with manufacturers.
                  Compare specs, certifications, pricing, and supplier options.
                </p>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
                <Link
                  href="/sample-request"
                  className="inline-flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-4 rounded-lg transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-orange-500/25"
                >
                  <Beaker size={20} />
                  Request Product Samples
                </Link>
                <Link
                  href="/suppliers"
                  className="inline-flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-900 font-semibold px-8 py-4 rounded-lg transition-all hover:-translate-y-0.5"
                >
                  View All Suppliers
                  <ChevronRight size={20} />
                </Link>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Products Grid */}
        <section className="px-6 py-24">
          <div className="max-w-7xl mx-auto">
            <Stagger staggerDelay={0.08} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <StaggerItem key={product.slug}>
                  <Link
                    href={`/products/${product.slug}`}
                    className="group block bg-white border-2 border-gray-200 hover:border-orange-400 rounded-2xl p-8 transition-all hover:shadow-lg hover:-translate-y-1"
                  >
                    <div className="flex items-start justify-between mb-6">
                      <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${product.color} flex items-center justify-center`}>
                        <product.icon size={28} className="text-white" />
                      </div>
                      <span className="text-xs font-semibold bg-orange-100 text-orange-700 px-3 py-1.5 rounded-full">
                        {product.supplierCount} OEMs
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-orange-600 transition-colors">
                      {product.name}
                    </h3>

                    <p className="text-gray-600 text-sm mb-5 leading-relaxed">
                      {product.description}
                    </p>

                    <div className="space-y-2 mb-6 pb-6 border-b border-gray-200">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">Specifications</span>
                        <span className="text-gray-900 font-medium">{product.specs}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">Price Range</span>
                        <span className="text-gray-900 font-medium">{product.priceRange}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-orange-600 font-semibold group-hover:gap-3 transition-all">
                      View Details & Suppliers
                      <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
