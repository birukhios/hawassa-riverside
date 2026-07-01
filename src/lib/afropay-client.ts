// Browser-side helpers that call our OWN internal API routes (same-origin, no
// CORS, no exposed key). The server routes talk to AfroPay.

export interface DonorInfo {
  donorName?: string;
  donorPhone?: string;
  message?: string;
  isAnonymous?: boolean;
}

export interface InitiatePayload extends DonorInfo {
  method: string; // wallet id: telebirr | cbe-birr | mpesa | awash
  amount: number;
  currency: string;
  phone: string; // wallet phone for the USSD push
}

export interface InitiateResponse {
  reference: string;
  paymentUrl?: string;
  donationId: string;
}

export async function startWalletPayment(
  payload: InitiatePayload
): Promise<InitiateResponse> {
  const res = await fetch("/api/afropay/initiate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const json = await res.json();
  if (!res.ok || !json?.reference) {
    throw new Error(json?.error || "Could not start the Telebirr payment.");
  }
  return json;
}

export type PaymentOutcome = "success" | "pending" | "failed";

export async function checkPaymentStatus(
  reference: string
): Promise<{ outcome: PaymentOutcome; message?: string }> {
  const res = await fetch(
    `/api/afropay/status?reference=${encodeURIComponent(reference)}`
  );
  const json = await res.json();
  if (!res.ok) throw new Error(json?.error || "Status check failed");
  return { outcome: json.outcome, message: json.message };
}
