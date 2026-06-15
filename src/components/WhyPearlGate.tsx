"use client";

import Link from "next/link";
import Image from "next/image";
import { X, Check, AlertTriangle, ExternalLink } from "lucide-react";
import { FadeIn, Float, Counter } from "./Animations";

const comparisonData = [
  {
    criterion: "EVSE & Connector Standards Expertise",
    alibaba: { status: "no", text: "General platform — thousands of categories" },
    tradingCompany: {
      status: "no",
      text: "Source everything — no charging infrastructure specialization",
    },
    pearlgate: {
      status: "yes",
      text: "Only EVSE & charging cables — CCS1/CCS2/NACS/Type2 specialist",
    },
  },
  {
    criterion: "UL 2251/2594 & IEC 62196 Verification",
    alibaba: { status: "no", text: "Can't verify — just photos from EVSE sellers" },
    tradingCompany: {
      status: "warning",
      text: "Accept charging equipment certificates at face value",
    },
    pearlgate: {
      status: "yes",
      text: "Verify in UL/TUV databases + check temperature rise test reports",
    },
  },
  {
    criterion: "Charging Infrastructure Experience",
    alibaba: { status: "no", text: "No factory background" },
    tradingCompany: { status: "no", text: "Sales/trading background only" },
    pearlgate: {
      status: "yes",
      text: "12 years BYD manufacturing background, now specialising in EVSE production & QC",
    },
  },
  {
    criterion: "Technical Knowledge (Connector Standards)",
    alibaba: { status: "no", text: "Platform can't provide EVSE technical guidance" },
    tradingCompany: {
      status: "no",
      text: "Limited understanding of CCS/NACS specs/IEC standards",
    },
    pearlgate: {
      status: "yes",
      text: "Read UL/IEC test reports, verify conductor sizing, check contact resistance data",
    },
  },
  {
    criterion: "Risk",
    alibaba: { status: "warning", text: "You bear all risk — no EVSE pre-verification" },
    tradingCompany: {
      status: "warning",
      text: "Partial risk transfer — still your problem if OEM certification fails",
    },
    pearlgate: {
      status: "yes",
      text: "I verify UL/IEC compliance before recommending — only work with certified OEMs",
    },
  },
];

export default function WhyPearlGate() {
  return (
    <section className="bg-white">
      {/* ============ A. Founder anchor ============ */}
      <div className="py-20 lg:py-28 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-10 lg:gap-16">
            <FadeIn direction="left">
              <Float>
                <div className="relative w-44 h-44 lg:w-56 lg:h-56 shrink-0">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-navy-700 to-orange-500 opacity-20" />
                  <div className="absolute inset-2 rounded-full overflow-hidden bg-navy-900/10">
                    <Image
                      src="/alex-guan-profile.jpg"
                      alt="Alex Guan — Former BYD Quality Manager"
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 176px, 224px"
                    />
                  </div>
                  <div className="absolute -bottom-2 -right-2 bg-white rounded-full px-3 py-1 shadow-md border border-border">
                    <span className="text-xs font-medium text-navy-700">12yr BYD</span>
                  </div>
                </div>
              </Float>
            </FadeIn>

            <FadeIn direction="right" delay={0.2}>
              <div>
                <h2 className="text-2xl lg:text-3xl font-bold font-[family-name:var(--font-serif)]">
                  &ldquo;I&apos;ve been inside hundreds of factories — now I go in for you.&rdquo;
                </h2>
                <p className="mt-4 text-text-secondary leading-relaxed">
                  12 years at BYD as NPI Engineer → Engineering Manager → Quality Manager.
                  Managed manufacturing quality for Dell, Toshiba, Lenovo, Huawei, Siemens, and
                  ASUS — 30-40 projects a year — before specialising in EVSE and charging-cable
                  sourcing for overseas buyers.
                </p>
                <p className="mt-3 text-text-secondary leading-relaxed">
                  Based in Shenzhen, China&apos;s EV charging manufacturing hub.
                </p>
                <div className="mt-6 flex flex-wrap gap-3 text-sm text-text-secondary">
                  <span className="bg-gray-50 px-3 py-1.5 rounded-full border border-border">
                    <Counter target={12} suffix="+" /> Years at BYD
                  </span>
                  <span className="bg-gray-50 px-3 py-1.5 rounded-full border border-border">
                    EV Charging OEM Support
                  </span>
                  <span className="bg-gray-50 px-3 py-1.5 rounded-full border border-border">
                    Factory Audit &amp; QC Expertise
                  </span>
                  <span className="bg-gray-50 px-3 py-1.5 rounded-full border border-border inline-flex items-center gap-1">
                    <span aria-hidden="true">📍</span> Shenzhen, China
                  </span>
                </div>
                <div className="mt-6 flex items-center gap-4">
                  <Link
                    href="/about"
                    className="text-orange-500 hover:text-orange-600 font-semibold text-sm transition-colors"
                  >
                    Read my full story →
                  </Link>
                  <a
                    href="https://www.linkedin.com/in/alexguan-evcharging"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-text-secondary hover:text-navy-700 text-sm transition-colors"
                  >
                    LinkedIn <ExternalLink size={14} />
                  </a>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>

      {/* ============ B. Differentiation table ============ */}
      <div className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          {/* EVSE banner header — image-as-backdrop for the H2 */}
          <FadeIn>
            <div className="relative overflow-hidden rounded-2xl mb-12 lg:mb-16">
              <div className="relative h-44 lg:h-56">
                <Image
                  src="https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=1600&q=75"
                  alt="EV charging infrastructure"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1280px) 100vw, 1280px"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-navy-900/95 via-navy-900/80 to-navy-900/30" />
                <div className="absolute inset-0 flex flex-col justify-center px-6 lg:px-12">
                  <p className="text-orange-400 text-xs lg:text-sm font-semibold uppercase tracking-wider">
                    Why Choose Me
                  </p>
                  <h2 className="mt-2 text-2xl lg:text-4xl font-bold text-white font-[family-name:var(--font-serif)] max-w-2xl">
                    How I&apos;m Different From EVSE Sourcing Alternatives
                  </h2>
                  <p className="mt-3 text-white/75 text-sm lg:text-base max-w-xl">
                    Not another middleman. A former BYD quality manager who reads UL/IEC test
                    reports, not just product photos.
                  </p>
                </div>
              </div>
            </div>
          </FadeIn>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-4 px-4 font-semibold text-gray-900 text-base min-w-[180px]" />
                  <th className="py-4 px-4 text-center">
                    <div className="font-semibold text-base text-gray-600">Alibaba EVSE Listings</div>
                  </th>
                  <th className="py-4 px-4 text-center">
                    <div className="font-semibold text-base text-gray-600">Trading Company</div>
                  </th>
                  <th className="py-4 px-4 text-center bg-orange-50 rounded-t-xl">
                    <div className="font-bold text-base text-orange-600">
                      Charging Infrastructure Specialist
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((row, idx) => (
                  <tr
                    key={row.criterion}
                    className={idx % 2 === 0 ? "bg-gray-50/50" : "bg-white"}
                  >
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
                        <span className="text-xs text-gray-600 text-center">{row.alibaba.text}</span>
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

          <FadeIn delay={0.3}>
            <div className="mt-12 p-8 rounded-2xl bg-gradient-to-br from-orange-50 to-orange-100 border border-orange-200 text-center">
              <p className="text-lg font-semibold text-gray-900">
                I don&apos;t take commission from EVSE manufacturers. I charge buyers a transparent
                verification fee.
              </p>
              <p className="mt-2 text-sm text-gray-700">
                This means my incentive is finding you the right UL/IEC-certified OEM — not the one
                that pays me the highest commission.
              </p>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
