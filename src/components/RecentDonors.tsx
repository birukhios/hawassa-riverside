"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";

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
const ALL_DONORS: Donor[] = [
  { id: "1", name: "Anonymous", amount: 5000, message: "For Hawassa's future", time: "5m ago" },
  { id: "2", name: "Abebe M.", amount: 1000, message: "Supporting our city", time: "15m ago" },
  { id: "3", name: "Anonymous", amount: 500, time: "30m ago" },
  { id: "4", name: "Hirut S.", amount: 2000, message: "Every bit helps", time: "45m ago" },
  { id: "5", name: "Anonymous", amount: 1500, time: "1h ago" },
  { id: "6", name: "Dawit K.", amount: 750, message: "Proud to contribute", time: "2h ago" },
  { id: "7", name: "Selam T.", amount: 3000, message: "For the children's playground", time: "3h ago" },
  { id: "8", name: "Anonymous", amount: 250, time: "4h ago" },
  { id: "9", name: "Yonas G.", amount: 10000, message: "From the diaspora, with love", time: "5h ago" },
  { id: "10", name: "Marta A.", amount: 1200, time: "6h ago" },
  { id: "11", name: "Anonymous", amount: 800, message: "One Hawassa", time: "8h ago" },
  { id: "12", name: "Bereket L.", amount: 5000, message: "Build the promenade!", time: "10h ago" },
  { id: "13", name: "Anonymous", amount: 600, time: "12h ago" },
  { id: "14", name: "Tigist W.", amount: 2500, message: "For a greener city", time: "14h ago" },
  { id: "15", name: "Henok B.", amount: 1000, time: "16h ago" },
  { id: "16", name: "Anonymous", amount: 4000, message: "Lake Hawassa forever", time: "18h ago" },
  { id: "17", name: "Rahel D.", amount: 1500, message: "Greetings from Toronto", time: "20h ago" },
  { id: "18", name: "Anonymous", amount: 350, time: "22h ago" },
  { id: "19", name: "Samuel K.", amount: 7000, message: "Proud Sidama son", time: "1d ago" },
  { id: "20", name: "Liya M.", amount: 900, time: "1d ago" },
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

function DonorRow({ donor }: { donor: Donor }) {
  return (
    <div className="flex items-center gap-4 p-5 sm:p-6 transition-colors hover:bg-mist/60">
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
  );
}

export default function RecentDonors({ donors = ALL_DONORS }: RecentDonorsProps) {
  const [showAll, setShowAll] = useState(false);
  const recent = donors.slice(0, 6);

  // lock body scroll while the modal is open
  useEffect(() => {
    document.body.style.overflow = showAll ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [showAll]);

  return (
    <section className="py-16 lg:py-24 bg-mist">
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
          {recent.map((donor) => (
            <DonorRow key={donor.id} donor={donor} />
          ))}
        </div>

        <div className="text-center mt-10">
          <button
            onClick={() => setShowAll(true)}
            className="px-7 py-3 rounded-full bg-white border border-black/10 text-ink font-medium hover:bg-mist transition-colors"
          >
            View all donors
          </button>
        </div>
      </div>

      {/* All-donors modal */}
      {showAll && (
        <div
          className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-black/40 backdrop-blur-sm p-0 sm:p-6"
          onClick={() => setShowAll(false)}
        >
          <div
            className="bg-white w-full sm:max-w-lg max-h-[85vh] rounded-t-[28px] sm:rounded-[28px] shadow-2xl flex flex-col overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 py-5 border-b border-black/5">
              <div>
                <h3 className="text-lg font-semibold text-ink">All donors</h3>
                <p className="text-sm text-ink-2">
                  {donors.length} contributions and counting
                </p>
              </div>
              <button
                onClick={() => setShowAll(false)}
                aria-label="Close"
                className="w-9 h-9 rounded-full bg-mist hover:bg-black/10 flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5 text-ink-2" />
              </button>
            </div>
            <div className="overflow-y-auto divide-y divide-black/5">
              {donors.map((donor) => (
                <DonorRow key={donor.id} donor={donor} />
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
