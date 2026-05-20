"use client";

import { Factory, Anchor, MapPinCheck, Globe } from "lucide-react";
import { FadeIn, Stagger, StaggerItem, ScaleIn } from "./Animations";

const advantages = [
  {
    icon: Factory,
    title: "Complete industrial clusters",
    description: "Knives (Yangjiang), Precision parts (Dongguan), Building materials (Foshan), Garments (Guangzhou) — all within 2 hours.",
  },
  {
    icon: Anchor,
    title: "Direct port access",
    description: "Guangzhou & Shenzhen ports — among the world's busiest. Fast, reliable shipping worldwide.",
  },
  {
    icon: MapPinCheck,
    title: "On-the-ground presence",
    description: "We can visit any factory within 24 hours. Not remote middlemen — we're here, every day.",
  },
  {
    icon: Globe,
    title: "Mature export infrastructure",
    description: "Decades of export experience. English-speaking factories. Established logistics networks.",
  },
];

export default function WhyGuangdong() {
  return (
    <section className="py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <FadeIn>
          <h2 className="text-3xl lg:text-4xl font-bold text-center font-[family-name:var(--font-serif)]">
            Why Guangdong?
          </h2>
          <p className="mt-4 text-text-secondary text-center text-lg max-w-2xl mx-auto">
            We&apos;re not a trading company. We&apos;re former factory managers based in the
            Pearl River Delta — the world&apos;s most complete manufacturing ecosystem.
          </p>
        </FadeIn>

        <Stagger staggerDelay={0.12} className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {advantages.map((item, i) => (
            <StaggerItem key={item.title}>
              <div className="text-center p-6">
                <ScaleIn delay={i * 0.1}>
                  <div className="w-14 h-14 rounded-full bg-navy-900/5 flex items-center justify-center mx-auto">
                    <item.icon size={26} className="text-navy-700" />
                  </div>
                </ScaleIn>
                <h3 className="mt-4 font-semibold text-base">{item.title}</h3>
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
