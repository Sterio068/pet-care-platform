"use client";

import { useState, useMemo } from "react";
import { Select } from "@/components/ui/Select";
import { PetTypeToggle } from "@/components/ui/PetTypeToggle";
import { ResultCard } from "@/components/ui/ResultCard";
import type { PetType } from "@/types";

type Size = "small" | "medium" | "large";

// 月花費估算（台幣）
const MONTHLY_COST = {
  dog: {
    food: { small: 1200, medium: 2500, large: 4500 },
    snack: { small: 300, medium: 500, large: 800 },
    supply: 500, // 貓砂/狗便袋
    grooming: { small: 800, medium: 1500, large: 2500 },
  },
  cat: {
    food: { small: 800, medium: 1200, large: 1800 },
    snack: { small: 200, medium: 400, large: 600 },
    supply: 600,
    grooming: { small: 300, medium: 500, large: 800 },
  },
};

// 年度花費（台幣）
const YEARLY_COST = {
  dog: {
    vaccine: 2000,
    deworm: 2400, // 每月預防藥 200
    checkup: 1500,
    insurance: 6000,
  },
  cat: {
    vaccine: 1500,
    deworm: 1800,
    checkup: 1500,
    insurance: 5000,
  },
};

// 一次性花費
const ONETIME_COST = {
  dog: {
    basic: 8000, // 牽繩、碗、窩、玩具、外出包
    neuter: { small: 4000, medium: 6000, large: 8000 },
  },
  cat: {
    basic: 10000, // 砂盆、跳台、抓板、碗、窩
    neuter: { small: 3000, medium: 3500, large: 4000 },
  },
};

export function CostCalculator() {
  const [petType, setPetType] = useState<PetType>("dog");
  const [size, setSize] = useState<Size>("medium");
  const [includeInsurance, setIncludeInsurance] = useState(false);
  const [includeGrooming, setIncludeGrooming] = useState(true);

  const result = useMemo(() => {
    const m = MONTHLY_COST[petType];
    const y = YEARLY_COST[petType];
    const o = ONETIME_COST[petType];

    const monthlyFood = m.food[size];
    const monthlySnack = m.snack[size];
    const monthlySupply = m.supply;
    const monthlyGrooming = includeGrooming ? m.grooming[size] : 0;

    const monthly = monthlyFood + monthlySnack + monthlySupply + monthlyGrooming;

    const yearlyVaccine = y.vaccine;
    const yearlyDeworm = y.deworm;
    const yearlyCheckup = y.checkup;
    const yearlyInsurance = includeInsurance ? y.insurance : 0;

    const yearlyRoutine = yearlyVaccine + yearlyDeworm + yearlyCheckup + yearlyInsurance;

    const firstYear = monthly * 12 + yearlyRoutine + o.basic + o.neuter[size];
    const ongoingYear = monthly * 12 + yearlyRoutine;
    const tenYear = firstYear + ongoingYear * 9;

    return {
      monthly,
      monthlyBreakdown: {
        food: monthlyFood,
        snack: monthlySnack,
        supply: monthlySupply,
        grooming: monthlyGrooming,
      },
      yearlyRoutine,
      yearlyBreakdown: {
        vaccine: yearlyVaccine,
        deworm: yearlyDeworm,
        checkup: yearlyCheckup,
        insurance: yearlyInsurance,
      },
      onetime: o.basic + o.neuter[size],
      onetimeBreakdown: {
        basic: o.basic,
        neuter: o.neuter[size],
      },
      firstYear,
      ongoingYear,
      tenYear,
    };
  }, [petType, size, includeInsurance, includeGrooming]);

  const sizeOptions: { value: Size; label: string }[] =
    petType === "dog"
      ? [
          { value: "small", label: "小型犬（< 10 kg）" },
          { value: "medium", label: "中型犬（10-25 kg）" },
          { value: "large", label: "大型犬（> 25 kg）" },
        ]
      : [
          { value: "small", label: "小型貓（< 4 kg）" },
          { value: "medium", label: "中型貓（4-6 kg）" },
          { value: "large", label: "大型貓（> 6 kg）" },
        ];

  const formatMoney = (n: number) => `NT$ ${n.toLocaleString()}`;

  return (
    <div className="space-y-6">
      <div className="flex justify-center">
        <PetTypeToggle value={petType} onChange={setPetType} />
      </div>

      <Select
        label="體型"
        value={size}
        onChange={(e) => setSize(e.target.value as Size)}
        options={sizeOptions}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <label className="flex items-center gap-3 px-4 py-3 rounded-[12px] border border-cream-300 bg-cream-50 cursor-pointer hover:border-brand-300 transition-colors">
          <input
            type="checkbox"
            checked={includeGrooming}
            onChange={(e) => setIncludeGrooming(e.target.checked)}
            className="w-5 h-5 accent-brand-500"
          />
          <div className="flex-1">
            <div className="font-semibold text-sm text-ink-900">專業美容</div>
            <div className="text-xs text-ink-500">每月洗澡剪毛</div>
          </div>
        </label>
        <label className="flex items-center gap-3 px-4 py-3 rounded-[12px] border border-cream-300 bg-cream-50 cursor-pointer hover:border-brand-300 transition-colors">
          <input
            type="checkbox"
            checked={includeInsurance}
            onChange={(e) => setIncludeInsurance(e.target.checked)}
            className="w-5 h-5 accent-brand-500"
          />
          <div className="flex-1">
            <div className="font-semibold text-sm text-ink-900">寵物保險</div>
            <div className="text-xs text-ink-500">年繳醫療保險</div>
          </div>
        </label>
      </div>

      <ResultCard title="花費估算" accentColor="accent">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
          <div>
            <div className="text-xs text-ink-500 mb-1">每月固定</div>
            <div className="text-2xl font-extrabold text-accent-700">
              {formatMoney(result.monthly)}
            </div>
          </div>
          <div>
            <div className="text-xs text-ink-500 mb-1">第一年</div>
            <div className="text-2xl font-extrabold text-accent-700">
              {formatMoney(result.firstYear)}
            </div>
          </div>
          <div>
            <div className="text-xs text-ink-500 mb-1">10 年總計</div>
            <div className="text-2xl font-extrabold text-brand-600">
              {formatMoney(result.tenYear)}
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-white/60 space-y-3">
          <div>
            <div className="text-xs font-semibold text-ink-700 mb-2 uppercase">月固定花費明細</div>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between"><span className="text-ink-500">飼料</span><span className="text-ink-900 font-medium">{formatMoney(result.monthlyBreakdown.food)}</span></div>
              <div className="flex justify-between"><span className="text-ink-500">零食</span><span className="text-ink-900 font-medium">{formatMoney(result.monthlyBreakdown.snack)}</span></div>
              <div className="flex justify-between"><span className="text-ink-500">日用品</span><span className="text-ink-900 font-medium">{formatMoney(result.monthlyBreakdown.supply)}</span></div>
              {includeGrooming && (
                <div className="flex justify-between"><span className="text-ink-500">美容</span><span className="text-ink-900 font-medium">{formatMoney(result.monthlyBreakdown.grooming)}</span></div>
              )}
            </div>
          </div>
          <div>
            <div className="text-xs font-semibold text-ink-700 mb-2 uppercase">年度例行花費</div>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between"><span className="text-ink-500">疫苗</span><span className="text-ink-900 font-medium">{formatMoney(result.yearlyBreakdown.vaccine)}</span></div>
              <div className="flex justify-between"><span className="text-ink-500">驅蟲預防藥</span><span className="text-ink-900 font-medium">{formatMoney(result.yearlyBreakdown.deworm)}</span></div>
              <div className="flex justify-between"><span className="text-ink-500">年度健檢</span><span className="text-ink-900 font-medium">{formatMoney(result.yearlyBreakdown.checkup)}</span></div>
              {includeInsurance && (
                <div className="flex justify-between"><span className="text-ink-500">寵物保險</span><span className="text-ink-900 font-medium">{formatMoney(result.yearlyBreakdown.insurance)}</span></div>
              )}
            </div>
          </div>
          <div>
            <div className="text-xs font-semibold text-ink-700 mb-2 uppercase">第一年一次性</div>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between"><span className="text-ink-500">基本用品</span><span className="text-ink-900 font-medium">{formatMoney(result.onetimeBreakdown.basic)}</span></div>
              <div className="flex justify-between"><span className="text-ink-500">結紮手術</span><span className="text-ink-900 font-medium">{formatMoney(result.onetimeBreakdown.neuter)}</span></div>
            </div>
          </div>
        </div>
      </ResultCard>

      <p className="text-xs text-ink-500 border-l-4 border-ink-300 pl-3">
        本估算為台灣市場平均參考值，不含突發醫療支出、高端品牌飼料、寄宿旅行費等。實際花費因個別需求、品牌選擇而異。
      </p>
    </div>
  );
}
