"use client";

import { AdBanner } from "./AdBanner";

/**
 * 文章中間廣告：放在長文章的中段
 * 用 CSS :nth-of-type 在第 3 個 h2 前自動顯示
 */
export function InArticleAd() {
  return (
    <div className="my-8">
      <AdBanner slot="article-mid" format="horizontal" />
    </div>
  );
}
