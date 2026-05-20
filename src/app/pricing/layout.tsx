import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing — PearlGate | Factory Database & Sourcing Agent Plans",
  description: "Simple, transparent pricing. Pro database access from $79/mo or full-service sourcing agent at 10-12% commission. Cancel anytime.",
};

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return children;
}
