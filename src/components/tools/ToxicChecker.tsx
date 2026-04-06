"use client";

import { useState } from "react";
import { PetTypeToggle } from "@/components/ui/PetTypeToggle";
import { searchToxicItems, LEVEL_CONFIG, TOXIC_ITEMS, type ToxicItem } from "@/data/toxic-foods";
import type { PetType } from "@/types";

export function ToxicChecker() {
  const [petType, setPetType] = useState<PetType>("dog");
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<ToxicItem[] | null>(null);

  const handleSearch = () => {
    if (!query.trim()) return;
    setResults(searchToxicItems(query, petType));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSearch();
  };

  // 常見快速查詢按鈕
  const quickSearches = ["葡萄", "巧克力", "洋蔥", "牛奶", "蘋果", "雞肉", "百合花", "骨頭"];

  return (
    <div className="space-y-6">
      <div className="flex justify-center">
        <PetTypeToggle value={petType} onChange={(t) => { setPetType(t); setResults(null); setQuery(""); }} />
      </div>

      <div>
        <div className="flex gap-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={`輸入食物或植物名稱，例如「葡萄」「巧克力」「百合」`}
            className="flex-1 rounded-[12px] border border-cream-300 bg-cream-50 px-4 py-3 text-base text-ink-900 placeholder:text-ink-300 focus:border-brand-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-200 transition-all"
          />
          <button
            type="button"
            onClick={handleSearch}
            className="px-5 py-3 rounded-[12px] bg-brand-500 text-white font-semibold hover:bg-brand-600 transition-colors shrink-0"
          >
            查詢
          </button>
        </div>
        <div className="flex flex-wrap gap-2 mt-3">
          {quickSearches.map((q) => (
            <button
              key={q}
              type="button"
              onClick={() => { setQuery(q); setResults(searchToxicItems(q, petType)); }}
              className="px-3 py-1 rounded-full text-xs font-medium bg-white border border-cream-300 text-ink-700 hover:border-brand-300 hover:text-brand-600 transition-colors"
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      {results !== null && results.length === 0 && (
        <div className="text-center py-8 text-ink-500">
          <p className="text-4xl mb-3">🔍</p>
          <p>找不到「{query}」的資料</p>
          <p className="text-xs mt-1">試試其他關鍵字，或瀏覽下方常見食物清單</p>
        </div>
      )}

      {results && results.length > 0 && (
        <div className="space-y-4">
          {results.map((item, i) => {
            const cfg = LEVEL_CONFIG[item.level];
            return (
              <div key={i} className={`border-2 rounded-[16px] p-5 ${cfg.bg}`}>
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-2xl">{cfg.emoji}</span>
                      <h3 className="text-xl font-bold text-ink-900">{item.name}</h3>
                    </div>
                    <span className={`inline-block px-3 py-0.5 rounded-full text-sm font-bold ${cfg.color} bg-white/60`}>
                      {cfg.label}
                    </span>
                  </div>
                  <div className="flex gap-1">
                    {item.petTypes.includes("dog") && <span className="text-lg">🐶</span>}
                    {item.petTypes.includes("cat") && <span className="text-lg">🐱</span>}
                  </div>
                </div>
                <p className="text-sm text-ink-700 leading-relaxed mb-3">{item.detail}</p>
                {item.symptom && (
                  <div className="mb-3">
                    <div className="text-xs font-bold text-ink-900 mb-1">中毒症狀</div>
                    <p className="text-sm text-ink-700">{item.symptom}</p>
                  </div>
                )}
                {item.firstAid && (
                  <div className="p-3 rounded-[10px] bg-white/50">
                    <div className="text-xs font-bold text-ink-900 mb-1">處置方式</div>
                    <p className="text-sm text-ink-700 font-medium">{item.firstAid}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {!results && (
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-ink-900 uppercase">常見危險食物一覽</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {TOXIC_ITEMS.filter((t) => t.level === "deadly" || t.level === "dangerous").filter((t) => t.petTypes.includes(petType)).map((item) => {
              const cfg = LEVEL_CONFIG[item.level];
              return (
                <button
                  key={item.name}
                  type="button"
                  onClick={() => { setQuery(item.name); setResults(searchToxicItems(item.name, petType)); }}
                  className={`p-3 rounded-[12px] border text-left hover:shadow-md transition-shadow ${cfg.bg}`}
                >
                  <div className="text-lg mb-1">{cfg.emoji}</div>
                  <div className="font-semibold text-sm text-ink-900">{item.name}</div>
                  <div className={`text-xs ${cfg.color}`}>{cfg.label}</div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
