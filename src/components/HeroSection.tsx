import { ArrowDown } from "lucide-react";
import HeroBackground from "./HeroBackground";
import { asset } from "@/lib/asset";

export default function HeroSection() {
  return (
    <section
      id="top"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#07223b]"
    >
      {/* Gradient background */}
      <HeroBackground />

      {/* Subtle legibility overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.25), rgba(0,0,0,0) 45%, rgba(0,0,0,0.35))",
          pointerEvents: "none",
        }}
      />

      <div className="relative max-w-4xl mx-auto px-6 text-center pt-16 pb-20">
        <p className="animate-fade-up delay-100 text-[13px] font-medium uppercase tracking-[0.2em] text-sky-300/90 mb-5">
          A Sidama Bank Initiative
        </p>

        <h1 className="animate-fade-up delay-100 text-5xl sm:text-6xl lg:text-[68px] font-semibold text-white leading-[1.04] text-balance drop-shadow-[0_2px_24px_rgba(0,0,0,0.4)]">
          Let&apos;s build the
          <br />
          Hawassa Lakeside.
        </h1>

        <p className="animate-fade-up delay-200 mt-5 text-lg sm:text-xl text-white/85 max-w-2xl mx-auto leading-snug text-balance drop-shadow-[0_1px_14px_rgba(0,0,0,0.45)]">
          A lakefront park for every family — promenades, playgrounds, water
          attractions and gathering spaces along the shores of Lake Hawassa.
        </p>

        {/* Video — clean frame. The source render is a small ~2.2:1 rectangle
            centered inside big black borders (≈37/38% top/bottom, ≈34.5% sides).
            The box matches that aspect and the video is oversized + centered so
            only the render fills it — no black on any side, no frame/caption. */}
        <div className="animate-fade-up delay-300 relative mt-8 mx-auto max-w-2xl rounded-[20px] overflow-hidden aspect-[11/5]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <video
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[440%] w-auto max-w-none"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-hidden="true"
          >
            <source src={asset("/riverside.mp4")} type="video/mp4" />
          </video>
        </div>

        {/* CTAs */}
        <div className="animate-fade-up delay-400 mt-8 flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href="#donate"
            className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-lake text-white text-[17px] font-medium hover:bg-lake-deep transition-all hover:scale-[1.02] shadow-lg"
          >
            Donate with AfroPay
          </a>
          <a
            href="#impact"
            className="group inline-flex items-center justify-center gap-1 text-[17px] font-medium text-white hover:text-white/80 transition-colors"
          >
            See the impact
            <span className="transition-transform group-hover:translate-x-0.5">
              ›
            </span>
          </a>
        </div>

        {/* Co-brand lockup — below the CTA */}
        <div className="animate-fade-up delay-400 mt-8 flex items-center justify-center gap-3 drop-shadow-lg">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={asset("/logos/sidamabank-white.png")}
            alt="Sidama Bank"
            className="h-10 sm:h-12 w-auto"
          />
          <span className="w-px h-8 bg-white/25" />
          <span className="flex flex-col leading-none gap-1 text-left">
            <span className="text-[9px] font-medium uppercase tracking-wider text-white/60">
              Powered by
            </span>
            {/* full AfroPay logo, ~half the Sidama height */}
            <span className="inline-flex items-center gap-1">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={asset("/logos/afropay.png")}
                alt="AfroPay"
                className="h-4 sm:h-5 w-auto"
              />
              <span className="text-[15px] sm:text-[18px] font-extrabold lowercase tracking-tight leading-none text-white">
                afropay
              </span>
            </span>
          </span>
        </div>
      </div>

      <a
        href="#progress"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/60 hover:text-white transition-colors"
        aria-label="Scroll down"
      >
        <ArrowDown className="w-5 h-5 animate-bounce" />
      </a>
    </section>
  );
}
