// Lightweight inline-SVG/wordmark approximations of payment brands so the
// checkout reads like a real gateway without bundling trademarked assets.

export function VisaLogo({ className = "" }: { className?: string }) {
  return (
    <span
      className={`font-[Arial] italic font-bold tracking-tight ${className}`}
      style={{ color: "#1a1f71" }}
    >
      VISA
    </span>
  );
}

export function MastercardLogo({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size * 0.62} viewBox="0 0 48 30" aria-label="Mastercard">
      <circle cx="18" cy="15" r="13" fill="#eb001b" />
      <circle cx="30" cy="15" r="13" fill="#f79e1b" />
      <path
        d="M24 5.5a13 13 0 0 1 0 19 13 13 0 0 1 0-19z"
        fill="#ff5f00"
      />
    </svg>
  );
}

export function AmexLogo({ className = "" }: { className?: string }) {
  return (
    <span
      className={`rounded px-1.5 py-0.5 text-[10px] font-extrabold text-white ${className}`}
      style={{ backgroundColor: "#2e77bb" }}
    >
      AMEX
    </span>
  );
}

// Generic brand chip used for local wallets / banks
export function BrandChip({
  label,
  color,
  active = false,
}: {
  label: string;
  color: string;
  active?: boolean;
}) {
  return (
    <span
      className="text-[13px] font-extrabold leading-tight text-center px-1"
      style={{ color: active ? color : color }}
    >
      {label}
    </span>
  );
}
