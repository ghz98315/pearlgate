"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { FadeIn } from "./Animations";

const faqs = [
  { question: "Is the inquiry really free?", answer: "Yes. Completely free, no strings attached. You submit your requirements, we match you with verified factories — no payment needed at any point." },
  { question: "How is this different from Alibaba?", answer: "On Alibaba, you're sorting through thousands of unverified listings yourself. Here, every factory has been personally visited and vetted by someone with 10+ years of factory management experience. We do the filtering for you and only show factories we'd trust with our own orders." },
  { question: "What's the minimum order?", answer: "Depends on the product, but we work with factories that accept orders as low as $500." },
  { question: "What if quality doesn't match?", answer: "We inspect every order before shipping. If something's wrong, we negotiate with the factory before it leaves China." },
  { question: "How long does the matching process take?", answer: "Typically 48 hours from inquiry to receiving 2-3 verified factory options with comparative quotes." },
  { question: "Do you only source from Guangdong?", answer: "These are our core areas with the deepest factory relationships. For other regions or products, we can still help — just ask." },
  { question: "What categories do you cover?", answer: "Hardware tools and molds are our strongest areas. We're expanding coverage — submit an inquiry and we'll let you know if we can help." },
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
