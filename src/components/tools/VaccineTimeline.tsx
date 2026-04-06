"use client";

import { useState } from "react";
import { PetTypeToggle } from "@/components/ui/PetTypeToggle";
import { getVaccineSchedule } from "@/data/vaccines";
import type { PetType } from "@/types";

export function VaccineTimeline() {
  const [petType, setPetType] = useState<PetType>("dog");
  const schedule = getVaccineSchedule(petType);

  return (
    <div className="space-y-6">
      <div className="flex justify-center">
        <PetTypeToggle value={petType} onChange={setPetType} />
      </div>

      <ol className="relative border-l-2 border-brand-200 ml-4 space-y-6">
        {schedule.map((entry, idx) => (
          <li key={idx} className="pl-6 relative">
            <div className="absolute -left-[11px] top-1 flex items-center justify-center w-5 h-5 rounded-full bg-brand-500 border-4 border-cream-50" />
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className="text-sm font-bold text-brand-600">
                {entry.label}
              </span>
              {entry.required ? (
                <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-brand-100 text-brand-700">
                  必要
                </span>
              ) : (
                <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-cream-200 text-ink-500">
                  選擇性
                </span>
              )}
            </div>
            <div className="flex flex-wrap gap-2 mb-2">
              {entry.vaccines.map((v, i) => (
                <span
                  key={i}
                  className="inline-block px-3 py-1 rounded-[8px] bg-white border border-cream-300 text-sm text-ink-700"
                >
                  {v}
                </span>
              ))}
            </div>
            {entry.note && (
              <p className="text-xs text-ink-500 leading-relaxed">{entry.note}</p>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}
