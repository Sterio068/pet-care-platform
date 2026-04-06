"use client";

import { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { PetTypeToggle } from "@/components/ui/PetTypeToggle";
import { ResultCard } from "@/components/ui/ResultCard";
import {
  calculateDailyCalories,
  calculateDailyFoodGrams,
} from "@/lib/calculations";
import type { PetType, LifeStage, ActivityLevel } from "@/types";

export function FoodCalculator() {
  const [petType, setPetType] = useState<PetType>("dog");
  const [weight, setWeight] = useState<string>("10");
  const [lifeStage, setLifeStage] = useState<LifeStage>("adult");
  const [activity, setActivity] = useState<ActivityLevel>("moderate");
  const [neutered, setNeutered] = useState<boolean>(true);
  const [foodKcal, setFoodKcal] = useState<string>("3.8");

  const w = parseFloat(weight) || 0;
  const kcalPerGram = parseFloat(foodKcal) || 3.8;
  const dailyCalories = calculateDailyCalories(
    petType,
    w,
    lifeStage,
    activity,
    neutered,
  );
  const dailyGrams = calculateDailyFoodGrams(dailyCalories, kcalPerGram);
  const perMeal = dailyGrams > 0 ? Math.round(dailyGrams / 2) : 0;

  return (
    <div className="space-y-5">
      <div className="flex justify-center">
        <PetTypeToggle
          value={petType}
          onChange={(t) => {
            setPetType(t);
            setWeight(t === "dog" ? "10" : "4");
          }}
        />
      </div>

      <Input
        label="體重"
        type="number"
        step="0.1"
        min="0"
        value={weight}
        onChange={(e) => setWeight(e.target.value)}
        suffix="kg"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Select
          label="生命階段"
          value={lifeStage}
          onChange={(e) => setLifeStage(e.target.value as LifeStage)}
          options={[
            { value: "puppy", label: "幼年期" },
            { value: "adult", label: "成年期" },
            { value: "senior", label: "老年期" },
          ]}
        />
        <Select
          label="活動量"
          value={activity}
          onChange={(e) => setActivity(e.target.value as ActivityLevel)}
          options={[
            { value: "low", label: "低（室內為主）" },
            { value: "moderate", label: "中（每天散步）" },
            { value: "high", label: "高（戶外活潑）" },
          ]}
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-ink-900 mb-2">
          是否已絕育
        </label>
        <div className="inline-flex rounded-[12px] bg-cream-200 p-1">
          <button
            type="button"
            onClick={() => setNeutered(true)}
            className={`px-5 py-2 rounded-[10px] text-sm font-semibold transition-all ${
              neutered
                ? "bg-white text-brand-600 shadow-sm"
                : "text-ink-500"
            }`}
          >
            已絕育
          </button>
          <button
            type="button"
            onClick={() => setNeutered(false)}
            className={`px-5 py-2 rounded-[10px] text-sm font-semibold transition-all ${
              !neutered
                ? "bg-white text-brand-600 shadow-sm"
                : "text-ink-500"
            }`}
          >
            未絕育
          </button>
        </div>
      </div>

      <Input
        label="飼料熱量密度"
        type="number"
        step="0.1"
        min="1"
        max="6"
        value={foodKcal}
        onChange={(e) => setFoodKcal(e.target.value)}
        suffix="kcal/g"
        hint="一般乾糧約 3.5-4.2 kcal/g，請參考飼料包裝標示"
      />

      <ResultCard title="每日建議" accentColor="accent">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <div className="text-xs font-bold text-ink-500 uppercase mb-1">
              每日總熱量
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-extrabold text-accent-700">
                {dailyCalories}
              </span>
              <span className="text-sm text-ink-700">kcal</span>
            </div>
          </div>
          <div>
            <div className="text-xs font-bold text-ink-500 uppercase mb-1">
              每日乾糧
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-extrabold text-accent-700">
                {dailyGrams}
              </span>
              <span className="text-sm text-ink-700">公克</span>
            </div>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-white/60">
          <div className="text-sm text-ink-700">
            建議分 2 餐，每餐約{" "}
            <strong className="text-accent-700">{perMeal} 公克</strong>
          </div>
        </div>
      </ResultCard>
    </div>
  );
}
