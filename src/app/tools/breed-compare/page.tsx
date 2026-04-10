import { AdBanner } from "@/components/ads/AdBanner";
import Link from "next/link";
import type { Metadata } from "next";
import { Card } from "@/components/ui/Card";
import { BreedCompare } from "@/components/tools/BreedCompare";
import { JsonLd } from "@/components/seo/JsonLd";
import { ToolRelatedArticles } from "@/components/tools/ToolRelatedArticles";
import { buildPageMetadata, webApplicationSchema } from "@/lib/seo";

const PAGE_PATH = "/tools/breed-compare";

export const metadata: Metadata = buildPageMetadata({
  title: "品種比較 — 並排比較不同犬貓品種特性",
  description:
    "選擇 2-3 個狗狗或貓咪品種，並排比較體型、壽命、活動量、掉毛量、常見疾病等，幫助你做出最適合的選擇。",
  keywords: ["品種比較", "狗品種比較", "貓品種比較", "養什麼狗", "選品種"],
  path: PAGE_PATH,
});

export default function BreedComparePage() {
  return (
    <>
      <JsonLd
        data={webApplicationSchema({
          name: "品種比較工具",
          description: "並排比較不同犬貓品種特性",
          path: PAGE_PATH,
        })}
      />
      <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-100 text-3xl mb-4">
            ⚖️
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-ink-900 mb-3">
            品種比較
          </h1>
          <p className="text-ink-500">
            選擇 2-3 個品種，並排比較所有特性
          </p>
        </div>

        <Card padding="lg">
          <BreedCompare />
        </Card>
        <AdBanner slot="tool-result" format="horizontal" className="mt-6" />

        <article className="mt-10 prose prose-lg max-w-none text-ink-700 leading-relaxed">
          <h2 className="text-2xl font-bold text-ink-900 mb-4">品種比較怎麼看？</h2>
          <p>比較品種時，重點不是找「最好的品種」，而是找「最適合你的品種」。以下是各項指標的解讀方式：</p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>活動量</strong>：5 分需要每天 2 小時運動，1 分只要室內走動</li>
            <li><strong>親人度</strong>：5 分極度黏人，1 分獨立不愛被抱</li>
            <li><strong>訓練難易</strong>：5 分極好訓練，1 分很固執需要經驗</li>
            <li><strong>掉毛量</strong>：5 分換毛如下雪，1 分幾乎不掉毛</li>
          </ul>
          <p>想找適合你的品種？試試<Link href="/tools/breed-match" className="text-brand-600">品種配對測驗</Link>，或瀏覽<Link href="/breeds" className="text-brand-600">品種百科</Link>。</p>
        </article>
        <ToolRelatedArticles toolSlug="breed-compare" />
      </div>
    </>
  );
}
