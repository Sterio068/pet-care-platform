import { AdBanner } from "@/components/ads/AdBanner";
import type { Metadata } from "next";
import { Card } from "@/components/ui/Card";
import { EmergencyGuide } from "@/components/tools/EmergencyGuide";
import { JsonLd } from "@/components/seo/JsonLd";
import { ToolRelatedArticles } from "@/components/tools/ToolRelatedArticles";
import { buildPageMetadata, breadcrumbListSchema, webApplicationSchema } from "@/lib/seo";

const PAGE_PATH = "/tools/emergency-guide";

export const metadata: Metadata = buildPageMetadata({
  title: "寵物急救指南 — 步驟式緊急處理方法",
  description:
    "寵物中毒、中暑、噎到、抽搐、外傷、公貓尿道阻塞——6 種緊急情況的步驟式急救指南，幫你冷靜處理、及時送醫。",
  keywords: ["寵物急救", "狗中毒怎麼辦", "貓急救", "寵物中暑急救", "狗噎到", "貓尿不出來"],
  path: PAGE_PATH,
});

export default function EmergencyGuidePage() {
  const breadcrumb = breadcrumbListSchema([
    { label: '首頁', href: '/' },
    { label: '工具', href: '/tools' },
    { label: '寵物急救指南' },
  ]);
  return (
    <>
      <JsonLd data={breadcrumb} />
      <JsonLd
        data={webApplicationSchema({
          name: "寵物急救指南",
          description: "6 種緊急情況的步驟式急救流程",
          path: PAGE_PATH,
        })}
      />
      <div className="mx-auto w-full max-w-3xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 text-3xl mb-4">
            🚨
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-ink-900 mb-3">
            寵物急救指南
          </h1>
          <p className="text-ink-500">
            遇到緊急狀況，冷靜按照步驟處理
          </p>
        </div>

        <Card padding="lg">
          <EmergencyGuide />
        </Card>
        <AdBanner slot="tool-result" format="horizontal" className="mt-6" />
        <ToolRelatedArticles toolSlug="emergency-guide" />
      </div>
    </>
  );
}
