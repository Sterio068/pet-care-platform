"use client";

import { useState, useSyncExternalStore } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

interface WeightRecord {
  id: string;
  date: string;
  weight: number;
}

const STORAGE_KEY = "pet-weight-records";
const UPDATE_EVENT = "pet-weight-records:updated";

// Cache the parsed result to ensure useSyncExternalStore gets a stable reference
let cachedRaw: string | null = null;
let cachedRecords: WeightRecord[] = [];

function readFromStorage(): WeightRecord[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw === cachedRaw) return cachedRecords;
    cachedRaw = raw;
    cachedRecords = raw ? JSON.parse(raw) : [];
    return cachedRecords;
  } catch {
    cachedRaw = null;
    cachedRecords = [];
    return cachedRecords;
  }
}

function writeToStorage(records: WeightRecord[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
  window.dispatchEvent(new Event(UPDATE_EVENT));
}

function subscribe(callback: () => void) {
  window.addEventListener(UPDATE_EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(UPDATE_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

const EMPTY: WeightRecord[] = [];
const getServerSnapshot = () => EMPTY;

export function WeightTracker() {
  const records = useSyncExternalStore(
    subscribe,
    readFromStorage,
    getServerSnapshot,
  );
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [weight, setWeight] = useState("");

  const sortedRecords = [...records].sort((a, b) => a.date.localeCompare(b.date));

  const handleAdd = () => {
    const w = parseFloat(weight);
    if (!date || !w || w <= 0) return;
    const newRecord: WeightRecord = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      date,
      weight: w,
    };
    writeToStorage([...records, newRecord]);
    setWeight("");
  };

  const handleDelete = (id: string) => {
    writeToStorage(records.filter((r) => r.id !== id));
  };

  const handleClearAll = () => {
    if (!confirm("確定要清除所有記錄嗎？此動作無法復原。")) return;
    writeToStorage([]);
  };

  // 統計
  const currentWeight = sortedRecords[sortedRecords.length - 1]?.weight;
  const firstWeight = sortedRecords[0]?.weight;
  const delta =
    currentWeight !== undefined && firstWeight !== undefined
      ? currentWeight - firstWeight
      : 0;
  const maxWeight = sortedRecords.length
    ? Math.max(...sortedRecords.map((r) => r.weight))
    : 0;
  const minWeight = sortedRecords.length
    ? Math.min(...sortedRecords.map((r) => r.weight))
    : 0;

  // 繪製簡單折線圖 SVG
  const chartWidth = 600;
  const chartHeight = 200;
  const padding = { top: 20, right: 20, bottom: 30, left: 40 };
  const innerW = chartWidth - padding.left - padding.right;
  const innerH = chartHeight - padding.top - padding.bottom;

  const yMin = minWeight > 0 ? Math.floor(minWeight - 1) : 0;
  const yMax = Math.ceil(maxWeight + 1);
  const yRange = yMax - yMin || 1;

  const points = sortedRecords.map((r, i) => {
    const x =
      padding.left +
      (sortedRecords.length <= 1
        ? innerW / 2
        : (i / (sortedRecords.length - 1)) * innerW);
    const y = padding.top + innerH - ((r.weight - yMin) / yRange) * innerH;
    return { x, y, record: r };
  });

  const pathD = points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`)
    .join(" ");

  return (
    <div className="space-y-6">
      {/* 新增記錄 */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <Input
          label="日期"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <Input
          label="體重"
          type="number"
          step="0.1"
          min="0"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          suffix="kg"
          placeholder="例如 5.2"
        />
        <div className="flex items-end">
          <Button onClick={handleAdd} className="w-full">
            新增記錄
          </Button>
        </div>
      </div>

      {records.length === 0 && (
        <div className="text-center py-12 text-ink-500">
          <p className="text-4xl mb-3" aria-hidden="true">📊</p>
          <p>還沒有記錄，新增第一筆體重開始追蹤吧！</p>
        </div>
      )}

      {records.length > 0 && (
        <>
          {/* 統計 */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="rounded-[14px] bg-cream-100 p-4">
              <div className="text-xs text-ink-500 mb-1">目前體重</div>
              <div className="text-2xl font-extrabold text-brand-600">
                {currentWeight} <span className="text-sm">kg</span>
              </div>
            </div>
            <div className="rounded-[14px] bg-cream-100 p-4">
              <div className="text-xs text-ink-500 mb-1">變化</div>
              <div
                className={`text-2xl font-extrabold ${delta > 0 ? "text-orange-600" : delta < 0 ? "text-accent-600" : "text-ink-700"}`}
              >
                {delta > 0 ? "+" : ""}
                {delta.toFixed(1)} <span className="text-sm">kg</span>
              </div>
            </div>
            <div className="rounded-[14px] bg-cream-100 p-4">
              <div className="text-xs text-ink-500 mb-1">最高</div>
              <div className="text-2xl font-extrabold text-ink-900">
                {maxWeight} <span className="text-sm">kg</span>
              </div>
            </div>
            <div className="rounded-[14px] bg-cream-100 p-4">
              <div className="text-xs text-ink-500 mb-1">最低</div>
              <div className="text-2xl font-extrabold text-ink-900">
                {minWeight} <span className="text-sm">kg</span>
              </div>
            </div>
          </div>

          {/* 折線圖 */}
          {sortedRecords.length >= 2 && (
            <div className="rounded-[14px] border border-cream-300 p-4 overflow-x-auto">
              <svg
                width={chartWidth}
                height={chartHeight}
                className="w-full h-auto"
              >
                <text
                  x={padding.left - 8}
                  y={padding.top + 4}
                  textAnchor="end"
                  fontSize="10"
                  fill="#8A7A6F"
                >
                  {yMax}
                </text>
                <text
                  x={padding.left - 8}
                  y={padding.top + innerH + 4}
                  textAnchor="end"
                  fontSize="10"
                  fill="#8A7A6F"
                >
                  {yMin}
                </text>
                <line
                  x1={padding.left}
                  y1={padding.top}
                  x2={padding.left}
                  y2={padding.top + innerH}
                  stroke="#FFE8CC"
                  strokeWidth="1"
                />
                <line
                  x1={padding.left}
                  y1={padding.top + innerH}
                  x2={padding.left + innerW}
                  y2={padding.top + innerH}
                  stroke="#FFE8CC"
                  strokeWidth="1"
                />
                <path
                  d={pathD}
                  fill="none"
                  stroke="#FF6B35"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                {points.map((p) => (
                  <g key={p.record.id}>
                    <circle
                      cx={p.x}
                      cy={p.y}
                      r="4"
                      fill="#FF6B35"
                      stroke="white"
                      strokeWidth="2"
                    />
                  </g>
                ))}
              </svg>
            </div>
          )}

          {/* 記錄列表 */}
          <div className="rounded-[14px] border border-cream-300 overflow-hidden">
            <div className="bg-cream-100 px-4 py-2 text-sm font-semibold text-ink-900 flex items-center justify-between">
              <span>全部記錄 ({records.length})</span>
              <button
                type="button"
                onClick={handleClearAll}
                className="text-xs text-red-600 hover:underline"
              >
                清除全部
              </button>
            </div>
            <ul className="divide-y divide-cream-200">
              {[...sortedRecords].reverse().map((r) => (
                <li
                  key={r.id}
                  className="px-4 py-2.5 flex items-center justify-between text-sm"
                >
                  <span className="text-ink-700">{r.date}</span>
                  <span className="font-semibold text-ink-900">{r.weight} kg</span>
                  <button
                    type="button"
                    onClick={() => handleDelete(r.id)}
                    className="text-xs text-ink-500 hover:text-red-600"
                  >
                    刪除
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}

      <p className="text-xs text-ink-500 border-l-4 border-ink-300 pl-3">
        記錄儲存在您的瀏覽器本機（localStorage），不會上傳到任何伺服器。換瀏覽器或清除瀏覽資料會遺失記錄。
      </p>
    </div>
  );
}
