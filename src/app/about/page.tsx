import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MapSection from "@/components/MapSection";
import { AlertTriangle, ShieldCheck, Factory, Users, FileCheck, Zap, CheckCircle, XCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "About — PearlGate | Solving EV Charging Sourcing Problems You've Actually Experienced",
  description: "Fake certifications? Quality disasters? Lost money to scam suppliers? 11 years in BYD manufacturing taught me how to prevent these problems. Here's how we solve them.",
};

const painPoints = [
  {
    icon: XCircle,
    title: "Fake UL/CE Certificates",
    problem: "Supplier sent you a UL certificate PDF. You imported 5,000 units. Customs rejected them because the cert was photoshopped.",
    solution: "We verify every certificate in official databases (UL Product iQ, TUV, SGS). We check the certificate number, expiry date, and factory name match. If it's not in the database, it doesn't exist.",
  },
  {
    icon: XCircle,
    title: "Sample Perfect, Bulk Disaster",
    problem: "Your sample was flawless. The 10,000-unit bulk order arrived with wrong cable thickness, broken pins, and failed safety tests.",
    solution: "We witness pre-production samples (PPAP) and inspect bulk orders before shipment. We measure cable cross-sections, test contact resistance, and verify pin dimensions match your approved sample.",
  },
  {
    icon: XCircle,
    title: "Communication Breakdown",
    problem: "Your supplier stops replying after receiving the deposit. Or they promise delivery in 30 days, then go silent for 60 days.",
    solution: "We're on the ground in Shenzhen. When suppliers go quiet, we visit the factory same-week. We escalate directly to factory owners, not just sales reps.",
  },
  {
    icon: XCircle,
    title: "Can't Verify Factory Claims",
    problem: "Supplier claims 10,000 units/month capacity and UL testing equipment. You can't verify this from 8,000 miles away.",
    solution: "We visit every factory before recommending them. We photograph production lines, test equipment (hipot testers, temperature chambers), and verify worker count matches capacity claims.",
  },
  {
    icon: XCircle,
    title: "Lost Money to Scam Suppliers",
    problem: "You paid $50K deposit via wire transfer. The 'factory' was a trading company with no manufacturing. Your money is gone.",
    solution: "We only work with factories we've physically visited. We verify business licenses, production equipment ownership, and previous export records. No trading companies pretending to be manufacturers.",
  },
];

const whyMeMatters = [
  {
    icon: Factory,
    title: "I've Seen These Problems From the Inside",
    description: "11 years at BYD managing Dell, Toshiba, Lenovo projects. I watched suppliers try to cut corners on samples, swap materials mid-production, and fake test reports. I know every trick because I had to prevent them at BYD.",
  },
  {
    icon: ShieldCheck,
    title: "I Know What 'Verified' Actually Means",
    description: "At BYD, I managed supplier audits for global OEMs. Real verification isn't checking a PDF — it's measuring cable cross-sections, testing contact resistance, witnessing production runs, and calling certification labs to confirm test reports.",
  },
  {
    icon: Users,
    title: "I'm Your Local Escalation Point",
    description: "Based in Shenzhen, 1-2 hours from every major EV charging factory. When suppliers go silent or quality issues arise, I show up at their factory. Problems get solved in person, not over 50-email chains.",
  },
];

const howItWorks = [
  {
    step: "1",
    title: "You Tell Me What Went Wrong Before",
    description: "Share your past supplier horror stories. I'll explain exactly how we prevent each problem.",
  },
  {
    step: "2",
    title: "I Match You With Pre-Vetted Factories",
    description: "Every supplier I recommend has passed on-site audits, certification verification, and reference checks. Same standards I used at BYD.",
  },
  {
    step: "3",
    title: "We Verify Before You Pay",
    description: "Pre-production samples, in-process inspections, pre-shipment QC. We catch problems before they cost you money.",
  },
  {
    step: "4",
    title: "I Stay On-Ground Throughout Production",
    description: "If suppliers go quiet or issues arise, I visit the factory. You get photo updates, not excuses.",
  },
];

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="pt-24">
        {/* Hero - Pain Point Focused */}
        <section className="py-20 lg:py-28 bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50">
          <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-100 border border-red-300 rounded-full mb-6">
              <AlertTriangle size={18} className="text-red-600" />
              <span className="text-sm font-semibold text-red-700">Have you been burned by Chinese suppliers?</span>
            </div>

            <h1 className="text-3xl lg:text-5xl font-bold font-[family-name:var(--font-serif)] leading-tight">
              Fake Certifications. Quality Disasters. Lost Deposits.
              <br />
              <span className="text-orange-600">I've seen every supplier trick in the book.</span>
            </h1>

            <p className="mt-6 text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto">
              After 11 years managing manufacturing at BYD (Dell, Toshiba, Lenovo projects),
              I know exactly how suppliers cut corners, fake certifications, and scam overseas buyers.
              <strong> Your supplier problems are my specialty.</strong>
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/supplier-match"
                className="inline-flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-4 rounded-lg text-lg transition-all hover:-translate-y-0.5"
              >
                Get Matched With Verified Suppliers
              </Link>
              <a
                href="#pain-points"
                className="inline-flex items-center justify-center gap-2 border-2 border-gray-300 hover:border-gray-400 text-gray-700 font-semibold px-8 py-4 rounded-lg text-lg transition-all"
              >
                See How We Solve These Problems
              </a>
            </div>
          </div>
        </section>

        {/* Pain Points → Solutions */}
        <section id="pain-points" className="py-20 lg:py-28 bg-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold font-[family-name:var(--font-serif)]">
                Your Supplier Nightmares = Our Specialty
              </h2>
              <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
                These are real problems our clients faced before working with us. Here's exactly how we prevent them.
              </p>
            </div>

            <div className="space-y-8">
              {painPoints.map((item, idx) => (
                <div
                  key={idx}
                  className="p-8 rounded-2xl border-2 border-gray-200 bg-white hover:border-orange-300 hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex flex-col lg:flex-row gap-8">
                    {/* Problem */}
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                          <item.icon size={20} className="text-red-600" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900">{item.title}</h3>
                      </div>
                      <div className="pl-13">
                        <p className="text-sm font-semibold text-red-600 uppercase tracking-wider mb-2">The Problem:</p>
                        <p className="text-gray-700 leading-relaxed">{item.problem}</p>
                      </div>
                    </div>

                    {/* Arrow */}
                    <div className="flex lg:items-center justify-center">
                      <div className="text-orange-500 font-bold text-2xl">→</div>
                    </div>

                    {/* Solution */}
                    <div className="flex-1 bg-green-50 p-6 rounded-xl border-2 border-green-200">
                      <p className="text-sm font-semibold text-green-700 uppercase tracking-wider mb-3">How We Solve It:</p>
                      <p className="text-gray-800 leading-relaxed font-medium">{item.solution}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why My Background Matters */}
        <section className="py-20 lg:py-28 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold font-[family-name:var(--font-serif)]">
                Why My BYD Background Actually Matters
              </h2>
              <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
                11 years managing manufacturing for global OEMs taught me every supplier trick — and how to prevent them.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {whyMeMatters.map((item, idx) => (
                <div
                  key={idx}
                  className="p-8 bg-white rounded-2xl border-2 border-gray-200 hover:border-orange-300 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="w-14 h-14 rounded-xl bg-orange-100 flex items-center justify-center mb-6">
                    <item.icon size={28} className="text-orange-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-4">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>

            {/* Credentials Box */}
            <div className="mt-12 p-8 bg-navy-900 rounded-2xl text-white">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="relative w-32 h-32 flex-shrink-0">
                  <div className="absolute inset-0 rounded-xl overflow-hidden">
                    <Image
                      src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&q=80"
                      alt="Professional portrait"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-3">11 Years at BYD</h3>
                  <p className="text-white/80 leading-relaxed mb-4">
                    NPI Engineer → Engineering Manager → After-Sales Director. Managed 100+ person teams
                    delivering 30-40 projects/year for Dell, Toshiba, Lenovo, Huawei, Siemens, ASUS.
                  </p>
                  <p className="text-white/80 leading-relaxed">
                    My job was catching supplier problems before they became $500K recalls. Now I use
                    those same methods to protect your EV charging orders.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20 lg:py-28 bg-white">
          <div className="max-w-5xl mx-auto px-6 lg:px-12">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold font-[family-name:var(--font-serif)]">
                How We Work Together
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                No more supplier roulette. Here's the process.
              </p>
            </div>

            <div className="space-y-6">
              {howItWorks.map((item, idx) => (
                <div
                  key={idx}
                  className="flex gap-6 items-start p-6 bg-gray-50 rounded-xl border-2 border-gray-200 hover:border-orange-300 transition-all"
                >
                  <div className="w-12 h-12 rounded-full bg-orange-500 text-white font-bold text-xl flex items-center justify-center flex-shrink-0">
                    {item.step}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Coverage Map */}
        <section className="py-20 lg:py-28 bg-gray-50">
          <div className="max-w-5xl mx-auto px-6 lg:px-12">
            <h2 className="text-2xl lg:text-3xl font-bold text-center font-[family-name:var(--font-serif)]">
              Based in Shenzhen — Heart of EV Supply Chain
            </h2>
            <p className="mt-4 text-gray-600 text-center max-w-2xl mx-auto">
              Every major EV charging factory is within 1-2 hours. When problems arise, I show up same-week.
            </p>

            <div className="mt-12">
              <MapSection />
            </div>
          </div>
        </section>

        {/* Social Proof - NEW */}
        <section className="py-20 lg:py-28 bg-white">
          <div className="max-w-4xl mx-auto px-6 lg:px-12">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold font-[family-name:var(--font-serif)]">
                What Happens When You Work With Us
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 bg-red-50 border-2 border-red-200 rounded-xl">
                <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                  <XCircle size={20} className="text-red-600" />
                  Before PearlGate
                </h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 mt-1">•</span>
                    <span>Fake UL certificates discovered after importing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 mt-1">•</span>
                    <span>Samples perfect, bulk orders fail safety tests</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 mt-1">•</span>
                    <span>Suppliers ghost you after deposit</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 mt-1">•</span>
                    <span>Can't verify factory claims from overseas</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 mt-1">•</span>
                    <span>Lost $50K to scam trading companies</span>
                  </li>
                </ul>
              </div>

              <div className="p-6 bg-green-50 border-2 border-green-200 rounded-xl">
                <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                  <CheckCircle size={20} className="text-green-600" />
                  With PearlGate
                </h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">✓</span>
                    <span>Certificates verified in UL/TUV databases</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">✓</span>
                    <span>Pre-shipment QC catches problems early</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">✓</span>
                    <span>On-ground escalation when suppliers go quiet</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">✓</span>
                    <span>Factory visits with photo documentation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">✓</span>
                    <span>Only real factories, no trading companies</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 lg:py-28 bg-gradient-to-br from-navy-900 via-navy-800 to-navy-700">
          <div className="max-w-3xl mx-auto px-6 lg:px-12 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-white font-[family-name:var(--font-serif)]">
              Stop Gambling With Suppliers
            </h2>
            <p className="mt-4 text-white/80 text-lg leading-relaxed">
              Share your supplier horror stories. I'll explain exactly how we prevent each problem.
              Free consultation, 48-hour response.
            </p>
            <Link
              href="/supplier-match"
              className="inline-block mt-8 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-10 py-4 rounded-lg text-lg transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-orange-500/25"
            >
              Get Matched With Verified Suppliers
            </Link>
            <p className="mt-6 text-white/60 text-sm">
              No obligation. We only earn commission after successful orders.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
