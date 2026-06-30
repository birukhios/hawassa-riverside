import { Waves, Baby, Tent, Bike, Music } from "lucide-react";

const IMPACTS = [
  {
    title: "Lakefront Promenade",
    description:
      "A wide paved walkway along the water with seating, lighting and viewpoints over Lake Hawassa.",
    icon: Waves,
    tint: "text-sky-500",
  },
  {
    title: "Water Slides & Pool",
    description:
      "A family water park with slides and a swimming pool — a first of its kind for the city.",
    icon: Waves,
    tint: "text-cyan-500",
  },
  {
    title: "Children's Playground",
    description:
      "Safe, modern play areas where Hawassa's children can run, climb and play freely.",
    icon: Baby,
    tint: "text-emerald-500",
  },
  {
    title: "Central Stage & Dome",
    description:
      "A landmark events dome and open stage for concerts, festivals and city gatherings.",
    icon: Music,
    tint: "text-orange-500",
  },
  {
    title: "Cultural Village",
    description:
      "Traditional gathering huts celebrating Sidama and Ethiopian heritage and community life.",
    icon: Tent,
    tint: "text-rose-500",
  },
  {
    title: "Green Walkways & Sport",
    description:
      "Bicycle tracks, tree-lined paths and green spaces for walking, cycling and family time.",
    icon: Bike,
    tint: "text-green-600",
  },
];

export default function ImpactSection() {
  return (
    <section id="impact" className="py-28 lg:py-36 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-6xl font-semibold text-ink text-balance">
            What your gift builds.
          </h2>
          <p className="mt-5 text-xl text-ink-2 max-w-2xl mx-auto text-balance">
            Every donation goes toward the spaces that make up the Hawassa
            Riverside park.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {IMPACTS.map((impact) => {
            const Icon = impact.icon;
            return (
              <div
                key={impact.title}
                className="group bg-mist rounded-3xl p-8 transition-all duration-500 hover:bg-white hover:shadow-[0_24px_60px_-30px_rgba(0,0,0,0.25)] hover:-translate-y-1 border border-transparent hover:border-black/5"
              >
                <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-6 transition-transform duration-500 group-hover:scale-110">
                  <Icon className={`w-6 h-6 ${impact.tint}`} strokeWidth={2} />
                </div>
                <h3 className="text-xl font-semibold text-ink mb-2">
                  {impact.title}
                </h3>
                <p className="text-ink-2 leading-relaxed">
                  {impact.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
