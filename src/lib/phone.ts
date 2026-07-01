// Normalize an Ethiopian phone number to the local 0XXXXXXXXX format that
// AfroPay expects. Pure + safe on both client and server.
export function normalizeEthiopianPhone(raw: string): string {
  const d = (raw || "").replace(/\D/g, "");
  if (d.startsWith("251")) return "0" + d.slice(3);
  if (d.startsWith("0")) return d;
  if (d.length === 9) return "0" + d; // 9XXXXXXXX -> 09XXXXXXXX
  return d;
}

// A basic Ethiopian mobile: normalizes to 0XXXXXXXXX (10 digits).
export function isValidEthiopianPhone(raw: string): boolean {
  return /^0\d{9}$/.test(normalizeEthiopianPhone(raw));
}

// M-PESA (Safaricom Ethiopia) numbers start with 07 / 7 / 2517.
export function isSafaricom(raw: string): boolean {
  return /^07\d{8}$/.test(normalizeEthiopianPhone(raw));
}
