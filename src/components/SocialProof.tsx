import Image from "next/image";

const countries = [
  { name: "United States", code: "us" },
  { name: "United Kingdom", code: "gb" },
  { name: "Germany", code: "de" },
  { name: "Australia", code: "au" },
  { name: "Canada", code: "ca" },
  { name: "Netherlands", code: "nl" },
];

export default function SocialProof() {
  return (
    <section className="py-12 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <p className="text-3xl font-bold text-navy-900 font-[family-name:var(--font-serif)]">
              20+
            </p>
            <p className="mt-1 text-sm text-text-secondary">
              EVSE manufacturers & charging cable OEMs verified in Pearl River Delta since 2023
            </p>
          </div>
          <div>
            <p className="text-3xl font-bold text-navy-900 font-[family-name:var(--font-serif)]">
              $500K+
            </p>
            <p className="mt-1 text-sm text-text-secondary">
              In fake UL 2594/IEC 62196 certifications prevented for EVSE buyers
            </p>
          </div>
          <div>
            <p className="text-3xl font-bold text-navy-900 font-[family-name:var(--font-serif)]">
              11 Years
            </p>
            <p className="mt-1 text-sm text-text-secondary">
              BYD charging infrastructure experience (Quality Manager, 2013-2019)
            </p>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-gray-200">
          <p className="text-center text-sm font-semibold text-gray-600 mb-4">
            Trusted by buyers from
          </p>
          <div className="flex items-center justify-center gap-6 flex-wrap">
            {countries.map((c) => (
              <div key={c.code} className="flex items-center gap-2">
                <Image
                  src={`https://flagcdn.com/w40/${c.code}.png`}
                  alt={c.name}
                  width={24}
                  height={16}
                  className="rounded-sm shadow-sm"
                />
                <span className="text-xs font-medium text-gray-600">{c.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
