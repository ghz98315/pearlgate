"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { FadeIn } from "./Animations";

const faqs = [
  { question: "Is the first quote really free?", answer: "Yes. No commitment, no hidden fees. You only pay when you decide to place an order." },
  { question: "What's the minimum order?", answer: "Depends on the product, but I work with factories that accept orders as low as $500." },
  { question: "How do I pay? Is it safe?", answer: "PayPal or bank transfer. PayPal gives you 180-day buyer protection, so your money is safe." },
  { question: "What if quality doesn't match?", answer: "I inspect every order before shipping. If something's wrong, I negotiate with the factory before it leaves China." },
  { question: "How long does the whole process take?", answer: "Typically 2-4 weeks from quote to delivery, depending on product complexity and shipping method." },
  { question: "Do you only source from Guangdong?", answer: "These are my core areas with the deepest factory relationships. For other regions or products, I can still help — just ask." },
  { question: "Do you only source the categories listed?", answer: "Those are my strongest areas, but I can source most manufactured products from the Pearl River Delta. Just ask." },
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
