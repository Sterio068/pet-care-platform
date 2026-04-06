import type { Metadata } from "next";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { buildPageMetadata, SITE_NAME } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "隱私權政策",
  description: `${SITE_NAME}的隱私權政策，說明我們如何收集、使用與保護您的個人資料。`,
  keywords: ["隱私權政策", "個人資料保護"],
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 sm:px-6 lg:px-8 py-10 md:py-16">
      <Breadcrumb items={[{ label: "首頁", href: "/" }, { label: "隱私權政策" }]} />
      <h1 className="text-3xl md:text-4xl font-extrabold text-ink-900 mb-8">
        隱私權政策
      </h1>
      <div className="prose prose-lg max-w-none text-ink-700 leading-relaxed space-y-6">
        <p>最後更新日期：2026 年 4 月 6 日</p>

        <h2 className="text-xl font-bold text-ink-900">一、收集的資訊</h2>
        <p>
          {SITE_NAME}（以下簡稱「本站」）尊重每位使用者的隱私權。本站不會主動收集您的姓名、電子郵件、電話號碼等個人身份資訊，除非您主動提供（例如訂閱電子報或填寫聯絡表單）。
        </p>
        <p>本站可能自動收集的非個人資訊包括：</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>瀏覽器類型與版本</li>
          <li>裝置類型（桌機、手機、平板）</li>
          <li>來源頁面、瀏覽頁面、停留時間</li>
          <li>IP 位址（匿名化處理）</li>
        </ul>

        <h2 className="text-xl font-bold text-ink-900">二、Google Analytics</h2>
        <p>
          本站使用 Google Analytics 4（GA4）分析網站流量與使用者行為。GA4 會透過 Cookie 收集匿名的統計資料，用於改善網站內容與使用體驗。您可以透過瀏覽器設定停用 Cookie，或安裝 Google Analytics Opt-out 擴充功能。
        </p>

        <h2 className="text-xl font-bold text-ink-900">三、Google AdSense</h2>
        <p>
          本站使用 Google AdSense 顯示廣告。Google 及其合作夥伴可能會使用 Cookie 根據您的瀏覽記錄提供個人化廣告。您可以前往 Google 的廣告設定頁面，管理或停用個人化廣告。
        </p>

        <h2 className="text-xl font-bold text-ink-900">四、本地儲存（localStorage）</h2>
        <p>
          本站的部分工具（如體重追蹤器）會使用瀏覽器的 localStorage 儲存資料。這些資料僅存在您的裝置上，不會傳送到任何伺服器。清除瀏覽器資料將刪除這些記錄。
        </p>

        <h2 className="text-xl font-bold text-ink-900">五、Cookie 政策</h2>
        <p>本站使用的 Cookie 類型包括：</p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>必要 Cookie：</strong>網站基本功能所需</li>
          <li><strong>分析 Cookie：</strong>Google Analytics 用於匿名流量統計</li>
          <li><strong>廣告 Cookie：</strong>Google AdSense 用於投放廣告</li>
        </ul>

        <h2 className="text-xl font-bold text-ink-900">六、第三方連結</h2>
        <p>
          本站文章可能包含外部網站的連結（例如獸醫院、產品頁面）。本站對這些外部網站的隱私政策概不負責，建議您在造訪外部網站前查閱其隱私權政策。
        </p>

        <h2 className="text-xl font-bold text-ink-900">七、兒童隱私</h2>
        <p>
          本站不會刻意收集 13 歲以下兒童的個人資訊。如果我們發現無意間收集了兒童資訊，將立即刪除。
        </p>

        <h2 className="text-xl font-bold text-ink-900">八、政策變更</h2>
        <p>
          本站保留隨時修改隱私權政策的權利。修改後將更新本頁的「最後更新日期」。建議您定期查閱本頁面。
        </p>

        <h2 className="text-xl font-bold text-ink-900">九、聯絡方式</h2>
        <p>
          若您對隱私權政策有任何疑問，歡迎透過網站聯絡方式與我們聯繫。
        </p>
      </div>
    </div>
  );
}
