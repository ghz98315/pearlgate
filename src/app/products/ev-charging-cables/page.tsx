"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Zap,
  Shield,
  Package,
  TrendingUp,
  Thermometer,
  Cable,
  Gauge,
  CheckCircle,
  ChevronRight,
  Beaker,
  Car,
  Factory,
  Truck
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RequestSampleModal from "@/components/RequestSampleModal";
import { FadeIn, Stagger, StaggerItem } from "@/components/Animations";

const standards = [
  {
    standard: "CCS1 (Combo 1)",
    market: "North America",
    current: "150A-250A DC",
    voltage: "200-920V DC",
    certification: "UL 2594",
  },
  {
    standard: "CCS2 (Combo 2)",
    market: "Europe/Global",
    current: "150-200A DC",
    voltage: "200-920V DC",
    certification: "IEC 62196-3",
  },
  {
    standard: "NACS (Tesla)",
    market: "North America",
    current: "Up to 250A DC",
    voltage: "50-1000V DC",
    certification: "SAE J3400",
  },
  {
    standard: "Type 2 (IEC 62196-2)",
    market: "Europe/China",
    current: "16A-32A AC",
    voltage: "230V/400V AC",
    certification: "IEC 62196-2",
  },
  {
    standard: "CHAdeMO",
    market: "Japan/Asia",
    current: "Up to 200A DC",
    voltage: "200-500V DC",
    certification: "CHAdeMO Assoc.",
  },
  {
    standard: "GB/T",
    market: "China",
    current: "Up to 250A DC",
    voltage: "200-750V DC",
    certification: "GB/T 20234",
  },
];

const useCases = [
  {
    icon: Car,
    title: "Public DC Fast Charging",
    description: "Highway rest stops, urban charging hubs. CCS1/CCS2/CHAdeMO cables rated 150-350A for 30-minute charging sessions.",
    requirements: "Liquid cooling, 150-350A rating, IP54 ingress protection, 5m cable length, UL 2594 or IEC 62196-3",
  },
  {
    icon: Factory,
    title: "Fleet/Depot Charging",
    description: "Commercial fleet depots, bus/truck charging. Durable AC cables for overnight Level 2 charging (Type 1/Type 2).",
    requirements: "32A-40A AC, TPU cable jacket (abrasion resistant), -30°C to 50°C operation, 7.5m length",
  },
  {
    icon: Truck,
    title: "Portable/Emergency Charging",
    description: "Mobile charging units, roadside assistance. Lightweight AC/DC cables with compact connectors for transport.",
    requirements: "16A-32A AC or 100A DC, compact design, weather-resistant, coiled cable option",
  },
];

const faqs = [
  {
    q: "What's the difference between liquid-cooled and passive-cooled DC cables?",
    a: "Liquid-cooled cables circulate coolant through the cable to handle 150-350A continuous current without overheating. Passive cables (no cooling) are limited to 80-125A. For fast charging (150kW+), liquid cooling is mandatory per UL 2594.",
  },
  {
    q: "How do I verify a cable's UL 2594 or IEC 62196 certification?",
    a: "Check UL Product iQ database (database.ul.com) for UL 2594. For IEC 62196, request test reports from TUV/SGS showing temperature rise testing (<50K above ambient), dielectric withstand (2000V AC for 1 min), and 10,000 insertion/removal cycles. Don't accept photos—verify in official databases.",
  },
  {
    q: "What cable length is optimal for DC fast charging?",
    a: "5 meters (16.4 ft) is standard. Shorter cables (3m) reduce voltage drop but limit vehicle positioning. Longer cables (7m+) increase weight and voltage drop. For 200A+ cables, voltage drop should be <0.5V per meter to maintain efficiency.",
  },
  {
    q: "Can I source custom cable lengths and connector combinations?",
    a: "Yes. Most OEMs offer 3m-10m lengths, CCS1/CCS2/NACS/CHAdeMO connectors, custom branding, and TPU/PVC jacket colors. MOQ typically 200-500 units for full customization. Sample lead time 7-14 days.",
  },
  {
    q: "What's the typical MOQ and pricing for DC charging cables?",
    a: "CCS1/CCS2 150A cables: $160-$280 FOB, MOQ 200-500 units. 200A liquid-cooled: $280-$450 FOB, MOQ 200 units. NACS cables: $200-$350 FOB, MOQ 300 units. Lead time 30-40 days after deposit.",
  },
  {
    q: "How do I prevent counterfeit UL/CE certificates from Chinese suppliers?",
    a: "Verify UL certificate number in UL Product iQ. Request original TUV/SGS test reports with lab signature and hologram. Cross-check factory name on certificate matches business license. We verify all certifications before recommending OEMs.",
  },
];

const relatedProducts = [
  {
    slug: "portable-evse",
    name: "Portable EVSE Units",
  },
  {
    slug: "connectors",
    name: "Connectors & Adapters",
  },
];

export default function EVChargingCablesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Navbar />
      <RequestSampleModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        productName="EV Charging Cables"
        productCategory="Charging Cables"
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
                EV Charging Cables
              </h1>
              <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed mb-8">
                Source CCS1/CCS2/NACS/Type 2 charging cables from verified China OEMs. UL 2594 and IEC 62196 certified,
                150A-350A DC fast charging, liquid-cooled options, custom branding available.
              </p>

              <button
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-4 rounded-lg transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-orange-500/25"
              >
                <Beaker size={20} />
                Request Cable Samples
              </button>
            </FadeIn>
          </div>
        </section>

        {/* What is EV Charging Cable */}
        <section className="py-16 px-6 bg-white">
          <div className="max-w-4xl mx-auto">
            <FadeIn>
              <h2 className="text-3xl font-bold mb-6 font-[family-name:var(--font-serif)]">
                What is an EV Charging Cable?
              </h2>
              <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-4">
                <p>
                  An <strong>EV charging cable</strong> is the physical connection between a charging station and an electric vehicle,
                  delivering AC or DC power to the vehicle's battery system. Unlike home appliance cords, EV cables must handle high current
                  (16A-350A), resist extreme temperatures (-40°C to +85°C), and survive 10,000+ insertion/removal cycles under harsh outdoor conditions.
                </p>
                <p>
                  <strong>DC fast charging cables</strong> (CCS1, CCS2, NACS, CHAdeMO, GB/T) carry 150A-350A at 200-1000V DC for rapid charging
                  (30-80% charge in 15-30 minutes). High-power cables (200A+) use <strong>liquid cooling</strong> to dissipate heat—coolant circulates
                  through the cable and connector to maintain safe operating temperatures. <strong>AC charging cables</strong> (Type 1, Type 2)
                  carry 16A-32A at 230-400V AC for slower overnight charging (4-8 hours).
                </p>
                <p>
                  Key cable components include: <strong>conductor core</strong> (copper, typically 16mm² to 95mm² cross-section for DC cables),
                  <strong>insulation layer</strong> (silicone rubber or XLPE rated to 1000V), <strong>outer jacket</strong> (TPU or PVC for abrasion/UV resistance),
                  <strong>shielding</strong> (aluminum foil + copper braid for EMI protection), and <strong>integrated safety circuits</strong>
                  (temperature sensors, current sensors, proximity detection).
                </p>
                <p>
                  When sourcing charging cables from China OEMs, verify <strong>UL 2594 certification</strong> (North America DC cables),
                  <strong>UL 2251</strong> (North America AC cables), <strong>IEC 62196-3</strong> (Europe DC), or <strong>IEC 62196-2</strong> (Europe AC).
                  Request temperature rise test reports showing conductor temperature stays below 90°C at rated current, and pull force testing showing
                  connectors withstand 100N longitudinal force without separation.
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
                Charging Cable Standards & Options
              </h2>
            </FadeIn>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse bg-white rounded-xl overflow-hidden shadow-sm">
                <thead>
                  <tr className="bg-navy-900 text-white">
                    <th className="px-6 py-4 text-left font-semibold">Standard</th>
                    <th className="px-6 py-4 text-left font-semibold">Target Market</th>
                    <th className="px-6 py-4 text-left font-semibold">Current Rating</th>
                    <th className="px-6 py-4 text-left font-semibold">Voltage Range</th>
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
                  Ready to Source EV Charging Cables?
                </h3>
                <p className="text-gray-600">
                  Get matched with verified OEMs offering UL/IEC certified DC and AC cables. Free service, 48-hour turnaround.
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
                  icon: Cable,
                  title: "Cable Specifications",
                  items: ["Length: 3m-10m", "Conductor: 10-95mm²", "Jacket: TPU/PVC color", "Coiled cable option"],
                },
                {
                  icon: Zap,
                  title: "Connector Options",
                  items: ["CCS1/CCS2/NACS", "Type 1/Type 2 AC", "CHAdeMO/GB/T", "Dual-connector cables"],
                },
                {
                  icon: Thermometer,
                  title: "Cooling Systems",
                  items: ["Passive cooling (80-125A)", "Liquid cooling (150-350A)", "Custom coolant fittings", "Temperature monitoring"],
                },
                {
                  icon: Shield,
                  title: "Branding & Testing",
                  items: ["Logo molding/printing", "Custom packaging", "UL/IEC test coordination", "Translation services"],
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
                Source EV Charging Cables from Verified OEMs
              </h2>
              <p className="text-white/80 text-lg mb-8">
                Submit your requirements and get matched with 2-3 UL/IEC certified cable manufacturers.
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
