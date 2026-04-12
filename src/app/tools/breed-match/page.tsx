import { AdBanner } from "@/components/ads/AdBanner";
import Link from "next/link";
import type { Metadata } from "next";
import { Card } from "@/components/ui/Card";
import { BreedMatchQuiz } from "@/components/tools/BreedMatchQuiz";
import { JsonLd } from "@/components/seo/JsonLd";
import { ToolRelatedArticles } from "@/components/tools/ToolRelatedArticles";
import { buildPageMetadata, breadcrumbListSchema, webApplicationSchema } from "@/lib/seo";

const PAGE_PATH = "/tools/breed-match";

export const metadata: Metadata = buildPageMetadata({
  title: "品種配對測驗 — 找到最適合你的狗狗或貓咪",
  description:
    "回答 5 個簡單問題，根據你的居住空間、時間、活動量、養寵經驗，推薦最適合你的犬貓品種。",
  keywords: ["品種推薦", "養什麼狗", "養什麼貓", "品種配對", "適合我的寵物"],
  path: PAGE_PATH,
});

export default function BreedMatchPage() {
  const breadcrumb = breadcrumbListSchema([
    { label: '首頁', href: '/' },
    { label: '工具', href: '/tools' },
    { label: '品種配對測驗' },
  ]);
  return (
    <>
      <JsonLd data={breadcrumb} />
      <JsonLd
        data={webApplicationSchema({
          name: "品種配對測驗",
          description: "回答 5 個問題找到最適合你的犬貓品種",
          path: PAGE_PATH,
        })}
      />
      <div className="mx-auto w-full max-w-2xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-100 text-3xl mb-4">
            🎯
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-ink-900 mb-3">
            品種配對測驗
          </h1>
          <p className="text-ink-500">
            回答 5 個問題，找到最適合你的毛孩品種
          </p>
        </div>

        <Card padding="lg">
          <BreedMatchQuiz />
        </Card>
        <AdBanner slot="tool-result" format="horizontal" className="mt-6" />

        <article className="mt-10 prose prose-lg max-w-none text-ink-700 leading-relaxed">
          <h2 className="text-2xl font-bold text-ink-900 mb-4">品種配對常見問題</h2>
          <h3 className="text-xl font-semibold text-ink-900 mt-6 mb-3">Q: 測驗結果準確嗎？</h3>
          <p>本測驗根據你的居住空間、陪伴時間、運動量、美容意願、養寵經驗 5 個面向，與 30 個品種的特性進行匹配。結果為參考建議，實際選擇仍需考慮個人偏好與實際接觸。</p>
          <h3 className="text-xl font-semibold text-ink-900 mt-6 mb-3">Q: 應該選純種還是米克斯？</h3>
          <p>米克斯通常基因病較少、適應力強。純種犬貓的特性較可預期。兩者都是好選擇，重要的是你的生活方式是否適合。推薦閱讀<Link href="/articles/pet-adoption-guide" className="text-brand-600">領養指南</Link>。</p>
          <h3 className="text-xl font-semibold text-ink-900 mt-6 mb-3">Q: 養狗好還是養貓好？</h3>
          <p>狗需要較多時間（每天散步、訓練），貓較獨立但需要垂直空間和互動。上班族可能更適合貓，有庭院的家庭適合狗。用本工具測試看看兩種的推薦結果。</p>
        </article>
        <ToolRelatedArticles toolSlug="breed-match" />
      </div>
    </>
  );
}
