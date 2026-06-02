"use client";

import { useState, useEffect } from "react";
import { Beaker } from "lucide-react";
import RequestSampleModal from "./RequestSampleModal";

export default function MobileStickyButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show button after scrolling 300px
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <>
      <RequestSampleModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <button
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-6 right-6 z-40 md:hidden flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-4 rounded-full shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
        aria-label="Request sample"
      >
        <Beaker size={20} />
        Request Sample
      </button>
    </>
  );
}
