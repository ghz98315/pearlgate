"use client";

import { Search, ClipboardCheck, Package } from "lucide-react";
import { FadeIn, Stagger, StaggerItem } from "./Animations";

const services = [
  {
    icon: Search,
    title: "Supplier Sourcing",
    description: "I find and vet 3+ factories for your product, with comparative quotes ready in 48 hours.",
  },
  {
    icon: ClipboardCheck,
    title: "Quality Control",
    description: "On-site inspection before shipping — photos, video, and a detailed report so you know exactly what you're getting.",
  },
  {
    icon: Package,
    title: "Order Management",
    description: "I handle factory communication, production tracking, and logistics coordination from order to delivery.",
  },
];

export default function Services() {
  return (
    <section className="py-24 lg:py-32 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <FadeIn>
          <h2 className="text-3xl lg:text-4xl font-bold text-center font-[family-name:var(--font-serif)]">
            How I help
          </h2>
          <p className="mt-4 text-text-secondary text-center text-lg max-w-2xl mx-auto">
            Three core services to take the stress out of sourcing from China.
          </p>
        </FadeIn>

        <Stagger staggerDelay={0.15} className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service) => (
            <StaggerItem key={service.title}>
              <div className="p-8 rounded-2xl bg-white border border-border hover:shadow-lg hover:border-navy-700/30 transition-all duration-300 hover:-translate-y-1 group h-full">
                <div className="w-12 h-12 rounded-xl bg-navy-900/5 group-hover:bg-navy-700/10 flex items-center justify-center transition-colors">
                  <service.icon size={24} className="text-navy-700" />
                </div>
                <h3 className="mt-5 text-xl font-semibold">{service.title}</h3>
                <p className="mt-3 text-text-secondary leading-relaxed">
                  {service.description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
