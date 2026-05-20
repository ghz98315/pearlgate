"use client";

import dynamic from "next/dynamic";

const InteractiveMap = dynamic(() => import("@/components/InteractiveMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[400px] lg:h-[500px] rounded-2xl bg-[#f0f4f8] flex items-center justify-center">
      <span className="text-[#5A6B7A] text-sm">Loading map...</span>
    </div>
  ),
});

export default function MapSection() {
  return <InteractiveMap />;
}
