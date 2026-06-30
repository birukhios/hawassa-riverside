import { asset } from "@/lib/asset";

const GALLERY = [
  {
    src: "/hawassa-3.jpg",
    title: "Water Park & Pool",
    blurb: "Slides and a swimming pool for the whole family.",
    span: "lg:col-span-2 lg:row-span-2",
  },
  {
    src: "/hawassa-2.jpg",
    title: "Lakefront Promenade",
    blurb: "A paved walkway right along the water.",
    span: "",
  },
  {
    src: "/hawassa-5.jpg",
    title: "Events Dome",
    blurb: "A landmark glass dome for gatherings.",
    span: "",
  },
  {
    src: "/hawassa-6.jpg",
    title: "Golden-Hour Boardwalk",
    blurb: "Sunset strolls over the shoreline.",
    span: "",
  },
  {
    src: "/hawassa-4.jpg",
    title: "Cultural Village",
    blurb: "Traditional huts and gathering space.",
    span: "",
  },
];

export default function WhatWeBuild() {
  return (
    <section id="build" className="py-28 lg:py-36 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-14">
          <p className="text-[13px] font-medium uppercase tracking-[0.2em] text-lake mb-4">
            The Vision
          </p>
          <h2 className="text-4xl sm:text-6xl font-semibold text-ink text-balance">
            What we&apos;re building.
          </h2>
          <p className="mt-5 text-xl text-ink-2 max-w-2xl mx-auto text-balance">
            Architectural renders of the Hawassa Riverside park — coming to life
            with your support.
          </p>
        </div>

        {/* Render gallery */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 auto-rows-[200px] gap-4">
          {GALLERY.map((g) => (
            <figure
              key={g.src}
              className={`group relative overflow-hidden rounded-2xl ${g.span}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={asset(g.src)}
                alt={g.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <figcaption className="absolute bottom-0 left-0 right-0 p-5">
                <h3 className="text-white font-semibold text-lg">{g.title}</h3>
                <p className="text-white/80 text-sm">{g.blurb}</p>
              </figcaption>
            </figure>
          ))}
        </div>

        {/* Master plan */}
        <div className="mt-6 rounded-2xl overflow-hidden border border-black/5 bg-mist">
          <div className="grid md:grid-cols-[1.4fr_1fr] items-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={asset("/hawassa-7.jpg")}
              alt="Hawassa Riverside master plan"
              className="w-full h-full object-cover"
            />
            <div className="p-8 lg:p-10">
              <h3 className="text-2xl font-semibold text-ink mb-3">
                The master plan
              </h3>
              <p className="text-ink-2 leading-relaxed mb-5">
                A 1,370-metre lakefront divided into 16 zones — from the watching
                tower and children&apos;s playground to the water slide, central
                stage, cultural huts and family reading areas.
              </p>
              <a
                href="#donate"
                className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-lake text-white font-medium hover:bg-lake-deep transition-colors"
              >
                Help build it
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
