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
    <section className="py-10 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
        <p className="text-lg font-bold text-navy-900 mb-6 font-[family-name:var(--font-serif)]">
          Trusted by buyers from around the world
        </p>
        <div className="flex items-center justify-center gap-8 flex-wrap">
          {countries.map((c) => (
            <div key={c.code} className="flex items-center gap-2.5">
              <Image
                src={`https://flagcdn.com/w40/${c.code}.png`}
                alt={c.name}
                width={28}
                height={20}
                className="rounded-sm shadow-sm"
              />
              <span className="text-sm font-medium text-navy-900">{c.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
