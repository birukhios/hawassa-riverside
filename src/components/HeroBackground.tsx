// Hawassa-themed gradient hero background (lake blue -> teal -> green) with
// soft radial glows for depth.
export default function HeroBackground() {
  return (
    <div
      aria-hidden="true"
      style={{ position: "absolute", inset: 0, overflow: "hidden" }}
    >
      {/* base diagonal gradient */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(135deg, #07223b 0%, #0b3d63 38%, #0e6b6b 72%, #12805a 100%)",
        }}
      />
      {/* soft radial glows */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(60% 50% at 75% 18%, rgba(56,189,248,0.35) 0%, rgba(56,189,248,0) 60%), radial-gradient(55% 45% at 18% 85%, rgba(16,185,129,0.32) 0%, rgba(16,185,129,0) 60%)",
        }}
      />
    </div>
  );
}
