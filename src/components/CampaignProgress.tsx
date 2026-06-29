"use client";

import { useEffect, useState } from "react";
import { TrendingUp } from "lucide-react";

interface ProgressProps {
  raised: number;
  goal: number;
  donors: number;
}

export default function CampaignProgress({ raised, goal, donors }: ProgressProps) {
  const [displayRaised, setDisplayRaised] = useState(0);
  const percentage = (raised / goal) * 100;

  useEffect(() => {
    let interval: NodeJS.Timeout;
    const target = raised;
    let current = 0;

    if (current < target) {
      interval = setInterval(() => {
        current += target / 60;
        setDisplayRaised(Math.min(current, target));
      }, 30);
    }

    return () => clearInterval(interval);
  }, [raised]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "ETB",
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <section className="py-16 lg:py-24 bg-white" id="progress">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Campaign Progress
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Every donation brings us closer to our goal of transforming Hawassa City
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Main progress card */}
          <div className="lg:col-span-2 bg-gradient-to-br from-blue-50 to-blue-50 rounded-2xl p-8 border border-blue-100">
            <div className="mb-6">
              <div className="flex justify-between items-center mb-3">
                <p className="text-gray-600 font-semibold">Total Raised</p>
                <p className="text-sm text-gray-500">{Math.round(percentage)}% of goal</p>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-green-500 transition-all duration-1000 ease-out rounded-full"
                  style={{ width: `${Math.min(percentage, 100)}%` }}
                ></div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-gray-600 text-sm mb-1">Raised</p>
                <p className="text-3xl font-bold text-blue-600">
                  {formatCurrency(displayRaised)}
                </p>
              </div>
              <div>
                <p className="text-gray-600 text-sm mb-1">Goal</p>
                <p className="text-3xl font-bold text-gray-900">
                  {formatCurrency(goal)}
                </p>
              </div>
            </div>
          </div>

          {/* Stats card */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 border border-green-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Community Support</h3>
            </div>

            <div>
              <p className="text-gray-600 text-sm mb-1">Generous Donors</p>
              <p className="text-4xl font-bold text-green-600">{donors.toLocaleString()}</p>
              <p className="text-gray-500 text-sm mt-3">
                Supporting hope, unity, and positive change
              </p>
            </div>
          </div>
        </div>

        {/* Impact preview */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-3">Each Contribution Matters</h3>
          <p className="text-blue-100 max-w-2xl mx-auto">
            Whether it's ETB 100 or ETB 5,000, your donation directly supports community initiatives, public improvements, and the future of Hawassa City.
          </p>
        </div>
      </div>
    </section>
  );
}
