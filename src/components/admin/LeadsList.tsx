"use client";

import { useEffect, useState } from "react";
import { Download, Filter, RefreshCw, ChevronRight, X } from "lucide-react";

interface LeadRow {
  id: string;
  email: string;
  full_name: string | null;
  company: string | null;
  country: string | null;
  sources: string[];
  score: number;
  status: string;
  first_seen_at: string;
  last_seen_at: string;
  event_count: number;
  last_source: string | null;
}

interface LeadEvent {
  id: string;
  source: string;
  score: number;
  metadata: Record<string, unknown>;
  occurred_at: string;
  user_agent: string | null;
  ip_address: string | null;
  referrer: string | null;
}

const SOURCE_OPTIONS = [
  { value: "", label: "All sources" },
  { value: "newsletter", label: "Newsletter" },
  { value: "resource_download", label: "Resource Download" },
  { value: "register", label: "Register" },
  { value: "quote", label: "Quote" },
  { value: "sample_request", label: "Sample Request" },
];

const STATUS_OPTIONS = [
  { value: "", label: "All statuses" },
  { value: "new", label: "New" },
  { value: "contacted", label: "Contacted" },
  { value: "qualified", label: "Qualified" },
  { value: "converted", label: "Converted" },
  { value: "archived", label: "Archived" },
];

function getAdminHeaders(): HeadersInit {
  if (typeof window === "undefined") return {};
  const pwd = sessionStorage.getItem("admin_password") ?? "";
  return { "x-admin-password": pwd, "Content-Type": "application/json" };
}

export default function LeadsList() {
  const [leads, setLeads] = useState<LeadRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);
  const [source, setSource] = useState("");
  const [status, setStatus] = useState("");
  const [openId, setOpenId] = useState<string | null>(null);
  const [reloadTick, setReloadTick] = useState(0);

  useEffect(() => {
    let alive = true;
    const controller = new AbortController();
    // Fetch-in-effect: official escape hatch for data fetching tied to props/state.
    // Synchronous setState here is intentional to surface the loading skeleton.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLoading(true);
    setErr(null);

    const params = new URLSearchParams();
    if (source) params.set("source", source);
    if (status) params.set("status", status);

    fetch(`/api/admin/leads?${params}`, {
      headers: getAdminHeaders(),
      signal: controller.signal,
    })
      .then(async (res) => {
        if (!res.ok) {
          const j = await res.json().catch(() => ({}));
          throw new Error(j.error ?? `HTTP ${res.status}`);
        }
        return res.json();
      })
      .then((j) => {
        if (alive) setLeads(j.leads ?? []);
      })
      .catch((e) => {
        if (alive && e.name !== "AbortError") {
          setErr(e instanceof Error ? e.message : String(e));
        }
      })
      .finally(() => {
        if (alive) setLoading(false);
      });

    return () => {
      alive = false;
      controller.abort();
    };
  }, [source, status, reloadTick]);

  const reload = () => setReloadTick((t) => t + 1);

  const exportCSV = () => {
    const header =
      "email,full_name,company,country,sources,score,status,event_count,first_seen_at,last_seen_at\n";
    const rows = leads
      .map((l) => {
        const cells = [
          l.email,
          l.full_name ?? "",
          l.company ?? "",
          l.country ?? "",
          (l.sources ?? []).join("|"),
          l.score,
          l.status,
          l.event_count,
          l.first_seen_at,
          l.last_seen_at,
        ];
        return cells
          .map((v) => {
            const s = String(v ?? "");
            return s.includes(",") || s.includes('"')
              ? `"${s.replace(/"/g, '""')}"`
              : s;
          })
          .join(",");
      })
      .join("\n");
    const blob = new Blob([header + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `pearlgate_leads_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <h2 className="text-lg font-semibold flex-1">
          Leads ({leads.length})
        </h2>
        <div className="flex items-center gap-2">
          <Filter size={14} className="text-text-secondary" />
          <select
            value={source}
            onChange={(e) => setSource(e.target.value)}
            className="text-sm border border-border rounded-lg px-2 py-1.5 bg-white"
          >
            {SOURCE_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="text-sm border border-border rounded-lg px-2 py-1.5 bg-white"
          >
            {STATUS_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
          <button
            onClick={reload}
            className="flex items-center gap-1 text-sm text-navy-700 hover:text-navy-900 px-2 py-1.5"
          >
            <RefreshCw size={14} /> Refresh
          </button>
          {leads.length > 0 && (
            <button
              onClick={exportCSV}
              className="flex items-center gap-1 text-sm bg-navy-900 text-white hover:bg-navy-700 font-medium px-3 py-1.5 rounded-lg"
            >
              <Download size={14} /> CSV
            </button>
          )}
        </div>
      </div>

      {err && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3 mb-4">
          {err}
        </div>
      )}

      {loading ? (
        <p className="text-text-secondary text-sm">Loading…</p>
      ) : leads.length === 0 ? (
        <p className="text-text-secondary text-sm">No leads matching filters.</p>
      ) : (
        <div className="bg-white rounded-lg border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-4 py-3 font-medium">Email</th>
                <th className="text-left px-4 py-3 font-medium">Name / Company</th>
                <th className="text-left px-4 py-3 font-medium">Sources</th>
                <th className="text-left px-4 py-3 font-medium">Score</th>
                <th className="text-left px-4 py-3 font-medium">Events</th>
                <th className="text-left px-4 py-3 font-medium">Last seen</th>
                <th className="w-8" />
              </tr>
            </thead>
            <tbody>
              {leads.map((l) => (
                <tr
                  key={l.id}
                  onClick={() => setOpenId(l.id)}
                  className="border-t border-border hover:bg-gray-50 cursor-pointer"
                >
                  <td className="px-4 py-3 font-medium">{l.email}</td>
                  <td className="px-4 py-3 text-text-secondary">
                    {l.full_name ?? "—"}
                    {l.company ? <span className="text-xs"> · {l.company}</span> : null}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1">
                      {(l.sources ?? []).map((s) => (
                        <span
                          key={s}
                          className="text-xs bg-gray-100 px-2 py-0.5 rounded"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-3 font-mono">{l.score}</td>
                  <td className="px-4 py-3 text-text-secondary">{l.event_count}</td>
                  <td className="px-4 py-3 text-text-secondary text-xs">
                    {new Date(l.last_seen_at).toLocaleString()}
                  </td>
                  <td className="px-2"><ChevronRight size={14} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {openId && <LeadDetail id={openId} onClose={() => setOpenId(null)} onUpdated={reload} />}
    </div>
  );
}

function LeadDetail({
  id,
  onClose,
  onUpdated,
}: {
  id: string;
  onClose: () => void;
  onUpdated: () => void;
}) {
  const [data, setData] = useState<{ lead: LeadRow & { notes: string | null }; events: LeadEvent[] } | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let alive = true;
    fetch(`/api/admin/leads/${id}`, { headers: getAdminHeaders() })
      .then(async (r) => {
        if (!r.ok) throw new Error((await r.json()).error ?? `HTTP ${r.status}`);
        return r.json();
      })
      .then((j) => { if (alive) setData(j); })
      .catch((e) => { if (alive) setErr(e instanceof Error ? e.message : String(e)); });
    return () => { alive = false; };
  }, [id]);

  const save = async (patch: Record<string, unknown>) => {
    setSaving(true);
    try {
      const res = await fetch(`/api/admin/leads/${id}`, {
        method: "PATCH",
        headers: getAdminHeaders(),
        body: JSON.stringify(patch),
      });
      if (!res.ok) throw new Error((await res.json()).error ?? `HTTP ${res.status}`);
      onUpdated();
    } catch (e) {
      setErr(e instanceof Error ? e.message : String(e));
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex justify-end" onClick={onClose}>
      <div
        className="bg-white w-full max-w-2xl h-full overflow-y-auto p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Lead detail</h3>
          <button onClick={onClose} className="text-text-secondary hover:text-navy-900">
            <X size={18} />
          </button>
        </div>

        {err && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3 mb-4">
            {err}
          </div>
        )}

        {!data ? (
          <p className="text-text-secondary text-sm">Loading…</p>
        ) : (
          <>
            <div className="grid grid-cols-2 gap-3 text-sm bg-gray-50 rounded-lg p-4 mb-4">
              <Field label="Email" value={data.lead.email} />
              <Field label="Score" value={String(data.lead.score)} />
              <Field label="Name" value={data.lead.full_name ?? "—"} />
              <Field label="Company" value={data.lead.company ?? "—"} />
              <Field label="Country" value={data.lead.country ?? "—"} />
              <Field label="Sources" value={(data.lead.sources ?? []).join(", ")} />
              <Field label="First seen" value={new Date(data.lead.first_seen_at).toLocaleString()} />
              <Field label="Last seen" value={new Date(data.lead.last_seen_at).toLocaleString()} />
            </div>

            <div className="mb-4">
              <label className="block text-xs font-medium mb-1">Status</label>
              <select
                defaultValue={data.lead.status}
                disabled={saving}
                onChange={(e) => save({ status: e.target.value })}
                className="text-sm border border-border rounded-lg px-2 py-1.5 bg-white"
              >
                {STATUS_OPTIONS.filter((s) => s.value).map((s) => (
                  <option key={s.value} value={s.value}>{s.label}</option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-xs font-medium mb-1">Notes</label>
              <textarea
                defaultValue={data.lead.notes ?? ""}
                disabled={saving}
                onBlur={(e) => save({ notes: e.target.value })}
                rows={3}
                className="w-full text-sm border border-border rounded-lg px-3 py-2 bg-white"
              />
            </div>

            <h4 className="font-semibold text-sm mt-6 mb-2">Events ({data.events.length})</h4>
            <div className="space-y-3">
              {data.events.map((ev) => (
                <div key={ev.id} className="border border-border rounded-lg p-3 text-sm">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">{ev.source}</span>
                    <span className="text-xs text-text-secondary">
                      {new Date(ev.occurred_at).toLocaleString()}
                    </span>
                  </div>
                  {Object.keys(ev.metadata ?? {}).length > 0 && (
                    <pre className="text-xs bg-gray-50 rounded p-2 overflow-x-auto">
{JSON.stringify(ev.metadata, null, 2)}
                    </pre>
                  )}
                  {(ev.referrer || ev.ip_address) && (
                    <div className="text-xs text-text-secondary mt-2">
                      {ev.referrer ? <>ref: {ev.referrer}<br /></> : null}
                      {ev.ip_address ? <>ip: {ev.ip_address}</> : null}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-xs text-text-secondary">{label}</div>
      <div className="font-medium break-all">{value}</div>
    </div>
  );
}
