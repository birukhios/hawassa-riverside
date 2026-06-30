import { NextRequest, NextResponse } from "next/server";
import { getByReference, markSuccessful } from "@/lib/store";

interface VerifyRequest {
  reference: string;
  method?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: VerifyRequest = await request.json();

    if (!body.reference) {
      return NextResponse.json(
        { error: "Reference is required" },
        { status: 400 }
      );
    }

    const donation = getByReference(body.reference);
    if (!donation) {
      return NextResponse.json(
        { error: "Donation not found" },
        { status: 404 }
      );
    }

    // In production: call AfroPay's verify endpoint and only mark successful
    // if the gateway confirms payment. Here we confirm the pending donation.
    const updated = markSuccessful(body.reference, body.method);

    return NextResponse.json(
      {
        verified: true,
        reference: body.reference,
        status: updated?.status,
        amount: updated?.amount,
        currency: updated?.currency,
        verifiedAt: updated?.verifiedAt,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Verification error:", error);
    return NextResponse.json({ error: "Verification failed" }, { status: 500 });
  }
}
