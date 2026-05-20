export default function SocialProof() {
  const countries = [
    { name: "United States", flag: "🇺🇸" },
    { name: "United Kingdom", flag: "🇬🇧" },
    { name: "Australia", flag: "🇦🇺" },
    { name: "Germany", flag: "🇩🇪" },
    { name: "Canada", flag: "🇨🇦" },
  ];

  return (
    <section className="py-8 bg-gray-50 border-y border-gray-200">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-wrap items-center justify-center gap-4 text-base">
        <span className="font-semibold text-navy-900">Trusted by buyers from</span>
        <div className="flex items-center gap-3">
          {countries.map((c) => (
            <span key={c.name} className="flex items-center gap-1.5 bg-white border border-gray-200 rounded-full px-4 py-2 text-sm shadow-sm">
              <span className="text-lg">{c.flag}</span>
              {c.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
