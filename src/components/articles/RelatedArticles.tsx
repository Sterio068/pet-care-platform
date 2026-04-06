import Link from "next/link";
import { Card } from "@/components/ui/Card";
import {
  getRelatedArticles,
  CATEGORY_LABELS,
  CATEGORY_COLORS,
} from "@/lib/articles";

interface Props {
  slug: string;
}

export function RelatedArticles({ slug }: Props) {
  const articles = getRelatedArticles(slug, 3);
  if (articles.length === 0) return null;

  return (
    <section className="mt-12 pt-8 border-t border-cream-300">
      <h2 className="text-xl md:text-2xl font-bold text-ink-900 mb-5">
        你可能也想看
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {articles.map((a) => (
          <Link key={a.slug} href={`/articles/${a.slug}`} className="group">
            <Card className="h-full group-hover:shadow-[0_8px_24px_rgba(42,31,26,0.12)] transition-shadow">
              <div className="flex items-center gap-2 mb-2">
                <span
                  className={`px-2 py-0.5 rounded-full text-xs font-semibold ${CATEGORY_COLORS[a.category]}`}
                >
                  {CATEGORY_LABELS[a.category]}
                </span>
                <span className="text-xs text-ink-500">
                  {a.readingMinutes} 分鐘
                </span>
              </div>
              <h3 className="font-bold text-base text-ink-900 mb-1.5 group-hover:text-brand-600 transition-colors leading-snug">
                {a.title}
              </h3>
              <p className="text-sm text-ink-500 leading-relaxed line-clamp-2">
                {a.description}
              </p>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}
