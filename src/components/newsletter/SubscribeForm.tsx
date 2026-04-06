"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";

export function SubscribeForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;
    // Phase 3: 串接 Mailchimp / ConvertKit API
    // 目前先模擬成功
    setStatus("success");
    setEmail("");
    setTimeout(() => setStatus("idle"), 5000);
  };

  return (
    <section className="rounded-[20px] bg-gradient-to-br from-brand-50 via-cream-100 to-accent-50 p-6 md:p-8">
      <div className="flex flex-col md:flex-row md:items-center gap-6">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-ink-900 mb-2">
            訂閱毛孩照護週報
          </h3>
          <p className="text-sm text-ink-500 leading-relaxed">
            每週一封，精選飼養知識、工具更新、季節照護提醒。不灌水、不推銷、隨時退訂。
          </p>
        </div>
        <div className="md:w-80">
          {status === "success" ? (
            <div className="text-center py-4">
              <div className="text-2xl mb-2" aria-hidden="true">🎉</div>
              <p className="text-sm font-semibold text-accent-700">
                訂閱成功！期待每週與你分享毛孩知識。
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="你的 Email"
                className="flex-1 rounded-[12px] border border-cream-300 bg-white px-4 py-2.5 text-sm text-ink-900 placeholder:text-ink-300 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
                required
              />
              <Button type="submit" size="md">
                訂閱
              </Button>
            </form>
          )}
          {status === "error" && (
            <p className="text-xs text-red-600 mt-2">訂閱失敗，請稍後再試。</p>
          )}
        </div>
      </div>
    </section>
  );
}
