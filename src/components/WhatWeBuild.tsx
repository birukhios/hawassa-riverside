import { Waves, Baby, Tent, Bike, Music } from "lucide-react";
import { asset } from "@/lib/asset";

const IMPACTS = [
  {
    title: "Lakefront Promenade",
    description:
      "A wide paved walkway along the water with seating, lighting and viewpoints over Lake Hawassa.",
    icon: Waves,
    tint: "text-sky-500",
    img: "/hawassa-2.jpg",
  },
  {
    title: "Water Slides & Pool",
    description:
      "A family water park with slides and a swimming pool — a first of its kind for the city.",
    icon: Waves,
    tint: "text-cyan-500",
    img: "/hawassa-3.jpg",
  },
  {
    title: "Children's Playground",
    description:
      "Safe, modern play areas where Hawassa's children can run, climb and play freely.",
    icon: Baby,
    tint: "text-emerald-500",
    img: "/hawassa-6.jpg",
  },
  {
    title: "Central Stage & Dome",
    description:
      "A landmark events dome and open stage for concerts, festivals and city gatherings.",
    icon: Music,
    tint: "text-orange-500",
    img: "/hawassa-5.jpg",
  },
  {
    title: "Cultural Village",
    description:
      "Traditional gathering huts celebrating Sidama and Ethiopian heritage and community life.",
    icon: Tent,
    tint: "text-rose-500",
    img: "/hawassa-4.jpg",
  },
  {
    title: "Green Walkways & Sport",
    description:
      "Bicycle tracks, tree-lined paths and green spaces for walking, cycling and family time.",
    icon: Bike,
    tint: "text-green-600",
    img: "/hawassa-1.jpeg",
  },
];

export default function WhatWeBuild() {
  return (
    <section id="build" className="py-16 lg:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div id="impact" className="text-center mb-14 scroll-mt-24">
          <p className="text-[13px] font-medium uppercase tracking-[0.2em] text-lake mb-4">
            The Vision
          </p>
          <h2 className="text-4xl sm:text-6xl font-semibold text-ink text-balance">
            What your gift builds.
          </h2>
          <p className="mt-5 text-xl text-ink-2 max-w-2xl mx-auto text-balance">
            Every donation goes toward the spaces that make up the Hawassa
            Lakeside park.
          </p>
        </div>

        {/* Hover-reveal cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {IMPACTS.map((impact) => {
            const Icon = impact.icon;
            return (
              <div
                key={impact.title}
                className="group relative overflow-hidden rounded-3xl p-8 min-h-[240px] flex flex-col justify-end bg-mist transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_30px_70px_-30px_rgba(0,0,0,0.5)]"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={asset(impact.img)}
                  alt=""
                  aria-hidden="true"
                  className="absolute inset-0 w-full h-full object-cover scale-110 opacity-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/25 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-6 transition-transform duration-500 group-hover:scale-110">
                    <Icon className={`w-6 h-6 ${impact.tint}`} strokeWidth={2} />
                  </div>
                  <h3 className="text-xl font-semibold text-ink group-hover:text-white transition-colors duration-300">
                    {impact.title}
                  </h3>
                  <p className="mt-2 text-ink-2 leading-relaxed group-hover:text-white/85 transition-colors duration-300">
                    {impact.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Master plan */}
        <div className="mt-16 rounded-2xl overflow-hidden border border-black/5 bg-mist">
          <div className="grid md:grid-cols-[1.4fr_1fr] items-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={asset("/hawassa-7.jpg")}
              alt="Hawassa Lakeside master plan"
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
