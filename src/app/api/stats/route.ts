import { NextResponse } from "next/server";
import { prisma, ensureCampaign } from "@/lib/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Baseline so the public campaign shows momentum on top of live donations.
const BASE_RAISED = 1250000;
const BASE_DONORS = 842;

export async function GET() {
  try {
    const campaign = await ensureCampaign();
    const successfulDonors = await prisma.donation.count({
      where: { status: "successful" },
    });
    return NextResponse.json({
      raised: BASE_RAISED + (campaign.raisedAmount || 0),
      donors: BASE_DONORS + successfulDonors,
      goal: campaign.goalAmount,
    });
  } catch {
    return NextResponse.json({
      raised: BASE_RAISED,
      donors: BASE_DONORS,
      goal: 5000000,
    });
  }
}
