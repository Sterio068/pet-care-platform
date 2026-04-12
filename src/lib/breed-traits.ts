import { BREEDS } from "@/data/breeds";
import type { BreedProfile } from "@/types";

export interface BreedTrait {
  slug: string;
  label: string;
  emoji: string;
  description: string;
  seoDescription: string;
  keywords: string[];
  // 命中：suitableFor 含任一 matchTerms 的品種納入
  matchTerms: string[];
}

export const BREED_TRAITS: BreedTrait[] = [
  {
    slug: "apartment",
    label: "適合公寓飼養",
    emoji: "🏙️",
    description: "住公寓也能養！活動量較低或體型合適、不過度吠叫的公寓友善品種。",
    seoDescription:
      "住公寓想養狗貓？精選台灣公寓最常見、適合室內空間、不需要大院子的品種，讓你在有限空間也能快樂陪伴毛孩。",
    keywords: ["公寓養狗", "公寓養貓", "適合公寓品種", "小空間養寵", "室內養狗"],
    matchTerms: ["公寓"],
  },
  {
    slug: "beginners",
    label: "適合新手飼主",
    emoji: "🌱",
    description: "好訓練、個性溫和、照護需求低，第一次養狗或養貓的最佳入門選擇。",
    seoDescription:
      "第一次養狗或養貓該選哪個品種？整理好訓練、親人、容易照顧的品種，新手飼主也能輕鬆上手，不容易踩雷。",
    keywords: ["新手養狗", "第一次養貓推薦", "初學者養狗", "容易養的貓", "新手友善品種"],
    matchTerms: ["第一次養", "初次養", "新手"],
  },
  {
    slug: "families-with-kids",
    label: "適合有小孩的家庭",
    emoji: "👨‍👩‍👧‍👦",
    description: "親人、友善、溫和，適合家中有嬰幼兒或學齡兒童的家庭型品種。",
    seoDescription:
      "家裡有小孩可以養什麼狗或貓？精選個性溫和、對兒童友善、不易攻擊的品種，讓孩子從小與毛孩建立深厚情感。",
    keywords: ["有小孩養什麼狗", "適合小孩的貓", "兒童友善寵物", "小孩養狗品種", "溫和狗品種"],
    matchTerms: ["有小孩"],
  },
  {
    slug: "active",
    label: "適合喜歡運動的飼主",
    emoji: "🏃",
    description: "精力旺盛、熱愛戶外、適合跑步健行或有大空間飼主的高活動量品種。",
    seoDescription:
      "喜歡跑步、爬山、戶外活動，想要一隻可以跟你一起運動的毛孩？精選體能佳、耐力好、熱愛戶外的高活動量品種。",
    keywords: ["適合運動的狗", "跑步伴侶狗", "戶外活動狗品種", "高活動量狗", "運動型貓品種"],
    matchTerms: ["活潑家庭", "活躍家庭", "運動型", "喜歡戶外", "熱愛運動", "有運動習慣"],
  },
  {
    slug: "seniors",
    label: "適合年長飼主",
    emoji: "🧓",
    description: "性格溫和、運動量低、黏人陪伴型，退休族或年長飼主的理想伴侶。",
    seoDescription:
      "退休族或老年人適合養什麼狗或貓？精選個性溫順、運動量需求低、喜歡安靜陪伴的品種，不需要每天長跑也能照顧好。",
    keywords: ["老人養狗", "退休族養貓", "年長者適合的寵物", "低運動量狗品種", "陪伴型貓"],
    matchTerms: ["年長者", "老年飼主", "老年", "安靜家庭", "居家工作"],
  },
  {
    slug: "allergy-friendly",
    label: "過敏友善品種",
    emoji: "🌸",
    description: "低掉毛、低過敏原，對寵物毛髮或皮屑過敏的飼主也相對友善的品種。",
    seoDescription:
      "對貓毛或狗毛過敏卻想養寵物？整理低過敏原、低掉毛品種，過敏體質飼主也可以考慮的選項，仍建議先做過敏測試。",
    keywords: ["過敏可以養什麼狗", "低過敏貓品種", "對寵物過敏怎麼辦", "低掉毛品種", "過敏體質養狗"],
    matchTerms: ["過敏體質", "對貓毛過敏", "過敏"],
  },
  {
    slug: "multi-pet",
    label: "適合多寵物家庭",
    emoji: "🐾",
    description: "社交性好、對其他動物友善，可以與其他狗貓或小動物和平共處的品種。",
    seoDescription:
      "家裡已經有狗或貓，想再養一隻？精選社交性高、不會攻擊同伴、適合多寵物家庭共同生活的品種。",
    keywords: ["多隻狗共養", "貓狗一起養", "多貓家庭品種", "友善同伴狗品種", "與貓相處好的狗"],
    matchTerms: ["多貓家庭", "有其他寵物", "多寵物"],
  },
  {
    slug: "quiet",
    label: "個性安靜的品種",
    emoji: "🤫",
    description: "不喜歡吠叫、個性沉穩，適合安靜環境、怕打擾鄰居的飼主。",
    seoDescription:
      "住公寓怕狗狗吵到鄰居，或想養個性安靜的貓？精選不喜歡吠叫、個性穩定、不過度黏人的安靜型品種。",
    keywords: ["不吵的狗品種", "安靜貓品種", "不愛叫的狗", "適合公寓安靜狗", "安靜型貓"],
    matchTerms: ["安靜家庭", "喜歡安靜貓咪", "喜歡獨立貓咪", "居家工作者"],
  },
];

export function getTraitBySlug(slug: string): BreedTrait | undefined {
  return BREED_TRAITS.find((t) => t.slug === slug);
}

export function getBreedsByTrait(slug: string): BreedProfile[] {
  const trait = getTraitBySlug(slug);
  if (!trait) return [];
  return BREEDS.filter((b) =>
    b.suitableFor.some((sf) => trait.matchTerms.some((term) => sf.includes(term))),
  );
}

// 找出一個品種命中哪些 trait（供品種詳情頁顯示）
export function getTraitsForBreed(breed: BreedProfile): BreedTrait[] {
  return BREED_TRAITS.filter((t) =>
    breed.suitableFor.some((sf) => t.matchTerms.some((term) => sf.includes(term))),
  );
}
