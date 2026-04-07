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
10. [關鍵數字與成果](#10-關鍵數字與成果)
11. [踩過的坑](#11-踩過的坑)
12. [複製到新專案的 Checklist](#12-複製到新專案的-checklist)

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
      <AdBanner slot="tool-result" />
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
│ ┌───────────────┐ │
│ │ [Ad: result]  │ │
│ └───────────────┘ │
│ SEO 長文           │
└───────────────────┘

品種頁：底部 1 個廣告
```

### 7.2 AdBanner 元件設計

```typescript
// Phase 1: 顯示佔位框（dev 環境）
// Phase 3: NEXT_PUBLIC_ADSENSE_ID 環境變數啟用後顯示真實廣告
export function AdBanner({ slot, format, className }) {
  if (!ADSENSE_ID || !slot) {
    if (process.env.NODE_ENV === "development") {
      return <div>[Ad Placeholder · {format}]</div>;
    }
    return null;
  }
  return <ins className="adsbygoogle" data-ad-client={ADSENSE_ID} data-ad-slot={slot} />;
}
```

### 7.3 AdSense 申請前必備

- [ ] 隱私權政策頁面 `/privacy`
- [ ] 服務條款頁面 `/terms`
- [ ] 至少 20+ 頁原創內容
- [ ] 網站已上線且可訪問
- [ ] 自訂網域（非 .vercel.app）

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
{ADSENSE_ID && (
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
vercel env add NEXT_PUBLIC_ADSENSE_ID production  # ca-pub-XXXXXXX

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
5. npm run build && npm run lint
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

- **增加廣告位**：文章中間、側邊欄、工具結果下方
- **寫高 CPC 文章**：保險、用品評測、獸醫選擇
- **買自訂網域**：`.vercel.app` → 自有網域（SEO +30-50%）
- **提升停留時間**：TOC、相關文章、上下篇導航

---

## 10. 關鍵數字與成果

### 本專案最終規模

| 項目 | 數量 |
|------|------|
| 靜態頁面 | 152 |
| 互動工具 | 14 |
| MDX 文章 | 44 |
| 品種百科（含真實照片） | 30 |
| 廣告位 | 120+ |
| FAQ 問題 | 20 |
| 搜尋索引項目 | 90+ |

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

## 11. 踩過的坑

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

## 12. 複製到新專案的 Checklist

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
- [ ] `npm run lint` 零錯誤
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
| `NEXT_PUBLIC_ADSENSE_ID` | Google AdSense | `ca-pub-2306490072598524` |

---

*本文件由毛孩照護站開發過程自動產生，最後更新：2026-04-07*
