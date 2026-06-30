export default function StorySection() {
  return (
    <section
      id="story"
      className="relative py-32 lg:py-44 overflow-hidden bg-[#0b1f33] text-white"
    >
      {/* Cinematic lake gradient */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0b1f33] via-[#0d3a57] to-[#10564f]" />
        <div className="absolute -top-20 left-1/4 w-[600px] h-[600px] rounded-full bg-sky-500/20 blur-3xl animate-float-slow" />
        <div className="absolute bottom-0 right-1/4 w-[520px] h-[520px] rounded-full bg-emerald-400/15 blur-3xl animate-float-slow delay-300" />
      </div>

      <div className="relative max-w-4xl mx-auto px-6 text-center">
        <p className="text-[13px] font-medium uppercase tracking-[0.2em] text-sky-300/80 mb-8">
          Our Mission
        </p>

        <blockquote className="text-3xl sm:text-5xl lg:text-[56px] font-semibold leading-[1.12] text-balance">
          The lake gave Hawassa its name. Now we&apos;re giving the lake back to
          its people.
        </blockquote>

        <div className="mt-12 space-y-6 text-lg sm:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed text-balance">
          <p>
            For generations the shores of Lake Hawassa have been the heart of
            the city — where families walk at sunset, where children laugh,
            where the community comes together. The Hawassa Riverside project
            transforms that shoreline into a world-class public park that
            belongs to everyone.
          </p>
          <p>
            Promenades, playgrounds, water attractions, a central stage, and
            quiet green spaces to read and rest — built not by government alone,
            but by a community that believes in its own future. Every birr, from
            here or from the diaspora abroad, lays another stone.
          </p>
        </div>

        <div className="mt-14 inline-flex items-center gap-3 text-white/50 text-sm">
          <span className="h-px w-12 bg-white/20" />
          A lakefront for every family in Hawassa
          <span className="h-px w-12 bg-white/20" />
        </div>
      </div>
    </section>
  );
}
