import type { Metadata } from "next";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "毛孩工具總覽 — 寵物健康實用工具合集",
  description:
    "毛孩照護站提供的所有免費寵物工具，包括年齡換算、疫苗時程、症狀檢查、餵食計算等，幫助飼主科學養寵。",
  keywords: ["寵物工具", "毛孩工具", "狗貓健康工具"],
  path: "/tools",
});

const TOOLS = [
  {
    href: "/tools/pet-age",
    icon: "🎂",
    title: "寵物年齡換算",
    desc: "輸入毛孩年齡，看看相當於人類幾歲，並了解目前生命階段。",
    bg: "from-brand-50 to-cream-50",
  },
  {
    href: "/tools/vaccine-schedule",
    icon: "💉",
    title: "疫苗時程表",
    desc: "完整的幼犬幼貓預防針時間表，包含五合一、八合一、三合一等。",
    bg: "from-accent-50 to-cream-50",
  },
  {
    href: "/tools/symptom-checker",
    icon: "🩺",
    title: "症狀檢查器",
    desc: "勾選毛孩症狀，初步評估可能原因與緊急程度。",
    bg: "from-yellow-50 to-cream-50",
  },
  {
    href: "/tools/food-calculator",
    icon: "🥣",
    title: "餵食計算機",
    desc: "依體重、年齡、活動量計算每日熱量與飼料克數。",
    bg: "from-pink-50 to-cream-50",
  },
  {
    href: "/tools/weight-tracker",
    icon: "📊",
    title: "體重追蹤器",
    desc: "記錄每次體重變化，自動生成趨勢圖（資料存於本機）。",
    bg: "from-blue-50 to-cream-50",
  },
  {
    href: "/tools/cost-calculator",
    icon: "💰",
    title: "花費計算",
    desc: "試算養狗養貓月開銷與 10 年總花費，幫助財務規劃。",
    bg: "from-green-50 to-cream-50",
  },
  {
    href: "/tools/breed-match",
    icon: "🎯",
    title: "品種配對",
    desc: "回答 5 題，推薦最適合你的犬貓品種。",
    bg: "from-purple-50 to-cream-50",
  },
  {
    href: "/tools/name-generator",
    icon: "✨",
    title: "寵物取名",
    desc: "100+ 精選名字，依風格隨機產生。",
    bg: "from-violet-50 to-cream-50",
  },
];

export default function ToolsIndexPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-10 md:py-16">
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-extrabold text-ink-900 mb-3">
          毛孩實用工具
        </h1>
        <p className="text-ink-500 max-w-xl mx-auto">
          免費 · 無需註冊 · 手機也好用
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {TOOLS.map((tool) => (
          <Link key={tool.href} href={tool.href} className="group">
            <Card
              className={`bg-gradient-to-br ${tool.bg} h-full group-hover:shadow-[0_8px_24px_rgba(42,31,26,0.12)] transition-shadow`}
            >
              <div className="flex items-start gap-4">
                <div
                  className="flex-shrink-0 text-4xl w-14 h-14 flex items-center justify-center bg-white rounded-[14px] shadow-sm"
                  aria-hidden="true"
                >
                  {tool.icon}
                </div>
                <div className="flex-1">
                  <h2 className="font-bold text-xl text-ink-900 mb-1.5">
                    {tool.title}
                  </h2>
                  <p className="text-sm text-ink-700 leading-relaxed mb-3">
                    {tool.desc}
                  </p>
                  <span className="text-brand-600 font-semibold text-sm group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                    立即使用 <span aria-hidden="true">→</span>
                  </span>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
