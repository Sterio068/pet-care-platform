import { AdBanner } from "@/components/ads/AdBanner";
import type { Metadata } from "next";
import { Card } from "@/components/ui/Card";
import { FoodComparator } from "@/components/tools/FoodComparator";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildPageMetadata, webApplicationSchema } from "@/lib/seo";

const PAGE_PATH = "/tools/food-compare";

export const metadata: Metadata = buildPageMetadata({
  title: "飼料比較計算器 — 每千卡成本誰最划算？",
  description:
    "輸入 2-4 款飼料的價格、重量、熱量密度，自動計算每千卡成本與每月花費。用科學方式比較飼料性價比。",
  keywords: ["飼料比較", "飼料推薦", "飼料性價比", "飼料價格", "狗飼料比較"],
  path: PAGE_PATH,
});

export default function FoodComparePage() {
  return (
    <>
      <JsonLd data={webApplicationSchema({ name: "飼料比較計算器", description: "比較飼料每千卡成本", path: PAGE_PATH })} />
      <div className="mx-auto w-full max-w-3xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-amber-100 text-3xl mb-4">📦</div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-ink-900 mb-3">飼料比較計算器</h1>
          <p className="text-ink-500">輸入價格和熱量，算出誰最划算</p>
        </div>
        <Card padding="lg"><FoodComparator /></Card>
        <AdBanner slot="tool-result" format="horizontal" className="mt-6" />
        <article className="mt-10 prose prose-lg max-w-none text-ink-700 leading-relaxed">
          <h2 className="text-2xl font-bold text-ink-900 mb-4">為什麼要比較「每千卡成本」而不是「每公斤價格」？</h2>
          <p>不同飼料的熱量密度差很多：一款 3.2 kcal/g 的飼料和 4.2 kcal/g 的飼料，每天需要的克數差 30%。單看「每公斤多少錢」會被誤導——看起來便宜的飼料可能因為吃更多反而更貴。</p>
          <p><strong>每千卡成本（$/kcal）</strong>才是真正的性價比指標。搭配<a href="/tools/food-calculator" className="text-brand-600">餵食計算機</a>算出毛孩每日所需熱量，就能精確計算每月花費。</p>
        </article>
      </div>
    </>
  );
}
