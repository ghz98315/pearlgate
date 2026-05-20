"use client";

import { useState } from "react";
import { FileDown, CheckCircle, Mail } from "lucide-react";

export default function ChecklistDownload() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    try {
      await fetch("/api/emails", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "checklist_download" }),
      });
    } catch {
      // silently fail
    }

    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="p-8 rounded-2xl bg-green-50 border border-green-200 text-center">
        <CheckCircle size={32} className="text-green-500 mx-auto" />
        <p className="mt-3 font-semibold text-green-900">Check your inbox!</p>
        <p className="mt-1 text-green-700 text-sm">
          We&apos;ve sent the Sourcing Checklist to your email.
        </p>
      </div>
    );
  }

  return (
    <div className="p-8 rounded-2xl bg-gradient-to-br from-navy-900/5 to-orange-500/5 border border-border">
      <div className="flex flex-col md:flex-row items-center gap-6">
        <div className="w-16 h-16 rounded-2xl bg-orange-500/10 flex items-center justify-center shrink-0">
          <FileDown size={28} className="text-orange-500" />
        </div>
        <div className="flex-1 text-center md:text-left">
          <h3 className="text-lg font-bold font-[family-name:var(--font-serif)]">
            Free: 10 Questions to Ask Before Choosing a Chinese Supplier
          </h3>
          <p className="mt-1 text-text-secondary text-sm">
            A practical checklist used by experienced buyers. Avoid the most common mistakes.
          </p>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="mt-5 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" />
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            className="w-full pl-9 pr-4 py-3 rounded-lg border border-border bg-white focus:outline-none focus:ring-2 focus:ring-navy-700/20 focus:border-navy-700 text-sm transition-colors"
          />
        </div>
        <button
          type="submit"
          className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-5 py-3 rounded-lg text-sm transition-all hover:-translate-y-0.5 whitespace-nowrap"
        >
          Download Free PDF
        </button>
      </form>
    </div>
  );
}
