export interface PetNameEntry {
  name: string;
  gender: "male" | "female" | "neutral";
  style: "cute" | "elegant" | "food" | "nature" | "japanese" | "western";
}

const NAMES: PetNameEntry[] = [
  // cute
  { name: "麻糬", gender: "neutral", style: "cute" },
  { name: "糰子", gender: "neutral", style: "cute" },
  { name: "毛毛", gender: "neutral", style: "cute" },
  { name: "QQ", gender: "neutral", style: "cute" },
  { name: "肉圓", gender: "neutral", style: "cute" },
  { name: "嘟嘟", gender: "neutral", style: "cute" },
  { name: "饅頭", gender: "neutral", style: "cute" },
  { name: "球球", gender: "neutral", style: "cute" },
  { name: "泡泡", gender: "neutral", style: "cute" },
  { name: "豆豆", gender: "neutral", style: "cute" },
  { name: "蛋蛋", gender: "male", style: "cute" },
  { name: "咪咪", gender: "female", style: "cute" },
  { name: "妞妞", gender: "female", style: "cute" },
  { name: "乖乖", gender: "neutral", style: "cute" },
  { name: "圓圓", gender: "neutral", style: "cute" },
  { name: "小寶", gender: "neutral", style: "cute" },
  { name: "旺旺", gender: "male", style: "cute" },
  { name: "臭臭", gender: "neutral", style: "cute" },
  { name: "肥肥", gender: "neutral", style: "cute" },
  { name: "萌萌", gender: "female", style: "cute" },

  // food
  { name: "奶茶", gender: "neutral", style: "food" },
  { name: "布丁", gender: "neutral", style: "food" },
  { name: "拿鐵", gender: "neutral", style: "food" },
  { name: "抹茶", gender: "neutral", style: "food" },
  { name: "芋頭", gender: "neutral", style: "food" },
  { name: "巧克力", gender: "neutral", style: "food" },
  { name: "焦糖", gender: "neutral", style: "food" },
  { name: "可頌", gender: "neutral", style: "food" },
  { name: "司康", gender: "neutral", style: "food" },
  { name: "鬆餅", gender: "neutral", style: "food" },
  { name: "麻花", gender: "neutral", style: "food" },
  { name: "蛋塔", gender: "neutral", style: "food" },
  { name: "芒果", gender: "neutral", style: "food" },
  { name: "草莓", gender: "female", style: "food" },
  { name: "栗子", gender: "neutral", style: "food" },
  { name: "柚子", gender: "neutral", style: "food" },
  { name: "橘子", gender: "neutral", style: "food" },
  { name: "椰子", gender: "neutral", style: "food" },
  { name: "薯條", gender: "neutral", style: "food" },
  { name: "牛奶", gender: "neutral", style: "food" },

  // nature
  { name: "小雨", gender: "neutral", style: "nature" },
  { name: "雪花", gender: "female", style: "nature" },
  { name: "星星", gender: "neutral", style: "nature" },
  { name: "月月", gender: "female", style: "nature" },
  { name: "小風", gender: "male", style: "nature" },
  { name: "雲朵", gender: "female", style: "nature" },
  { name: "小溪", gender: "neutral", style: "nature" },
  { name: "露露", gender: "female", style: "nature" },
  { name: "花花", gender: "female", style: "nature" },
  { name: "葉子", gender: "neutral", style: "nature" },
  { name: "小森", gender: "male", style: "nature" },
  { name: "小海", gender: "male", style: "nature" },
  { name: "陽光", gender: "neutral", style: "nature" },
  { name: "春天", gender: "neutral", style: "nature" },
  { name: "秋秋", gender: "neutral", style: "nature" },

  // japanese
  { name: "小桃", gender: "female", style: "japanese" },
  { name: "小梅", gender: "female", style: "japanese" },
  { name: "福福", gender: "neutral", style: "japanese" },
  { name: "小鶴", gender: "neutral", style: "japanese" },
  { name: "小櫻", gender: "female", style: "japanese" },
  { name: "太郎", gender: "male", style: "japanese" },
  { name: "小雪", gender: "female", style: "japanese" },
  { name: "小黑", gender: "male", style: "japanese" },
  { name: "小白", gender: "neutral", style: "japanese" },
  { name: "小橘", gender: "neutral", style: "japanese" },
  { name: "阿福", gender: "male", style: "japanese" },
  { name: "柚希", gender: "female", style: "japanese" },
  { name: "小光", gender: "male", style: "japanese" },
  { name: "結衣", gender: "female", style: "japanese" },
  { name: "琥珀", gender: "neutral", style: "japanese" },

  // elegant
  { name: "威廉", gender: "male", style: "elegant" },
  { name: "莫妮", gender: "female", style: "elegant" },
  { name: "路易", gender: "male", style: "elegant" },
  { name: "蘇菲", gender: "female", style: "elegant" },
  { name: "查理", gender: "male", style: "elegant" },
  { name: "貝拉", gender: "female", style: "elegant" },
  { name: "奧利佛", gender: "male", style: "elegant" },
  { name: "蒂芙尼", gender: "female", style: "elegant" },
  { name: "杰克", gender: "male", style: "elegant" },
  { name: "愛麗絲", gender: "female", style: "elegant" },
  { name: "西蒙", gender: "male", style: "elegant" },
  { name: "克萊兒", gender: "female", style: "elegant" },
  { name: "艾倫", gender: "male", style: "elegant" },
  { name: "維多利亞", gender: "female", style: "elegant" },
  { name: "雨果", gender: "male", style: "elegant" },

  // western
  { name: "Lucky", gender: "neutral", style: "western" },
  { name: "Milo", gender: "male", style: "western" },
  { name: "Luna", gender: "female", style: "western" },
  { name: "Coco", gender: "neutral", style: "western" },
  { name: "Max", gender: "male", style: "western" },
  { name: "Bella", gender: "female", style: "western" },
  { name: "Charlie", gender: "male", style: "western" },
  { name: "Nana", gender: "female", style: "western" },
  { name: "Leo", gender: "male", style: "western" },
  { name: "Cookie", gender: "neutral", style: "western" },
  { name: "Oreo", gender: "neutral", style: "western" },
  { name: "Mocha", gender: "neutral", style: "western" },
  { name: "Butter", gender: "neutral", style: "western" },
  { name: "Mango", gender: "neutral", style: "western" },
  { name: "Pepper", gender: "neutral", style: "western" },
];

export const STYLE_LABELS: Record<PetNameEntry["style"], string> = {
  cute: "可愛",
  food: "食物系",
  nature: "自然系",
  japanese: "日式",
  elegant: "優雅",
  western: "英文",
};

export function getNames(
  filters?: {
    gender?: PetNameEntry["gender"];
    style?: PetNameEntry["style"];
  },
): PetNameEntry[] {
  let result = NAMES;
  if (filters?.gender && filters.gender !== "neutral") {
    result = result.filter(
      (n) => n.gender === filters.gender || n.gender === "neutral",
    );
  }
  if (filters?.style) {
    result = result.filter((n) => n.style === filters.style);
  }
  return result;
}

export function getRandomNames(
  count: number,
  filters?: {
    gender?: PetNameEntry["gender"];
    style?: PetNameEntry["style"];
  },
): PetNameEntry[] {
  const pool = getNames(filters);
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}
