import { DONATION_IMPACT } from "@/lib/constants";

export default function ImpactBreakdown() {
  return (
    <section className="py-16 lg:py-24 bg-mist">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-6xl font-semibold text-ink text-balance">
            See your impact.
          </h2>
          <p className="mt-5 text-xl text-ink-2 max-w-xl mx-auto text-balance">
            Every contribution is transparent — here&apos;s exactly what your
            gift makes possible.
          </p>
        </div>

        <div className="bg-white rounded-[28px] border border-black/5 shadow-[0_30px_80px_-50px_rgba(0,0,0,0.3)] divide-y divide-black/5 overflow-hidden">
          {DONATION_IMPACT.map((item) => (
            <div
              key={item.amount}
              className="flex items-center gap-6 p-6 sm:p-7 transition-colors hover:bg-mist/60"
            >
              <div className="flex-shrink-0 w-28 sm:w-32">
                <p className="text-2xl sm:text-3xl font-semibold text-lake tracking-tight tabular-nums">
                  {item.amount.toLocaleString()}
                </p>
                <p className="text-xs text-ink-2 uppercase tracking-wider">
                  ETB
                </p>
              </div>
              <p className="text-ink-2 leading-relaxed text-[15px] sm:text-base">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        <p className="text-center text-ink-2 mt-10 text-lg text-balance">
          Can&apos;t match these amounts? Any gift, big or small, makes a real
          difference.
        </p>
      </div>
    </section>
  );
}
