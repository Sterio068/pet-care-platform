import { getAllTags, getArticlesByTagSlug, getTagBySlug } from "@/lib/articles";
import type { ArticleMeta } from "@/types";

interface ClusterToolLink {
  title: string;
  href: string;
  description: string;
}

interface TopicClusterConfig {
  slug: string;
  hubTitle: string;
  intent: string;
  audience: string;
  featuredSlugs: string[];
  entities: string[];
  questions: string[];
  toolLinks: ClusterToolLink[];
}

const TOPIC_CLUSTER_CONFIGS: TopicClusterConfig[] = [
  {
    slug: "health",
    hubTitle: "狗貓健康與疾病預防主題中心",
    intent: "快速判斷健康警訊、建立定期預防與就醫決策。",
    audience: "適合想確認症狀、慢性病風險、疫苗與急症處理的飼主。",
    featuredSlugs: [
      "cat-kidney-disease",
      "dog-heatstroke-prevention",
      "pet-flea-tick-guide",
      "dog-overweight-check",
    ],
    entities: ["慢性腎病", "中暑", "疫苗", "跳蚤壁蝨", "體態評分", "皮膚過敏"],
    questions: [
      "哪些症狀需要立即就醫？",
      "高齡貓狗多久健檢一次？",
      "狗狗中暑前有哪些早期徵兆？",
      "跳蚤壁蝨需要全年預防嗎？",
    ],
    toolLinks: [
      { title: "症狀檢查器", href: "/tools/symptom-checker", description: "整理觀察重點與就醫急迫度。" },
      { title: "疫苗時程", href: "/tools/vaccine-schedule", description: "查狗貓核心疫苗與提醒週期。" },
      { title: "毒物查詢", href: "/tools/toxic-checker", description: "快速查常見誤食風險。" },
    ],
  },
  {
    slug: "food",
    hubTitle: "狗貓飲食營養主題中心",
    intent: "從主食選擇、份量、水分到禁忌食物，建立可長期執行的餵食方式。",
    audience: "適合正在選飼料、調整體重、照顧老貓老犬或擔心誤食的飼主。",
    featuredSlugs: [
      "dog-food-brand-comparison",
      "cat-food-guide",
      "dog-water-intake",
      "cat-toxic-foods",
    ],
    entities: ["完整均衡", "乾糧", "濕食", "鮮食", "飲水量", "禁忌食物"],
    questions: [
      "狗飼料要看成分還是營養聲明？",
      "貓咪乾糧、濕食、生食怎麼取捨？",
      "狗狗每天喝多少水才合理？",
      "哪些食物對貓狗有中毒風險？",
    ],
    toolLinks: [
      { title: "餵食計算機", href: "/tools/food-calculator", description: "用體重與活動量估算每日熱量。" },
      { title: "食物比較", href: "/tools/food-compare", description: "比較常見食材與餵食注意事項。" },
      { title: "體重追蹤", href: "/tools/weight-tracker", description: "追蹤減重或增重趨勢。" },
    ],
  },
  {
    slug: "new-owner",
    hubTitle: "新手養狗養貓主題中心",
    intent: "把接回家前後、疫苗、用品、保險與生活規律一次串起來。",
    audience: "適合第一次養狗貓、準備領養，或剛接幼犬幼貓回家的家庭。",
    featuredSlugs: [
      "puppy-first-year",
      "kitten-first-year",
      "new-cat-owner-first-month",
      "pet-adoption-guide",
    ],
    entities: ["幼犬", "幼貓", "領養", "疫苗", "社會化", "寵物保險"],
    questions: [
      "接毛孩回家前要準備什麼？",
      "幼犬幼貓第一年有哪些健康節點？",
      "領養前要評估哪些家庭條件？",
      "寵物保險適合哪些飼主？",
    ],
    toolLinks: [
      { title: "品種配對", href: "/tools/breed-match", description: "依生活型態找到適合的狗貓品種。" },
      { title: "疫苗提醒", href: "/tools/vaccine-reminder", description: "建立疫苗與回診提醒。" },
      { title: "花費計算", href: "/tools/cost-calculator", description: "估算第一年與每月基本支出。" },
    ],
  },
  {
    slug: "senior",
    hubTitle: "老犬老貓照護主題中心",
    intent: "把高齡健檢、飲食、體重、牙齒與慢性病追蹤整合成日常照護流程。",
    audience: "適合家中狗狗 7 歲以上、貓咪 10 歲以上，或已開始追蹤慢性病的飼主。",
    featuredSlugs: [
      "senior-dog-care",
      "senior-cat-diet",
      "cat-kidney-disease",
      "pet-dental-care",
    ],
    entities: ["高齡犬", "高齡貓", "慢性腎病", "牙周病", "肌肉流失", "健檢"],
    questions: [
      "老犬老貓多久健檢一次？",
      "老貓飲食需要直接低蛋白嗎？",
      "高齡狗貓體重下降代表什麼？",
      "牙齒問題會影響食慾嗎？",
    ],
    toolLinks: [
      { title: "寵物年齡換算", href: "/tools/pet-age", description: "判斷目前生命階段。" },
      { title: "體重追蹤", href: "/tools/weight-tracker", description: "記錄高齡毛孩體重變化。" },
      { title: "看診準備", href: "/tools/vet-prep", description: "整理回診問題與觀察紀錄。" },
    ],
  },
  {
    slug: "training",
    hubTitle: "狗貓行為訓練主題中心",
    intent: "用正向訓練、環境調整與觀察訊號處理常見行為問題。",
    audience: "適合遇到吠叫、咬人、暴衝、分離焦慮或貓咪亂尿的飼主。",
    featuredSlugs: [
      "dog-leash-training",
      "dog-socialization",
      "dog-separation-anxiety",
      "cat-inappropriate-urination",
    ],
    entities: ["正向訓練", "社會化", "分離焦慮", "鬆繩散步", "貓砂盆", "壓力"],
    questions: [
      "狗狗暴衝要怎麼練鬆繩散步？",
      "幼犬社會化是不是越多人越好？",
      "分離焦慮能不能靠罵改善？",
      "貓亂尿是行為問題還是疾病？",
    ],
    toolLinks: [
      { title: "品種配對", href: "/tools/breed-match", description: "理解品種特質與活動需求。" },
      { title: "症狀檢查器", href: "/tools/symptom-checker", description: "先排除可能的疼痛或疾病訊號。" },
    ],
  },
  {
    slug: "grooming",
    hubTitle: "美容清潔與日常護理主題中心",
    intent: "建立洗澡、刷牙、剪指甲、清耳朵與環境清潔的安全流程。",
    audience: "適合想自己在家做基礎清潔，或想知道何時該交給獸醫/美容師的飼主。",
    featuredSlugs: [
      "pet-dental-care",
      "dog-bathing-guide",
      "dog-nail-trimming",
      "dog-ear-care",
    ],
    entities: ["牙齒保健", "洗澡", "剪指甲", "耳朵清潔", "梳毛", "貓砂"],
    questions: [
      "狗狗多久洗一次澡比較合理？",
      "剪指甲剪到血線怎麼辦？",
      "清耳朵是不是越常越好？",
      "狗貓洗牙需要麻醉嗎？",
    ],
    toolLinks: [
      { title: "看診準備", href: "/tools/vet-prep", description: "整理牙齒、耳朵、皮膚問題給醫師看。" },
      { title: "花費計算", href: "/tools/cost-calculator", description: "估算美容與醫療支出。" },
    ],
  },
  {
    slug: "communication",
    hubTitle: "讀懂毛孩行為語言主題中心",
    intent: "用聲音、便便、吃草與肢體訊號理解毛孩狀態，而不是只靠猜。",
    audience: "適合想分辨一般行為、壓力訊號與健康警訊的飼主。",
    featuredSlugs: [
      "cat-purring-meaning",
      "cat-meow-meanings",
      "dog-grass-eating",
      "dog-poop-health",
    ],
    entities: ["貓叫聲", "咕嚕聲", "吃草", "便便", "身體訊號"],
    questions: [
      "貓咪咕嚕一定是開心嗎？",
      "狗狗吃草需要阻止嗎？",
      "便便顏色怎麼看健康？",
      "哪些行為變化可能代表疼痛？",
    ],
    toolLinks: [
      { title: "症狀檢查器", href: "/tools/symptom-checker", description: "把觀察到的訊號整理成就醫線索。" },
    ],
  },
  {
    slug: "travel",
    hubTitle: "外出旅行與就醫減壓主題中心",
    intent: "整理外出籠、交通、住宿、夏季外出與就醫前準備。",
    audience: "適合準備帶毛孩看診、旅行、搬家或短期住宿的飼主。",
    featuredSlugs: [
      "pet-travel-guide",
      "cat-carrier-training",
      "pet-summer-care",
    ],
    entities: ["外出籠", "寵物旅行", "交通規則", "夏季外出", "寵物友善"],
    questions: [
      "貓咪外出籠可以怎麼減壓訓練？",
      "帶毛孩旅行前要確認哪些規則？",
      "夏天外出有哪些中暑風險？",
    ],
    toolLinks: [
      { title: "看診準備", href: "/tools/vet-prep", description: "整理就醫與旅行前檢查清單。" },
      { title: "花費計算", href: "/tools/cost-calculator", description: "估算交通、住宿與醫療備用金。" },
    ],
  },
  {
    slug: "emergency",
    hubTitle: "緊急狀況與急救判斷主題中心",
    intent: "在中毒、中暑、嘔吐、血便等情境下，先分辨急迫度並準備就醫資訊。",
    audience: "適合需要快速判斷是否急診，以及想預先建立急救知識的飼主。",
    featuredSlugs: [
      "dog-heatstroke-prevention",
      "cat-toxic-foods",
      "dog-poop-health",
      "cat-vomiting-reasons",
    ],
    entities: ["中暑", "中毒", "嘔吐", "血便", "急診", "誤食"],
    questions: [
      "誤食後要不要先催吐？",
      "狗狗中暑在送醫前能做什麼？",
      "血便、黑便、嘔吐哪些情況要急診？",
    ],
    toolLinks: [
      { title: "緊急指南", href: "/tools/emergency-guide", description: "依狀況整理急救步驟。" },
      { title: "毒物查詢", href: "/tools/toxic-checker", description: "快速查常見食物與植物風險。" },
      { title: "症狀檢查器", href: "/tools/symptom-checker", description: "整理症狀與就醫優先順序。" },
    ],
  },
];

export type TopicCluster = TopicClusterConfig & {
  label: string;
  description: string;
  count: number;
  featuredArticles: ArticleMeta[];
};

export function getTopicCluster(slug: string): TopicCluster | undefined {
  const tag = getTagBySlug(slug);
  const config = TOPIC_CLUSTER_CONFIGS.find((cluster) => cluster.slug === slug);
  if (!tag || !config) return undefined;

  const articles = getArticlesByTagSlug(slug);
  const featuredArticles = config.featuredSlugs
    .map((featuredSlug) => articles.find((article) => article.slug === featuredSlug))
    .filter((article): article is ArticleMeta => Boolean(article));

  return {
    ...config,
    label: tag.label,
    description: tag.description,
    count: articles.length,
    featuredArticles,
  };
}

export function getAllTopicClusters(): TopicCluster[] {
  const visibleTagSlugs = new Set(getAllTags().map((tag) => tag.slug));
  return TOPIC_CLUSTER_CONFIGS
    .filter((cluster) => visibleTagSlugs.has(cluster.slug))
    .map((cluster) => getTopicCluster(cluster.slug))
    .filter((cluster): cluster is TopicCluster => Boolean(cluster));
}
