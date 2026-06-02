"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Zap,
  Shield,
  Package,
  TrendingUp,
  Home,
  Building2,
  Truck,
  CheckCircle,
  ChevronRight,
  Beaker,
  BookOpen
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RequestSampleModal from "@/components/RequestSampleModal";
import { FadeIn, Stagger, StaggerItem } from "@/components/Animations";

const standards = [
  {
    standard: "Type 1 (SAE J1772)",
    market: "North America",
    current: "16A-32A",
    voltage: "120V/240V AC",
    certification: "UL 2594",
  },
  {
    standard: "Type 2 (IEC 62196-2)",
    market: "Europe/China",
    current: "16A-32A",
    voltage: "230V/400V AC",
    certification: "CE/IEC 62196",
  },
  {
    standard: "GB/T 20234",
    market: "China",
    current: "16A-32A",
    voltage: "220V AC",
    certification: "CCC/GB/T",
  },
  {
    standard: "NACS (Tesla)",
    market: "North America",
    current: "Up to 48A",
    voltage: "120V/240V AC",
    certification: "UL/SAE J3400",
  },
];

const useCases = [
  {
    icon: Home,
    title: "Home/Residential Charging",
    description: "Single-family homes, apartments, condos. Wall-mounted or portable Level 1/2 EVSE for overnight charging.",
    requirements: "16A-32A, Type 1/2/NACS connector, RFID optional, WiFi/Bluetooth app control",
  },
  {
    icon: Building2,
    title: "Commercial/Workplace Charging",
    description: "Office buildings, retail parking, hotels. Multiple-port charging stations for employee/customer use.",
    requirements: "32A-40A, Load management, RFID access control, OCPP network integration",
  },
  {
    icon: Truck,
    title: "Fleet & Emergency Charging",
    description: "Delivery fleets, ride-sharing, roadside assistance. Portable units for mobile/emergency scenarios.",
    requirements: "Portable design, 16A-32A adjustable, multiple connector types, rugged casing",
  },
];

const faqs = [
  {
    q: "What's the difference between Level 1 and Level 2 portable EVSE?",
    a: "Level 1 uses 120V household outlet (12A, ~4-5 miles/hour charge). Level 2 uses 240V outlet (16-32A, ~15-30 miles/hour). Level 2 requires dedicated circuit but charges 3-6x faster.",
  },
  {
    q: "Do portable EV chargers need professional installation?",
    a: "Level 1 chargers plug into standard 120V outlet (no installation). Level 2 requires 240V outlet—if you don't have one, electrician must install NEMA 14-50 or hardwired connection.",
  },
  {
    q: "Which certifications are required for US/EU markets?",
    a: "US: UL 2594 (EVSE safety), FCC (EMC), ETL optional. Europe: CE mark, IEC 62196 (connector), RoHS. Always verify certification in UL/TUV databases—photos aren't proof.",
  },
  {
    q: "Can I customize cable length and connector type?",
    a: "Yes. Most OEMs offer 5m-7.5m cable (16-25ft), Type 1/Type 2/NACS connectors, custom branding/color, and WiFi/Bluetooth options. MOQ typically 500-1000 units for full customization.",
  },
  {
    q: "What's the typical MOQ and lead time from China OEMs?",
    a: "Standard models: 100-500 units MOQ, 20-30 days lead time. Custom OEM: 500-1000 units MOQ, 35-45 days. Sample orders (1-10 units) available in 7-10 days.",
  },
  {
    q: "How do I verify an OEM's UL/CE certification is real?",
    a: "Check UL Product iQ database (database.ul.com) for UL certs. For CE, request test reports from TUV/SGS labs and verify lab accreditation. We verify all certifications before recommending OEMs.",
  },
];

const relatedProducts = [
  {
    slug: "type2-cable",
    name: "Type 2 AC Charging Cables",
    image: "/products/type2-cable.jpg",
  },
  {
    slug: "ccs1-cable",
    name: "CCS1 DC Charging Cables",
    image: "/products/ccs1-cable.jpg",
  },
  {
    slug: "connectors",
    name: "Connectors & Adapters",
    image: "/products/connectors.jpg",
  },
];

export default function PortableEVChargersPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Navbar />
      <RequestSampleModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        productName="Portable EV Chargers"
        productCategory="Portable EVSE"
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
                Portable EV Chargers (EVSE)
              </h1>
              <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed mb-8">
                Source Level 1/2 portable EVSE from verified China OEMs. UL/CE certified, customizable branding,
                16A-40A AC charging for home, commercial, and fleet applications.
              </p>

              <button
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-4 rounded-lg transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-orange-500/25"
              >
                <Beaker size={20} />
                Request EVSE Samples
              </button>
            </FadeIn>
          </div>
        </section>

        {/* What is Portable EV Charger */}
        <section className="py-16 px-6 bg-white">
          <div className="max-w-4xl mx-auto">
            <FadeIn>
              <h2 className="text-3xl font-bold mb-6 font-[family-name:var(--font-serif)]">
                What is a Portable EV Charger (EVSE)?
              </h2>
              <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-4">
                <p>
                  A <strong>portable EV charger</strong> (Electric Vehicle Supply Equipment, or EVSE) is a mobile AC charging device
                  that connects your electric vehicle to a standard electrical outlet or dedicated circuit. Unlike fixed wall-mounted
                  charging stations, portable EVSE units are designed for easy transport and installation-free operation, making them
                  ideal for home use, emergency charging, fleet operations, and rental scenarios.
                </p>
                <p>
                  Portable EVSE typically operates at <strong>Level 1 (120V, 12-16A)</strong> or <strong>Level 2 (240V, 16-40A)</strong>.
                  Level 1 chargers plug into standard household outlets and deliver 4-5 miles of range per hour—sufficient for overnight
                  charging. Level 2 chargers require a 240V outlet (NEMA 14-50, NEMA 6-50, or hardwired connection) and deliver
                  15-40 miles of range per hour, charging most EVs in 4-8 hours.
                </p>
                <p>
                  Modern portable EVSE includes safety features like <strong>ground fault protection (GFCI)</strong>, <strong>over-current
                  protection</strong>, <strong>over-temperature shutoff</strong>, and <strong>surge protection</strong>. Advanced models
                  offer WiFi/Bluetooth connectivity for app-based monitoring, adjustable amperage, RFID access control, and OCPP compatibility
                  for commercial fleet management.
                </p>
                <p>
                  When sourcing portable EVSE from China OEMs, verify <strong>UL 2594 certification</strong> (North America),
                  <strong>CE + IEC 62196 compliance</strong> (Europe), or <strong>CCC certification</strong> (China domestic).
                  Reliable manufacturers provide test reports from accredited labs (UL, TUV, SGS) showing temperature rise testing,
                  dielectric withstand testing, and endurance testing results.
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
                EVSE Standards & Connector Options
              </h2>
            </FadeIn>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse bg-white rounded-xl overflow-hidden shadow-sm">
                <thead>
                  <tr className="bg-navy-900 text-white">
                    <th className="px-6 py-4 text-left font-semibold">Standard</th>
                    <th className="px-6 py-4 text-left font-semibold">Target Market</th>
                    <th className="px-6 py-4 text-left font-semibold">Current Rating</th>
                    <th className="px-6 py-4 text-left font-semibold">Voltage</th>
                    <th className="px-6 py-4 text-left font-semibold">Required Certification</th>
                  </tr>
                </thead>
                <tbody>
                  {standards.map((std, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                      <td className="px-6 py-4 font-semibold text-gray-900">{std.standard}</td>
                      <td className="px-6 py-4 text-gray-700">{std.market}</td>
                      <td className="px-6 py-4 text-gray-700">{std.current}</td>
                      <td className="px-6 py-4 text-gray-700">{std.voltage}</td>
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
                  Ready to Source Portable EVSE?
                </h3>
                <p className="text-gray-600">
                  Get matched with verified OEMs offering UL/CE certified portable chargers. Free service, 48-hour turnaround.
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
                  icon: Package,
                  title: "Custom Branding",
                  items: ["Logo printing/engraving", "Custom color housing", "Branded packaging", "User manual design"],
                },
                {
                  icon: Zap,
                  title: "Technical Specs",
                  items: ["Cable length (5-10m)", "Current rating (16-40A)", "Connector type selection", "Voltage compatibility"],
                },
                {
                  icon: Shield,
                  title: "Smart Features",
                  items: ["WiFi/Bluetooth app", "RFID access control", "OCPP 1.6/2.0 protocol", "Load management"],
                },
                {
                  icon: TrendingUp,
                  title: "Certification Support",
                  items: ["UL/CE testing coordination", "FCC/EMC compliance", "Local market certs", "Test report translation"],
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

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                Source Portable EVSE from Verified China OEMs
              </h2>
              <p className="text-white/80 text-lg mb-8">
                Submit your requirements and get matched with 2-3 UL/CE certified manufacturers.
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
