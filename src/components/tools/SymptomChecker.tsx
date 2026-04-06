"use client";

import { useState, useMemo } from "react";
import { PetTypeToggle } from "@/components/ui/PetTypeToggle";
import { Tag } from "@/components/ui/Tag";
import { ResultCard } from "@/components/ui/ResultCard";
import { Button } from "@/components/ui/Button";
import { analyzeSymptoms, getAvailableSymptoms } from "@/data/symptoms";
import type { PetType } from "@/types";

export function SymptomChecker() {
  const [petType, setPetType] = useState<PetType>("dog");
  const [selected, setSelected] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);

  const available = useMemo(() => getAvailableSymptoms(petType), [petType]);
  const result = useMemo(
    () => (showResult ? analyzeSymptoms(petType, selected) : null),
    [showResult, petType, selected],
  );

  const toggle = (id: string) => {
    setShowResult(false);
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  const handleSwitchPet = (type: PetType) => {
    setPetType(type);
    setSelected([]);
    setShowResult(false);
  };

  const handleAnalyze = () => {
    if (selected.length > 0) setShowResult(true);
  };

  const reset = () => {
    setSelected([]);
    setShowResult(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-center">
        <PetTypeToggle value={petType} onChange={handleSwitchPet} />
      </div>

      <div>
        <p className="text-sm font-semibold text-ink-900 mb-3">
          請選擇毛孩目前的症狀（可複選）
        </p>
        <div className="flex flex-wrap gap-2">
          {available.map((s) => (
            <Tag
              key={s.id}
              label={s.label}
              selected={selected.includes(s.id)}
              onClick={() => toggle(s.id)}
            />
          ))}
        </div>
      </div>

      <div className="flex gap-3">
        <Button
          variant="primary"
          onClick={handleAnalyze}
          disabled={selected.length === 0}
          className="flex-1"
        >
          分析症狀（已選 {selected.length} 項）
        </Button>
        {selected.length > 0 && (
          <Button variant="ghost" onClick={reset}>
            重置
          </Button>
        )}
      </div>

      {result && (
        <ResultCard
          title="初步分析結果"
          accentColor={
            result.urgencyLevel === "緊急" || result.urgencyLevel === "高"
              ? "warning"
              : "accent"
          }
        >
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-sm text-ink-700">整體緊急程度：</span>
              <span
                className={`px-3 py-1 rounded-full text-sm font-bold ${result.urgencyColor}`}
              >
                {result.urgencyLevel}
              </span>
            </div>
          </div>

          <div className="mb-4">
            <h4 className="text-sm font-bold text-ink-900 mb-2">可能原因</h4>
            <ul className="space-y-2">
              {result.causes.map((c, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 p-3 rounded-[12px] bg-white/70"
                >
                  <span className="text-brand-500 mt-0.5">•</span>
                  <div>
                    <div className="font-semibold text-sm text-ink-900">
                      {c.name}
                    </div>
                    <div className="text-xs text-ink-500 mt-0.5">
                      {c.description}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold text-ink-900 mb-2">建議行動</h4>
            <ul className="space-y-1.5">
              {result.advice.map((a, i) => (
                <li
                  key={i}
                  className="text-sm text-ink-700 flex items-start gap-2"
                >
                  <span className="text-brand-500">✓</span>
                  <span>{a}</span>
                </li>
              ))}
            </ul>
          </div>
        </ResultCard>
      )}

      <p className="text-xs text-ink-500 border-l-4 border-ink-300 pl-3 italic">
        本工具僅供參考，不能取代專業獸醫診斷。出現嚴重症狀請立即就醫。
      </p>
    </div>
  );
}
