import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ToolCard } from "@/components/tools/ToolCard";
import { buildPageMetadata } from "@/lib/seo";
import { getToolsByGroup, TOOL_GROUPS, TOOLS } from "@/lib/tool-catalog";

export const metadata: Metadata = buildPageMetadata({
  title: "毛孩工具總覽 — 寵物健康實用工具合集",
  description:
    "毛孩照護站提供的所有免費寵物工具，包括年齡換算、疫苗時程、症狀檢查、餵食計算等，幫助飼主科學養寵。",
  keywords: ["寵物工具", "毛孩工具", "狗貓健康工具"],
  path: "/tools",
});

export default function ToolsIndexPage() {
  return (
    <div className="bg-cream-100">
      <section className="border-b border-cream-300 bg-cream-50">
        <div className="container-page grid gap-8 py-10 md:grid-cols-[1fr_360px] md:items-end md:py-14">
          <div>
            <p className="mb-3 text-xs font-bold text-brand-600">
              CARE TOOLS
            </p>
            <h1 className="max-w-3xl text-4xl font-black leading-tight text-ink-900 md:text-5xl">
              不確定下一步時，先用工具把問題變清楚。
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-600 md:text-lg">
              {TOOLS.length} 個工具依照照護情境分組：急症判斷、日常計算、長期準備與快速查詢。所有工具免費使用，不需註冊。
            </p>
          </div>
          <div className="rounded-[20px] border border-brand-200 bg-brand-50 p-5">
            <p className="text-sm font-bold text-brand-700">
              如果現在狀況急
            </p>
            <p className="mt-2 text-sm leading-relaxed text-ink-700">
              優先使用症狀檢查、毒物查詢或急救指南。若出現呼吸困難、抽搐、大量出血或無法排尿，請直接就醫。
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Link
                href="/tools/symptom-checker"
                className="rounded-full bg-brand-500 px-3 py-1.5 text-sm font-bold text-cream-50 hover:bg-brand-600"
              >
                症狀檢查
              </Link>
              <Link
                href="/tools/toxic-checker"
                className="rounded-full border border-brand-200 bg-cream-50 px-3 py-1.5 text-sm font-bold text-brand-700 hover:bg-brand-100"
              >
                毒物查詢
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 md:py-14">
        <div className="container-page">
          <div className="mb-8 flex flex-wrap gap-2">
            {TOOL_GROUPS.map((group) => (
              <a
                key={group.id}
                href={`#${group.id}`}
                className="rounded-full border border-cream-300 bg-cream-50 px-4 py-2 text-sm font-bold text-ink-700 transition-colors hover:border-brand-300 hover:bg-brand-50 hover:text-brand-700"
              >
                {group.title}
              </a>
            ))}
          </div>

          <div className="space-y-12">
            {TOOL_GROUPS.map((group) => {
              const tools = getToolsByGroup(group.id);

              return (
                <section key={group.id} id={group.id} className="scroll-mt-24">
                  <SectionHeader
                    eyebrow={`${tools.length} TOOLS`}
                    title={group.title}
                    description={group.desc}
                  />
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {tools.map((tool, index) => (
                      <ToolCard
                        key={tool.href}
                        tool={tool}
                        variant={index === 0 ? "feature" : "compact"}
                      />
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-t border-cream-300 bg-cream-50 py-10">
        <div className="container-page grid gap-4 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <h2 className="text-2xl font-extrabold text-ink-900">
              想從文章慢慢理解？
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-ink-500">
              每個工具都會連到相關文章。你也可以直接從主題中心開始，依照健康、飲食、新手照護或高齡照護查資料。
            </p>
          </div>
          <Link
            href="/articles"
            className="inline-flex w-fit items-center gap-2 rounded-[14px] bg-brand-500 px-5 py-3 font-bold text-cream-50 transition-colors hover:bg-brand-600"
          >
            前往照護文章
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
