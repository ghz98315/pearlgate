import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ShieldCheck, Factory, ClipboardCheck, Package, Globe, AlertTriangle, Check, X } from "lucide-react";

export const metadata: Metadata = {
  title: "Factory Verification Service — PearlGate | Reduce EV Charging Sourcing Risks",
  description: "Professional factory verification for EV charging manufacturers. Former BYD factory manager conducts on-site audits to verify certifications, production capability, and quality systems.",
};

export default function FactoryVerificationPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="pt-32 pb-20 bg-gradient-to-br from-navy-900 via-navy-800 to-navy-700">
          <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-white font-[family-name:var(--font-serif)]">
              Factory Verification Service
            </h1>
            <p className="mt-6 text-xl text-white/80">
              Reduce sourcing risks through professional factory audits
            </p>
            <p className="mt-4 text-lg text-white/60 max-w-2xl mx-auto">
              Former BYD factory manager conducts on-site verification of EV charging
              manufacturers. We check certifications, production capability, QC processes,
              and export experience using OEM-level evaluation standards.
            </p>
          </div>
        </section>

        {/* What We Verify */}
        <section className="py-20 lg:py-28 bg-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-center font-[family-name:var(--font-serif)]">
              What We Verify
            </h2>
            <p className="mt-4 text-text-secondary text-center text-lg max-w-2xl mx-auto">
              Every verification follows the same standards I used at BYD for supplier evaluation.
            </p>

            <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Certifications */}
              <div className="p-6 border border-border rounded-xl hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 rounded-lg bg-orange-500/10 flex items-center justify-center">
                  <ShieldCheck className="text-orange-500" size={24} />
                </div>
                <h3 className="mt-4 text-xl font-semibold">Certifications</h3>
                <p className="mt-3 text-text-secondary">
                  Verify UL2251, IEC 62196, CE, TUV, CCC certificates are real and current.
                  Check certificate numbers against official databases. Confirm factory name
                  matches certificate holder.
                </p>
              </div>

              {/* Production Lines */}
              <div className="p-6 border border-border rounded-xl hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 rounded-lg bg-orange-500/10 flex items-center justify-center">
                  <Factory className="text-orange-500" size={24} />
                </div>
                <h3 className="mt-4 text-xl font-semibold">Production Lines</h3>
                <p className="mt-3 text-text-secondary">
                  Inspect injection molding machines, cable assembly lines, testing equipment.
                  Verify production capacity matches claimed output. Check equipment maintenance
                  and calibration records.
                </p>
              </div>

              {/* QC Process */}
              <div className="p-6 border border-border rounded-xl hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 rounded-lg bg-orange-500/10 flex items-center justify-center">
                  <ClipboardCheck className="text-orange-500" size={24} />
                </div>
                <h3 className="mt-4 text-xl font-semibold">QC Process</h3>
                <p className="mt-3 text-text-secondary">
                  Review incoming inspection, in-process control, final testing procedures.
                  Check quality documentation and traceability systems. Verify testing equipment
                  for EV-specific safety tests.
                </p>
              </div>

              {/* OEM Capability */}
              <div className="p-6 border border-border rounded-xl hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 rounded-lg bg-orange-500/10 flex items-center justify-center">
                  <Package className="text-orange-500" size={24} />
                </div>
                <h3 className="mt-4 text-xl font-semibold">OEM Capability</h3>
                <p className="mt-3 text-text-secondary">
                  Assess custom tooling capability, packaging design, logo printing, private
                  labeling. Check MOQ flexibility and tooling cost structure. Review previous
                  OEM projects.
                </p>
              </div>

              {/* Export Experience */}
              <div className="p-6 border border-border rounded-xl hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 rounded-lg bg-orange-500/10 flex items-center justify-center">
                  <Globe className="text-orange-500" size={24} />
                </div>
                <h3 className="mt-4 text-xl font-semibold">Export Experience</h3>
                <p className="mt-3 text-text-secondary">
                  Verify international shipping experience, customs documentation capability,
                  overseas client references. Check English communication ability and
                  responsiveness.
                </p>
              </div>

              {/* Safety Compliance */}
              <div className="p-6 border border-border rounded-xl hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 rounded-lg bg-orange-500/10 flex items-center justify-center">
                  <AlertTriangle className="text-orange-500" size={24} />
                </div>
                <h3 className="mt-4 text-xl font-semibold">Safety Compliance</h3>
                <p className="mt-3 text-text-secondary">
                  Confirm understanding of EV safety standards (UL2251, IEC 62196).
                  Check high-voltage testing capability. Verify material compliance
                  (RoHS, REACH).
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Verification Process */}
        <section className="py-20 lg:py-28 bg-gray-50">
          <div className="max-w-5xl mx-auto px-6 lg:px-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-center font-[family-name:var(--font-serif)]">
              Verification Process
            </h2>

            <div className="mt-16 space-y-8">
              {/* Step 1 */}
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold text-lg">
                  1
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Submit Factory Information</h3>
                  <p className="mt-2 text-text-secondary">
                    Provide factory name, location, and products. Or let us recommend
                    verified suppliers based on your requirements.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold text-lg">
                  2
                </div>
                <div>
                  <h3 className="text-xl font-semibold">On-Site Visit</h3>
                  <p className="mt-2 text-text-secondary">
                    We conduct on-site factory visit within 3-5 business days.
                    Inspection takes 2-4 hours depending on factory size and complexity.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold text-lg">
                  3
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Detailed Report</h3>
                  <p className="mt-2 text-text-secondary">
                    Receive comprehensive verification report with photos, findings,
                    and risk assessment. Report includes production line photos,
                    certificate verification, and capability evaluation.
                  </p>
                </div>
              </div>

              {/* Step 4 */}
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold text-lg">
                  4
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Recommendation</h3>
                  <p className="mt-2 text-text-secondary">
                    Clear recommendation: <strong>Proceed</strong> (low risk),
                    <strong> Proceed with Caution</strong> (medium risk with mitigation steps),
                    or <strong>Avoid</strong> (high risk).
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Service Options */}
        <section className="py-20 lg:py-28 bg-white">
          <div className="max-w-6xl mx-auto px-6 lg:px-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-center font-[family-name:var(--font-serif)]">
              Service Options
            </h2>

            <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Basic Check */}
              <div className="p-8 border-2 border-border rounded-2xl">
                <div className="text-sm font-semibold text-orange-500 uppercase tracking-wide">
                  Basic Check
                </div>
                <div className="mt-2 text-4xl font-bold">Free</div>
                <p className="mt-4 text-text-secondary">
                  Certificate verification and basic capability review
                </p>

                <ul className="mt-8 space-y-4">
                  <li className="flex items-start gap-3">
                    <Check className="text-green-500 flex-shrink-0 mt-1" size={20} />
                    <span>Certificate authenticity check</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="text-green-500 flex-shrink-0 mt-1" size={20} />
                    <span>Production capability review</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="text-green-500 flex-shrink-0 mt-1" size={20} />
                    <span>Basic recommendation</span>
                  </li>
                </ul>

                <Link
                  href="/quote?service=basic-verification"
                  className="mt-8 block w-full text-center bg-gray-100 hover:bg-gray-200 text-gray-900 font-semibold px-6 py-3 rounded-lg transition-colors"
                >
                  Request Basic Check
                </Link>
              </div>

              {/* Full Audit */}
              <div className="p-8 border-2 border-orange-500 rounded-2xl relative">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-orange-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                  Recommended
                </div>

                <div className="text-sm font-semibold text-orange-500 uppercase tracking-wide">
                  Full Audit
                </div>
                <div className="mt-2 text-4xl font-bold">Contact for Quote</div>
                <p className="mt-4 text-text-secondary">
                  On-site visit with detailed verification report
                </p>

                <ul className="mt-8 space-y-4">
                  <li className="flex items-start gap-3">
                    <Check className="text-green-500 flex-shrink-0 mt-1" size={20} />
                    <span>On-site factory visit (2-4 hours)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="text-green-500 flex-shrink-0 mt-1" size={20} />
                    <span>Production line inspection</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="text-green-500 flex-shrink-0 mt-1" size={20} />
                    <span>QC process review</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="text-green-500 flex-shrink-0 mt-1" size={20} />
                    <span>Detailed photo report (20-30 photos)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="text-green-500 flex-shrink-0 mt-1" size={20} />
                    <span>Risk assessment and recommendation</span>
                  </li>
                </ul>

                <Link
                  href="/quote?service=full-verification"
                  className="mt-8 block w-full text-center bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
                >
                  Request Full Audit
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Why This Matters */}
        <section className="py-20 lg:py-28 bg-gray-50">
          <div className="max-w-4xl mx-auto px-6 lg:px-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-center font-[family-name:var(--font-serif)]">
              Why Factory Verification Matters
            </h2>

            <div className="mt-12 space-y-8">
              <div className="p-6 bg-white border border-border rounded-xl">
                <h3 className="text-xl font-semibold text-red-600">
                  Common Problems Without Verification
                </h3>
                <ul className="mt-4 space-y-3 text-text-secondary">
                  <li className="flex items-start gap-3">
                    <X className="text-red-500 flex-shrink-0 mt-1" size={20} />
                    <span>Fake certifications (UL/CE certificates that don&apos;t exist)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <X className="text-red-500 flex-shrink-0 mt-1" size={20} />
                    <span>Quality inconsistency between samples and bulk orders</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <X className="text-red-500 flex-shrink-0 mt-1" size={20} />
                    <span>Production capacity misrepresentation</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <X className="text-red-500 flex-shrink-0 mt-1" size={20} />
                    <span>Safety compliance issues discovered after shipment</span>
                  </li>
                </ul>
              </div>

              <div className="p-6 bg-white border border-border rounded-xl">
                <h3 className="text-xl font-semibold text-green-600">
                  Benefits of Professional Verification
                </h3>
                <ul className="mt-4 space-y-3 text-text-secondary">
                  <li className="flex items-start gap-3">
                    <Check className="text-green-500 flex-shrink-0 mt-1" size={20} />
                    <span>Avoid suppliers with fake certifications</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="text-green-500 flex-shrink-0 mt-1" size={20} />
                    <span>Confirm production capability before large orders</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="text-green-500 flex-shrink-0 mt-1" size={20} />
                    <span>Reduce quality inconsistency risks</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="text-green-500 flex-shrink-0 mt-1" size={20} />
                    <span>Make informed sourcing decisions with data</span>
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
              Request Factory Verification
            </h2>
            <p className="mt-4 text-white/70 text-lg">
              Submit factory details or let us recommend verified suppliers based on your requirements.
            </p>
            <Link
              href="/quote?service=verification"
              className="inline-block mt-8 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-4 rounded-lg text-lg transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-orange-500/25"
            >
              Get Started
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
