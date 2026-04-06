import Link from "next/link";
import { getAllArticles } from "@/lib/articles";

interface Props {
  currentSlug: string;
}

export function ArticleNav({ currentSlug }: Props) {
  const all = getAllArticles();
  const idx = all.findIndex((a) => a.slug === currentSlug);
  if (idx === -1) return null;

  const prev = idx < all.length - 1 ? all[idx + 1] : null;
  const next = idx > 0 ? all[idx - 1] : null;

  if (!prev && !next) return null;

  return (
    <nav className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4" aria-label="文章導航">
      {prev ? (
        <Link
          href={`/articles/${prev.slug}`}
          className="group p-4 rounded-[14px] border border-cream-300 hover:border-brand-300 hover:bg-brand-50 transition-colors"
        >
          <div className="text-xs text-ink-500 mb-1">← 上一篇</div>
          <div className="font-semibold text-sm text-ink-900 group-hover:text-brand-600 transition-colors line-clamp-2">
            {prev.title}
          </div>
        </Link>
      ) : (
        <div />
      )}
      {next ? (
        <Link
          href={`/articles/${next.slug}`}
          className="group p-4 rounded-[14px] border border-cream-300 hover:border-brand-300 hover:bg-brand-50 transition-colors text-right"
        >
          <div className="text-xs text-ink-500 mb-1">下一篇 →</div>
          <div className="font-semibold text-sm text-ink-900 group-hover:text-brand-600 transition-colors line-clamp-2">
            {next.title}
          </div>
        </Link>
      ) : (
        <div />
      )}
    </nav>
  );
}
