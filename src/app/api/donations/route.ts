import { NextRequest, NextResponse } from "next/server";
import { createDonation, listDonations } from "@/lib/store";

interface DonationRequest {
  amount: number;
  currency: string;
  donorName?: string;
  donorEmail?: string;
  donorPhone?: string;
  message?: string;
  isAnonymous: boolean;
  campaignId: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: DonationRequest = await request.json();

    if (!body.amount || body.amount < 50) {
      return NextResponse.json(
        { error: "Amount must be at least ETB 50" },
        { status: 400 }
      );
    }

    // Generate AfroPay reference and create a pending donation record
    const afroPayReference = `APR-${Date.now()}-${Math.random()
      .toString(36)
      .slice(2, 9)
      .toUpperCase()}`;

    const donation = createDonation({
      reference: afroPayReference,
      amount: body.amount,
      currency: body.currency || "ETB",
      donorName: body.donorName,
      donorEmail: body.donorEmail,
      donorPhone: body.donorPhone,
      isAnonymous: !!body.isAnonymous,
      message: body.message,
    });

    // In production: call AfroPay Checkout init API to get a hosted URL.
    const checkoutUrl = `/afropay-checkout?reference=${afroPayReference}&amount=${body.amount}&currency=${body.currency || "ETB"}`;

    return NextResponse.json(
      {
        success: true,
        donationId: donation.id,
        afroPayReference,
        checkoutUrl,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating donation:", error);
    return NextResponse.json(
      { error: "Failed to create donation" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const status = request.nextUrl.searchParams.get("status");
    let result = listDonations();
    if (status) result = result.filter((d) => d.status === status);

    const donations = result.map((d) => ({
      id: d.id,
      reference: d.reference,
      amount: d.amount,
      currency: d.currency,
      name: d.isAnonymous ? "Anonymous" : d.donorName || "Anonymous",
      message: d.message,
      method: d.method,
      status: d.status,
      createdAt: d.createdAt,
    }));

    return NextResponse.json({ donations }, { status: 200 });
  } catch (error) {
    console.error("Error fetching donations:", error);
    return NextResponse.json(
      { error: "Failed to fetch donations" },
      { status: 500 }
    );
  }
}
