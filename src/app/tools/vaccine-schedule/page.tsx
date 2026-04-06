import { AdBanner } from "@/components/ads/AdBanner";
import type { Metadata } from "next";
import { Card } from "@/components/ui/Card";
import { VaccineTimeline } from "@/components/tools/VaccineTimeline";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildPageMetadata, webApplicationSchema } from "@/lib/seo";

const PAGE_PATH = "/tools/vaccine-schedule";

export const metadata: Metadata = buildPageMetadata({
  title: "狗貓疫苗時程表 — 幼犬幼貓預防針完整時間",
  description:
    "完整的狗狗貓咪疫苗時程表，包含五合一、八合一、三合一、狂犬病等必要疫苗的施打週齡與順序，幫助新手飼主掌握幼犬幼貓預防針時間。",
  keywords: ["狗疫苗時間", "貓疫苗", "寵物預防針", "幼犬疫苗", "幼貓疫苗", "五合一", "八合一"],
  path: PAGE_PATH,
});

export default function VaccineSchedulePage() {
  return (
    <>
      <JsonLd
        data={webApplicationSchema({
          name: "狗貓疫苗時程表",
          description: "幼犬幼貓預防針完整時間表",
          path: PAGE_PATH,
        })}
      />
      <div className="mx-auto w-full max-w-3xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent-100 text-3xl mb-4">
            💉
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-ink-900 mb-3">
            狗貓疫苗時程表
          </h1>
          <p className="text-ink-500">幫毛孩建立完整免疫保護，從幼年期就要開始</p>
        </div>

        <Card padding="lg">
          <VaccineTimeline />
        </Card>
        <AdBanner slot="tool-result" format="horizontal" className="mt-6" />

        <article className="mt-10 prose prose-lg max-w-none text-ink-700 leading-relaxed">
          <h2 className="text-2xl font-bold text-ink-900 mb-4">
            為什麼幼犬幼貓一定要打疫苗？
          </h2>
          <p>
            幼年期的毛孩免疫系統尚未發展完全，對多種傳染病抵抗力弱。透過疫苗建立主動免疫，是保護毛孩遠離致命疾病最有效的方法。台灣常見的犬貓傳染病許多都可以透過規律疫苗接種來預防。
          </p>

          <h3 className="text-xl font-semibold text-ink-900 mt-6 mb-3">
            狗狗必打的核心疫苗
          </h3>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>犬瘟熱：</strong>高致死率傳染病，幼犬死亡率可達 50%
            </li>
            <li>
              <strong>犬小病毒：</strong>引起嚴重血便、脫水，幼犬殺手
            </li>
            <li>
              <strong>傳染性肝炎：</strong>腺病毒引起的肝臟疾病
            </li>
            <li>
              <strong>副流行性感冒：</strong>犬舍咳主要病原
            </li>
            <li>
              <strong>狂犬病：</strong>
              <span className="text-brand-600 font-semibold">法定必打</span>
              ，台灣每年須補強
            </li>
          </ul>

          <h3 className="text-xl font-semibold text-ink-900 mt-6 mb-3">
            貓咪必打的核心疫苗
          </h3>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>貓瘟（貓泛白血球減少症）：</strong>高致死率，幼貓極度危險
            </li>
            <li>
              <strong>貓皰疹病毒：</strong>引起上呼吸道感染、結膜炎
            </li>
            <li>
              <strong>貓卡里西病毒：</strong>造成口腔潰瘍、鼻炎
            </li>
            <li>
              <strong>狂犬病：</strong>法定必打，外出貓建議施打
            </li>
          </ul>

          <h3 className="text-xl font-semibold text-ink-900 mt-6 mb-3">
            疫苗施打注意事項
          </h3>
          <ol className="list-decimal pl-5 space-y-2">
            <li>施打前請確認毛孩健康狀況良好、無發燒、無腹瀉</li>
            <li>打完疫苗後建議在醫院觀察 30 分鐘，避免過敏反應</li>
            <li>疫苗後 3-7 天內避免洗澡、劇烈運動</li>
            <li>完整基礎免疫後，之後每年需補強一次</li>
            <li>懷孕、哺乳中的母犬貓一般不建議施打</li>
          </ol>

          <div className="mt-8 p-5 bg-accent-50 border-l-4 border-accent-400 rounded-r-[12px]">
            <p className="text-sm text-ink-700 leading-relaxed m-0">
              <strong>⚠️ 重要提醒：</strong>
              以上時程為一般建議，實際施打時程應由獸醫師依照毛孩健康狀態、母抗體水平、地區疾病流行狀況等因素綜合評估。請務必與信任的獸醫師討論最適合的疫苗計畫。
            </p>
          </div>
        </article>
      </div>
    </>
  );
}
