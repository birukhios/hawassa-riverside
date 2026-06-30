import { asset } from "@/lib/asset";

// Single static hero background image.
const HERO_IMAGE = "/hawassa-1.jpeg";

export default function HeroBackground() {
  return (
    <div
      aria-hidden="true"
      style={{ position: "absolute", inset: 0, overflow: "hidden" }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={asset(HERO_IMAGE)}
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
        }}
      />
    </div>
  );
}
