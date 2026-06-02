"use client";

import { Search, ShieldCheck, Package, FileText } from "lucide-react";
import { FadeIn, Stagger, StaggerItem } from "./Animations";

const services = [
  {
    icon: Search,
    title: "EVSE Manufacturer Matching",
    description: "Connect with UL 2251/2594-certified EVSE manufacturers and IEC 62196-compliant charging cable OEMs in Pearl River Delta. We evaluate CCS1/CCS2/NACS connector production capability, liquid-cooled cable expertise, and charging infrastructure export experience.",
  },
  {
    icon: ShieldCheck,
    title: "Charging Equipment OEM Audits",
    description: "Reduce EVSE procurement risks through on-site factory audits. We verify UL/IEC/SAE certifications, temperature rise test data, DC fast charging cable production lines, connector assembly QC processes, and automotive-grade component sourcing.",
  },
  {
    icon: Package,
    title: "White-Label EVSE Support",
    description: "Support custom EVSE branding, charging cable packaging design, and OEM manufacturing coordination. We help navigate MOQ requirements for CCS/NACS connectors, tooling costs for liquid-cooled cables, and Level 2 EVSE production timelines.",
  },
  {
    icon: FileText,
    title: "Charging Infrastructure Insights",
    description: "Understand China's EVSE and connector supply chain through industry research, IEC/UL certification guides, and charging equipment OEM intelligence. Knowledge that reduces charging infrastructure procurement uncertainty.",
  },
];

export default function Services() {
  return (
    <section className="py-24 lg:py-32 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <FadeIn>
          <h2 className="text-3xl lg:text-4xl font-bold text-center font-[family-name:var(--font-serif)]">
            Charging Infrastructure Procurement Services
          </h2>
          <p className="mt-4 text-text-secondary text-center text-lg max-w-2xl mx-auto">
            Everything you need to source EVSE and charging cables from China with confidence.
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
