"use client";

import Link from "next/link";
import Image from "next/image";
import { MapPin } from "lucide-react";
import { FadeIn, Stagger, StaggerItem } from "./Animations";

const industries = [
  {
    title: "Knives & Hand Tools",
    location: "Yangjiang, Guangdong",
    products: "Kitchen knives · Garden tools · Hand tools · Scissors",
    badge: "World's largest knife export base — 60% of China's knife exports",
    cta: "Source Tools",
    image: "https://images.unsplash.com/photo-1593618998160-e34014e67546?w=800&q=80",
  },
  {
    title: "Precision Parts & OEM",
    location: "Dongguan / Shenzhen",
    products: "CNC machining · Stamping · Molds · Precision components",
    badge: "Global precision manufacturing hub for OEM/ODM",
    cta: "Source Parts",
    image: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=800&q=80",
  },
  {
    title: "Aluminum & Building Hardware",
    location: "Foshan, Guangdong",
    products: "Aluminum extrusion · Stainless steel fittings · Architectural hardware",
    badge: "China's building materials capital — direct factory access",
    cta: "Source Hardware",
    image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebb6571?w=800&q=80",
  },
  {
    title: "Workwear & Corporate Uniforms",
    location: "Guangzhou / Humen",
    products: "Work uniforms · Safety wear · Corporate apparel · Custom garments",
    badge: "B2B garment hub — flexible MOQ for custom orders",
    cta: "Source Apparel",
    image: "https://images.unsplash.com/photo-1558171813-4c088753af8f?w=800&q=80",
  },
];

export default function Industries() {
  return (
    <section className="py-24 lg:py-32 bg-warm-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <FadeIn>
          <h2 className="text-3xl lg:text-4xl font-bold text-center font-[family-name:var(--font-serif)]">
            What we source
          </h2>
          <p className="mt-4 text-text-secondary text-center text-lg max-w-2xl mx-auto">
            Deep relationships in Guangdong&apos;s strongest industrial clusters.
          </p>
        </FadeIn>

        <Stagger staggerDelay={0.15} className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6">
          {industries.map((item) => (
            <StaggerItem key={item.title}>
              <div className="group relative rounded-2xl overflow-hidden border border-border bg-white hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-900/80 via-navy-900/20 to-transparent" />
                  <div className="absolute bottom-4 left-6">
                    <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                    <p className="mt-1 flex items-center gap-1.5 text-white/70 text-sm">
                      <MapPin size={14} />
                      {item.location}
                    </p>
                  </div>
                </div>

                <div className="p-6">
                  <p className="text-text-secondary leading-relaxed text-sm">
                    {item.products}
                  </p>
                  <p className="mt-3 text-xs text-navy-700 font-medium bg-navy-900/5 inline-block px-3 py-1.5 rounded-full">
                    {item.badge}
                  </p>
                  <div className="mt-4">
                    <Link
                      href="/quote"
                      className="text-orange-500 hover:text-orange-600 font-semibold text-sm transition-colors"
                    >
                      {item.cta} →
                    </Link>
                  </div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
