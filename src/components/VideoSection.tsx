import { asset } from "@/lib/asset";

export default function VideoSection() {
  return (
    <section
      id="film"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black"
    >
      {/* Zoomed video fills the screen (crops the source's baked-in letterbox) */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        style={{ transform: "scale(2.3)" }}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
      >
        <source src={asset("/riverside.mp4")} type="video/mp4" />
      </video>

      {/* Cinematic overlays for depth + legibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/25 to-black/75 pointer-events-none" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 35%, rgba(0,0,0,0.55) 100%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl">
        <p className="animate-fade-up text-[13px] font-medium uppercase tracking-[0.25em] text-sky-300/90 mb-6">
          In Motion
        </p>
        <h2 className="animate-fade-up delay-100 text-5xl sm:text-7xl lg:text-[84px] font-semibold text-white leading-[1.04] text-balance drop-shadow-[0_2px_30px_rgba(0,0,0,0.5)]">
          See it come to life.
        </h2>
        <p className="animate-fade-up delay-200 mt-6 text-xl sm:text-2xl text-white/85 max-w-2xl mx-auto leading-snug text-balance drop-shadow-[0_1px_16px_rgba(0,0,0,0.6)]">
          A living glimpse of the Hawassa Riverside — the lakefront park we&apos;re
          building together.
        </p>
        <div className="animate-fade-up delay-300 mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href="#donate"
            className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-white text-black text-[17px] font-medium hover:bg-white/90 transition-all hover:scale-[1.02]"
          >
            Be part of it
          </a>
          <a
            href="#build"
            className="group inline-flex items-center justify-center gap-1 text-[17px] font-medium text-white hover:text-white/80 transition-colors"
          >
            Explore the plan
            <span className="transition-transform group-hover:translate-x-0.5">
              ›
            </span>
          </a>
        </div>
      </div>

      {/* Live caption chip */}
      <div className="absolute bottom-6 left-6 z-10 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-white text-sm font-medium">
        <span className="relative flex h-2.5 w-2.5">
          <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400" />
        </span>
        Hawassa Riverside · concept film
      </div>
      <div className="absolute bottom-6 right-6 z-10 hidden sm:block text-white/60 text-xs uppercase tracking-[0.2em]">
        Lake Hawassa
      </div>
    </section>
  );
}
