import Link from "next/link";
import type { ArticleSource } from "@/lib/article-sources";
import type { ToolSuggestion } from "@/lib/article-tools";
import type { ArticleCategory, ArticleMeta } from "@/types";

const CATEGORY_ACTIONS: Record<ArticleCategory, string[]> = {
  health: [
    "先記錄症狀開始時間、頻率、食慾與精神狀態",
    "拍下嘔吐物、糞便、皮膚或走路姿勢等可供獸醫判讀的線索",
    "若出現呼吸困難、抽搐、血便或疑似中毒，直接聯絡動物醫院",
  ],
  food: [
    "先確認年齡、體重、絕育狀態與每日活動量",
    "飲食調整用 7 到 10 天漸進轉換，避免一次換糧",
    "若有慢性病、腎臟病、胰臟炎或過敏史，先詢問獸醫營養建議",
  ],
  behavior: [
    "先排除疼痛、泌尿道、腸胃或皮膚不適造成的行為改變",
    "用低刺激、可預測的方式調整環境，不用處罰或恐嚇",
    "若有攻擊、長期焦慮或自傷行為，安排獸醫或行為門診評估",
  ],
  grooming: [
    "先檢查皮膚是否紅腫、結痂、異味或出現局部掉毛",
    "使用寵物專用清潔用品，避免人用洗劑造成刺激",
    "若耳朵、皮膚或眼周持續分泌物增加，先就醫再美容",
  ],
  beginner: [
    "先建立疫苗、驅蟲、晶片、飲食與就醫紀錄",
    "把環境安全、日常作息與互動規則固定下來",
    "遇到幼犬幼貓、老年或有病史個體，先用獸醫建議做基準",
  ],
};

const CATEGORY_VET_SIGNALS: Record<ArticleCategory, string[]> = {
  health: ["精神明顯變差", "呼吸異常", "持續嘔吐或腹瀉", "血尿、血便或抽搐"],
  food: ["拒食超過 24 小時", "快速消瘦", "反覆嘔吐", "疑似吃到有毒食物"],
  behavior: ["突然攻擊或躲藏", "排泄習慣大幅改變", "疑似疼痛", "焦慮影響睡眠或進食"],
  grooming: ["皮膚滲液或化膿", "耳道惡臭", "眼睛疼痛或睜不開", "搔抓到破皮"],
  beginner: ["幼犬幼貓不吃不喝", "體溫或呼吸異常", "疫苗前疑似感染", "任何快速惡化狀況"],
};

function formatSourceCount(count: number) {
  if (count === 0) return "已標示編輯校對方式";
  return `${count} 個公開資料來源`;
}

interface ArticleLeadPanelProps {
  article: ArticleMeta;
  modifiedLabel: string;
  sources: ArticleSource[];
  toolSuggestions: ToolSuggestion[];
}

export function ArticleLeadPanel({
  article,
  modifiedLabel,
  sources,
  toolSuggestions,
}: ArticleLeadPanelProps) {
  const actions = CATEGORY_ACTIONS[article.category];
  const primaryTool = toolSuggestions[0];

  return (
    <section className="mb-8 grid grid-cols-1 gap-4 lg:grid-cols-[1.1fr_0.9fr]">
      <div className="rounded-lg border border-cream-300 bg-[var(--surface-card)] p-5 shadow-[0_8px_20px_rgba(42,31,26,0.05)]">
        <p className="text-xs font-bold uppercase tracking-[0.08em] text-brand-600">
          本文先讀重點
        </p>
        <p className="mt-3 text-base leading-relaxed text-ink-800">
          {article.description}
        </p>
        <ul className="mt-4 space-y-2">
          {actions.map((action) => (
            <li key={action} className="flex gap-2 text-sm leading-relaxed text-ink-700">
              <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
              <span>{action}</span>
            </li>
          ))}
        </ul>
        {primaryTool && (
          <Link
            href={primaryTool.href}
            className="mt-5 inline-flex w-full items-center justify-between gap-3 rounded-lg border border-brand-200 bg-brand-50 px-4 py-3 text-sm font-bold text-brand-700 transition-colors hover:border-brand-300 hover:bg-brand-100 sm:w-auto"
          >
            <span>{primaryTool.title}</span>
            <span aria-hidden="true">→</span>
          </Link>
        )}
      </div>

      <div className="rounded-lg border border-cream-300 bg-cream-50 p-5">
        <p className="text-xs font-bold uppercase tracking-[0.08em] text-ink-500">
          可信度與審稿訊號
        </p>
        <dl className="mt-4 space-y-3 text-sm">
          <div>
            <dt className="font-bold text-ink-900">資料基礎</dt>
            <dd className="mt-1 text-ink-700">{formatSourceCount(sources.length)}</dd>
          </div>
          <div>
            <dt className="font-bold text-ink-900">編輯方式</dt>
            <dd className="mt-1 text-ink-700">
              由毛孩照護站編輯部整理，優先採用獸醫組織、政府、學術或動物醫院教學資料。
            </dd>
          </div>
          <div>
            <dt className="font-bold text-ink-900">最近校對</dt>
            <dd className="mt-1 text-ink-700">{modifiedLabel}</dd>
          </div>
          <div>
            <dt className="font-bold text-ink-900">使用邊界</dt>
            <dd className="mt-1 text-ink-700">
              文章用於照護判斷與就醫準備，不取代獸醫診斷、檢驗或處方。
            </dd>
          </div>
        </dl>
      </div>
    </section>
  );
}

export function VetSignalPanel({ category }: { category: ArticleCategory }) {
  return (
    <section className="my-8 rounded-lg border border-red-200 bg-red-50 p-5">
      <h2 className="text-base font-bold text-ink-900">出現這些狀況請優先就醫</h2>
      <div className="mt-3 flex flex-wrap gap-2">
        {CATEGORY_VET_SIGNALS[category].map((signal) => (
          <span
            key={signal}
            className="rounded-full border border-red-200 bg-[var(--surface-card)] px-3 py-1.5 text-sm font-semibold text-red-700"
          >
            {signal}
          </span>
        ))}
      </div>
      <p className="mt-3 text-sm leading-relaxed text-ink-700">
        若症狀快速惡化、你無法判斷嚴重程度，請先電話聯絡附近動物醫院，再依照獸醫指示處理。
      </p>
    </section>
  );
}
