"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Send, CheckCircle, Loader2 } from "lucide-react";

export default function QuotePage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const form = e.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      company: formData.get("company") as string,
      category: formData.get("category") as string,
      product: formData.get("product") as string,
      quantity: formData.get("quantity") as string,
      targetPrice: formData.get("targetPrice") as string,
      details: formData.get("details") as string,
      source: formData.get("source") as string,
    };

    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Something went wrong");
      }

      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to submit. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <>
        <Navbar />
        <main className="pt-32 pb-24 min-h-screen bg-gray-50">
          <div className="max-w-2xl mx-auto px-6 lg:px-12 text-center">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto">
              <CheckCircle size={32} className="text-green-600" />
            </div>
            <h1 className="mt-6 text-3xl font-bold font-[family-name:var(--font-serif)]">
              Thanks! Your request is in.
            </h1>
            <p className="mt-4 text-text-secondary text-lg leading-relaxed">
              I&apos;ll review your requirements and get back to you within 24 hours
              with factory options and pricing.
            </p>
            <p className="mt-8 text-sm text-text-secondary">
              In the meantime, feel free to connect with me on{" "}
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-orange-500 hover:text-orange-600">
                LinkedIn
              </a>.
            </p>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="pt-32 pb-24 min-h-screen bg-gray-50">
        <div className="max-w-2xl mx-auto px-6 lg:px-12">
          <h1 className="text-3xl lg:text-4xl font-bold font-[family-name:var(--font-serif)]">
            Get a Free Quote
          </h1>
          <p className="mt-3 text-text-secondary text-lg">
            Tell me what you&apos;re looking for — I&apos;ll get back within 24 hours with factory options.
          </p>

          <form
            onSubmit={handleSubmit}
            className="mt-10 space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Your Name *</label>
                <input
                  type="text"
                  name="name"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-border bg-white focus:outline-none focus:ring-2 focus:ring-navy-700/20 focus:border-navy-700 transition-colors"
                  placeholder="John Smith"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email *</label>
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-border bg-white focus:outline-none focus:ring-2 focus:ring-navy-700/20 focus:border-navy-700 transition-colors"
                  placeholder="john@company.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Company <span className="text-text-secondary font-normal">(optional)</span></label>
              <input
                type="text"
                name="company"
                className="w-full px-4 py-3 rounded-xl border border-border bg-white focus:outline-none focus:ring-2 focus:ring-navy-700/20 focus:border-navy-700 transition-colors"
                placeholder="Your company name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Category *</label>
              <select
                name="category"
                required
                className="w-full px-4 py-3 rounded-xl border border-border bg-white focus:outline-none focus:ring-2 focus:ring-navy-700/20 focus:border-navy-700 transition-colors"
              >
                <option value="">Select a category</option>
                <option value="Knives & Hand Tools">Knives & Hand Tools</option>
                <option value="Precision Parts & OEM">Precision Parts & OEM</option>
                <option value="Aluminum & Building Hardware">Aluminum & Building Hardware</option>
                <option value="Workwear & Corporate Uniforms">Workwear & Corporate Uniforms</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Product Description *</label>
              <textarea
                name="product"
                required
                rows={4}
                className="w-full px-4 py-3 rounded-xl border border-border bg-white focus:outline-none focus:ring-2 focus:ring-navy-700/20 focus:border-navy-700 transition-colors resize-none"
                placeholder="Describe the product you're looking for — material, size, specifications, reference images, etc."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Quantity Needed *</label>
                <input
                  type="text"
                  name="quantity"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-border bg-white focus:outline-none focus:ring-2 focus:ring-navy-700/20 focus:border-navy-700 transition-colors"
                  placeholder="e.g., 500 units"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Target Price <span className="text-text-secondary font-normal">(optional)</span></label>
                <input
                  type="text"
                  name="targetPrice"
                  className="w-full px-4 py-3 rounded-xl border border-border bg-white focus:outline-none focus:ring-2 focus:ring-navy-700/20 focus:border-navy-700 transition-colors"
                  placeholder="e.g., $3-5 per unit"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Additional Details <span className="text-text-secondary font-normal">(optional)</span></label>
              <textarea
                name="details"
                rows={3}
                className="w-full px-4 py-3 rounded-xl border border-border bg-white focus:outline-none focus:ring-2 focus:ring-navy-700/20 focus:border-navy-700 transition-colors resize-none"
                placeholder="Any other requirements — timeline, certifications, packaging, etc."
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">How did you find us? <span className="text-text-secondary font-normal">(optional)</span></label>
              <select
                name="source"
                className="w-full px-4 py-3 rounded-xl border border-border bg-white focus:outline-none focus:ring-2 focus:ring-navy-700/20 focus:border-navy-700 transition-colors"
              >
                <option value="">Select</option>
                <option value="Google Search">Google Search</option>
                <option value="LinkedIn">LinkedIn</option>
                <option value="Reddit">Reddit</option>
                <option value="Referral">Referral</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {error && (
              <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white font-semibold px-8 py-4 rounded-xl text-lg transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-orange-500/25 disabled:hover:translate-y-0 disabled:hover:shadow-none"
            >
              {loading ? <Loader2 size={20} className="animate-spin" /> : <Send size={20} />}
              {loading ? "Submitting..." : "Submit Request"}
            </button>

            <p className="text-center text-xs text-text-secondary">
              Your information is secure. We never share your details with third parties.
            </p>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
}
