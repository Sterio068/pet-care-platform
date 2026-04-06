"use client";

import { useState, useMemo } from "react";
import { PetTypeToggle } from "@/components/ui/PetTypeToggle";
import { Input } from "@/components/ui/Input";
import { ResultCard } from "@/components/ui/ResultCard";
import { getVaccineSchedule } from "@/data/vaccines";
import type { PetType } from "@/types";

function addWeeks(date: Date, weeks: number): Date {
  const d = new Date(date);
  d.setDate(d.getDate() + weeks * 7);
  return d;
}

function formatDate(d: Date): string {
  return `${d.getFullYear()}/${String(d.getMonth() + 1).padStart(2, "0")}/${String(d.getDate()).padStart(2, "0")}`;
}

function isPast(d: Date): boolean {
  return d < new Date();
}

export function VaccineReminder() {
  const [petType, setPetType] = useState<PetType>("dog");
  const [birthDate, setBirthDate] = useState("");

  const schedule = useMemo(() => {
    if (!birthDate) return null;
    const birth = new Date(birthDate);
    if (isNaN(birth.getTime())) return null;
    const vaccines = getVaccineSchedule(petType);
    return vaccines.map((v) => {
      const dueDate = addWeeks(birth, v.weekAge);
      return { ...v, dueDate, past: isPast(dueDate) };
    });
  }, [petType, birthDate]);

  const nextVaccine = schedule?.find((v) => !v.past);

  return (
    <div className="space-y-6">
      <div className="flex justify-center">
        <PetTypeToggle value={petType} onChange={setPetType} />
      </div>

      <Input
        label="毛孩出生日期"
        type="date"
        value={birthDate}
        onChange={(e) => setBirthDate(e.target.value)}
        hint="不確定出生日期的話，填接回家的日期也可以"
      />

      {schedule && (
        <>
          {nextVaccine && (
            <ResultCard title="下次疫苗" accentColor="brand">
              <div className="text-2xl font-extrabold text-brand-600 mb-1">
                {formatDate(nextVaccine.dueDate)}
              </div>
              <div className="text-sm text-ink-700 mb-2">
                {nextVaccine.label}
              </div>
              <div className="flex flex-wrap gap-2">
                {nextVaccine.vaccines.map((v, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-[8px] bg-white border border-cream-300 text-sm text-ink-700"
                  >
                    {v}
                  </span>
                ))}
              </div>
            </ResultCard>
          )}

          <div className="space-y-3">
            <h3 className="text-sm font-bold text-ink-900 uppercase">
              完整時程
            </h3>
            {schedule.map((v, idx) => (
              <div
                key={idx}
                className={`flex items-start gap-4 p-4 rounded-[14px] border ${
                  v.past
                    ? "bg-cream-100 border-cream-200 opacity-60"
                    : nextVaccine === v
                      ? "bg-brand-50 border-brand-300"
                      : "bg-white border-cream-300"
                }`}
              >
                <div className="shrink-0 w-5 h-5 mt-0.5 rounded-full border-2 flex items-center justify-center border-brand-400">
                  {v.past && (
                    <div className="w-2.5 h-2.5 rounded-full bg-brand-500" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-sm text-ink-900">
                      {v.label}
                    </span>
                    {v.required ? (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-brand-100 text-brand-700 font-semibold">
                        必要
                      </span>
                    ) : (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-cream-200 text-ink-500 font-semibold">
                        選擇性
                      </span>
                    )}
                    {v.past && (
                      <span className="text-xs text-ink-500">已過</span>
                    )}
                  </div>
                  <div className="text-sm text-ink-700">
                    預定日期：
                    <strong
                      className={
                        v.past ? "text-ink-500" : "text-brand-600"
                      }
                    >
                      {formatDate(v.dueDate)}
                    </strong>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {v.vaccines.map((name, i) => (
                      <span
                        key={i}
                        className="text-xs px-2 py-0.5 rounded bg-white border border-cream-300 text-ink-700"
                      >
                        {name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
