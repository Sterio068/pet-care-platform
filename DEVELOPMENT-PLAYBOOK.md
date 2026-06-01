# SEO 流量變現網站開發 Playbook

> 本文件記錄「毛孩照護站 maohai.org」從零到上線的完整開發流程。
> 可作為下一個 SEO 流量網站的開發模板複製使用。

---

## 目錄

1. [專案定位與規劃](#1-專案定位與規劃)
2. [技術架構選型](#2-技術架構選型)
3. [開發環境建置](#3-開發環境建置)
4. [Phase 1：核心工具開發](#4-phase-1核心工具開發)
5. [Phase 2：內容系統](#5-phase-2內容系統)
6. [Phase 3：SEO 優化](#6-phase-3seo-優化)
7. [Phase 4：變現準備](#7-phase-4變現準備)
8. [Phase 5：部署上線](#8-phase-5部署上線)
9. [Phase 6：持續擴充](#9-phase-6持續擴充)
10. [Phase 7：審核後監控與品質 Gate](#10-phase-7審核後監控與品質-gate)
11. [關鍵數字與成果](#11-關鍵數字與成果)
12. [踩過的坑](#12-踩過的坑)
13. [複製到新專案的 Checklist](#13-複製到新專案的-checklist)

---

## 1. 專案定位與規劃

### 1.1 選題原則

- **有穩定搜尋量**：選人們會持續搜尋的主題（健康、教育、工具類）
- **可工具化**：提供計算器、檢查器等互動工具，不只是文章
- **長尾關鍵字豐富**：能產出大量不同頁面覆蓋不同搜尋詞
- **廣告友善**：主題對應的 AdSense 廣告 CPC 要夠高

### 1.2 本專案選題

| 項目 | 內容 |
|------|------|
| 主題 | 寵物照護（台灣 300 萬養寵家庭） |
| 變現 | Google AdSense 廣告 |
| 語言 | 繁體中文 |
| 目標 | 月流量 5 萬+，月收 $15,000+ TWD |

### 1.3 規劃文件

開發前先寫一份 PLAN.md，包含：
- 技術架構選型理由
- 檔案結構
- 開發階段與順序
- SEO 關鍵字策略
- 收入預估
- 設計規範（色彩、字體、圓角）

---

## 2. 技術架構選型

### 2.1 為什麼選 Next.js？

| 需求 | Next.js 解決方案 |
|------|----------------|
| SEO | SSG 靜態預渲染，Google 直接讀取完整 HTML |
| 效能 | 自動 code splitting、圖片優化、字體優化 |
| 部署 | Vercel 免費方案，自動 CI/CD |
| 開發速度 | App Router 檔案路由，TypeScript 型別安全 |

### 2.2 完整技術棧

```
框架：Next.js 16 (App Router)
語言：TypeScript 5
樣式：Tailwind CSS v4
內容：MDX + remark-gfm
部署：Vercel（免費方案）
分析：Google Analytics 4
廣告：Google AdSense
SEO：內建 Metadata API + sitemap.ts + robots.ts
```

### 2.3 Tailwind v4 注意事項

Tailwind v4 跟 v3 差異很大：
- **不用 tailwind.config.ts**，改用 CSS `@theme` 定義主題
- `@import "tailwindcss"` 取代 `@tailwind` 指令
- PostCSS 用 `@tailwindcss/postcss`
- 自訂工具用 `@utility` 語法

```css
/* globals.css */
@import "tailwindcss";

@theme {
  --color-brand-500: #FF6B35;
  --color-accent-500: #2EC4B6;
  --font-sans: var(--font-noto-sans-tc), system-ui, sans-serif;
  --radius-card: 20px;
}
```

---

## 3. 開發環境建置

### 3.1 初始化

```bash
# 安裝 Node.js
brew install node

# 建立專案
npx create-next-app@latest my-project --typescript --tailwind --app --src-dir --eslint

# 安裝 MDX 支援
npm install @next/mdx @mdx-js/loader @mdx-js/react @types/mdx remark-gfm
```

### 3.2 next.config.ts 設定

```typescript
import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
};

const withMDX = createMDX({
  extension: /\.(md|mdx)$/,
  options: {
    remarkPlugins: [["remark-gfm", {}]],
  },
});

export default withMDX(nextConfig);
```

### 3.3 目錄結構

```
src/
├── app/                    # 路由頁面
│   ├── layout.tsx          # 根 Layout（字體、GA、AdSense）
│   ├── page.tsx            # 首頁
│   ├── globals.css         # Tailwind 主題
│   ├── sitemap.ts          # 動態 sitemap
│   ├── robots.ts           # robots.txt
│   ├── manifest.ts         # PWA manifest
│   ├── icon.tsx            # 動態 favicon
│   ├── not-found.tsx       # 404 頁面
│   ├── tools/              # 工具頁面
│   ├── articles/           # 文章頁面
│   │   └── [slug]/
│   │       ├── page.tsx    # 文章單頁
│   │       └── opengraph-image.tsx  # 動態 OG 圖
│   ├── breeds/             # 品種百科
│   ├── faq/                # FAQ
│   ├── about/              # 關於
│   ├── privacy/            # 隱私權
│   └── terms/              # 服務條款
│
├── components/
│   ├── layout/             # Header, Footer, BottomNav, Breadcrumb
│   ├── ui/                 # Button, Card, Input, Select, Tag, etc.
│   ├── tools/              # 各工具的互動元件
│   ├── articles/           # RelatedArticles, ShareButtons, TOC, ReadingProgress
│   ├── search/             # SearchDialog
│   ├── seo/                # JsonLd
│   ├── ads/                # AdBanner, SidebarAd
│   └── newsletter/         # SubscribeForm
│
├── content/
│   └── articles/           # MDX 文章檔案
│
├── data/                   # 靜態資料（疫苗、症狀、品種、毒物、名字）
├── lib/                    # 計算邏輯、SEO 工具、文章管理、搜尋索引
├── types/                  # TypeScript 型別
└── mdx-components.tsx      # MDX 全域樣式
```

---

## 4. Phase 1：核心工具開發

### 4.1 開發順序（重要！）

1. **主題設定**（globals.css + 字體 + 色彩）
2. **根 Layout**（Header + Footer + BottomNav + metadata）
3. **共用 UI 元件**（Button, Card, Input, Select, Tag）
4. **資料層**（TypeScript 型別 + 計算邏輯 + 靜態資料）
5. **首頁**
6. **工具頁面**（每個工具 = Server Page + Client Component）
7. **SEO 元件**（JsonLd, Breadcrumb）

### 4.2 工具頁面架構

每個工具頁面由兩部分組成：

**Server Page（SEO + metadata）**
```typescript
// src/app/tools/pet-age/page.tsx
export const metadata: Metadata = buildPageMetadata({
  title: "寵物年齡換算",
  description: "...",
  keywords: ["狗年齡換算", "貓年齡計算"],
  path: "/tools/pet-age",
});

export default function PetAgePage() {
  return (
    <>
      <JsonLd data={webApplicationSchema({...})} />
      <Card><AgeCalculator /></Card>   {/* Client Component */}
      <article>SEO 長文 500-800 字</article>
    </>
  );
}
```

**Client Component（互動邏輯）**
```typescript
// src/components/tools/AgeCalculator.tsx
"use client";
export function AgeCalculator() {
  const [petType, setPetType] = useState<PetType>("dog");
  // ... 互動邏輯
}
```

### 4.3 本專案的 14 個工具

| 工具 | SEO 價值 | 複雜度 |
|------|---------|-------|
| 年齡換算 | 高 | 低 |
| 疫苗時程表 | 高 | 低 |
| 症狀檢查器（含追問） | 極高 | 高 |
| 餵食計算機 | 高 | 中 |
| 體重追蹤（localStorage） | 中 | 中 |
| 花費計算 | 高 | 中 |
| 品種配對測驗 | 高 | 中 |
| 寵物取名器 | 中 | 低 |
| 疫苗提醒 | 中 | 低 |
| 品種比較 | 高 | 中 |
| 毒物查詢 | 極高 | 中 |
| 急救指南 | 高 | 低 |
| 飼料比較 | 高 | 中 |
| 就醫準備清單 | 中 | 低 |

---

## 5. Phase 2：內容系統

### 5.1 MDX 文章系統

**文章管理**：用集中式 metadata + MDX 檔案

```typescript
// src/lib/articles.ts
export const ARTICLES: ArticleMeta[] = [
  {
    slug: "puppy-first-year",
    title: "幼犬第一年完全照護指南",
    description: "...",
    category: "beginner",
    keywords: ["幼犬照顧", "新手養狗"],
    publishedAt: "2026-04-06",
    readingMinutes: 8,
  },
  // ... 更多文章
];
```

**動態路由**：
```typescript
// src/app/articles/[slug]/page.tsx
export function generateStaticParams() {
  return getAllArticles().map((a) => ({ slug: a.slug }));
}
export const dynamicParams = false;

export default async function ArticlePage({ params }) {
  const { slug } = await params; // Next.js 16: params 是 Promise
  const { default: Content } = await import(`@/content/articles/${slug}.mdx`);
  return <Content />;
}
```

### 5.2 MDX 全域樣式

```typescript
// src/mdx-components.tsx
export function useMDXComponents(): MDXComponents {
  return {
    h2: ({ children }) => <h2 className="text-2xl font-bold mt-10 mb-4">{children}</h2>,
    p: ({ children }) => <p className="text-lg leading-relaxed my-4">{children}</p>,
    table: ({ children }) => <table className="w-full border-collapse">{children}</table>,
    blockquote: ({ children }) => <blockquote className="border-l-4 border-brand-400 bg-brand-50 pl-5 py-3 my-6 rounded-r-[12px]">{children}</blockquote>,
    // ... 更多元素
  };
}
```

### 5.3 文章內容策略

| 分類 | 數量 | 關鍵字方向 |
|------|------|----------|
| 健康 | 10+ | 嘔吐、腎病、過胖、中暑 |
| 飲食 | 8+ | 水果、飼料、鮮食、飲水量 |
| 行為 | 10+ | 吠叫、咬人、亂尿、分離焦慮 |
| 美容 | 6+ | 剪指甲、洗澡、貓砂、牙齒 |
| 新手 | 6+ | 幼犬第一年、新手養貓、領養 |

### 5.4 品種百科

每個品種一個獨立頁面，資料結構：

```typescript
interface BreedProfile {
  slug: string;
  petType: "dog" | "cat";
  name: string;
  nameEn: string;
  coverUrl?: string;        // Unsplash 真實照片
  size: "xs" | "s" | "m" | "l" | "xl";
  weightRange: string;
  lifeSpan: string;
  energyLevel: 1-5;
  friendliness: 1-5;
  trainability: 1-5;
  shedding: 1-5;
  personality: string[];
  commonDiseases: string[];
  careNotes: string[];
  suitableFor: string[];
}
```

---

## 6. Phase 3：SEO 優化

### 6.1 必做的 SEO 項目

| 項目 | 實作方式 |
|------|---------|
| **Sitemap** | `app/sitemap.ts` 動態產生（Next.js 內建） |
| **robots.txt** | `app/robots.ts` |
| **Metadata** | 每頁獨立 title / description / keywords / OG |
| **JSON-LD** | WebApplication（工具）、Article（文章）、FAQPage（FAQ）、BreadcrumbList |
| **Open Graph 圖片** | `opengraph-image.tsx` 動態產生 1200x630 PNG |
| **Canonical URL** | metadata.alternates.canonical |
| **麵包屑** | Breadcrumb 元件 + BreadcrumbList schema |
| **內部連結** | 相關文章推薦 + 文章內交叉連結 + 上下篇導航 |

### 6.2 metadata 共用函數

```typescript
// src/lib/seo.ts
export function buildPageMetadata({ title, description, keywords, path }): Metadata {
  return {
    title,
    description,
    keywords: keywords?.join(", "),
    alternates: { canonical: `${SITE_URL}${path}` },
    openGraph: { title, description, url: `${SITE_URL}${path}`, siteName: SITE_NAME, locale: "zh_TW" },
  };
}
```

### 6.3 UX 強化（提升停留時間 = 更多廣告收益）

- **文章 TOC**：桌機右側 sticky 目錄（自動從 h2/h3 產生）
- **閱讀進度條**：頂部 1px 橘色條
- **相關文章**：底部 3 篇同分類推薦
- **上下篇導航**：上一篇 / 下一篇
- **分享按鈕**：LINE、Facebook、Twitter、複製連結
- **站內搜尋**：⌘K 快捷鍵，跨工具/文章/品種

---

## 7. Phase 4：變現準備

### 7.1 廣告位佈局

審核中採「少量、可預期、遠離互動結果」原則。現階段不要在工具輸入區、工具結果區、CTA 附近、搜尋結果附近放廣告，避免被判定為誤導式版位或誘導點擊。

```
文章頁：
┌─────────────────────────────────────┐
│ 文章內容                    │ TOC   │
│                             │       │
│ ┌─────────────────────┐    │       │
│ │ [Ad: article-mid]   │    │       │
│ └─────────────────────┘    │ [Ad]  │
│                             │       │
│ 文章內容繼續                │       │
│                             │       │
│ ┌─────────────────────┐    │       │
│ │ [Ad: article-bottom]│    │       │
│ └─────────────────────┘    │       │
│ 分享按鈕                    │       │
│ 上下篇導航                  │       │
│ 相關文章 x3                 │       │
└─────────────────────────────────────┘

工具頁：
┌───────────────────┐
│ 工具互動區         │
│ 結果與建議         │
│ 補充說明與文章連結  │
└───────────────────┘

品種頁：審核中不放廣告，優先強化照片、照護資料、相關文章與工具入口。
```

目前允許的 AdSense slot 僅限：

| Slot | 使用位置 | 審核策略 |
|------|----------|----------|
| `article-mid` | 文章正文中段 | 內容已建立上下文後才出現 |
| `article-bottom` | 文章結尾前後 | 遠離分享與導航操作 |
| `sidebar` | 桌機文章側欄 | 不干擾閱讀主線 |

### 7.2 AdBanner 元件設計

```typescript
// 審核中預設 NEXT_PUBLIC_ADS_ENABLED=false
// 正式啟用需同時符合：ADS_ENABLED、ADSENSE_ID、slot 在 allowlist
export function AdBanner({ slot, format, className }) {
  if (!shouldRenderAds(slot)) {
    if (process.env.NODE_ENV === "development") {
      return <div>[Ad Placeholder · {format}]</div>;
    }
    return null;
  }
  return <ins className="adsbygoogle" data-ad-client={ADSENSE_ID} data-ad-slot={slot} />;
}
```

### 7.3 AdSense 申請前必備

- [x] 隱私權政策頁面 `/privacy`
- [x] 服務條款頁面 `/terms`
- [x] 至少 20+ 頁原創內容，且每篇有來源、審稿、作者可信度訊號
- [x] 網站已上線且可訪問
- [x] 自訂網域（非 `.vercel.app`）
- [x] `ads.txt` 由 `/ads.txt` route 輸出授權 publisher ID
- [x] `robots.txt` 不阻擋主要內容與 sitemap
- [x] `sitemap.xml` 收錄首頁、工具、文章、品種、FAQ、政策頁
- [x] `review:check` 可在部署網址上檢查 sitemap、robots、ads.txt、核心頁面狀態
- [x] 廣告預設關閉，通過審核前不展示真實廣告

### 7.4 GA4 + AdSense Script 整合

```typescript
// src/app/layout.tsx
{GA_ID && (
  <>
    <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
    <Script id="ga4" strategy="afterInteractive">
      {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)};gtag('js',new Date());gtag('config','${GA_ID}');`}
    </Script>
  </>
)}
{shouldRenderAds() && (
  <Script async src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_ID}`} crossOrigin="anonymous" strategy="afterInteractive" />
)}
```

---

## 8. Phase 5：部署上線

### 8.1 部署流程（5 分鐘）

```bash
# 1. Git 初始化 + GitHub
git init && git add -A && git commit -m "initial commit"
gh repo create my-project --public --source=. --remote=origin --push

# 2. Vercel 部署
# 到 vercel.com/new → Import repo → Deploy

# 3. 環境變數設定
vercel env add NEXT_PUBLIC_SITE_URL production   # https://你的網域.com
vercel env add NEXT_PUBLIC_GA_ID production       # G-XXXXXXXXXX
vercel env add NEXT_PUBLIC_ADS_ENABLED production # false（審核期預設）
vercel env add NEXT_PUBLIC_ADSENSE_ID production  # ca-pub-XXXXXXX
# repo 內保留 .env.local.example；真實 .env / .env.* 由 .vercelignore 排除部署

# 4. 自訂網域
vercel domains add 你的網域.com my-project
# 到 DNS 設定：A Record @ → 76.76.21.21
#              CNAME www → cname.vercel-dns.com
```

### 8.2 Google Search Console 設定

1. 到 search.google.com/search-console
2. 新增資源 → 網址前置字元 → 輸入你的網域
3. 驗證方式：HTML meta tag（layout.tsx 加 `metadata.verification.google`）
4. 驗證成功後提交 sitemap：`sitemap.xml`

### 8.3 每次更新的部署流程

```bash
git add -A && git commit -m "描述改了什麼" && git push
# Vercel 自動部署，約 1-2 分鐘
```

---

## 9. Phase 6：持續擴充

### 9.1 定時任務

設定每週自動撰寫 2 篇新文章（Claude Code scheduled task）：

```
排程：每週一 09:00
任務：
1. 選題（當季/搜尋熱門/新聞/高CPC/實用指南）
2. 檢查不重複
3. 撰寫 2 篇 MDX 文章
4. 註冊到 articles.ts
5. npm test && npm run build
6. git push（Vercel 自動部署）
```

### 9.2 內容擴充路線圖

| 時間 | 目標 |
|------|------|
| 第 1 個月 | 40 篇文章 + 10 個工具 + 30 品種 |
| 第 3 個月 | 70 篇文章 + 50 品種 |
| 第 6 個月 | 100 篇文章 + 15 個工具 |
| 第 12 個月 | 200 篇文章 + 20 個工具 |

### 9.3 收益優化

- **審核前不追求廣告密度**：先保留文章中段、文章底部、桌機側欄三類保守版位
- **工具頁先不放廣告**：工具結果區、搜尋結果、CTA 附近都不放，避免誤導點擊疑慮
- **寫高 CPC 文章**：保險、用品評測、獸醫選擇
- **提升自然點擊率**：改善 title、description、topic cluster 內部連結與首屏可讀性
- **提升停留時間**：TOC、相關文章、上下篇導航、工具導流與清楚的下一步建議

---

## 10. Phase 7：審核後監控與品質 Gate

這一階段的目標不是「讓更多人誤點廣告」，而是讓搜尋使用者願意停留、閱讀、使用工具，讓合規廣告自然獲得可持續曝光。任何文案或版位都不得暗示、鼓勵、要求使用者點擊廣告。

### 10.1 每次部署前必跑

```bash
npm test
npm run design:audit
npm run build
SITE_URL=https://maohai.org npm run review:check
```

`npm test` 目前包含以下本地 gate：

| Script | 檢查目的 |
|--------|----------|
| `content:audit` | 文章深度、來源、審稿、作者可信度、內部連結 |
| `snippet:audit` | Title / description 長度、重複度、搜尋摘要可讀性 |
| `schema:audit` | 結構化資料只出現在合適頁面，避免濫用 FAQ/HowTo |
| `observability:audit` | GA4、GSC 驗證、AdSense 保守配置、審核腳本完整性 |

### 10.2 GA4 事件追蹤

| Event | 用途 |
|-------|------|
| `article_view` | 判斷哪些文章能帶來長尾流量與閱讀需求 |
| `tool_view` | 判斷工具入口是否被搜尋使用者看見 |
| `tool_start` | 判斷工具是否真的被操作，而不是只有曝光 |
| `tool_result_view` | 判斷工具是否成功提供結果 |
| `search` | 找出站內搜尋需求，補文章與工具缺口 |
| `select_content` | 追蹤文章、工具、品種卡片點擊 |
| `topic_cluster_click` | 追蹤主題群內部連結是否有效 |
| `click` | 追蹤 outbound click，分辨推薦連結與外部資源需求 |

上線後第一週每天確認 GA4 即時報表：首頁、文章頁、工具頁至少都要能看到 view event；操作工具時要能看到 `tool_start` 與 `tool_result_view`。

### 10.3 Google Search Console 監控

- Sitemap：確認 `https://maohai.org/sitemap.xml` 已提交且可讀。
- 索引：優先看首頁、核心工具、topic cluster hub、已擴寫文章是否被編入索引。
- 查詢：挑出「有曝光但 CTR 低」的頁面，優先調整 title / description。
- 頁面體驗：若有行動版可用性或 Core Web Vitals 問題，先修 UI 與效能，再擴廣告。
- 結構化資料：只保留真實符合頁面意圖的 schema；FAQPage 僅用在 FAQ 頁。

### 10.4 AdSense 審核守則

- `NEXT_PUBLIC_ADS_ENABLED=false` 是審核期預設值。
- 真實 `.env` 檔不得隨 CLI 部署上傳；以 Vercel Production env 為準。
- 通過審核前不要新增廣告版位，不要把廣告放進工具結果、搜尋結果、導覽按鈕、下載/分享區附近。
- 通過審核後也只先啟用 `article-mid`、`article-bottom`、`sidebar`，觀察 7 天再決定是否調整。
- 若收到「缺乏價值的內容」，不要先加廣告；先補內容深度、來源、作者/審稿訊號、內部連結，再重新送審。
- 若 ads.txt 顯示「找不到」，先確認部署網域 `/ads.txt` 回傳 200 且內容為授權 publisher ID，再回 AdSense 重新檢查。

### 10.5 審核後營運節奏

| 頻率 | 動作 |
|------|------|
| 每日（前 7 天） | 看 AdSense 狀態、ads.txt、GSC sitemap、GA4 即時事件 |
| 每週 | 跑完整 gate、整理 GSC 低 CTR 頁面、補 1-2 篇 cluster 內容 |
| 每月 | 檢查最高曝光 query、最高工具完成率、最低 engagement 頁面 |
| 每次改版 | 先跑 `npm test`、`design:audit`、`build`、`review:check` |

---

## 11. 關鍵數字與成果

### 本專案最終規模

| 項目 | 數量 |
|------|------|
| 靜態/SSG 路由 | 297 |
| 互動工具 | 14 |
| MDX 文章 | 50 |
| 品種百科（含真實照片） | 70 |
| 審核期廣告 slot | 3 |
| FAQ 問題 | 20 |
| 搜尋索引項目 | 130+ |

### 技術成就

- Build 零錯誤、Lint 零警告
- 所有頁面靜態預渲染（Lighthouse Performance 目標 > 90）
- 動態 OG 圖片（每篇文章自動產生）
- PWA manifest + 動態 icon
- 站內搜尋（⌘K）
- 文章 TOC + 閱讀進度條 + 分享按鈕

### 開發時間

整個專案在一次 Claude Code 對話中完成，約 8-10 小時。

---

## 12. 踩過的坑

### Next.js 16 的變化

- `params` 和 `searchParams` 是 **Promise**，需要 `await`
- `PageProps<'/route'>` 全域型別（不需要 import）
- Tailwind v4 用 CSS `@theme`，不用 config 檔

### React 19 的 lint 規則

- `react-hooks/set-state-in-effect`：不能在 useEffect 直接 setState
- 解法：用 `useSyncExternalStore` 或 event handler
- localStorage 讀取用 `useSyncExternalStore` + cache snapshot

### MDX 設定

- `mdx-components.tsx` 放在 `src/` 目錄下（src-dir 模式）
- GFM 表格需要 `remark-gfm` 插件
- Turbopack 下 plugin 需用 string 名稱：`["remark-gfm", {}]`

### Unsplash 圖片

- `next/image` 遠端圖片需要 config `remotePatterns`
- withMDX wrapper 可能干擾 config 傳遞
- 簡單解法：用原生 `<img>` + `loading="lazy"`（Unsplash 已最佳化）
- 照片 ID 要實際驗證，很多從訓練資料猜的 ID 是錯的

### Vercel 部署

- `withMDX(nextConfig)` 會 wrap 整個 config
- 環境變數改完要 Redeploy 才生效
- 自訂網域的 DNS 傳播需要時間（通常 5-30 分鐘）

---

## 13. 複製到新專案的 Checklist

### 換主題時需要改的東西

- [ ] `globals.css`：主題色、字體
- [ ] `layout.tsx`：網站名稱、描述、關鍵字
- [ ] `src/lib/seo.ts`：SITE_NAME、SITE_URL
- [ ] `src/data/`：換成新主題的資料
- [ ] `src/content/articles/`：換成新主題的文章
- [ ] `src/components/layout/`：Header、Footer 連結
- [ ] `public/`：favicon、OG 圖片
- [ ] `.env.local`：環境變數

### 可直接複用的元件

- [ ] UI 元件（Button, Card, Input, Select, Tag, RatingBar）
- [ ] Layout 元件（Header, Footer, BottomNav, Breadcrumb）
- [ ] SEO 元件（JsonLd, 動態 OG 圖片）
- [ ] 功能元件（SearchDialog, ShareButtons, ReadingProgress, TOC）
- [ ] 廣告元件（AdBanner）
- [ ] 訂閱元件（SubscribeForm）
- [ ] MDX 全域樣式（mdx-components.tsx）

### 上線前 Checklist

- [ ] `npm run build` 零錯誤
- [ ] `npm test` 全部通過（lint、typecheck、content、snippet、schema、observability）
- [ ] `npm run design:audit` 通過
- [ ] `SITE_URL=https://你的網域.com npm run review:check` 通過
- [ ] 每個頁面都有獨立 title + description
- [ ] sitemap.ts 包含所有頁面
- [ ] robots.ts 設定正確
- [ ] 隱私權政策 + 服務條款頁面存在
- [ ] Google Search Console 驗證碼已加入
- [ ] GA4 Measurement ID 已設定
- [ ] AdSense publisher ID 已設定
- [ ] 自訂網域已綁定 + DNS 已設定
- [ ] HTTPS 正常（Vercel 自動）
- [ ] 手機版響應式正常
- [ ] 404 頁面正常

---

## 附錄：環境變數列表

| 變數 | 用途 | 範例 |
|------|------|------|
| `NEXT_PUBLIC_SITE_URL` | 網站 URL（sitemap、OG、canonical） | `https://maohai.org` |
| `NEXT_PUBLIC_GA_ID` | Google Analytics 4 | `G-CDLKGECF9Y` |
| `NEXT_PUBLIC_ANALYTICS_DEBUG` | 本機/測試環境輸出 GA4 event log | `false` |
| `NEXT_PUBLIC_ADS_ENABLED` | 是否載入 AdSense script 與顯示允許版位 | `false` |
| `NEXT_PUBLIC_ADSENSE_ID` | Google AdSense | `ca-pub-2306490072598524` |

---

*本文件由毛孩照護站開發過程自動產生，最後更新：2026-05-09*
