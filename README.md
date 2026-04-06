# 毛孩照護站

以 SEO 驅動流量的寵物照護資訊與工具平台。提供實用的狗貓健康工具與飼養知識，協助台灣飼主科學養寵。

## 技術架構

- **Next.js 16.2** (App Router, Turbopack)
- **React 19.2**
- **TypeScript 5**
- **Tailwind CSS 4**
- **Node.js ≥ 20**

## 開發

```bash
npm install
npm run dev
```

開啟 [http://localhost:3000](http://localhost:3000)

## 建置與部署

```bash
npm run build   # 產生生產環境建置
npm run start   # 啟動生產環境伺服器
npm run lint    # ESLint 檢查
```

**推薦部署到 Vercel：** 將 repo 推送到 GitHub 後，在 [vercel.com/new](https://vercel.com/new) import repo，Vercel 會自動偵測 Next.js 並部署。

## 環境變數

複製 `.env.local.example` 為 `.env.local` 並填入實際值：

```
NEXT_PUBLIC_SITE_URL=https://你的網域.com
```

## 目錄結構

```
src/
├── app/              # Next.js App Router 路由
│   ├── tools/        # 工具頁面
│   ├── layout.tsx    # 根 Layout
│   ├── sitemap.ts    # SEO sitemap
│   └── robots.ts     # robots.txt
├── components/
│   ├── layout/       # Header / Footer / BottomNav
│   ├── ui/           # Button, Card, Input 等
│   ├── tools/        # 4 個工具的互動元件
│   └── seo/          # JsonLd 結構化資料
├── data/             # 靜態資料（疫苗、症狀等）
├── lib/              # 計算邏輯、SEO 工具
└── types/            # TypeScript 型別
```

## Phase 1 功能

- 寵物年齡換算（狗貓、支援不同體型）
- 疫苗時程表（狗三至五劑、貓三劑）
- 症狀檢查器（15+ 症狀、緊急程度評估）
- 餵食計算機（RER/MER 公式、依活動量與絕育狀態）

## 後續擴展（Phase 2+）

- MDX 文章系統
- 品種百科（50+ 常見犬貓）
- 體重追蹤、花費計算等工具
- Google AdSense 廣告變現
- 服務媒合平台功能
