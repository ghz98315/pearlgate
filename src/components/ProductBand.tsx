"use client";

import Image from "next/image";

const products = [
  { src: "https://images.unsplash.com/photo-1586864387789-628af9feed72?w=400&q=80", label: "CNC Parts" },
  { src: "https://images.unsplash.com/photo-1593618998160-e34014e67546?w=400&q=80", label: "Kitchen Knives" },
  { src: "https://images.unsplash.com/photo-1504917595217-d4dc5ebb6571?w=400&q=80", label: "Aluminum Profiles" },
  { src: "https://images.unsplash.com/photo-1558171813-4c088753af8f?w=400&q=80", label: "Workwear" },
  { src: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400&q=80", label: "Factory Floor" },
  { src: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=400&q=80", label: "Precision Molds" },
  { src: "https://images.unsplash.com/photo-1590959651373-a3db0f38a961?w=400&q=80", label: "Hand Tools" },
  { src: "https://images.unsplash.com/photo-1567361808960-dec9cb578182?w=400&q=80", label: "Steel Fittings" },
];

export default function ProductBand() {
  return (
    <section className="py-12 bg-navy-900 overflow-hidden">
      <div className="flex animate-scroll">
        {[...products, ...products].map((item, index) => (
          <div
            key={`${item.label}-${index}`}
            className="relative shrink-0 w-64 h-44 mx-3 rounded-xl overflow-hidden group"
          >
            <Image
              src={item.src}
              alt={item.label}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-900/80 to-transparent" />
            <span className="absolute bottom-3 left-4 text-white text-sm font-medium">
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
