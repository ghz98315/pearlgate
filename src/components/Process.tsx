"use client";

import { ClipboardList, Search, CheckCircle, Ship } from "lucide-react";
import { FadeIn, Stagger, StaggerItem } from "./Animations";

const steps = [
  {
    icon: ClipboardList,
    step: "01",
    title: "Tell Me What You Need",
    description: "Submit a quick form with your product details, quantity, and budget.",
  },
  {
    icon: Search,
    step: "02",
    title: "I Find the Best Factories",
    description: "Within 48 hours, you get quotes from 3+ verified suppliers with my recommendation.",
  },
  {
    icon: CheckCircle,
    step: "03",
    title: "You Choose, I Handle the Rest",
    description: "I manage the order, track production, and inspect quality before shipping.",
  },
  {
    icon: Ship,
    step: "04",
    title: "Products Arrive at Your Door",
    description: "Shipping arranged, customs docs prepared, delivered to your warehouse.",
  },
];

export default function Process() {
  return (
    <section className="py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <FadeIn>
          <h2 className="text-3xl lg:text-4xl font-bold text-center font-[family-name:var(--font-serif)]">
            How it works
          </h2>
          <p className="mt-4 text-text-secondary text-center text-lg max-w-2xl mx-auto">
            Four simple steps from inquiry to delivery.
          </p>
        </FadeIn>

        <Stagger staggerDelay={0.2} className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-8">
          {steps.map((item, index) => (
            <StaggerItem key={item.step}>
              <div className="relative text-center">
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-px bg-border" />
                )}
                <div className="w-16 h-16 rounded-full bg-navy-900/5 flex items-center justify-center mx-auto relative group hover:bg-navy-900/10 transition-colors">
                  <item.icon size={28} className="text-navy-700" />
                  <span className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-orange-500 text-white text-xs font-bold flex items-center justify-center">
                    {item.step}
                  </span>
                </div>
                <h3 className="mt-5 font-semibold text-base">{item.title}</h3>
                <p className="mt-2 text-text-secondary text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
