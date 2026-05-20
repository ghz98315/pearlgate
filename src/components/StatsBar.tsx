"use client";

import { FadeIn } from "./Animations";

const stats = [
  { value: "20", suffix: "+", label: "Verified Factories", sub: "Personally visited and vetted" },
  { value: "2", suffix: "", label: "Core Categories", sub: "Hardware Tools · Molds" },
  { value: "10", suffix: "yr", label: "Factory Experience", sub: "In Guangdong operations" },
  { value: "48", suffix: "h", label: "Free Matching", sub: "2-3 verified options, no cost" },
];

export default function StatsBar() {
  return (
    <section className="py-16 bg-white border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <FadeIn>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-4xl lg:text-5xl font-black font-[family-name:var(--font-serif)] text-navy-900">
                  {stat.value}
                  <span className="text-orange-500">{stat.suffix}</span>
                </div>
                <p className="text-sm font-semibold text-navy-900 mt-2">{stat.label}</p>
                <p className="text-xs text-text-secondary mt-1">{stat.sub}</p>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
