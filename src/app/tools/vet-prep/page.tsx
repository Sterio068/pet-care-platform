import { AdBanner } from "@/components/ads/AdBanner";
import type { Metadata } from "next";
import { Card } from "@/components/ui/Card";
import { VetPrepChecklist } from "@/components/tools/VetPrepChecklist";
import { JsonLd } from "@/components/seo/JsonLd";
import { ToolRelatedArticles } from "@/components/tools/ToolRelatedArticles";
import { buildPageMetadata, webApplicationSchema } from "@/lib/seo";

const PAGE_PATH = "/tools/vet-prep";

export const metadata: Metadata = buildPageMetadata({
  title: "就醫準備清單 — 帶毛孩看醫生前必做的事",
  description:
    "選擇就診原因，自動產生該帶的東西、該拍的照片、該問醫生的問題。讓每次看診都有充分準備。",
  keywords: ["帶寵物看醫生", "獸醫看診準備", "寵物就醫", "看獸醫帶什麼"],
  path: PAGE_PATH,
});

export default function VetPrepPage() {
  return (
    <>
      <JsonLd data={webApplicationSchema({ name: "就醫準備清單", description: "看獸醫前的準備工具", path: PAGE_PATH })} />
      <div className="mx-auto w-full max-w-3xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-3xl mb-4">🏥</div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-ink-900 mb-3">就醫準備清單</h1>
          <p className="text-ink-500">選就診原因，自動產生需要準備的清單</p>
        </div>
        <Card padding="lg"><VetPrepChecklist /></Card>
        <AdBanner slot="tool-result" format="horizontal" className="mt-6" />
        <ToolRelatedArticles toolSlug="vet-prep" />
      </div>
    </>
  );
}
