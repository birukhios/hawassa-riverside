"use client";

import { useEffect, useRef, useState } from "react";

interface ProgressProps {
  raised: number;
  goal: number;
  donors: number;
}

function useInView<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setInView(true),
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, inView };
}

export default function CampaignProgress({
  raised,
  goal,
  donors,
}: ProgressProps) {
  const { ref, inView } = useInView<HTMLDivElement>();
  const [displayRaised, setDisplayRaised] = useState(0);
  const [liveRaised] = useState(raised);
  const [liveDonors] = useState(donors);
  const percentage = Math.min((liveRaised / goal) * 100, 100);

  useEffect(() => {
    if (!inView) return;
    let frame: number;
    const start = performance.now();
    const duration = 1600;

    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplayRaised(liveRaised * eased);
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, liveRaised]);

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "ETB",
      maximumFractionDigits: 0,
    }).format(value);

  return (
    <section id="progress" className="py-16 lg:py-24 bg-mist">
      <div ref={ref} className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-6xl font-semibold text-ink text-balance">
            Every gift moves us forward.
          </h2>
          <p className="mt-5 text-xl text-ink-2 max-w-xl mx-auto text-balance">
            Watch the campaign grow in real time as the community comes
            together.
          </p>
        </div>

        <div className="bg-white rounded-[28px] border border-black/5 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.25)] p-8 sm:p-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-8">
            <div>
              <p className="text-sm text-ink-2 font-medium uppercase tracking-wider mb-2">
                Raised so far
              </p>
              <p className="text-5xl sm:text-6xl font-semibold text-ink tracking-tight tabular-nums">
                {formatCurrency(displayRaised)}
              </p>
            </div>
            <div className="text-left sm:text-right">
              <p className="text-sm text-ink-2 font-medium uppercase tracking-wider mb-2">
                Goal
              </p>
              <p className="text-2xl font-semibold text-ink-2 tracking-tight">
                {formatCurrency(goal)}
              </p>
            </div>
          </div>

          <div className="h-3 w-full rounded-full bg-black/8 overflow-hidden mb-3">
            <div
              className="h-full rounded-full bg-gradient-to-r from-lake to-emerald-500 transition-[width] duration-[1600ms] ease-out"
              style={{ width: inView ? `${percentage}%` : "0%" }}
            />
          </div>
          <p className="text-sm text-ink-2">
            {Math.round(percentage)}% of our goal reached
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-px mt-10 rounded-2xl overflow-hidden bg-black/5">
            <Stat value={liveDonors.toLocaleString()} label="Donors" />
            <Stat value="18" label="Days remaining" />
            <Stat
              value="ETB 5,000"
              label="Latest gift"
              className="col-span-2 sm:col-span-1"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({
  value,
  label,
  className = "",
}: {
  value: string;
  label: string;
  className?: string;
}) {
  return (
    <div className={`bg-white px-6 py-7 text-center ${className}`}>
      <p className="text-2xl sm:text-3xl font-semibold text-ink tracking-tight">
        {value}
      </p>
      <p className="text-sm text-ink-2 mt-1">{label}</p>
    </div>
  );
}
