"use client";

import { Search, ShieldCheck, Package, FileText } from "lucide-react";
import { FadeIn, Stagger, StaggerItem } from "./Animations";

const services = [
  {
    icon: Search,
    title: "Supplier Sourcing",
    description: "Match reliable EV charging manufacturers from China's Pearl River Delta. We evaluate production capability, certifications, and export experience before recommending suppliers.",
  },
  {
    icon: ShieldCheck,
    title: "Factory Verification",
    description: "Reduce sourcing risks through on-site factory audits. We verify certifications (UL/CE/TUV), production lines, QC processes, and OEM capability using our manufacturing background.",
  },
  {
    icon: Package,
    title: "OEM Support",
    description: "Support custom branding, packaging design, and OEM manufacturing coordination. We help navigate MOQ requirements, tooling costs, and production timelines.",
  },
  {
    icon: FileText,
    title: "Supply Chain Insights",
    description: "Understand China's EV charging supply chain through industry research, manufacturing guides, and supplier intelligence. Knowledge that reduces procurement uncertainty.",
  },
];

export default function Services() {
  return (
    <section className="py-24 lg:py-32 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <FadeIn>
          <h2 className="text-3xl lg:text-4xl font-bold text-center font-[family-name:var(--font-serif)]">
            What we offer
          </h2>
          <p className="mt-4 text-text-secondary text-center text-lg max-w-2xl mx-auto">
            Everything you need to source EV charging products from China with confidence.
          </p>
        </FadeIn>

        <Stagger staggerDelay={0.15} className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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
