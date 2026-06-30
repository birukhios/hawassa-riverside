"use client";

import { useState, type ReactNode } from "react";
import { asset } from "@/lib/asset";

// Renders a logo image once it loads; until then (or if the file is missing)
// shows the fallback — so a not-yet-added /logos file never breaks the UI.
export default function LogoImg({
  src,
  alt,
  className = "",
  fallback = null,
}: {
  src: string;
  alt: string;
  className?: string;
  fallback?: ReactNode;
}) {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={asset(src)}
        alt={alt}
        onLoad={() => setLoaded(true)}
        onError={() => setLoaded(false)}
        style={{ display: loaded ? "block" : "none" }}
        className={className}
      />
      {!loaded && fallback}
    </>
  );
}
