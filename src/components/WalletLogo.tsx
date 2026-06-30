"use client";

import { useState } from "react";
import type { Brand } from "@/lib/payment-options";
import { asset } from "@/lib/asset";

// Renders the real brand logo image directly (so it shows immediately, even
// server-rendered). If the file is missing it falls back to a styled wordmark.
export default function WalletLogo({
  brand,
  className = "",
}: {
  brand: Brand;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);

  if (brand.logo && !failed) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={asset(brand.logo)}
        alt={brand.name}
        onError={() => setFailed(true)}
        className="max-h-9 max-w-[85%] object-contain"
      />
    );
  }

  return (
    <span
      className={`text-[13px] font-extrabold leading-tight text-center px-1 ${className}`}
      style={{ color: brand.color }}
    >
      {brand.label}
    </span>
  );
}
