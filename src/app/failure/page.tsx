import { Suspense } from "react";
import { X, RotateCcw } from "lucide-react";
import Link from "next/link";

function FailureContent({
  reference,
  reason,
}: {
  reference: string | null;
  reason: string;
}) {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6 py-16 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-gradient-to-b from-rose-100 via-orange-50 to-transparent blur-3xl opacity-80" />
      </div>

      <div className="relative max-w-lg w-full text-center">
        <div className="flex justify-center mb-8 animate-fade-up">
          <div className="w-20 h-20 rounded-full bg-rose-500 flex items-center justify-center shadow-[0_20px_50px_-15px_rgba(244,63,94,0.5)]">
            <X className="w-10 h-10 text-white" strokeWidth={3} />
          </div>
        </div>

        <h1 className="animate-fade-up delay-100 text-5xl sm:text-6xl font-semibold text-ink mb-4 text-balance">
          Payment didn&apos;t go through.
        </h1>
        <p className="animate-fade-up delay-200 text-xl text-ink-2 mb-10 text-balance">
          No charge was made. You can try again whenever you&apos;re ready.
        </p>

        <div className="animate-fade-up delay-300 bg-white rounded-[28px] border border-black/5 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.3)] p-8 mb-8 text-left">
          <p className="text-sm text-ink-2 uppercase tracking-wider mb-1">
            Reason
          </p>
          <p className="text-base text-ink mb-4">{reason}</p>
          {reference && (
            <div className="pt-4 border-t border-black/8">
              <p className="text-sm text-ink-2 uppercase tracking-wider mb-1">
                Reference
              </p>
              <p className="text-base font-mono text-ink break-all">
                {reference}
              </p>
            </div>
          )}
        </div>

        <div className="animate-fade-up delay-400 flex flex-col sm:flex-row gap-3 mb-6">
          <Link
            href="/#donate"
            className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-full bg-lake text-white font-medium hover:bg-lake-deep transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            Try again
          </Link>
          <Link
            href="/"
            className="flex-1 flex items-center justify-center py-3.5 rounded-full bg-mist text-ink font-medium hover:bg-black/[0.06] transition-colors"
          >
            Return home
          </Link>
        </div>

        <a
          href="mailto:support@hawassafund.org"
          className="inline-block text-lake font-medium hover:text-lake-deep transition-colors"
        >
          Contact support ›
        </a>
      </div>
    </div>
  );
}

function FailurePageFallback() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <p className="text-ink-2">Loading…</p>
    </div>
  );
}

export default function FailurePage(props: {
  searchParams: Promise<{ reference?: string; reason?: string }>;
}) {
  return (
    <Suspense fallback={<FailurePageFallback />}>
      <FailureContentWrapper searchParams={props.searchParams} />
    </Suspense>
  );
}

async function FailureContentWrapper(props: {
  searchParams: Promise<{ reference?: string; reason?: string }>;
}) {
  const searchParams = await props.searchParams;
  const reference = searchParams.reference || null;
  const reason = searchParams.reason || "Payment was not processed";

  return <FailureContent reference={reference} reason={reason} />;
}
