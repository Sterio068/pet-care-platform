import { getAllArticles, CATEGORY_LABELS } from "@/lib/articles";
import { getAllBreeds } from "@/data/breeds";

export interface SearchItem {
  type: "article" | "breed" | "tool" | "page";
  typeLabel: string;
  title: string;
  description: string;
  href: string;
  keywords: string[];
}

const TOOLS: SearchItem[] = [
  {
    type: "tool",
    typeLabel: "工具",
    title: "寵物年齡換算",
    description: "狗貓年齡對照人類年齡",
    href: "/tools/pet-age",
    keywords: ["年齡", "換算", "狗年齡", "貓年齡", "age"],
  },
  {
    type: "tool",
    typeLabel: "工具",
    title: "疫苗時程表",
    description: "幼犬幼貓預防針完整時間",
    href: "/tools/vaccine-schedule",
    keywords: ["疫苗", "預防針", "vaccine", "狂犬病"],
  },
  {
    type: "tool",
    typeLabel: "工具",
    title: "症狀檢查器",
    description: "快速評估毛孩身體狀況",
    href: "/tools/symptom-checker",
    keywords: ["症狀", "生病", "檢查", "嘔吐", "拉肚子"],
  },
  {
    type: "tool",
    typeLabel: "工具",
    title: "餵食計算機",
    description: "每日熱量與飼料克數計算",
    href: "/tools/food-calculator",
    keywords: ["餵食", "熱量", "飼料", "卡路里", "food"],
  },
  {
    type: "tool",
    typeLabel: "工具",
    title: "體重追蹤器",
    description: "記錄毛孩體重變化",
    href: "/tools/weight-tracker",
    keywords: ["體重", "追蹤", "weight"],
  },
  {
    type: "tool",
    typeLabel: "工具",
    title: "花費計算",
    description: "養寵物月開銷與 10 年總花費",
    href: "/tools/cost-calculator",
    keywords: ["花費", "費用", "預算", "cost"],
  },
  {
    type: "tool",
    typeLabel: "工具",
    title: "品種配對測驗",
    description: "回答 5 題推薦最適合你的品種",
    href: "/tools/breed-match",
    keywords: ["品種", "配對", "推薦", "適合", "養什麼"],
  },
  {
    type: "tool",
    typeLabel: "工具",
    title: "寵物取名器",
    description: "100+ 精選名字隨機產生",
    href: "/tools/name-generator",
    keywords: ["名字", "取名", "命名", "name"],
  },
];

const PAGES: SearchItem[] = [
  {
    type: "page",
    typeLabel: "頁面",
    title: "關於我們",
    description: "毛孩照護站的使命",
    href: "/about",
    keywords: ["關於", "about"],
  },
];

export function getSearchIndex(): SearchItem[] {
  const articles: SearchItem[] = getAllArticles().map((a) => ({
    type: "article",
    typeLabel: CATEGORY_LABELS[a.category],
    title: a.title,
    description: a.description,
    href: `/articles/${a.slug}`,
    keywords: a.keywords,
  }));

  const breeds: SearchItem[] = getAllBreeds().map((b) => ({
    type: "breed",
    typeLabel: "品種",
    title: b.name,
    description: b.summary,
    href: `/breeds/${b.slug}`,
    keywords: [b.name, b.nameEn, ...b.personality],
  }));

  return [...TOOLS, ...articles, ...breeds, ...PAGES];
}

export function searchItems(query: string, items: SearchItem[]): SearchItem[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return items
    .map((item) => {
      let score = 0;
      const title = item.title.toLowerCase();
      const desc = item.description.toLowerCase();
      const keywords = item.keywords.join(" ").toLowerCase();

      if (title.includes(q)) score += 10;
      if (title.startsWith(q)) score += 5;
      if (desc.includes(q)) score += 3;
      if (keywords.includes(q)) score += 5;

      return { item, score };
    })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 10)
    .map((r) => r.item);
}
