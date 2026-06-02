"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Zap,
  Shield,
  Package,
  TrendingUp,
  Plug2,
  Factory,
  CheckCircle,
  ChevronRight,
  Beaker,
  Car,
  Building,
  Wrench
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RequestSampleModal from "@/components/RequestSampleModal";
import { FadeIn, Stagger, StaggerItem } from "@/components/Animations";

const standards = [
  {
    connector: "CCS1 Inlet/Plug",
    type: "DC Fast Charging",
    current: "150A-250A DC",
    market: "North America",
    certification: "UL 2594 / SAE J1772",
  },
  {
    connector: "CCS2 Inlet/Plug",
    type: "DC Fast Charging",
    current: "150-200A DC",
    market: "Europe/Global",
    certification: "IEC 62196-3",
  },
  {
    connector: "NACS Inlet/Plug",
    type: "AC/DC Combined",
    current: "Up to 250A DC",
    market: "North America",
    certification: "SAE J3400",
  },
  {
    connector: "Type 1 (J1772) Inlet/Plug",
    type: "AC Charging",
    current: "16A-32A AC",
    market: "North America/Japan",
    certification: "SAE J1772 / UL 2251",
  },
  {
    connector: "Type 2 (Mennekes) Inlet/Plug",
    type: "AC Charging",
    current: "16A-63A AC",
    market: "Europe/China",
    certification: "IEC 62196-2",
  },
  {
    connector: "CHAdeMO Inlet/Plug",
    type: "DC Fast Charging",
    current: "Up to 200A DC",
    market: "Japan/Legacy",
    certification: "CHAdeMO Protocol",
  },
];

const useCases = [
  {
    icon: Car,
    title: "EV Manufacturer Integration",
    description: "Vehicle OEMs integrating charging inlets into new EV models. Requires SAE/IEC compliance, crash testing, and IP67 waterproofing.",
    requirements: "Vehicle inlet: CCS1/CCS2/NACS, IP67 rating, vibration resistance, -40°C to +85°C operation, 10,000+ cycle endurance",
  },
  {
    icon: Building,
    title: "Charging Station Manufacturing",
    description: "EVSE manufacturers building DC fast chargers or AC wallbox units. Cable-side connectors (plugs) must meet UL/IEC standards.",
    requirements: "Cable plug: UL 2594 (DC) or UL 2251 (AC), temperature sensors, strain relief, contact resistance <0.5mΩ",
  },
  {
    icon: Wrench,
    title: "Replacement Parts & Repair",
    description: "Replacement inlets for damaged vehicle charge ports, or replacement plugs for worn charging cables. Must match OEM specifications.",
    requirements: "OEM-compatible pin configuration, same current rating, proper gasket/seal design, certification documentation",
  },
];

const faqs = [
  {
    q: "What's the difference between an inlet and a plug?",
    a: "An inlet (also called receptacle or socket) is the vehicle-side connector—the female port built into the EV. A plug (or connector) is the cable-side male connector that inserts into the inlet. Both must meet the same standard (e.g., CCS1) but are physically reversed.",
  },
  {
    q: "Can I use a CCS2 inlet on a vehicle designed for North America?",
    a: "Technically possible but not recommended. CCS2 inlets require AC pins compatible with 400V 3-phase (Europe), while North America uses 240V split-phase. You'd also need CCS2-compatible vehicle charge controller firmware. Stick with CCS1 for North America unless building a global-market vehicle.",
  },
  {
    q: "Why are NACS connectors becoming standard in North America?",
    a: "Tesla's NACS (SAE J3400) is smaller, handles both AC and DC in one connector, and Tesla has 50,000+ Superchargers already deployed. Ford, GM, Rivian adopted NACS in 2023-2024. By 2025, most new North American EVs will use NACS instead of CCS1.",
  },
  {
    q: "How do I verify a connector's UL or IEC certification?",
    a: "Check UL Product iQ database (database.ul.com) for UL 2594/2251 certs. For IEC 62196, request test reports from TUV/SGS showing temperature rise testing, dielectric withstand (2000V), and mechanical endurance (10,000 insertions). Don't accept photos—verify file numbers in official databases.",
  },
  {
    q: "What's the MOQ and lead time for custom connector orders?",
    a: "Vehicle inlets: 500-1,000 units MOQ, $45-$120 FOB, 35-45 days (requires mold setup). Cable plugs: 200-500 units MOQ, $80-$180 FOB, 30-40 days. UL/IEC testing adds 8-12 weeks if not pre-certified. Sample orders (5-10 units): 10-14 days.",
  },
  {
    q: "Can OEMs customize connector pin configurations?",
    a: "No. Pin layout is defined by SAE/IEC standards and cannot be modified—doing so breaks interoperability and safety compliance. You can customize housing color, branding, cable strain relief, and gasket materials, but electrical pin configuration must match the standard exactly.",
  },
];

const relatedProducts = [
  {
    slug: "ccs1-cable",
    name: "CCS1 DC Charging Cables",
  },
  {
    slug: "ev-charging-adapters",
    name: "EV Charging Adapters",
  },
];

export default function EVConnectorsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Navbar />
      <RequestSampleModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        productName="EV Connectors"
        productCategory="Connectors & Inlets"
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
                EV Connectors & Inlets
              </h1>
              <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed mb-8">
                Source CCS1/CCS2/NACS/Type 2 charging connectors and vehicle inlets from verified China OEMs.
                UL 2594 and IEC 62196 certified, 150A-250A DC rating, for EV manufacturers and charging station builders.
              </p>

              <button
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-4 rounded-lg transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-orange-500/25"
              >
                <Beaker size={20} />
                Request Connector Samples
              </button>
            </FadeIn>
          </div>
        </section>

        {/* What is EV Connector */}
        <section className="py-16 px-6 bg-white">
          <div className="max-w-4xl mx-auto">
            <FadeIn>
              <h2 className="text-3xl font-bold mb-6 font-[family-name:var(--font-serif)]">
                What is an EV Connector & Inlet?
              </h2>
              <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-4">
                <p>
                  An <strong>EV connector</strong> (also called a plug or cable-end connector) is the male interface at the end of a charging cable that
                  inserts into the vehicle's charging port. An <strong>EV inlet</strong> (also called a receptacle or vehicle-side socket) is the female
                  charging port integrated into the electric vehicle's body. Together, they form the physical and electrical interface for power transfer
                  between charging station and vehicle battery.
                </p>
                <p>
                  The connector/inlet pair must meet strict safety and interoperability standards defined by <strong>SAE</strong> (Society of Automotive Engineers,
                  North America) or <strong>IEC</strong> (International Electrotechnical Commission, Europe/Global). For DC fast charging, <strong>CCS1</strong>
                  (SAE J1772 Combo) dominates North America, <strong>CCS2</strong> (IEC 62196-3) dominates Europe, and <strong>NACS</strong> (SAE J3400, formerly Tesla)
                  is rapidly becoming the new North American standard post-2024. AC charging uses <strong>Type 1</strong> (SAE J1772) in North America and
                  <strong>Type 2</strong> (IEC 62196-2, Mennekes) in Europe/China.
                </p>
                <p>
                  Key technical requirements: <strong>current rating</strong> (16A-250A depending on AC/DC and power level), <strong>contact resistance</strong>
                  (&lt;0.5 milliohms for DC pins to minimize voltage drop), <strong>temperature rise</strong> (&lt;50K above ambient at rated current per UL 2594),
                  <strong>IP rating</strong> (IP54 minimum for outdoor use, IP67 for vehicle inlets), <strong>mechanical endurance</strong> (10,000 insertion/removal
                  cycles without degradation), and <strong>retention force</strong> (connector must stay locked during charging but release with &lt;100N pull force).
                </p>
                <p>
                  <strong>Vehicle inlet design</strong> involves additional complexity: integration with vehicle body panels (crash safety, aerodynamics),
                  waterproofing (gaskets, drain channels), cable retention latch mechanism, and proximity detection circuitry. <strong>Cable-side plugs</strong>
                  require strain relief for cable flexing, temperature sensors for thermal monitoring, and overcurrent protection circuits. High-power DC plugs
                  (200A+) often integrate liquid cooling channels to prevent overheating during 30-minute fast-charging sessions.
                </p>
                <p>
                  When sourcing connectors/inlets from China OEMs, verify <strong>UL 2594</strong> (North America DC), <strong>UL 2251</strong> (North America AC),
                  <strong>IEC 62196-3</strong> (Europe DC), or <strong>IEC 62196-2</strong> (Europe AC) certification. Request test reports showing temperature
                  rise at rated current, dielectric withstand testing (2000V AC for 1 minute), and insertion/extraction force testing. For vehicle inlets,
                  confirm IP67 rating and compatibility with OEM vehicle charge controller communication protocols (CAN bus, PLC).
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
                Connector & Inlet Standards
              </h2>
            </FadeIn>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse bg-white rounded-xl overflow-hidden shadow-sm">
                <thead>
                  <tr className="bg-navy-900 text-white">
                    <th className="px-6 py-4 text-left font-semibold">Connector Type</th>
                    <th className="px-6 py-4 text-left font-semibold">AC/DC</th>
                    <th className="px-6 py-4 text-left font-semibold">Current Rating</th>
                    <th className="px-6 py-4 text-left font-semibold">Target Market</th>
                    <th className="px-6 py-4 text-left font-semibold">Certification</th>
                  </tr>
                </thead>
                <tbody>
                  {standards.map((std, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                      <td className="px-6 py-4 font-semibold text-gray-900">{std.connector}</td>
                      <td className="px-6 py-4 text-gray-700">{std.type}</td>
                      <td className="px-6 py-4 text-gray-700">{std.current}</td>
                      <td className="px-6 py-4 text-gray-700">{std.market}</td>
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
                  Ready to Source EV Connectors?
                </h3>
                <p className="text-gray-600">
                  Get matched with verified OEMs offering UL/IEC certified connectors and inlets. Free service, 48-hour turnaround.
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
                  icon: Plug2,
                  title: "Connector Types",
                  items: ["CCS1/CCS2 DC plugs", "NACS DC plugs", "Type 1/Type 2 AC plugs", "Vehicle inlets (all types)"],
                },
                {
                  icon: Shield,
                  title: "Current Ratings",
                  items: ["AC: 16A-63A", "DC: 100A-150A", "DC: 150A-200A", "DC: 200A-250A"],
                },
                {
                  icon: Factory,
                  title: "Custom Features",
                  items: ["Housing color/branding", "Cable strain relief design", "Temperature sensors", "Liquid cooling channels"],
                },
                {
                  icon: Package,
                  title: "Certification Support",
                  items: ["UL 2594/2251 testing", "IEC 62196 compliance", "SAE J3400 validation", "Test report translation"],
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
                Source EV Connectors from Verified OEMs
              </h2>
              <p className="text-white/80 text-lg mb-8">
                Submit your requirements and get matched with 2-3 UL/IEC certified connector manufacturers.
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
