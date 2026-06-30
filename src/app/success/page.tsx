import { Suspense } from "react";
import { Check, Download, Share2 } from "lucide-react";
import Link from "next/link";

function SuccessContent({
  reference,
  amount,
}: {
  reference: string;
  amount: string;
}) {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6 py-16 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-gradient-to-b from-emerald-100 via-green-50 to-transparent blur-3xl opacity-80" />
      </div>

      <div className="relative max-w-lg w-full text-center">
        <div className="flex justify-center mb-8 animate-fade-up">
          <div className="w-20 h-20 rounded-full bg-emerald-500 flex items-center justify-center shadow-[0_20px_50px_-15px_rgba(16,185,129,0.6)]">
            <Check className="w-10 h-10 text-white" strokeWidth={3} />
          </div>
        </div>

        <h1 className="animate-fade-up delay-100 text-5xl sm:text-6xl font-semibold text-ink mb-4 text-balance">
          Thank you.
        </h1>
        <p className="animate-fade-up delay-200 text-xl text-ink-2 mb-10 text-balance">
          Your donation has been received and is making a difference in Hawassa.
        </p>

        <div className="animate-fade-up delay-300 bg-white rounded-[28px] border border-black/5 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.3)] p-8 mb-8">
          <p className="text-sm text-ink-2 uppercase tracking-wider mb-1">
            Amount donated
          </p>
          <p className="text-5xl font-semibold text-emerald-600 tracking-tight mb-6">
            ETB {amount}
          </p>
          <div className="pt-6 border-t border-black/8">
            <p className="text-sm text-ink-2 uppercase tracking-wider mb-1">
              Reference
            </p>
            <p className="text-base font-mono text-ink break-all">{reference}</p>
          </div>
        </div>

        <div className="animate-fade-up delay-400 flex flex-col sm:flex-row gap-3 mb-6">
          <button className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-full bg-lake text-white font-medium hover:bg-lake-deep transition-colors">
            <Download className="w-4 h-4" />
            Receipt
          </button>
          <button className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-full bg-mist text-ink font-medium hover:bg-black/[0.06] transition-colors">
            <Share2 className="w-4 h-4" />
            Share
          </button>
        </div>

        <Link
          href="/"
          className="inline-block text-lake font-medium hover:text-lake-deep transition-colors"
        >
          Back to campaign ›
        </Link>
      </div>
    </div>
  );
}

function SuccessPageFallback() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <p className="text-ink-2">Loading…</p>
    </div>
  );
}

export default function SuccessPage(props: {
  searchParams: Promise<{ reference?: string; amount?: string }>;
}) {
  return (
    <Suspense fallback={<SuccessPageFallback />}>
      <SuccessContentWrapper searchParams={props.searchParams} />
    </Suspense>
  );
}

async function SuccessContentWrapper(props: {
  searchParams: Promise<{ reference?: string; amount?: string }>;
}) {
  const searchParams = await props.searchParams;
  const reference = searchParams.reference || "HAWASSA-FUND-001";
  const amount = searchParams.amount || "Unknown";

  return <SuccessContent reference={reference} amount={amount} />;
}
