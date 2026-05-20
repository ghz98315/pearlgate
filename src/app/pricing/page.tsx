"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Check, X } from "lucide-react";
import EmailCapture from "@/components/EmailCapture";

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Browse our directory and get a feel for what's available.",
    cta: "Get Started",
    ctaLink: "/suppliers",
    highlight: false,
    features: [
      { text: "Browse supplier directory", included: true },
      { text: "View 3 full supplier profiles", included: true },
      { text: "Basic factory information", included: true },
      { text: "Full contact details", included: false },
      { text: "Certification downloads", included: false },
      { text: "Submit inquiries", included: false },
      { text: "New factory alerts", included: false },
      { text: "Priority support", included: false },
    ],
  },
  {
    name: "Pro",
    price: "$79",
    period: "/month",
    annual: "$699/year (save 25%)",
    description: "Full access to our verified supplier database. The serious sourcing toolkit.",
    cta: "Subscribe to Pro",
    ctaLink: "#",
    stripePrice: process.env.NEXT_PUBLIC_STRIPE_PRO_PRICE_ID || "price_pro_placeholder",
    highlight: true,
    badge: "Most Popular",
    features: [
      { text: "Full supplier database access", included: true },
      { text: "All contact details unlocked", included: true },
      { text: "Certification documents download", included: true },
      { text: "5 inquiries per month", included: true },
      { text: "Monthly new factory updates", included: true },
      { text: "Email priority support", included: true },
      { text: "Dedicated sourcing agent", included: false },
      { text: "QC & order management", included: false },
    ],
  },
  {
    name: "Agency",
    price: "$199",
    period: "/month + 10% commission",
    description: "Full-service sourcing. We handle everything from quote to delivery.",
    cta: "Contact Us",
    ctaLink: "/quote",
    stripePrice: process.env.NEXT_PUBLIC_STRIPE_AGENCY_PRICE_ID || "price_agency_placeholder",
    highlight: false,
    features: [
      { text: "Everything in Pro", included: true },
      { text: "Unlimited inquiries", included: true },
      { text: "Dedicated sourcing agent", included: true },
      { text: "Price negotiation on your behalf", included: true },
      { text: "On-site QC inspection", included: true },
      { text: "Order & logistics management", included: true },
      { text: "Monthly strategy call", included: true },
      { text: "WhatsApp direct line", included: true },
    ],
  },
];

export default function PricingPage() {
  const { data: session } = useSession();

  const handleSubscribe = async (priceId: string) => {
    if (!session) {
      window.location.href = "/login";
      return;
    }

    const res = await fetch("/api/stripe/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ priceId }),
    });

    const data = await res.json();
    if (data.url) {
      window.location.href = data.url;
    }
  };
  return (
    <>
      <Navbar />
      <main className="pt-32 pb-24 min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto">
            <h1 className="text-3xl lg:text-5xl font-bold font-[family-name:var(--font-serif)]">
              Simple, transparent pricing
            </h1>
            <p className="mt-4 text-text-secondary text-lg">
              From free browsing to full-service sourcing. Pick what fits your needs.
            </p>
            <p className="mt-3 text-sm text-navy-700 font-medium">
              Trusted by 50+ buyers sourcing from our verified network.
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`relative rounded-2xl p-8 flex flex-col ${
                  plan.highlight
                    ? "border-2 border-orange-500 shadow-xl shadow-orange-500/10"
                    : "border border-border"
                }`}
              >
                {plan.badge && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-orange-500 text-white text-xs font-bold px-4 py-1 rounded-full">
                    {plan.badge}
                  </span>
                )}

                <div>
                  <h3 className="text-lg font-semibold">{plan.name}</h3>
                  <div className="mt-3 flex items-baseline gap-1">
                    <span className="text-4xl font-bold font-[family-name:var(--font-serif)]">{plan.price}</span>
                    <span className="text-text-secondary text-sm">{plan.period}</span>
                  </div>
                  {plan.annual && (
                    <p className="mt-1 text-sm text-green-600 font-medium">{plan.annual}</p>
                  )}
                  <p className="mt-3 text-text-secondary text-sm leading-relaxed">{plan.description}</p>
                </div>

                <div className="mt-6 flex-1">
                  <ul className="space-y-3">
                    {plan.features.map((feature) => (
                      <li key={feature.text} className="flex items-start gap-2.5">
                        {feature.included ? (
                          <Check size={16} className="text-green-500 shrink-0 mt-0.5" />
                        ) : (
                          <X size={16} className="text-gray-300 shrink-0 mt-0.5" />
                        )}
                        <span className={`text-sm ${feature.included ? "text-text-primary" : "text-text-secondary/50"}`}>
                          {feature.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {plan.stripePrice ? (
                  <button
                    onClick={() => handleSubscribe(plan.stripePrice!)}
                    className={`mt-8 block w-full text-center font-semibold py-3 rounded-lg transition-all hover:-translate-y-0.5 ${
                      plan.highlight
                        ? "bg-orange-500 hover:bg-orange-600 text-white hover:shadow-lg hover:shadow-orange-500/25"
                        : "bg-navy-900/5 hover:bg-navy-900/10 text-navy-900"
                    }`}
                  >
                    {plan.cta}
                  </button>
                ) : (
                  <Link
                    href={plan.ctaLink}
                    className={`mt-8 block text-center font-semibold py-3 rounded-lg transition-all hover:-translate-y-0.5 ${
                      plan.highlight
                        ? "bg-orange-500 hover:bg-orange-600 text-white hover:shadow-lg hover:shadow-orange-500/25"
                        : "bg-navy-900/5 hover:bg-navy-900/10 text-navy-900"
                    }`}
                  >
                    {plan.cta}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* FAQ */}
          <div className="mt-20 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-center font-[family-name:var(--font-serif)]">
              Questions about pricing
            </h2>
            <div className="mt-8 space-y-6">
              <FaqItem
                q="Can I cancel anytime?"
                a="Yes. No contracts, no lock-in. Cancel your subscription anytime and you keep access until the end of your billing period."
              />
              <FaqItem
                q="What payment methods do you accept?"
                a="We accept all major credit cards and PayPal. Annual plans can also be paid via bank transfer."
              />
              <FaqItem
                q="How often is the database updated?"
                a="We add new verified factories monthly and update existing profiles quarterly. Pro members get notified of every new addition."
              />
              <FaqItem
                q="What does the 10% commission cover in Agency?"
                a="It covers our full sourcing service: supplier negotiation, order placement, production monitoring, quality inspection, and shipping coordination. You only pay commission on successful orders."
              />
            </div>
          </div>

          {/* Email Capture */}
          <div className="mt-20">
            <EmailCapture
              title="Not ready to subscribe?"
              subtitle="Get free sourcing tips and new factory alerts in your inbox."
              source="pricing_page"
            />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  return (
    <div>
      <h3 className="font-semibold">{q}</h3>
      <p className="mt-1 text-text-secondary text-sm leading-relaxed">{a}</p>
    </div>
  );
}
