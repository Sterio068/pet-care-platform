import type { Metadata } from "next";
import { Card } from "@/components/ui/Card";
import { CostCalculator } from "@/components/tools/CostCalculator";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildPageMetadata, webApplicationSchema } from "@/lib/seo";

const PAGE_PATH = "/tools/cost-calculator";

export const metadata: Metadata = buildPageMetadata({
  title: "養寵物花費計算 — 狗貓月開銷與 10 年總花費試算",
  description:
    "免費線上養寵物花費計算工具。依狗貓體型試算每月固定開銷、年度例行花費、第一年總成本與 10 年總花費，幫助飼主做好養寵財務規劃。",
  keywords: ["養狗花費", "養貓花費", "寵物月開銷", "寵物花費", "養寵物預算"],
  path: PAGE_PATH,
});

export default function CostCalculatorPage() {
  return (
    <>
      <JsonLd
        data={webApplicationSchema({
          name: "養寵物花費計算器",
          description: "狗貓月開銷與 10 年總花費試算",
          path: PAGE_PATH,
        })}
      />
      <div className="mx-auto w-full max-w-3xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-3xl mb-4">
            💰
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-ink-900 mb-3">
            養寵物花費計算
          </h1>
          <p className="text-ink-500">
            試算養狗養貓的每月開銷與 10 年總花費
          </p>
        </div>

        <Card padding="lg">
          <CostCalculator />
        </Card>

        <article className="mt-10 prose prose-lg max-w-none text-ink-700 leading-relaxed">
          <h2 className="text-2xl font-bold text-ink-900 mb-4">
            為什麼要先算清楚養寵物的花費？
          </h2>
          <p>
            根據台灣動保處統計，每年有上萬隻寵物被棄養，最大原因之一就是「飼主沒有評估清楚長期經濟負擔」。養一隻毛孩是 10-15 年的承諾，從第一年到老年，花費金額會隨著健康狀況變化。
          </p>

          <h3 className="text-xl font-semibold text-ink-900 mt-6 mb-3">
            月固定花費包含什麼？
          </h3>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>飼料：</strong>乾糧 + 濕食，依品質與份量差異大
            </li>
            <li>
              <strong>零食：</strong>訓練獎勵、磨牙棒、潔牙骨
            </li>
            <li>
              <strong>日用品：</strong>狗用便袋、貓砂、清潔用品
            </li>
            <li>
              <strong>美容：</strong>自己洗 vs 寵物美容店差異很大
            </li>
          </ul>

          <h3 className="text-xl font-semibold text-ink-900 mt-6 mb-3">
            年度例行花費
          </h3>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>疫苗：</strong>八合一/三合一 + 狂犬病，約 1,500-2,000 元
            </li>
            <li>
              <strong>驅蟲預防藥：</strong>每月心絲蟲與體內外驅蟲，1,800-2,400/年
            </li>
            <li>
              <strong>健康檢查：</strong>成犬貓一次 1,000-2,000，老年建議半年一次
            </li>
            <li>
              <strong>保險（選擇性）：</strong>月繳約 400-600 元，年繳 5,000-6,000
            </li>
          </ul>

          <h3 className="text-xl font-semibold text-ink-900 mt-6 mb-3">
            第一年一次性花費
          </h3>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>基本用品：</strong>牽繩、碗、窩、外出包、貓跳台等
            </li>
            <li>
              <strong>結紮手術：</strong>狗 4,000-8,000、貓 3,000-4,000
            </li>
            <li>
              <strong>晶片植入：</strong>約 300-500 元（法定）
            </li>
          </ul>

          <h3 className="text-xl font-semibold text-ink-900 mt-6 mb-3">
            容易被忽略的大支出
          </h3>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>突發醫療：</strong>一次住院手術可能 3-10 萬元
            </li>
            <li>
              <strong>慢性病治療：</strong>腎病、糖尿病每月 2,000-5,000 長期支出
            </li>
            <li>
              <strong>老年照護：</strong>處方飼料、關節保健品、每月回診
            </li>
            <li>
              <strong>寄宿費用：</strong>出國時每天 500-1,500 元
            </li>
            <li>
              <strong>牙科處理：</strong>一年一次洗牙 4,000-8,000 元
            </li>
          </ul>

          <h3 className="text-xl font-semibold text-ink-900 mt-6 mb-3">
            降低長期花費的 5 個方法
          </h3>
          <ol className="list-decimal pl-5 space-y-2">
            <li>
              <strong>預防勝於治療：</strong>規律健檢、疫苗、驅蟲比治療便宜
            </li>
            <li>
              <strong>自己學美容：</strong>洗澡、剪指甲、刷牙自己做
            </li>
            <li>
              <strong>買大包飼料：</strong>單位成本更低
            </li>
            <li>
              <strong>控制體重：</strong>肥胖會帶來更多醫療支出
            </li>
            <li>
              <strong>考慮保險：</strong>分散突發醫療風險
            </li>
          </ol>

          <div className="mt-8 p-5 bg-green-50 border-l-4 border-green-400 rounded-r-[12px]">
            <p className="text-sm text-ink-700 leading-relaxed m-0">
              <strong>💡 建議：</strong>
              養毛孩前，先存一筆 3-5 萬元的「緊急醫療基金」，以應對突發狀況。有能力負擔預期花費，才是對毛孩真正的愛。
            </p>
          </div>
        </article>
      </div>
    </>
  );
}
