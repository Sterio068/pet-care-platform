import type { Metadata } from "next";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { buildPageMetadata, SITE_NAME } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "服務條款",
  description: `${SITE_NAME}的服務條款，使用本站即表示您同意以下條款。`,
  keywords: ["服務條款", "使用規範"],
  path: "/terms",
});

export default function TermsPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 sm:px-6 lg:px-8 py-10 md:py-16">
      <Breadcrumb items={[{ label: "首頁", href: "/" }, { label: "服務條款" }]} />
      <h1 className="text-3xl md:text-4xl font-extrabold text-ink-900 mb-8">
        服務條款
      </h1>
      <div className="prose prose-lg max-w-none text-ink-700 leading-relaxed space-y-6">
        <p>最後更新日期：2026 年 4 月 6 日</p>

        <h2 className="text-xl font-bold text-ink-900">一、服務說明</h2>
        <p>
          {SITE_NAME}（以下簡稱「本站」）提供寵物照護相關的資訊工具與文章內容。所有服務均免費提供，無需註冊即可使用。
        </p>

        <h2 className="text-xl font-bold text-ink-900">二、內容免責聲明</h2>
        <p>
          本站所有工具計算結果與文章內容<strong>僅供參考</strong>，不構成任何醫療診斷、治療建議或專業獸醫意見。寵物健康問題請務必諮詢合格的獸醫師。
        </p>
        <p>本站不對以下情況負責：</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>因使用本站資訊而做出的決定或行動所導致的後果</li>
          <li>工具計算結果的絕對準確性</li>
          <li>文章內容可能存在的疏漏或過時資訊</li>
          <li>因網路中斷或系統故障導致的服務無法使用</li>
        </ul>

        <h2 className="text-xl font-bold text-ink-900">三、智慧財產權</h2>
        <p>
          本站的所有原創內容（包括文字、圖片、工具設計）受著作權法保護。未經書面許可，不得複製、轉載或用於商業用途。合理引用需註明出處並附上原文連結。
        </p>

        <h2 className="text-xl font-bold text-ink-900">四、使用規範</h2>
        <p>使用本站時，您同意不會：</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>以自動化工具大量擷取本站內容</li>
          <li>試圖攻擊或破壞網站運作</li>
          <li>冒充本站發布不實資訊</li>
          <li>將本站內容用於違法用途</li>
        </ul>

        <h2 className="text-xl font-bold text-ink-900">五、廣告</h2>
        <p>
          本站透過 Google AdSense 顯示廣告以維持營運。廣告內容由 Google 自動投放，不代表本站立場或推薦。如果您發現不當廣告，歡迎向我們舉報。
        </p>

        <h2 className="text-xl font-bold text-ink-900">六、外部連結</h2>
        <p>
          本站可能包含外部網站的連結。這些連結僅供便利使用，本站不對外部網站的內容、隱私政策或安全性負責。
        </p>

        <h2 className="text-xl font-bold text-ink-900">七、條款修改</h2>
        <p>
          本站保留隨時修改服務條款的權利。修改後的條款將在本頁面公布，繼續使用本站即視為同意修改後的條款。
        </p>

        <h2 className="text-xl font-bold text-ink-900">八、準據法</h2>
        <p>
          本條款受中華民國法律管轄。如有爭議，雙方同意以台灣台北地方法院為第一審管轄法院。
        </p>
      </div>
    </div>
  );
}
