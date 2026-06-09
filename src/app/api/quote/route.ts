import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import {
  buildCustomerConfirmationEmail,
  buildAdminNotificationEmail,
  type QuoteFormData,
} from "@/lib/emails";
import { upsertLead, extractRequestMeta } from "@/lib/leads";

export async function POST(request: NextRequest) {
  const data: QuoteFormData = await request.json();

  if (!data.name || !data.email || !data.category || !data.product || !data.quantity) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const meta = extractRequestMeta(request);
  const leadResult = await upsertLead({
    email: data.email,
    source: "quote",
    fullName: data.name,
    company: data.company ?? null,
    metadata: {
      category: data.category,
      product: data.product,
      quantity: data.quantity,
      targetPrice: data.targetPrice ?? null,
      details: data.details ?? null,
      formSource: data.source ?? null,
    },
    ...meta,
  });

  const apiKey = process.env.RESEND_API_KEY;
  const adminEmail = process.env.ADMIN_EMAIL || "delivered@resend.dev";

  if (!apiKey) {
    return NextResponse.json({
      success: true,
      emailSent: false,
      leadSaved: leadResult.ok,
    });
  }

  const resend = new Resend(apiKey);

  try {
    await Promise.all([
      resend.emails.send({
        from: "PearlGate <Alex.Guan@pearlgatesourcing.com>",
        to: data.email,
        subject: "We received your sourcing request — PearlGate",
        html: buildCustomerConfirmationEmail(data),
      }),
      resend.emails.send({
        from: "PearlGate Quotes <quotes@pearlgatesourcing.com>",
        to: adminEmail,
        subject: `[New Quote] ${data.category} — ${data.name}`,
        html: buildAdminNotificationEmail(data),
        replyTo: data.email,
      }),
    ]);

    return NextResponse.json({
      success: true,
      emailSent: true,
      leadSaved: leadResult.ok,
    });
  } catch {
    return NextResponse.json({
      success: true,
      emailSent: false,
      leadSaved: leadResult.ok,
    });
  }
}
