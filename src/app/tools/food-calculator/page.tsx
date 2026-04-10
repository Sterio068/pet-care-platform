import { AdBanner } from "@/components/ads/AdBanner";
import type { Metadata } from "next";
import { Card } from "@/components/ui/Card";
import { FoodCalculator } from "@/components/tools/FoodCalculator";
import { JsonLd } from "@/components/seo/JsonLd";
import { ToolRelatedArticles } from "@/components/tools/ToolRelatedArticles";
import { buildPageMetadata, webApplicationSchema } from "@/lib/seo";

const PAGE_PATH = "/tools/food-calculator";

export const metadata: Metadata = buildPageMetadata({
  title: "狗貓餵食計算機 — 每日飼料量與熱量需求計算",
  description:
    "依照毛孩體重、年齡、活動量、絕育狀態計算每日所需熱量與乾糧克數。使用獸醫營養學 RER/MER 公式，幫助飼主控制寵物體重。",
  keywords: ["狗飼料量", "貓一天吃多少", "寵物熱量", "狗狗體重", "貓咪餵食", "寵物肥胖"],
  path: PAGE_PATH,
});

export default function FoodCalculatorPage() {
  return (
    <>
      <JsonLd
        data={webApplicationSchema({
          name: "狗貓餵食計算機",
          description: "每日飼料量與熱量需求計算工具",
          path: PAGE_PATH,
        })}
      />
      <JsonLd data={{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"狗狗一天該吃多少飼料？","acceptedAnswer":{"@type":"Answer","text":"依體重計算 RER（70×體重^0.75），乘以生理係數。10kg 成犬約需 500-630 kcal/天。"}},{"@type":"Question","name":"貓咪一天吃多少？","acceptedAnswer":{"@type":"Answer","text":"4kg 絕育成貓約 240-280 kcal/天，約 65-75g 乾糧。"}}]}} />
      <div className="mx-auto w-full max-w-3xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-pink-100 text-3xl mb-4">
            🥣
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-ink-900 mb-3">
            寵物餵食計算機
          </h1>
          <p className="text-ink-500">
            科學計算狗狗貓咪每日熱量與飼料克數
          </p>
        </div>

        <Card padding="lg">
          <FoodCalculator />
        </Card>
        <AdBanner slot="tool-result" format="horizontal" className="mt-6" />

        <article className="mt-10 prose prose-lg max-w-none text-ink-700 leading-relaxed">
          <h2 className="text-2xl font-bold text-ink-900 mb-4">
            為什麼要精算寵物的飲食份量？
          </h2>
          <p>
            台灣獸醫臨床統計顯示，超過 50%
            的犬貓有體重過重問題，而肥胖是糖尿病、關節炎、心血管疾病的主要風險因子。很多飼主憑感覺給飯，或直接依照飼料包上的粗略建議餵食，結果不是餵太多就是餵太少。
          </p>

          <h3 className="text-xl font-semibold text-ink-900 mt-6 mb-3">
            熱量需求的計算公式
          </h3>
          <p>
            獸醫營養學採用兩階段計算法：
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>RER（靜止能量需求）：</strong> RER = 70 × 體重<sup>0.75</sup>
            </li>
            <li>
              <strong>MER（維持能量需求）：</strong> MER = RER × 生理係數
            </li>
          </ul>
          <p>
            生理係數會因為年齡、活動量、絕育狀態而不同。例如：
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>已絕育成犬，活動量中：MER ≈ RER × 1.6</li>
            <li>未絕育成犬，活動量高：MER ≈ RER × 2.2</li>
            <li>已絕育成貓：MER ≈ RER × 1.2</li>
            <li>幼犬（成長期）：MER ≈ RER × 2.0-2.5</li>
          </ul>

          <h3 className="text-xl font-semibold text-ink-900 mt-6 mb-3">
            從熱量換算飼料克數
          </h3>
          <p>
            知道每日所需熱量後，就可以依照飼料的「熱量密度」計算實際餵食克數：
          </p>
          <div className="bg-cream-100 p-4 rounded-[12px] font-mono text-sm my-4">
            每日飼料克數 = 每日所需熱量 ÷ 飼料熱量密度（kcal/g）
          </div>
          <p>
            飼料熱量密度通常印在飼料包裝背面，一般乾糧介於 3.5-4.2 kcal/g。處方飼料、減重飼料可能低至 3.0 kcal/g；幼犬或活動力強的飼料則可能達 4.5 kcal/g 以上。
          </p>

          <h3 className="text-xl font-semibold text-ink-900 mt-6 mb-3">
            餵食的實務建議
          </h3>
          <ol className="list-decimal pl-5 space-y-2">
            <li>
              <strong>定時定量：</strong>
              成犬每日 2 餐、幼犬 3-4 餐、成貓可少量多餐
            </li>
            <li>
              <strong>適時調整：</strong>
              每 2-4 週秤體重一次，維持理想體重
            </li>
            <li>
              <strong>零食計入總熱量：</strong>
              零食不應超過每日總熱量的 10%
            </li>
            <li>
              <strong>活動量變化時調整：</strong>
              冬天活動少、夏天活動多都需微調
            </li>
          </ol>

          <h3 className="text-xl font-semibold text-ink-900 mt-6 mb-3">
            判斷毛孩是否體重標準？
          </h3>
          <p>
            除了數字，也要配合「體態評分 BCS」（1-9 分制）判斷：
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>理想體態（4-5 分）：從上方可看出腰身，輕壓能摸到肋骨</li>
            <li>過瘦（1-3 分）：明顯看得到肋骨、脊椎突起</li>
            <li>過重（6-7 分）：摸不太到肋骨，腰身不明顯</li>
            <li>肥胖（8-9 分）：脂肪層厚，腹部下垂</li>
          </ul>

          <div className="mt-8 p-5 bg-accent-50 border-l-4 border-accent-400 rounded-r-[12px]">
            <p className="text-sm text-ink-700 leading-relaxed m-0">
              <strong>💡 飼主提醒：</strong>
              本計算結果為參考範圍，實際份量應依毛孩體態、健康狀況微調。有慢性疾病（腎病、糖尿病、胰臟炎）或特殊體質的毛孩，請諮詢獸醫師調整處方飲食。
            </p>
          </div>
        </article>
        <ToolRelatedArticles toolSlug="food-calculator" />
      </div>
    </>
  );
}
