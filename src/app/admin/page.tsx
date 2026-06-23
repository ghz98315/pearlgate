"use client";

import { useState, useEffect, useSyncExternalStore } from "react";
import { Database, FileText, Users, Copy, Lock } from "lucide-react";
import dynamic from "next/dynamic";
import LeadsList from "@/components/admin/LeadsList";

const MDEditor = dynamic(
  () => import("@uiw/react-md-editor").then((mod) => mod.default),
  { ssr: false }
);

type Tab = "suppliers" | "blog" | "leads";

const AUTH_KEY = "admin_authenticated";
const authStoreSubscribers = new Set<() => void>();

function subscribeAuth(cb: () => void) {
  authStoreSubscribers.add(cb);
  const handler = () => cb();
  window.addEventListener("storage", handler);
  return () => {
    authStoreSubscribers.delete(cb);
    window.removeEventListener("storage", handler);
  };
}
function getAuthSnapshot() {
  return sessionStorage.getItem(AUTH_KEY) === "true";
}
function notifyAuthChange() {
  authStoreSubscribers.forEach((cb) => cb());
}

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<Tab>("suppliers");
  const authed = useSyncExternalStore(
    subscribeAuth,
    getAuthSnapshot,
    () => false
  );

  if (!authed) return <PasswordGate onSuccess={notifyAuthChange} />;

  return (
    <div className="min-h-screen bg-gray-50 p-6 lg:p-12">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold font-[family-name:var(--font-serif)]">
          PearlGate Admin
        </h1>
        <p className="text-text-secondary text-sm mt-1">Manage suppliers, blog posts, and leads.</p>

        {/* Tabs */}
        <div className="mt-6 flex gap-2 border-b border-border">
          <TabButton active={activeTab === "suppliers"} onClick={() => setActiveTab("suppliers")} icon={Database} label="Suppliers" />
          <TabButton active={activeTab === "blog"} onClick={() => setActiveTab("blog")} icon={FileText} label="Blog" />
          <TabButton active={activeTab === "leads"} onClick={() => setActiveTab("leads")} icon={Users} label="Leads" />
        </div>

        <div className="mt-8">
          {activeTab === "suppliers" && <SupplierForm />}
          {activeTab === "blog" && (
            <div className="space-y-8">
              <DraftsList />
              <BlogForm />
            </div>
          )}
          {activeTab === "leads" && <LeadsList />}
        </div>
      </div>
    </div>
  );
}

function PasswordGate({ onSuccess }: { onSuccess: () => void }) {
  const [pwd, setPwd] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setErr(null);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: pwd }),
      });
      if (!res.ok) {
        setErr("Invalid password");
        return;
      }
      sessionStorage.setItem(AUTH_KEY, "true");
      sessionStorage.setItem("admin_password", pwd);
      onSuccess();
    } catch {
      setErr("Login failed");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <form onSubmit={submit} className="bg-white rounded-2xl border border-border p-8 w-full max-w-sm">
        <div className="flex items-center gap-2 mb-2">
          <Lock size={18} />
          <h2 className="font-semibold">Admin login</h2>
        </div>
        <p className="text-xs text-text-secondary mb-4">Enter the admin password to continue.</p>
        <input
          type="password"
          autoFocus
          value={pwd}
          onChange={(e) => setPwd(e.target.value)}
          placeholder="Password"
          className="w-full px-3 py-2.5 rounded-lg border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-navy-700/20 mb-3"
        />
        {err && <p className="text-xs text-red-600 mb-3">{err}</p>}
        <button
          type="submit"
          disabled={busy || !pwd}
          className="w-full bg-navy-900 hover:bg-navy-700 disabled:opacity-50 text-white font-medium py-2.5 rounded-lg text-sm"
        >
          {busy ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </div>
  );
}

function TabButton({ active, onClick, icon: Icon, label }: { active: boolean; onClick: () => void; icon: typeof Database; label: string }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 transition-colors -mb-px ${
        active ? "border-navy-900 text-navy-900" : "border-transparent text-text-secondary hover:text-navy-700"
      }`}
    >
      <Icon size={16} />
      {label}
    </button>
  );
}

function SupplierForm() {
  const [output, setOutput] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    const supplier = {
      id: String(data.get("name")).toLowerCase().replace(/[^a-z0-9]+/g, "-").slice(0, 40),
      name: data.get("name"),
      nameZh: data.get("nameZh"),
      city: data.get("city"),
      cluster: data.get("cluster"),
      established: Number(data.get("established")),
      employees: data.get("employees"),
      categories: String(data.get("categories")).split(",").map(s => s.trim()),
      certifications: String(data.get("certifications")).split(",").map(s => s.trim()),
      isDirectFactory: data.get("isDirectFactory") === "on",
      verifiedDate: data.get("verifiedDate"),
      cooperationRating: Number(data.get("cooperationRating")),
      qualityRating: Number(data.get("qualityRating")),
      moq: data.get("moq"),
      priceRange: data.get("priceRange"),
      sampleLeadTime: data.get("sampleLeadTime"),
      productionLeadTime: data.get("productionLeadTime"),
      paymentMethods: String(data.get("paymentMethods")).split(",").map(s => s.trim()),
      shippingPort: data.get("shippingPort"),
      images: String(data.get("images")).split(",").map(s => s.trim()),
      productImages: String(data.get("productImages")).split(",").map(s => s.trim()),
      contactName: data.get("contactName"),
      contactEmail: data.get("contactEmail"),
      contactWechat: data.get("contactWechat"),
      description: data.get("description"),
      specialties: String(data.get("specialties")).split(",").map(s => s.trim()),
      isFree: data.get("isFree") === "on",
    };

    setOutput(JSON.stringify(supplier, null, 2));
  };

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Add New Supplier</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input name="name" label="Factory Name (English)" required />
          <Input name="nameZh" label="Factory Name (Chinese)" />
          <Input name="city" label="City" placeholder="e.g., Yangjiang" required />
          <Select name="cluster" label="Cluster" options={["Knives & Hand Tools", "Precision Parts & OEM", "Aluminum & Building Hardware", "Workwear & Corporate Uniforms"]} />
          <Input name="established" label="Established Year" type="number" required />
          <Input name="employees" label="Employees" placeholder="e.g., 200-500" />
          <Input name="categories" label="Categories (comma separated)" placeholder="Kitchen Knives, Chef Knives" required />
          <Input name="certifications" label="Certifications (comma separated)" placeholder="ISO 9001, FDA, SGS" />
          <Input name="moq" label="MOQ" placeholder="e.g., 500 pieces" />
          <Input name="priceRange" label="Price Range" placeholder="e.g., $3-12 per unit" />
          <Input name="sampleLeadTime" label="Sample Lead Time" placeholder="e.g., 5-7 days" />
          <Input name="productionLeadTime" label="Production Lead Time" placeholder="e.g., 20-30 days" />
          <Input name="paymentMethods" label="Payment Methods (comma separated)" placeholder="T/T, PayPal, L/C" />
          <Input name="shippingPort" label="Shipping Port" placeholder="e.g., Guangzhou Port" />
          <Input name="verifiedDate" label="Verified Date" type="date" />
          <Input name="cooperationRating" label="Cooperation Rating (1-5)" type="number" />
          <Input name="qualityRating" label="Quality Rating (1-5)" type="number" />
          <Input name="contactName" label="Contact Person" />
          <Input name="contactEmail" label="Contact Email" />
          <Input name="contactWechat" label="Contact WeChat" />
          <Input name="images" label="Factory Images (URLs, comma separated)" />
          <Input name="productImages" label="Product Images (URLs, comma separated)" />
          <Input name="specialties" label="Specialties (comma separated)" />
        </div>
        <Textarea name="description" label="Description" rows={4} />
        <div className="flex gap-6">
          <Checkbox name="isDirectFactory" label="Direct Factory (not trading company)" />
          <Checkbox name="isFree" label="Free tier (visible without subscription)" />
        </div>
        <button type="submit" className="bg-navy-900 hover:bg-navy-800 text-white font-semibold px-6 py-3 rounded-lg transition-colors">
          Generate JSON
        </button>
      </form>

      {output && (
        <div className="mt-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-sm">Generated JSON (copy to suppliers.ts)</h3>
            <button onClick={() => navigator.clipboard.writeText(output)} className="flex items-center gap-1 text-xs text-navy-700 hover:text-navy-900">
              <Copy size={12} /> Copy
            </button>
          </div>
          <pre className="bg-navy-900 text-white p-4 rounded-lg text-xs overflow-x-auto max-h-96">{output}</pre>
        </div>
      )}
    </div>
  );
}

const VALID_CATEGORIES = ["Sourcing Guide", "Technical Guide", "Market Analysis", "Certification Guide", "Supplier Verification"];

function DraftsList() {
  const [drafts, setDrafts] = useState<{ id: string; slug: string; title: string; date: string }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/blog_posts?status=eq.draft&select=id,slug,title,created_at&order=created_at.desc`, {
      headers: { apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "", Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""}` },
    })
      .then(r => r.json())
      .then(d => { setDrafts(Array.isArray(d) ? d.map((p: any) => ({ id: p.id, slug: p.slug, title: p.title, date: p.created_at?.slice(0, 10) })) : []); })
      .finally(() => setLoading(false));
  });

  if (loading) return <p className="text-sm text-gray-400">Loading drafts…</p>;
  if (!drafts.length) return null;

  return (
    <div>
      <h2 className="text-lg font-semibold mb-3">草稿箱 ({drafts.length})</h2>
      <div className="divide-y divide-border rounded-xl border border-border overflow-hidden">
        {drafts.map(d => (
          <div key={d.id} className="flex items-center justify-between px-4 py-3 bg-white hover:bg-gray-50">
            <div>
              <p className="text-sm font-medium text-navy-900">{d.title}</p>
              <p className="text-xs text-gray-400 font-mono">{d.slug} · {d.date}</p>
            </div>
            <a href={`/blog/${d.slug}?preview=true`} target="_blank" rel="noreferrer"
              className="text-xs font-medium text-orange-600 hover:text-orange-800 underline">
              预览 / 发布 →
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

function BlogForm() {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [metaDesc, setMetaDesc] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState(VALID_CATEGORIES[0]);
  const [readTime, setReadTime] = useState("");
  const [tags, setTags] = useState("");
  const [status, setStatus] = useState<"draft" | "published">("draft");
  const [featuredUrl, setFeaturedUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<{ ok: boolean; msg: string; previewUrl?: string } | null>(null);

  const pw = () => typeof window !== "undefined" ? sessionStorage.getItem("admin_password") ?? "" : "";

  const autoSlug = (t: string) => t.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 60);

  const uploadFile = async (file: File): Promise<string> => {
    const fd = new FormData(); fd.append("file", file);
    const r = await fetch("/api/upload-image", { method: "POST", body: fd });
    const j = await r.json();
    if (!r.ok) throw new Error(j.error);
    return j.url;
  };

  const onFeaturedPick = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; if (!file) return;
    setUploading(true);
    try { setFeaturedUrl(await uploadFile(file)); } catch (err: any) { alert("Upload failed: " + err.message); }
    finally { setUploading(false); }
  };

  const onInlineImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; if (!file) return;
    setUploading(true);
    try {
      const url = await uploadFile(file);
      const md = `![${file.name.replace(/\.[^.]+$/, "")}](${url})`;
      await navigator.clipboard.writeText(md);
      alert("Copied to clipboard:\n" + md);
    } catch (err: any) { alert("Upload failed: " + err.message); }
    finally { setUploading(false); e.target.value = ""; }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true); setResult(null);
    try {
      const res = await fetch("/api/blog/create", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${pw()}` },
        body: JSON.stringify({
          title, slug, content,
          metaDescription: metaDesc,
          category, readTime,
          tags: tags.split(",").map(s => s.trim()).filter(Boolean),
          featuredImage: featuredUrl,
          status,
        }),
      });
      const j = await res.json();
      if (j.success) {
        setResult({ ok: true, msg: `✓ ${j.message}`, previewUrl: j.previewUrl });
      } else {
        const detail = j.details ? "\n" + Object.entries(j.details).map(([k, v]) => `• ${k}: ${v}`).join("\n") : "";
        setResult({ ok: false, msg: j.error + detail });
      }
    } catch (err: any) {
      setResult({ ok: false, msg: err.message });
    } finally { setBusy(false); }
  };

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Add New Blog Post</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title + Slug */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium mb-1">Title *</label>
            <input value={title} onChange={e => { setTitle(e.target.value); setSlug(autoSlug(e.target.value)); }}
              className="w-full px-3 py-2 rounded-lg border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-navy-700/20" required />
          </div>
          <div>
            <label className="block text-xs font-medium mb-1">Slug *</label>
            <input value={slug} onChange={e => setSlug(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-navy-700/20 font-mono" required />
          </div>
        </div>

        {/* Meta description */}
        <div>
          <label className="block text-xs font-medium mb-1">
            Meta Description * <span className={`ml-1 ${metaDesc.length >= 150 && metaDesc.length <= 160 ? "text-green-600" : "text-red-500"}`}>{metaDesc.length}/160</span>
          </label>
          <textarea value={metaDesc} onChange={e => setMetaDesc(e.target.value)} rows={2}
            className="w-full px-3 py-2 rounded-lg border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-navy-700/20 resize-none" required />
        </div>

        {/* Category / ReadTime / Status */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-medium mb-1">Category *</label>
            <select value={category} onChange={e => setCategory(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-navy-700/20">
              {VALID_CATEGORIES.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium mb-1">Read Time *</label>
            <input value={readTime} onChange={e => setReadTime(e.target.value)} placeholder="e.g., 8 min read"
              className="w-full px-3 py-2 rounded-lg border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-navy-700/20" required />
          </div>
          <div>
            <label className="block text-xs font-medium mb-1">Status</label>
            <select value={status} onChange={e => setStatus(e.target.value as any)}
              className="w-full px-3 py-2 rounded-lg border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-navy-700/20">
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </div>
        </div>

        {/* Tags */}
        <div>
          <label className="block text-xs font-medium mb-1">Tags (comma separated)</label>
          <input value={tags} onChange={e => setTags(e.target.value)} placeholder="EV Charging, J1772, Sourcing Guide"
            className="w-full px-3 py-2 rounded-lg border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-navy-700/20" />
        </div>

        {/* Featured image */}
        <div>
          <label className="block text-xs font-medium mb-1">Cover Image</label>
          <div className="flex gap-2 items-center">
            <input type="file" accept="image/*" onChange={onFeaturedPick} className="text-sm" />
            {uploading && <span className="text-xs text-gray-500">Uploading…</span>}
          </div>
          {featuredUrl && <p className="mt-1 text-xs text-green-600 break-all">✓ {featuredUrl}</p>}
        </div>

        {/* Inline image upload helper */}
        <div className="flex items-center gap-2 p-3 bg-navy-50 rounded-lg">
          <span className="text-xs text-gray-600">Upload image for content body →</span>
          <input type="file" accept="image/*" onChange={onInlineImage} className="text-sm" />
          <span className="text-xs text-gray-400">(uploads & copies Markdown to clipboard)</span>
        </div>

        {/* Markdown editor */}
        <div>
          <label className="block text-xs font-medium mb-1">Content (Markdown) *</label>
          <div data-color-mode="light">
            <MDEditor value={content} onChange={v => setContent(v || "")} height={500} preview="live" />
          </div>
        </div>

        <button type="submit" disabled={busy}
          className="bg-navy-900 hover:bg-navy-800 disabled:opacity-50 text-white font-semibold px-6 py-3 rounded-lg transition-colors">
          {busy ? "Saving…" : status === "draft" ? "Save as Draft" : "Publish"}
        </button>
      </form>

      {result && (
        <div className={`mt-4 p-4 rounded-lg text-sm whitespace-pre-wrap ${result.ok ? "bg-green-50 text-green-800" : "bg-red-50 text-red-800"}`}>
          {result.msg}
          {result.previewUrl && (
            <a href={result.previewUrl} target="_blank" rel="noreferrer" className="ml-4 underline font-medium">Preview →</a>
          )}
        </div>
      )}
    </div>
  );
}

function Input({ name, label, type = "text", placeholder, required }: { name: string; label: string; type?: string; placeholder?: string; required?: boolean }) {
  return (
    <div>
      <label className="block text-xs font-medium mb-1">{label}</label>
      <input name={name} type={type} placeholder={placeholder} required={required} className="w-full px-3 py-2 rounded-lg border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-navy-700/20" />
    </div>
  );
}

function Textarea({ name, label, rows = 4 }: { name: string; label: string; rows?: number }) {
  return (
    <div>
      <label className="block text-xs font-medium mb-1">{label}</label>
      <textarea name={name} rows={rows} className="w-full px-3 py-2 rounded-lg border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-navy-700/20 resize-none" />
    </div>
  );
}

function Select({ name, label, options }: { name: string; label: string; options: string[] }) {
  return (
    <div>
      <label className="block text-xs font-medium mb-1">{label}</label>
      <select name={name} className="w-full px-3 py-2 rounded-lg border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-navy-700/20">
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );
}

function Checkbox({ name, label }: { name: string; label: string }) {
  return (
    <label className="flex items-center gap-2 text-sm">
      <input name={name} type="checkbox" className="rounded border-border" />
      {label}
    </label>
  );
}
