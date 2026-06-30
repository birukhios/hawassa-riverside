"use client";

import { useEffect, useState } from "react";
import { asset } from "@/lib/asset";

// Slideshow images live in /public. Order = display order.
const SLIDES = [
  "/hawassa-3.jpg", // water slide & pool (sunset)
  "/hawassa-6.jpg", // golden-hour promenade
  "/hawassa-5.jpg", // geodesic dome
  "/hawassa-2.jpg", // waterfront promenade (dusk)
  "/hawassa-4.jpg", // traditional huts / gathering
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
        <img
          key={src}
          src={asset(src)}
          alt=""
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            minWidth: "100%",
            minHeight: "100%",
            objectFit: "cover",
            objectPosition: "center",
            opacity: i === active ? 1 : 0,
            transform: i === active ? "scale(1.06)" : "scale(1)",
            transition:
              "opacity 1.6s ease-in-out, transform 6s ease-out",
          }}
        />
      ))}
    </div>
  );
}
