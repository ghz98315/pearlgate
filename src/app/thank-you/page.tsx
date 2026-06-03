"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, ArrowRight, MessageSquare, Mail } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FadeIn } from "@/components/Animations";
import { Suspense } from "react";

function ThankYouContent() {
  const searchParams = useSearchParams();
  const referenceId = searchParams.get("ref") || "PG-XXXXXXXX-XXX";

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white">
        <section className="px-6 py-32">
          <div className="max-w-3xl mx-auto text-center">
            <FadeIn>
              <div className="inline-flex items-center justify-center w-20 h-20 mb-6 bg-green-100 rounded-full">
                <CheckCircle2 size={48} className="text-green-600" />
              </div>

              <h1 className="mb-4 text-4xl font-bold text-gray-900 lg:text-5xl font-[family-name:var(--font-serif)]">
                Request Received!
              </h1>

              <p className="mb-8 text-lg text-gray-600">
                Thank you for your interest in our EVSE & charging cable products.
                We'll match you with 2-3 verified OEM manufacturers within 48 hours.
              </p>

              <div className="inline-block px-6 py-3 mb-12 bg-orange-50 border-2 border-orange-200 rounded-lg">
                <p className="text-sm font-medium text-gray-600">Your Reference ID</p>
                <p className="text-2xl font-bold text-orange-600">{referenceId}</p>
              </div>

              {/* What's Next */}
              <div className="p-8 mb-12 text-left bg-gray-50 rounded-2xl">
                <h2 className="mb-4 text-xl font-bold text-gray-900">What happens next?</h2>
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="flex items-center justify-center flex-shrink-0 w-8 h-8 font-bold text-white bg-orange-500 rounded-full">
                      1
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Confirmation Email</p>
                      <p className="text-sm text-gray-600">
                        Check your inbox for a confirmation with your reference ID
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex items-center justify-center flex-shrink-0 w-8 h-8 font-bold text-white bg-orange-500 rounded-full">
                      2
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">OEM Matching (24-48 hours)</p>
                      <p className="text-sm text-gray-600">
                        We'll verify certifications and match you with 2-3 suitable manufacturers
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex items-center justify-center flex-shrink-0 w-8 h-8 font-bold text-white bg-orange-500 rounded-full">
                      3
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Detailed Response</p>
                      <p className="text-sm text-gray-600">
                        You'll receive OEM profiles, pricing, lead times, and sample availability
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Contact */}
              <div className="p-8 mb-12 border-2 border-gray-200 rounded-2xl">
                <h2 className="mb-6 text-xl font-bold text-gray-900">Need to reach us sooner?</h2>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  <a
                    href="https://wa.me/[TO_BE_CONFIGURED]"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center gap-2 p-4 transition-all border-2 border-gray-200 rounded-lg hover:border-orange-400 hover:-translate-y-1"
                  >
                    <MessageSquare size={32} className="text-green-600" />
                    <span className="font-semibold text-gray-900">WhatsApp</span>
                    <span className="text-sm text-gray-600">[Configure Number]</span>
                  </a>

                  <a
                    href="mailto:Alex.Guan@pearlgatesourcing.com"
                    className="flex flex-col items-center gap-2 p-4 transition-all border-2 border-gray-200 rounded-lg hover:border-orange-400 hover:-translate-y-1"
                  >
                    <Mail size={32} className="text-blue-600" />
                    <span className="font-semibold text-gray-900">Email</span>
                    <span className="text-sm text-gray-600">Alex.Guan@pearlgatesourcing.com</span>
                  </a>

                  <a
                    href="https://linkedin.com/company/[TO_BE_CONFIGURED]"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center gap-2 p-4 transition-all border-2 border-gray-200 rounded-lg hover:border-orange-400 hover:-translate-y-1"
                  >
                    <Mail size={32} className="text-blue-700" />
                    <span className="font-semibold text-gray-900">LinkedIn</span>
                    <span className="text-sm text-gray-600">[Configure URL]</span>
                  </a>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
                <Link
                  href="/products"
                  className="inline-flex items-center justify-center gap-2 px-8 py-3 font-semibold text-white transition-all bg-orange-500 rounded-lg hover:bg-orange-600 hover:-translate-y-0.5"
                >
                  Browse More Products
                  <ArrowRight size={20} />
                </Link>
                <Link
                  href="/"
                  className="inline-flex items-center justify-center gap-2 px-8 py-3 font-medium text-gray-700 transition-all bg-gray-100 rounded-lg hover:bg-gray-200"
                >
                  Back to Home
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

export default function ThankYouPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    }>
      <ThankYouContent />
    </Suspense>
  );
}
