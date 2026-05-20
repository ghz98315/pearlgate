export default function SocialProof() {
  const countries = [
    { name: "United States", flag: "🇺🇸" },
    { name: "United Kingdom", flag: "🇬🇧" },
    { name: "Australia", flag: "🇦🇺" },
    { name: "Germany", flag: "🇩🇪" },
    { name: "Canada", flag: "🇨🇦" },
  ];

  return (
    <section className="py-5 bg-gray-50 border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-wrap items-center justify-center gap-3 text-sm text-text-secondary">
        <span className="font-medium text-navy-900">Trusted by buyers from</span>
        <div className="flex items-center gap-3">
          {countries.map((c) => (
            <span key={c.name} className="flex items-center gap-1 bg-white border border-gray-200 rounded-full px-3 py-1 text-xs">
              <span>{c.flag}</span>
              {c.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
