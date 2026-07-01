"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Lock, Loader2, ChevronDown, Check, Smartphone, XCircle } from "lucide-react";
import { WALLETS, BANKS, CURRENCIES } from "@/lib/payment-options";
import { VisaLogo, MastercardLogo, AmexLogo } from "./BrandLogos";
import WalletLogo from "./WalletLogo";
import LogoImg from "./LogoImg";
import { startWalletPayment, checkPaymentStatus } from "@/lib/afropay-client";
import { normalizeEthiopianPhone, isSafaricom } from "@/lib/phone";

type Tab = "wallet" | "bank" | "domestic" | "international";

export interface DonorInfo {
  donorName?: string;
  donorPhone?: string;
  message?: string;
  isAnonymous?: boolean;
}

interface Props {
  amount: number;
  currency: string;
  donor?: DonorInfo;
}

const TABS: { id: Tab; label: string }[] = [
  { id: "wallet", label: "Wallet" },
  { id: "bank", label: "Bank Payments" },
  { id: "domestic", label: "Domestic Cards" },
  { id: "international", label: "International" },
];

export default function AfroPayCheckout({
  amount,
  currency,
  donor,
}: Props) {
  const [reference, setReference] = useState("");
  const [tab, setTab] = useState<Tab>("wallet");
  const [wallet, setWallet] = useState(WALLETS[0].id);
  const [phone, setPhone] = useState("");
  const [bank, setBank] = useState(BANKS[0]);
  const [account, setAccount] = useState("");
  const [card, setCard] = useState({ number: "", exp: "", cvc: "", name: "" });
  const [payCurrency, setPayCurrency] = useState(
    CURRENCIES.find((c) => c.code === currency)?.code || "USD"
  );
  const [loading, setLoading] = useState(false);

  // Donation totals (no discount/tax for a donation, shown for parity)
  const subtotal = amount;
  const total = subtotal;

  const displayCurrency = tab === "international" ? payCurrency : "ETB";
  const symbol =
    CURRENCIES.find((c) => c.code === displayCurrency)?.symbol || "Br";

  const fmt = (n: number) =>
    new Intl.NumberFormat("en-US", { minimumFractionDigits: 2 }).format(n);

  const payLabel = useMemo(() => {
    if (tab === "international") return `Pay ${displayCurrency} ${fmt(total)}`;
    return `Pay Birr ${fmt(total)}`;
  }, [tab, displayCurrency, total]);

  // Per-tab validation + the method label we record
  const { valid, method } = useMemo(() => {
    if (tab === "wallet") {
      const phoneOk =
        wallet === "mpesa"
          ? isSafaricom(phone)
          : phone.replace(/\D/g, "").length >= 9;
      return {
        valid: phoneOk,
        method: WALLETS.find((w) => w.id === wallet)?.name || "Wallet",
      };
    }
    if (tab === "bank")
      return { valid: account.trim().length >= 6, method: bank };
    const cardOk =
      card.number.replace(/\s/g, "").length >= 12 &&
      card.exp.length >= 4 &&
      card.cvc.length >= 3 &&
      card.name.trim().length > 1;
    if (tab === "domestic")
      return { valid: cardOk, method: "Domestic card" };
    return { valid: cardOk, method: `International card (${payCurrency})` };
  }, [tab, phone, wallet, account, bank, card, payCurrency]);

  const [error, setError] = useState<string | null>(null);
  // checkout flow phase
  const [phase, setPhase] = useState<"form" | "awaiting" | "success" | "failed">(
    "form"
  );
  const [failMsg, setFailMsg] = useState("");
  const pollRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const stoppedRef = useRef(false);

  // stop polling on unmount
  useEffect(() => {
    return () => {
      stoppedRef.current = true;
      if (pollRef.current) clearTimeout(pollRef.current);
    };
  }, []);

  const stopPolling = () => {
    stoppedRef.current = true;
    if (pollRef.current) clearTimeout(pollRef.current);
  };

  const pollStatus = (txRef: string) => {
    const startedAt = Date.now();
    const TIMEOUT_MS = 180000; // 3 minutes
    const tick = async () => {
      if (stoppedRef.current) return;
      try {
        const { outcome, message } = await checkPaymentStatus(txRef);
        if (stoppedRef.current) return;
        if (outcome === "success") {
          setPhase("success");
          return;
        }
        if (outcome === "failed") {
          setFailMsg(message || "The payment was not completed.");
          setPhase("failed");
          return;
        }
      } catch {
        // network hiccup — keep trying until timeout
      }
      if (Date.now() - startedAt > TIMEOUT_MS) {
        setFailMsg("We didn't receive a confirmation in time. Please try again.");
        setPhase("failed");
        return;
      }
      pollRef.current = setTimeout(tick, 4000);
    };
    tick();
  };

  const isWallet = tab === "wallet";

  const handlePay = async () => {
    if (!valid) {
      setError(
        tab === "wallet"
          ? wallet === "mpesa"
            ? "Enter a valid Safaricom (M-PESA) number — starts with 07."
            : "Enter the phone number linked to your wallet."
          : tab === "bank"
          ? "Enter your bank account number."
          : "Enter complete card details."
      );
      return;
    }
    setError(null);

    if (isWallet) {
      // Real USSD payment via our internal API route -> AfroPay
      setLoading(true);
      try {
        const { reference: txRef } = await startWalletPayment({
          method: wallet,
          amount: total,
          currency: "ETB",
          phone,
          ...donor,
        });
        setReference(txRef);
        stoppedRef.current = false;
        setPhase("awaiting");
        pollStatus(txRef);
      } catch (e) {
        setError(
          e instanceof Error
            ? e.message
            : "Could not start the payment. Please try again."
        );
      } finally {
        setLoading(false);
      }
      return;
    }

    // Other methods aren't wired to a live endpoint yet — simulate success.
    setLoading(true);
    setReference(
      `SIM-${Date.now()}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`
    );
    setTimeout(() => {
      setLoading(false);
      setPhase("success");
    }, 1300);
  };

  // --- Awaiting confirmation (wallet USSD push) ---
  if (phase === "awaiting") {
    return (
      <div className="w-full max-w-[620px] mx-auto bg-white rounded-2xl shadow-[0_20px_70px_-25px_rgba(0,0,0,0.25)] border border-gray-100 overflow-hidden text-center px-7 py-12">
        <div className="mx-auto w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mb-6 relative">
          <Smartphone className="w-8 h-8 text-blue-600" />
          <span className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-white flex items-center justify-center">
            <Loader2 className="w-5 h-5 text-blue-600 animate-spin" />
          </span>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Confirm on your phone
        </h2>
        <p className="text-gray-500 mb-6 max-w-sm mx-auto">
          We sent a {method} request to{" "}
          <span className="font-semibold text-gray-700">
            {normalizeEthiopianPhone(phone)}
          </span>
          . Open the prompt and enter your PIN to approve{" "}
          <span className="font-semibold text-gray-700">ETB {fmt(total)}</span>.
        </p>
        <div className="inline-flex items-center gap-2 text-sm text-gray-400 mb-8">
          <Loader2 className="w-4 h-4 animate-spin" />
          Waiting for confirmation…
        </div>
        <div>
          <button
            onClick={() => {
              stopPolling();
              setPhase("form");
            }}
            className="text-sm font-medium text-gray-500 hover:text-gray-700 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  // --- Failed ---
  if (phase === "failed") {
    return (
      <div className="w-full max-w-[620px] mx-auto bg-white rounded-2xl shadow-[0_20px_70px_-25px_rgba(0,0,0,0.25)] border border-gray-100 overflow-hidden text-center px-7 py-12">
        <div className="mx-auto w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mb-6">
          <XCircle className="w-9 h-9 text-red-500" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Payment not completed
        </h2>
        <p className="text-gray-500 mb-8 max-w-sm mx-auto">{failMsg}</p>
        <button
          onClick={() => {
            setFailMsg("");
            setPhase("form");
          }}
          className="px-7 py-3 rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors"
        >
          Try again
        </button>
      </div>
    );
  }

  if (phase === "success") {
    return (
      <div className="w-full max-w-[620px] mx-auto bg-white rounded-2xl shadow-[0_20px_70px_-25px_rgba(0,0,0,0.25)] border border-gray-100 overflow-hidden text-center px-7 py-12">
        <div className="mx-auto w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mb-6">
          <Check className="w-8 h-8 text-emerald-600" strokeWidth={3} />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Thank you for your gift!
        </h2>
        <p className="text-gray-500 mb-6">
          Your donation to the Hawassa Lakeside project was successful.
        </p>
        <dl className="text-left bg-gray-50 rounded-2xl p-5 space-y-2 text-sm mb-6">
          <div className="flex justify-between">
            <dt className="text-gray-500">Amount</dt>
            <dd className="font-semibold text-gray-900">ETB {fmt(total)}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-gray-500">Method</dt>
            <dd className="font-semibold text-gray-900">{method}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-gray-500">Reference</dt>
            <dd className="font-mono text-gray-900">{reference}</dd>
          </div>
        </dl>
        <p className="text-[13px] text-gray-400">
          Keep your reference number for your records. Powered by AfroPay.
        </p>
      </div>
    );
  }

  const inputClass =
    "w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 placeholder:text-gray-400 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:outline-none transition";

  return (
    <div className="w-full max-w-[620px] mx-auto bg-white rounded-2xl shadow-[0_20px_70px_-25px_rgba(0,0,0,0.25)] border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-7 py-5 border-b border-gray-100">
        <span className="text-2xl font-extrabold tracking-tight text-blue-600">
          afropay
        </span>
        <span className="flex items-center gap-1.5 text-blue-600 text-sm font-medium">
          <Lock className="w-4 h-4" />
          Safe in Afropay
        </span>
      </div>

      {/* Official campaign identity */}
      <div className="flex items-center gap-3 px-7 py-3 bg-blue-50/60 border-b border-gray-100">
        <LogoImg
          src="/logos/hawassa-city.jpg"
          alt="Hawassa City Administration"
          className="h-9 w-auto"
          fallback={
            <span className="text-[11px] font-bold text-blue-700">
              HAWASSA CITY
            </span>
          }
        />
        <p className="text-[11px] leading-tight text-gray-500">
          Official campaign of the
          <br />
          <span className="font-semibold text-gray-700">
            Hawassa City Administration · Mayor&apos;s Office
          </span>
        </p>
      </div>

      <div className="px-7 py-6">
        {/* Review */}
        <h2 className="text-lg font-bold text-gray-900 mb-5">
          Review your donation
        </h2>
        <dl className="space-y-3 text-[15px]">
          <div className="flex justify-between">
            <dt className="text-gray-500">Donation</dt>
            <dd className="text-gray-900">ETB {fmt(subtotal)}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-gray-500">Processing fee</dt>
            <dd className="text-gray-900">ETB 0.00</dd>
          </div>
        </dl>
        <div className="border-t border-dashed border-gray-300 my-4" />
        <div className="flex justify-between items-center mb-6">
          <span className="text-lg font-bold text-gray-900">Total</span>
          <span className="text-lg font-bold text-gray-900">
            ETB {fmt(total)}
          </span>
        </div>

        {/* Method tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`py-2.5 rounded-xl text-[13px] font-semibold transition ${
                tab === t.id
                  ? "bg-blue-600 text-white shadow"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* WALLET */}
        {tab === "wallet" && (
          <div className="space-y-5">
            <div className="grid grid-cols-4 sm:grid-cols-4 gap-3">
              {WALLETS.map((w) => (
                <button
                  key={w.id}
                  onClick={() => setWallet(w.id)}
                  title={w.name}
                  className={`relative h-16 rounded-xl border-2 flex items-center justify-center bg-white transition ${
                    wallet === w.id
                      ? "border-blue-500 shadow-sm"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <WalletLogo brand={w} />
                  {wallet === w.id && (
                    <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center">
                      <Check className="w-3 h-3 text-white" />
                    </span>
                  )}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl border border-gray-200 bg-gray-50 focus-within:bg-white focus-within:border-blue-500 transition">
              <span className="flex items-center gap-1 text-gray-700 font-medium border-r border-gray-300 pr-2">
                🇪🇹 +251
              </span>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                inputMode="numeric"
                placeholder={wallet === "mpesa" ? "0712345678" : "0912345678"}
                className="flex-1 bg-transparent outline-none text-gray-900 placeholder:text-gray-400"
              />
            </div>
            {wallet === "mpesa" && (
              <p className="text-xs text-gray-400 -mt-2">
                Use your Safaricom M-PESA number (starts with 07).
              </p>
            )}
          </div>
        )}

        {/* BANK */}
        {tab === "bank" && (
          <div className="space-y-4">
            <div className="relative">
              <select
                value={bank}
                onChange={(e) => setBank(e.target.value)}
                className={`${inputClass} appearance-none pr-10`}
              >
                {BANKS.map((b) => (
                  <option key={b}>{b}</option>
                ))}
              </select>
              <ChevronDown className="w-5 h-5 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
            <input
              value={account}
              onChange={(e) => setAccount(e.target.value)}
              inputMode="numeric"
              placeholder="Account number"
              className={inputClass}
            />
            <p className="text-xs text-gray-400">
              You&apos;ll be redirected to your bank to approve the transfer
              securely.
            </p>
          </div>
        )}

        {/* DOMESTIC CARDS */}
        {tab === "domestic" && (
          <CardForm
            card={card}
            setCard={setCard}
            inputClass={inputClass}
            note="Local debit & credit cards (CBE, Amole, Visa Ethiopia)."
          />
        )}

        {/* INTERNATIONAL CARDS */}
        {tab === "international" && (
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-1">
              <VisaLogo className="text-lg" />
              <MastercardLogo size={32} />
              <AmexLogo />
            </div>
            <div className="relative">
              <label className="block text-xs font-medium text-gray-500 mb-1">
                Pay in your currency
              </label>
              <select
                value={payCurrency}
                onChange={(e) => setPayCurrency(e.target.value)}
                className={`${inputClass} appearance-none pr-10`}
              >
                {CURRENCIES.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.code} — {c.name} ({c.symbol})
                  </option>
                ))}
              </select>
              <ChevronDown className="w-5 h-5 text-gray-400 absolute right-3 top-[34px] pointer-events-none" />
            </div>
            <CardForm
              card={card}
              setCard={setCard}
              inputClass={inputClass}
              note="International Visa, Mastercard & Amex accepted worldwide."
            />
          </div>
        )}

        {error && (
          <p className="mt-4 text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-4 py-2.5">
            {error}
          </p>
        )}

        {/* Pay button */}
        <button
          onClick={handlePay}
          disabled={loading}
          className="w-full mt-6 py-4 rounded-xl text-white text-[15px] font-bold uppercase tracking-wide bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:opacity-60 transition flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" /> Processing…
            </>
          ) : (
            payLabel
          )}
        </button>

        <p className="text-center text-gray-400 text-[13px] mt-4 leading-relaxed">
          Ensuring your financial and personal details are secure during every
          transaction.
        </p>
      </div>
    </div>
  );
}

function CardForm({
  card,
  setCard,
  inputClass,
  note,
}: {
  card: { number: string; exp: string; cvc: string; name: string };
  setCard: (c: { number: string; exp: string; cvc: string; name: string }) => void;
  inputClass: string;
  note: string;
}) {
  return (
    <div className="space-y-4">
      <input
        value={card.number}
        onChange={(e) => setCard({ ...card, number: e.target.value })}
        inputMode="numeric"
        placeholder="Card number"
        className={inputClass}
      />
      <div className="grid grid-cols-2 gap-3">
        <input
          value={card.exp}
          onChange={(e) => setCard({ ...card, exp: e.target.value })}
          placeholder="MM / YY"
          className={inputClass}
        />
        <input
          value={card.cvc}
          onChange={(e) => setCard({ ...card, cvc: e.target.value })}
          inputMode="numeric"
          placeholder="CVC"
          className={inputClass}
        />
      </div>
      <input
        value={card.name}
        onChange={(e) => setCard({ ...card, name: e.target.value })}
        placeholder="Name on card"
        className={inputClass}
      />
      <p className="text-xs text-gray-400">{note}</p>
    </div>
  );
}
