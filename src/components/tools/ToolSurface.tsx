import type { ReactNode } from "react";
import { Card } from "@/components/ui/Card";
import { ToolInteractionTracker } from "@/components/tools/ToolInteractionTracker";

interface ToolSurfaceProps {
  toolSlug: string;
  toolName: string;
  children: ReactNode;
}

export function ToolSurface({ toolSlug, toolName, children }: ToolSurfaceProps) {
  const headingId = `${toolSlug}-tool-surface`;

  return (
    <section aria-labelledby={headingId} className="space-y-3">
      <div className="flex flex-col gap-3 rounded-lg border border-cream-300 bg-white px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 id={headingId} className="text-sm font-bold text-ink-900">
            {toolName}操作區
          </h2>
          <p className="mt-1 text-sm leading-relaxed text-ink-600">
            依欄位輸入資料後，結果會在同一區塊即時更新。
          </p>
        </div>
        <span className="inline-flex w-fit rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-xs font-bold text-brand-700">
          本機計算
        </span>
      </div>
      <ToolInteractionTracker toolSlug={toolSlug} toolName={toolName}>
        <Card padding="lg" className="bg-white">
          {children}
        </Card>
      </ToolInteractionTracker>
      <p className="text-xs leading-relaxed text-ink-500">
        工具結果僅供日常照護、紀錄與就醫準備參考；若毛孩出現急性或持續異常，請優先諮詢動物醫院。
      </p>
    </section>
  );
}
