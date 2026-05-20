export default function Logo({ size = "default" }: { size?: "default" | "large" }) {
  const iconSize = size === "large" ? "w-10 h-10" : "w-9 h-9";
  const textSize = size === "large" ? "text-2xl" : "text-xl";
  const letterSize = size === "large" ? "text-base" : "text-sm";

  return (
    <div className="flex items-center gap-2.5">
      {/* Icon mark — navy square with arch + P */}
      <div className={`${iconSize} rounded-lg bg-navy-900 border border-white/10 flex items-center justify-center relative overflow-hidden`}>
        {/* Arch shape */}
        <svg viewBox="0 0 28 28" fill="none" className="absolute inset-0 w-full h-full">
          <path
            d="M8 22 V12 C8 8 10.5 5 14 5 C17.5 5 20 8 20 12 V22"
            stroke="#F59E0B"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
          />
          <line x1="8" y1="22" x2="20" y2="22" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round" />
        </svg>
        <span className={`relative ${letterSize} font-bold text-orange-500 font-[family-name:var(--font-serif)] mt-1`}>
          P
        </span>
      </div>
      {/* Text */}
      <span className={`${textSize} font-bold tracking-tight font-[family-name:var(--font-serif)]`}>
        <span className="text-white">Pearl</span>
        <span className="text-orange-500">Gate</span>
      </span>
    </div>
  );
}
