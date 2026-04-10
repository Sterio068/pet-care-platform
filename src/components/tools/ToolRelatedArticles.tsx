import Link from "next/link";
import { getRelatedArticlesForTool } from "@/lib/tool-articles";
import { CATEGORY_LABELS, CATEGORY_COLORS } from "@/lib/articles";

interface Props {
  toolSlug: string;
}

function formatDate(iso: string) {
  const d = new Date(iso);
  return `${d.getFullYear()}/${String(d.getMonth() + 1).padStart(2, "0")}/${String(d.getDate()).padStart(2, "0")}`;
}

export function ToolRelatedArticles({ toolSlug }: Props) {
  const articles = getRelatedArticlesForTool(toolSlug);
  if (articles.length === 0) return null;

  return (
    <section className="mt-10 pt-8 border-t border-cream-300">
      <h2 className="text-xl font-bold text-ink-900 mb-4">相關照護知識</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {articles.map((a) => (
          <Link
            key={a.slug}
            href={`/articles/${a.slug}`}
            className="group block p-4 rounded-2xl bg-white border border-cream-300 hover:border-brand-300 hover:shadow-[0_4px_16px_rgba(42,31,26,0.09)] transition-all"
          >
            <div className="flex items-center gap-2 mb-2">
              <span
                className={`px-2 py-0.5 rounded-full text-xs font-semibold ${CATEGORY_COLORS[a.category]}`}
              >
                {CATEGORY_LABELS[a.category]}
              </span>
              <span className="text-xs text-ink-500">{formatDate(a.publishedAt)}</span>
            </div>
            <h3 className="font-bold text-sm text-ink-900 leading-snug line-clamp-2 group-hover:text-brand-600 transition-colors">
              {a.title}
            </h3>
            <p className="text-xs text-ink-500 mt-1.5 leading-relaxed line-clamp-2">
              {a.description}
            </p>
            <span className="mt-3 text-brand-600 text-xs font-semibold inline-flex items-center gap-1 group-hover:gap-1.5 transition-all">
              閱讀文章 <span aria-hidden="true">→</span>
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
