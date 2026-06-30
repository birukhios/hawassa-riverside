import { NextRequest, NextResponse } from "next/server";

interface AfroPayWebhook {
  event: string;
  reference: string;
  amount: number;
  currency: string;
  status: string;
  timestamp: string;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as AfroPayWebhook;

    // Verify webhook signature (in production, verify the signature)
    // const signature = request.headers.get("x-afropay-signature");
    // if (!verifySignature(body, signature)) {
    //   return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    // }

    // Handle different events
    switch (body.event) {
      case "payment.success":
        return handlePaymentSuccess(body);
      case "payment.failed":
        return handlePaymentFailed(body);
      case "payment.pending":
        return handlePaymentPending(body);
      default:
        return NextResponse.json(
          { message: "Event received but not handled" },
          { status: 200 }
        );
    }
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 500 }
    );
  }
}

async function handlePaymentSuccess(webhook: AfroPayWebhook) {
  // In production:
  // 1. Find donation by afroPayReference
  // 2. Update donation status to "successful"
  // 3. Update campaign raisedAmount
  // 4. Send confirmation email
  // 5. Create payment transaction record

  console.log("Payment successful:", webhook.reference, webhook.amount);

  // For now, just acknowledge receipt
  return NextResponse.json(
    { message: "Payment processed successfully" },
    { status: 200 }
  );
}

async function handlePaymentFailed(webhook: AfroPayWebhook) {
  // Update donation status to "failed"
  console.log("Payment failed:", webhook.reference);

  return NextResponse.json(
    { message: "Payment failure recorded" },
    { status: 200 }
  );
}

async function handlePaymentPending(webhook: AfroPayWebhook) {
  // Update donation status to "processing"
  console.log("Payment pending:", webhook.reference);

  return NextResponse.json(
    { message: "Payment status recorded" },
    { status: 200 }
  );
}
