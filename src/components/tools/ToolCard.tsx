import Link from "next/link";
import type { ToolCatalogItem } from "@/lib/tool-catalog";

interface ToolCardProps {
  tool: ToolCatalogItem;
  variant?: "feature" | "compact";
}

export function ToolCard({ tool, variant = "compact" }: ToolCardProps) {
  if (variant === "feature") {
    return (
      <Link
        href={tool.href}
        className={`group flex h-full flex-col justify-between rounded-[20px] border p-5 transition-all hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-[0_8px_24px_rgba(42,31,26,0.12)] ${tool.tone}`}
      >
        <div>
          <div className="mb-5 flex items-center justify-between gap-4">
            <span
              className="flex h-12 w-12 items-center justify-center rounded-[14px] bg-cream-50 text-2xl shadow-[0_2px_12px_rgba(42,31,26,0.06)]"
              aria-hidden="true"
            >
              {tool.icon}
            </span>
            <span className="text-xs font-bold text-ink-500">
              {tool.intent ?? "照護工具"}
            </span>
          </div>
          <h3 className="text-xl font-extrabold leading-tight text-ink-900 group-hover:text-brand-700">
            {tool.title}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-ink-700">
            {tool.desc}
          </p>
        </div>
        <span className="mt-5 inline-flex items-center gap-1 text-sm font-bold text-brand-600">
          開啟工具 <span aria-hidden="true">→</span>
        </span>
      </Link>
    );
  }

  return (
    <Link
      href={tool.href}
      className="group flex min-h-24 items-start gap-3 rounded-[16px] border border-cream-300 bg-cream-50 p-4 transition-colors hover:border-brand-300 hover:bg-brand-50"
    >
      <span
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[12px] bg-cream-100 text-xl"
        aria-hidden="true"
      >
        {tool.icon}
      </span>
      <span className="min-w-0">
        <span className="block font-bold text-ink-900 group-hover:text-brand-700">
          {tool.shortTitle}
        </span>
        <span className="mt-1 line-clamp-2 block text-sm leading-relaxed text-ink-500">
          {tool.desc}
        </span>
      </span>
    </Link>
  );
}
