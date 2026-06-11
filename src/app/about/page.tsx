import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MapSection from "@/components/MapSection";
import {
  AlertTriangle, ShieldCheck, Factory, Users, FileCheck, CheckCircle, XCircle,
  Zap, Building, Wrench, Globe, TrendingUp, Target, Layers, MapPin, Clock,
  Battery, Cable, Plug, ChevronRight, CheckSquare, Eye, ClipboardCheck, Headphones,
  Map, Network, Rocket, BookOpen
} from "lucide-react";

export const metadata: Metadata = {
  title: "About — PearlGate | Solving EV Charging Sourcing Problems You've Actually Experienced",
  description: "Fake certifications? Quality disasters? Lost money to scam suppliers? 11 years in BYD manufacturing taught me how to prevent these problems.",
};

const painPoints = [
  {
    icon: XCircle,
    title: "Fake UL/CE Certificates",
    problem: "Supplier sent you a UL certificate PDF. You imported 5,000 units. Customs rejected them because the cert was photoshopped.",
    solution: "We verify every certificate in official databases (UL Product iQ, TUV, SGS). We check the certificate number, expiry date, and factory name match.",
  },
  {
    icon: XCircle,
    title: "Sample Perfect, Bulk Disaster",
    problem: "Your sample was flawless. The 10,000-unit bulk order arrived with wrong cable thickness, broken pins, and failed safety tests.",
    solution: "We witness pre-production samples (PPAP) and inspect bulk orders before shipment. We measure cable cross-sections, test contact resistance, and verify pin dimensions.",
  },
  {
    icon: XCircle,
    title: "Communication Breakdown",
    problem: "Your supplier stops replying after receiving the deposit. Or they promise delivery in 30 days, then go silent for 60 days.",
    solution: "We're on the ground in Shenzhen. When suppliers go quiet, we visit the factory same-week. We escalate directly to factory owners.",
  },
  {
    icon: XCircle,
    title: "Can't Verify Factory Claims",
    problem: "Supplier claims 10,000 units/month capacity and UL testing equipment. You can't verify this from 8,000 miles away.",
    solution: "We visit every factory before recommending them. We photograph production lines, test equipment, and verify worker count matches capacity claims.",
  },
];

const whyUs = [
  {
    icon: Factory,
    title: "Manufacturing Insider Perspective",
    description: "11 years inside BYD managing Dell, Toshiba, Lenovo projects. I know what 'factory-verified' actually means for EV components.",
  },
  {
    icon: ShieldCheck,
    title: "EV-Focused Quality Standards",
    description: "EV charging requires specific certifications (UL2594, IEC 62196). I verify suppliers understand EV-specific quality requirements.",
  },
  {
    icon: Users,
    title: "On-Ground Problem Solving",
    description: "Based in Shenzhen, 1-2 hours from every major EV factory. Problems get solved in person, not over 50-email chains.",
  },
];

const industries = [
  { icon: Zap, name: "EV Charging Brands" },
  { icon: Globe, name: "Importers & Distributors" },
  { icon: Building, name: "OEM Buyers" },
  { icon: Factory, name: "Energy Solution Companies" },
  { icon: Wrench, name: "Engineering Procurement Teams" },
  { icon: Users, name: "Charging Network Operators" },
];

const whyEVCharging = [
  {
    icon: TrendingUp,
    title: "Global EV Growth",
    description: "50M+ EVs on roads need reliable charging infrastructure. Market growing 25%+ annually.",
  },
  {
    icon: Target,
    title: "Specialization Required",
    description: "EV charging demands automotive-grade quality, specific certifications (UL2594, IEC 62196), and safety standards.",
  },
  {
    icon: Layers,
    title: "Our Deep Expertise",
    description: "11 years at BYD managing EV component quality for global brands. We understand this supply chain inside-out.",
  },
];

const productFocus = [
  {
    icon: Battery,
    title: "Portable EV Chargers",
    items: ["Level 1 (120V) & Level 2 (240V)", "16A-40A output range", "UL2594/CE certified models", "Smart charging features"],
  },
  {
    icon: Cable,
    title: "EV Charging Cables",
    items: ["CCS1, CCS2, NACS (Tesla)", "Type 2 (Mennekes) cables", "Custom lengths: 5m-10m", "Liquid-cooled high-power cables"],
  },
  {
    icon: Plug,
    title: "EV Charging Adapters",
    items: ["Tesla to J1772 adapters", "CCS1 to CCS2 converters", "Type 1 to Type 2 adapters", "NACS compatibility solutions"],
  },
  {
    icon: Factory,
    title: "OEM Sourcing Coordination",
    items: ["Custom product development", "Private label manufacturing", "Quality control & testing", "Supply chain management"],
  },
];

const workProcess = [
  {
    icon: ClipboardCheck,
    title: "Requirements Analysis",
    description: "We discuss your product specs, certifications needed, target markets, and volume requirements.",
  },
  {
    icon: Eye,
    title: "Supplier Evaluation",
    description: "We shortlist 3-5 factories based on capacity, certifications, quality systems, and past performance.",
  },
  {
    icon: Factory,
    title: "On-Site Verification",
    description: "We visit factories in person, inspect production lines, verify test equipment, and audit quality processes.",
  },
  {
    icon: CheckSquare,
    title: "Quality Control",
    description: "We witness pre-production samples, conduct in-process inspections, and verify bulk shipments before delivery.",
  },
  {
    icon: Headphones,
    title: "Ongoing Support",
    description: "We handle supplier communication, resolve quality issues, and coordinate logistics throughout your project.",
  },
];

const guangdongAdvantages = [
  {
    icon: MapPin,
    title: "30-Minute Supply Chain",
    description: "Cable extrusion in Dongguan, connector molding in Shenzhen, PCB assembly in Huizhou — all within 100km radius.",
    stat: "100km",
  },
  {
    icon: Network,
    title: "Complete EV Ecosystem",
    description: "200+ EV component suppliers, shared tooling, optimized logistics. What takes weeks elsewhere happens in days here.",
    stat: "200+",
  },
  {
    icon: Clock,
    title: "Direct Factory Access",
    description: "Based in Shenzhen. 1-2 hour drive to every major EV charging factory. Problems solved in person, not email chains.",
    stat: "1-2hr",
  },
  {
    icon: Zap,
    title: "Speed to Market",
    description: "Prototype to mass production in 6-8 weeks. Iteration cycles that would take 6 months elsewhere happen in 1 month.",
    stat: "6-8wk",
  },
];

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="pt-24">
        {/* Hero - Direct & Clear */}
        <section className="py-20 lg:py-32 bg-gradient-to-br from-navy-900 via-navy-800 to-navy-700">
          <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500/20 border border-orange-400 rounded-full mb-6">
              <AlertTriangle size={18} className="text-orange-300" />
              <span className="text-sm font-semibold text-orange-200">Have you been burned by Chinese suppliers?</span>
            </div>

            <h1 className="text-3xl lg:text-5xl font-bold text-white font-[family-name:var(--font-serif)] leading-tight mb-6">
              Fake Certifications. Quality Disasters. Lost Deposits.
              <br />
              <span className="text-orange-400">We've seen every supplier trick in the book.</span>
            </h1>

            <p className="text-xl text-white/80 leading-relaxed max-w-3xl mx-auto mb-8">
              11 years managing manufacturing at BYD for Dell, Toshiba, Lenovo taught me exactly
              how suppliers cut corners and scam overseas buyers. <strong className="text-white">Your supplier problems are our specialty.</strong>
            </p>

            <Link
              href="/supplier-match"
              className="inline-flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-10 py-4 rounded-lg text-lg transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-orange-500/25"
            >
              Get Matched With Verified Suppliers
            </Link>
          </div>
        </section>

        {/* Why EV Charging - NEW */}
        <section className="py-16 lg:py-20 bg-white border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold font-[family-name:var(--font-serif)] mb-4">
                Why We Focus on EV Charging
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                This isn't just another product category for us — it's where our expertise meets market opportunity.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {whyEVCharging.map((item, idx) => (
                <div
                  key={idx}
                  className="group relative p-8 bg-gradient-to-br from-gray-50 to-white rounded-2xl border-2 border-gray-200 hover:border-orange-300 hover:shadow-xl transition-all duration-300"
                >
                  <div className="absolute top-4 right-4 w-20 h-20 bg-orange-50 rounded-full opacity-50 group-hover:opacity-100 transition-opacity" />
                  <div className="relative">
                    <div className="w-14 h-14 rounded-xl bg-orange-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                      <item.icon size={28} className="text-orange-600" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What We Focus On - NEW */}
        <section className="py-16 lg:py-20 bg-gradient-to-b from-gray-50 to-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold font-[family-name:var(--font-serif)] mb-4">
                What We Focus On
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                We specialize in four core product categories within EV charging infrastructure.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {productFocus.map((product, idx) => (
                <div
                  key={idx}
                  className="group p-8 bg-white rounded-2xl border-2 border-gray-200 hover:border-orange-300 hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-12 h-12 rounded-lg bg-orange-100 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <product.icon size={24} className="text-orange-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 pt-2">{product.title}</h3>
                  </div>
                  <ul className="space-y-3">
                    {product.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-gray-600">
                        <ChevronRight size={18} className="text-orange-500 mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Common Problems We Solve */}
        <section className="py-20 lg:py-28 bg-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold font-[family-name:var(--font-serif)]">
                Common Problems We Solve
              </h2>
              <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                Real problems our clients faced before working with us.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {painPoints.map((item, idx) => (
                <div
                  key={idx}
                  className="p-8 rounded-2xl border-2 border-gray-200 bg-white hover:border-orange-300 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 backdrop-blur-sm"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                      <item.icon size={20} className="text-red-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">{item.title}</h3>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm font-semibold text-red-600 uppercase tracking-wider mb-2">The Problem:</p>
                    <p className="text-gray-700 leading-relaxed">{item.problem}</p>
                  </div>

                  <div className="pt-4 border-t border-gray-200">
                    <p className="text-sm font-semibold text-green-700 uppercase tracking-wider mb-2">How We Solve It:</p>
                    <p className="text-gray-800 leading-relaxed font-medium">{item.solution}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How We Work - NEW */}
        <section className="py-20 lg:py-28 bg-gradient-to-b from-white to-gray-50">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold font-[family-name:var(--font-serif)] mb-4">
                How We Work
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Our 5-step process combines research, on-ground verification, and ongoing quality control.
              </p>
            </div>

            <div className="relative">
              {/* Connection Line */}
              <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-orange-200 via-orange-300 to-orange-200 transform -translate-x-1/2" />

              <div className="space-y-8">
                {workProcess.map((step, idx) => (
                  <div
                    key={idx}
                    className={`relative flex items-center gap-8 ${
                      idx % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                    }`}
                  >
                    {/* Step Number Circle */}
                    <div className="hidden lg:flex absolute left-1/2 transform -translate-x-1/2 w-16 h-16 rounded-full bg-orange-500 items-center justify-center z-10 shadow-lg shadow-orange-500/30">
                      <span className="text-2xl font-bold text-white">{idx + 1}</span>
                    </div>

                    {/* Content Card */}
                    <div className={`flex-1 ${idx % 2 === 0 ? 'lg:text-right lg:pr-16' : 'lg:pl-16'}`}>
                      <div className="group p-8 bg-white rounded-2xl border-2 border-gray-200 hover:border-orange-300 hover:shadow-xl transition-all duration-300">
                        <div className={`flex items-start gap-4 ${idx % 2 === 0 ? 'lg:flex-row-reverse lg:text-right' : ''}`}>
                          <div className="w-12 h-12 rounded-lg bg-orange-100 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform lg:hidden">
                            <step.icon size={24} className="text-orange-600" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-3 lg:hidden">
                              <span className="w-8 h-8 rounded-full bg-orange-500 text-white font-bold flex items-center justify-center text-sm">
                                {idx + 1}
                              </span>
                              <h3 className="text-xl font-bold">{step.title}</h3>
                            </div>
                            <h3 className="hidden lg:block text-xl font-bold mb-3">{step.title}</h3>
                            <p className="text-gray-600 leading-relaxed">{step.description}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Spacer for alternating layout */}
                    <div className="hidden lg:block flex-1" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Guangdong Supply Chain Advantage - NEW/EXPANDED */}
        <section className="py-20 lg:py-28 bg-gradient-to-br from-navy-900 via-navy-800 to-navy-700 relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 left-20 w-64 h-64 bg-orange-500 rounded-full blur-3xl" />
            <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500 rounded-full blur-3xl" />
          </div>

          <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold font-[family-name:var(--font-serif)] text-white mb-4">
                Pearl River Delta Advantage
              </h2>
              <p className="text-xl text-white/80 max-w-3xl mx-auto">
                Why being based in Guangdong isn't just convenient — it's a competitive advantage for your sourcing.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {guangdongAdvantages.map((item, idx) => (
                <div
                  key={idx}
                  className="group p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 hover:bg-white/15 hover:border-orange-400 transition-all duration-300"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-lg bg-orange-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <item.icon size={24} className="text-orange-300" />
                    </div>
                    <span className="text-3xl font-bold text-orange-400">{item.stat}</span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-3">{item.title}</h3>
                  <p className="text-white/70 text-sm leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>

            {/* Visual Map Section */}
            <div className="mt-16 p-8 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-4">The 100km Radius</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <MapPin size={20} className="text-orange-400" />
                      <span className="text-white/80"><strong className="text-white">Dongguan:</strong> Cable extrusion & material suppliers</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPin size={20} className="text-orange-400" />
                      <span className="text-white/80"><strong className="text-white">Shenzhen:</strong> Connector molding & electronics</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPin size={20} className="text-orange-400" />
                      <span className="text-white/80"><strong className="text-white">Huizhou:</strong> PCB assembly & testing</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPin size={20} className="text-orange-400" />
                      <span className="text-white/80"><strong className="text-white">Guangzhou:</strong> Final assembly & logistics</span>
                    </div>
                  </div>
                  <p className="mt-6 text-white/60 text-sm">
                    Click on map markers to see details about each manufacturing hub.
                  </p>
                </div>
                <div>
                  <MapSection />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Work With Us */}
        <section className="py-20 lg:py-28 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold font-[family-name:var(--font-serif)]">
                Why Work With Us
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                We combine factory insider knowledge with on-ground presence in China's EV supply chain.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {whyUs.map((item, idx) => (
                <div
                  key={idx}
                  className="p-8 bg-white rounded-2xl border-2 border-gray-200 hover:border-orange-300 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 backdrop-blur-sm"
                >
                  <div className="w-14 h-14 rounded-xl bg-orange-100 flex items-center justify-center mb-6">
                    <item.icon size={28} className="text-orange-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-4">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>

            {/* Meet Alex */}
            <div className="mt-16 p-8 lg:p-10 bg-white rounded-2xl border border-gray-200 shadow-sm">
              <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-12">
                <div className="relative w-44 h-44 lg:w-56 lg:h-56 shrink-0 mx-auto lg:mx-0">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-navy-700 to-orange-500 opacity-20" />
                  <div className="absolute inset-2 rounded-full overflow-hidden bg-navy-900/10">
                    <Image
                      src="/alex-guan-profile.jpg"
                      alt="Alex Guan — Former BYD Quality Manager"
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 176px, 224px"
                    />
                  </div>
                  <div className="absolute -bottom-2 -right-2 bg-white rounded-full px-3 py-1 shadow-md border border-gray-200">
                    <span className="text-xs font-medium text-navy-700">11yr BYD</span>
                  </div>
                </div>

                <div className="flex-1">
                  <p className="text-xs lg:text-sm font-semibold text-orange-600 uppercase tracking-wider mb-3">
                    Meet Alex
                  </p>
                  <h3 className="text-2xl lg:text-3xl font-bold font-[family-name:var(--font-serif)] text-gray-900 leading-tight">
                    I&apos;ve Been Inside Hundreds<br />
                    of Factories &mdash; Now I Go In<br />
                    For You.
                  </h3>

                  <p className="mt-5 text-gray-600 leading-relaxed">
                    11 years at BYD as NPI Engineer &rarr; Engineering Manager &rarr; Quality Manager.
                    Managed manufacturing quality for Dell, Toshiba, Lenovo, Huawei, Siemens, and
                    ASUS &mdash; 30-40 projects a year &mdash; before specialising in EVSE and charging-cable
                    sourcing for overseas buyers.
                  </p>
                  <p className="mt-3 text-gray-600 leading-relaxed">
                    Based in Shenzhen, China&apos;s EV charging manufacturing hub.
                  </p>

                  <div className="mt-7">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
                      Career Timeline
                    </p>
                    <ol className="space-y-2.5">
                      <li className="flex items-baseline gap-3 text-sm">
                        <span className="font-bold text-navy-900 tabular-nums w-12 shrink-0">2012</span>
                        <span className="text-gray-300">&rarr;</span>
                        <span className="text-gray-700">NPI Engineer at BYD</span>
                      </li>
                      <li className="flex items-baseline gap-3 text-sm">
                        <span className="font-bold text-navy-900 tabular-nums w-12 shrink-0">2016</span>
                        <span className="text-gray-300">&rarr;</span>
                        <span className="text-gray-700">Engineering Manager</span>
                      </li>
                      <li className="flex items-baseline gap-3 text-sm">
                        <span className="font-bold text-navy-900 tabular-nums w-12 shrink-0">2021</span>
                        <span className="text-gray-300">&rarr;</span>
                        <span className="text-gray-700">Quality Manager</span>
                      </li>
                      <li className="flex items-baseline gap-3 text-sm">
                        <span className="font-bold text-navy-900 tabular-nums w-12 shrink-0">2025</span>
                        <span className="text-gray-300">&rarr;</span>
                        <span className="font-medium text-orange-600">Founder, PearlGate</span>
                      </li>
                    </ol>
                  </div>

                  <div className="mt-7 flex flex-wrap gap-3 text-sm text-gray-700">
                    <span className="bg-gray-50 px-3 py-1.5 rounded-full border border-gray-200">
                      11+ Years at BYD
                    </span>
                    <span className="bg-gray-50 px-3 py-1.5 rounded-full border border-gray-200">
                      EV Charging OEM Support
                    </span>
                    <span className="bg-gray-50 px-3 py-1.5 rounded-full border border-gray-200">
                      Factory Audit &amp; QC Expertise
                    </span>
                    <span className="bg-gray-50 px-3 py-1.5 rounded-full border border-gray-200 inline-flex items-center gap-1">
                      <span aria-hidden="true">📍</span> Shenzhen, China
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Long-Term Vision - NEW */}
        <section className="py-20 lg:py-28 bg-white border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 rounded-full mb-6">
                  <Rocket size={18} className="text-orange-600" />
                  <span className="text-sm font-semibold text-orange-800">Our Vision</span>
                </div>
                <h2 className="text-3xl lg:text-4xl font-bold font-[family-name:var(--font-serif)] mb-6">
                  Building a Reliable EV Charging Sourcing Knowledge Platform
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  We're not just matching buyers with suppliers. We're building a knowledge platform that helps the entire
                  EV charging industry source better from China.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <BookOpen size={24} className="text-orange-500 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold mb-1">Educational Content</h4>
                      <p className="text-gray-600 text-sm">Technical guides, certification explainers, and sourcing best practices.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Network size={24} className="text-orange-500 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold mb-1">Verified Supplier Network</h4>
                      <p className="text-gray-600 text-sm">Curated database of factories we've personally audited and verified.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Users size={24} className="text-orange-500 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold mb-1">Community-Driven Insights</h4>
                      <p className="text-gray-600 text-sm">Real buyer experiences, factory reviews, and market intelligence.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative h-96 rounded-2xl overflow-hidden border-2 border-gray-200">
                <Image
                  src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80"
                  alt="Building the future of EV charging sourcing"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-900/60 to-transparent" />
              </div>
            </div>
          </div>
        </section>

        {/* Industries We Support */}
        <section className="py-20 lg:py-28 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold font-[family-name:var(--font-serif)]">
                Industries We Support
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                We believe focused sourcing creates better long-term partnerships.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {industries.map((industry, idx) => (
                <div
                  key={idx}
                  className="group p-6 bg-white rounded-xl border-2 border-gray-200 hover:border-orange-300 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex items-center gap-4"
                >
                  <div className="w-12 h-12 rounded-lg bg-orange-100 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <industry.icon size={24} className="text-orange-600" />
                  </div>
                  <span className="font-semibold text-gray-900">{industry.name}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 lg:py-32 bg-gradient-to-br from-navy-900 via-navy-800 to-navy-700">
          <div className="max-w-3xl mx-auto px-6 lg:px-12 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-white font-[family-name:var(--font-serif)] mb-6">
              Looking for Reliable EV Charging Manufacturing Partners?
            </h2>
            <p className="text-xl text-white/80 leading-relaxed mb-8">
              Let's discuss your sourcing or OEM project requirements.
            </p>
            <Link
              href="/supplier-match"
              className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-semibold px-10 py-4 rounded-lg text-lg transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-orange-500/25"
            >
              Discuss Your Project
            </Link>
            <p className="mt-6 text-white/60 text-sm">
              Free consultation. 48-hour response. No obligation.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
