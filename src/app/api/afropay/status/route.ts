import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getTransactionStatus } from "@/lib/afropay-api";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const reference = request.nextUrl.searchParams.get("reference");
  if (!reference) {
    return NextResponse.json({ error: "reference required" }, { status: 400 });
  }

  try {
    const { outcome, raw, message } = await getTransactionStatus(reference);

    const txn = await prisma.paymentTransaction.findFirst({
      where: { afroPayReference: reference },
    });

    if (txn && txn.status !== "successful" && txn.status !== "failed") {
      if (outcome === "success") {
        // mark txn + donation successful, and bump the campaign total once
        await prisma.paymentTransaction.update({
          where: { id: txn.id },
          data: {
            status: "successful",
            verifiedAt: new Date(),
            gatewayResponse: JSON.stringify({ raw, message }),
          },
        });
        await prisma.donation.update({
          where: { id: txn.donationId },
          data: { status: "successful" },
        });
        await prisma.campaign.update({
          where: { id: txn.campaignId },
          data: { raisedAmount: { increment: txn.amount } },
        });
      } else if (outcome === "failed") {
        await prisma.paymentTransaction.update({
          where: { id: txn.id },
          data: {
            status: "failed",
            gatewayResponse: JSON.stringify({ raw, message }),
          },
        });
        await prisma.donation.update({
          where: { id: txn.donationId },
          data: { status: "failed" },
        });
      }
    }

    return NextResponse.json({ outcome, status: raw, message });
  } catch (error) {
    console.error("status error", error);
    return NextResponse.json(
      { error: "Failed to check status." },
      { status: 500 }
    );
  }
}
