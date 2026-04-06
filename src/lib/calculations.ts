import type { PetType, DogSize, LifeStage, ActivityLevel } from "@/types";

/**
 * 計算寵物相當於人類的年齡
 * 狗：依體型大小差異（參考 AVMA / AAHA 指引）
 * 貓：第一年 = 15 歲；第二年 +9（=24）；之後每年 +4
 */
export function petAgeInHumanYears(
  petType: PetType,
  ageYears: number,
  ageMonths: number = 0,
  dogSize: DogSize = "medium",
): number {
  const totalYears = ageYears + ageMonths / 12;
  if (totalYears <= 0) return 0;

  if (petType === "cat") {
    if (totalYears <= 1) return Math.round(totalYears * 15);
    if (totalYears <= 2) return Math.round(15 + (totalYears - 1) * 9);
    return Math.round(24 + (totalYears - 2) * 4);
  }

  // 狗
  if (totalYears <= 1) return Math.round(totalYears * 15);
  if (totalYears <= 2) return Math.round(15 + (totalYears - 1) * 9);

  // 之後每年依體型增加
  const perYearAfter: Record<DogSize, number> = {
    small: 4,
    medium: 5,
    large: 6,
  };
  return Math.round(24 + (totalYears - 2) * perYearAfter[dogSize]);
}

/**
 * 計算每日基礎熱量需求 (RER, Resting Energy Requirement)
 * 公式: RER = 70 × (體重kg)^0.75
 */
export function calculateRER(weightKg: number): number {
  if (weightKg <= 0) return 0;
  return 70 * Math.pow(weightKg, 0.75);
}

/**
 * 依生活階段與活動量的代謝係數
 * 參考 NRC (National Research Council) 指引
 */
function getMetabolicFactor(
  petType: PetType,
  lifeStage: LifeStage,
  activity: ActivityLevel,
  neutered: boolean,
): number {
  if (petType === "dog") {
    if (lifeStage === "puppy") {
      return activity === "high" ? 2.5 : 2.0;
    }
    if (lifeStage === "senior") {
      return neutered ? 1.2 : 1.4;
    }
    // adult
    const base = neutered ? 1.6 : 1.8;
    const adjust = { low: -0.2, moderate: 0, high: 0.4 }[activity];
    return base + adjust;
  }

  // 貓
  if (lifeStage === "puppy") {
    return 2.5;
  }
  if (lifeStage === "senior") {
    return neutered ? 1.1 : 1.3;
  }
  // adult cat
  const base = neutered ? 1.2 : 1.4;
  const adjust = { low: -0.1, moderate: 0, high: 0.2 }[activity];
  return base + adjust;
}

/**
 * 計算每日建議熱量攝取 (MER = RER × 代謝係數)
 */
export function calculateDailyCalories(
  petType: PetType,
  weightKg: number,
  lifeStage: LifeStage,
  activity: ActivityLevel,
  neutered: boolean,
): number {
  const rer = calculateRER(weightKg);
  const factor = getMetabolicFactor(petType, lifeStage, activity, neutered);
  return Math.round(rer * factor);
}

/**
 * 依熱量密度計算每日乾糧建議克數
 * caloriesPerGram: 飼料每克熱量（一般乾糧約 3.5-4.2 kcal/g）
 */
export function calculateDailyFoodGrams(
  dailyCalories: number,
  caloriesPerGram: number,
): number {
  if (caloriesPerGram <= 0) return 0;
  return Math.round(dailyCalories / caloriesPerGram);
}
