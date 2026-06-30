"use client";

interface Donor {
  id: string;
  name: string;
  amount: number;
  message?: string;
  time: string;
}

interface RecentDonorsProps {
  donors?: Donor[];
}

// Static time labels keep server and client markup identical (no hydration
// mismatch). When wired to live data, format on the client inside useEffect.
const SAMPLE_DONORS: Donor[] = [
  {
    id: "1",
    name: "Anonymous",
    amount: 5000,
    message: "For Hawassa's future",
    time: "5m ago",
  },
  {
    id: "2",
    name: "Abebe M.",
    amount: 1000,
    message: "Supporting our city",
    time: "15m ago",
  },
  { id: "3", name: "Anonymous", amount: 500, time: "30m ago" },
  {
    id: "4",
    name: "Hirut S.",
    amount: 2000,
    message: "Every bit helps",
    time: "45m ago",
  },
  { id: "5", name: "Anonymous", amount: 1500, time: "1h ago" },
  {
    id: "6",
    name: "Dawit K.",
    amount: 750,
    message: "Proud to contribute",
    time: "2h ago",
  },
];

const initials = (name: string) =>
  name === "Anonymous"
    ? "★"
    : name
        .split(" ")
        .map((p) => p[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();

export default function RecentDonors({
  donors = SAMPLE_DONORS,
}: RecentDonorsProps) {
  return (
    <section className="py-28 lg:py-36 bg-mist">
      <div className="max-w-2xl mx-auto px-6">
        <div className="text-center mb-14">
          <h2 className="text-4xl sm:text-6xl font-semibold text-ink text-balance">
            A growing community.
          </h2>
          <p className="mt-5 text-xl text-ink-2 text-balance">
            Meet the generous people behind the movement.
          </p>
        </div>

        <div className="bg-white rounded-[28px] border border-black/5 shadow-[0_30px_80px_-50px_rgba(0,0,0,0.3)] divide-y divide-black/5 overflow-hidden">
          {donors.map((donor) => (
            <div
              key={donor.id}
              className="flex items-center gap-4 p-5 sm:p-6 transition-colors hover:bg-mist/60"
            >
              <div className="flex-shrink-0 w-11 h-11 rounded-full bg-gradient-to-br from-lake to-emerald-500 flex items-center justify-center text-white text-sm font-semibold">
                {initials(donor.name)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="font-medium text-ink truncate">{donor.name}</p>
                  <span className="text-xs text-ink-2">·</span>
                  <span className="text-xs text-ink-2">{donor.time}</span>
                </div>
                {donor.message && (
                  <p className="text-ink-2 text-sm truncate">
                    &ldquo;{donor.message}&rdquo;
                  </p>
                )}
              </div>
              <p className="flex-shrink-0 text-lg font-semibold text-ink tracking-tight tabular-nums">
                {donor.amount.toLocaleString()}
                <span className="text-xs text-ink-2 ml-1">ETB</span>
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <button className="px-7 py-3 rounded-full bg-white border border-black/10 text-ink font-medium hover:bg-mist transition-colors">
            View all donors
          </button>
        </div>
      </div>
    </section>
  );
}
