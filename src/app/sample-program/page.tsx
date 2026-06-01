import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Package, Clock, CheckCircle, AlertCircle, Truck, FileCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Sample Program — PearlGate | Evaluate EV Charging Products Before Bulk Orders",
  description: "Professional sample coordination for EV charging products. Test quality, certifications, and compatibility before committing to large orders. Not dropshipping.",
};

export default function SampleProgramPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="pt-32 pb-20 bg-gradient-to-br from-navy-900 via-navy-800 to-navy-700">
          <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-white font-[family-name:var(--font-serif)]">
              Sample Program
            </h1>
            <p className="mt-6 text-xl text-white/80">
              Evaluate Before Bulk Orders
            </p>
            <p className="mt-4 text-lg text-white/60 max-w-2xl mx-auto">
              Test product quality, certifications, and compatibility before committing to large orders.
              We coordinate sample orders from verified EV charging manufacturers.
            </p>
          </div>
        </section>

        {/* Why Samples Matter */}
        <section className="py-20 lg:py-28 bg-white">
          <div className="max-w-4xl mx-auto px-6 lg:px-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-center font-[family-name:var(--font-serif)]">
              Why Sample Testing Matters for EV Products
            </h2>
            <p className="mt-6 text-text-secondary text-center text-lg max-w-2xl mx-auto">
              EV charging products involve electrical safety, compatibility, and regulatory compliance.
              Samples let you verify:
            </p>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start gap-4 p-6 border border-border rounded-xl">
                <CheckCircle className="text-green-500 flex-shrink-0 mt-1" size={24} />
                <div>
                  <h3 className="font-semibold text-lg">Product Quality</h3>
                  <p className="mt-1 text-text-secondary">
                    Verify workmanship, materials, and build quality match your standards
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-6 border border-border rounded-xl">
                <CheckCircle className="text-green-500 flex-shrink-0 mt-1" size={24} />
                <div>
                  <h3 className="font-semibold text-lg">Certification Authenticity</h3>
                  <p className="mt-1 text-text-secondary">
                    Confirm UL/CE/TUV markings are real and match certified products
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-6 border border-border rounded-xl">
                <CheckCircle className="text-green-500 flex-shrink-0 mt-1" size={24} />
                <div>
                  <h3 className="font-semibold text-lg">Vehicle Compatibility</h3>
                  <p className="mt-1 text-text-secondary">
                    Test compatibility with your target vehicles and charging infrastructure
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-6 border border-border rounded-xl">
                <CheckCircle className="text-green-500 flex-shrink-0 mt-1" size={24} />
                <div>
                  <h3 className="font-semibold text-lg">Packaging Quality</h3>
                  <p className="mt-1 text-text-secondary">
                    Evaluate packaging design, labeling, and protection for shipping
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-6 border border-border rounded-xl">
                <CheckCircle className="text-green-500 flex-shrink-0 mt-1" size={24} />
                <div>
                  <h3 className="font-semibold text-lg">Supplier Responsiveness</h3>
                  <p className="mt-1 text-text-secondary">
                    Test communication quality and response time before bulk orders
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-6 border border-border rounded-xl">
                <CheckCircle className="text-green-500 flex-shrink-0 mt-1" size={24} />
                <div>
                  <h3 className="font-semibold text-lg">Production Capability</h3>
                  <p className="mt-1 text-text-secondary">
                    Verify supplier can deliver quality consistently before large commitments
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Sample Options */}
        <section className="py-20 lg:py-28 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-center font-[family-name:var(--font-serif)]">
              Sample Support Options
            </h2>

            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Stock Sample */}
              <div className="p-8 bg-white border border-border rounded-2xl">
                <div className="w-12 h-12 rounded-lg bg-orange-500/10 flex items-center justify-center">
                  <Package className="text-orange-500" size={24} />
                </div>
                <h3 className="mt-4 text-2xl font-semibold">Stock Sample</h3>
                <p className="mt-2 text-text-secondary">
                  Existing product samples from factory inventory
                </p>

                <div className="mt-6 space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Clock size={16} className="text-orange-500" />
                    <span className="font-medium">Lead Time:</span>
                    <span className="text-text-secondary">3-7 days</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Package size={16} className="text-orange-500" />
                    <span className="font-medium">Cost:</span>
                    <span className="text-text-secondary">Sample cost + shipping</span>
                  </div>
                </div>

                <p className="mt-6 text-sm text-text-secondary">
                  <strong>Best for:</strong> Quick evaluation of standard products
                </p>
              </div>

              {/* OEM Sample */}
              <div className="p-8 bg-white border-2 border-orange-500 rounded-2xl relative">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-orange-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                  Popular
                </div>
                <div className="w-12 h-12 rounded-lg bg-orange-500/10 flex items-center justify-center">
                  <FileCheck className="text-orange-500" size={24} />
                </div>
                <h3 className="mt-4 text-2xl font-semibold">OEM Sample</h3>
                <p className="mt-2 text-text-secondary">
                  Custom samples with your logo/packaging
                </p>

                <div className="mt-6 space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Clock size={16} className="text-orange-500" />
                    <span className="font-medium">Lead Time:</span>
                    <span className="text-text-secondary">2-3 weeks</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Package size={16} className="text-orange-500" />
                    <span className="font-medium">Cost:</span>
                    <span className="text-text-secondary">Sample + tooling + shipping</span>
                  </div>
                </div>

                <p className="mt-6 text-sm text-text-secondary">
                  <strong>Best for:</strong> Testing private label before bulk orders
                </p>
              </div>

              {/* Low MOQ Test Order */}
              <div className="p-8 bg-white border border-border rounded-2xl">
                <div className="w-12 h-12 rounded-lg bg-orange-500/10 flex items-center justify-center">
                  <Truck className="text-orange-500" size={24} />
                </div>
                <h3 className="mt-4 text-2xl font-semibold">Low MOQ Test Order</h3>
                <p className="mt-2 text-text-secondary">
                  Small batch production (50-100 units)
                </p>

                <div className="mt-6 space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Clock size={16} className="text-orange-500" />
                    <span className="font-medium">Lead Time:</span>
                    <span className="text-text-secondary">3-4 weeks</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Package size={16} className="text-orange-500" />
                    <span className="font-medium">Cost:</span>
                    <span className="text-text-secondary">Unit price + shipping</span>
                  </div>
                </div>

                <p className="mt-6 text-sm text-text-secondary">
                  <strong>Best for:</strong> Market testing or Amazon launch
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Sample Process */}
        <section className="py-20 lg:py-28 bg-white">
          <div className="max-w-5xl mx-auto px-6 lg:px-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-center font-[family-name:var(--font-serif)]">
              Sample Coordination Process
            </h2>

            <div className="mt-16 space-y-8">
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold text-lg">
                  1
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Submit Sample Request</h3>
                  <p className="mt-2 text-text-secondary">
                    Tell us product type, specifications, quantity needed, and any customization requirements.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold text-lg">
                  2
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Supplier Matching</h3>
                  <p className="mt-2 text-text-secondary">
                    We match you with verified suppliers who can provide the samples you need.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold text-lg">
                  3
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Confirm Details & Shipping</h3>
                  <p className="mt-2 text-text-secondary">
                    Review sample specifications, costs, and shipping options. We coordinate with supplier on your behalf.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold text-lg">
                  4
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Receive & Evaluate</h3>
                  <p className="mt-2 text-text-secondary">
                    Receive samples with quality documentation. Test and evaluate before deciding on bulk orders.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold text-lg">
                  5
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Proceed to Bulk Orders</h3>
                  <p className="mt-2 text-text-secondary">
                    Once satisfied with samples, we help coordinate bulk orders, production monitoring, and QC inspection.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Important Notes */}
        <section className="py-20 bg-yellow-50 border-y border-yellow-200">
          <div className="max-w-4xl mx-auto px-6 lg:px-12">
            <div className="flex gap-4">
              <AlertCircle className="text-yellow-600 flex-shrink-0" size={24} />
              <div>
                <h3 className="text-xl font-semibold text-yellow-900">
                  Important Notes
                </h3>
                <ul className="mt-4 space-y-3 text-yellow-900/80">
                  <li>
                    <strong>Sample costs:</strong> Buyers typically pay for samples and
                    international shipping. Sample costs are often refundable with bulk orders
                    (MOQ varies by supplier).
                  </li>
                  <li>
                    <strong>Certifications:</strong> We verify that samples match certified
                    products. Request test reports if you need documentation for regulatory approval.
                  </li>
                  <li>
                    <strong>Lead time:</strong> Stock samples ship in 3-7 days. Custom/OEM
                    samples take 2-3 weeks. International shipping typically takes 5-10 business
                    days via DHL/FedEx.
                  </li>
                  <li>
                    <strong>This is NOT dropshipping:</strong> Sample program is for product
                    evaluation before bulk orders, not for retail fulfillment or one-piece
                    dropshipping to end customers.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* What We Don't Do */}
        <section className="py-20 lg:py-28 bg-white">
          <div className="max-w-4xl mx-auto px-6 lg:px-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-center font-[family-name:var(--font-serif)]">
              What This Program Is NOT
            </h2>

            <div className="mt-12 p-8 border-2 border-red-200 bg-red-50 rounded-xl">
              <h3 className="text-xl font-semibold text-red-900">
                Not a Dropshipping Service
              </h3>
              <p className="mt-4 text-red-900/80 leading-relaxed">
                This sample program is designed for <strong>B2B buyers evaluating products before bulk orders</strong>,
                not for retail dropshipping or one-piece fulfillment to end customers.
              </p>
              <p className="mt-4 text-red-900/80 leading-relaxed">
                If you&apos;re looking for dropshipping or retail fulfillment services, this is not the right program.
                Our focus is helping businesses make informed sourcing decisions through professional sample coordination.
              </p>
            </div>

            <div className="mt-8 p-8 border border-green-200 bg-green-50 rounded-xl">
              <h3 className="text-xl font-semibold text-green-900">
                What We DO Provide
              </h3>
              <ul className="mt-4 space-y-2 text-green-900/80">
                <li className="flex items-start gap-2">
                  <CheckCircle className="text-green-600 flex-shrink-0 mt-1" size={20} />
                  <span>Professional sample coordination with verified suppliers</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="text-green-600 flex-shrink-0 mt-1" size={20} />
                  <span>Quality verification and certification checks</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="text-green-600 flex-shrink-0 mt-1" size={20} />
                  <span>Support for bulk order decisions</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="text-green-600 flex-shrink-0 mt-1" size={20} />
                  <span>OEM sample coordination for private label testing</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 lg:py-28 bg-gradient-to-br from-navy-900 via-navy-800 to-navy-700">
          <div className="max-w-3xl mx-auto px-6 lg:px-12 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-white font-[family-name:var(--font-serif)]">
              Request Sample Coordination
            </h2>
            <p className="mt-4 text-white/70 text-lg">
              Tell us what you need to test. We&apos;ll coordinate with verified suppliers.
            </p>
            <Link
              href="/quote?service=samples"
              className="inline-block mt-8 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-4 rounded-lg text-lg transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-orange-500/25"
            >
              Request Samples
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
