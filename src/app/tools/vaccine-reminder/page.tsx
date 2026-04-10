import { AdBanner } from "@/components/ads/AdBanner";
import Link from "next/link";
import type { Metadata } from "next";
import { Card } from "@/components/ui/Card";
import { VaccineReminder } from "@/components/tools/VaccineReminder";
import { JsonLd } from "@/components/seo/JsonLd";
import { ToolRelatedArticles } from "@/components/tools/ToolRelatedArticles";
import { buildPageMetadata, webApplicationSchema } from "@/lib/seo";

const PAGE_PATH = "/tools/vaccine-reminder";

export const metadata: Metadata = buildPageMetadata({
  title: "疫苗提醒 — 輸入出生日期自動算出每次疫苗時間",
  description:
    "輸入狗狗或貓咪的出生日期，自動計算每次疫苗預防針的施打日期。包含五合一、八合一、三合一、狂犬病完整時程。",
  keywords: ["疫苗提醒", "狗疫苗時間", "貓疫苗日期", "預防針時間", "幼犬疫苗"],
  path: PAGE_PATH,
});

export default function VaccineReminderPage() {
  return (
    <>
      <JsonLd
        data={webApplicationSchema({
          name: "疫苗提醒",
          description: "輸入出生日期自動算出每次疫苗時間",
          path: PAGE_PATH,
        })}
      />
      <div className="mx-auto w-full max-w-3xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 text-3xl mb-4">
            🔔
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-ink-900 mb-3">
            疫苗提醒
          </h1>
          <p className="text-ink-500">
            輸入出生日期，自動算出每次疫苗施打時間
          </p>
        </div>

        <Card padding="lg">
          <VaccineReminder />
        </Card>
        <AdBanner slot="tool-result" format="horizontal" className="mt-6" />

        <article className="mt-10 prose prose-lg max-w-none text-ink-700 leading-relaxed">
          <h2 className="text-2xl font-bold text-ink-900 mb-4">疫苗提醒的重要性</h2>
          <p>幼犬幼貓的免疫系統在 6-16 週間逐漸失去母抗體保護。如果疫苗施打時間延誤，毛孩可能在這段空窗期感染致命疾病（犬瘟熱、貓瘟、小病毒）。</p>
          <h3 className="text-xl font-semibold text-ink-900 mt-6 mb-3">常見問題</h3>
          <p><strong>Q: 疫苗可以提前打嗎？</strong> 不建議。太早打會被母抗體中和，等於白打。按照標準時程最安全。</p>
          <p><strong>Q: 延遲一週有影響嗎？</strong> 延遲 1-2 週通常可以接受，但不應超過 2 週。如有延遲請告知獸醫師調整計畫。</p>
          <p><strong>Q: 成犬還需要打疫苗嗎？</strong> 需要。每年至少補強一次核心疫苗，狂犬病是法定每年必打。</p>
          <p>更多疫苗資訊請參考<Link href="/tools/vaccine-schedule" className="text-brand-600">疫苗時程表</Link>。</p>
        </article>
        <ToolRelatedArticles toolSlug="vaccine-reminder" />
      </div>
    </>
  );
}
