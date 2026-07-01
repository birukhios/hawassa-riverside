import { PrismaClient } from "@prisma/client";

// Reuse a single PrismaClient across hot reloads / serverless invocations.
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

// The default campaign this site fundraises for. Ensures a Campaign row exists.
export const DEFAULT_CAMPAIGN_ID = "hawassa-lakeside";

export async function ensureCampaign() {
  return prisma.campaign.upsert({
    where: { id: DEFAULT_CAMPAIGN_ID },
    update: {},
    create: {
      id: DEFAULT_CAMPAIGN_ID,
      title: "Hawassa Lakeside",
      description:
        "Help build the Hawassa Lakeside — a lakefront park for every family.",
      goalAmount: 5000000,
      currency: "ETB",
      status: "active",
    },
  });
}
