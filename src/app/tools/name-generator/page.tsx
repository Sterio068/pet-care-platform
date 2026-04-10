import { AdBanner } from "@/components/ads/AdBanner";
import type { Metadata } from "next";
import { Card } from "@/components/ui/Card";
import { PetNameGenerator } from "@/components/tools/PetNameGenerator";
import { JsonLd } from "@/components/seo/JsonLd";
import { ToolRelatedArticles } from "@/components/tools/ToolRelatedArticles";
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
        <AdBanner slot="tool-result" format="horizontal" className="mt-6" />

        <article className="mt-10 prose prose-lg max-w-none text-ink-700 leading-relaxed">
          <h2 className="text-2xl font-bold text-ink-900 mb-4">幫毛孩取名的技巧</h2>
          <p>好的寵物名字應該簡短（1-2 個音節最佳）、好唸、獨特。避免跟家人名字太像，也避免跟常用口令（坐下、過來）同音。</p>
          <h3 className="text-xl font-semibold text-ink-900 mt-6 mb-3">取名靈感來源</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>外觀特徵</strong>：毛色（小黑、橘子）、體型（圓圓、肥肥）</li>
            <li><strong>食物系</strong>：台灣飼主最愛的命名風格（麻糬、布丁、奶茶）</li>
            <li><strong>個性</strong>：觀察幾天後依個性取名（乖乖、皮皮）</li>
            <li><strong>日系</strong>：柴犬配日式名字很搭（太郎、小櫻、福福）</li>
          </ul>
          <p>本工具收錄超過 100 個精選名字，涵蓋可愛、食物系、自然系、日式、優雅、英文 6 種風格。</p>
        </article>
        <ToolRelatedArticles toolSlug="name-generator" />
      </div>
    </>
  );
}
