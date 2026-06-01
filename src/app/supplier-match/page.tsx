import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Search, Clock, CheckCircle, Package, TrendingUp } from "lucide-react";

export const metadata: Metadata = {
  title: "Supplier Matching Service — PearlGate | Find Verified EV Charging Manufacturers",
  description: "Professional supplier matching for EV charging products. We evaluate factories and recommend 2-3 verified options within 48 hours. Free service.",
};

export default function SupplierMatchPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="pt-32 pb-20 bg-gradient-to-br from-navy-900 via-navy-800 to-navy-700">
          <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-white font-[family-name:var(--font-serif)]">
              Supplier Matching Service
            </h1>
            <p className="mt-6 text-xl text-white/80">
              Find verified EV charging manufacturers in 48 hours
            </p>
            <p className="mt-4 text-lg text-white/60 max-w-2xl mx-auto">
              Tell us your requirements. We evaluate factories, shortlist 2-3 verified options,
              and coordinate samples. Free service.
            </p>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20 lg:py-28 bg-white">
          <div className="max-w-5xl mx-auto px-6 lg:px-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-center font-[family-name:var(--font-serif)]">
              How Supplier Matching Works
            </h2>

            <div className="mt-16 space-y-12">
              {/* Step 1 */}
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold text-2xl">
                    1
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold">Submit Requirements</h3>
                  <p className="mt-2 text-text-secondary text-lg">
                    Tell us product type, target market, quantity, certifications needed, OEM requirements
                  </p>
                  <div className="mt-3 inline-flex items-center gap-2 text-sm text-orange-600 font-medium">
                    <Clock size={16} />
                    <span>5 minutes</span>
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold text-2xl">
                    2
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold">Factory Evaluation</h3>
                  <p className="mt-2 text-text-secondary text-lg">
                    We evaluate suppliers based on production capability, certifications, export experience
                  </p>
                  <div className="mt-3 inline-flex items-center gap-2 text-sm text-orange-600 font-medium">
                    <Clock size={16} />
                    <span>24-48 hours</span>
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold text-2xl">
                    3
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold">Supplier Shortlist</h3>
                  <p className="mt-2 text-text-secondary text-lg">
                    Receive 2-3 verified supplier recommendations with comparative analysis
                  </p>
                  <div className="mt-3 inline-flex items-center gap-2 text-sm text-orange-600 font-medium">
                    <Clock size={16} />
                    <span>48 hours</span>
                  </div>
                </div>
              </div>

              {/* Step 4 */}
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold text-2xl">
                    4
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold">Sample Coordination</h3>
                  <p className="mt-2 text-text-secondary text-lg">
                    We coordinate sample orders, specifications, and international shipping
                  </p>
                  <div className="mt-3 inline-flex items-center gap-2 text-sm text-orange-600 font-medium">
                    <Clock size={16} />
                    <span>1-2 weeks</span>
                  </div>
                </div>
              </div>

              {/* Step 5 */}
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold text-2xl">
                    5
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold">Production Support</h3>
                  <p className="mt-2 text-text-secondary text-lg">
                    Optional QC inspection, production monitoring, and shipping coordination
                  </p>
                  <div className="mt-3 inline-flex items-center gap-2 text-sm text-orange-600 font-medium">
                    <Clock size={16} />
                    <span>Ongoing</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Inquiry Form */}
        <section className="py-20 lg:py-28 bg-gray-50">
          <div className="max-w-3xl mx-auto px-6 lg:px-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-center font-[family-name:var(--font-serif)]">
              Submit Sourcing Request
            </h2>
            <p className="mt-4 text-text-secondary text-center text-lg">
              Fill out the form below and we&apos;ll match you with verified suppliers within 48 hours.
            </p>

            <form className="mt-12 space-y-6">
              {/* Product Type */}
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Product Type <span className="text-red-500">*</span>
                </label>
                <select className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500">
                  <option>Select product type</option>
                  <option>EV Charging Cable</option>
                  <option>EV Charging Adapter</option>
                  <option>Portable EV Charger</option>
                  <option>EV Connector</option>
                  <option>Charging Accessories</option>
                  <option>Other (please specify)</option>
                </select>
              </div>

              {/* Target Market */}
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Target Market <span className="text-red-500">*</span>
                </label>
                <select className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500">
                  <option>Select target market</option>
                  <option>North America (US/Canada)</option>
                  <option>Europe</option>
                  <option>Australia/New Zealand</option>
                  <option>Asia</option>
                  <option>Other</option>
                </select>
              </div>

              {/* Expected Quantity */}
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Expected Order Quantity <span className="text-red-500">*</span>
                </label>
                <select className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500">
                  <option>Select quantity range</option>
                  <option>Sample only (1-10 units)</option>
                  <option>100-500 units</option>
                  <option>500-1,000 units</option>
                  <option>1,000-5,000 units</option>
                  <option>5,000+ units</option>
                </select>
              </div>

              {/* Certifications Required */}
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Certifications Required
                </label>
                <div className="space-y-2">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="w-4 h-4 text-orange-500 rounded focus:ring-orange-500" />
                    <span>UL (North America)</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="w-4 h-4 text-orange-500 rounded focus:ring-orange-500" />
                    <span>CE (Europe)</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="w-4 h-4 text-orange-500 rounded focus:ring-orange-500" />
                    <span>TUV (Germany)</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="w-4 h-4 text-orange-500 rounded focus:ring-orange-500" />
                    <span>CCC (China domestic)</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="w-4 h-4 text-orange-500 rounded focus:ring-orange-500" />
                    <span>Not sure / Need guidance</span>
                  </label>
                </div>
              </div>

              {/* OEM Needed */}
              <div>
                <label className="block text-sm font-semibold mb-2">
                  OEM / Private Label Needed?
                </label>
                <div className="space-y-2">
                  <label className="flex items-center gap-2">
                    <input type="radio" name="oem" className="w-4 h-4 text-orange-500 focus:ring-orange-500" />
                    <span>Yes, need custom branding</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="radio" name="oem" className="w-4 h-4 text-orange-500 focus:ring-orange-500" />
                    <span>No, standard products OK</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="radio" name="oem" className="w-4 h-4 text-orange-500 focus:ring-orange-500" />
                    <span>Maybe, need to discuss</span>
                  </label>
                </div>
              </div>

              {/* Timeline */}
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Timeline
                </label>
                <select className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500">
                  <option>Select timeline</option>
                  <option>Urgent (1-2 weeks)</option>
                  <option>Normal (1 month)</option>
                  <option>Flexible (2-3 months)</option>
                </select>
              </div>

              {/* Additional Requirements */}
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Additional Requirements
                </label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="Any specific requirements, technical specifications, or questions..."
                />
              </div>

              {/* Contact Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-4 rounded-lg transition-colors text-lg"
              >
                Submit Sourcing Request
              </button>

              <p className="text-sm text-text-secondary text-center">
                We&apos;ll respond within 24 hours with supplier recommendations.
              </p>
            </form>
          </div>
        </section>

        {/* Why Use Our Service */}
        <section className="py-20 lg:py-28 bg-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-center font-[family-name:var(--font-serif)]">
              Why Use Supplier Matching?
            </h2>

            <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-orange-500/10 flex items-center justify-center mx-auto">
                  <Clock className="text-orange-500" size={28} />
                </div>
                <h3 className="mt-4 text-xl font-semibold">Save Time</h3>
                <p className="mt-2 text-text-secondary">
                  No need to contact dozens of suppliers. We pre-screen and recommend only verified options.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-orange-500/10 flex items-center justify-center mx-auto">
                  <CheckCircle className="text-orange-500" size={28} />
                </div>
                <h3 className="mt-4 text-xl font-semibold">Reduce Risk</h3>
                <p className="mt-2 text-text-secondary">
                  Every recommended supplier is verified for certifications, production capability, and export experience.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-orange-500/10 flex items-center justify-center mx-auto">
                  <Search className="text-orange-500" size={28} />
                </div>
                <h3 className="mt-4 text-xl font-semibold">Expert Guidance</h3>
                <p className="mt-2 text-text-secondary">
                  Former BYD factory manager evaluates suppliers using OEM-level criteria.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-orange-500/10 flex items-center justify-center mx-auto">
                  <TrendingUp className="text-orange-500" size={28} />
                </div>
                <h3 className="mt-4 text-xl font-semibold">Free Service</h3>
                <p className="mt-2 text-text-secondary">
                  Supplier matching is free. We earn commission from suppliers only after successful orders.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 lg:py-28 bg-gradient-to-br from-navy-900 via-navy-800 to-navy-700">
          <div className="max-w-3xl mx-auto px-6 lg:px-12 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-white font-[family-name:var(--font-serif)]">
              Ready to Find Your Supplier?
            </h2>
            <p className="mt-4 text-white/70 text-lg">
              Submit your requirements and get matched with verified EV charging manufacturers within 48 hours.
            </p>
            <Link
              href="#form"
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
