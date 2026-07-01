import { NextRequest, NextResponse } from "next/server";
import { prisma, ensureCampaign, DEFAULT_CAMPAIGN_ID } from "@/lib/prisma";
import { initiatePayment, INITIATE_PATHS } from "@/lib/afropay-api";
import { isValidEthiopianPhone, isSafaricom } from "@/lib/phone";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const method = String(body.method || "");
    const amount = Number(body.amount);
    const currency = body.currency || "ETB";
    const phone = String(body.phone || "");

    if (!INITIATE_PATHS[method]) {
      return NextResponse.json(
        { error: "Unsupported payment method." },
        { status: 400 }
      );
    }
    if (!amount || amount < 1) {
      return NextResponse.json({ error: "Invalid amount." }, { status: 400 });
    }
    // M-PESA requires a Safaricom number (07 / 7 / 2517); others any Ethiopian.
    if (method === "mpesa") {
      if (!isSafaricom(phone)) {
        return NextResponse.json(
          { error: "Enter a valid Safaricom (M-PESA) number — starts with 07." },
          { status: 400 }
        );
      }
    } else if (!isValidEthiopianPhone(phone)) {
      return NextResponse.json(
        { error: "Enter a valid phone number." },
        { status: 400 }
      );
    }

    await ensureCampaign();

    const donation = await prisma.donation.create({
      data: {
        campaignId: DEFAULT_CAMPAIGN_ID,
        donorName: body.isAnonymous ? null : body.donorName || null,
        donorPhone: body.donorPhone || phone,
        amount,
        currency,
        isAnonymous: !!body.isAnonymous,
        message: body.message || null,
        status: "pending",
      },
    });

    let init;
    try {
      init = await initiatePayment(method, {
        amount,
        currency,
        phone,
        reference: donation.id,
        description: "Hawassa Lakeside Donation",
      });
    } catch (e) {
      await prisma.donation.update({
        where: { id: donation.id },
        data: { status: "failed" },
      });
      return NextResponse.json(
        {
          error:
            e instanceof Error ? e.message : "Could not start the payment.",
        },
        { status: 502 }
      );
    }

    await prisma.paymentTransaction.create({
      data: {
        donationId: donation.id,
        campaignId: DEFAULT_CAMPAIGN_ID,
        provider: method,
        afroPayReference: init.reference,
        internalReference: donation.id,
        amount,
        currency,
        status: "pending",
        gatewayResponse: JSON.stringify(init.raw),
      },
    });
    await prisma.donation.update({
      where: { id: donation.id },
      data: { afroPayReference: init.reference, status: "processing" },
    });

    return NextResponse.json(
      {
        reference: init.reference,
        paymentUrl: init.paymentUrl,
        donationId: donation.id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("initiate error", error);
    return NextResponse.json(
      { error: "Failed to initiate payment." },
      { status: 500 }
    );
  }
}
