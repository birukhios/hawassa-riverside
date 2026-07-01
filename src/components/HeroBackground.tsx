"use client";

import { useEffect, useState } from "react";
import { asset } from "@/lib/asset";

// Cross-fading panoramic lakeside renders behind the hero, with a black tint.
const SLIDES = [
  "/hawassa-2.jpg",
  "/hawassa-3.jpg",
  "/hawassa-5.jpg",
  "/hawassa-6.jpg",
  "/hawassa-4.jpg",
];

const INTERVAL_MS = 5000;

export default function HeroBackground() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(
      () => setActive((i) => (i + 1) % SLIDES.length),
      INTERVAL_MS
    );
    return () => clearInterval(id);
  }, []);

  return (
    <div
      aria-hidden="true"
      style={{ position: "absolute", inset: 0, overflow: "hidden" }}
    >
      {SLIDES.map((src, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={src}
          src={asset(src)}
          alt=""
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
            opacity: i === active ? 1 : 0,
            transform: i === active ? "scale(1.05)" : "scale(1)",
            transition: "opacity 1.6s ease-in-out, transform 6s ease-out",
          }}
        />
      ))}
      {/* black tint */}
      <div
        style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.58)" }}
      />
    </div>
  );
}
