import type { PetType, SymptomOption, SymptomCause } from "@/types";

export const SYMPTOM_OPTIONS: SymptomOption[] = [
  { id: "vomiting", label: "嘔吐", petTypes: ["dog", "cat"] },
  { id: "diarrhea", label: "拉肚子 / 軟便", petTypes: ["dog", "cat"] },
  { id: "loss_appetite", label: "食慾不振", petTypes: ["dog", "cat"] },
  { id: "lethargy", label: "精神萎靡 / 沒活力", petTypes: ["dog", "cat"] },
  { id: "coughing", label: "咳嗽", petTypes: ["dog", "cat"] },
  { id: "sneezing", label: "打噴嚏 / 流鼻水", petTypes: ["dog", "cat"] },
  { id: "scratching", label: "搔癢 / 抓個不停", petTypes: ["dog", "cat"] },
  { id: "limping", label: "跛腳 / 走路怪", petTypes: ["dog", "cat"] },
  { id: "drinking_more", label: "喝水變多", petTypes: ["dog", "cat"] },
  { id: "urinate_abnormal", label: "排尿異常", petTypes: ["dog", "cat"] },
  { id: "breath_hard", label: "呼吸急促 / 困難", petTypes: ["dog", "cat"] },
  { id: "bloody_stool", label: "血便", petTypes: ["dog", "cat"] },
  { id: "eye_discharge", label: "眼睛分泌物多", petTypes: ["dog", "cat"] },
  { id: "hiding", label: "躲起來 / 異常安靜", petTypes: ["cat"] },
  { id: "excessive_grooming", label: "過度理毛", petTypes: ["cat"] },
];

type SymptomKey = (typeof SYMPTOM_OPTIONS)[number]["id"];

const SYMPTOM_CAUSES: Record<SymptomKey, SymptomCause[]> = {
  vomiting: [
    { name: "吃太快 / 消化不良", description: "食物快速進食導致胃部不適", urgency: "low" },
    { name: "毛球症 (貓)", description: "理毛時吞入毛髮形成毛球", urgency: "low" },
    { name: "食物過敏", description: "對特定食材產生免疫反應", urgency: "medium" },
    { name: "腸胃炎", description: "病毒或細菌感染引起", urgency: "medium" },
    { name: "誤食異物 / 中毒", description: "吞食不該吃的物品或有毒食物", urgency: "emergency" },
  ],
  diarrhea: [
    { name: "換食物 / 飲食不當", description: "突然改變飼料或吃不熟悉食物", urgency: "low" },
    { name: "壓力 / 環境變化", description: "搬家、新成員等造成緊張", urgency: "low" },
    { name: "寄生蟲感染", description: "蛔蟲、球蟲等腸道寄生蟲", urgency: "medium" },
    { name: "細菌 / 病毒感染", description: "如犬小病毒、冠狀病毒等", urgency: "high" },
  ],
  loss_appetite: [
    { name: "環境壓力", description: "新環境或生活變化", urgency: "low" },
    { name: "口腔問題", description: "牙結石、口炎、牙齒鬆動", urgency: "medium" },
    { name: "腸胃疾病", description: "腸胃炎、胃潰瘍", urgency: "medium" },
    { name: "腎臟或肝臟疾病", description: "慢性內科問題", urgency: "high" },
  ],
  lethargy: [
    { name: "天氣炎熱", description: "夏季中暑或脫水傾向", urgency: "medium" },
    { name: "感染發燒", description: "病毒或細菌感染", urgency: "medium" },
    { name: "貧血", description: "紅血球數量不足", urgency: "high" },
    { name: "心臟或內臟疾病", description: "需詳細檢查", urgency: "high" },
  ],
  coughing: [
    { name: "犬舍咳 (犬)", description: "傳染性氣管支氣管炎", urgency: "medium" },
    { name: "氣管塌陷 (小型犬)", description: "小型犬常見問題", urgency: "medium" },
    { name: "心臟病", description: "老年犬貓常見", urgency: "high" },
    { name: "肺炎 / 肺水腫", description: "嚴重呼吸道疾病", urgency: "emergency" },
  ],
  sneezing: [
    { name: "灰塵 / 過敏原", description: "環境刺激", urgency: "low" },
    { name: "上呼吸道感染", description: "感冒、貓感冒", urgency: "medium" },
    { name: "鼻腔異物", description: "吸入異物卡在鼻腔", urgency: "medium" },
  ],
  scratching: [
    { name: "跳蚤 / 蟎蟲", description: "體外寄生蟲感染", urgency: "low" },
    { name: "過敏性皮膚炎", description: "食物或環境過敏", urgency: "medium" },
    { name: "真菌感染 (黴菌)", description: "皮癬菌，會傳染給人", urgency: "medium" },
  ],
  limping: [
    { name: "軟組織扭傷", description: "短暫拉傷或扭傷", urgency: "low" },
    { name: "關節炎", description: "老犬常見", urgency: "medium" },
    { name: "骨折", description: "摔落或撞擊", urgency: "emergency" },
    { name: "髖關節發育不良", description: "大型犬遺傳疾病", urgency: "high" },
  ],
  drinking_more: [
    { name: "天氣炎熱 / 活動量大", description: "正常生理反應", urgency: "low" },
    { name: "糖尿病", description: "血糖控制異常", urgency: "high" },
    { name: "腎臟疾病", description: "腎功能下降", urgency: "high" },
    { name: "庫欣氏症", description: "腎上腺問題", urgency: "high" },
  ],
  urinate_abnormal: [
    { name: "泌尿道感染", description: "細菌感染尿道膀胱", urgency: "medium" },
    { name: "膀胱結石", description: "結石阻塞尿道", urgency: "high" },
    { name: "腎臟疾病", description: "腎功能異常", urgency: "high" },
    { name: "公貓尿道阻塞", description: "致命緊急狀況", urgency: "emergency" },
  ],
  breath_hard: [
    { name: "中暑", description: "炎熱環境過度曝曬", urgency: "emergency" },
    { name: "心臟病", description: "心臟功能不全", urgency: "emergency" },
    { name: "氣管異物", description: "吸入卡住的物品", urgency: "emergency" },
    { name: "肺炎", description: "肺部感染", urgency: "high" },
  ],
  bloody_stool: [
    { name: "嚴重腸胃炎", description: "可能為出血性腸炎", urgency: "high" },
    { name: "犬小病毒 (幼犬)", description: "致命傳染病", urgency: "emergency" },
    { name: "腸道寄生蟲", description: "鉤蟲等寄生蟲", urgency: "medium" },
  ],
  eye_discharge: [
    { name: "結膜炎", description: "眼結膜發炎", urgency: "medium" },
    { name: "淚囊炎", description: "淚管阻塞", urgency: "medium" },
    { name: "角膜潰瘍", description: "眼角膜受損", urgency: "high" },
  ],
  hiding: [
    { name: "壓力 / 焦慮", description: "環境變化或新成員", urgency: "low" },
    { name: "身體不適", description: "貓咪生病會本能躲藏", urgency: "medium" },
  ],
  excessive_grooming: [
    { name: "壓力行為", description: "焦慮導致強迫性理毛", urgency: "medium" },
    { name: "皮膚過敏", description: "搔癢讓貓咪不停理毛", urgency: "medium" },
  ],
};

const URGENCY_RANK: Record<SymptomCause["urgency"], number> = {
  low: 1,
  medium: 2,
  high: 3,
  emergency: 4,
};

export function analyzeSymptoms(
  petType: PetType,
  selectedSymptoms: string[],
) {
  if (selectedSymptoms.length === 0) return null;

  const allCauses: SymptomCause[] = [];
  const urgencyCounts = { low: 0, medium: 0, high: 0, emergency: 0 };

  for (const sid of selectedSymptoms) {
    const causes = SYMPTOM_CAUSES[sid as SymptomKey] ?? [];
    for (const c of causes) {
      allCauses.push(c);
      urgencyCounts[c.urgency]++;
    }
  }

  // 依緊急度排序，最嚴重優先
  allCauses.sort((a, b) => URGENCY_RANK[b.urgency] - URGENCY_RANK[a.urgency]);

  // 去重
  const seen = new Set<string>();
  const uniqueCauses = allCauses.filter((c) => {
    if (seen.has(c.name)) return false;
    seen.add(c.name);
    return true;
  });

  // 判定整體緊急度
  let urgencyLevel: "低" | "中" | "高" | "緊急" = "低";
  let urgencyColor = "bg-accent-100 text-accent-800";
  if (urgencyCounts.emergency > 0) {
    urgencyLevel = "緊急";
    urgencyColor = "bg-red-100 text-red-800";
  } else if (urgencyCounts.high >= 2) {
    urgencyLevel = "高";
    urgencyColor = "bg-orange-100 text-orange-800";
  } else if (urgencyCounts.high >= 1 || urgencyCounts.medium >= 2) {
    urgencyLevel = "中";
    urgencyColor = "bg-yellow-100 text-yellow-800";
  }

  const advice =
    urgencyLevel === "緊急"
      ? [
          "⚠️ 請立即帶往就近的動物醫院或 24 小時急診",
          "移動時保持寵物穩定、避免餵食餵水",
          "可以事先撥打電話告知病情讓醫院準備",
        ]
      : urgencyLevel === "高"
        ? [
            "建議 24 小時內安排獸醫門診",
            "記錄症狀發生時間、頻率、形狀",
            "避免自行餵藥或人用藥物",
          ]
        : urgencyLevel === "中"
          ? [
              "可觀察 24-48 小時，若無改善應就診",
              "提供清淡食物、充足水分",
              "保持環境安靜讓寵物休息",
            ]
          : [
              "先觀察情況變化並記錄",
              "檢查近期飲食、環境是否有異動",
              "若持續超過 3 天或惡化請就診",
            ];

  return {
    urgencyLevel,
    urgencyColor,
    causes: uniqueCauses.slice(0, 6),
    advice,
  };
}

export function getAvailableSymptoms(petType: PetType): SymptomOption[] {
  return SYMPTOM_OPTIONS.filter((s) => s.petTypes.includes(petType));
}
