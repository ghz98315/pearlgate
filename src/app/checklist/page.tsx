import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EmailCapture from "@/components/EmailCapture";
import { ShieldCheck, FileCheck, Factory, AlertTriangle, MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "Free EVSE Supplier Verification Checklist — PearlGate",
  description:
    "The exact 7 checks a 12-year manufacturing QC insider runs before recommending any China supplier of EV chargers, cables, and wallboxes. Free download.",
};

// Lead magnet PDF — 放在 public/resources/ 下,URL 即去掉 public 的路径。
const CHECKLIST_PDF_URL = "/resources/evse-supplier-verification-checklist.pdf";

const checks = [
  {
    n: 1,
    title: "Business Legitimacy",
    desc: "Real factory, or a trading company in disguise? Verify the license and that the scope of business actually includes manufacturing.",
  },
  {
    n: 2,
    title: "Certification — Required, or Nice to Have?",
    desc: "Does your market legally require a cert, or does a factory that truly builds to standard just not hold one? Verify a genuine certificate — or the full test report behind it.",
  },
  {
    n: 3,
    title: "Production Capacity",
    desc: "Can they deliver your volume on your timeline? Ask how much capacity is already committed.",
  },
  {
    n: 4,
    title: "Quality Control System",
    desc: "Do they hipot-test every unit, or sample and pray? For safety-critical tests the answer must be 100%.",
  },
  {
    n: 5,
    title: "Component & BOM Transparency",
    desc: "The #1 cost-down trick is the golden-sample bait-and-switch. Under-spec copper runs hot.",
  },
  {
    n: 6,
    title: "Target-Market Compliance",
    desc: "CCS1 and CCS2 are physically incompatible. Ship the wrong one and the whole container is scrap.",
  },
  {
    n: 7,
    title: "Communication & Responsiveness",
    desc: "Pre-sale is a supplier's best behavior. Slow and vague now means far worse after the deposit.",
  },
];

export default function ChecklistPage() {
  return (
    <>
      <Navbar />
      <main className="pt-24">
        {/* Hero + capture */}
        <section className="py-16 lg:py-24 bg-gradient-to-br from-navy-900 via-navy-800 to-navy-700">
          <div className="max-w-3xl mx-auto px-6 lg:px-12 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500/20 border border-orange-400 rounded-full mb-6">
              <FileCheck size={18} className="text-orange-300" />
              <span className="text-sm font-semibold text-orange-200">Free Download</span>
            </div>

            <h1 className="text-3xl lg:text-5xl font-bold text-white font-[family-name:var(--font-serif)] leading-tight mb-6">
              The 7-Point EVSE Supplier
              <br />
              Verification Checklist
            </h1>

            <p className="text-lg lg:text-xl text-white/80 leading-relaxed max-w-2xl mx-auto mb-10">
              The exact checks a 12-year manufacturing QC insider runs before recommending any
              China supplier of chargers, cables, and wallboxes.
            </p>

            <div className="max-w-md mx-auto text-left">
              <EmailCapture
                source="resource_download"
                downloadUrl={CHECKLIST_PDF_URL}
                title="Get the checklist (PDF)"
                subtitle="Enter your email and the checklist downloads instantly."
                ctaLabel="Email me the checklist →"
              />
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-white/70">
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck size={16} className="text-orange-300" /> 12 years at BYD (NPI → Quality Manager)
              </span>
              <span className="inline-flex items-center gap-1.5">
                <MapPin size={16} className="text-orange-300" /> Based in Shenzhen
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Factory size={16} className="text-orange-300" /> EVSE-focused
              </span>
            </div>
          </div>
        </section>

        {/* What's inside */}
        <section className="py-16 lg:py-24 bg-white">
          <div className="max-w-5xl mx-auto px-6 lg:px-12">
            <div className="text-center mb-12">
              <h2 className="text-2xl lg:text-3xl font-bold font-[family-name:var(--font-serif)] mb-3">
                What&apos;s inside
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Most sourcing failures aren&apos;t bad luck. They&apos;re predictable — and catchable
                before you wire a single dollar.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {checks.map((c) => (
                <div
                  key={c.n}
                  className="flex items-start gap-4 p-6 rounded-2xl border-2 border-gray-200 hover:border-orange-300 hover:shadow-md transition-all"
                >
                  <span className="flex-shrink-0 w-9 h-9 rounded-full bg-orange-500 text-white font-bold flex items-center justify-center text-sm">
                    {c.n}
                  </span>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">{c.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{c.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 flex items-start gap-3 p-6 rounded-2xl bg-amber-50 border border-amber-200 max-w-3xl mx-auto">
              <AlertTriangle size={20} className="text-amber-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-amber-900 leading-relaxed">
                <strong>If you only have time for three, never skip #2, #4, and #6.</strong> Those are
                the ones that turn into total losses — not just headaches.
              </p>
            </div>
          </div>
        </section>

        {/* Upgrade CTA */}
        <section className="py-16 lg:py-20 bg-gray-50 border-t border-gray-100">
          <div className="max-w-2xl mx-auto px-6 lg:px-12 text-center">
            <h2 className="text-2xl lg:text-3xl font-bold font-[family-name:var(--font-serif)] mb-4">
              Want these 7 checks run on a specific supplier?
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              I deliver a documented report scoring all 7 points (pass / risk / fail, with evidence),
              a live video factory walk-through, and certification database verification — before you
              wire a deposit.
            </p>
            <p className="text-gray-900 font-semibold mb-8">
              Supplier Verification Report — from $490. 100% credited toward your fee if you go on to
              full sourcing.
            </p>
            <a
              href="mailto:Alex.Guan@pearlgatesourcing.com?subject=Supplier%20Verification%20Report"
              className="inline-flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-4 rounded-lg text-lg transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-orange-500/25"
            >
              Request a Verification Report
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
