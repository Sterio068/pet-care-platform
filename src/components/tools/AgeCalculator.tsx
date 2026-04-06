"use client";

import { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { PetTypeToggle } from "@/components/ui/PetTypeToggle";
import { ResultCard } from "@/components/ui/ResultCard";
import { petAgeInHumanYears } from "@/lib/calculations";
import type { PetType, DogSize } from "@/types";

export function AgeCalculator() {
  const [petType, setPetType] = useState<PetType>("dog");
  const [years, setYears] = useState<string>("3");
  const [months, setMonths] = useState<string>("0");
  const [dogSize, setDogSize] = useState<DogSize>("medium");

  const y = parseInt(years, 10) || 0;
  const m = parseInt(months, 10) || 0;
  const humanAge = petAgeInHumanYears(petType, y, m, dogSize);

  const lifeStage =
    y < 1
      ? "幼年期"
      : petType === "dog"
        ? y < 7
          ? "成年期"
          : "老年期"
        : y < 10
          ? "成年期"
          : "老年期";

  return (
    <div className="space-y-6">
      <div className="flex justify-center">
        <PetTypeToggle value={petType} onChange={setPetType} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Input
          label="年"
          type="number"
          value={years}
          min="0"
          max="30"
          onChange={(e) => setYears(e.target.value)}
          suffix="歲"
        />
        <Input
          label="月"
          type="number"
          value={months}
          min="0"
          max="11"
          onChange={(e) => setMonths(e.target.value)}
          suffix="月"
        />
      </div>

      {petType === "dog" && (
        <Select
          label="體型"
          value={dogSize}
          onChange={(e) => setDogSize(e.target.value as DogSize)}
          options={[
            { value: "small", label: "小型犬（< 10 公斤）" },
            { value: "medium", label: "中型犬（10-25 公斤）" },
            { value: "large", label: "大型犬（> 25 公斤）" },
          ]}
          hint="不同體型狗狗老化速度不同"
        />
      )}

      <ResultCard title="換算結果">
        <div className="flex items-baseline gap-3">
          <span className="text-5xl font-extrabold text-brand-600">
            {humanAge}
          </span>
          <span className="text-lg text-ink-700">歲（人類年齡）</span>
        </div>
        <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 text-sm font-medium text-ink-700">
          目前處於：<strong className="text-brand-600">{lifeStage}</strong>
        </div>
      </ResultCard>
    </div>
  );
}
