"use client";

import { X, Check, AlertTriangle } from "lucide-react";
import { FadeIn } from "./Animations";

const comparisonData = [
  {
    criterion: "EV Charging Expertise",
    alibaba: { status: "no", text: "General platform — thousands of categories" },
    tradingCompany: { status: "no", text: "Source everything — no specialization" },
    pearlgate: { status: "yes", text: "Only EV charging — cables, connectors, chargers" },
  },
  {
    criterion: "Certification Verification",
    alibaba: { status: "no", text: "Can't verify — just photos from suppliers" },
    tradingCompany: { status: "warning", text: "Accept certificates at face value" },
    pearlgate: { status: "yes", text: "Verify in UL/TUV databases + check test reports" },
  },
  {
    criterion: "Factory Experience",
    alibaba: { status: "no", text: "No factory background" },
    tradingCompany: { status: "no", text: "Sales/trading background only" },
    pearlgate: { status: "yes", text: "11 years BYD factory manager — production & QC" },
  },
  {
    criterion: "Technical Knowledge",
    alibaba: { status: "no", text: "Platform can't provide technical guidance" },
    tradingCompany: { status: "no", text: "Limited understanding of specs/standards" },
    pearlgate: { status: "yes", text: "Read test reports, check conductor sizing, verify standards compliance" },
  },
  {
    criterion: "Risk",
    alibaba: { status: "warning", text: "You bear all risk — no pre-verification" },
    tradingCompany: { status: "warning", text: "Partial risk transfer — still your problem if supplier fails" },
    pearlgate: { status: "yes", text: "I verify before recommending — only work with proven factories" },
  },
];

export default function WhyChooseMe() {
  return (
    <section className="py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <FadeIn>
          <p className="text-sm font-semibold text-orange-600 uppercase tracking-wider text-center mb-3">
            Why Choose Me
          </p>
          <h2 className="text-3xl lg:text-4xl font-bold text-center font-[family-name:var(--font-serif)]">
            How I'm Different From The Alternatives
          </h2>
          <p className="mt-3 text-text-secondary text-center text-lg max-w-2xl mx-auto">
            Not another middleman. A former factory manager who knows what to verify.
          </p>
        </FadeIn>

        <div className="mt-16 overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-4 px-4 font-semibold text-gray-900 text-base min-w-[180px]">
                  {/* Empty header for criteria column */}
                </th>
                <th className="py-4 px-4 text-center">
                  <div className="font-semibold text-base text-gray-600">Alibaba Direct</div>
                </th>
                <th className="py-4 px-4 text-center">
                  <div className="font-semibold text-base text-gray-600">Trading Company</div>
                </th>
                <th className="py-4 px-4 text-center bg-orange-50 rounded-t-xl">
                  <div className="font-bold text-base text-orange-600">PearlGate (Me)</div>
                </th>
              </tr>
            </thead>
            <tbody>
              {comparisonData.map((row, idx) => (
                <tr key={row.criterion} className={idx % 2 === 0 ? "bg-gray-50/50" : "bg-white"}>
                  <td className="py-4 px-4 font-semibold text-sm text-gray-900">
                    {row.criterion}
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex flex-col items-center gap-2">
                      {row.alibaba.status === "no" && (
                        <X size={20} className="text-red-500 flex-shrink-0" />
                      )}
                      {row.alibaba.status === "warning" && (
                        <AlertTriangle size={20} className="text-yellow-500 flex-shrink-0" />
                      )}
                      <span className="text-xs text-gray-600 text-center">
                        {row.alibaba.text}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex flex-col items-center gap-2">
                      {row.tradingCompany.status === "no" && (
                        <X size={20} className="text-red-500 flex-shrink-0" />
                      )}
                      {row.tradingCompany.status === "warning" && (
                        <AlertTriangle size={20} className="text-yellow-500 flex-shrink-0" />
                      )}
                      <span className="text-xs text-gray-600 text-center">
                        {row.tradingCompany.text}
                      </span>
                    </div>
                  </td>
                  <td className={`py-4 px-4 ${idx % 2 === 0 ? "bg-orange-50/80" : "bg-orange-50/50"}`}>
                    <div className="flex flex-col items-center gap-2">
                      <Check size={20} className="text-green-600 flex-shrink-0" />
                      <span className="text-xs text-gray-800 text-center font-medium">
                        {row.pearlgate.text}
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <FadeIn delay={0.4}>
          <div className="mt-12 p-8 rounded-2xl bg-gradient-to-br from-orange-50 to-orange-100 border border-orange-200 text-center">
            <p className="text-lg font-semibold text-gray-900">
              I don't take commission from factories. I charge buyers a transparent verification fee.
            </p>
            <p className="mt-2 text-sm text-gray-700">
              This means my incentive is finding you the right factory — not the one that pays me the highest commission.
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
