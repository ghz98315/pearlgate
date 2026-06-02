"use client";

import Link from "next/link";
import { Cable, Zap, Package, Plug, ChevronRight, Factory } from "lucide-react";
import { FadeIn, Stagger, StaggerItem } from "./Animations";

const productCategories = [
  {
    icon: Cable,
    name: "CCS1 DC Cables",
    supplierCount: 5,
    specs: "150A-250A, UL 2251/2594",
    priceRange: "$180-$450/unit",
    link: "/products/ccs1-cable",
    color: "from-blue-500 to-blue-600",
  },
  {
    icon: Cable,
    name: "CCS2 DC Cables",
    supplierCount: 3,
    specs: "150A-200A, IEC 62196-3",
    priceRange: "$160-$420/unit",
    link: "/products/ccs2-cable",
    color: "from-purple-500 to-purple-600",
  },
  {
    icon: Zap,
    name: "NACS Cables",
    supplierCount: 4,
    specs: "250A, SAE J3400",
    priceRange: "$200-$520/unit",
    link: "/products/nacs-cable",
    color: "from-orange-500 to-orange-600",
  },
  {
    icon: Cable,
    name: "Type 2 AC Cables",
    supplierCount: 6,
    specs: "16A-32A, IEC 62196-2",
    priceRange: "$28-$55/unit",
    link: "/products/type2-cable",
    color: "from-green-500 to-green-600",
  },
  {
    icon: Package,
    name: "Portable EVSE",
    supplierCount: 3,
    specs: "Level 1/2, 16A-40A",
    priceRange: "$55-$140/unit",
    link: "/products/portable-evse",
    color: "from-teal-500 to-teal-600",
  },
  {
    icon: Plug,
    name: "Connectors & Adapters",
    supplierCount: 4,
    specs: "CCS, NACS, Type 1/2",
    priceRange: "$18-$180/unit",
    link: "/products/connectors",
    color: "from-indigo-500 to-indigo-600",
  },
];

const featuredSuppliers = [
  {
    name: "Dongguan Xinghe Precision",
    specialties: ["CCS1/CCS2 Cables", "UL Certified"],
    moq: "500 units",
    tier: "Mid-range pricing",
  },
  {
    name: "Shenzhen EV Power Tech",
    specialties: ["NACS", "High-power liquid cooling"],
    moq: "1000 units",
    tier: "Premium quality",
  },
  {
    name: "Guangzhou Charging Solutions",
    specialties: ["Type 2 AC", "Portable EVSE"],
    moq: "500 units",
    tier: "Cost-effective",
  },
];

export default function DatabasePreview() {
  return (
    <section className="py-24 lg:py-32 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <FadeIn>
          <p className="text-sm font-semibold text-orange-600 uppercase tracking-wider mb-3 text-center">
            Verified EVSE & Connector Database
          </p>
          <h2 className="text-3xl lg:text-4xl font-bold text-center font-[family-name:var(--font-serif)]">
            Browse by Charging Standard & EVSE Type
          </h2>
          <p className="mt-3 text-text-secondary text-center text-lg max-w-2xl mx-auto">
            Every charging equipment OEM personally verified. UL/IEC certifications checked. Proven connector production capabilities.
          </p>
        </FadeIn>

        {/* Product Categories Grid */}
        <div className="mt-16">
          <h3 className="text-xl font-semibold mb-6">Browse by Charging Standard & Connector Type</h3>
          <Stagger staggerDelay={0.08} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {productCategories.map((product) => (
              <StaggerItem key={product.name}>
                <Link
                  href={product.link}
                  className="group block bg-white border-2 border-gray-200 hover:border-orange-400 rounded-2xl p-6 transition-all hover:shadow-lg hover:-translate-y-1"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${product.color} flex items-center justify-center`}>
                      <product.icon size={24} className="text-white" />
                    </div>
                    <span className="text-xs font-semibold bg-orange-100 text-orange-700 px-3 py-1 rounded-full">
                      {product.supplierCount} OEMs
                    </span>
                  </div>

                  <h4 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
                    {product.name}
                  </h4>

                  <div className="space-y-1.5 mb-4">
                    <p className="text-xs text-gray-600">
                      <span className="font-medium">Specs:</span> {product.specs}
                    </p>
                    <p className="text-xs text-gray-600">
                      <span className="font-medium">Price:</span> {product.priceRange}
                    </p>
                  </div>

                  <div className="flex items-center gap-1 text-sm font-medium text-orange-600 group-hover:gap-2 transition-all">
                    View Certified OEMs
                    <ChevronRight size={16} />
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
        </div>

        {/* Supplier Browse Section */}
        <div className="mt-20">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold">Or Browse by Verified EVSE Manufacturer</h3>
            <Link
              href="/suppliers"
              className="text-sm font-medium text-orange-600 hover:text-orange-700 flex items-center gap-1"
            >
              View All 7 Charging Equipment OEMs
              <ChevronRight size={16} />
            </Link>
          </div>

          <Stagger staggerDelay={0.1} className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {featuredSuppliers.map((supplier) => (
              <StaggerItem key={supplier.name}>
                <div className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-navy-100 flex items-center justify-center flex-shrink-0">
                      <Factory size={20} className="text-navy-700" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-sm text-gray-900 truncate">
                        {supplier.name}
                      </h4>
                      <p className="text-xs text-gray-500 mt-0.5">Pearl River Delta</p>
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex flex-wrap gap-1.5">
                      {supplier.specialties.map((spec) => (
                        <span
                          key={spec}
                          className="text-xs font-medium bg-orange-50 text-orange-700 px-2 py-1 rounded"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-600">
                      <span>MOQ: {supplier.moq}</span>
                      <span className="font-medium">{supplier.tier}</span>
                    </div>
                  </div>

                  <Link
                    href={`/suppliers/${supplier.name.toLowerCase().replace(/\s+/g, "-")}`}
                    className="block text-center text-sm font-semibold text-orange-600 hover:text-orange-700 hover:bg-orange-50 rounded-lg py-2 transition-colors"
                  >
                    View Details →
                  </Link>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>

        {/* CTA Section */}
        <FadeIn delay={0.6}>
          <div className="mt-16 p-8 rounded-2xl bg-gradient-to-br from-navy-900 via-navy-800 to-navy-700 text-center">
            <h3 className="text-2xl font-bold text-white font-[family-name:var(--font-serif)]">
              Not Sure Which EVSE Manufacturer to Choose?
            </h3>
            <p className="mt-3 text-white/80 text-lg max-w-2xl mx-auto">
              Tell me your charging equipment specs. I'll recommend 2-3 UL/IEC-certified OEMs that match your
              connector standards (CCS1/CCS2/NACS), certifications, and MOQ requirements. Free service, 48-hour turnaround.
            </p>
            <Link
              href="/supplier-match"
              className="inline-block mt-6 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-4 rounded-lg text-lg transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-orange-500/25"
            >
              Get Free EVSE Manufacturer Match
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
