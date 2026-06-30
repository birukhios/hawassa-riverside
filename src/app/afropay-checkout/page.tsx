import { Suspense } from "react";
import AfroPayCheckout from "@/components/AfroPayCheckout";

function Fallback() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <p className="text-gray-500">Loading secure checkout…</p>
    </div>
  );
}

export default function AfroPayCheckoutPage(props: {
  searchParams: Promise<{
    amount?: string;
    currency?: string;
    reference?: string;
  }>;
}) {
  return (
    <Suspense fallback={<Fallback />}>
      <CheckoutWrapper searchParams={props.searchParams} />
    </Suspense>
  );
}

async function CheckoutWrapper(props: {
  searchParams: Promise<{
    amount?: string;
    currency?: string;
    reference?: string;
  }>;
}) {
  const sp = await props.searchParams;
  const amount = parseFloat(sp.amount || "0") || 0;
  const currency = sp.currency || "ETB";
  const reference = sp.reference || "AFROPAY-REF";

  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-10">
      <AfroPayCheckout
        amount={amount}
        currency={currency}
        reference={reference}
      />
    </main>
  );
}
