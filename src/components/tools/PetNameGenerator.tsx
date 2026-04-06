"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { getRandomNames, STYLE_LABELS, type PetNameEntry } from "@/data/pet-names";

type Gender = PetNameEntry["gender"];
type Style = PetNameEntry["style"];

const GENDERS: { value: Gender; label: string }[] = [
  { value: "neutral", label: "不限" },
  { value: "male", label: "男生" },
  { value: "female", label: "女生" },
];

const STYLES: { value: Style | "all"; label: string }[] = [
  { value: "all", label: "全部" },
  ...Object.entries(STYLE_LABELS).map(([value, label]) => ({
    value: value as Style,
    label,
  })),
];

export function PetNameGenerator() {
  const [gender, setGender] = useState<Gender>("neutral");
  const [style, setStyle] = useState<Style | "all">("all");
  const [names, setNames] = useState<PetNameEntry[]>(() => getRandomNames(6));
  const [favorites, setFavorites] = useState<string[]>([]);

  const generate = () => {
    const filters: { gender?: Gender; style?: Style } = {};
    if (gender !== "neutral") filters.gender = gender;
    if (style !== "all") filters.style = style;
    setNames(getRandomNames(6, filters));
  };

  const toggleFavorite = (name: string) => {
    setFavorites((prev) =>
      prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name],
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-semibold text-ink-900 mb-2">性別偏好</p>
        <div className="flex gap-2">
          {GENDERS.map((g) => (
            <button
              key={g.value}
              type="button"
              onClick={() => setGender(g.value)}
              className={`px-4 py-2 rounded-[10px] text-sm font-semibold transition-all ${
                gender === g.value
                  ? "bg-brand-500 text-white shadow-sm"
                  : "bg-white border border-cream-300 text-ink-700 hover:border-brand-300"
              }`}
            >
              {g.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="text-sm font-semibold text-ink-900 mb-2">風格</p>
        <div className="flex flex-wrap gap-2">
          {STYLES.map((s) => (
            <button
              key={s.value}
              type="button"
              onClick={() => setStyle(s.value)}
              className={`px-4 py-2 rounded-[10px] text-sm font-semibold transition-all ${
                style === s.value
                  ? "bg-brand-500 text-white shadow-sm"
                  : "bg-white border border-cream-300 text-ink-700 hover:border-brand-300"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      <Button onClick={generate} className="w-full" size="lg">
        🎲 隨機產生 6 個名字
      </Button>

      {names.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {names.map((n) => (
            <button
              key={n.name}
              type="button"
              onClick={() => toggleFavorite(n.name)}
              className={`relative rounded-[14px] p-4 text-center transition-all ${
                favorites.includes(n.name)
                  ? "bg-brand-100 border-2 border-brand-400"
                  : "bg-white border border-cream-300 hover:border-brand-300"
              }`}
            >
              <div className="text-xl font-bold text-ink-900 mb-1">
                {n.name}
              </div>
              <div className="text-xs text-ink-500">
                {STYLE_LABELS[n.style]}
              </div>
              {favorites.includes(n.name) && (
                <span className="absolute top-2 right-2 text-brand-500 text-sm">
                  ♥
                </span>
              )}
            </button>
          ))}
        </div>
      )}

      {favorites.length > 0 && (
        <div className="p-4 rounded-[14px] bg-brand-50 border border-brand-200">
          <div className="text-sm font-semibold text-ink-900 mb-2">
            ♥ 你喜歡的名字 ({favorites.length})
          </div>
          <div className="flex flex-wrap gap-2">
            {favorites.map((f) => (
              <span
                key={f}
                className="px-3 py-1 rounded-full bg-white text-brand-700 text-sm font-semibold shadow-sm"
              >
                {f}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
