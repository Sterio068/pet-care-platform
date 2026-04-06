import { AdBanner } from "@/components/ads/AdBanner";
import type { Metadata } from "next";
import { Card } from "@/components/ui/Card";
import { WeightTracker } from "@/components/tools/WeightTracker";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildPageMetadata, webApplicationSchema } from "@/lib/seo";

const PAGE_PATH = "/tools/weight-tracker";

export const metadata: Metadata = buildPageMetadata({
  title: "寵物體重追蹤器 — 記錄狗貓體重變化趨勢",
  description:
    "免費線上寵物體重追蹤工具。記錄狗狗貓咪每次體重，自動產生變化趨勢圖，幫助飼主管理體重健康。資料儲存在本機，不上傳伺服器。",
  keywords: ["寵物體重追蹤", "狗體重記錄", "貓體重", "寵物減重", "體重管理"],
  path: PAGE_PATH,
});

export default function WeightTrackerPage() {
  return (
    <>
      <JsonLd
        data={webApplicationSchema({
          name: "寵物體重追蹤器",
          description: "記錄狗貓體重變化趨勢的工具",
          path: PAGE_PATH,
        })}
      />
      <div className="mx-auto w-full max-w-3xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent-100 text-3xl mb-4">
            📊
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-ink-900 mb-3">
            寵物體重追蹤器
          </h1>
          <p className="text-ink-500">每月記錄體重，掌握毛孩健康變化</p>
        </div>

        <Card padding="lg">
          <WeightTracker />
        </Card>
        <AdBanner slot="tool-result" format="horizontal" className="mt-6" />

        <article className="mt-10 prose prose-lg max-w-none text-ink-700 leading-relaxed">
          <h2 className="text-2xl font-bold text-ink-900 mb-4">
            為什麼要追蹤寵物體重？
          </h2>
          <p>
            體重是寵物健康最直觀的指標之一。無論是體重增加或減少，都可能是潛在健康問題的早期訊號。規律記錄並追蹤變化趨勢，能幫助飼主：
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>及早發現肥胖趨勢</strong>：避免關節炎、糖尿病、心臟病等風險
            </li>
            <li>
              <strong>及早察覺疾病</strong>：不明原因的快速消瘦可能是腎病、糖尿病、癌症警訊
            </li>
            <li>
              <strong>評估飲食是否得宜</strong>：調整飼料量與飲食內容
            </li>
            <li>
              <strong>就醫時提供完整資料</strong>：獸醫師可透過體重曲線判斷病情
            </li>
          </ul>

          <h3 className="text-xl font-semibold text-ink-900 mt-6 mb-3">
            秤重的建議頻率
          </h3>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>幼犬幼貓（0-1 歲）：</strong>每週 1 次
            </li>
            <li>
              <strong>成年犬貓：</strong>每月 1 次
            </li>
            <li>
              <strong>老年犬貓（7 歲以上）：</strong>每 2 週 1 次
            </li>
            <li>
              <strong>減重中：</strong>每週 1 次
            </li>
          </ul>

          <h3 className="text-xl font-semibold text-ink-900 mt-6 mb-3">
            如何正確秤重
          </h3>
          <ol className="list-decimal pl-5 space-y-2">
            <li>
              <strong>小型犬貓：</strong>抱著上體重計，減去自己的體重
            </li>
            <li>
              <strong>大型犬：</strong>使用寵物專用體重計
            </li>
            <li>
              <strong>固定時間秤</strong>：建議早上空腹、排尿後秤
            </li>
            <li>
              <strong>同一台秤</strong>：不同秤誤差可能到 0.5 kg
            </li>
            <li>
              <strong>記錄完整時間</strong>：方便長期比對
            </li>
          </ol>

          <h3 className="text-xl font-semibold text-ink-900 mt-6 mb-3">
            需要警覺的體重變化
          </h3>
          <ul className="list-disc pl-5 space-y-2">
            <li>2 週內體重變化超過 5% → 建議就醫</li>
            <li>1 個月內體重下降 10% 以上 → 立即就醫</li>
            <li>持續 3 個月緩慢下降 → 慢性病可能</li>
            <li>快速肥胖（每月 +5%） → 檢視飲食與內分泌</li>
          </ul>

          <div className="mt-8 p-5 bg-accent-50 border-l-4 border-accent-400 rounded-r-[12px]">
            <p className="text-sm text-ink-700 leading-relaxed m-0">
              <strong>💡 隱私說明：</strong>
              所有體重記錄只儲存在您的瀏覽器本機（localStorage），不會上傳到任何伺服器。這代表資料完全私密，但也意味著換瀏覽器或清除瀏覽資料會遺失記錄。
            </p>
          </div>
        </article>
      </div>
    </>
  );
}
