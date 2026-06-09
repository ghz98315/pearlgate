import { getSupabaseAdmin } from "./supabase";

export type LeadSource =
  | "newsletter"
  | "quote"
  | "sample_request"
  | "resource_download"
  | "register";

export const LEAD_SOURCE_SCORE: Record<LeadSource, number> = {
  newsletter: 10,
  resource_download: 20,
  register: 30,
  quote: 50,
  sample_request: 80,
};

export interface UpsertLeadInput {
  email: string;
  source: LeadSource;
  fullName?: string | null;
  company?: string | null;
  country?: string | null;
  whatsapp?: string | null;
  metadata?: Record<string, unknown>;
  userAgent?: string | null;
  ipAddress?: string | null;
  referrer?: string | null;
}

export interface UpsertLeadResult {
  ok: boolean;
  leadId?: string;
  isNew?: boolean;
  error?: string;
}

function normalizeEmail(raw: string): string {
  return raw.trim().toLowerCase();
}

function isSupabaseConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.SUPABASE_SERVICE_ROLE_KEY
  );
}

/**
 * 邮箱闭环管理的核心入口。
 * - leads 表按 email 唯一,sources 数组累积,score 取最大,last_seen_at 推进
 * - lead_events 表记录每次接触的原始 metadata
 * 任何一个外部入口(订阅/询价/请样/下载)都应该调用这个函数。
 */
export async function upsertLead(
  input: UpsertLeadInput
): Promise<UpsertLeadResult> {
  if (!isSupabaseConfigured()) {
    console.warn("[leads] Supabase 未配置,跳过 upsertLead");
    return { ok: false, error: "supabase_not_configured" };
  }

  const email = normalizeEmail(input.email);
  if (!email || !email.includes("@")) {
    return { ok: false, error: "invalid_email" };
  }

  const score = LEAD_SOURCE_SCORE[input.source] ?? 0;
  const supabase = getSupabaseAdmin();

  try {
    const { data: existing, error: selectErr } = await supabase
      .from("leads")
      .select("id, sources, score, full_name, company, country, whatsapp")
      .eq("email", email)
      .maybeSingle();

    if (selectErr) {
      console.error("[leads] 查询失败:", selectErr);
      return { ok: false, error: selectErr.message };
    }

    let leadId: string;
    let isNew = false;

    if (existing) {
      const sources: string[] = Array.isArray(existing.sources)
        ? existing.sources
        : [];
      if (!sources.includes(input.source)) sources.push(input.source);

      const nextScore = Math.max(existing.score ?? 0, score);

      const patch: Record<string, unknown> = {
        sources,
        score: nextScore,
        last_seen_at: new Date().toISOString(),
        full_name: existing.full_name ?? input.fullName ?? null,
        company: existing.company ?? input.company ?? null,
        country: existing.country ?? input.country ?? null,
        whatsapp: existing.whatsapp ?? input.whatsapp ?? null,
      };

      const { error: updErr } = await supabase
        .from("leads")
        .update(patch)
        .eq("id", existing.id);

      if (updErr) {
        console.error("[leads] 更新失败:", updErr);
        return { ok: false, error: updErr.message };
      }
      leadId = existing.id as string;
    } else {
      const { data: inserted, error: insErr } = await supabase
        .from("leads")
        .insert([
          {
            email,
            full_name: input.fullName ?? null,
            company: input.company ?? null,
            country: input.country ?? null,
            whatsapp: input.whatsapp ?? null,
            sources: [input.source],
            score,
          },
        ])
        .select("id")
        .single();

      if (insErr || !inserted) {
        console.error("[leads] 插入失败:", insErr);
        return { ok: false, error: insErr?.message ?? "insert_failed" };
      }
      leadId = inserted.id as string;
      isNew = true;
    }

    const { error: evtErr } = await supabase.from("lead_events").insert([
      {
        lead_id: leadId,
        source: input.source,
        score,
        metadata: input.metadata ?? {},
        user_agent: input.userAgent ?? null,
        ip_address: input.ipAddress ?? null,
        referrer: input.referrer ?? null,
      },
    ]);

    if (evtErr) {
      console.error("[leads] 事件流水写入失败(主表已更新):", evtErr);
    }

    return { ok: true, leadId, isNew };
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("[leads] upsertLead 异常:", err);
    return { ok: false, error: msg };
  }
}

export function extractRequestMeta(req: Request): {
  userAgent: string | null;
  ipAddress: string | null;
  referrer: string | null;
} {
  const userAgent = req.headers.get("user-agent");
  const fwd = req.headers.get("x-forwarded-for");
  const ipAddress = fwd ? fwd.split(",")[0].trim() : null;
  const referrer = req.headers.get("referer");
  return {
    userAgent,
    ipAddress,
    referrer,
  };
}
