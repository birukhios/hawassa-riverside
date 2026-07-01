"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { type DonationFormData } from "@/lib/validations";
import { Loader2, Lock, X } from "lucide-react";
import { DONATION_AMOUNTS } from "@/lib/constants";
import AfroPayCheckout from "./AfroPayCheckout";

interface DonationFormProps {
  campaignId: string;
  onSuccess?: () => void;
}

interface CheckoutState {
  reference: string;
  amount: number;
  currency: string;
}

export default function DonationForm({ campaignId }: DonationFormProps) {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(1000);
  const [customAmount, setCustomAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [checkout, setCheckout] = useState<CheckoutState | null>(null);

  const { register, getValues, watch } = useForm<DonationFormData>({
    defaultValues: { currency: "ETB", isAnonymous: false },
  });

  const isAnonymous = watch("isAnonymous");
  const finalAmount = customAmount
    ? parseFloat(customAmount)
    : selectedAmount || 0;

  // lock body scroll while the checkout overlay is open
  useEffect(() => {
    document.body.style.overflow = checkout ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [checkout]);

  const handleDonate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!finalAmount || finalAmount < 50) {
      setError("Please choose or enter an amount of at least ETB 50.");
      return;
    }
    setError(null);
    setIsLoading(true);

    // Create the AfroPay reference and open the checkout inline. (In a hosted
    // setup the reference would come from the AfroPay init API server-side.)
    const data = getValues();
    const reference = `APR-${Date.now()}-${Math.random()
      .toString(36)
      .slice(2, 9)
      .toUpperCase()}`;

    setCheckout({
      reference,
      amount: finalAmount,
      currency: data.currency || "ETB",
    });
    setIsLoading(false);
  };

  const inputClass =
    "w-full px-4 py-3 rounded-2xl bg-mist border border-transparent focus:bg-white focus:border-lake/40 focus:outline-none focus:ring-4 focus:ring-lake/10 text-ink placeholder:text-ink-2/60 transition-all";

  // --- Donation form view (with checkout overlay) ---
  return (
    <>
    <section
      id="donate"
      className="min-h-screen flex flex-col justify-start pt-14 pb-12 bg-white"
    >
      <div className="w-full max-w-xl mx-auto px-6">
        <div className="text-center mb-6">
          <h2 className="text-4xl sm:text-5xl font-semibold text-ink text-balance">
            Make your gift.
          </h2>
          <p className="mt-3 text-lg text-ink-2 text-balance">
            Choose an amount and give securely in seconds.
          </p>
        </div>

        <form
          onSubmit={handleDonate}
          className="bg-white rounded-[24px] border border-black/5 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.3)] p-6 sm:p-8"
        >
          {/* Amount segmented selector */}
          <label className="block text-sm font-medium text-ink mb-2.5">
            Amount
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-3">
            {DONATION_AMOUNTS.map((item) => {
              const active = selectedAmount === item.value && !customAmount;
              return (
                <button
                  key={item.value}
                  type="button"
                  onClick={() => {
                    setSelectedAmount(item.value);
                    setCustomAmount("");
                  }}
                  className={`py-2.5 rounded-2xl text-[15px] font-medium transition-all ${
                    active
                      ? "bg-lake text-white shadow-md scale-[1.02]"
                      : "bg-mist text-ink hover:bg-black/[0.06]"
                  }`}
                >
                  {item.value.toLocaleString()}
                </button>
              );
            })}
          </div>

          <div className="relative mb-4">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-2 text-sm font-medium">
              ETB
            </span>
            <input
              type="number"
              inputMode="numeric"
              placeholder="Custom amount"
              value={customAmount}
              onChange={(e) => {
                setCustomAmount(e.target.value);
                setSelectedAmount(null);
              }}
              className={`${inputClass} pl-14`}
              min="50"
            />
          </div>

          {/* Donor info */}
          <div className="space-y-2.5 mb-4">
            {!isAnonymous && (
              <>
                <input
                  type="text"
                  placeholder="Full name"
                  {...register("donorName")}
                  className={inputClass}
                />
                <input
                  type="tel"
                  placeholder="Phone (optional)"
                  {...register("donorPhone")}
                  className={inputClass}
                />
              </>
            )}
            <textarea
              placeholder="Leave a message (optional)"
              {...register("message")}
              rows={2}
              className={`${inputClass} resize-none`}
            />
          </div>

          {/* Anonymous toggle */}
          <label className="flex items-center justify-between py-2.5 px-4 rounded-2xl bg-mist mb-4 cursor-pointer">
            <span className="text-[15px] text-ink">Donate anonymously</span>
            <span className="relative inline-flex items-center">
              <input
                type="checkbox"
                {...register("isAnonymous")}
                className="peer sr-only"
              />
              <span className="w-11 h-6 rounded-full bg-black/15 peer-checked:bg-emerald-500 transition-colors" />
              <span className="absolute left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform peer-checked:translate-x-5" />
            </span>
          </label>

          {error && (
            <div className="mb-5 p-4 rounded-2xl bg-red-50 border border-red-100 text-red-600 text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading || !finalAmount}
            className="w-full py-3.5 rounded-full bg-lake text-white text-[17px] font-medium hover:bg-lake-deep disabled:bg-black/15 disabled:cursor-not-allowed transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 mt-1"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Processing…
              </>
            ) : (
              <>Continue to checkout · ETB {finalAmount.toLocaleString()}</>
            )}
          </button>

          <p className="flex items-center justify-center gap-1.5 text-center text-ink-2 text-[13px] mt-4">
            <Lock className="w-3.5 h-3.5" />
            Secured by AfroPay Checkout
          </p>
        </form>
      </div>
    </section>

      {/* Checkout overlay — full-screen, reliable on mobile */}
      {checkout && (
        <div className="fixed inset-0 z-[90] overflow-y-auto bg-black/50 backdrop-blur-sm">
          <div className="min-h-full flex items-start sm:items-center justify-center p-4 py-8">
            <div className="w-full max-w-[620px]">
              <button
                onClick={() => setCheckout(null)}
                className="inline-flex items-center gap-1.5 text-white/90 hover:text-white text-sm font-medium mb-4 transition-colors"
              >
                <X className="w-4 h-4" />
                Back to donation
              </button>
              <AfroPayCheckout
                amount={checkout.amount}
                currency={checkout.currency}
                reference={checkout.reference}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
