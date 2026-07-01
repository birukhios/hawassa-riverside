import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// List donations (for the admin overview / recent donors).
export async function GET(request: NextRequest) {
  try {
    const status = request.nextUrl.searchParams.get("status") || undefined;
    const donations = await prisma.donation.findMany({
      where: status ? { status } : undefined,
      orderBy: { createdAt: "desc" },
      take: 200,
    });

    return NextResponse.json({
      donations: donations.map((d) => ({
        id: d.id,
        name: d.isAnonymous ? "Anonymous" : d.donorName || "Anonymous",
        amount: d.amount,
        currency: d.currency,
        message: d.message,
        status: d.status,
        reference: d.afroPayReference,
        createdAt: d.createdAt,
      })),
    });
  } catch (error) {
    console.error("donations list error", error);
    return NextResponse.json(
      { error: "Failed to load donations." },
      { status: 500 }
    );
  }
}
