// AfroPay payment gateway configuration — SERVER-SIDE ONLY.
//
// This file is imported only by API routes (never by client components), so the
// key does NOT ship in the browser bundle. Override with env vars in your host;
// the literals below are fallbacks for local/dev.
export const AFROPAY = {
  baseUrl:
    process.env.AFROPAY_BASE_URL || "https://paybridge.afropays.co/api/v1",
  // Set AFROPAY_API_KEY in your host env (or .env.local for dev). Not hardcoded
  // so it never lands in the public repo.
  apiKey: process.env.AFROPAY_API_KEY || "",
};

// Public site URL used for AfroPay redirect/callback URLs.
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

// Transaction status codes (per AfroPay): 2 = success; 0/1 = still pending
// (keep polling); anything else is treated as failed.
export const AFROPAY_STATUS_SUCCESS = 2;
export const AFROPAY_STATUS_PENDING = [0, 1];
