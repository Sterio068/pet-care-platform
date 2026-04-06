"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";

interface EmergencyStep {
  step: number;
  title: string;
  detail: string;
  warning?: string;
}

interface EmergencyScenario {
  id: string;
  icon: string;
  title: string;
  subtitle: string;
  severity: "critical" | "urgent" | "important";
  steps: EmergencyStep[];
  doNot: string[];
}

const SCENARIOS: EmergencyScenario[] = [
  {
    id: "poisoning",
    icon: "☠️",
    title: "誤食中毒",
    subtitle: "吃了有毒食物、藥物、清潔劑",
    severity: "critical",
    steps: [
      { step: 1, title: "確認吃了什麼", detail: "拍下食物包裝或殘留物，記下大約吃了多少、什麼時候吃的。" },
      { step: 2, title: "撥打動物醫院電話", detail: "告知吃了什麼、體重、時間。醫院會判斷是否需要催吐。" },
      { step: 3, title: "準備前往醫院", detail: "帶著殘留食物/包裝一起去。如果有嘔吐物也帶上。" },
      { step: 4, title: "在醫院等候", detail: "可能需要催吐、洗胃、給活性碳、住院觀察。" },
    ],
    doNot: ["不要自行催吐（腐蝕性物質催吐會二次灼傷）", "不要餵牛奶或鹽水（無效且可能更危險）", "不要等「看情況」再決定就醫"],
  },
  {
    id: "heatstroke",
    icon: "🌡️",
    title: "中暑",
    subtitle: "急喘、流口水、站不穩、牙齦鮮紅",
    severity: "critical",
    steps: [
      { step: 1, title: "立即移到陰涼處", detail: "冷氣房最好。若在戶外，找樹蔭、建築物陰影。" },
      { step: 2, title: "用室溫水降溫", detail: "用濕毛巾包裹身體，重點部位：腋下、大腿內側、肚子、腳底。搭配電風扇。", warning: "⚠️ 不要用冰水！會導致血管收縮反而散熱更慢" },
      { step: 3, title: "小口餵水", detail: "清醒時可小口餵水。昏迷時不要灌水（嗆到肺部更危險）。" },
      { step: 4, title: "立即送醫", detail: "即使看起來恢復了，內臟可能已受損。24 小時內必須回診。" },
    ],
    doNot: ["不要用冰水或冰塊（血管收縮反效果）", "不要把寵物泡在冰水中", "不要以為恢復了就沒事（內臟可能已受損）"],
  },
  {
    id: "choking",
    icon: "😵",
    title: "噎到 / 異物卡喉",
    subtitle: "張嘴喘、用爪子扒嘴、無法吞嚥",
    severity: "critical",
    steps: [
      { step: 1, title: "檢查口腔", detail: "輕輕打開嘴巴，看是否能看到異物。如果看得到且容易取出，用手指或鑷子小心取出。", warning: "⚠️ 如果看不到或取不出，不要硬摳（可能推得更深）" },
      { step: 2, title: "海姆立克法（狗）", detail: "小型犬：倒提後腿，輕拍背部。大型犬：從背後環抱，雙手在肋骨下方向上快速擠壓。" },
      { step: 3, title: "立即送醫", detail: "即使異物取出，也要就醫檢查是否有內部損傷。" },
    ],
    doNot: ["不要把手伸太深（可能被咬傷且推更深）", "不要讓寵物喝水（可能嗆到）", "不要拖延送醫"],
  },
  {
    id: "seizure",
    icon: "⚡",
    title: "抽搐 / 癲癇",
    subtitle: "全身僵硬抖動、口吐白沫、失去意識",
    severity: "critical",
    steps: [
      { step: 1, title: "保持冷靜、確保安全", detail: "移開周圍可能撞傷的物品（桌腳、牆角）。不要試圖壓住或抱起。" },
      { step: 2, title: "計時", detail: "記錄抽搐開始時間。超過 5 分鐘 = 生命危險。" },
      { step: 3, title: "錄影", detail: "用手機錄下抽搐過程，對獸醫診斷非常有幫助。" },
      { step: 4, title: "送醫", detail: "抽搐結束後立即送醫。多次抽搐或超過 5 分鐘必須急診。" },
    ],
    doNot: ["不要把手伸進嘴裡（不會咬到舌頭）", "不要試圖壓住身體", "不要餵食餵水"],
  },
  {
    id: "bleeding",
    icon: "🩸",
    title: "外傷出血",
    subtitle: "割傷、咬傷、車禍外傷",
    severity: "urgent",
    steps: [
      { step: 1, title: "直接加壓止血", detail: "用乾淨毛巾或紗布直接按壓傷口，持續 5-10 分鐘不放開。" },
      { step: 2, title: "固定包紮", detail: "止血後用繃帶包紮固定。不要綁太緊（阻斷血流）。" },
      { step: 3, title: "送醫", detail: "即使表面止血，也可能有內傷。車禍尤其要檢查內出血。" },
    ],
    doNot: ["不要用碘酒或酒精直接倒在傷口上（劇痛）", "不要拔出穿刺的異物（拔出會大出血）", "不要使用止血帶（除非受過訓練）"],
  },
  {
    id: "no_urination",
    icon: "🚽",
    title: "公貓無法排尿",
    subtitle: "頻繁蹲馬桶但尿不出來、哀叫",
    severity: "critical",
    steps: [
      { step: 1, title: "確認是尿不出來而不是拉不出來", detail: "公貓蹲很久沒有尿液 = 可能尿道阻塞。這是致命急診！" },
      { step: 2, title: "立即送急診", detail: "尿道完全阻塞在 24-48 小時內可能致命（腎衰竭、鉀離子過高）。" },
      { step: 3, title: "不要等到明天", detail: "這是少數「半夜也必須去急診」的狀況。" },
    ],
    doNot: ["不要按壓膀胱（可能導致破裂）", "不要等到白天才就醫", "不要以為只是便秘"],
  },
];

const SEVERITY_COLORS = {
  critical: "border-red-400 bg-red-50",
  urgent: "border-orange-400 bg-orange-50",
  important: "border-yellow-400 bg-yellow-50",
};

export function EmergencyGuide() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const scenario = SCENARIOS.find((s) => s.id === selectedId);

  if (scenario) {
    return (
      <div className="space-y-6">
        <button type="button" onClick={() => setSelectedId(null)} className="text-sm text-ink-500 hover:text-brand-600 inline-flex items-center gap-1">
          ← 返回選擇
        </button>

        <div className={`border-2 rounded-[16px] p-5 ${SEVERITY_COLORS[scenario.severity]}`}>
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">{scenario.icon}</span>
            <div>
              <h3 className="text-xl font-bold text-ink-900">{scenario.title}</h3>
              <p className="text-sm text-ink-500">{scenario.subtitle}</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {scenario.steps.map((s) => (
            <div key={s.step} className="flex gap-4">
              <div className="shrink-0 w-10 h-10 rounded-full bg-brand-500 text-white font-bold flex items-center justify-center text-lg">
                {s.step}
              </div>
              <div className="flex-1 pt-1">
                <h4 className="font-bold text-ink-900 mb-1">{s.title}</h4>
                <p className="text-sm text-ink-700 leading-relaxed">{s.detail}</p>
                {s.warning && (
                  <p className="text-sm text-red-700 font-semibold mt-2 bg-red-50 p-2 rounded-[8px]">{s.warning}</p>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="bg-red-50 border border-red-200 rounded-[14px] p-4">
          <h4 className="font-bold text-red-800 text-sm mb-2">❌ 絕對不要做</h4>
          <ul className="space-y-1.5">
            {scenario.doNot.map((d, i) => (
              <li key={i} className="text-sm text-red-700 flex items-start gap-2">
                <span>✗</span><span>{d}</span>
              </li>
            ))}
          </ul>
        </div>

        <Button variant="primary" onClick={() => setSelectedId(null)} className="w-full">
          查看其他急救情境
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <p className="text-sm text-ink-500 text-center mb-4">選擇遇到的緊急情況，查看步驟式急救指南</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {SCENARIOS.map((s) => (
          <button
            key={s.id}
            type="button"
            onClick={() => setSelectedId(s.id)}
            className={`text-left p-4 rounded-[14px] border-2 hover:shadow-md transition-shadow ${SEVERITY_COLORS[s.severity]}`}
          >
            <div className="flex items-center gap-3">
              <span className="text-3xl">{s.icon}</span>
              <div>
                <div className="font-bold text-ink-900">{s.title}</div>
                <div className="text-xs text-ink-500">{s.subtitle}</div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
