import type { PetType, VaccineEntry } from "@/types";

/**
 * 台灣常見犬貓疫苗時程表
 * 資料來源參考：世界小動物獸醫師協會 (WSAVA) 2020 疫苗指引、台灣小動物獸醫師協會建議
 * 實際施打請諮詢信任的獸醫師
 */

export const DOG_VACCINES: VaccineEntry[] = [
  {
    weekAge: 6,
    label: "6 週齡 第一劑",
    vaccines: ["犬瘟熱", "傳染性肝炎", "腺病毒", "副流行性感冒", "小病毒"],
    required: true,
    note: "幼犬基礎五合一疫苗首劑",
  },
  {
    weekAge: 9,
    label: "9 週齡 第二劑",
    vaccines: ["五合一 + 鉤端螺旋體 + 冠狀病毒"],
    required: true,
    note: "加強七合一或八合一疫苗",
  },
  {
    weekAge: 12,
    label: "12 週齡 第三劑",
    vaccines: ["七合一/八合一 + 狂犬病"],
    required: true,
    note: "狂犬病疫苗為法定必打",
  },
  {
    weekAge: 16,
    label: "16 週齡 第四劑",
    vaccines: ["八合一 或 L4 鉤端螺旋體"],
    required: false,
    note: "依獸醫師建議補強",
  },
  {
    weekAge: 52,
    label: "滿 1 歲",
    vaccines: ["八合一 + 狂犬病"],
    required: true,
    note: "每年定期補強",
  },
];

export const CAT_VACCINES: VaccineEntry[] = [
  {
    weekAge: 8,
    label: "8 週齡 第一劑",
    vaccines: ["貓瘟", "貓皰疹病毒", "貓卡里西病毒"],
    required: true,
    note: "貓三合一基礎疫苗首劑",
  },
  {
    weekAge: 12,
    label: "12 週齡 第二劑",
    vaccines: ["三合一 + 貓白血病 (選擇性)"],
    required: true,
  },
  {
    weekAge: 16,
    label: "16 週齡 第三劑",
    vaccines: ["三合一 + 狂犬病"],
    required: true,
    note: "完成幼貓基礎免疫",
  },
  {
    weekAge: 52,
    label: "滿 1 歲",
    vaccines: ["三合一 + 狂犬病"],
    required: true,
    note: "每年定期補強",
  },
];

export function getVaccineSchedule(petType: PetType): VaccineEntry[] {
  return petType === "dog" ? DOG_VACCINES : CAT_VACCINES;
}
