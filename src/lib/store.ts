// Lightweight in-memory store for the demo flow. Persists across hot reloads
// and route modules via globalThis. Swap for Prisma/DB in production.

export type DonationStatus =
  | "pending"
  | "processing"
  | "successful"
  | "failed"
  | "cancelled";

export interface DonationRecord {
  id: string;
  reference: string;
  amount: number;
  currency: string;
  donorName?: string;
  donorEmail?: string;
  donorPhone?: string;
  isAnonymous: boolean;
  message?: string;
  method?: string; // wallet/bank/card brand used
  status: DonationStatus;
  createdAt: string;
  verifiedAt?: string;
}

interface Store {
  donations: Map<string, DonationRecord>;
  // seed baseline so the public campaign shows momentum
  baseRaised: number;
  baseDonors: number;
}

const g = globalThis as unknown as { __hawassaStore?: Store };

export const store: Store =
  g.__hawassaStore ||
  (g.__hawassaStore = {
    donations: new Map(),
    baseRaised: 1250000,
    baseDonors: 842,
  });

export function createDonation(
  data: Omit<DonationRecord, "id" | "status" | "createdAt">
): DonationRecord {
  const id = `dn_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
  const record: DonationRecord = {
    ...data,
    id,
    status: "pending",
    createdAt: new Date().toISOString(),
  };
  store.donations.set(record.reference, record);
  return record;
}

export function getByReference(reference: string) {
  return store.donations.get(reference);
}

export function markSuccessful(reference: string, method?: string) {
  const d = store.donations.get(reference);
  if (!d) return undefined;
  d.status = "successful";
  d.verifiedAt = new Date().toISOString();
  if (method) d.method = method;
  return d;
}

export function markFailed(reference: string) {
  const d = store.donations.get(reference);
  if (!d) return undefined;
  d.status = "failed";
  return d;
}

export function listDonations() {
  return [...store.donations.values()].sort((a, b) =>
    b.createdAt.localeCompare(a.createdAt)
  );
}

export function getStats() {
  const all = listDonations();
  const successful = all.filter((d) => d.status === "successful");
  const raised =
    store.baseRaised + successful.reduce((s, d) => s + d.amount, 0);
  const donors = store.baseDonors + successful.length;
  return {
    raised,
    donors,
    goal: 5000000,
    successful: successful.length,
    pending: all.filter((d) => d.status === "pending").length,
    failed: all.filter((d) => d.status === "failed").length,
    total: all.length,
  };
}
