"use client";

import { AlertTriangle, ImageOff, MessageCircleWarning, Ban, CheckCircle } from "lucide-react";
import { FadeIn, Stagger, StaggerItem } from "./Animations";

const painPoints = [
  {
    icon: AlertTriangle,
    title: "Fake UL 2594 certifications slip through",
    description: "EVSE manufacturer shows you a UL 2594 certificate. Looks legit. You ship to the US. Customs rejects the entire container — certificate was fake. $100K+ loss, 3-month delay.",
    solution: "I verify every UL 2251/2594 certificate in the official database and cross-check with test reports. I've caught fake EVSE certifications that would have cost buyers $500K+ in losses.",
  },
  {
    icon: MessageCircleWarning,
    title: "Wrong connector standard = useless EVSE",
    description: "You ordered CCS1 cables for the US charging network. OEM shipped CCS2 (European standard). Connectors physically incompatible with Type 1 vehicles. Entire batch is scrap unless you eat the reshipping cost.",
    solution: "I speak the technical language — CCS1 vs CCS2, NACS vs J1772, Type 1 vs Type 2, IEC 62196-2 vs 62196-3. I verify connector samples match charging infrastructure specs before bulk production.",
  },
  {
    icon: ImageOff,
    title: "DC charging cables overheat at rated current",
    description: "EVSE manufacturer claims \"200A rated\" but uses undersized conductors. Cables overheat during DC fast charging sessions. Fire hazard, UL 2594 failure, product recall nightmare.",
    solution: "I check conductor sizing (AWG/mm²), cable construction drawings, and temperature rise test data. I know what automotive-grade EVSE actually requires — not consumer electronics standards.",
  },
  {
    icon: Ban,
    title: "Consumer-grade parts in charging equipment",
    description: "OEM uses consumer electronics components in EVSE. Works in the lab, fails in -20°C winter or after 5,000 charging cycles. IEC 62752 non-compliance. No refund after 6 months.",
    solution: "Former BYD quality manager — I know the difference between consumer-grade and automotive-grade charging infrastructure. I verify component suppliers, connector ratings, and flex cycle test data.",
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
            EVSE Procurement Mistakes Cost $100K+
          </h2>
          <p className="mt-3 text-text-secondary text-center text-lg max-w-2xl mx-auto">
            Charging infrastructure sourcing disasters I help buyers avoid.
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
