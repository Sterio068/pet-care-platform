export type ToolGroupId = "triage" | "routine" | "planning" | "reference";

export interface ToolCatalogItem {
  href: string;
  icon: string;
  title: string;
  shortTitle: string;
  desc: string;
  group: ToolGroupId;
  tone: string;
  featured?: boolean;
  intent?: string;
}

export interface ToolGroup {
  id: ToolGroupId;
  title: string;
  desc: string;
}

export const TOOL_GROUPS: ToolGroup[] = [
  {
    id: "triage",
    title: "先判斷急不急",
    desc: "身體不舒服、疑似中毒、突發狀況時，先找出下一步。",
  },
  {
    id: "routine",
    title: "日常照護計算",
    desc: "餵食、體重、年齡、疫苗，讓照護變成可追蹤的習慣。",
  },
  {
    id: "planning",
    title: "長期決策與準備",
    desc: "預算、就醫、品種選擇，幫你在重要決定前想清楚。",
  },
  {
    id: "reference",
    title: "快速查詢",
    desc: "名字、飼料成本與品種比較，適合反覆查、慢慢挑。",
  },
];

export const TOOLS: ToolCatalogItem[] = [
  {
    href: "/tools/symptom-checker",
    icon: "🩺",
    title: "寵物症狀檢查器",
    shortTitle: "症狀檢查",
    desc: "勾選狗貓症狀，初步評估可能原因與緊急程度。",
    group: "triage",
    tone: "bg-yellow-50 border-yellow-200",
    featured: true,
    intent: "身體不舒服",
  },
  {
    href: "/tools/toxic-checker",
    icon: "🔍",
    title: "毒物查詢",
    shortTitle: "毒物查詢",
    desc: "查詢食物或植物對狗貓是否安全，快速判斷風險。",
    group: "triage",
    tone: "bg-brand-50 border-brand-200",
    intent: "吃到不確定的東西",
  },
  {
    href: "/tools/emergency-guide",
    icon: "🚨",
    title: "寵物急救指南",
    shortTitle: "急救指南",
    desc: "中毒、中暑、噎到、抽搐等緊急情況的步驟式處理。",
    group: "triage",
    tone: "bg-brand-50 border-brand-200",
    intent: "需要急救步驟",
  },
  {
    href: "/tools/food-calculator",
    icon: "🥣",
    title: "狗貓餵食計算機",
    shortTitle: "餵食計算",
    desc: "依體重、年齡、活動量計算每日熱量與飼料克數。",
    group: "routine",
    tone: "bg-accent-50 border-accent-200",
    featured: true,
    intent: "不知道一天吃多少",
  },
  {
    href: "/tools/pet-age",
    icon: "🎂",
    title: "寵物年齡換算",
    shortTitle: "年齡換算",
    desc: "輸入毛孩年齡，換算相當於人類幾歲與生命階段。",
    group: "routine",
    tone: "bg-brand-50 border-brand-200",
    featured: true,
    intent: "想知道生命階段",
  },
  {
    href: "/tools/vaccine-schedule",
    icon: "💉",
    title: "狗貓疫苗時程表",
    shortTitle: "疫苗時程",
    desc: "完整幼犬幼貓預防針時間表，包含核心疫苗提醒。",
    group: "routine",
    tone: "bg-accent-50 border-accent-200",
    featured: true,
    intent: "安排幼犬幼貓疫苗",
  },
  {
    href: "/tools/vaccine-reminder",
    icon: "🔔",
    title: "疫苗提醒",
    shortTitle: "疫苗提醒",
    desc: "輸入出生日期，自動算出每次疫苗施打時間。",
    group: "routine",
    tone: "bg-cream-50 border-cream-300",
  },
  {
    href: "/tools/weight-tracker",
    icon: "📊",
    title: "寵物體重追蹤器",
    shortTitle: "體重追蹤",
    desc: "記錄體重變化，自動生成趨勢圖，資料只存在本機。",
    group: "routine",
    tone: "bg-cream-50 border-cream-300",
  },
  {
    href: "/tools/cost-calculator",
    icon: "💰",
    title: "養寵花費計算",
    shortTitle: "花費計算",
    desc: "試算養狗養貓月開銷與 10 年總花費。",
    group: "planning",
    tone: "bg-cream-50 border-cream-300",
    intent: "想估算長期成本",
  },
  {
    href: "/tools/breed-match",
    icon: "🎯",
    title: "品種配對測驗",
    shortTitle: "品種配對",
    desc: "回答生活情境問題，推薦適合你的犬貓品種。",
    group: "planning",
    tone: "bg-cream-50 border-cream-300",
    intent: "準備選品種",
  },
  {
    href: "/tools/vet-prep",
    icon: "🏥",
    title: "就醫準備清單",
    shortTitle: "就醫準備",
    desc: "看醫生前整理症狀、照片、病史與該問的問題。",
    group: "planning",
    tone: "bg-cream-50 border-cream-300",
  },
  {
    href: "/tools/breed-compare",
    icon: "⚖️",
    title: "品種比較",
    shortTitle: "品種比較",
    desc: "選 2 到 3 個品種並排比較所有特性。",
    group: "reference",
    tone: "bg-cream-50 border-cream-300",
  },
  {
    href: "/tools/name-generator",
    icon: "✨",
    title: "寵物取名器",
    shortTitle: "寵物取名",
    desc: "依風格隨機產生名字，收藏喜歡的候選。",
    group: "reference",
    tone: "bg-cream-50 border-cream-300",
  },
  {
    href: "/tools/food-compare",
    icon: "📦",
    title: "飼料比較計算器",
    shortTitle: "飼料比較",
    desc: "比較不同飼料每千卡成本，避免只看公斤價。",
    group: "reference",
    tone: "bg-cream-50 border-cream-300",
  },
];

export function getFeaturedTools() {
  return TOOLS.filter((tool) => tool.featured);
}

export function getToolsByGroup(groupId: ToolGroupId) {
  return TOOLS.filter((tool) => tool.group === groupId);
}

export function getIntentTools() {
  return TOOLS.filter((tool) => tool.intent).slice(0, 6);
}
