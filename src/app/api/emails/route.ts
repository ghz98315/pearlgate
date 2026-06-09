import { NextRequest, NextResponse } from "next/server";
import { upsertLead, extractRequestMeta, type LeadSource } from "@/lib/leads";

const ALLOWED_SOURCES: LeadSource[] = [
  "newsletter",
  "quote",
  "sample_request",
  "resource_download",
  "register",
];

function coerceSource(raw: unknown): LeadSource {
  if (typeof raw === "string" && (ALLOWED_SOURCES as string[]).includes(raw)) {
    return raw as LeadSource;
  }
  return "newsletter";
}

export async function POST(request: NextRequest) {
  let payload: { email?: string; source?: string };
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const email = payload.email?.toString() ?? "";
  if (!email || !email.includes("@")) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  const source = coerceSource(payload.source);
  const meta = extractRequestMeta(request);

  const result = await upsertLead({
    email,
    source,
    metadata: { rawSource: payload.source ?? null },
    ...meta,
  });

  if (!result.ok) {
    return NextResponse.json(
      { error: result.error ?? "save_failed" },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true, isNew: result.isNew });
}
