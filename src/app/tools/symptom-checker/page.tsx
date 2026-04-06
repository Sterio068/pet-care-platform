import type { Metadata } from "next";
import { Card } from "@/components/ui/Card";
import { SymptomChecker } from "@/components/tools/SymptomChecker";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildPageMetadata, webApplicationSchema } from "@/lib/seo";

const PAGE_PATH = "/tools/symptom-checker";

export const metadata: Metadata = buildPageMetadata({
  title: "寵物症狀檢查器 — 狗狗貓咪身體不適自我評估",
  description:
    "免費線上寵物症狀檢查工具。勾選狗狗或貓咪出現的症狀，快速評估可能原因與緊急程度，幫助飼主判斷是否需要立即就醫。",
  keywords: ["狗嘔吐", "貓拉肚子", "寵物生病症狀", "狗狗食慾不振", "貓咪嘔吐", "寵物症狀自我診斷"],
  path: PAGE_PATH,
});

export default function SymptomCheckerPage() {
  return (
    <>
      <JsonLd
        data={webApplicationSchema({
          name: "寵物症狀檢查器",
          description: "狗狗貓咪身體不適自我評估工具",
          path: PAGE_PATH,
        })}
      />
      <div className="mx-auto w-full max-w-3xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-yellow-100 text-3xl mb-4">
            🩺
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-ink-900 mb-3">
            寵物症狀檢查器
          </h1>
          <p className="text-ink-500">
            勾選毛孩症狀，初步評估可能原因與緊急程度
          </p>
        </div>

        <Card padding="lg">
          <SymptomChecker />
        </Card>

        <article className="mt-10 prose prose-lg max-w-none text-ink-700 leading-relaxed">
          <h2 className="text-2xl font-bold text-ink-900 mb-4">
            如何觀察毛孩身體狀況？
          </h2>
          <p>
            狗狗和貓咪無法用言語表達不舒服，飼主必須成為他們的「翻譯者」。學會觀察行為、飲食、排泄、活動力的細微變化，是及早發現疾病的關鍵。
          </p>

          <h3 className="text-xl font-semibold text-ink-900 mt-6 mb-3">
            需要立即就醫的緊急症狀
          </h3>
          <p>以下症狀代表情況嚴重，請立即帶往動物醫院：</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>呼吸急促、呼吸困難、嘴唇發紫</li>
            <li>大量出血、血便、吐血</li>
            <li>意識不清、抽搐、全身無力倒地</li>
            <li>公貓完全無法排尿（可能尿道阻塞）</li>
            <li>疑似誤食有毒食物或異物</li>
            <li>體溫超過 40°C 且持續不退</li>
          </ul>

          <h3 className="text-xl font-semibold text-ink-900 mt-6 mb-3">
            日常需要留意的警訊
          </h3>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>食慾變化：</strong>連續 24 小時不吃東西（貓咪 12 小時）
            </li>
            <li>
              <strong>飲水量異常：</strong>突然喝水量大增或大減
            </li>
            <li>
              <strong>排便異常：</strong>腹瀉持續 2 天以上、便秘 2 天以上
            </li>
            <li>
              <strong>活動力下降：</strong>平時活潑但突然變安靜、躲起來
            </li>
            <li>
              <strong>嘔吐：</strong>每天嘔吐超過 2 次、或吐出血絲、異物
            </li>
          </ul>

          <h3 className="text-xl font-semibold text-ink-900 mt-6 mb-3">
            就醫前該準備什麼？
          </h3>
          <ol className="list-decimal pl-5 space-y-2">
            <li>
              <strong>記錄症狀細節：</strong>
              什麼時候開始、頻率、形狀、顏色
            </li>
            <li>
              <strong>拍照 / 錄影：</strong>
              嘔吐物、糞便、異常行為影像都能幫助診斷
            </li>
            <li>
              <strong>確認飲食變化：</strong>近期是否換飼料、吃了零食或不該吃的食物
            </li>
            <li>
              <strong>攜帶病歷：</strong>
              過去疫苗紀錄、慢性病藥物資訊
            </li>
          </ol>

          <div className="mt-8 p-5 bg-yellow-50 border-l-4 border-yellow-400 rounded-r-[12px]">
            <p className="text-sm text-ink-700 leading-relaxed m-0">
              <strong>⚠️ 免責聲明：</strong>
              本症狀檢查器僅提供初步參考，不能取代獸醫師的專業診斷。每隻毛孩的身體狀況與病史都不同，實際診斷需要透過臨床檢查、血檢、影像等專業設備。若有任何疑慮，請直接諮詢信任的獸醫師。
            </p>
          </div>
        </article>
      </div>
    </>
  );
}
