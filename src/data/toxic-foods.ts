export type ToxicLevel = "safe" | "caution" | "dangerous" | "deadly";

export interface ToxicItem {
  name: string;
  aliases: string[];
  petTypes: ("dog" | "cat")[];
  level: ToxicLevel;
  symptom: string;
  detail: string;
  firstAid: string;
}

export const TOXIC_ITEMS: ToxicItem[] = [
  // ===== DEADLY =====
  { name: "葡萄", aliases: ["葡萄乾", "raisin", "grape"], petTypes: ["dog", "cat"], level: "deadly", symptom: "嘔吐、腹瀉、急性腎衰竭、尿量減少", detail: "即使少量也可能致命，毒性物質尚未確認。所有品種狗狗都有風險。", firstAid: "🚨 2 小時內送醫催吐，越早越好" },
  { name: "百合花", aliases: ["百合", "lily", "鐵炮百合", "香水百合"], petTypes: ["cat"], level: "deadly", symptom: "嘔吐、食慾不振、急性腎衰竭", detail: "對貓咪劇毒！即使舔到花粉都可能致命。所有品種百合都有毒。", firstAid: "🚨 立即送急診，腎衰竭在 24-72 小時內發生" },
  { name: "木糖醇", aliases: ["xylitol", "代糖", "無糖口香糖"], petTypes: ["dog"], level: "deadly", symptom: "低血糖、抽搐、肝衰竭", detail: "常見於無糖口香糖、烘焙品、牙膏。對狗極度危險。", firstAid: "🚨 立即送醫，低血糖可能在 10-60 分鐘內發生" },
  { name: "洋蔥", aliases: ["蔥", "大蒜", "韭菜", "紅蔥頭", "onion", "garlic"], petTypes: ["dog", "cat"], level: "deadly", symptom: "溶血性貧血、牙齦蒼白、虛弱", detail: "所有蔥屬植物（洋蔥、蒜、韭菜、蔥）都有毒。煮熟也不安全。粉末狀更危險。", firstAid: "⚠️ 大量食用需就醫，少量觀察 2-3 天" },
  { name: "巧克力", aliases: ["可可", "chocolate", "可可粉", "黑巧克力"], petTypes: ["dog", "cat"], level: "deadly", symptom: "嘔吐、腹瀉、心律不整、抽搐", detail: "可可鹼與咖啡因雙重毒性。黑巧克力 > 牛奶巧克力 > 白巧克力（毒性依序）。", firstAid: "🚨 大量食用需立即送醫催吐" },
  { name: "酒精", aliases: ["啤酒", "酒", "alcohol", "紅酒", "白酒"], petTypes: ["dog", "cat"], level: "deadly", symptom: "嘔吐、失去平衡、呼吸困難、昏迷", detail: "即使一小口啤酒也可能讓小型犬中毒。", firstAid: "🚨 送醫" },
  { name: "楊桃", aliases: ["star fruit"], petTypes: ["dog"], level: "deadly", symptom: "腎毒性、神經症狀、抽搐、昏迷", detail: "含草酸，腎毒性嚴重，程度不輸葡萄。", firstAid: "🚨 立即送醫" },
  { name: "酪梨", aliases: ["avocado", "牛油果"], petTypes: ["dog", "cat"], level: "dangerous", symptom: "嘔吐、腹瀉", detail: "果肉、皮、核都含 persin 毒素。核還有窒息風險。", firstAid: "⚠️ 就醫觀察" },

  // ===== DANGEROUS =====
  { name: "咖啡", aliases: ["咖啡因", "caffeine", "茶", "能量飲料"], petTypes: ["dog", "cat"], level: "dangerous", symptom: "心跳加速、焦躁、抽搐", detail: "咖啡因中毒，症狀類似巧克力中毒但更快發作。", firstAid: "⚠️ 大量攝取需就醫" },
  { name: "澳洲堅果", aliases: ["夏威夷豆", "macadamia"], petTypes: ["dog"], level: "dangerous", symptom: "無力、嘔吐、發抖、發燒", detail: "通常在 12 小時內出現症狀，48 小時內恢復。", firstAid: "觀察 48 小時，嚴重就醫" },
  { name: "生麵團", aliases: ["酵母麵團", "dough"], petTypes: ["dog", "cat"], level: "dangerous", symptom: "腹脹、嘔吐、酒精中毒", detail: "酵母在胃裡發酵膨脹，產生酒精。可能撐破胃。", firstAid: "⚠️ 立即就醫" },
  { name: "櫻桃", aliases: ["cherry", "櫻桃籽"], petTypes: ["dog", "cat"], level: "dangerous", symptom: "呼吸困難、瞳孔放大", detail: "籽、莖、葉含氰化物。果肉少量勉強可以，但風險太高建議完全避免。", firstAid: "吞籽需就醫" },
  { name: "柿子", aliases: ["persimmon"], petTypes: ["dog"], level: "dangerous", symptom: "腸道阻塞、腹瀉", detail: "籽和果蒂可能阻塞腸道。未成熟柿子含單寧酸。", firstAid: "吞籽需就醫" },
  { name: "龜背芋", aliases: ["monstera", "黃金葛", "pothos"], petTypes: ["dog", "cat"], level: "dangerous", symptom: "口腔灼傷、流口水、吞嚥困難", detail: "含不溶性草酸鈣結晶，刺激口腔黏膜。", firstAid: "沖洗口腔、給水、就醫" },
  { name: "牛奶", aliases: ["乳製品", "起司", "cheese", "milk", "優格"], petTypes: ["cat", "dog"], level: "caution", symptom: "腹瀉、脹氣", detail: "多數成貓成犬乳糖不耐。少量優格通常可以。", firstAid: "停止餵食即可" },

  // ===== CAUTION =====
  { name: "生魚", aliases: ["生肉", "sashimi", "生魚片"], petTypes: ["dog", "cat"], level: "caution", symptom: "沙門氏菌、寄生蟲", detail: "生魚含破壞維他命 B1 的酵素。生肉有寄生蟲風險。", firstAid: "煮熟再餵" },
  { name: "骨頭", aliases: ["雞骨頭", "bone", "煮熟的骨頭"], petTypes: ["dog"], level: "caution", symptom: "卡喉、腸穿孔", detail: "煮熟骨頭易碎裂刺穿腸道。生骨可以但要監督。", firstAid: "卡喉就醫、觀察排便" },
  { name: "鮪魚罐頭", aliases: ["tuna", "人用鮪魚"], petTypes: ["cat"], level: "caution", symptom: "汞中毒、維他命E缺乏", detail: "人用罐頭偶爾吃無妨，但長期會引起汞中毒。請選寵物專用鮪魚罐。", firstAid: "改用寵物專用罐頭" },
  { name: "鹽", aliases: ["醬油", "salt", "高鹽食物", "火腿", "培根"], petTypes: ["dog", "cat"], level: "caution", symptom: "嘔吐、腹瀉、脫水、腎臟負擔", detail: "人食鹽分對寵物過高。火腿、培根、加工食品都太鹹。", firstAid: "給大量清水稀釋" },

  // ===== SAFE =====
  { name: "蘋果", aliases: ["apple"], petTypes: ["dog", "cat"], level: "safe", symptom: "", detail: "去籽去蒂後安全。富含維他命 A、C 與纖維。蘋果籽含微量氰化物需避免。", firstAid: "" },
  { name: "香蕉", aliases: ["banana"], petTypes: ["dog", "cat"], level: "safe", symptom: "", detail: "富含鉀與維他命 B6。糖分偏高需控制份量。中型犬每天 2-3 片。", firstAid: "" },
  { name: "藍莓", aliases: ["blueberry"], petTypes: ["dog", "cat"], level: "safe", symptom: "", detail: "抗氧化超級食物。適合當訓練獎勵。", firstAid: "" },
  { name: "西瓜", aliases: ["watermelon"], petTypes: ["dog"], level: "safe", symptom: "", detail: "去籽去皮後安全。水分 92%，夏天補水好物。", firstAid: "" },
  { name: "草莓", aliases: ["strawberry"], petTypes: ["dog"], level: "safe", symptom: "", detail: "維他命 C 豐富。洗淨去蒂切塊。", firstAid: "" },
  { name: "水煮雞胸肉", aliases: ["雞肉", "chicken"], petTypes: ["dog", "cat"], level: "safe", symptom: "", detail: "無鹽無油水煮是最好的蛋白質來源。可當零食或拌飯。", firstAid: "" },
  { name: "地瓜", aliases: ["sweet potato", "蒸地瓜"], petTypes: ["dog", "cat"], level: "safe", symptom: "", detail: "煮熟後安全。富含纖維和維他命 A。生地瓜不好消化。", firstAid: "" },
  { name: "南瓜", aliases: ["pumpkin"], petTypes: ["dog", "cat"], level: "safe", symptom: "", detail: "蒸熟後安全。高纖維有助消化，常用於改善腹瀉。", firstAid: "" },
  { name: "胡蘿蔔", aliases: ["紅蘿蔔", "carrot"], petTypes: ["dog", "cat"], level: "safe", symptom: "", detail: "生或熟都可以。生胡蘿蔔條可以磨牙。", firstAid: "" },
  { name: "水煮蛋", aliases: ["雞蛋", "egg"], petTypes: ["dog", "cat"], level: "safe", symptom: "", detail: "全熟蛋安全。生蛋白含抗生物素會影響吸收。", firstAid: "" },
];

export const LEVEL_CONFIG: Record<ToxicLevel, { label: string; color: string; emoji: string; bg: string }> = {
  deadly: { label: "致命危險", color: "text-red-700", emoji: "☠️", bg: "bg-red-100 border-red-300" },
  dangerous: { label: "危險", color: "text-orange-700", emoji: "⚠️", bg: "bg-orange-100 border-orange-300" },
  caution: { label: "注意", color: "text-yellow-700", emoji: "⚡", bg: "bg-yellow-100 border-yellow-300" },
  safe: { label: "安全", color: "text-green-700", emoji: "✅", bg: "bg-green-100 border-green-300" },
};

export function searchToxicItems(query: string, petType?: "dog" | "cat"): ToxicItem[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  let results = TOXIC_ITEMS.filter((item) => {
    const names = [item.name, ...item.aliases].map((n) => n.toLowerCase());
    return names.some((n) => n.includes(q) || q.includes(n));
  });
  if (petType) results = results.filter((item) => item.petTypes.includes(petType));
  return results.sort((a, b) => {
    const order: Record<ToxicLevel, number> = { deadly: 0, dangerous: 1, caution: 2, safe: 3 };
    return order[a.level] - order[b.level];
  });
}
