"use client";

import { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { ResultCard } from "@/components/ui/ResultCard";

interface FoodEntry {
  id: number;
  name: string;
  price: string;
  weight: string;
  kcalPerGram: string;
}

const emptyEntry = (id: number): FoodEntry => ({ id, name: "", price: "", weight: "", kcalPerGram: "" });

export function FoodComparator() {
  const [foods, setFoods] = useState<FoodEntry[]>([emptyEntry(1), emptyEntry(2)]);
  const [showResult, setShowResult] = useState(false);

  const updateFood = (id: number, field: keyof FoodEntry, value: string) => {
    setFoods((prev) => prev.map((f) => (f.id === id ? { ...f, [field]: value } : f)));
    setShowResult(false);
  };

  const addFood = () => {
    if (foods.length >= 4) return;
    setFoods((prev) => [...prev, emptyEntry(Date.now())]);
  };

  const removeFood = (id: number) => {
    if (foods.length <= 2) return;
    setFoods((prev) => prev.filter((f) => f.id !== id));
  };

  const results = foods.map((f) => {
    const price = parseFloat(f.price) || 0;
    const weight = parseFloat(f.weight) || 0;
    const kcal = parseFloat(f.kcalPerGram) || 0;
    const pricePerKg = weight > 0 ? (price / weight) * 1000 : 0;
    const totalKcal = weight > 0 && kcal > 0 ? weight * kcal : 0;
    const pricePerKcal = totalKcal > 0 ? price / totalKcal : 0;
    const pricePerDay = kcal > 0 ? (500 / kcal) * (pricePerKg / 1000) : 0; // 假設 500kcal/天
    return { ...f, pricePerKg, pricePerKcal, pricePerDay, valid: price > 0 && weight > 0 && kcal > 0 };
  });

  const validResults = results.filter((r) => r.valid);
  const cheapest = validResults.length > 0 ? validResults.reduce((a, b) => (a.pricePerKcal < b.pricePerKcal ? a : b)) : null;

  return (
    <div className="space-y-6">
      {foods.map((food, idx) => (
        <div key={food.id} className="p-4 rounded-[14px] border border-cream-300 bg-cream-50 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold text-ink-900">飼料 {idx + 1}</span>
            {foods.length > 2 && (
              <button type="button" onClick={() => removeFood(food.id)} className="text-xs text-red-500 hover:underline">移除</button>
            )}
          </div>
          <Input label="品牌名稱" value={food.name} onChange={(e) => updateFood(food.id, "name", e.target.value)} placeholder="例如：皇家、希爾思" />
          <div className="grid grid-cols-3 gap-3">
            <Input label="價格" type="number" value={food.price} onChange={(e) => updateFood(food.id, "price", e.target.value)} suffix="元" placeholder="690" />
            <Input label="重量" type="number" value={food.weight} onChange={(e) => updateFood(food.id, "weight", e.target.value)} suffix="g" placeholder="2000" />
            <Input label="熱量密度" type="number" step="0.1" value={food.kcalPerGram} onChange={(e) => updateFood(food.id, "kcalPerGram", e.target.value)} suffix="kcal/g" placeholder="3.8" />
          </div>
        </div>
      ))}

      <div className="flex gap-3">
        {foods.length < 4 && <Button variant="ghost" size="sm" onClick={addFood}>+ 加入第 {foods.length + 1} 款</Button>}
        <Button variant="primary" onClick={() => setShowResult(true)} disabled={validResults.length < 2} className="flex-1">比較 ({validResults.length} 款)</Button>
      </div>

      {showResult && validResults.length >= 2 && (
        <ResultCard title="比較結果" accentColor="accent">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/30">
                  <th className="text-left py-2 text-ink-500">項目</th>
                  {validResults.map((r) => (
                    <th key={r.id} className="text-center py-2 text-ink-900 font-bold">
                      {r.name || `飼料`}
                      {cheapest?.id === r.id && <span className="block text-xs text-accent-600">⭐ 最划算</span>}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-white/20">
                  <td className="py-2 text-ink-500">每公斤價格</td>
                  {validResults.map((r) => (<td key={r.id} className="text-center py-2 font-medium">${Math.round(r.pricePerKg)}</td>))}
                </tr>
                <tr className="border-b border-white/20">
                  <td className="py-2 text-ink-500">每千卡成本</td>
                  {validResults.map((r) => (
                    <td key={r.id} className={`text-center py-2 font-bold ${cheapest?.id === r.id ? "text-accent-700" : ""}`}>
                      ${r.pricePerKcal.toFixed(2)}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="py-2 text-ink-500">每月估算 *</td>
                  {validResults.map((r) => (<td key={r.id} className="text-center py-2 font-medium">${Math.round(r.pricePerDay * 30)}</td>))}
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-ink-500 mt-3">* 以 10kg 成犬每日 500kcal 估算</p>
        </ResultCard>
      )}

      <p className="text-xs text-ink-500 border-l-4 border-ink-300 pl-3">
        熱量密度通常印在飼料包裝背面（kcal/g 或 kcal/kg）。若標示 kcal/kg 則除以 1000。
      </p>
    </div>
  );
}
