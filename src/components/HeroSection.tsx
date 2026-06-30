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

      <div className="relative max-w-4xl mx-auto px-6 text-center pt-28 pb-20">
        {/* Co-brand lockup */}
        <div className="animate-fade-up inline-flex items-center gap-4 bg-white rounded-2xl pl-5 pr-6 py-3.5 shadow-xl shadow-black/25 mb-8">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={asset("/logos/sidamabank-logo.jpg")}
            alt="Sidama Bank"
            className="h-10 sm:h-12 w-auto"
          />
          <span className="w-px h-8 bg-black/10" />
          <span className="text-sm font-medium text-gray-500 inline-flex items-center gap-2">
            Powered by
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={asset("/logos/afropay.png")}
              alt="AfroPay"
              className="h-7 sm:h-8 w-auto"
            />
          </span>
        </div>

        <p className="animate-fade-up delay-100 text-[13px] font-medium uppercase tracking-[0.2em] text-sky-300/90 mb-5">
          A Sidama Bank Initiative
        </p>

        <h1 className="animate-fade-up delay-100 text-5xl sm:text-7xl lg:text-[80px] font-semibold text-white leading-[1.04] text-balance drop-shadow-[0_2px_24px_rgba(0,0,0,0.4)]">
          Let&apos;s build the
          <br />
          Hawassa Riverside.
        </h1>

        <p className="animate-fade-up delay-200 mt-6 text-xl sm:text-2xl text-white/85 max-w-2xl mx-auto leading-snug text-balance drop-shadow-[0_1px_14px_rgba(0,0,0,0.45)]">
          A lakefront park for every family — promenades, playgrounds, water
          attractions and gathering spaces along the shores of Lake Hawassa.
        </p>

        {/* Framed video — fills the box (zoom crops the source letterbox) */}
        <figure className="animate-fade-up delay-300 relative mt-12 mx-auto max-w-2xl rounded-[24px] overflow-hidden ring-1 ring-white/15 shadow-[0_40px_120px_-30px_rgba(0,0,0,0.7)]">
          <div className="relative aspect-video bg-black">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <video
              className="absolute inset-0 w-full h-full object-cover"
              style={{ transform: "scale(2.9) translateY(-6%)" }}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              aria-label="Hawassa Riverside concept film"
            >
              <source src={asset("/riverside.mp4")} type="video/mp4" />
            </video>

            {/* top mask hides any residual source dots; bottom for caption */}
            <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black/70 to-transparent pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent pointer-events-none" />

            <figcaption className="absolute bottom-4 left-5 right-5 flex items-center justify-between text-white">
              <span className="inline-flex items-center gap-2 text-sm font-medium">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400" />
                </span>
                Hawassa Riverside · concept film
              </span>
              <span className="hidden sm:inline text-xs text-white/60 uppercase tracking-wider">
                Lake Hawassa
              </span>
            </figcaption>
          </div>
        </figure>

        {/* CTAs */}
        <div className="animate-fade-up delay-400 mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
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
