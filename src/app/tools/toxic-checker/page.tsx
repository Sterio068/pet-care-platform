import { AdBanner } from "@/components/ads/AdBanner";
import type { Metadata } from "next";
import { Card } from "@/components/ui/Card";
import { ToxicChecker } from "@/components/tools/ToxicChecker";
import { JsonLd } from "@/components/seo/JsonLd";
import { ToolRelatedArticles } from "@/components/tools/ToolRelatedArticles";
import { buildPageMetadata, webApplicationSchema } from "@/lib/seo";

const PAGE_PATH = "/tools/toxic-checker";

export const metadata: Metadata = buildPageMetadata({
  title: "毒物查詢 — 狗貓可以吃這個嗎？",
  description:
    "輸入食物或植物名稱，立即查詢對狗狗貓咪是否安全。涵蓋 30+ 常見食物與植物的毒性分級、中毒症狀、急救方式。",
  keywords: ["狗可以吃", "貓可以吃", "寵物毒物", "狗中毒", "貓中毒", "狗可以吃葡萄嗎", "狗可以吃巧克力嗎"],
  path: PAGE_PATH,
});

export default function ToxicCheckerPage() {
  return (
    <>
      <JsonLd
        data={webApplicationSchema({
          name: "毒物查詢",
          description: "查詢食物或植物對狗貓是否安全",
          path: PAGE_PATH,
        })}
      />
      <JsonLd data={{ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [
        { "@type": "Question", name: "狗狗可以吃葡萄嗎？", acceptedAnswer: { "@type": "Answer", text: "絕對不行。葡萄和葡萄乾對狗狗有腎毒性，即使少量也可能致命。誤食應立即送醫催吐。" } },
        { "@type": "Question", name: "貓咪可以碰百合花嗎？", acceptedAnswer: { "@type": "Answer", text: "絕對不行。所有品種的百合對貓咪都是劇毒，即使舔到花粉都可能引起急性腎衰竭，24-72小時內致命。" } },
        { "@type": "Question", name: "狗狗可以吃巧克力嗎？", acceptedAnswer: { "@type": "Answer", text: "不行。巧克力含可可鹼和咖啡因，對狗有毒。黑巧克力毒性最強，大量食用需立即送醫催吐。" } },
      ] }} />
      <div className="mx-auto w-full max-w-3xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 text-3xl mb-4">
            🔍
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-ink-900 mb-3">
            毒物查詢
          </h1>
          <p className="text-ink-500">
            查詢食物或植物對狗貓是否安全
          </p>
        </div>

        <Card padding="lg">
          <ToxicChecker />
        </Card>
        <AdBanner slot="tool-result" format="horizontal" className="mt-6" />

        <article className="mt-10 prose prose-lg max-w-none text-ink-700 leading-relaxed">
          <h2 className="text-2xl font-bold text-ink-900 mb-4">誤食有毒食物的緊急處理</h2>
          <ol className="list-decimal pl-5 space-y-2">
            <li><strong>確認吃了什麼、吃了多少</strong></li>
            <li><strong>拍下食物包裝或殘留物</strong></li>
            <li><strong>撥打動物醫院電話告知</strong></li>
            <li><strong>不要自行催吐</strong>（除非獸醫指示）</li>
            <li><strong>不要餵牛奶或鹽水解毒</strong>（無效且危險）</li>
          </ol>
          <p>記住：<strong>越早就醫，存活率越高</strong>。2 小時內催吐效果最好。</p>
        </article>
        <ToolRelatedArticles toolSlug="toxic-checker" />
      </div>
    </>
  );
}
