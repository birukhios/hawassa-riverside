import { ArrowDown } from "lucide-react";
import HeroBackground from "./HeroBackground";

export default function HeroSection() {
  return (
    <section
      id="top"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#0b1f33]"
    >
      {/* Full-screen gradient background */}
      <HeroBackground />

      {/* Subtle legibility overlay (gradient is already dark enough) */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.15), rgba(0,0,0,0) 40%, rgba(0,0,0,0.25))",
          pointerEvents: "none",
        }}
      />

      <div className="relative max-w-4xl mx-auto px-6 text-center pt-28 pb-16">
        <p className="animate-fade-up text-[13px] font-medium uppercase tracking-[0.2em] text-white/80 mb-6">
          Hawassa Riverside Project
        </p>

        <h1 className="animate-fade-up delay-100 text-5xl sm:text-7xl lg:text-[88px] font-semibold text-white leading-[1.03] text-balance drop-shadow-[0_2px_20px_rgba(0,0,0,0.35)]">
          Let&apos;s build the
          <br />
          Hawassa Riverside.
        </h1>

        <p className="animate-fade-up delay-200 mt-7 text-xl sm:text-2xl text-white/85 max-w-2xl mx-auto leading-snug text-balance drop-shadow-[0_1px_12px_rgba(0,0,0,0.4)]">
          A lakefront park for every family — promenades, playgrounds, water
          attractions and gathering spaces along the shores of Lake Hawassa.
        </p>

        <div className="animate-fade-up delay-300 mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href="#donate"
            className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-lake text-white text-[17px] font-medium hover:bg-lake-deep transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg"
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

        {/* Progress glass card */}
        <div className="animate-fade-up delay-400 mt-16 mx-auto max-w-2xl">
          <div className="glass rounded-3xl border border-white/20 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.4)] p-8">
            <div className="flex items-end justify-between mb-4">
              <div className="text-left">
                <p className="text-3xl sm:text-4xl font-semibold text-ink tracking-tight">
                  ETB 1.25M
                </p>
                <p className="text-sm text-ink-2 mt-1">
                  raised of ETB 5M goal
                </p>
              </div>
              <div className="text-right">
                <p className="text-3xl sm:text-4xl font-semibold text-emerald-600 tracking-tight">
                  842
                </p>
                <p className="text-sm text-ink-2 mt-1">generous donors</p>
              </div>
            </div>
            <div className="h-2.5 w-full rounded-full bg-black/10 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-lake to-emerald-500"
                style={{ width: "25%" }}
              />
            </div>
          </div>
        </div>
      </div>

      <a
        href="#progress"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/70 hover:text-white transition-colors animate-fade-in"
        aria-label="Scroll down"
      >
        <ArrowDown className="w-5 h-5 animate-bounce" />
      </a>
    </section>
  );
}
