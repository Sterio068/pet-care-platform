import type { Metadata } from "next";
import { Card } from "@/components/ui/Card";
import { PetNameGenerator } from "@/components/tools/PetNameGenerator";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildPageMetadata, webApplicationSchema } from "@/lib/seo";

const PAGE_PATH = "/tools/name-generator";

export const metadata: Metadata = buildPageMetadata({
  title: "寵物取名器 — 幫毛孩取一個可愛的名字",
  description:
    "100+ 個精選寵物名字！依風格（可愛、食物系、日式、優雅、英文）與性別隨機推薦，幫狗狗貓咪取一個獨特的好名字。",
  keywords: ["寵物名字", "狗名字", "貓名字", "寵物取名", "狗狗名字推薦"],
  path: PAGE_PATH,
});

export default function NameGeneratorPage() {
  return (
    <>
      <JsonLd
        data={webApplicationSchema({
          name: "寵物取名器",
          description: "幫狗狗貓咪取一個可愛的名字",
          path: PAGE_PATH,
        })}
      />
      <div className="mx-auto w-full max-w-2xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-100 text-3xl mb-4">
            ✨
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-ink-900 mb-3">
            寵物取名器
          </h1>
          <p className="text-ink-500">
            選風格、按隨機、收藏你喜歡的名字
          </p>
        </div>

        <Card padding="lg">
          <PetNameGenerator />
        </Card>
      </div>
    </>
  );
}
