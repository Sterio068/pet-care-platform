import type { ArticleCategory } from "@/types";

export interface ToolSuggestion {
  href: string;
  icon: string;
  title: string;
  desc: string;
}

// Curated tool suggestions per article category
const CATEGORY_TOOLS: Record<ArticleCategory, ToolSuggestion[]> = {
  health: [
    { href: "/tools/symptom-checker", icon: "🩺", title: "症狀檢查器", desc: "快速評估毛孩身體狀況" },
    { href: "/tools/vet-prep", icon: "🏥", title: "就醫準備清單", desc: "看診前的完整準備清單" },
    { href: "/tools/weight-tracker", icon: "📊", title: "體重追蹤", desc: "記錄體重變化趨勢" },
  ],
  food: [
    { href: "/tools/food-calculator", icon: "🥣", title: "餵食計算機", desc: "科學計算每日飲食份量" },
    { href: "/tools/food-compare", icon: "📦", title: "飼料比較", desc: "比較不同飼料成分與價格" },
    { href: "/tools/toxic-checker", icon: "🔍", title: "毒物查詢", desc: "查詢食物是否對毛孩有毒" },
  ],
  behavior: [
    { href: "/tools/breed-match", icon: "🎯", title: "品種配對", desc: "找到最適合你的品種" },
    { href: "/tools/symptom-checker", icon: "🩺", title: "症狀檢查器", desc: "行為異常也可能是身體問題" },
    { href: "/tools/pet-age", icon: "🎂", title: "年齡換算", desc: "了解毛孩的生命階段" },
  ],
  grooming: [
    { href: "/tools/food-calculator", icon: "🥣", title: "餵食計算機", desc: "均衡飲食從份量開始" },
    { href: "/tools/weight-tracker", icon: "📊", title: "體重追蹤", desc: "監控健康體重範圍" },
    { href: "/tools/pet-age", icon: "🎂", title: "年齡換算", desc: "不同年齡的美容需求不同" },
  ],
  beginner: [
    { href: "/tools/pet-age", icon: "🎂", title: "年齡換算", desc: "看看毛孩相當於人類幾歲" },
    { href: "/tools/vaccine-schedule", icon: "💉", title: "疫苗時程表", desc: "完整幼犬幼貓預防針時間表" },
    { href: "/tools/cost-calculator", icon: "💰", title: "養寵花費試算", desc: "評估每月養寵費用" },
  ],
};

export function getToolSuggestionsForCategory(
  category: ArticleCategory,
): ToolSuggestion[] {
  return CATEGORY_TOOLS[category] ?? [];
}
