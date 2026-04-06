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
          <h2 className="text-2xl font-bold text-ink-900 mb-4">內容審核原則</h2>
          <ul className="space-y-3 text-ink-700 leading-relaxed">
            <li className="flex items-start gap-2">
              <span className="text-brand-500 mt-1">✓</span>
              <span>
                <strong>以獸醫學實證為基礎：</strong>
                所有健康相關的資料參考 AVMA、WSAVA、AAHA 等國際獸醫組織指引
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-brand-500 mt-1">✓</span>
              <span>
                <strong>定期更新：</strong>
                疫苗時程、飼養建議會隨最新研究調整，避免過時資訊誤導飼主
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-brand-500 mt-1">✓</span>
              <span>
                <strong>明確的免責聲明：</strong>
                所有工具與文章都會提醒「僅供參考，不能取代獸醫診斷」
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-brand-500 mt-1">✓</span>
              <span>
                <strong>無業配、無爭議：</strong>
                不推薦特定品牌，只介紹科學原理與判斷方法
              </span>
            </li>
          </ul>
        </Card>

        <Card padding="lg">
          <h2 className="text-2xl font-bold text-ink-900 mb-4">
            為什麼完全免費？
          </h2>
          <p className="text-ink-700 leading-relaxed mb-4">
            我們相信寵物健康資訊不應該有門檻。你不需要註冊會員、不需要訂閱付費、不需要留 Email，就可以使用所有工具和閱讀所有文章。
          </p>
          <p className="text-ink-700 leading-relaxed">
            本站透過廣告與未來的服務媒合維持營運，但這不會影響內容中立性——我們絕不會為了流量或廣告營收，刻意推薦可能不適合你毛孩的產品。
          </p>
        </Card>

        <Card padding="lg">
          <h2 className="text-2xl font-bold text-ink-900 mb-4">聯絡我們</h2>
          <p className="text-ink-700 leading-relaxed mb-3">
            發現文章錯誤、有內容建議、或想合作？歡迎透過以下方式聯絡：
          </p>
          <ul className="space-y-2 text-ink-700">
            <li>📧 Email: <span className="text-ink-500">（待設定）</span></li>
            <li>💬 意見回饋表單: <span className="text-ink-500">（待建立）</span></li>
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
              className="inline-flex items-center gap-2 bg-white text-brand-600 font-semibold px-6 py-3 rounded-[14px] shadow-sm border border-brand-200 hover:bg-brand-50 transition-all"
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
