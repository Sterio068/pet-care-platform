import type { Metadata } from "next";
import { Card } from "@/components/ui/Card";
import { BreedCompare } from "@/components/tools/BreedCompare";
import { JsonLd } from "@/components/seo/JsonLd";
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
      </div>
    </>
  );
}
