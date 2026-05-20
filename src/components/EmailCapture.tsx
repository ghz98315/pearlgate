"use client";

import { useState } from "react";
import { Mail, CheckCircle } from "lucide-react";

interface EmailCaptureProps {
  title?: string;
  subtitle?: string;
  source: string;
}

export default function EmailCapture({
  title = "Get weekly sourcing tips + new factory alerts",
  subtitle = "Join 100+ buyers who source smarter from China.",
  source,
}: EmailCaptureProps) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    try {
      await fetch("/api/emails", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source }),
      });
    } catch {
      // silently fail for now
    }

    setSubmitted(true);
    setEmail("");
  };

  if (submitted) {
    return (
      <div className="p-8 rounded-2xl bg-gray-50 border border-border text-center">
        <CheckCircle size={32} className="text-green-500 mx-auto" />
        <p className="mt-3 font-semibold">You&apos;re in!</p>
        <p className="mt-1 text-text-secondary text-sm">We&apos;ll send you the good stuff. No spam, ever.</p>
      </div>
    );
  }

  return (
    <div className="p-8 rounded-2xl bg-gray-50 border border-border text-center">
      <h3 className="text-lg font-bold font-[family-name:var(--font-serif)]">{title}</h3>
      <p className="mt-2 text-text-secondary text-sm">{subtitle}</p>
      <form onSubmit={handleSubmit} className="mt-4 flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
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
          Subscribe Free
        </button>
      </form>
      <p className="mt-3 text-xs text-text-secondary">No spam. Unsubscribe anytime.</p>
    </div>
  );
}
