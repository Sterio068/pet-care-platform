import type { Metadata } from "next";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "關於毛孩照護站 — 我們的理念與團隊",
  description:
    "毛孩照護站是為台灣毛孩家長打造的寵物照護資訊平台。了解我們的使命、內容審核流程，以及為什麼所有工具和文章都是免費的。",
  keywords: ["毛孩照護站", "關於我們", "寵物照護網站"],
  path: "/about",
});

export default function AboutPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 sm:px-6 lg:px-8 py-10 md:py-16">
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-brand-100 text-4xl mb-4">
          🐾
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-ink-900 mb-3">
          關於毛孩照護站
        </h1>
        <p className="text-ink-500 max-w-xl mx-auto">
          為台灣毛孩家長打造的實用工具與照護知識平台
        </p>
      </div>

      <div className="space-y-8">
        <Card padding="lg">
          <h2 className="text-2xl font-bold text-ink-900 mb-4">我們的使命</h2>
          <p className="text-ink-700 leading-relaxed mb-4">
            台灣有超過 300 萬戶養狗貓的家庭，但網路上關於寵物照護的資訊品質參差不齊——有些是廠商的行銷話術，有些是過時的觀念，有些則來源不明。
          </p>
          <p className="text-ink-700 leading-relaxed">
            <strong>毛孩照護站的目標，是讓每一位飼主都能輕鬆找到正確、實用、免費的照護資訊。</strong>
            不論你是第一次養寵的新手，還是有十年經驗的資深家長，都能在這裡得到幫助。
          </p>
        </Card>

        <Card padding="lg">
          <h2 className="text-2xl font-bold text-ink-900 mb-4">內容來源與編輯流程</h2>
          <ul className="space-y-3 text-ink-700 leading-relaxed">
            <li className="flex items-start gap-2">
              <span className="text-brand-500 mt-1">✓</span>
              <span>
                <strong>優先使用可查來源：</strong>
                健康、營養與行為文章會優先參考獸醫組織、動物醫院教學資源、政府機關或學術資料，重要文章頁面會列出主要來源
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-brand-500 mt-1">✓</span>
              <span>
                <strong>轉成台灣飼主可操作的內容：</strong>
                交通、認養、保險與日常照護會盡量以台灣常見情境說明，並提醒規定與條款需以官方最新公告為準
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-brand-500 mt-1">✓</span>
              <span>
                <strong>編輯校對但不假裝診斷：</strong>
                文章由編輯部整理、查核來源與修訂措辭；本站不是動物醫院，也不提供個案診斷、處方或急救替代方案
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-brand-500 mt-1">✓</span>
              <span>
                <strong>保持內容中立：</strong>
                不以業配方式推薦特定品牌；若內容涉及產品、保險或服務，重點放在判斷方法、風險與應詢問的問題
              </span>
            </li>
          </ul>
          <p className="mt-4 text-sm text-ink-500 leading-relaxed">
            完整說明請見{" "}
            <Link href="/editorial-policy" className="text-brand-600 hover:underline">
              編輯政策
            </Link>
            ，常用資料來源請見{" "}
            <Link href="/sources" className="text-brand-600 hover:underline">
              資料來源
            </Link>
            。
          </p>
        </Card>

        <Card padding="lg">
          <h2 className="text-2xl font-bold text-ink-900 mb-4">
            我們如何維持內容可信度
          </h2>
          <div className="space-y-4 text-ink-700 leading-relaxed">
            <p>
              寵物健康資訊容易被過度簡化，所以我們不把單一文章寫成「唯一答案」。每篇內容會盡量交代適用情境、需要就醫的警訊、資料限制，以及讀者應該向獸醫師確認的問題。
            </p>
            <p>
              如果一篇文章涉及醫療、營養、毒物、疫苗或老年照護，我們會優先參考可回查來源，並在文章頁標出主要來源。若來源更新、連結失效或讀者回報錯誤，我們會重新檢查文章與工具說明。
            </p>
            <p>
              本站目前由「毛孩照護站編輯部」維護；未來若有獸醫師、訓練師或其他專業顧問參與單篇內容，會在該頁清楚標示姓名、角色與參與方式。
            </p>
          </div>
        </Card>

        <Card padding="lg">
          <h2 className="text-2xl font-bold text-ink-900 mb-4">
            為什麼完全免費？
          </h2>
          <p className="text-ink-700 leading-relaxed mb-4">
            我們相信寵物健康資訊不應該有門檻。你不需要註冊會員、不需要訂閱付費、不需要留 Email，就可以使用所有工具和閱讀所有文章。
          </p>
          <p className="text-ink-700 leading-relaxed">
            本站未來可能透過廣告與服務媒合維持營運，但這不會影響內容中立性。廣告不會取代照護判斷，文章也不會為了廣告營收刻意推薦可能不適合你毛孩的產品。
          </p>
          <p className="text-ink-700 leading-relaxed mt-4">
            若頁面出現廣告，它們會與主要內容保持區隔；我們不鼓勵、暗示或要求讀者點擊廣告，也不讓廣告決定文章結論。
          </p>
        </Card>

        <Card padding="lg">
          <h2 className="text-2xl font-bold text-ink-900 mb-4">聯絡我們</h2>
          <p className="text-ink-700 leading-relaxed mb-3">
            發現文章錯誤、有內容建議、或想合作？歡迎透過以下方式聯絡：
          </p>
          <ul className="space-y-2 text-ink-700">
            <li>📧 Email: <a href="mailto:sterio068@gmail.com" className="text-brand-500 hover:underline">sterio068@gmail.com</a></li>
            <li>
              <Link href="/contact" className="text-brand-500 hover:underline">
                聯絡頁與回報說明
              </Link>
            </li>
          </ul>
        </Card>

        <div className="text-center pt-4">
          <p className="text-sm text-ink-500 mb-4">準備好開始使用了嗎？</p>
          <div className="flex gap-3 justify-center flex-wrap">
            <Link
              href="/tools"
              className="inline-flex items-center gap-2 bg-brand-500 text-white font-semibold px-6 py-3 rounded-[14px] shadow-sm hover:bg-brand-600 hover:shadow-md transition-all"
            >
              瀏覽工具
              <span aria-hidden="true">→</span>
            </Link>
            <Link
              href="/articles"
              className="inline-flex items-center gap-2 bg-[var(--surface-card)] text-brand-600 font-semibold px-6 py-3 rounded-[14px] shadow-sm border border-brand-200 hover:bg-brand-50 transition-all"
            >
              閱讀文章
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
