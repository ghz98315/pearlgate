"use client";

import { AlertTriangle, ImageOff, MessageCircleWarning, Ban, CheckCircle } from "lucide-react";
import { FadeIn, Stagger, StaggerItem } from "./Animations";

const painPoints = [
  {
    icon: AlertTriangle,
    title: "Fake UL certifications slip through",
    description: "Factory shows you a UL certificate. Looks legit. You ship to the US. Customs rejects the entire container — certificate was fake. $100K+ loss, 3-month delay.",
    solution: "I verify every UL certificate in the official database and cross-check with test reports. I've caught fake certs that would have cost buyers $500K+ in losses.",
  },
  {
    icon: MessageCircleWarning,
    title: "Wrong connector standard = useless product",
    description: "You ordered CCS1 for the US market. Factory shipped CCS2 (European standard). Connectors physically incompatible. Entire batch is scrap unless you eat the reshipping cost.",
    solution: "I speak the technical language — CCS1 vs CCS2, NACS vs J1772, Type 1 vs Type 2. I verify samples match specs before bulk production.",
  },
  {
    icon: ImageOff,
    title: "Cables overheat at rated current",
    description: "Factory claims \"32A rated\" but uses undersized conductors. Cables overheat during testing. Fire hazard, UL failure, product recall nightmare.",
    solution: "I check conductor sizing, cable construction drawings, and temperature rise test data. I know what automotive-grade actually means.",
  },
  {
    icon: Ban,
    title: "Consumer-grade parts in automotive products",
    description: "Factory uses consumer electronics components in EV charging equipment. Works in the lab, fails in -20°C winter or after 5,000 plug cycles. No refund after 6 months.",
    solution: "Former BYD quality manager — I know the difference between consumer-grade and automotive-grade. I verify component suppliers and test cycle data.",
  },
];

export default function PainPoints() {
  return (
    <section className="py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <FadeIn>
          <p className="text-sm font-semibold text-teal-600 uppercase tracking-wider text-center mb-3">
            Why PearlGate
          </p>
          <h2 className="text-3xl lg:text-4xl font-bold text-center font-[family-name:var(--font-serif)]">
            EV Charging Sourcing Is High-Stakes
          </h2>
          <p className="mt-3 text-text-secondary text-center text-lg max-w-2xl mx-auto">
            One mistake can cost $100K+. Here are the disasters I help buyers avoid.
          </p>
        </FadeIn>

        <Stagger staggerDelay={0.12} className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6">
          {painPoints.map((point) => (
            <StaggerItem key={point.title}>
              <div className="p-6 rounded-2xl border border-border bg-white hover:shadow-md hover:border-orange-500/30 transition-all duration-300 h-full flex flex-col">
                <point.icon size={28} className="text-orange-500" />
                <h3 className="mt-4 font-semibold text-base leading-snug">
                  {point.title}
                </h3>
                <p className="mt-2 text-text-secondary text-sm leading-relaxed">
                  {point.description}
                </p>
                <div className="mt-4 pt-4 border-t border-border flex gap-2.5 items-start">
                  <CheckCircle size={18} className="text-teal-600 shrink-0 mt-0.5" />
                  <p className="text-sm text-gray-700 font-medium leading-relaxed">
                    {point.solution}
                  </p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
