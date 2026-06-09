import { NextRequest, NextResponse } from "next/server";
import { createUser } from "@/lib/auth";
import { upsertLead, extractRequestMeta } from "@/lib/leads";

export async function POST(request: NextRequest) {
  const { email, password, name } = await request.json();

  if (!email || !password || !name) {
    return NextResponse.json({ error: "All fields are required" }, { status: 400 });
  }

  if (password.length < 6) {
    return NextResponse.json({ error: "Password must be at least 6 characters" }, { status: 400 });
  }

  const user = await createUser(email, password, name);

  if (!user) {
    return NextResponse.json({ error: "Email already registered" }, { status: 409 });
  }

  // 同步到统一 leads 表(邮箱闭环)
  const reqMeta = extractRequestMeta(request);
  await upsertLead({
    email,
    source: "register",
    fullName: name,
    metadata: { userId: user.id },
    ...reqMeta,
  });

  return NextResponse.json({ success: true });
}
