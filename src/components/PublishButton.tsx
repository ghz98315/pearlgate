"use client";
import { useState } from "react";

export default function PublishButton({ postId, slug }: { postId: string; slug: string }) {
  const [busy, setBusy] = useState(false);

  const publish = async () => {
    const pw = sessionStorage.getItem("admin_password");
    if (!pw) { alert("请先登录 Admin 后台再发布"); return; }
    if (!confirm("确认发布这篇文章？发布后对所有人可见。")) return;
    setBusy(true);
    const res = await fetch(`/api/blog/${postId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${pw}` },
      body: JSON.stringify({ status: "published", published_at: new Date().toISOString() }),
    });
    const j = await res.json();
    if (j.success) {
      window.location.href = `/blog/${slug}`;
    } else {
      alert("发布失败: " + (j.error || "unknown error"));
      setBusy(false);
    }
  };

  return (
    <button
      onClick={publish}
      disabled={busy}
      className="ml-4 bg-white text-orange-600 font-semibold text-sm px-4 py-1 rounded-full hover:bg-orange-50 disabled:opacity-50 transition-colors"
    >
      {busy ? "发布中…" : "✓ 正式发布"}
    </button>
  );
}
