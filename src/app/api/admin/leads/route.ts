import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";

function checkAdminAuth(request: NextRequest): boolean {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return false;
  const provided = request.headers.get("x-admin-password");
  return provided === expected;
}

export async function GET(request: NextRequest) {
  if (!checkAdminAuth(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const source = searchParams.get("source");
  const status = searchParams.get("status");
  const limit = Math.min(Number(searchParams.get("limit") ?? 500), 2000);

  const supabase = getSupabaseAdmin();
  let query = supabase
    .from("leads_overview")
    .select("*")
    .order("score", { ascending: false })
    .order("last_seen_at", { ascending: false })
    .limit(limit);

  if (source) query = query.contains("sources", [source]);
  if (status) query = query.eq("status", status);

  const { data, error } = await query;
  if (error) {
    console.error("[admin/leads] 查询失败:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ leads: data ?? [], count: data?.length ?? 0 });
}
