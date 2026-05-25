import type { Metadata } from "next";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { Card } from "@/components/ui/Card";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "聯絡我們 — 內容建議、錯誤回報與合作洽詢",
  description:
    "聯絡毛孩照護站。歡迎提供文章錯誤回報、內容建議、來源補充、合作洽詢與網站問題回報。",
  keywords: ["聯絡我們", "毛孩照護站", "內容建議", "錯誤回報"],
  path: "/contact",
});

export default function ContactPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 sm:px-6 lg:px-8 py-10 md:py-16">
      <Breadcrumb items={[{ label: "首頁", href: "/" }, { label: "聯絡我們" }]} />

      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-extrabold text-ink-900 mb-3">
          聯絡我們
        </h1>
        <p className="text-ink-500 leading-relaxed">
          發現文章錯誤、想補充來源，或有合作與網站問題，都可以寄信給我們。
        </p>
      </header>

      <div className="space-y-6">
        <Card padding="lg">
          <h2 className="text-xl font-bold text-ink-900 mb-3">Email</h2>
          <p className="text-ink-700 leading-relaxed mb-3">
            請寄到{" "}
            <a
              href="mailto:sterio068@gmail.com"
              className="font-semibold text-brand-600 hover:underline"
            >
              sterio068@gmail.com
            </a>
          </p>
          <p className="text-sm text-ink-500 leading-relaxed">
            來信請盡量附上相關頁面網址、你看到的問題、可查證來源或截圖。若是毛孩緊急健康狀況，請直接聯絡附近動物醫院，本站無法提供即時診斷。
          </p>
        </Card>

        <Card padding="lg">
          <h2 className="text-xl font-bold text-ink-900 mb-3">
            適合來信的主題
          </h2>
          <ul className="list-disc pl-5 space-y-2 text-ink-700 leading-relaxed">
            <li>文章內容錯誤、過時或表述不清。</li>
            <li>想補充官方、獸醫學或學術來源。</li>
            <li>工具計算結果、頁面顯示或連結異常。</li>
            <li>品牌、媒體、公益或內容合作洽詢。</li>
          </ul>
        </Card>

        <Card padding="lg">
          <h2 className="text-xl font-bold text-ink-900 mb-3">
            內容回報請盡量包含
          </h2>
          <ul className="list-disc pl-5 space-y-2 text-ink-700 leading-relaxed">
            <li>你看到問題的頁面網址，以及問題發生的位置。</li>
            <li>你認為需要修正、補充或移除的具體句子。</li>
            <li>可供查核的官方、獸醫學、學術或公開條款來源。</li>
            <li>若是工具計算異常，請附上輸入條件與螢幕截圖。</li>
          </ul>
          <p className="mt-3 text-sm text-ink-500 leading-relaxed">
            我們會優先處理可能影響健康、安全、法規或就醫判斷的內容。
          </p>
        </Card>

        <Card padding="lg">
          <h2 className="text-xl font-bold text-ink-900 mb-3">
            回覆時間
          </h2>
          <p className="text-ink-700 leading-relaxed">
            我們會優先處理會影響飼主判斷的健康、法規與安全內容。一般來信會視內容量與查證需求回覆；若是緊急醫療問題，請不要等待本站回信。
          </p>
        </Card>

        <Card padding="lg">
          <h2 className="text-xl font-bold text-ink-900 mb-3">
            我們無法透過 Email 處理的事項
          </h2>
          <p className="text-ink-700 leading-relaxed">
            本站不能提供個案診斷、處方、急救指令或替代獸醫看診的建議。若毛孩出現呼吸困難、抽搐、疑似中毒、持續嘔吐腹瀉、出血、嚴重疼痛或精神明顯變差，請立即聯絡動物醫院或急診。
          </p>
        </Card>
      </div>
    </div>
  );
}
