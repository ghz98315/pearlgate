"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { FadeIn } from "./Animations";

const faqs = [
  { question: "Is the EVSE manufacturer matching really free?", answer: "Yes. Completely free, no strings attached. You submit your charging equipment specs, we match you with UL/IEC-certified OEMs — no payment needed at any point." },
  { question: "How is this different from Alibaba for EVSE sourcing?", answer: "On Alibaba, you're sorting through thousands of unverified EVSE listings yourself. Here, every charging equipment OEM has been personally audited by a former BYD quality manager with 11+ years of charging infrastructure experience. We verify UL 2251/2594 and IEC 62196 certifications, check temperature rise test data, and only recommend OEMs we'd trust with our own charging network deployments." },
  { question: "What's the minimum order for charging cables?", answer: "Depends on the connector type and certification. CCS1/CCS2 cables typically start at 500 units MOQ. NACS cables may require 1000 units. Portable EVSE can be as low as 500 units. We work with OEMs that understand early-stage charging network needs." },
  { question: "What if the EVSE quality doesn't match certification specs?", answer: "We inspect every charging equipment order before shipping. If connector contact resistance, temperature rise, or insulation resistance doesn't match UL/IEC test data, we negotiate with the OEM before it leaves China. We check what matters: not just visual QC, but electrical testing." },
  { question: "How long does the EVSE OEM matching process take?", answer: "Typically 48 hours from inquiry to receiving 2-3 UL/IEC-certified charging equipment OEM options with comparative quotes. We verify their CCS1/CCS2/NACS connector capabilities, liquid-cooled cable production, and certification compliance during this time." },
  { question: "Do you only source EVSE from Pearl River Delta?", answer: "Pearl River Delta (Dongguan, Shenzhen, Guangzhou) is where 70%+ of global EV charging equipment is manufactured. This is our core focus with the deepest charging cable OEM relationships and certification lab access. For DC fast charging infrastructure needs outside this region, we can still help — just ask." },
  { question: "What charging standards do you cover?", answer: "We specialize in CCS1 (North America), CCS2 (Europe/Global), NACS (Tesla/SAE J3400), Type 1 (J1772), Type 2 (Mennekes), and portable EVSE. We focus exclusively on EV charging equipment — not consumer electronics or general cables. If it's automotive-grade charging infrastructure, we can help." },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-24 lg:py-32 bg-white">
      <div className="max-w-3xl mx-auto px-6 lg:px-12">
        <FadeIn>
          <h2 className="text-3xl lg:text-4xl font-bold text-center font-[family-name:var(--font-serif)]">
            Frequently asked questions
          </h2>
          <p className="mt-4 text-text-secondary text-center text-lg">
            Everything you need to know before getting started.
          </p>
        </FadeIn>

        <div className="mt-12 space-y-3">
          {faqs.map((faq, index) => (
            <FadeIn key={faq.question} delay={index * 0.05}>
              <div className="border border-border rounded-xl overflow-hidden hover:border-navy-700/30 transition-colors">
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50/50 transition-colors"
                >
                  <span className="font-medium text-sm lg:text-base pr-4">
                    {faq.question}
                  </span>
                  <motion.div
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown size={20} className="shrink-0 text-text-secondary" />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 text-text-secondary text-sm leading-relaxed">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
