"use client";

import { useState, useSyncExternalStore } from "react";
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
          {activeTab === "blog" && <BlogForm />}
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

function BlogForm() {
  const [output, setOutput] = useState("");
  const [markdownContent, setMarkdownContent] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    const post = {
      slug: String(data.get("title")).toLowerCase().replace(/[^a-z0-9]+/g, "-").slice(0, 60),
      title: data.get("title"),
      description: data.get("description"),
      date: data.get("date"),
      readTime: data.get("readTime"),
      category: data.get("category"),
      image: data.get("image"),
      content: markdownContent, // 使用 state 中的 markdown 内容
    };

    setOutput(JSON.stringify(post, null, 2));
  };

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Add New Blog Post</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input name="title" label="Title" required />
        <Input name="description" label="Description (SEO)" required />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input name="date" label="Date" type="date" required />
          <Input name="readTime" label="Read Time" placeholder="e.g., 5 min read" />
          <Input name="category" label="Category" placeholder="e.g., Sourcing Guide" />
        </div>
        <Input name="image" label="Cover Image URL" />

        {/* Markdown Editor with Preview */}
        <div>
          <label className="block text-sm font-medium mb-2">Content (Markdown)</label>
          <div data-color-mode="light">
            <MDEditor
              value={markdownContent}
              onChange={(val) => setMarkdownContent(val || "")}
              height={500}
              preview="live"
              hideToolbar={false}
              enableScroll={true}
              visibleDragbar={true}
            />
          </div>
          <p className="text-xs text-gray-500 mt-2">
            💡 Tip: Use the toolbar for formatting, or write Markdown directly. Preview updates in real-time.
          </p>
        </div>

        <button type="submit" className="bg-navy-900 hover:bg-navy-800 text-white font-semibold px-6 py-3 rounded-lg transition-colors">
          Generate JSON
        </button>
      </form>

      {output && (
        <div className="mt-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-sm">Generated JSON (copy to posts.ts)</h3>
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
