"use client";

import { useState } from "react";
import { Tag } from "@/components/ui/Tag";
import { ResultCard } from "@/components/ui/ResultCard";
import { Button } from "@/components/ui/Button";

const SYMPTOMS = [
  { id: "vomit", label: "嘔吐" }, { id: "diarrhea", label: "腹瀉" },
  { id: "no_eat", label: "不吃東西" }, { id: "lethargy", label: "精神差" },
  { id: "limp", label: "跛腳" }, { id: "skin", label: "皮膚問題" },
  { id: "eye", label: "眼睛異常" }, { id: "ear", label: "耳朵問題" },
  { id: "cough", label: "咳嗽" }, { id: "pee", label: "排尿異常" },
  { id: "checkup", label: "例行健檢" }, { id: "vaccine", label: "打疫苗" },
];

const CHECKLIST_MAP: Record<string, { bring: string[]; photos: string[]; questions: string[] }> = {
  vomit: {
    bring: ["嘔吐物樣本（用夾鏈袋裝）", "嘔吐物照片", "近 2 天的食物內容"],
    photos: ["嘔吐物的顏色和內容物", "嘔吐時的姿勢（如有影片更好）"],
    questions: ["嘔吐頻率？什麼時候開始？", "嘔吐物顏色？有血嗎？", "最近有換食物嗎？", "有可能誤食異物嗎？"],
  },
  diarrhea: {
    bring: ["新鮮糞便樣本（2 小時內）", "糞便照片"],
    photos: ["糞便的顏色、形狀、是否有血或黏液"],
    questions: ["腹瀉幾天了？每天幾次？", "便便顏色和形狀？", "最近有換食物嗎？", "有吃到垃圾或不該吃的嗎？"],
  },
  no_eat: {
    bring: ["目前吃的飼料品牌名稱", "平時的食量記錄"],
    photos: ["看看有沒有口腔紅腫（張嘴照片）"],
    questions: ["完全不吃還是挑食？持續多久？", "喝水正常嗎？", "有嘔吐或腹瀉嗎？", "嘴巴有異味嗎？"],
  },
  lethargy: {
    bring: ["體溫記錄（如有寵物體溫計）", "最近的飲食與活動記錄"],
    photos: ["平時 vs 現在的活動力對比影片"],
    questions: ["什麼時候開始的？", "還有其他症狀嗎？（嘔吐、腹瀉、咳嗽）", "最近有打疫苗嗎？", "有出門或接觸其他動物嗎？"],
  },
  limp: {
    bring: ["無需特別帶東西"],
    photos: ["走路的影片（最重要！）", "疑似受傷部位的照片"],
    questions: ["什麼時候開始跛的？", "有從高處跳下嗎？", "哪隻腳？前還是後？", "觸摸時會痛嗎？"],
  },
  skin: {
    bring: ["皮膚問題部位照片", "目前使用的除蚤產品名稱"],
    photos: ["病灶部位的清晰照片", "全身掉毛分布照片"],
    questions: ["癢多久了？", "有局部禿斑嗎？", "有按時驅蟲嗎？", "最近換了什麼產品？"],
  },
  eye: {
    bring: ["眼睛照片（正面 + 側面）"],
    photos: ["眼睛分泌物顏色", "眼球是否混濁"],
    questions: ["什麼時候發現的？", "單眼還是雙眼？", "分泌物什麼顏色？", "有頻繁眨眼或揉眼嗎？"],
  },
  ear: {
    bring: ["耳朵照片"],
    photos: ["耳內分泌物顏色", "耳廓有無紅腫"],
    questions: ["有異味嗎？", "會甩頭嗎？多頻繁？", "分泌物顏色？", "之前有耳朵問題嗎？"],
  },
  cough: {
    bring: ["咳嗽影片（最重要！）"],
    photos: ["不需要照片，影片更重要"],
    questions: ["什麼時候咳？（清晨、運動後、喝水後）", "乾咳還是濕咳？", "咳多久了？", "有接觸其他狗嗎？（犬舍咳）"],
  },
  pee: {
    bring: ["尿液樣本（如可以收集）", "排尿影片"],
    photos: ["尿液顏色（用白色衛生紙吸）"],
    questions: ["尿量變多還是變少？", "排尿時有哀叫嗎？", "尿液顏色？有血嗎？", "喝水量有變化嗎？"],
  },
  checkup: {
    bring: ["疫苗本 / 上次健檢報告", "目前吃的飼料品牌", "驅蟲紀錄"],
    photos: ["不需要"],
    questions: ["建議做哪些檢查項目？", "需要驅蟲嗎？", "體重是否正常？", "飲食有需要調整嗎？"],
  },
  vaccine: {
    bring: ["疫苗本", "上次疫苗日期"],
    photos: ["不需要"],
    questions: ["該打哪些疫苗？", "有副作用需要注意嗎？", "打完後多久可以洗澡？", "需要留院觀察嗎？"],
  },
};

export function VetPrepChecklist() {
  const [selected, setSelected] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);

  const toggle = (id: string) => { setSelected((prev) => prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]); setShowResult(false); };
  const reset = () => { setSelected([]); setShowResult(false); };

  const mergedBring = [...new Set(selected.flatMap((s) => CHECKLIST_MAP[s]?.bring ?? []))];
  const mergedPhotos = [...new Set(selected.flatMap((s) => CHECKLIST_MAP[s]?.photos ?? []))];
  const mergedQuestions = [...new Set(selected.flatMap((s) => CHECKLIST_MAP[s]?.questions ?? []))];

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-semibold text-ink-900 mb-3">這次看診的原因是？（可複選）</p>
        <div className="flex flex-wrap gap-2">
          {SYMPTOMS.map((s) => (<Tag key={s.id} label={s.label} selected={selected.includes(s.id)} onClick={() => toggle(s.id)} />))}
        </div>
      </div>
      <Button variant="primary" onClick={() => setShowResult(true)} disabled={selected.length === 0} className="w-full">
        產生看診準備清單
      </Button>

      {showResult && selected.length > 0 && (
        <div className="space-y-4">
          <ResultCard title="📋 帶去醫院的東西" accentColor="brand">
            <ul className="space-y-2">{mergedBring.map((b, i) => (<li key={i} className="flex items-start gap-2 text-sm text-ink-700"><input type="checkbox" className="mt-1 accent-brand-500" /><span>{b}</span></li>))}</ul>
          </ResultCard>
          <ResultCard title="📸 需要拍的照片/影片" accentColor="accent">
            <ul className="space-y-2">{mergedPhotos.map((p, i) => (<li key={i} className="flex items-start gap-2 text-sm text-ink-700"><input type="checkbox" className="mt-1 accent-brand-500" /><span>{p}</span></li>))}</ul>
          </ResultCard>
          <ResultCard title="❓ 要問醫生的問題" accentColor="brand">
            <ul className="space-y-2">{mergedQuestions.map((q, i) => (<li key={i} className="flex items-start gap-2 text-sm text-ink-700"><input type="checkbox" className="mt-1 accent-brand-500" /><span>{q}</span></li>))}</ul>
          </ResultCard>
          <Button variant="ghost" onClick={reset} className="w-full">重新選擇</Button>
        </div>
      )}
    </div>
  );
}
