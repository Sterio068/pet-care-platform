import { AdBanner } from "@/components/ads/AdBanner";
import type { Metadata } from "next";
import { Card } from "@/components/ui/Card";
import { AgeCalculator } from "@/components/tools/AgeCalculator";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildPageMetadata, webApplicationSchema } from "@/lib/seo";

const PAGE_PATH = "/tools/pet-age";

export const metadata: Metadata = buildPageMetadata({
  title: "寵物年齡換算 — 狗貓年齡對照人類年齡",
  description:
    "免費線上寵物年齡換算工具。輸入狗狗或貓咪的年齡，立即計算相當於人類幾歲，並顯示生命階段建議。支援不同體型犬種。",
  keywords: ["狗年齡換算", "貓年齡計算", "寵物年齡", "狗歲數對照表", "貓歲數"],
  path: PAGE_PATH,
});

export default function PetAgePage() {
  return (
    <>
      <JsonLd
        data={webApplicationSchema({
          name: "寵物年齡換算",
          description: "狗貓年齡對照人類年齡的換算工具",
          path: PAGE_PATH,
        })}
      />
      <div className="mx-auto w-full max-w-3xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-100 text-3xl mb-4">
            🎂
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-ink-900 mb-3">
            寵物年齡換算
          </h1>
          <p className="text-ink-500">
            輸入毛孩的實際年齡，換算成相當於人類的年齡
          </p>
        </div>

        <Card padding="lg">
          <AgeCalculator />
        </Card>
        <AdBanner slot="tool-result" format="horizontal" className="mt-6" />

        {/* SEO 知識內容 */}
        <article className="mt-10 prose prose-lg max-w-none text-ink-700 leading-relaxed">
          <h2 className="text-2xl font-bold text-ink-900 mb-4">
            狗貓年齡怎麼換算？
          </h2>
          <p>
            很多人以為寵物的一歲等於人類的七歲，但其實這個說法並不準確。根據美國獸醫師協會（AVMA）與美國動物醫院協會（AAHA）的研究，狗狗和貓咪的老化速度並不是線性的——幼年期成長飛快，成年後減緩，進入老年則再度加速。
          </p>

          <h3 className="text-xl font-semibold text-ink-900 mt-6 mb-3">
            狗狗的年齡換算
          </h3>
          <p>狗狗的換算方式會因體型大小而有差異：</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>第 1 年 =</strong> 人類 15 歲（相當於從嬰兒到青少年）
            </li>
            <li>
              <strong>第 2 年 =</strong> 人類 24 歲（完成成年）
            </li>
            <li>
              <strong>第 3 年之後：</strong>
              小型犬每年 +4 歲、中型犬每年 +5 歲、大型犬每年 +6 歲
            </li>
          </ul>
          <p>
            舉例來說，一隻 8 歲的中型米克斯狗狗，約等於人類的 54 歲；而同樣 8 歲的大型黃金獵犬，則已經約 60 歲，屬於高齡階段。
          </p>

          <h3 className="text-xl font-semibold text-ink-900 mt-6 mb-3">
            貓咪的年齡換算
          </h3>
          <p>貓咪的換算相對單純，因為體型差異較小：</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>第 1 年 =</strong> 人類 15 歲
            </li>
            <li>
              <strong>第 2 年 =</strong> 人類 24 歲
            </li>
            <li>
              <strong>第 3 年之後：</strong> 每年 +4 歲
            </li>
          </ul>

          <h3 className="text-xl font-semibold text-ink-900 mt-6 mb-3">
            不同生命階段的照護重點
          </h3>
          <p>
            了解毛孩的相當人類年齡，有助於飼主針對不同生命階段提供適切的照護：
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>幼年期（0-1 歲）：</strong>
              需完整疫苗接種、建立社會化、選擇高營養密度飼料
            </li>
            <li>
              <strong>成年期（2-6 歲狗 / 2-9 歲貓）：</strong>
              維持理想體重、定期健康檢查、預防牙結石
            </li>
            <li>
              <strong>老年期（7 歲以上狗 / 10 歲以上貓）：</strong>
              每半年一次健檢、注意關節保養、調整低磷低鈉飲食
            </li>
          </ul>

          <div className="mt-8 p-5 bg-brand-50 border-l-4 border-brand-400 rounded-r-[12px]">
            <p className="text-sm text-ink-700 leading-relaxed m-0">
              <strong>💡 飼主提醒：</strong>
              狗貓的老化速度比人類快 5-7 倍，因此建議中年以後（狗 5 歲、貓 7 歲起）
              每年至少做一次健康檢查，包含血檢、尿檢等基礎項目，可以及早發現慢性疾病。
            </p>
          </div>
        </article>
      </div>
    </>
  );
}
