"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Zap,
  Shield,
  Package,
  TrendingUp,
  Plug,
  RefreshCw,
  CheckCircle,
  ChevronRight,
  Beaker,
  Car,
  Globe,
  Battery
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RequestSampleModal from "@/components/RequestSampleModal";
import { FadeIn, Stagger, StaggerItem } from "@/components/Animations";

const standards = [
  {
    adapter: "CCS1 to NACS",
    useCase: "Tesla Supercharger access for non-Tesla EVs",
    current: "Up to 250A DC",
    certification: "UL / SAE J3400",
  },
  {
    adapter: "NACS to CCS1",
    useCase: "CCS1 station access for Tesla vehicles",
    current: "Up to 250A DC",
    certification: "UL 2594",
  },
  {
    adapter: "CCS2 to CCS1",
    useCase: "Cross-market compatibility (EU to US)",
    current: "Up to 200A DC",
    certification: "UL / IEC 62196",
  },
  {
    adapter: "Type 1 to Type 2",
    useCase: "AC charging cross-compatibility",
    current: "16A-32A AC",
    certification: "IEC 62196-2",
  },
  {
    adapter: "CHAdeMO to CCS",
    useCase: "Legacy vehicle access to CCS stations",
    current: "Up to 125A DC",
    certification: "CHAdeMO / IEC",
  },
  {
    adapter: "NEMA 14-50 to J1772",
    useCase: "Home outlet to EV connector",
    current: "32A-40A AC",
    certification: "UL 2251",
  },
];

const useCases = [
  {
    icon: Car,
    title: "Tesla Supercharger Access",
    description: "Non-Tesla EVs accessing Tesla Supercharger network with CCS1-to-NACS adapters. Critical for US EV buyers post-2024 NACS adoption.",
    requirements: "250A DC rating, SAE J3400 compliance, UL certified, temperature monitoring, overcurrent protection",
  },
  {
    icon: Globe,
    title: "Cross-Market Travel",
    description: "European EVs (CCS2) traveling to North America (CCS1), or vice versa. Essential for international rental fleets and expat drivers.",
    requirements: "CCS1↔CCS2 adapter, 150-200A DC, IP54 rating, compact design for travel, UL + IEC dual certification",
  },
  {
    icon: Battery,
    title: "Home Charging Flexibility",
    description: "Adapt between outlet types (NEMA 5-15, 14-50, 6-50) and EV connectors (J1772, Type 2). Enables charging at Airbnb, hotels, RV parks.",
    requirements: "16A-40A AC, NEMA outlet compatibility, J1772/Type 2 output, portable design, GFCI protection",
  },
];

const faqs = [
  {
    q: "Can I use a CCS1-to-NACS adapter at Tesla Superchargers?",
    a: "Yes, but only if the Supercharger station is enabled for non-Tesla access (check Tesla app). The adapter must be UL certified and SAE J3400 compliant. Charging speed may be limited to 150A (not full 250A) depending on station and vehicle compatibility.",
  },
  {
    q: "Are EV charging adapters safe at maximum rated current?",
    a: "Only if properly certified. UL-certified adapters include temperature sensors, overcurrent protection, and ground fault protection. Uncertified adapters can overheat at high current—we've seen melted connectors from Alibaba adapters rated \"250A\" without proper testing. Always verify UL/IEC certification.",
  },
  {
    q: "Why are NACS adapters more expensive than Type 1/Type 2 adapters?",
    a: "NACS (Tesla connector) requires SAE J3400 compliance + UL certification, which involves extensive testing (temperature rise, dielectric withstand, 10,000 insertion cycles). Tesla's proprietary pins and communication protocol add engineering complexity. Budget adapters skip certification—avoid them.",
  },
  {
    q: "Can I charge at full speed with an adapter?",
    a: "Depends on adapter rating and weakest link in the chain. A 250A-rated adapter won't help if the charging station outputs 125A or your vehicle accepts 150A max. Always match adapter rating to your vehicle's DC charging capability (check owner's manual).",
  },
  {
    q: "What's the MOQ and lead time for custom adapter orders?",
    a: "Standard adapters (CCS1↔NACS): 100-300 units MOQ, $80-$180 FOB, 20-30 days. Custom adapters (special connector combos): 300-500 units MOQ, $120-$250 FOB, 35-45 days. UL testing adds 8-12 weeks if not pre-certified.",
  },
  {
    q: "How do I spot a fake UL certification on an adapter?",
    a: "Check UL Product iQ database (database.ul.com)—search by manufacturer name and model number. Real UL certs include a unique file number (e.g., E123456). If the certificate shows a photo without a file number, it's fake. We verify all OEM certifications before recommendations.",
  },
];

const relatedProducts = [
  {
    slug: "ccs1-cable",
    name: "CCS1 DC Charging Cables",
  },
  {
    slug: "nacs-cable",
    name: "NACS Charging Cables",
  },
];

export default function EVChargingAdaptersPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Navbar />
      <RequestSampleModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        productName="EV Charging Adapters"
        productCategory="Charging Adapters"
        productUrl={typeof window !== 'undefined' ? window.location.href : ''}
      />

      <main className="min-h-screen bg-white">
        {/* Hero Section with CTA #1 */}
        <section className="pt-32 pb-16 px-6 bg-gradient-to-br from-navy-900 via-navy-800 to-navy-700">
          <div className="max-w-4xl mx-auto text-center">
            <FadeIn>
              <span className="inline-block px-4 py-1.5 text-sm font-semibold text-orange-300 bg-orange-500/20 uppercase tracking-wider mb-6 rounded-full">
                Product Category
              </span>
              <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6 font-[family-name:var(--font-serif)]">
                EV Charging Adapters
              </h1>
              <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed mb-8">
                Source CCS1-to-NACS, CCS2-to-CCS1, Type 1/Type 2 adapters from verified China OEMs. UL and SAE J3400 certified,
                up to 250A DC rating, essential for Tesla Supercharger access and cross-market compatibility.
              </p>

              <button
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-4 rounded-lg transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-orange-500/25"
              >
                <Beaker size={20} />
                Request Adapter Samples
              </button>
            </FadeIn>
          </div>
        </section>

        {/* What is EV Charging Adapter */}
        <section className="py-16 px-6 bg-white">
          <div className="max-w-4xl mx-auto">
            <FadeIn>
              <h2 className="text-3xl font-bold mb-6 font-[family-name:var(--font-serif)]">
                What is an EV Charging Adapter?
              </h2>
              <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-4">
                <p>
                  An <strong>EV charging adapter</strong> is a connector interface that enables compatibility between different charging standards—allowing
                  an electric vehicle with one connector type (e.g., CCS1) to charge at a station designed for another standard (e.g., NACS/Tesla Supercharger).
                  As the EV market fragments across competing standards (CCS, NACS, CHAdeMO, GB/T), adapters have become essential for cross-network charging access,
                  international travel, and fleet interoperability.
                </p>
                <p>
                  The most critical adapter in 2024-2026 is <strong>CCS1-to-NACS</strong>, which allows non-Tesla EVs to access Tesla's 50,000+ Supercharger
                  network in North America. Following Tesla's NACS connector standardization (adopted by Ford, GM, Rivian, and others), legacy CCS1 vehicles
                  now require adapters to benefit from Tesla's charging infrastructure. These adapters must meet <strong>SAE J3400</strong> (NACS standard)
                  and <strong>UL certification</strong>, supporting up to 250A DC fast charging while maintaining safety protocols (temperature monitoring,
                  ground fault protection, communication handshake).
                </p>
                <p>
                  <strong>AC charging adapters</strong> (Type 1↔Type 2, NEMA plug variations) are simpler devices handling 16A-40A at 230-400V. They convert
                  between regional outlet standards and vehicle inlet types, essential for home charging flexibility—especially for EV owners traveling between
                  North America (Type 1/J1772) and Europe (Type 2). <strong>DC fast charging adapters</strong> (CCS1↔CCS2, CHAdeMO↔CCS, CCS↔NACS) are
                  complex devices carrying 100A-250A DC power plus high-voltage communication signals, requiring robust electrical design to prevent arcing,
                  overheating, or pin damage during insertion.
                </p>
                <p>
                  When sourcing adapters from China OEMs, prioritize certification verification. <strong>UL certification</strong> (verify in UL Product iQ database)
                  ensures temperature rise testing (&lt;50K above ambient at rated current), dielectric withstand testing (2000V AC for 1 minute), and mechanical
                  endurance (10,000 insertion/removal cycles). For NACS adapters, <strong>SAE J3400 compliance</strong> is mandatory—Tesla's communication
                  protocol requires specific pin configurations and CAN bus signaling. Uncertified adapters (common on Alibaba) often fail at high current or
                  brick vehicle charging systems due to incorrect protocol implementation.
                </p>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Standards & Options */}
        <section className="py-16 px-6 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <FadeIn>
              <h2 className="text-3xl font-bold text-center mb-12 font-[family-name:var(--font-serif)]">
                Common Adapter Types & Applications
              </h2>
            </FadeIn>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse bg-white rounded-xl overflow-hidden shadow-sm">
                <thead>
                  <tr className="bg-navy-900 text-white">
                    <th className="px-6 py-4 text-left font-semibold">Adapter Type</th>
                    <th className="px-6 py-4 text-left font-semibold">Primary Use Case</th>
                    <th className="px-6 py-4 text-left font-semibold">Max Current</th>
                    <th className="px-6 py-4 text-left font-semibold">Required Certification</th>
                  </tr>
                </thead>
                <tbody>
                  {standards.map((std, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                      <td className="px-6 py-4 font-semibold text-gray-900">{std.adapter}</td>
                      <td className="px-6 py-4 text-gray-700">{std.useCase}</td>
                      <td className="px-6 py-4 text-gray-700">{std.current}</td>
                      <td className="px-6 py-4 text-gray-700">{std.certification}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Use Cases */}
        <section className="py-16 px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            <FadeIn>
              <h2 className="text-3xl font-bold text-center mb-12 font-[family-name:var(--font-serif)]">
                Use Cases & Applications
              </h2>
            </FadeIn>

            <Stagger staggerDelay={0.1} className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {useCases.map((useCase, idx) => (
                <StaggerItem key={idx}>
                  <div className="p-8 bg-gray-50 rounded-2xl h-full">
                    <div className="w-14 h-14 rounded-xl bg-orange-100 flex items-center justify-center mb-6">
                      <useCase.icon size={28} className="text-orange-600" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">{useCase.title}</h3>
                    <p className="text-gray-600 mb-4">{useCase.description}</p>
                    <div className="pt-4 border-t border-gray-200">
                      <p className="text-sm font-semibold text-gray-500 mb-2">Typical Requirements:</p>
                      <p className="text-sm text-gray-700">{useCase.requirements}</p>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>

        {/* CTA #2: After Use Cases */}
        <section className="py-12 px-6 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <div className="p-8 rounded-2xl bg-white border-2 border-orange-200 flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Ready to Source EV Charging Adapters?
                </h3>
                <p className="text-gray-600">
                  Get matched with verified OEMs offering UL/SAE J3400 certified adapters. Free service, 48-hour turnaround.
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-4 rounded-lg transition-all hover:-translate-y-0.5 whitespace-nowrap"
              >
                <Beaker size={20} />
                Request Samples
              </button>
            </div>
          </div>
        </section>

        {/* OEM Customization Services */}
        <section className="py-16 px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            <FadeIn>
              <h2 className="text-3xl font-bold text-center mb-12 font-[family-name:var(--font-serif)]">
                OEM Customization Services
              </h2>
            </FadeIn>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: Plug,
                  title: "Connector Combinations",
                  items: ["CCS1↔NACS", "CCS2↔CCS1", "Type 1↔Type 2", "CHAdeMO↔CCS"],
                },
                {
                  icon: Zap,
                  title: "Current Ratings",
                  items: ["AC: 16A-40A", "DC: 100A-125A", "DC: 150A-200A", "DC: 200A-250A"],
                },
                {
                  icon: Shield,
                  title: "Safety Features",
                  items: ["Temperature sensors", "Overcurrent protection", "Ground fault detection", "Communication validation"],
                },
                {
                  icon: Package,
                  title: "Branding & Testing",
                  items: ["Logo molding", "Custom packaging", "UL/SAE J3400 testing", "Certification coordination"],
                },
              ].map((service, idx) => (
                <div key={idx} className="p-6 bg-gray-50 rounded-xl">
                  <service.icon size={32} className="text-orange-500 mb-4" />
                  <h3 className="text-lg font-bold mb-3">{service.title}</h3>
                  <ul className="space-y-2">
                    {service.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                        <CheckCircle size={16} className="text-green-600 flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 px-6 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <FadeIn>
              <h2 className="text-3xl font-bold text-center mb-12 font-[family-name:var(--font-serif)]">
                Frequently Asked Questions
              </h2>
            </FadeIn>

            <div className="space-y-6">
              {faqs.map((faq, idx) => (
                <div key={idx} className="p-6 bg-white rounded-xl border-2 border-gray-200">
                  <h3 className="text-lg font-bold mb-3 text-gray-900">{faq.q}</h3>
                  <p className="text-gray-700 leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Related Products */}
        <section className="py-16 px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            <FadeIn>
              <h2 className="text-3xl font-bold text-center mb-12 font-[family-name:var(--font-serif)]">
                Related Products
              </h2>
            </FadeIn>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
              {relatedProducts.map((product) => (
                <Link
                  key={product.slug}
                  href={`/products/${product.slug}`}
                  className="group block bg-gray-50 rounded-2xl overflow-hidden border-2 border-gray-200 hover:border-orange-400 transition-all hover:shadow-lg"
                >
                  <div className="aspect-video bg-gray-200 relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Package size={48} className="text-gray-400" />
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-orange-600 transition-colors">
                      {product.name}
                    </h3>
                    <div className="flex items-center gap-2 text-orange-600 font-semibold mt-4 group-hover:gap-3 transition-all">
                      View Details
                      <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA #3: Bottom Section */}
        <section className="py-20 px-6 bg-navy-900">
          <div className="max-w-3xl mx-auto text-center">
            <FadeIn>
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4 font-[family-name:var(--font-serif)]">
                Source EV Charging Adapters from Verified OEMs
              </h2>
              <p className="text-white/80 text-lg mb-8">
                Submit your requirements and get matched with 2-3 UL/SAE J3400 certified adapter manufacturers.
                Free service, 48-hour turnaround.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="inline-flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-10 py-4 rounded-lg transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-orange-500/25"
                >
                  <Beaker size={20} />
                  Request Samples
                </button>
                <Link
                  href="/supplier-match"
                  className="inline-flex items-center justify-center gap-2 border-2 border-white/20 hover:border-white/40 text-white font-semibold px-10 py-4 rounded-lg transition-all"
                >
                  Find OEM Partners
                  <ChevronRight size={20} />
                </Link>
              </div>
            </FadeIn>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
