"use client";

import { AlertTriangle, ImageOff, MessageCircleWarning, Ban, CheckCircle } from "lucide-react";
import { FadeIn, Stagger, StaggerItem } from "./Animations";

const painPoints = [
  {
    icon: AlertTriangle,
    title: "Too many suppliers, no way to tell who's legit",
    description: "Alibaba shows 10,000 results — but which one won't ghost you after payment?",
    solution: "Every factory on PearlGate is personally verified by someone who managed Guangdong factories for 10+ years.",
  },
  {
    icon: MessageCircleWarning,
    title: "Language barriers slow everything down",
    description: "Spec sheets lost in translation. Factories misunderstand tolerances and timelines.",
    solution: "We handle all factory communication in Mandarin, negotiate on your behalf, and translate specs precisely.",
  },
  {
    icon: ImageOff,
    title: "Quality surprises after shipment",
    description: "Containers arrive and 20% is defective. By then it's too late to fix anything.",
    solution: "Our QC comes from someone who managed production lines. Problems caught before they leave port.",
  },
  {
    icon: Ban,
    title: "Minimum orders are too high",
    description: "You need 500 units, not 5,000 — but factories won't take small buyers seriously.",
    solution: "Our network includes factories with flexible MOQs for first orders. We negotiate on your behalf.",
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
            Sourcing from China is broken.
          </h2>
          <p className="mt-3 text-text-secondary text-center text-lg max-w-2xl mx-auto">
            We fix the biggest problems buyers face every day.
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
