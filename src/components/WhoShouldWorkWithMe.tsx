"use client";

import { CheckCircle, X } from "lucide-react";
import { FadeIn, Stagger, StaggerItem } from "./Animations";

const goodFit = [
  {
    title: "EV Charging Distributors (US/EU/AU)",
    description: "You resell EV charging equipment and need reliable suppliers with real certifications.",
  },
  {
    title: "Charging Network Operators",
    description: "You operate charging stations and need custom CCS/NACS cables with proven quality.",
  },
  {
    title: "Product Developers & Startups",
    description: "You're developing EV charging products and need OEM/ODM manufacturing partners.",
  },
  {
    title: "Buyers with Quality Issues",
    description: "Your current supplier had fake certifications, wrong specs, or quality problems.",
  },
];

const notGoodFit = [
  {
    title: "Dropshipping / One-Piece Orders",
    description: "I focus on B2B bulk orders (typically 500+ units minimum), not retail fulfillment or single-piece orders.",
  },
  {
    title: "Budget Below Certification Costs",
    description: "UL certification costs $25K-$50K per product. If you can't cover this, certified products aren't viable yet.",
  },
  {
    title: "Non-EV Charging Products",
    description: "I only work with EV charging equipment — cables, connectors, chargers, adapters.",
  },
  {
    title: "Looking for the Cheapest Option",
    description: "I prioritize quality and compliance over rock-bottom pricing. If price is your only concern, this isn't a good fit.",
  },
];

export default function WhoShouldWorkWithMe() {
  return (
    <section className="py-24 lg:py-32 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        <FadeIn>
          <p className="text-sm font-semibold text-orange-600 uppercase tracking-wider text-center mb-3">
            Is This For You?
          </p>
          <h2 className="text-3xl lg:text-4xl font-bold text-center font-[family-name:var(--font-serif)]">
            Who Should Work With Me
          </h2>
          <p className="mt-3 text-text-secondary text-center text-lg max-w-2xl mx-auto">
            I work with serious buyers who value quality and compliance over rock-bottom pricing.
          </p>
        </FadeIn>

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Good Fit */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle size={18} className="text-green-600" />
              </div>
              <h3 className="text-xl font-semibold">Good Fit</h3>
            </div>

            <Stagger staggerDelay={0.1} className="space-y-4">
              {goodFit.map((item) => (
                <StaggerItem key={item.title}>
                  <div className="p-5 rounded-xl border-2 border-green-200 bg-green-50/50 backdrop-blur-sm hover:border-green-300 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 min-h-[112px] flex flex-col">
                    <h4 className="font-semibold text-base text-gray-900">
                      {item.title}
                    </h4>
                    <p className="mt-1.5 text-sm text-gray-600 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>

          {/* Not Good Fit */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
                <X size={18} className="text-red-600" />
              </div>
              <h3 className="text-xl font-semibold">Not a Good Fit</h3>
            </div>

            <Stagger staggerDelay={0.1} className="space-y-4">
              {notGoodFit.map((item) => (
                <StaggerItem key={item.title}>
                  <div className="p-5 rounded-xl border-2 border-red-200 bg-red-50/50 backdrop-blur-sm hover:border-red-300 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 min-h-[112px] flex flex-col">
                    <h4 className="font-semibold text-base text-gray-900">
                      {item.title}
                    </h4>
                    <p className="mt-1.5 text-sm text-gray-600 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </div>

        <FadeIn delay={0.6}>
          <div className="mt-12 p-6 rounded-xl bg-orange-50 border border-orange-200 text-center">
            <p className="text-base text-gray-800">
              <span className="font-semibold">Not sure if you're a good fit?</span> Send me your requirements —
              I'll tell you honestly if I can help or point you in the right direction.
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
