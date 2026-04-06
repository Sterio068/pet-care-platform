"use client";

import { useState, useMemo } from "react";
import { PetTypeToggle } from "@/components/ui/PetTypeToggle";
import { Tag } from "@/components/ui/Tag";
import { ResultCard } from "@/components/ui/ResultCard";
import { Button } from "@/components/ui/Button";
import { analyzeSymptoms, getAvailableSymptoms } from "@/data/symptoms";
import { SYMPTOM_FOLLOWUP_MAP, type FollowUpQuestion, type FollowUpOption } from "@/data/symptom-details";
import type { PetType } from "@/types";

type Step = "select" | "followup" | "result";

export function SymptomChecker() {
  const [petType, setPetType] = useState<PetType>("dog");
  const [selected, setSelected] = useState<string[]>([]);
  const [step, setStep] = useState<Step>("select");
  const [followUpQueue, setFollowUpQueue] = useState<FollowUpQuestion[]>([]);
  const [currentFUIndex, setCurrentFUIndex] = useState(0);
  const [followUpAnswers, setFollowUpAnswers] = useState<{ question: string; answer: FollowUpOption }[]>([]);

  const available = useMemo(() => getAvailableSymptoms(petType), [petType]);
  const baseResult = useMemo(() => (step !== "select" ? analyzeSymptoms(petType, selected) : null), [step, petType, selected]);

  const toggle = (id: string) => setSelected((prev) => prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]);

  const handleAnalyze = () => {
    if (selected.length === 0) return;
    const queue: FollowUpQuestion[] = [];
    for (const sid of selected) {
      const fus = SYMPTOM_FOLLOWUP_MAP[sid];
      if (fus) for (const fu of fus) if (!queue.find((q) => q.id === fu.id)) queue.push(fu);
    }
    if (queue.length > 0) {
      setFollowUpQueue(queue); setCurrentFUIndex(0); setFollowUpAnswers([]); setStep("followup");
    } else { setStep("result"); }
  };

  const handleFollowUpAnswer = (option: FollowUpOption) => {
    const currentQ = followUpQueue[currentFUIndex];
    const newAnswers = [...followUpAnswers, { question: currentQ.label, answer: option }];
    setFollowUpAnswers(newAnswers);
    if (currentFUIndex < followUpQueue.length - 1) setCurrentFUIndex(currentFUIndex + 1);
    else setStep("result");
  };

  const reset = () => { setSelected([]); setStep("select"); setFollowUpQueue([]); setCurrentFUIndex(0); setFollowUpAnswers([]); };
  const handleSwitchPet = (type: PetType) => { setPetType(type); reset(); };

  const finalResult = useMemo(() => {
    if (!baseResult) return null;
    let urgencyBonus = 0;
    const extraCauses: { name: string; description: string; urgency: "low" | "medium" | "high" | "emergency" }[] = [];
    const extraAdvice: string[] = [];
    for (const fa of followUpAnswers) {
      urgencyBonus += fa.answer.urgencyDelta;
      for (const c of fa.answer.causes) {
        if (!extraCauses.find((ec) => ec.name === c)) {
          const u = fa.answer.urgencyDelta >= 4 ? "emergency" as const : fa.answer.urgencyDelta >= 2 ? "high" as const : fa.answer.urgencyDelta >= 1 ? "medium" as const : "low" as const;
          extraCauses.push({ name: c, description: "", urgency: u });
        }
      }
      extraAdvice.push(...fa.answer.advice);
    }
    let urgencyLevel = baseResult.urgencyLevel;
    let urgencyColor = baseResult.urgencyColor;
    if (urgencyBonus >= 4 || extraCauses.some((c) => c.urgency === "emergency")) { urgencyLevel = "\u7DCA\u6025"; urgencyColor = "bg-red-100 text-red-800"; }
    else if (urgencyBonus >= 2) { if (urgencyLevel === "\u4F4E") urgencyLevel = "\u4E2D"; if (urgencyLevel === "\u4E2D") urgencyLevel = "\u9AD8"; urgencyColor = urgencyLevel === "\u9AD8" ? "bg-orange-100 text-orange-800" : "bg-yellow-100 text-yellow-800"; }
    const allCauses = [...extraCauses.filter((c) => c.urgency === "emergency" || c.urgency === "high"), ...baseResult.causes, ...extraCauses.filter((c) => c.urgency !== "emergency" && c.urgency !== "high")];
    const seen = new Set<string>();
    const uniqueCauses = allCauses.filter((c) => { if (seen.has(c.name)) return false; seen.add(c.name); return true; });
    return { urgencyLevel, urgencyColor, causes: uniqueCauses.slice(0, 8), advice: [...new Set([...extraAdvice, ...baseResult.advice])], followUpDetails: followUpAnswers };
  }, [baseResult, followUpAnswers]);

  if (step === "followup") {
    const currentQ = followUpQueue[currentFUIndex];
    const progress = ((currentFUIndex + 1) / followUpQueue.length) * 100;
    return (
      <div className="space-y-6">
        <div className="flex justify-center"><PetTypeToggle value={petType} onChange={handleSwitchPet} /></div>
        <div className="space-y-2">
          <div className="flex justify-between text-xs text-ink-500"><span>詳細評估 {currentFUIndex + 1} / {followUpQueue.length}</span><span>{Math.round(progress)}%</span></div>
          <div className="h-2 bg-cream-300 rounded-full overflow-hidden"><div className="h-full bg-brand-500 transition-all duration-300" style={{ width: `${progress}%` }} /></div>
        </div>
        <div className="text-center"><h3 className="text-xl font-bold text-ink-900 mb-2">{currentQ.label}</h3></div>
        <div className="space-y-2">
          {currentQ.options.map((opt) => (
            <button key={opt.id} type="button" onClick={() => handleFollowUpAnswer(opt)} className="w-full text-left px-5 py-4 rounded-[14px] border border-cream-300 bg-white hover:border-brand-400 hover:bg-brand-50 transition-colors"><div className="font-medium text-ink-900">{opt.label}</div></button>
          ))}
        </div>
        <div className="text-center"><button type="button" onClick={() => { if (currentFUIndex > 0) setCurrentFUIndex(currentFUIndex - 1); else setStep("select"); }} className="text-sm text-ink-500 hover:text-brand-600">← 上一步</button></div>
      </div>
    );
  }

  if (step === "result" && finalResult) {
    return (
      <div className="space-y-6">
        <div className="flex justify-center"><PetTypeToggle value={petType} onChange={handleSwitchPet} /></div>
        <ResultCard title="詳細分析結果" accentColor={finalResult.urgencyLevel === "緊急" || finalResult.urgencyLevel === "高" ? "warning" : "accent"}>
          <div className="mb-5"><div className="flex items-center gap-2 mb-1"><span className="text-sm text-ink-700">整體緊急程度：</span><span className={`px-3 py-1 rounded-full text-sm font-bold ${finalResult.urgencyColor}`}>{finalResult.urgencyLevel}</span></div></div>
          {finalResult.followUpDetails.length > 0 && (
            <div className="mb-5 p-4 rounded-[12px] bg-white/50">
              <h4 className="text-xs font-bold text-ink-900 uppercase mb-2">你的描述</h4>
              <div className="space-y-1.5">{finalResult.followUpDetails.map((fd, i) => (<div key={i} className="flex items-start gap-2 text-sm"><span className="text-ink-500 shrink-0">{fd.question}</span><span className="text-ink-900 font-medium">{fd.answer.label}</span></div>))}</div>
            </div>
          )}
          <div className="mb-5"><h4 className="text-sm font-bold text-ink-900 mb-2">可能原因</h4>
            <ul className="space-y-2">{finalResult.causes.map((c, i) => (
              <li key={i} className="flex items-start gap-2 p-3 rounded-[12px] bg-white/70">
                <span className={`mt-0.5 text-xs shrink-0 ${c.urgency === "emergency" ? "text-red-600" : c.urgency === "high" ? "text-orange-500" : "text-brand-500"}`}>{c.urgency === "emergency" ? "🚨" : c.urgency === "high" ? "⚠️" : "•"}</span>
                <div><div className="font-semibold text-sm text-ink-900">{c.name}</div>{c.description && <div className="text-xs text-ink-500 mt-0.5">{c.description}</div>}</div>
              </li>))}</ul>
          </div>
          <div><h4 className="text-sm font-bold text-ink-900 mb-2">建議行動</h4>
            <ul className="space-y-1.5">{finalResult.advice.map((a, i) => (<li key={i} className="text-sm text-ink-700 flex items-start gap-2"><span className="text-brand-500">✓</span><span>{a}</span></li>))}</ul>
          </div>
        </ResultCard>
        <div className="flex gap-3 justify-center"><Button variant="primary" onClick={reset}>重新檢查</Button></div>
        <p className="text-xs text-ink-500 border-l-4 border-ink-300 pl-3 italic">本工具僅供參考，不能取代專業獸醫診斷。出現嚴重症狀請立即就醫。</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-center"><PetTypeToggle value={petType} onChange={handleSwitchPet} /></div>
      <div><p className="text-sm font-semibold text-ink-900 mb-3">請選擇毛孩目前的症狀（可複選）</p>
        <div className="flex flex-wrap gap-2">{available.map((s) => (<Tag key={s.id} label={s.label} selected={selected.includes(s.id)} onClick={() => toggle(s.id)} />))}</div>
      </div>
      <div className="flex gap-3">
        <Button variant="primary" onClick={handleAnalyze} disabled={selected.length === 0} className="flex-1">開始分析（已選 {selected.length} 項）</Button>
        {selected.length > 0 && <Button variant="ghost" onClick={reset}>重置</Button>}
      </div>
      {selected.length > 0 && (<p className="text-xs text-ink-500 text-center">{selected.some((s) => SYMPTOM_FOLLOWUP_MAP[s]) ? "💡 分析將包含詳細追問（嘔吐物顏色、便便形狀等）" : "點擊分析即可看到結果"}</p>)}
    </div>
  );
}
