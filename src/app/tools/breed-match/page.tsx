import type { Metadata } from "next";
import { Card } from "@/components/ui/Card";
import { BreedMatchQuiz } from "@/components/tools/BreedMatchQuiz";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildPageMetadata, webApplicationSchema } from "@/lib/seo";

const PAGE_PATH = "/tools/breed-match";

export const metadata: Metadata = buildPageMetadata({
  title: "品種配對測驗 — 找到最適合你的狗狗或貓咪",
  description:
    "回答 5 個簡單問題，根據你的居住空間、時間、活動量、養寵經驗，推薦最適合你的犬貓品種。",
  keywords: ["品種推薦", "養什麼狗", "養什麼貓", "品種配對", "適合我的寵物"],
  path: PAGE_PATH,
});

export default function BreedMatchPage() {
  return (
    <>
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
      </div>
    </>
  );
}
