import { asset } from "@/lib/asset";

export default function VideoSection() {
  return (
    <section
      id="film"
      className="relative py-28 lg:py-36 bg-[#07223b] overflow-hidden"
    >
      {/* ambient glows */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-[760px] h-[760px] rounded-full bg-sky-500/20 blur-3xl" />
        <div className="absolute bottom-0 right-10 w-[420px] h-[420px] rounded-full bg-emerald-400/15 blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <p className="text-[13px] font-medium uppercase tracking-[0.2em] text-sky-300/80 mb-4">
            In Motion
          </p>
          <h2 className="text-4xl sm:text-6xl font-semibold text-white text-balance">
            See it come to life.
          </h2>
          <p className="mt-5 text-xl text-white/70 max-w-2xl mx-auto text-balance">
            A glimpse of the Hawassa Riverside vision — the lakefront we&apos;re
            building together.
          </p>
        </div>

        {/* Video frame — the video fills the 16:9 card edge to edge */}
        <figure className="relative mx-auto rounded-[28px] overflow-hidden ring-1 ring-white/15 shadow-[0_50px_140px_-40px_rgba(0,0,0,0.8)]">
          <div className="relative aspect-video bg-black">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <video
              className="absolute inset-0 w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              aria-label="Hawassa Riverside concept film"
            >
              <source src={asset("/riverside.mp4")} type="video/mp4" />
            </video>

            {/* vignette for caption legibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/10 pointer-events-none" />

            <figcaption className="absolute bottom-5 left-6 right-6 flex items-center justify-between text-white">
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

        <div className="text-center mt-12">
          <a
            href="#donate"
            className="inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-white text-[#07223b] text-[17px] font-medium hover:bg-white/90 transition-all hover:scale-[1.02]"
          >
            Be part of it
          </a>
        </div>
      </div>
    </section>
  );
}
