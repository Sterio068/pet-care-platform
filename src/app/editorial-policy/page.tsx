import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { Card } from "@/components/ui/Card";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "編輯政策 — 內容來源、校對與更新方式",
  description:
    "毛孩照護站的編輯政策，說明文章如何選題、查核來源、標示更新日期，以及健康資訊為何不能取代獸醫診斷。",
  keywords: ["編輯政策", "內容來源", "寵物照護資訊", "資料校對"],
  path: "/editorial-policy",
});

export default function EditorialPolicyPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 sm:px-6 lg:px-8 py-10 md:py-16">
      <Breadcrumb
        items={[{ label: "首頁", href: "/" }, { label: "編輯政策" }]}
      />

      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-extrabold text-ink-900 mb-3">
          編輯政策
        </h1>
        <p className="text-ink-500 leading-relaxed">
          我們希望每篇文章都能幫飼主做出更穩妥的日常判斷，同時清楚標出哪些事情需要交給獸醫師。
        </p>
      </header>

      <div className="space-y-6">
        <Card padding="lg">
          <h2 className="text-xl font-bold text-ink-900 mb-3">
            內容如何產生
          </h2>
          <p className="text-ink-700 leading-relaxed">
            毛孩照護站由編輯部規劃選題，優先處理台灣飼主常遇到的照護問題，例如疫苗、飲食、行為、清潔、就醫準備與領養決策。文章會整理成可操作的步驟、判斷表與就醫界線，而不是只堆疊通用資訊。
          </p>
        </Card>

        <Card padding="lg">
          <h2 className="text-xl font-bold text-ink-900 mb-3">
            來源與校對原則
          </h2>
          <ul className="list-disc pl-5 space-y-2 text-ink-700 leading-relaxed">
            <li>健康與營養主題優先參考獸醫組織、獸醫學校、動物醫院教學資源、政府或學術資料。</li>
            <li>涉及台灣交通、認養、保險或法規時，會優先查官方或業者公開條款，並提醒以最新公告為準。</li>
            <li>文章頁若有主要參考資料，會在文末列出「資料來源與校對說明」。</li>
            <li>不引用來路不明的偏方、社群傳言或無法查證的數字作為醫療建議。</li>
          </ul>
          <p className="mt-4 text-sm text-ink-500 leading-relaxed">
            已整理的來源索引請見{" "}
            <Link href="/sources" className="text-brand-600 hover:underline">
              資料來源
            </Link>
            。
          </p>
        </Card>

        <Card padding="lg">
          <h2 className="text-xl font-bold text-ink-900 mb-3">
            作者與責任標示
          </h2>
          <p className="text-ink-700 leading-relaxed">
            文章作者標示為「毛孩照護站編輯部」。我們會查核來源、修訂措辭與補充台灣情境，但本站不是動物醫院，也不會宣稱文章已由特定獸醫師審稿。若未來有獸醫師或專業顧問參與單篇內容，我們會在該頁明確標示姓名、角色與參與方式。
          </p>
        </Card>

        <Card padding="lg">
          <h2 className="text-xl font-bold text-ink-900 mb-3">
            更新與修正
          </h2>
          <p className="text-ink-700 leading-relaxed mb-3">
            文章會顯示首次發布與最近更新日期。當來源變更、法規或官方條款調整、或內容需要補充時，我們會更新文章與結構化資料的修改日期。
          </p>
          <p className="text-ink-700 leading-relaxed">
            如果你發現錯誤、過時資料或表述不清，歡迎透過{" "}
            <Link href="/contact" className="text-brand-600 hover:underline">
              聯絡頁
            </Link>{" "}
            告訴我們。
          </p>
        </Card>

        <Card padding="lg">
          <h2 className="text-xl font-bold text-ink-900 mb-3">
            廣告、合作與內容獨立性
          </h2>
          <p className="text-ink-700 leading-relaxed mb-3">
            本站可能透過廣告維持營運，但廣告不會決定文章結論、工具設計或來源選擇。我們不會撰寫鼓勵點擊廣告的文案，也不會把廣告偽裝成照護建議。
          </p>
          <p className="text-ink-700 leading-relaxed">
            若未來出現合作、贊助或聯盟連結，我們會在相關頁面清楚標示，並保留內容判斷的獨立性。
          </p>
        </Card>

        <Card padding="lg">
          <h2 className="text-xl font-bold text-ink-900 mb-3">
            醫療免責說明
          </h2>
          <p className="text-ink-700 leading-relaxed">
            本站內容僅供照護教育與就醫前準備參考，不能取代專業獸醫師的診斷、治療或用藥建議。若毛孩出現呼吸困難、持續嘔吐腹瀉、出血、抽搐、疑似中毒、嚴重疼痛或精神明顯變差，請優先聯絡動物醫院。
          </p>
        </Card>
      </div>
    </div>
  );
}
