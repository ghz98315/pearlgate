"use client";

import { FadeIn } from "./Animations";

const brands = [
  { slug: "dell", name: "Dell" },
  { slug: "toshiba", name: "Toshiba" },
  { slug: "lenovo", name: "Lenovo" },
  { slug: "huawei", name: "Huawei" },
  { slug: "siemens", name: "Siemens" },
  { slug: "asus", name: "ASUS" },
];

export default function BYDExperienceLogos() {
  return (
    <section className="bg-gray-50 border-y border-gray-100 py-10 lg:py-14">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <FadeIn>
          <p className="text-center text-xs lg:text-sm font-semibold text-navy-700 uppercase tracking-wider mb-2">
            Quality experience gained at BYD
          </p>
          <p className="text-center text-sm lg:text-base text-text-secondary mb-8">
            on manufacturing projects for global brands
          </p>
        </FadeIn>

        <FadeIn delay={0.15}>
          <div className="flex items-center justify-center gap-8 sm:gap-12 lg:gap-16 flex-wrap">
            {brands.map((b) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={b.slug}
                src={`/logos/${b.slug}.svg`}
                alt={b.name}
                className="h-8 lg:h-10 w-auto opacity-60 hover:opacity-100 transition-opacity duration-300"
              />
            ))}
          </div>
        </FadeIn>

        <FadeIn delay={0.3}>
          <p className="text-center text-xs text-text-secondary/70 mt-8 max-w-2xl mx-auto leading-relaxed">
            Logos represent global brands whose manufacturing quality Alex managed during
            11 years at BYD (2013–2019), not current PearlGate engagements. Trademarks are
            property of their respective owners.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
