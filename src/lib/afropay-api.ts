// SERVER-SIDE AfroPay client. Called only from API routes.
import {
  AFROPAY,
  SITE_URL,
  AFROPAY_STATUS_SUCCESS,
  AFROPAY_STATUS_PENDING,
} from "./afropay-config";
import { normalizeEthiopianPhone } from "./phone";

export interface InitiateParams {
  amount: number;
  currency: string;
  phone: string;
  reference: string; // our MerchantOrderId (donation id)
  description?: string;
}

export interface InitiateResult {
  paymentUrl: string;
  reference: string; // AfroPay transaction reference (TXN...)
  raw: unknown;
}

// Wallet id -> AfroPay initiate endpoint. All share the same request body.
export const INITIATE_PATHS: Record<string, string> = {
  telebirr: "TelebirrUssd/direct/transaction-initiate",
  // NOTE: "CBEBirrUssd" 404s; the live path is "CBEBirr" (like AwashBirr).
  "cbe-birr": "CBEBirr/direct/transaction-initiate",
  mpesa: "MpesaUssd/direct/transaction-initiate",
  awash: "AwashBirr/direct/transaction-initiate",
};

// Initiate a USSD (direct push) payment for a given wallet method.
export async function initiatePayment(
  method: string,
  params: InitiateParams
): Promise<InitiateResult> {
  const path = INITIATE_PATHS[method];
  if (!path) throw new Error(`Unsupported payment method: ${method}`);

  const res = await fetch(`${AFROPAY.baseUrl}/${path}`, {
    method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Api-Key": AFROPAY.apiKey,
      },
      body: JSON.stringify({
        description: params.description || "Hawassa Lakeside Donation",
        imageUrl: `${SITE_URL}/logos/hawassa-city.jpg`,
        amount: params.amount,
        currency: params.currency || "ETB",
        phone: normalizeEthiopianPhone(params.phone),
        MerchantOrderId: params.reference,
        cancelRedirectUrl: `${SITE_URL}/`,
        callbackUrl: `${SITE_URL}/api/afropay/callback`,
        failedRedirectUrl: `${SITE_URL}/`,
        complitedUrl: `${SITE_URL}/`,
        Order: {
          Items: [
            {
              itemName: params.description || "Hawassa Lakeside Donation",
              unitPrice: params.amount,
              quantity: 1,
            },
          ],
        },
      }),
    }
  );

  const text = await res.text();
  let json: {
    isSuccess?: boolean;
    message?: string;
    data?: { paymentUrl?: string; refrence?: string };
  } | null = null;
  try {
    json = text ? JSON.parse(text) : null;
  } catch {
    /* non-JSON response */
  }
  if (!json?.isSuccess || !json?.data?.refrence) {
    throw new Error(
      json?.message || `Payment could not be started (HTTP ${res.status}).`
    );
  }
  return {
    paymentUrl: json.data.paymentUrl as string,
    reference: json.data.refrence as string,
    raw: json.data,
  };
}

export type TxOutcome = "success" | "pending" | "failed";

export interface TxStatus {
  outcome: TxOutcome;
  raw: number | null;
  message?: string;
  data?: unknown;
}

// Fetch a transaction's status from AfroPay.
export async function getTransactionStatus(
  reference: string
): Promise<TxStatus> {
  const res = await fetch(
    `${AFROPAY.baseUrl}/Transaction/GetTransaction?transactionRefrence=${encodeURIComponent(
      reference
    )}`,
    {
      method: "POST",
      headers: { "X-Api-Key": AFROPAY.apiKey },
    }
  );
  const text = await res.text();
  let json: {
    message?: string;
    data?: { status?: number; responseMessage?: string };
  } | null = null;
  try {
    json = text ? JSON.parse(text) : null;
  } catch {
    /* non-JSON */
  }
  const raw =
    typeof json?.data?.status === "number" ? json.data.status : null;
  const message = json?.data?.responseMessage || json?.message;

  let outcome: TxOutcome;
  if (raw === AFROPAY_STATUS_SUCCESS) outcome = "success";
  else if (raw !== null && AFROPAY_STATUS_PENDING.includes(raw))
    outcome = "pending";
  else outcome = "failed";

  return { outcome, raw, message, data: json?.data };
}
