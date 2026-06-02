import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AlertTriangle, ShieldCheck, Factory, Users, FileCheck, CheckCircle, XCircle, Zap, Building, Wrench, Globe } from "lucide-react";

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

            {/* Credentials */}
            <div className="mt-16 p-8 bg-navy-900 rounded-2xl text-white">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="relative w-32 h-32 flex-shrink-0">
                  <div className="absolute inset-0 rounded-xl overflow-hidden">
                    <Image
                      src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&q=80"
                      alt="Alex Guan"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-3">11 Years at BYD</h3>
                  <p className="text-white/80 leading-relaxed">
                    NPI Engineer → Engineering Manager → After-Sales Director. Managed 100+ person teams
                    delivering 30-40 projects/year for Dell, Toshiba, Lenovo, Huawei, Siemens, ASUS.
                    My job was catching supplier problems before they became $500K recalls.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Industries We Support */}
        <section className="py-20 lg:py-28 bg-white">
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
                  className="p-6 bg-gray-50 rounded-xl border-2 border-gray-200 hover:border-orange-300 hover:shadow-md hover:-translate-y-1 transition-all duration-300 backdrop-blur-sm flex items-center gap-4"
                >
                  <div className="w-12 h-12 rounded-lg bg-orange-100 flex items-center justify-center flex-shrink-0">
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
