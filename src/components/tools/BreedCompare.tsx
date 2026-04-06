"use client";

import { useState } from "react";
import { RatingBar } from "@/components/ui/RatingBar";
import { Button } from "@/components/ui/Button";
import { getAllBreeds } from "@/data/breeds";
import Link from "next/link";
import type { BreedProfile } from "@/types";

const allBreeds = getAllBreeds();

export function BreedCompare() {
  const [selected, setSelected] = useState<string[]>([]);

  const breeds = selected
    .map((slug) => allBreeds.find((b) => b.slug === slug))
    .filter(Boolean) as BreedProfile[];

  const toggleBreed = (slug: string) => {
    setSelected((prev) =>
      prev.includes(slug)
        ? prev.filter((s) => s !== slug)
        : prev.length < 3
          ? [...prev, slug]
          : prev,
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-semibold text-ink-900 mb-3">
          選擇 2-3 個品種比較（已選 {selected.length}/3）
        </p>
        <div className="flex flex-wrap gap-2">
          {allBreeds.map((b) => (
            <button
              key={b.slug}
              type="button"
              onClick={() => toggleBreed(b.slug)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                selected.includes(b.slug)
                  ? "bg-brand-500 text-white shadow-sm"
                  : "bg-white text-ink-700 border border-cream-300 hover:border-brand-300"
              } ${!selected.includes(b.slug) && selected.length >= 3 ? "opacity-40 cursor-not-allowed" : ""}`}
              disabled={!selected.includes(b.slug) && selected.length >= 3}
            >
              {b.petType === "dog" ? "🐶" : "🐱"} {b.name}
            </button>
          ))}
        </div>
      </div>

      {selected.length > 0 && (
        <Button variant="ghost" size="sm" onClick={() => setSelected([])}>
          清除選擇
        </Button>
      )}

      {breeds.length >= 2 && (
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-cream-200">
                <th className="text-left p-3 font-bold text-ink-900 sticky left-0 bg-cream-200 min-w-[100px]">
                  項目
                </th>
                {breeds.map((b) => (
                  <th
                    key={b.slug}
                    className="text-center p-3 font-bold text-ink-900 min-w-[160px]"
                  >
                    <Link
                      href={`/breeds/${b.slug}`}
                      className="text-brand-600 hover:underline"
                    >
                      {b.name}
                    </Link>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-cream-200">
                <td className="p-3 text-ink-500 sticky left-0 bg-white">英文名</td>
                {breeds.map((b) => (
                  <td key={b.slug} className="p-3 text-center text-ink-700">
                    {b.nameEn}
                  </td>
                ))}
              </tr>
              <tr className="border-b border-cream-200 bg-cream-50">
                <td className="p-3 text-ink-500 sticky left-0 bg-cream-50">體型</td>
                {breeds.map((b) => (
                  <td key={b.slug} className="p-3 text-center font-semibold text-ink-900">
                    {b.sizeLabel}
                  </td>
                ))}
              </tr>
              <tr className="border-b border-cream-200">
                <td className="p-3 text-ink-500 sticky left-0 bg-white">體重</td>
                {breeds.map((b) => (
                  <td key={b.slug} className="p-3 text-center text-ink-700">
                    {b.weightRange}
                  </td>
                ))}
              </tr>
              <tr className="border-b border-cream-200 bg-cream-50">
                <td className="p-3 text-ink-500 sticky left-0 bg-cream-50">壽命</td>
                {breeds.map((b) => (
                  <td key={b.slug} className="p-3 text-center text-ink-700">
                    {b.lifeSpan}
                  </td>
                ))}
              </tr>
              <tr className="border-b border-cream-200">
                <td className="p-3 text-ink-500 sticky left-0 bg-white">被毛</td>
                {breeds.map((b) => (
                  <td key={b.slug} className="p-3 text-center text-ink-700">
                    {b.coatLabel}
                  </td>
                ))}
              </tr>
              {(
                [
                  ["活動量", "energyLevel"],
                  ["親人度", "friendliness"],
                  ["訓練難易", "trainability"],
                  ["掉毛量", "shedding"],
                ] as const
              ).map(([label, key]) => (
                <tr
                  key={key}
                  className={`border-b border-cream-200 ${key === "friendliness" || key === "shedding" ? "bg-cream-50" : ""}`}
                >
                  <td className={`p-3 text-ink-500 sticky left-0 ${key === "friendliness" || key === "shedding" ? "bg-cream-50" : "bg-white"}`}>
                    {label}
                  </td>
                  {breeds.map((b) => (
                    <td key={b.slug} className="p-3">
                      <RatingBar label="" value={b[key]} />
                    </td>
                  ))}
                </tr>
              ))}
              <tr className="border-b border-cream-200">
                <td className="p-3 text-ink-500 sticky left-0 bg-white">個性</td>
                {breeds.map((b) => (
                  <td key={b.slug} className="p-3 text-center">
                    <div className="flex flex-wrap gap-1 justify-center">
                      {b.personality.slice(0, 3).map((p, i) => (
                        <span
                          key={i}
                          className="text-xs px-2 py-0.5 rounded-full bg-brand-50 text-brand-700"
                        >
                          {p}
                        </span>
                      ))}
                    </div>
                  </td>
                ))}
              </tr>
              <tr className="border-b border-cream-200 bg-cream-50">
                <td className="p-3 text-ink-500 sticky left-0 bg-cream-50">常見疾病</td>
                {breeds.map((b) => (
                  <td key={b.slug} className="p-3 text-xs text-ink-700">
                    <ul className="space-y-1">
                      {b.commonDiseases.slice(0, 3).map((d, i) => (
                        <li key={i}>• {d}</li>
                      ))}
                    </ul>
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-3 text-ink-500 sticky left-0 bg-white">適合</td>
                {breeds.map((b) => (
                  <td key={b.slug} className="p-3 text-center">
                    <div className="flex flex-wrap gap-1 justify-center">
                      {b.suitableFor.slice(0, 2).map((s, i) => (
                        <span
                          key={i}
                          className="text-xs px-2 py-0.5 rounded-full bg-accent-50 text-accent-700"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {breeds.length < 2 && selected.length > 0 && (
        <p className="text-sm text-ink-500 text-center py-6">
          再選 {2 - selected.length} 個品種即可開始比較
        </p>
      )}
    </div>
  );
}
