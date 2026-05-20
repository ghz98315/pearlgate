import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import {
  buildCustomerConfirmationEmail,
  buildAdminNotificationEmail,
  type QuoteFormData,
} from "@/lib/emails";

export async function POST(request: NextRequest) {
  const data: QuoteFormData = await request.json();

  if (!data.name || !data.email || !data.category || !data.product || !data.quantity) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const adminEmail = process.env.ADMIN_EMAIL || "delivered@resend.dev";

  if (!apiKey) {
    console.log("[quote] No RESEND_API_KEY set, skipping emails. Form data:", data);
    return NextResponse.json({ success: true, emailSent: false });
  }

  const resend = new Resend(apiKey);

  try {
    await Promise.all([
      resend.emails.send({
        from: "PearlGate <onboarding@resend.dev>",
        to: data.email,
        subject: "We received your sourcing request — PearlGate",
        html: buildCustomerConfirmationEmail(data),
      }),
      resend.emails.send({
        from: "PearlGate Quotes <onboarding@resend.dev>",
        to: adminEmail,
        subject: `[New Quote] ${data.category} — ${data.name}`,
        html: buildAdminNotificationEmail(data),
        replyTo: data.email,
      }),
    ]);

    return NextResponse.json({ success: true, emailSent: true });
  } catch (error) {
    console.error("[quote] Email send failed:", error);
    return NextResponse.json({ success: true, emailSent: false });
  }
}
