---
name: "毛孩照護站"
description: "台灣狗貓飼主的可信照護內容與免費工具平台"
colors:
  brand-50: "#FFF1EA"
  brand-100: "#FFE0D0"
  brand-300: "#FFA272"
  brand-500: "#FF6B35"
  brand-600: "#E6511D"
  brand-700: "#C03F11"
  accent-50: "#E6F8F6"
  accent-100: "#C6F0EB"
  accent-500: "#2EC4B6"
  accent-700: "#1B756D"
  cream-50: "#FFFDFA"
  cream-100: "#FFF8F0"
  cream-200: "#FFF2E1"
  cream-300: "#FFE8CC"
  ink-900: "#2A1F1A"
  ink-700: "#5A4A3F"
  ink-500: "#8A7A6F"
  ink-300: "#BAAA9F"
typography:
  display:
    fontFamily: "Nunito, Noto Sans TC, system-ui, sans-serif"
    fontSize: "2.25rem"
    fontWeight: 800
    lineHeight: 1.15
    letterSpacing: "0"
  headline:
    fontFamily: "Nunito, Noto Sans TC, system-ui, sans-serif"
    fontSize: "1.875rem"
    fontWeight: 800
    lineHeight: 1.2
    letterSpacing: "0"
  title:
    fontFamily: "Nunito, Noto Sans TC, system-ui, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 700
    lineHeight: 1.3
    letterSpacing: "0"
  body:
    fontFamily: "Noto Sans TC, Nunito, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.75
    letterSpacing: "0"
  label:
    fontFamily: "Noto Sans TC, Nunito, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 700
    lineHeight: 1.35
    letterSpacing: "0"
rounded:
  input: "12px"
  button: "14px"
  card: "20px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
components:
  button-primary:
    backgroundColor: "{colors.brand-500}"
    textColor: "{colors.cream-50}"
    rounded: "{rounded.button}"
    padding: "14px 28px"
    typography: "{typography.label}"
  button-ghost:
    backgroundColor: "{colors.cream-50}"
    textColor: "{colors.brand-600}"
    rounded: "{rounded.button}"
    padding: "14px 28px"
    typography: "{typography.label}"
  card-default:
    backgroundColor: "{colors.cream-50}"
    textColor: "{colors.ink-900}"
    rounded: "{rounded.card}"
    padding: "24px"
  input-default:
    backgroundColor: "{colors.cream-50}"
    textColor: "{colors.ink-900}"
    rounded: "{rounded.input}"
    padding: "10px 16px"
---

# Design System: 毛孩照護站

## Overview

**Creative North Star: "獸醫診間外的暖光筆記"**

毛孩照護站的介面應該像一本被反覆翻閱的照護筆記：溫暖、清楚、有標記，讀者一進來就能知道下一步該看什麼。這是 brand surface 為主的內容站，品牌信任本身就是產品；工具頁則維持 product discipline，表單、結果與警示都要穩定、可掃讀、手機友善。

視覺系統採用暖米色紙面、橘色主行動、青綠色輔助狀態，避免醫療冷白，也避免寵物網站常見的過度可愛。介面可以親切，但不能幼稚；可以柔和，但不能模糊。

**Key Characteristics:**
- 溫暖紙面：背景永遠有一點奶油色，不使用純白大面積鋪底。
- 清楚照護路徑：文章、工具、品種與主題中心互相導流，但不打斷閱讀。
- 合規變現：廣告版位必須可辨識、保留距離、不得偽裝成內容或誘導點擊。
- 工具安靜可靠：輸入、結果、警示採同一組形狀與狀態語彙。

## Colors

色彩策略是 restrained with warmth：奶油中性色承載閱讀，品牌橘只用在主要行動、當前狀態與必要強調，青綠只用於輔助成功、貓咪與健康工具脈絡。

### Primary
- **照護橘** (`brand-500`): 主要 CTA、重點連結、選取狀態。它不應成為背景裝飾，稀少才可信。
- **深照護橘** (`brand-700`): active 狀態、小面積高對比標籤與深色文字旁的強調。

### Secondary
- **安定青綠** (`accent-500`): 輔助 CTA、成功狀態、貓咪或平衡型工具。不要與主 CTA 在同一視覺層級競爭。

### Neutral
- **紙面奶油** (`cream-100`): 全站主背景。
- **清單紙白** (`cream-50`): 卡片、表單、導覽底色。這是替代純白的唯一預設表面。
- **溫墨色** (`ink-900`): 標題與主要文字。
- **軟棕灰** (`ink-500`): 次要描述、日期、輔助說明。

### Named Rules

**The Warm Paper Rule.** 大面積表面使用 `cream-100` 或 `cream-50`，禁止用純白把頁面切成冷硬區塊。

**The One Action Rule.** 每個區塊只允許一個品牌橘主行動；次要行動用紙白、邊框與文字重量處理。

## Typography

**Display Font:** Nunito, with Noto Sans TC fallback  
**Body Font:** Noto Sans TC, with Nunito and system fallback  
**Label Font:** Noto Sans TC, with Nunito and system fallback

**Character:** 字體要像照護筆記上的清楚標題與手機表單，不追求雜誌感，也不使用醫療報表式冷硬字距。中文閱讀優先，英文只作為輔助資料。

### Hierarchy
- **Display** (800, 2.25rem to 3.75rem, 1.15): 首頁與索引頁主標，最多一屏一個。
- **Headline** (800, 1.875rem, 1.2): 區塊標題、工具頁標題。
- **Title** (700, 1.25rem, 1.3): 卡片標題、文章列表標題、結果區標題。
- **Body** (400, 1rem, 1.75): 文章與說明文字，長文寬度維持 65 to 75ch。
- **Label** (700, 0.875rem, 1.35): 按鈕、分類、表單標籤、狀態標籤。

### Named Rules

**The No Magazine Costume Rule.** 不使用裝飾性 serif、斜體大標或小 mono 標籤來製造假編輯感。本站的可信度來自清楚與來源，不來自雜誌扮演。

## Elevation

系統採低陰影與邊框混合。卡片在靜止狀態只給微弱環境陰影或細邊框，hover 才增加一級。工具結果可使用 2px 邊框建立安全感，不用厚重投影。

### Shadow Vocabulary
- **card-rest** (`0 2px 12px rgba(42, 31, 26, 0.06)`): 預設卡片與浮層。
- **card-hover** (`0 8px 24px rgba(42, 31, 26, 0.12)`): 可點擊卡片 hover。
- **bottom-nav** (`0 -2px 12px rgba(42, 31, 26, 0.06)`): 手機底部導覽。

### Named Rules

**The Quiet Lift Rule.** 陰影只表示層級或互動，不作為裝飾。看起來像漂浮卡片牆時，陰影太多。

## Components

### Buttons
- **Shape:** 柔和但不玩具化的圓角 (`14px`)。
- **Primary:** `brand-500` 背景、`cream-50` 文字、水平 padding 約 `28px`。用於開始工具、提交表單、主要導覽。
- **Hover / Focus:** hover 加深到 `brand-600`，focus 使用 `brand-200` ring。禁止靠位移或彈跳表達重要性。
- **Secondary / Ghost:** 紙白底、品牌色文字、奶油邊框。它是安靜選項，不應看起來像第二個主 CTA。

### Chips
- **Style:** 圓形膠囊、`cream-50` 背景、`cream-300` 邊框、`ink-700` 文字。
- **Selected:** `brand-500` 背景、`cream-50` 文字。狀態還要靠字重與邊界，不只靠色相。

### Cards / Containers
- **Corner Style:** 內容卡片使用 `20px`，表單與小選項使用 `12px` to `14px`。
- **Background:** 預設 `cream-50`，文章段落或頁面 band 可用 `cream-100`。
- **Shadow Strategy:** 靜止狀態低陰影，hover 只增加一級。
- **Border:** 資料來源、警示、工具建議使用完整邊框或淡色背景，禁止側邊粗線條。
- **Internal Padding:** 小卡 `16px`，標準卡 `24px`，工具容器 `32px`。

### Inputs / Fields
- **Style:** `cream-50` 表面、`cream-300` 邊框、`12px` 圓角。
- **Focus:** 背景升到 `cream-50` 或接近紙白，邊框變 `brand-500`，加 `brand-200` focus ring。
- **Error / Disabled:** 錯誤用紅色文字與完整淡紅背景，disabled 降低 opacity 並保持可讀。

### Navigation
- **Desktop:** sticky header 使用實底或高透明暖紙面，避免玻璃擬態模糊。
- **Mobile:** bottom nav 保持 44px 以上觸控目標，圖示與文字一起出現。
- **Search:** 搜尋浮層要像工作面板，使用實底遮罩，不用裝飾性 backdrop blur。

## Do's and Don'ts

### Do:
- **Do** 用 `cream-100` 和 `cream-50` 建立溫暖紙面，讓長文閱讀保持柔和。
- **Do** 將廣告清楚標示為廣告，並與工具按鈕、搜尋結果、文章卡片保留明確距離。
- **Do** 在工具結果後提供下一步照護建議，並保留「不能取代獸醫診斷」提示。
- **Do** 用 topic cluster 的方式呈現文章、工具、品種與 FAQ 關係。
- **Do** 保持手機操作優先，按鈕、chip、搜尋列與底部導覽都要有足夠觸控面積。

### Don't:
- **Don't** 做成泛用 AI SEO 站：大量相同卡片、表面化文案、沒有來源、沒有編輯責任。
- **Don't** 使用深色紫藍漸層、玻璃擬態、浮動發光物件或炫技動畫包裝寵物健康內容。
- **Don't** 使用 `border-left` 或 `border-right` 大於 `1px` 的彩色側邊條當 callout 裝飾。
- **Don't** 使用誘導點擊、貼近操作區的廣告、偽裝成內容的廣告，或任何會傷害 AdSense 合規的版位。
- **Don't** 讓工具頁變成厚重儀表板；工具要像手機上的可靠表單，快、安靜、可預期。
